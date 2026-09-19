/**
 * SITE_CONFIG
 * -----------------------------------------------------------------------
 * Centralized configuration for Jubilee Prosthetics & Orthotics.
 * Every component reads from this object instead of hard-coding values,
 * so updating a phone number, address, or link only requires one edit.
 *
 * CONTENT STATUS KEY (see brief §48):
 *   APPROVED  -> confirmed from the Jubilee client form
 *   REQUIRED  -> not supplied yet; placeholder must stay visible until set
 * -----------------------------------------------------------------------
 */

const SITE_CONFIG = {
  siteName: "Jubilee Prosthetics & Orthotics",
  shortName: "Jubilee",
  tagline: "Turning Challenges Into Triumph And Dreams Into Reality.", // APPROVED

  // ---- Contact (APPROVED — from client form) --------------------------
  phone: "09122556371",
  phoneDisplay: "0912 255 6371",
  whatsapp: "09122556371",
  whatsappIntl: "2349122556371", // normalized for wa.me links (NG country code assumed from local format)
  email: "jubileeprostheticsandorthotics@gmail.com",
  address: {
    line1: "79c Afoko Road",
    line2: "Abakaliki, Ebonyi State, Nigeria",
    full: "79c Afoko Road, Abakaliki, Ebonyi State, Nigeria",
  },

  // ---- Status: map is resolved (client-supplied link); hours still pending
  businessHours: "[BUSINESS HOURS TO BE CONFIRMED]", // source only gave "08:00", no closing time
  mapsUrl: "https://maps.app.goo.gl/u2xPzyUDeC3MGgMq8", // client-supplied
  mapsEmbedSrc: "https://www.google.com/maps?q=6.3230608,8.1120116&z=15&output=embed",

  // ---- Social (APPROVED where supplied; REQUIRED otherwise) -----------
  social: {
    facebook: "https://www.facebook.com/okoro.chibuzor.908/", // [CLIENT CONTENT REQUIRED — paste confirmed Facebook URL]
    instagram: null,
    linkedin: null,
    tiktok: null,
    twitter: null,
    youtube: null,
  },

  // ---- Brand values (APPROVED) -----------------------------------------
  values: [
    { name: "Compassion", note: "Every patient is met with empathy and respect." },
    { name: "Excellence", note: "Clinical quality is never compromised." },
    { name: "Innovation", note: "Modern approaches to mobility and support." },
    { name: "Integrity", note: "Honest guidance, every step of the way." },
    { name: "Patient-Centred Care", note: "Solutions built around the individual." },
    { name: "Empowerment", note: "Helping people move with confidence." },
    { name: "Accessibility", note: "Care that is easy to reach and understand." },
    // "TW" appears in the source values list without a clear expansion —
    // treated as [CLIENT CONTENT REQUIRED], intentionally omitted from display.
  ],

  mission: "To provide accessible, innovative, and patient-centered prosthetic and orthotic services.",
  vision: "To become a leading center of excellence in prosthetics and orthotics, and transform lives.",

  // ---- Practitioner (APPROVED — only supplied fields used) -------------
  practitioner: {
    name: "Okoro Chibuzor Ogonnaya",
    title: "Clinical Prosthetist and Orthotist / CEO, CMD",
    qualification: "B.Tech in Prosthetics and Orthotics",
    experience: "5 years of experience",
    image: "assets/images/team/practitioner-primary.jpg", // rename photo to this exact name, drop in assets/images/team/
  },

  // ---- Navigation --------------------------------------------------------
  nav: [
    { label: "About", href: "about.html" },
    { label: "Services", href: "services.html" },
    { label: "Patient Stories", href: "patient-stories.html" },
    { label: "Resources", href: "resources.html" },
    { label: "FAQ", href: "faq.html" },
    { label: "Contact", href: "contact.html" },
  ],

  // ---- CTA labels (consistent site-wide) --------------------------------
  cta: {
    bookAppointment: "Book an Appointment",
    talkToJubilee: "Talk to Jubilee",
    whatsapp: "Chat on WhatsApp",
    call: "Call Jubilee",
    exploreService: "Explore Service",
    learnMore: "Learn More",
    exploreServices: "Explore Our Services",
    exploreResources: "Explore Resources",
  },

  // ---- Services (APPROVED categories from client form) ------------------
  // Each `stock.src` is a LOCAL FILE PATH, not a stock photo. To add your
  // own photo for a service: save/export your image, rename it to exactly
  // match the filename below, and drop it into that exact folder — nothing
  // else needs to change. Until a file exists at that path, the image
  // automatically falls back to a labelled placeholder showing that same
  // path, so it's always obvious what still needs to be added.
  serviceCategories: [
    {
      slug: "prosthetic-services",
      name: "Prosthetic Services",
      short: "Custom-fit prosthetic limbs designed around your goals and daily life.",
      image: "assets/images/services/prosthetics",
      stock: {
        src: "assets/images/services/prosthetics/hero.jpeg",
        alt: "A clinician fits and adjusts a prosthetic limb for a patient",
      },
    },
    {
      slug: "orthotic-services",
      name: "Orthotic Services",
      short: "Supportive devices that improve alignment, stability and movement.",
      image: "assets/images/services/orthotics",
      stock: {
        src: "assets/images/services/orthotics/hero.jpg",
        alt: "A technician precisely adjusts an orthotic leg brace",
      },
    },
    {
      slug: "pediatric-services",
      name: "Pediatric Prosthetics & Orthotics",
      short: "Specialized, growth-aware care designed for children.",
      image: "assets/images/services/pediatric",
      stock: {
        src: "assets/images/services/pediatric/hero.jpeg",
        alt: "A child receiving pediatric prosthetic or orthotic care",
      },
    },
    {
      slug: "gait-rehabilitation",
      name: "Gait Assessment & Rehabilitation",
      short: "Movement assessment and rehabilitation support toward confident mobility.",
      image: "assets/images/services/rehabilitation",
      stock: {
        src: "assets/images/services/rehabilitation/hero.jpeg",
        alt: "A physiotherapy session focused on movement and rehabilitation",
      },
    },
    {
      slug: "repairs",
      name: "Prosthetic & Orthotic Repairs",
      short: "Keeping your device functioning safely and comfortably.",
      image: "assets/images/services/repairs",
      stock: {
        src: "assets/images/services/repairs/hero.jpg",
        alt: "A technician repairing a prosthetic or orthotic device",
      },
    },
    {
      slug: "mobility-solutions",
      name: "Custom & Innovative Mobility Solutions",
      short: "Tailored solutions for individual mobility needs.",
      image: "assets/images/services/mobility",
      stock: {
        src: "assets/images/services/mobility/hero.jpeg",
        alt: "A person using a mobility solution provided by Jubilee",
      },
    },
  ],

  // ---- Hero / editorial photos — same local-file system as above --------
  stockImages: {
    hero: {
      src: "assets/images/hero/hero-primary.jpg",
      alt: "A Jubilee patient moving confidently — replace with Jubilee's own hero photo",
    },
    humanStory: {
      src: "assets/images/patients/human-story.jpg",
      alt: "A patient and their family, representing independence and connection",
    },
  },
};

// Freeze to discourage accidental mutation from page scripts.
Object.freeze(SITE_CONFIG);
