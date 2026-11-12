/**
 * RESOURCES_CONTENT
 * -----------------------------------------------------------------------
 * CMS-shaped article records. Field names match the Blog/Resources
 * collection described in the README, so swapping this array for a CMS
 * fetch() later requires no template changes.
 *
 * CONTENT STATUS: DESIGN PLACEHOLDER, general, non-clinical orientation
 * copy written so the Resources area is demonstrable. Every article below
 * must be reviewed and approved by Jubilee before publication, and no
 * clinical instruction, dosage, timeline or outcome is asserted anywhere.
 * -----------------------------------------------------------------------
 */
const RESOURCES_CONTENT = [
  {
    slug: "preparing-for-your-first-appointment",
    title: "Preparing for your first appointment",
    category: "Appointments",
    excerpt:
      "A short checklist to help your first visit to Jubilee go smoothly, what to bring, what to wear, and what to expect.",
    author: "Jubilee Prosthetics & Orthotics",
    date: "2026-01-15",
    readingTime: "3 min read",
    image: "assets/images/blog/preparing-for-your-first-appointment",
    featured: true,
    seoTitle: "Preparing for Your First Appointment | Jubilee",
    seoDescription:
      "What to bring, what to wear and what to expect at your first prosthetics or orthotics appointment with Jubilee.",
    body: [
      { h: "Before you come", p: "Gather anything that helps Jubilee's team understand your situation: referral letters, previous medical records relating to your mobility, and a list of any medications you take. If you already use a prosthetic or orthotic device, bring it with you, even if it is damaged or no longer fits well." },
      { h: "What to wear", p: "Comfortable, loose clothing makes assessment easier, particularly anything that allows easy access to the area being looked at. Many people find shorts or loose trousers helpful for lower-limb appointments." },
      { h: "Bring someone if it helps", p: "You are welcome to bring a family member, caregiver or friend. A second set of ears can be useful, especially at a first visit when there is a lot to take in." },
      { h: "Questions are welcome", p: "Write down anything you want to ask before you arrive, it is easy to forget in the moment. No question is too small, and Jubilee's team would rather you ask than leave uncertain." },
      { h: "What happens on the day", p: "Your visit will generally involve a conversation about your goals and daily life, followed by an assessment. What comes next depends entirely on your individual situation, and Jubilee's clinical team will discuss that with you directly." },
    ],
  },
  {
    slug: "caring-for-your-prosthetic-device",
    title: "Caring for your prosthetic device",
    category: "Device Care",
    excerpt:
      "General day-to-day habits that help keep a prosthetic device comfortable, clean and working as it should.",
    author: "Jubilee Prosthetics & Orthotics",
    date: "2026-01-28",
    readingTime: "3 min read",
    image: "assets/images/blog/caring-for-your-prosthetic-device",
    featured: true,
    seoTitle: "Caring for Your Prosthetic Device | Jubilee",
    seoDescription:
      "General guidance on keeping a prosthetic device clean, comfortable and in good working order between appointments.",
    body: [
      { h: "Keep it clean and dry", p: "Dirt and moisture are the most common causes of everyday discomfort. Wiping down the parts of the device that contact your skin, and allowing everything to dry fully, goes a long way." },
      { h: "Pay attention to your skin", p: "Your skin is the best early warning system you have. Redness that does not fade, new soreness, or any change in how the device sits are all worth raising with Jubilee rather than waiting to see if they settle." },
      { h: "Notice changes in fit", p: "Bodies change, and a device that fit well a few months ago may not fit the same way today. A device that feels looser, tighter, or that has started making new noises is worth having checked." },
      { h: "Store it sensibly", p: "Keep the device somewhere dry and out of direct heat when it is not being worn, and avoid leaving it anywhere it could be knocked or stood on." },
      { h: "When to get in touch", p: "If something feels wrong, contact Jubilee. It is always easier to address a small issue early than to wait until it affects your mobility or your skin." },
    ],
  },
  {
    slug: "understanding-orthotic-devices",
    title: "Understanding orthotic devices",
    category: "Orthotics",
    excerpt:
      "A plain-language introduction to what orthoses are, the different forms they take, and the role they play in movement.",
    author: "Jubilee Prosthetics & Orthotics",
    date: "2026-02-10",
    readingTime: "4 min read",
    image: "assets/images/blog/understanding-orthotic-devices",
    featured: false,
    seoTitle: "Understanding Orthotic Devices | Jubilee",
    seoDescription:
      "A plain-language introduction to orthotic devices, what they are, the forms they take, and how they support movement.",
    body: [
      { h: "What an orthosis is", p: "An orthosis is an external device fitted to part of the body to support alignment, stability or movement. Braces and splints are the most familiar examples, but the category is broad." },
      { h: "Why they are custom-fitted", p: "An orthosis works by applying support in specific places. Because no two bodies are the same, fit matters enormously, a device that is not properly matched to the person wearing it will not do its job comfortably." },
      { h: "Common questions people have", p: "People often ask how visible a device will be, whether it will fit under clothing, and how it will affect daily routines. These are reasonable questions and are best answered in relation to your specific situation during an assessment." },
      { h: "Living with a device", p: "Adjusting to an orthosis takes time, and it is normal for the first period to feel unfamiliar. Staying in contact with Jubilee during that time means adjustments can be made as needed." },
    ],
  },
  {
    slug: "supporting-a-child-through-prosthetic-care",
    title: "Supporting a child through prosthetic or orthotic care",
    category: "Patient Tips",
    excerpt:
      "Practical, gentle guidance for parents and caregivers navigating pediatric prosthetic or orthotic care.",
    author: "Jubilee Prosthetics & Orthotics",
    date: "2026-02-24",
    readingTime: "3 min read",
    image: "assets/images/blog/supporting-a-child-through-prosthetic-care",
    featured: false,
    seoTitle: "Supporting a Child Through Prosthetic Care | Jubilee",
    seoDescription:
      "Guidance for parents and caregivers supporting a child through pediatric prosthetic or orthotic care at Jubilee.",
    body: [
      { h: "Children grow, and devices need to keep up", p: "The single biggest difference in pediatric care is growth. Devices that fit well will need revisiting more often than they would for an adult, and regular check-ins are part of the process rather than a sign something has gone wrong." },
      { h: "Let the child be part of the conversation", p: "Where age allows, involving a child in decisions about their own device, colour, how it feels, what bothers them, tends to make them far more willing to wear it consistently." },
      { h: "Watch for what they may not say", p: "Younger children often will not articulate discomfort directly. Changes in how they move, reluctance to wear the device, or new marks on the skin are worth paying attention to." },
      { h: "Ask for support", p: "Caring for a child through this process can be demanding. Jubilee's team is there for the practical questions as well as the clinical ones, please ask." },
    ],
  },
  {
    slug: "what-to-expect-from-gait-assessment",
    title: "What to expect from a gait assessment",
    category: "Rehabilitation",
    excerpt:
      "An overview of what a gait assessment looks at, and why how you move tells a clinician so much.",
    author: "Jubilee Prosthetics & Orthotics",
    date: "2026-03-08",
    readingTime: "3 min read",
    image: "assets/images/blog/what-to-expect-from-gait-assessment",
    featured: false,
    seoTitle: "What to Expect From a Gait Assessment | Jubilee",
    seoDescription:
      "An overview of what happens during a gait assessment at Jubilee and why movement patterns matter.",
    body: [
      { h: "Why walking is worth studying", p: "How a person walks reveals a great deal about balance, alignment and where the body may be compensating. Small patterns that are easy to miss day to day can be significant when observed carefully." },
      { h: "What the assessment involves", p: "In general terms, a gait assessment involves observing you walking and moving, and discussing what you notice yourself, where you feel unsteady, what tires you, and what you would like to be able to do more easily." },
      { h: "It is a conversation, not a test", p: "There is no passing or failing. The purpose is to understand your movement so that any support offered actually fits how you live." },
      { h: "What comes next", p: "Findings are discussed with you directly, and any recommended next steps will depend on your individual circumstances." },
    ],
  },
  {
    slug: "questions-to-ask-at-your-appointment",
    title: "Questions worth asking at your appointment",
    category: "Patient Tips",
    excerpt:
      "A starting list of questions that help you get the most out of time with your clinician.",
    author: "Jubilee Prosthetics & Orthotics",
    date: "2026-03-20",
    readingTime: "2 min read",
    image: "assets/images/blog/questions-to-ask-at-your-appointment",
    featured: false,
    seoTitle: "Questions Worth Asking at Your Appointment | Jubilee",
    seoDescription:
      "A starting list of questions to help you get the most from your prosthetics or orthotics appointment.",
    body: [
      { h: "About the device itself", p: "How does this device work? What is it made of? How long can I expect it to last, and what would shorten that? What should I do if it stops feeling right?" },
      { h: "About daily life", p: "Will this affect the activities that matter to me? Can I wear it for the things I do at work or at home? Is there anything I should avoid?" },
      { h: "About the process", p: "What are the next steps? How often will I need to come back? Who do I contact if something changes between visits?" },
      { h: "About cost and logistics", p: "What does the process involve financially, and what should I plan for? Jubilee's team can talk you through this directly." },
      { h: "About cost and logistics", p: "What does the process involve financially, and what should I plan for? Jubilee's team can talk you through this directly." },
    ],
  },
];
