const diseases = [
  {
    name: "flu",
    symptoms: ["fever", "cough", "sore throat", "body aches", "fatigue"],
    description:
      "Influenza, commonly known as the flu, is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness and spreads through respiratory droplets from infected individuals.",
    treatments: [
      "Rest and fluid intake are recommended to manage the flu and promote recovery. Antiviral medications such as Oseltamivir (Tamiflu) may be prescribed to shorten the duration of symptoms. It is essential to stay home to prevent spreading the virus to others.",
      "Proper hand hygiene, such as frequent handwashing, can help reduce the risk of flu transmission.",
      "Over-the-counter medications, such as acetaminophen or ibuprofen, can help alleviate fever and body aches.",
      "Avoiding close contact with sick individuals and using face masks can prevent flu spread.",
    ],
    facilities: ["KNUST Hospital, Kumasi", "Kokofu General Hospital, Kumasi"],
  },
  {
    name: "malaria",
    symptoms: ["fever", "chills", "headache", "nausea", "muscle aches"],
    description:
      "Malaria is a mosquito-borne infectious disease that affects humans and other animals. It is caused by the Plasmodium parasite and commonly transmitted through the bite of infected mosquitoes.",
    treatments: [
      "Antimalarial medications, such as Artemether-Lumefantrine, are prescribed to treat malaria and clear the parasite from the body. Bed rest and staying hydrated are essential for recovery and restoring energy levels.",
      "Preventive measures like using insecticide-treated bed nets and mosquito repellents can reduce the risk of infection.",
      "Early diagnosis and treatment are crucial to prevent severe complications such as cerebral malaria.",
      "People traveling to malaria-endemic areas should take prophylactic antimalarial medications before, during, and after their trip.",
    ],
    facilities: ["KNUST Hospital, Kumasi", "Kolebu Teaching Hospital, Accra"],
  },
  {
    name: "common_cold",
    symptoms: [
      "sore throat",
      "runny nose",
      "cough",
      "sneezing",
      "mild headache",
    ],
    description:
      "The common cold is a viral infection that primarily affects the nose and throat. It causes symptoms such as sore throat, runny nose, cough, sneezing, and a mild headache.",
    treatments: [
      "Rest and proper hydration are essential to support the body's immune response and recovery. Drinking warm liquids like tea or soup can soothe a sore throat and provide comfort.",
      "Over-the-counter cold medications containing antihistamines or decongestants can help alleviate symptoms.",
      "Gargling with warm saltwater can ease a sore throat and reduce inflammation.",
      "Using a humidifier or steam inhalation can help relieve nasal congestion and improve breathing.",
    ],
    facilities: ["KNUST Hospital, Kumasi", "Afari Community Hospital, Kumasi"],
  },
  {
    name: "bronchitis",
    symptoms: [
      "cough",
      "shortness of breath",
      "chest discomfort",
      "mucus production",
      "low-grade fever",
    ],
    description:
      "Bronchitis is an inflammation of the bronchial tubes, which carry air to the lungs. It causes symptoms such as a persistent cough, shortness of breath, chest discomfort, mucus production, and a low-grade fever.",
    treatments: [
      "Rest and avoiding irritants, such as smoking and air pollutants, can help the bronchial tubes heal. Drinking plenty of fluids can help thin mucus and make coughing more productive.",
      "Cough suppressants can provide temporary relief from a persistent cough, but they are not recommended for productive coughs.",
      "Bronchodilators, typically delivered through an inhaler, can help open the airways and improve breathing.",
      "In some cases, antibiotics may be prescribed if the bronchitis is caused by a bacterial infection.",
    ],
    facilities: [
      "Claron Health International, Accra",
      "Cedarcrest Hospitals Ghana, Accra",
    ],
  },
  {
    name: "pneumonia",
    symptoms: [
      "fever",
      "cough",
      "shortness of breath",
      "chest pain",
      "fatigue",
    ],
    description:
      "Pneumonia is an infection that inflames the air sacs in one or both lungs. It causes symptoms such as fever, cough, shortness of breath, chest pain, and fatigue.",
    treatments: [
      "Antibiotics are prescribed if the pneumonia is bacterial. It is essential to complete the full course of antibiotics as prescribed by the healthcare provider.",
      "Rest and increased fluid intake help the body fight the infection and support recovery.",
      "Oxygen therapy may be necessary for severe cases to maintain adequate oxygen levels in the blood.",
      "Pain relievers can help alleviate chest pain and reduce fever, but they do not treat the underlying infection.",
    ],
    facilities: [
      "Komfo Anokye Teaching hospital, Kumasi",
      "Ernest Chemists Hospital, Accra",
    ],
  },
  {
    name: "asthma",
    symptoms: [
      "shortness of breath",
      "wheezing",
      "cough",
      "chest tightness",
      "increased mucus production",
    ],
    description:
      "Asthma is a chronic respiratory condition characterized by inflammation and narrowing of the airways. It causes symptoms such as shortness of breath, wheezing, cough, chest tightness, and increased mucus production.",
    treatments: [
      "Inhaled corticosteroids are the mainstay of asthma treatment and help reduce airway inflammation. They are used as a controller medication to prevent asthma symptoms.",
      "Bronchodilators, such as short-acting beta-agonists, provide quick relief by relaxing the airway muscles and improving breathing during asthma attacks.",
      "Allergy management, such as avoiding triggers and using allergy medications, can help prevent asthma exacerbations triggered by allergens.",
      "Creating and following an asthma action plan helps individuals recognize and manage asthma symptoms effectively.",
    ],
    facilities: [
      "Komfo Anokye Teaching Hospital, Kumasi",
      "37 Military Hospital, Accra",
    ],
  },
  {
    name: "diabetes",
    symptoms: [
      "frequent urination",
      "excessive thirst",
      "unexplained weight loss",
      "fatigue",
      "blurred vision",
    ],
    description:
      "Diabetes is a chronic condition that affects the body's ability to regulate blood sugar levels. It causes symptoms such as frequent urination, excessive thirst, unexplained weight loss, fatigue, and blurred vision.",
    treatments: [
      "Insulin therapy is prescribed for individuals with Type 1 diabetes to help regulate blood sugar levels. It involves injecting insulin under the skin using a syringe, pen, or insulin pump.",
      "Oral medications, such as Metformin, are used for Type 2 diabetes to improve insulin sensitivity and control blood sugar.",
      "Dietary management, including carb counting and balanced meals, is crucial for diabetes management and blood sugar control.",
      "Regular physical activity helps improve insulin sensitivity and maintain a healthy weight for diabetes management.",
    ],
    facilities: ["Bethel Hospital, Tema", "Special Ice Hospital, Accra"],
  },
  {
    name: "hypertension",
    symptoms: [
      "high blood pressure",
      "headaches",
      "dizziness",
      "fatigue",
      "chest pain",
    ],
    description:
      "Hypertension, or high blood pressure, is a condition in which the force of blood against the artery walls is too high. It often has no symptoms but may cause headaches, dizziness, fatigue, and chest pain.",
    treatments: [
      "Lifestyle modifications play a crucial role in managing hypertension. This includes adopting a heart-healthy diet, reducing sodium intake, exercising regularly, and quitting smoking.",
      "Antihypertensive medications, such as ACE inhibitors or diuretics, may be prescribed to control blood pressure levels.",
      "Regular blood pressure monitoring is essential to track changes and adjust treatment if necessary.",
      "Stress management techniques, such as meditation and deep breathing exercises, can help reduce blood pressure.",
    ],
    facilities: [
      "Korle-Bu Teaching Hospital, Accra",
      "Sunshine Healthcare Limited, Kumasi",
    ],
  },
  {
    name: "gastritis",
    symptoms: [
      "abdominal pain",
      "nausea",
      "vomiting",
      "indigestion",
      "loss of appetite",
    ],
    description:
      "Gastritis is an inflammation of the stomach lining. It causes symptoms such as abdominal pain, nausea, vomiting, indigestion, and loss of appetite.",
    treatments: [
      "Antacids can help neutralize stomach acid and provide relief from gastritis-related discomfort. Proton pump inhibitors may be prescribed to reduce stomach acid production and promote healing of the stomach lining.",
      "Dietary changes, such as avoiding spicy or acidic foods, can help reduce stomach irritation.",
      "Avoiding alcohol and nonsteroidal anti-inflammatory drugs (NSAIDs) can prevent gastritis exacerbation.",
      "Eating smaller, more frequent meals can help ease digestion and reduce stomach irritation.",
    ],
    facilities: [
      "Olive Medical Hospital, Kumasi",
      "Tema General Hospital, Tema",
    ],
  },
  {
    name: "urinary_tract_infection",
    symptoms: [
      "frequent urination",
      "painful urination",
      "lower abdominal pain",
      "cloudy urine",
      "blood in urine",
    ],
    description:
      "A urinary tract infection (UTI) is an infection in any part of the urinary system. It causes symptoms such as frequent urination, painful urination, lower abdominal pain, cloudy urine, and blood in urine.",
    treatments: [
      "Antibiotics are prescribed to treat UTIs and clear the bacterial infection from the urinary system. It is crucial to complete the full course of antibiotics as prescribed by the healthcare provider.",
      "Drinking plenty of fluids can help flush bacteria from the urinary system and promote healing.",
      "Over-the-counter pain relievers, such as ibuprofen, can help alleviate discomfort and pain associated with UTIs.",
      "Practicing good hygiene, such as wiping from front to back and urinating before and after sexual activity, can help prevent UTIs.",
    ],
    facilities: [
      "Okomfo Anokye Teaching Hospital, Kumasi",
      "Sunshine Healthcare Limited, Kumasi",
    ],
  },
];

module.exports = diseases;
