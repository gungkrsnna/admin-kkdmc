const {
  supabaseAdmin
} = require("../config/supabase");

exports.getSection =
async (req, res) => {

  try {

    const { key } =
      req.params;

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("cms_sections")
        .select("*")
        .eq(
          "section_key",
          key
        )
        .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.updateSection =
async (req, res) => {

  try {

    const { key } =
      req.params;

    const {
      title,
      subtitle,
      description,
      image_url,
      button_text,
      button_link,
      extra_data,
    } = req.body;

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("cms_sections")
        .update({
          title,
          subtitle,
          description,
          image_url,
          button_text,
          button_link,
          extra_data,
          updated_at:
            new Date(),
        })
        .eq(
          "section_key",
          key
        )
        .select()
        .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.uploadCmsImage =
async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "Image required",
      });

    }

    const fileName =
      `cms-${Date.now()}-${req.file.originalname}`;

    const {
      data,
      error,
    } =
      await supabaseAdmin.storage
        .from("cms")
        .upload(
          fileName,
          req.file.buffer,
          {
            contentType:
              req.file.mimetype,
          }
        );

    if (error)
      throw error;

    const {
      data: publicUrl
    } =
      supabaseAdmin.storage
        .from("cms")
        .getPublicUrl(
          data.path
        );

    res.json({
      image_url:
        publicUrl.publicUrl,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};