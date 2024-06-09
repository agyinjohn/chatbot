const User = require("../models/Usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const diseases = require("../disease");
const saltRounds = 10;
const natural = require("natural");
const wordnet = new natural.WordNet();
const salt = bcrypt.genSaltSync(saltRounds);
const secret = "assdssffdgjlklllkiihhppieiez";
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserDoc = await User.findOne({ email });
    const passwordOk = bcrypt.compareSync(password, UserDoc.password);
    // print(passwordOk);
    if (passwordOk) {
      jwt.sign(
        { email, id: UserDoc._id },
        secret,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          // console.log(token);
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
  }
};

//    exports.register =  ("/register", async (req, res) => {
//     //   res.json({ me: "true" });
//     const { email, password } = req.body;
//     // console.log(email, password, username);
//     try {
//       const hashedPassword = bcrypt.hashSync(password, salt);
//       console.log(hashedPassword);
//       const UserDoc = await new user({
//         email,
//         password: hashedPassword,
//       }).save();
//       res.json(UserDoc);
//     } catch (e) {
//       console.log(e);
//       res.status(400).json({ e });
//       // alert(e);
//     }
//     //   console.log(user);
//   });

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
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

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

exports.logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), secret, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};
//ChatBot

const responses = {
  greetings: [
    "Hi there! What can I do to help you now?",
    "Hello there! In what way may I assist you?",
    "Greetings! What can I do to help you?",
    "Greetings! How may I assist you right now?",
  ],
  introduction:
    "I'm DiagBot, a chatbot that diagnoses illnesses. I'm here to provide medical information assistance.",
  farewell:
    "Farewell! Take care of yourself, and don't hesitate to return if you need additional assistance.",
  thank_you:
    "You're very welcome! Please don't hesitate to ask further questions.",
  well_being:
    "I am an AI, therefore I don't have feelings, but I'm here to help by providing you with the precise medical knowledge you want.",
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

// Function to diagnose the disease based on user input
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

// Function to provide treatment information for the diagnosed disease
function provideTreatment(disease) {
  return diseases[disease] ? diseases[disease]["treatments"] : ["unknown"];
}

// Function to refer to a healthcare facility
function referToFacility(disease) {
  return diseases[disease] ? diseases[disease]["facilities"] : ["unknown"];
}

// Function to handle the chatbot interaction
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
    let response = `The illness that could be causing your symptoms is: ${diagnosis}`;

    if (diseases[diagnosis]) {
      const description = diseases[diagnosis]["description"];
      response += `\n\nDescription: ${description}`;

      const facility = referToFacility(diagnosis);
      response += `\n\nFor ${diagnosis}, perhaps you should go to ${facility}`;

      const treatments = provideTreatment(diagnosis);
      response += `\n\nTreatments that are advised for ${diagnosis} comprise:\n`;
      response += treatments.join("\n");
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
