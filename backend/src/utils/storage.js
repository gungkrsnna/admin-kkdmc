const { supabaseAdmin } = require("../config/supabase");

exports.uploadImage = async (
  bucket,
  file,
  folder = ""
) => {

  const ext =
    file.originalname.split(".").pop();

  const filename =
    `${Date.now()}-${Math.round(Math.random()*1e9)}.${ext}`;

  const filePath =
    folder
      ? `${folder}/${filename}`
      : filename;

  const { error } =
    await supabaseAdmin.storage
      .from(bucket)
      .upload(
        filePath,
        file.buffer,
        {
          contentType: file.mimetype,
          upsert: false,
        }
      );

  if (error) throw error;

  const { data } =
    supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

  return {
    filePath,
    publicUrl: data.publicUrl,
  };
};