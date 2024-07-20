const User = require("../models/Usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const diseases = require("../disease");
const natural = require("natural");
const wordnet = new natural.WordNet();
const saltRounds = 10;
const secret = "assdssffdgjlklllkiihhppieiez";
const salt = bcrypt.genSaltSync(saltRounds);

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserDoc = await User.findOne({ email });
    if (!UserDoc) {
      return res.status(400).send("User not found");
    }
    const passwordOk = bcrypt.compareSync(password, UserDoc.password);
    if (passwordOk) {
      jwt.sign(
        { email, id: UserDoc._id },
        secret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            data: { id: UserDoc._id, email, token },
          });
        }
      );
    } else {
      res.status(400).send("Wrong Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists! Login Instead" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logout = (req, res) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  const prevToken = cookies.split("=")[1];
  jwt.verify(prevToken, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie("token");
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(404).json({ message: "No token found" });
  }

  const token = cookies.split("=")[1];
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    req.id = user.id;
    next();
  });
};

// Function to lemmatize a word
function lemmatizeWord(word) {
  return new Promise((resolve, reject) => {
    wordnet.lookup(word, (results) => {
      if (results && results.length > 0) {
        resolve(results[0].lemma);
      } else {
        resolve(word.toLowerCase());
      }
    });
  });
}

async function diagnoseDisease(userInput) {
  userInput = userInput.toLowerCase();
  const userSymptomsArray = userInput.split(" ");
  const userSymptoms = new Set(
    await Promise.all(userSymptomsArray.map(lemmatizeWord))
  );
  const diseaseScores = {};

  for (const disease in diseases) {
    const diseaseInfo = diseases[disease];
    const diseaseSymptoms = new Set(diseaseInfo["symptoms"]);
    const score = [...userSymptoms].filter((symptom) =>
      diseaseSymptoms.has(symptom)
    ).length;
    diseaseScores[disease] = score;
  }

  const matchedDiseases = Object.keys(diseaseScores).filter(
    (disease) => diseaseScores[disease] > 0
  );

  if (matchedDiseases.length > 0) {
    const bestDiseases = matchedDiseases.filter(
      (disease) => diseases[disease]["symptoms"].length > 2
    );
    if (bestDiseases.length > 0) {
      const maxScore = Math.max(
        ...bestDiseases.map((disease) => diseaseScores[disease])
      );
      return bestDiseases.find(
        (disease) => diseaseScores[disease] === maxScore
      );
    } else {
      return matchedDiseases[0];
    }
  } else {
    // Check for diseases that have at least one symptom matching a multi-word symptom in the user input
    for (const disease in diseases) {
      const diseaseInfo = diseases[disease];
      for (const symptom of diseaseInfo["symptoms"]) {
        if (
          userInput.split(" ").some((word) => symptom.split(" ").includes(word))
        ) {
          return disease;
        }
      }
    }
    return "unknown";
  }
}

function provideTreatment(disease) {
  return diseases[disease] ? diseases[disease]["treatments"] : ["unknown"];
}

function referToFacility(disease) {
  return diseases[disease] ? diseases[disease]["facilities"] : ["unknown"];
}

async function chatbotInteraction(userInput) {
  userInput = userInput.toLowerCase();

  if (
    [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "good day",
      "what's up",
    ].some((greeting) => userInput.includes(greeting))
  ) {
    return randomChoice(responses.greetings);
  }

  if (
    ["sick", "ill", "not feeling well", "not well"].some((illWord) =>
      userInput.includes(illWord)
    )
  ) {
    return "I'm very sorry to hear it. Kindly explain your symptoms to me, and I will attempt to help.";
  }

  if (userInput.includes("name") && userInput.includes("your")) {
    return responses.introduction;
  }

  if (userInput.includes("who") && userInput.includes("you")) {
    return responses.introduction;
  }

  if (["goodbye", "bye"].some((farewell) => userInput.includes(farewell))) {
    return responses.farewell;
  }

  if (["thank you", "thanks"].some((thanks) => userInput.includes(thanks))) {
    return responses.thank_you;
  }

  if (
    ["how are you", "how're you", "how"].some((wellWord) =>
      userInput.includes(wellWord)
    )
  ) {
    return responses.well_being;
  }

  const diagnosis = await diagnoseDisease(userInput);

  if (diagnosis !== "unknown") {
    let response = `The illness that could be causing your symptoms is ${diseases[diagnosis].name}.`;

    if (diseases[diagnosis]) {
      const description = diseases[diagnosis]["description"];
      response += `\n\n ${description}`;
      console.log(`second print ${response}`);
      const facility = referToFacility(diagnosis);
      console.log(`third print ${facility}`);
      response += `\n\n if it is ${diseases[diagnosis].name}, perhaps you should go to ${facility}`;
      console.log(`4 print ${response}`);
      const treatments = provideTreatment(diagnosis);
      response += `\n\nTreatments that are advised for ${treatments[diagnosis]} comprise\n`;
      response += treatments.join("\n");
      console.log(response);
    } else {
      response +=
        "\n\nI apologize; I was unable to locate comprehensive information regarding the illness.";
    }
    return response;
  } else {
    return "Kindly elaborate on your symptoms so that we can better comprehend your problem.";
  }
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

exports.chatbot = async (req, res) => {
  const userInput = req.body.input;
  const response = await chatbotInteraction(userInput);
  res.json({
    success: true,
    data: {
      reply: response,
    },
  });
};
