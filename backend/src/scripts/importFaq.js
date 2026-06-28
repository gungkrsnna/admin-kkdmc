require("dotenv").config();

const {
  supabaseAdmin,
} = require("../src/config/supabase");

const faqData = [
  {
    category: "General Information",
    question: "What is KK DMC?",
    answer:
      "KK DMC is a destination management company specializing in travel services throughout Indonesia and Asia, providing accommodation, transportation, tours, activities, and ground handling services.",
  },

  {
    category: "General Information",
    question: "What destinations do you cover?",
    answer:
      `KK DMC provides travel services across Indonesia and selected destinations in Asia including Indonesia, Singapore, Malaysia, Thailand, Vietnam, Cambodia, Laos, Philippines, Japan and China.

We offer:

• Hotel & resort bookings
• Airport transfers
• Harbor transfers
• Private transportation
• Sightseeing tours
• Island hopping
• Attraction tickets
• Local guides
• Corporate travel & MICE
• Customized itineraries
• Group series & incentive trips`,
  },

  {
    category: "General Information",
    question: "Can you arrange multi-country tours?",
    answer:
      "Yes. We can assist with single-destination trips as well as multi-country itineraries across Southeast Asia and East Asia.",
  },

  // lanjutkan sampai FAQ nomor 38...
];

async function seedFaq() {

  for (let i = 0; i < faqData.length; i++) {

    const faq = faqData[i];

    const {
      data: category,
      error: categoryError,
    } = await supabaseAdmin
      .from("faq_categories")
      .select("id")
      .eq("name", faq.category)
      .single();

    if (categoryError) {
      console.log(
        "Category not found:",
        faq.category
      );
      continue;
    }

    const { error } =
      await supabaseAdmin
        .from("faqs")
        .insert({
          category_id:
            category.id,
          question:
            faq.question,
          answer:
            faq.answer,
          sort_order:
            i + 1,
          is_active: true,
        });

    if (error) {
      console.log(error);
    } else {
      console.log(
        "Inserted:",
        faq.question
      );
    }

  }

  console.log("Done");
}

seedFaq();