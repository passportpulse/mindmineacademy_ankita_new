import nursing from "../assets/nursing.jpeg";
import phlebotomy from "../assets/phlebotomy.png";
import assistant from "../assets/assistant.jpg";
import labAssistant from "../assets/lab-assistant.png";
import ot from "../assets/ot.jpg";
import physiotherapy from "../assets/physiotherapy.png";
import icu from "../assets/icu.png";
import optometry from "../assets/optometry.jpeg";
import nutrition from "../assets/nutrition.jpg";
import culinary from "../assets/culinary.png";
import cake from "../assets/cake.jpg";
import fashion from "../assets/fashion.png";
import jwellary from "../assets/jwellary.jpg";
import interior from "../assets/interior.jpg";
import texttile from "../assets/texttile.jpg";
import food from "../assets/food.jpg";

const courses = [
  // ================= HEALTHCARE =================
  {
    title: "General Nursing",
    slug: "general-nursing",
    type: "Diploma",
    duration: "3 Years",
    shortDescription: "Comprehensive training in patient care, hospital procedures, and basic nursing skills.",
    fullDescription:
      "Gain practical and theoretical knowledge in general nursing, patient care, clinical practices, and healthcare management.",
    modules: ["Anatomy & Physiology", "Fundamentals of Nursing", "Clinical Training", "Community Health", "Patient Care"],
    eligibility: "10+2 passed in any stream (Science preferred), biology recommended.",
    image: nursing,
    category: "healthcare",
  },
  {
    title: "Phlebotomy",
    slug: "phlebotomy",
    type: "Certificate",
    duration: "6 Months",
    shortDescription: "Learn blood collection, handling, and laboratory safety protocols.",
    fullDescription:
      "Training in venipuncture, sample collection, laboratory safety, and patient communication skills.",
    modules: ["Blood Collection Techniques", "Lab Safety", "Patient Handling", "Sample Storage", "Quality Control"],
    eligibility: "10+2 passed in any stream.",
    image: phlebotomy,
    category: "healthcare",
  },
  {
    title: "General Duty Assistant",
    slug: "general-duty-assistant",
    type: "Certificate",
    duration: "1 Year",
    shortDescription: "Assist healthcare staff with basic patient care and hospital operations.",
    fullDescription:
      "Hands-on training in patient support, hygiene assistance, ward management, and basic medical procedures.",
    modules: ["Patient Care Basics", "Hospital Operations", "Hygiene & Safety", "Medical Terminology", "Assisting Staff"],
    eligibility: "10+2 passed in any stream.",
    image: assistant,
    category: "healthcare",
  },
  {
    title: "Medical Lab Assistant",
    slug: "medical-lab-assistant",
    type: "Diploma",
    duration: "1 Year",
    shortDescription: "Training in laboratory procedures, testing, and sample analysis.",
    fullDescription:
      "Learn clinical laboratory techniques, sample processing, equipment handling, and laboratory safety.",
    modules: ["Lab Safety", "Sample Collection", "Basic Testing", "Equipment Handling", "Record Keeping"],
    eligibility: "10+2 passed (Science preferred).",
    image: labAssistant,
    category: "healthcare",
  },
  {
    title: "OT Assistant",
    slug: "ot-assistant",
    type: "Certificate",
    duration: "6 Months",
    shortDescription: "Support surgical teams in operation theatre procedures and sterilization.",
    fullDescription:
      "Gain practical experience assisting in surgeries, handling OT instruments, sterilization, and patient prep.",
    modules: ["OT Protocols", "Instrument Handling", "Sterilization Techniques", "Patient Prep", "Post-Operative Care"],
    eligibility: "10+2 passed in any stream.",
    image: ot,
    category: "healthcare",
  },
  {
    title: "Physiotherapy Assistant",
    slug: "physiotherapy-assistant",
    type: "Certificate",
    duration: "6 Months",
    shortDescription: "Assist physiotherapists with rehabilitation exercises and patient care.",
    fullDescription:
      "Training in basic physiotherapy techniques, exercise routines, patient monitoring, and documentation.",
    modules: ["Exercise Assistance", "Rehabilitation Techniques", "Patient Monitoring", "Equipment Handling", "Record Keeping"],
    eligibility: "10+2 passed in any stream.",
    image: physiotherapy,
    category: "healthcare",
  },
  {
    title: "ICU Assistant",
    slug: "icu-assistant",
    type: "Certificate",
    duration: "6 Months",
    shortDescription: "Support ICU staff with patient monitoring and critical care procedures.",
    fullDescription:
      "Hands-on training in ICU protocols, patient monitoring, vital signs, and assisting healthcare staff.",
    modules: ["ICU Basics", "Patient Monitoring", "Critical Care Assistance", "Equipment Handling", "Safety Protocols"],
    eligibility: "10+2 passed (Science preferred).",
    image: icu,
    category: "healthcare",
  },
  {
    title: "Optometry Assistant",
    slug: "optometry-assistant",
    type: "Certificate",
    duration: "6 Months",
    shortDescription: "Assist optometrists in eye exams, patient care, and vision testing.",
    fullDescription:
      "Learn basic eye care, visual testing, lens preparation, and assisting in optometry procedures.",
    modules: ["Eye Examination", "Vision Testing", "Lens Handling", "Patient Assistance", "Record Maintenance"],
    eligibility: "10+2 passed in any stream.",
    image: optometry,
    category: "healthcare",
  },

  // ================= FOOD / CULINARY / NUTRITION =================
  {
    title: "Food & Nutrition",
    slug: "food-nutrition",
    type: "Diploma",
    duration: "1 Year",
    shortDescription: "Learn balanced diet planning, nutrition science, and dietary guidelines.",
    fullDescription:
      "Gain knowledge in food science, nutrition planning, meal preparation, and healthy eating practices.",
    modules: ["Nutrition Basics", "Diet Planning", "Food Safety", "Meal Preparation", "Dietary Guidelines"],
    eligibility: "10+2 passed in any stream.",
    image: nutrition,
    category: "food",
  },
  {
    title: "Culinary & Food Production",
    slug: "culinary-food-production",
    type: "Diploma",
    duration: "1 Year",
    shortDescription: "Master cooking techniques, kitchen management, and food production.",
    fullDescription:
      "Hands-on training in culinary skills, kitchen operations, recipe development, and food production techniques.",
    modules: ["Cooking Techniques", "Kitchen Management", "Recipe Development", "Food Presentation", "Hygiene & Safety"],
    eligibility: "10+2 passed in any stream.",
    image: culinary,
    category: "food",
  },
  {
    title: "Cake Making",
    slug: "cake-making",
    type: "Certificate",
    duration: "6 Months",
    shortDescription: "Learn baking, cake decoration, and pastry arts.",
    fullDescription:
      "Hands-on training in cake baking, decoration, icing techniques, and basic pastry preparation.",
    modules: ["Baking Basics", "Cake Decoration", "Icing Techniques", "Pastry Basics", "Food Safety"],
    eligibility: "10+2 passed in any stream.",
    image: cake,
    category: "food",
  },
  {
    title: "Food & Beverage",
    slug: "food-beverage",
    type: "Diploma",
    duration: "1 Year",
    shortDescription: "Training in beverage preparation, service, and hospitality standards.",
    fullDescription:
      "Learn beverage making, service techniques, customer handling, and hygiene standards in hospitality.",
    modules: ["Beverage Preparation", "Customer Service", "Hygiene & Safety", "Menu Planning", "Presentation Skills"],
    eligibility: "10+2 passed in any stream.",
    image: food,
    category: "food",
  },

  // ================= MANAGEMENT & IT / DESIGN =================
  {
    title: "Fashion Design",
    slug: "fashion-design",
    type: "Diploma",
    duration: "1 Year",
    shortDescription: "Learn design principles, garment creation, and fashion illustration.",
    fullDescription:
      "Training in clothing design, pattern making, fabric selection, and creating fashion collections.",
    modules: ["Design Basics", "Garment Construction", "Fabric Studies", "Illustration", "Portfolio Creation"],
    eligibility: "10+2 passed in any stream.",
    image: fashion,
    category: "management",
  },
  {
    title: "Jewellery Design",
    slug: "jewellery-design",
    type: "Diploma",
    duration: "1 Year",
    shortDescription: "Learn jewelry crafting, design concepts, and gemology basics.",
    fullDescription:
      "Hands-on training in jewelry design, metalwork, gemstones, and creating jewelry pieces.",
    modules: ["Design Concepts", "Metalwork", "Gemology Basics", "Crafting Techniques", "Portfolio Development"],
    eligibility: "10+2 passed in any stream.",
    image: jwellary,
    category: "management",
  },
  {
    title: "Interior Design",
    slug: "interior-design",
    type: "Diploma",
    duration: "1 Year",
    shortDescription: "Training in space planning, aesthetics, and interior decoration.",
    fullDescription:
      "Learn to design functional and aesthetic interiors, furniture layout, color theory, and materials selection.",
    modules: ["Space Planning", "Color & Materials", "Furniture Layout", "Decor Principles", "Project Work"],
    eligibility: "10+2 passed in any stream.",
    image: interior,
    category: "management",
  },
  {
    title: "Textile Design",
    slug: "textile-design",
    type: "Diploma",
    duration: "1 Year",
    shortDescription: "Learn fabric design, weaving, printing, and surface ornamentation.",
    fullDescription:
      "Training in textile patterns, weaving techniques, dyeing, and developing fabric collections.",
    modules: ["Fabric Design", "Weaving Techniques", "Printing & Dyeing", "Surface Ornamentation", "Portfolio Creation"],
    eligibility: "10+2 passed in any stream.",
    image: texttile,
    category: "management",
  },
];

export default courses;
