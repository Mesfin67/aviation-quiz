require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const Question = require('./models/Question');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB for seeding.");

    // Remove existing questions. (Be cautious in production.)
    await Question.deleteMany({});

    // Prepare dummy questions. Each question gets a timeLimit of 60 minutes:
    const questions = [
      // --- GC sub-courses (General Aviation Maintenance) ---
      // GC001 – Aviation Mathematics (3 questions)
      {
        subCourse: "gc001",
        questionText: "GC001 Q1: If a paper airplane boosted by bagels flies 3.14 miles per bagel, how far will it fly after 2 bagels? (Don't let your calculations get too cheesy!)",
        options: ["3.14 miles", "6.28 miles", "9.42 miles", "Infinite miles"],
        correctAnswer: "6.28 miles",
        explanation: "Two bagels yield 2 x 3.14 ≈ 6.28 miles.",
        timeLimit: 60
      },
      {
        subCourse: "gc001",
        questionText: "GC001 Q2: In Aviation Mathematics, what is the secret ingredient to calculating bagel-powered flight? (Hint: It’s not just math; it's delicious science.)",
        options: ["Addition", "Multiplication", "Pi.", "All of the above"],
        correctAnswer: "Pi.",
        explanation: "Pi (3.14159...) is essential for circular calculations.",
        timeLimit: 60
      },
      {
        subCourse: "gc001",
        questionText: "GC001 Q3: If one bagel boosts speed by 3.14 knots, what is the boost after 5 bagels? (Keep your calculations as crisp as a toasted bagel!)",
        options: ["15.70 knots", "3.14 knots", "7.85 knots", "31.4 knots"],
        correctAnswer: "15.70 knots",
        explanation: "5 x 3.14 ≈ 15.70 knots.",
        timeLimit: 60
      },
      // GC002 – Aviation Physics
      {
        subCourse: "gc002",
        questionText: "GC002: When quantum turbulence meets Newtonian gravity, what does the airplane do? (Think physics with a twist.)",
        options: ["Flies in a straight line", "Does a loop-de-loop", "Achieves chaotic stability", "Explodes with laughter"],
        correctAnswer: "Achieves chaotic stability",
        explanation: "In aviation physics, chaos can be designed into a stable system.",
        timeLimit: 60
      },
      // GC003 – Aircraft Drawing
      {
        subCourse: "gc003",
        questionText: "GC003: In Aircraft Drawing, if your blueprint is so perfect that it could take off, what did you draw? (Hint: It’s not just paper!)",
        options: ["A prototype airplane", "A perfect drawing", "A magical sketch", "Your imagination made it real"],
        correctAnswer: "Your imagination made it real",
        explanation: "Sometimes your drawing is so detailed that it blurs the line between art and engineering!",
        timeLimit: 60
      },
      // GC004 – Basic Aerodynamics
      {
        subCourse: "gc004",
        questionText: "GC004: When asked about aerodynamics, a pilot quips, 'It’s all about lift!' What else does he secretly know? (A little pun never hurts.)",
        options: ["Drag is overrated", "Thrust is just noise", "Proper wing design wins", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Aerodynamics is a full package of physics, design, and a dash of humor.",
        timeLimit: 60
      },
      // GC005 – Aircraft Materials and Hardware
      {
        subCourse: "gc005",
        questionText: "GC005: When asked about the secret of aircraft materials, an engineer winks and replies, 'We use a mix of aluminum and a pinch of magic.' What is he implying?",
        options: ["Materials are expensive", "Science meets art", "The magic ensures safety", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Modern aerospace materials combine science, engineering, and a little bit of creative flair.",
        timeLimit: 60
      },
      // GC006 – Workshop Practices
      {
        subCourse: "gc006",
        questionText: "GC006: In workshop practices, if a mechanic says, 'This wrench is my best friend,' what does that mean?",
        options: ["He loves tools", "He can fix anything", "Warm humor under pressure", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "A mechanic’s toolbox is full of personality and necessity.",
        timeLimit: 60
      },
      // GC007 – Avionics, Airframe and Powerplant Familiarization
      {
        subCourse: "gc007",
        questionText: "GC007: If the avionics system greets the pilot with, 'Time to wake up!', what is it really saying?",
        options: ["Check your instruments", "Prepare for a smooth flight", "It's a system glitch", "None of the above"],
        correctAnswer: "Check your instruments",
        explanation: "Sometimes, avionics speak in hints to ensure you double-check everything.",
        timeLimit: 60
      },

      // --- AV sub-courses (Avionics) – 7 questions, one per sub-course ---
      {
        subCourse: "av001",
        questionText: "AV001: In Electrical Fundamentals, why did the circuit break up with the resistor? (Expect an electrifying pun!)",
        options: ["Lack of spark", "Too much resistance", "It needed a new connection", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Electrical relationships are often short-circuited by too much resistance!",
        timeLimit: 60
      },
      {
        subCourse: "av002",
        questionText: "AV002: When electronics fundamentals get quirky, what's their favorite joke? (Binary humor!)",
        options: ["'There are 10 types of people.'", "'Zero and one happened!'", "'I can’t compute that!'", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Digital humor always leaves you in bits and bytes!",
        timeLimit: 60
      },
      {
        subCourse: "av003",
        questionText: "AV003: How do digital techniques cool off? (Expect a geeky pun!)",
        options: ["They turn on the fans", "They refresh their RAM", "They reboot!", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Sometimes, refreshing is the only way to keep your cool.",
        timeLimit: 60
      },
      {
        subCourse: "av004",
        questionText: "AV004: When an aircraft electrical system 1 goes haywire, what’s the pilot’s quick fix? (A witty response is expected.)",
        options: ["Flip the breaker", "Call for backup", "Trust the system", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Sometimes all you need is a quick flip to bring things back to order.",
        timeLimit: 60
      },
      {
        subCourse: "av005",
        questionText: "AV005: If the second aircraft electrical system is feeling depressed, what might be its remedy? (Expect a humorous analogy.)",
        options: ["A surge of voltage", "A friendly jumper cable", "A reset", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "A little shock therapy never hurt!",
        timeLimit: 60
      },
      {
        subCourse: "av006",
        questionText: "AV006: What does an aircraft communication system text when it’s lost? (Expect a modern twist!)",
        options: ["'Re-routing soon.'", "'Lost in transmission.'", "'Call me maybe.'", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "In today's world, even aircraft systems have witty texts.",
        timeLimit: 60
      },
      {
        subCourse: "av007",
        questionText: "AV007: How do aircraft instrument systems keep secrets? (Tricky and clever!)",
        options: ["By being digital", "They whisper in binary", "They’re calibrated for privacy", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Instrument systems are built with precision—and a bit of mystery.",
        timeLimit: 60
      },

      // --- AF sub-courses (Airframe) – 7 questions ---
      {
        subCourse: "af001",
        questionText: "AF001: When assembling an aircraft, why might the engineer say, 'Measure twice, cut once'? (A twist on a classic proverb!)",
        options: ["To save time", "For perfect rigging", "For weight & balance", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Precision is paramount in airframe assembly and rigging.",
        timeLimit: 60
      },
      {
        subCourse: "af002",
        questionText: "AF002: In structural repairs, what do they say about duct tape? (A humorous exaggeration!)",
        options: ["It fixes everything", "It’s a temporary miracle", "It’s an artform", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Sometimes duct tape seems magical in aircraft repairs.",
        timeLimit: 60
      },
      {
        subCourse: "af003",
        questionText: "AF003: What’s the funniest part of aircraft pneumatic systems? (Expect a pressurized punchline!)",
        options: ["The air jokes", "They’re always under pressure", "They inflate your ego", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Humor in pneumatics is all about pressure!",
        timeLimit: 60
      },
      {
        subCourse: "af004",
        questionText: "AF004: Why do landing gear and flight controls make a great team? (A clever pun is expected!)",
        options: ["They always stick together", "They work in perfect balance", "They never let you down", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "They ensure a safe landing—and a smooth flight!",
        timeLimit: 60
      },
      {
        subCourse: "af005",
        questionText: "AF005: What would an aircraft fuel system say if it could talk? (Get creative!)",
        options: ["'Fill me up, please!'", "'I'm running on empty...'", "'Fuel up or shut down!'", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Fuel systems have a lot at stake—and sometimes a lot to say.",
        timeLimit: 60
      },
      {
        subCourse: "af006",
        questionText: "AF006: How does a cabin environmental system make passengers feel refreshed? (Expect a cool pun!)",
        options: ["By blowing chilly air", "By making ice-cream jokes", "By regulating temperature perfectly", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "A well-tuned cabin system is both cool and comforting.",
        timeLimit: 60
      },
      {
        subCourse: "af007",
        questionText: "AF007: When the auxiliary system is on duty, what does it secretly wish for? (A quirky twist!)",
        options: ["More power", "A day off", "Extra attention", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Even auxiliary systems need a break sometimes!",
        timeLimit: 60
      },

      // --- PP sub-courses (Powerplant) – 4 questions ---
      {
        subCourse: "pp001",
        questionText: "PP001: If an engine were a rockstar, what would its hit single be called? (A fun analogy!)",
        options: ["'Burning Up the Runway'", "'Revved and Ready'", "'Thrusting Beats'", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Engine fundamentals are all about power and performance.",
        timeLimit: 60
      },
      {
        subCourse: "pp002",
        questionText: "PP002: What dance move best describes a gas turbine engine? (Expect a high-energy pun!)",
        options: ["The turbine twist", "The jet break", "The spinning shuffle", "All of the above"],
        correctAnswer: "The turbine twist",
        explanation: "It spins with grace – just like a well-choreographed dance.",
        timeLimit: 60
      },
      {
        subCourse: "pp003",
        questionText: "PP003: Why did the propeller enroll in art school? (A witty question!)",
        options: ["To master its rotation", "To add a new pitch", "To make a lasting impression", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "A propeller’s artistry lies in its perfect rotation and design.",
        timeLimit: 60
      },
      {
        subCourse: "pp004",
        questionText: "PP004: What do you call regular engine inspections? (Expect a humorous twist on maintenance.)",
        options: ["Routine rock 'n' roll", "The maintenance mambo", "A check-up jam", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "Inspection and maintenance are serious – but they can be fun if you think about it!",
        timeLimit: 60
      },

      // --- ICAO sub-courses – 3 questions ---
      {
        subCourse: "icao001",
        questionText: "ICAO001: When a pilot first reads the ICAO Regulation, what might he cheekily exclaim? (Expect an aviation pun!)",
        options: ["'Regulate all the things!'", "'I’m in compliance!'", "'Rules rule!'", "All of the above"],
        correctAnswer: "I'm in compliance!",
        explanation: "A clever pun on the rigorous nature of aviation regulation.",
        timeLimit: 60
      },
      {
        subCourse: "icao002",
        questionText: "ICAO002: ET-CAA Regulation can be as riveting as a soap opera. What’s its catchphrase? (Be witty!)",
        options: ["'Keep calm and comply on'", "'Regulate with passion'", "'Attention to detail is key'", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "ET-CAA regulations inspire both order and a bit of dramatic flair.",
        timeLimit: 60
      },
      {
        subCourse: "icao003",
        questionText: "ICAO003: Why did the FAA Regulation decide to join a comedy club? (Trick question on regulatory stress!)",
        options: ["To relieve red tape stress", "Because it was tired of being so strict", "To learn to laugh at itself", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "FAA regulations are known for their strictness – sometimes a joke is the relief needed!",
        timeLimit: 60
      }
    ];

    // Insert the questions into the database.
    await Question.insertMany(questions);
    console.log("Seeding complete. Inserted", questions.length, "questions.");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
