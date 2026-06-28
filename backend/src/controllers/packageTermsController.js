const { supabaseAdmin } =
require("../config/supabase");

exports.getTerms =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { data, error } =
      await supabaseAdmin
        .from(
          "package_terms_conditions"
        )
        .select("*")
        .eq(
          "package_id",
          id
        )
        .maybeSingle();

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.saveTerms =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { content } =
      req.body;

    const { data, error } =
      await supabaseAdmin
        .from(
          "package_terms_conditions"
        )
        .upsert(
          {
            package_id: id,

            content,

            updated_at:
              new Date()
                .toISOString(),
          },
          {
            onConflict:
              "package_id",
          }
        )
        .select()
        .single();

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

