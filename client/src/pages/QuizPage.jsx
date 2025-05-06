import React, { useState, useEffect } from 'react';
import { Button, Card, Accordion, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Helper function to format time (in seconds) into mm:ss format.
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * generateDummyQuestions()
 * For the given sub-course code (such as "GC001" or "ICAO002"), this function 
 * returns an array of 20 dummy questions. For each sub‐course, the question 
 * templates, answer choices, and explanations are manually inserted.
 */
const generateDummyQuestions = (subCourseCode) => {
  // Clean and normalize the sub-course code.
  const cleanCode = subCourseCode.trim().toUpperCase();
  let topic = "";
  let templates = [];
  let optionSets = [];
  let explanationSets = [];
  
  // Choose the appropriate content based on the sub-course code.
  switch (cleanCode) {
    // GC sub-courses:
    case "GC001": 
    topic = "Aviation Mathematics";
    templates = [
    "What’s the magic number for converting nautical miles to kilometers?",
    "If an aircraft climbs at 500 feet per minute, how high will it be after 10 minutes?",
    "Which unit is used to measure an aircraft’s altitude?",
    "If you double the speed but fly the same time, what happens to the distance?",
    "What’s the basic formula connecting speed, distance, and time?",
    "A flight covers 240 nautical miles in 2 hours. What is the average speed?",
    "What angle forms a right triangle's hypotenuse when the aircraft climbs straight up?",
    "How many feet are in a nautical mile, the classic aviation unit?",
    "What’s the term for a triangle with all sides of different lengths—often used in wind triangle problems?",
    "What’s the value of sin(30°)?",
    "A pilot flies 60° east of north. What type of angle is that?",
    "Convert 90 knots to kilometers per hour (1 knot ≈ 1.852 km/h).",
    "Which formula helps determine the ground speed when wind is a factor?",
    "What do you call a line connecting equal altitudes on a navigation chart?",
    "Why are radians useful in circular flight path calculations?",
    "What triangle rule helps find an unknown side using two sides and the included angle?",
    "Which unit is used for vertical speed in aviation?",
    "If a plane descends at 1,200 feet per minute, how long will it take to descend 9,600 feet?",
    "Which trigonometric function is opposite over hypotenuse?",
    "What tool do pilots use to solve flight planning problems involving heading, wind, and ground speed?"
    ];
    optionSets = [
    ["1.852", "2.5", "1.609", "0.9144"],
    ["5000 feet", "50 feet", "1500 feet", "10000 feet"],
    ["Feet", "Meters", "Seconds", "Miles"],
    ["It doubles", "It stays the same", "It halves", "It quadruples"],
    ["Speed = Distance / Time", "Distance = Time / Speed", "Time = Speed × Distance", "Speed = Time × Distance"],
    ["120 knots", "100 knots", "60 knots", "150 knots"],
    ["90°", "0°", "180°", "45°"],
    ["6076 feet", "5280 feet", "1000 meters", "1 mile"],
    ["Scalene triangle", "Isosceles triangle", "Equilateral triangle", "Right triangle"],
    ["0.5", "1", "0.707", "√3/2"],
    ["Acute", "Right", "Obtuse", "Reflex"],
    ["166.68 km/h", "90 km/h", "100 km/h", "120.56 km/h"],
    ["Ground speed = Airspeed ± Wind component", "Speed = Time / Distance", "Altitude × Time", "Fuel × Distance"],
    ["Contour line", "Isoline", "Isobar", "Isogonic line"],
    ["Because they relate directly to arc lengths", "They are cooler than degrees", "Radians are used in engines", "Pilots use them to plot graphs"],
    ["Cosine rule", "Sine rule", "Pythagorean theorem", "Law of tangents"],
    ["Feet per minute", "Meters per second", "Knots", "Miles per hour"],
    ["8 minutes", "6 minutes", "10 minutes", "12 minutes"],
    ["Sine", "Cosine", "Tangent", "Secant"],
    ["E6B flight computer", "Altimeter", "Heading indicator", "Airspeed indicator"]
    ];
    explanationSets = [
    "1 nautical mile equals approximately 1.852 kilometers—a key conversion in international aviation.",
    "At 500 feet per minute, in 10 minutes the aircraft climbs 5000 feet. Simple multiplication.",
    "Altitude in aviation is typically measured in feet above mean sea level.",
    "Doubling speed doubles the distance when time is constant—basic proportionality.",
    "The relationship between speed, distance, and time is foundational in flight planning.",
    "Distance divided by time gives average speed: 240 / 2 = 120 knots.",
    "An angle of 90° is formed when the aircraft ascends vertically—creating a right triangle.",
    "A nautical mile is defined as exactly 6076 feet—slightly longer than a land mile.",
    "A scalene triangle has all sides of different lengths, useful for solving wind triangle problems.",
    "The sine of 30° is 0.5, a basic trigonometric fact used in navigation and descent angle calculations.",
    "Any angle less than 90° is an acute angle, and 60° qualifies.",
    "To convert 90 knots to km/h: 90 × 1.852 = 166.68 km/h.",
    "To account for wind, you adjust airspeed by the wind component to get ground speed.",
    "These lines are called contour or isoline lines, showing equal values—like altitude.",
    "Radians simplify formulas for arc lengths, making them useful in circular motion calculations.",
    "The cosine rule helps find a missing side when you know two sides and the angle between.",
    "Vertical speed in aviation is usually measured in feet per minute (fpm).",
    "9600 ÷ 1200 = 8 minutes to descend when descending at 1200 fpm.",
    "The sine function is the ratio of opposite side to hypotenuse in a right triangle.",
    "Pilots use the E6B flight computer to calculate heading, wind correction, and ground speed."
    ];
    
      break;
    case "GC002":
      topic = "Aviation Physics";
      templates = [
        "Which principle best explains how lift is generated by an airfoil?",
        "How does a decrease in air density affect lift?",
        "What does Newton's third law imply in terms of aircraft propulsion?"
      ];
      optionSets = [
        ["Bernoulli's principle", "Newton's third law", "Archimedes' principle", "Pascal's law"],
        ["Lift decreases", "Lift increases", "Lift remains constant", "Lift is unpredictable"],
        ["Every action has an equal and opposite reaction", "Force equals mass times acceleration", "Inertia keeps objects stable", "Energy is conserved"]
      ];
      explanationSets = [
        "Bernoulli's principle explains that an increase in airspeed over the wing reduces pressure, thus creating lift.",
        "Lower air density generally reduces the lift generated by the wing as there are fewer air molecules to generate pressure differences.",
        "Newton's third law tells us that the thrust produced by an engine results in an equal and opposite reaction force, which propels the aircraft."
      ];
      break;
    case "GC003":
      topic = "Aircraft Drawing";
      templates = [
        "Which drafting instrument is most critical for maintaining scale in a technical drawing?",
        "What projection method is typically used to depict true dimensions?",
        "Why are varying line weights important in technical aircraft drawings?"
      ];
      optionSets = [
        ["Set square", "Compass", "Drafting pencil", "Eraser"],
        ["Orthographic projection", "Perspective projection", "Oblique projection", "Isometric projection"],
        ["It helps differentiate important features", "It is purely for decoration", "It obscures details", "It is unimportant"]
      ];
      explanationSets = [
        "A set square is essential for ensuring accurate angles and scale, which is critical in technical drafting.",
        "Orthographic projection is commonly used because it represents the true dimensions and shapes without perspective distortion.",
        "Different line weights emphasize various elements of a drawing and improve clarity."
      ];
      break;
    case "GC004":
      topic = "Basic Aerodynamics";
      templates = [
        "Which force is primarily responsible for an aircraft's takeoff?",
        "Which principle explains the pressure differential over a wing?",
        "What happens when the angle of attack exceeds the critical limit?"
      ];
      optionSets = [
        ["Lift", "Drag", "Thrust", "Weight"],
        ["Bernoulli's principle", "Newton's second law", "Friction", "Momentum"],
        ["A stall occurs", "Lift increases continuously", "Drag becomes zero", "Thrust surges"]
      ];
      explanationSets = [
        "Lift overcomes the weight of the aircraft, allowing it to take off.",
        "Bernoulli's principle describes how higher airspeed over the wing reduces pressure, generating lift.",
        "Exceeding the critical angle disrupts airflow, causing a stall and a sudden loss of lift."
      ];
      break;
    case "GC005":
      topic = "Aircraft Materials and Hardware";
      templates = [
        "Which material is most favored in aircraft construction for its strength-to-weight ratio?",
        "Why is corrosion resistance a critical property in aircraft materials?",
        "What is the primary function of rivets in aircraft assembly?"
      ];
      optionSets = [
        ["Aluminum", "Steel", "Titanium", "Composite"],
        ["It increases the lifespan of components", "It is merely aesthetic", "It significantly increases weight", "It is a minor consideration"],
        ["They join components securely", "They provide insulation", "They conduct electricity", "They are decorative"]
      ];
      explanationSets = [
        "Aluminum's high strength-to-weight ratio makes it the material of choice in many aircraft applications.",
        "Corrosion resistance is essential because it prevents deterioration of critical parts, ensuring safety and longevity.",
        "Rivets are used to securely fasten structural components, maintaining the integrity of the aircraft under stress."
      ];
      break;
    case "GC006":
      topic = "Workshop Practices";
      templates = [
        "Why is regular calibration of tools essential in a workshop?",
        "How does an organized workspace improve safety?",
        "What benefit is achieved by routine tool maintenance?"
      ];
      optionSets = [
        ["Ensures precise measurements", "Enhances aesthetics", "Reduces noise levels", "Lowers tool cost"],
        ["It minimizes accidents and facilitates workflow", "It merely looks tidy", "There is no benefit", "It slows down the work"],
        ["It boosts reliability and performance", "It complicates operations", "It increases expenses", "It has no impact"]
      ];
      explanationSets = [
        "Calibration ensures that tools yield accurate measurements, which is fundamental to high-quality work.",
        "An organized workspace prevents accidents and improves overall efficiency by keeping everything in its proper place.",
        "Routine maintenance keeps tools in optimal condition, thereby reducing the likelihood of malfunctions during critical operations."
      ];
      break;
    case "GC007":
      topic = "Avionics, Airframe and Powerplant Familiarization";
      templates = [
        "Which system is crucial for providing navigational data in an aircraft?",
        "How does knowledge of the powerplant contribute to flight safety?",
        "What advantage does familiarity with the airframe offer a pilot?"
      ];
      optionSets = [
        ["Avionics", "Hydraulics", "Fuel system", "Cabin safety"],
        ["It aids in monitoring engine performance", "It is of little importance", "It diminishes workload", "It is only for specialists"],
        ["It enhances situational awareness", "It has no clear benefit", "It reduces flight speed", "It only affects fuel efficiency"]
      ];
      explanationSets = [
        "Avionics systems provide essential navigational, communication, and monitoring data that are critical for safe flight.",
        "Understanding the powerplant enables better monitoring and early detection of performance issues, thus enhancing safety.",
        "Familiarity with the airframe improves a pilot's overall situational awareness during abnormal or emergency conditions."
      ];
      break;
    // AV sub-courses:
    case "AV001":
      topic = "Electrical Fundamentals";
      templates = [
        "What unit is used to measure electric current?",
        "What role does a fuse play in an electrical system?",
        "Why is insulation important in wiring?"
      ];
      optionSets = [
        ["Ampere", "Volt", "Ohm", "Watt"],
        ["It protects the circuit from overcurrent", "It generates electricity", "It stores energy", "It converts current"],
        ["It prevents accidental shocks", "It increases conductivity", "It enhances light output", "It cools the circuit"]
      ];
      explanationSets = [
        "Electric current is measured in amperes, making it the fundamental unit in electrical theory.",
        "A fuse stops the current when it exceeds safe levels, thereby protecting the circuit.",
        "Insulation is vital to prevent accidental contact and electrical shock."
      ];
      break;
    case "AV002":
      topic = "Electronics Fundamentals";
      templates = [
        "Which component amplifies weak signals in electronic circuits?",
        "What is the primary function of a resistor?",
        "Why are integrated circuits important in modern electronics?"
      ];
      optionSets = [
        ["Transistor", "Capacitor", "Diode", "Inductor"],
        ["To limit current flow", "To store charge", "To produce voltage", "To filter signals"],
        ["They integrate multiple functions into one chip", "They are bulky", "They slow processing", "They consume excessive power"]
      ];
      explanationSets = [
        "Transistors amplify signals, which is essential in nearly every modern electronic device.",
        "Resistors limit current flow, protecting delicate components from damage.",
        "Integrated circuits combine many functions into a single small chip, significantly enhancing efficiency and reducing size."
      ];
      break;
    case "AV003":
      topic = "Digital Techniques and Computers";
      templates = [
        "What is the fundamental unit of digital data?",
        "Which component is commonly referred to as the computer's brain?",
        "What does the term 'bit' represent in computing?"
      ];
      optionSets = [
        ["Binary digit", "Hexadecimal", "ASCII", "Analog signal"],
        ["CPU", "RAM", "Storage", "GPU"],
        ["A binary digit", "A byte", "A kilobyte", "A megabyte"]
      ];
      explanationSets = [
        "Digital data is represented in binary form, using 0s and 1s as the fundamental units.",
        "The CPU is the central processing unit responsible for executing program instructions and is often considered the brain of the computer.",
        "A bit is the smallest unit of data in computing, representing a binary value of 0 or 1."
      ];
      break;
    case "AV004":
      topic = "Aircraft Electrical Systems 1";
      templates = [
        "What is the primary function of a circuit breaker in an aircraft?",
        "How is electrical power generally distributed across an aircraft?",
        "Why is proper grounding necessary in aircraft electrical systems?"
      ];
      optionSets = [
        ["To protect against overcurrent", "To boost electricity", "To store energy", "To convert AC to DC"],
        ["Through dedicated power buses", "By individual wiring", "Via wireless signals", "Using satellite relays"],
        ["It prevents dangerous static buildup", "It increases voltage", "It is solely decorative", "It reduces resistance"]
      ];
      explanationSets = [
        "Circuit breakers protect electrical components by stopping the current flow in case of overload.",
        "Aircraft power is typically distributed via power buses, ensuring that all systems receive stable power.",
        "Proper grounding is essential to avoid static discharge and reduce the risk of electrical shock."
      ];
      break;
    case "AV005":
      topic = "Aircraft Electrical Systems 2";
      templates = [
        "What distinguishes an advanced electrical system from a basic system?",
        "How does redundancy improve electrical system safety?",
        "Which component is used to regulate voltage within an aircraft?"
      ];
      optionSets = [
        ["Enhanced diagnostic features", "Simpler wiring", "Reduced power output", "Minimal components"],
        ["Backup circuits maintain functionality if one fails", "It complicates the design", "It has no benefit", "It reduces cost"],
        ["Transformer", "Resistor", "Capacitor", "Inductor"]
      ];
      explanationSets = [
        "Advanced systems include diagnostic capabilities that help engineers detect faults quickly.",
        "Redundancy means that if one circuit fails, another provides a backup, enhancing overall safety.",
        "Transformers are used to adjust voltage levels to suit different parts of the aircraft's electrical system."
      ];
      break;
    case "AV006":
      topic = "Aircraft Communication and Navigation System";
      templates = [
        "Which device is key for accurate satellite-based navigation?",
        "What is the primary goal of reliable data transmission in aviation communications?",
        "How do standardized protocols help maintain effective communication with air traffic control?"
      ];
      optionSets = [
        ["GPS receiver", "Altimeter", "Autopilot", "Radar"],
        ["To ensure timely routing and safety information", "To cause delays", "To confuse signals", "To increase noise"],
        ["They provide clarity and consistency", "They complicate exchanges", "They are rarely used", "They are outdated"]
      ];
      explanationSets = [
        "A GPS receiver uses signals from satellites to accurately determine an aircraft's position.",
        "Reliable data transmission ensures pilots receive the definitive and timely information needed for safe flight.",
        "Standardized protocols are essential for maintaining clear lines of communication between aircraft and air traffic control."
      ];
      break;
    case "AV007":
      topic = "Aircraft Instrument Systems";
      templates = [
        "Which instrument measures an aircraft's altitude?",
        "How does an airspeed indicator work?",
        "Why is the attitude indicator critical during flight?"
      ];
      optionSets = [
        ["Altimeter", "Compass", "Odometer", "Thermometer"],
        ["It detects variations in air pressure", "It measures engine speed", "It computes fuel burn", "It tracks distance"],
        ["It shows pitch and roll relative to the horizon", "It calculates fuel efficiency", "It provides temperature data", "It displays time"]
      ];
      explanationSets = [
        "The altimeter measures altitude based on air pressure variations and is vital for safe flight.",
        "An airspeed indicator monitors air pressure differences caused by speed changes, providing crucial data.",
        "The attitude indicator gives pilots essential information about the aircraft’s orientation relative to the horizon."
      ];
      break;
    // AF sub-courses:
    case "AF001":
      topic = "Aircraft Structure, Assembly, Rigging and Weight & Balance";
      templates = [
        "What is the most crucial factor in achieving proper weight distribution?",
        "How does precise rigging affect an aircraft's overall stability?",
        "Which aspect is critical in assembling an aircraft structure?"
      ];
      optionSets = [
        ["Accurate measurements", "Fast assembly", "Visual appeal", "Random distribution"],
        ["It ensures balanced and safe flight", "It is merely aesthetic", "It increases fuel efficiency slightly", "It is unimportant"],
        ["Precision and attention to detail", "Speed", "Tool quantity", "Decorative finish"]
      ];
      explanationSets = [
        "Accurate measurements guarantee that weight is distributed correctly, which is essential for stable performance.",
        "Precise rigging is fundamental; if done correctly, it enhances stability and controllability during flight.",
        "In structural assembly, meticulous attention to detail is non-negotiable for safety and integrity."
      ];
      break;
    case "AF002":
      topic = "Aircraft Structural Materials and Repairs";
      templates = [
        "Which property of a material is most critical for aircraft construction?",
        "Why is quality repair crucial for structural integrity?",
        "What is the primary factor when choosing repair materials for aerospace applications?"
      ];
      optionSets = [
        ["High strength-to-weight ratio", "Low cost", "Bright color", "Ease of painting"],
        ["It directly impacts safety and durability", "It is mostly cosmetic", "It only saves time", "It is irrelevant"],
        ["Durability and corrosion resistance", "Availability", "Low cost", "Ease of application"]
      ];
      explanationSets = [
        "A high strength-to-weight ratio is fundamental in aircraft materials, ensuring performance without excess weight.",
        "Quality repairs maintain the integrity of structures, directly contributing to the aircraft's safety.",
        "Durability and corrosion resistance are essential in repair materials to guarantee long-term operational safety."
      ];
      break;
    case "AF003":
      topic = "Aircraft Pneumatic and Hydraulic Systems";
      templates = [
        "Which fluid property is most important for optimal hydraulic performance?",
        "How do pneumatic systems fundamentally differ from hydraulic systems?",
        "Why is pressure regulation crucial in these systems?"
      ];
      optionSets = [
        ["Viscosity", "Color", "Taste", "Odor"],
        ["Pneumatics use air while hydraulics use liquid", "They use the same medium", "Pneumatics are generally warmer", "Hydraulics are digital"],
        ["It ensures smooth, controlled operation", "It is irrelevant", "It increases noise", "It complicates design"]
      ];
      explanationSets = [
        "Viscosity directly affects the fluid flow, making it the most important property in hydraulic systems.",
        "Pneumatic systems operate using compressed air, whereas hydraulic systems rely on liquid power.",
        "Pressure regulation maintains proper system performance and protects components from damage."
      ];
      break;
    case "AF004":
      topic = "Aircraft Landing Gear and Flight Control Systems";
      templates = [
        "What is the primary role of an aircraft's landing gear?",
        "How does proper maintenance of flight control systems affect safety?",
        "Which quality in flight control systems is most important for safe operations?"
      ];
      optionSets = [
        ["To absorb landing impact and ensure stability", "To generate thrust", "To improve aesthetics", "To cool the aircraft"],
        ["It ensures responsive and reliable control during flight", "It is only for emergency use", "It is not critical", "It increases fuel consumption"],
        ["Reliability and responsiveness", "Complexity", "Size", "Visual design"]
      ];
      explanationSets = [
        "Landing gear is designed to absorb the force during landing and maintain stability on the runway.",
        "Proper maintenance of flight controls is key to ensuring the aircraft responds predictably during critical maneuvers.",
        "High reliability and responsiveness in control systems are indispensable for safe flight."
      ];
      break;
    case "AF005":
      topic = "Aircraft Fuel System";
      templates = [
        "What is the primary purpose of an aircraft fuel system?",
        "Why is regular maintenance of the fuel system important?",
        "What factor is most critical in the design of a fuel system?"
      ];
      optionSets = [
        ["To deliver fuel efficiently to the engines", "To store additional weight", "To power the electrical systems", "To cool the engines"],
        ["It prevents leaks and ensures consistent engine performance", "It only affects the appearance", "It is not that important", "It increases noise"],
        ["Efficient delivery with minimal leakage", "Complexity of piping", "Heaviness", "Advanced automation"]
      ];
      explanationSets = [
        "The fuel system’s role is to ensure a reliable and efficient flow of fuel to the engines.",
        "Routine maintenance is vital to prevent leaks and failures, thereby ensuring safe engine operation.",
        "An efficient fuel system design minimizes energy loss and maximizes engine performance."
      ];
      break;
    case "AF006":
      topic = "Cabin Environmental System";
      templates = [
        "What is the primary function of the cabin environmental system?",
        "How does managing cabin pressure benefit passengers?",
        "Why is temperature control critical within the aircraft cabin?"
      ];
      optionSets = [
        ["To maintain comfortable and safe environment", "To boost engine performance", "To power the in-flight entertainment", "To control weight distribution"],
        ["It ensures passengers breathe comfortably at high altitude", "It is merely secondary", "It only affects flight duration", "It reduces fuel efficiency"],
        ["It prevents hypoxia and maintains passenger comfort", "It is irrelevant", "It only works in summer", "It is purely ornamental"]
      ];
      explanationSets = [
        "The cabin environmental system is responsible for maintaining air quality, pressure, and overall comfort inside the aircraft.",
        "Regulated cabin pressure is essential for passenger health, ensuring that the air remains breathable even at high altitudes.",
        "Temperature control is critical to ensure a comfortable environment and prevent conditions like hypoxia."
      ];
      break;
    case "AF007":
      topic = "Aircraft Auxiliary System";
      templates = [
        "What role do auxiliary systems play in aircraft operations?",
        "Why is redundancy in auxiliary systems important?",
        "How do auxiliary systems contribute to the overall performance of an aircraft?"
      ];
      optionSets = [
        ["They provide backup functions when primary systems fail", "They generate primary thrust", "They adjust cabin pressure", "They manage in-flight entertainment"],
        ["Redundancy ensures continued operation during failures", "It is unnecessary", "It increases complexity", "It has no benefit"],
        ["They enhance reliability and offer emergency support", "They lower performance", "They are solely for cosmetic purposes", "They merely complicate maintenance"]
      ];
      explanationSets = [
        "Auxiliary systems serve as backup mechanisms to keep the aircraft operational if primary systems encounter issues.",
        "Redundancy in auxiliary systems is crucial to ensure no single point of failure jeopardizes the aircraft.",
        "By providing additional support during emergencies, auxiliary systems bolster overall aircraft reliability."
      ];
      break;
    // PP sub-courses:
    case "PP001":
      topic = "Engine Fundamentals";
      templates = [
        "What is the main function of an aircraft engine?",
        "How does engine performance affect flight efficiency?",
        "Which element is most critical for optimal engine operation?"
      ];
      optionSets = [
        ["To produce thrust", "To cool the aircraft", "To power the lighting", "To control navigation"],
        ["Better performance enhances fuel efficiency", "It only affects noise", "It does not matter much", "It solely influences speed"],
        ["Efficient combustion and proper maintenance", "Aesthetic design", "Engine size", "Exterior finish"]
      ];
      explanationSets = [
        "The primary function of an aircraft engine is to produce thrust by burning fuel efficiently.",
        "Engine performance is directly linked to fuel efficiency and overall flight performance.",
        "Optimal engine operation requires efficient combustion along with strict maintenance routines."
      ];
      break;
    case "PP002":
      topic = "Gas Turbine Engine Systems";
      templates = [
        "What distinguishes a gas turbine engine from a piston engine?",
        "Why is continuous combustion beneficial for gas turbines?",
        "What is a major advantage of using gas turbine engines in aircraft?"
      ];
      optionSets = [
        ["Continuous combustion provides constant power", "They require manual cranking", "They operate intermittently", "They use spark plugs"],
        ["It generates steady thrust and efficiency", "It leads to erratic performance", "It wastes fuel", "It is mostly noisy"],
        ["High power-to-weight ratio", "Lower efficiency", "Higher maintenance costs", "Larger engine size"]
      ];
      explanationSets = [
        "Gas turbine engines operate on continuous combustion cycles, differentiating them from piston engines.",
        "Continuous combustion in gas turbines delivers a constant flow of power, which is advantageous for stable performance.",
        "Their high power-to-weight ratio is a significant benefit, making them ideal for modern aviation needs."
      ];
      break;
    case "PP003":
      topic = "Aircraft Propeller Systems";
      templates = [
        "What is the primary role of a propeller in an aircraft?",
        "How does adjusting the pitch angle affect propeller performance?",
        "Why is propeller efficiency important in aviation?"
      ];
      optionSets = [
        ["Converting engine power into thrust", "Generating electrical power", "Cooling the engine", "Ventilating the cockpit"],
        ["It alters thrust output and overall efficiency", "It has no real effect", "It only changes noise level", "It reduces engine speed"],
        ["It directly influences fuel consumption and aircraft performance", "It is a minor factor", "It is used only for decoration", "It is irrelevant"]
      ];
      explanationSets = [
        "The propeller converts rotational power into thrust, which is fundamental to an aircraft's propulsion.",
        "Adjusting the pitch angle changes the aerodynamics of the blades, affecting both thrust and efficiency.",
        "High propeller efficiency means better fuel economy and overall performance."
      ];
      break;
    case "PP004":
      topic = "Aircraft Engine Inspection & Maintenance";
      templates = [
        "Why is a thorough engine inspection critical before every flight?",
        "What is the primary focus during routine engine maintenance?",
        "How does proper maintenance improve engine longevity?"
      ];
      optionSets = [
        ["To prevent in-flight failures", "To simply fill out forms", "To delay departures", "To improve appearance"],
        ["Checking for wear, leaks, and damage", "Only cleaning the exterior", "Repainting all surfaces", "Updating software"],
        ["It extends the engine’s lifespan and ensures reliability", "It has little impact", "It raises fuel consumption", "It increases complexity"]
      ];
      explanationSets = [
        "A thorough inspection is vital to identify potential issues and avoid in-flight engine failures.",
        "Routine maintenance that checks for physical and performance issues is crucial for safe operations.",
        "Proper maintenance leads to a longer, more reliable engine life and contributes to overall flight safety."
      ];
      break;
    // ICAO sub-courses:
    case "ICAO001":
      topic = "ICAO Regulation - Initial";
      templates = [
        "What is the primary purpose of initial ICAO regulations?",
        "How do these regulations benefit international aviation?",
        "Why is establishing a baseline of rules important in airborne safety?"
      ];
      optionSets = [
        ["To set fundamental operating standards", "To limit competition", "To create excessive paperwork", "To reduce innovation"],
        ["They ensure consistency and safety across nations", "They hinder operations", "They are purely bureaucratic", "They are optional guidelines"],
        ["Standardization helps maintain a minimum level of safety", "It is not critical", "It complicates procedures", "It only matters locally"]
      ];
      explanationSets = [
        "Initial ICAO regulations establish the basic standards required for safe aviation practices worldwide.",
        "Consistent rules across borders help airlines operate safely and efficiently on an international scale.",
        "A uniform baseline of rules is essential to manage safety and ensure effective enforcement globally."
      ];
      break;
    case "ICAO002":
      topic = "ET-CAA Regulation";
      templates = [
        "What aspect does ET-CAA regulation primarily cover?",
        "How do ET-CAA guidelines improve operational procedures?",
        "Why is adherence to ET-CAA regulation crucial?"
      ];
      optionSets = [
        ["Ensuring aircraft airworthiness", "Managing in-flight meals", "Scheduling crew shifts", "Handling ground transportation"],
        ["They standardize maintenance and safety procedures", "They delay operations", "They have minimal effect", "They complicate scheduling"],
        ["Strict adherence prevents accidents and promotes efficiency", "They are optional", "They add bureaucracy", "They have a negligible impact"]
      ];
      explanationSets = [
        "ET-CAA regulation focuses on maintaining the airworthiness of aircraft, which is fundamental for safety.",
        "By standardizing procedures, these guidelines enhance consistency and reliability in operations.",
        "Adhering to ET-CAA regulations is critical for ensuring safe and reliable aircraft performance."
      ];
      break;
    case "ICAO003":
      topic = "FAA Regulation";
      templates = [
        "How do FAA regulations impact international aviation standards?",
        "What critical aspect of FAA guidelines enhances safety?",
        "Why are FAA standards considered models in aviation?"
      ];
      optionSets = [
        ["They enforce stringent safety criteria", "They set only minimal requirements", "They focus on aesthetic standards", "They are region-specific"],
        ["They provide detailed operational guidelines", "They are abstract", "They are rarely enforced", "They rely on voluntary compliance"],
        ["Their thoroughness and consistency make them benchmarks", "They are inconsistent", "They are outdated", "They are overly relaxed"]
      ];
      explanationSets = [
        "FAA regulations are known for their strict safety standards, which often form the basis for international benchmarks.",
        "Detailed and specific guidelines in FAA regulations help to ensure that operational risks are minimized.",
        "The consistency and rigor of FAA standards make them a reference point for aviation safety worldwide."
      ];
      break;
    default:
      topic = subCourseCode;
      templates = [
        "What is the most critical factor in understanding this subject?",
        "How does theoretical knowledge translate into practical skills in this area?",
        "What challenge is most frequently encountered in this subject?"
      ];
      optionSets = [
        ["Practical application", "Theoretical knowledge", "Cost-effectiveness", "Time management"],
        ["Hands-on experience is key", "Theory is abstract", "Budget constraints are crucial", "Deadlines often dominate"],
        ["It requires creative problem solving", "There are rarely challenges", "It is straightforward", "It is unpredictable"]
      ];
      explanationSets = [
        "In this subject, applying theory practically is essential for success.",
        "Understanding the theory is the first step toward developing effective practical skills.",
        "The challenges here often require innovative and creative solutions."
      ];
      break;
  }
  
  // Generate 20 questions by cycling through the templates.
  const dummyQuestions = [];
  for (let i = 1; i <= 20; i++) {
    const templateIndex = (i - 1) % templates.length;
    dummyQuestions.push({
      _id: `${cleanCode.toLowerCase()}-${i}`,
      subCourse: cleanCode.toLowerCase(),
      questionText: templates[templateIndex],
      options: optionSets[templateIndex],
      correctAnswer: optionSets[templateIndex][0], // Assume the first option is correct.
      explanation: explanationSets[templateIndex],
      timeLimit: 60
    });
  }
  return dummyQuestions;
};

const QuizPage = ({ setQuizStatus }) => {
  // Retrieve URL parameters.
  const { category, subNum } = useParams();
  const cleanSubCourseCode = subNum.trim().toUpperCase();
  const subCourseKey = cleanSubCourseCode.toLowerCase();

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  // // Fetch questions from your API endpoint using subCourseKey.
  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/questions?subCourse=${subCourseKey}`)
  //     .then((response) => response.json())
  //     .then((data) => setQuestions(data))
  //     .catch((err) => console.error("Error fetching questions:", err));
  // }, [subCourseKey]);
  // ------------------------------------------------------------------

  // Instead, generate dummy questions locally.
  const [questions, setQuestions] = useState(generateDummyQuestions(cleanSubCourseCode));

  // Set total quiz time to 1 hour (3600 seconds).
  const initialTime = 3600;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [passed, setPassed] = useState(null);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  // Update the quiz status for the Navbar.
  // useEffect(() => {
  //   if (setQuizStatus) {
  //     setQuizStatus({
  //       givenTime: initialTime,
  //       remainingTime: timeLeft,
  //       answered: answeredCount,
  //       total: totalQuestions,
  //     });
  //   }
  // }, [timeLeft, answeredCount, totalQuestions, setQuizStatus, initialTime]);

  // Timer countdown effect.
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timerID = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerID);
  }, [timeLeft, submitted]);

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  // Submission handler.
  const handleSubmit = () => {
    setSubmitted(true);
    let sc = 0;
    questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) {
        sc++;
      }
    });
    setScore(sc);
    setPassed((sc / totalQuestions) * 100 >= 70);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    // window.scrollTo({ bottom: 0, behavior: "smooth" });

  };

  // Restart handler.
  const handleRestart = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setPassed(null);
    setTimeLeft(initialTime);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Responsiveness: track if it is mobile view.
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (totalQuestions === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No questions available for {subNum}.</h2>
      </div>
    );
  }

  // Define card style.
  const cardStyle = {
    marginBottom: "20px",
    width: "80vw",
    maxWidth: "80vw",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  };

  // Tracker (timer and progress) style.
  const trackerStyle = {
    position: "sticky",
    top: "60px",
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(5px)",
    padding: "5px 10px",
    borderRadius: "4px",
    zIndex: 999,
    fontSize: "0.9rem",
    textAlign: "center",
    marginBottom: "10px"
  };

  return (
    <div style={{ padding: "20px" }}>
      {isMobile ? (
        <div  style={trackerStyle}>
          <div>
            <span role="img" aria-label="timer">⏰</span> {formatTime(timeLeft)}
          </div>
          <div>
            {answeredCount} / {totalQuestions} progress
          </div>
        </div>
      ) : (
        <div style={{ position: "fixed", right: "20px", top: "120px" }} className="progress-aside">
          <div style={trackerStyle}>
            <div>
              <span role="img" aria-label="timer">⏰</span> {formatTime(timeLeft)}
            </div>
            <div>
              {answeredCount} / {totalQuestions} progress
            </div>
          </div>
        </div>
      )}

      <h2 style={{ textAlign: "center" }}>
        {category} {subCourseKey}
      </h2>

      {questions.map((q, index) => (
        <Card key={q._id} style={cardStyle}>
          <Card.Body>
            <div style={{ marginBottom: "10px" }}>
              <strong>Question {index + 1}</strong>
              <hr style={{ margin: "5px 0" }} />
            </div>
            <div style={{ marginBottom: "10px" }}>{q.questionText}</div>
            <Form>
              {q.options.map((option, idx) => {
                let labelColor = "inherit";
                if (submitted) {
                  if (option === q.correctAnswer) {
                    labelColor = "green";
                  } else if (answers[q._id] === option && option !== q.correctAnswer) {
                    labelColor = "red";
                  }
                }
                return (
                  <Form.Check
                    type="radio"
                    id={`q${q._id}_option${idx}`}
                    name={`question-${q._id}`}
                    label={option}
                    key={`${q._id}-${idx}`}
                    value={option}
                    checked={answers[q._id] === option}
                    onChange={() => handleOptionChange(q._id, option)}
                    style={{ fontSize: "1rem", marginBottom: "8px", color: labelColor }}
                  />
                );
              })}
            </Form>
            {submitted && (
              <div style={{ marginTop: "10px", fontSize: "0.9rem", marginLeft: "10px" }}>
                {answers[q._id] === q.correctAnswer ? (
                  <div style={{ color: "green" }}>Your answer is correct.</div>
                ) : (
                  <div style={{ color: "red" }}>
                    Your answer is incorrect. The correct answer is: <strong>{q.correctAnswer}</strong>.
                  </div>
                )}
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <span style={{ marginRight: "8px" }}>▼</span>Description
                    </Accordion.Header>
                    <Accordion.Body>{q.explanation}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      {!submitted && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button variant="primary" onClick={handleSubmit} style={{ transition: "all 0.3s ease" }}>
            Submit
          </Button>
        </div>
      )}

      {submitted && (
        <div style={{ textAlign: "center", marginTop: "20px", transition: "all 0.3s ease" }}>
          <h3>Score: {((score / totalQuestions) * 100).toFixed(0)}% ({score} / {totalQuestions})</h3>
          <h4>{passed ? "Passed" : "Failed"}</h4>
          {!passed && (
            <Button variant="warning" onClick={handleRestart} style={{ transition: "all 0.3s ease" }}>
              Retry
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
