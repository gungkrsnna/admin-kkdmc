const { supabaseAdmin } =
  require("../config/supabase");

exports.uploadTourPackageImage =
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          message: "Image required",
        });
      }

      const fileName =
        `${Date.now()}-${req.file.originalname}`;

      const { error } =
        await supabaseAdmin.storage
          .from("tour-packages")
          .upload(
            fileName,
            req.file.buffer,
            {
              contentType:
                req.file.mimetype,
            }
          );

      if (error) throw error;

      const { data } =
        supabaseAdmin.storage
          .from("tour-packages")
          .getPublicUrl(fileName);

      return res.json({
        url: data.publicUrl,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message,
      });
    }
  };