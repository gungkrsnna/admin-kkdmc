const {
  supabaseAdmin,
} = require("../config/supabase");

const BUCKET = "tour-packages";

async function uploadNewsImages(newsId, files = []) {

  if (!files.length) return;

  const imageRows = [];

  for (let i = 0; i < files.length; i++) {

    const file = files[i];

    const ext =
      file.originalname
        .split(".")
        .pop();

    const fileName =
      `news/${Date.now()}-${i}-${Math.round(Math.random() * 1e9)}.${ext}`;

    const { error: uploadError } =
      await supabaseAdmin.storage
        .from(BUCKET)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

    if (uploadError) throw uploadError;

    const { data } =
      supabaseAdmin.storage
        .from(BUCKET)
        .getPublicUrl(fileName);

    imageRows.push({
      news_id: newsId,
      image_url: data.publicUrl,
      sort_order: i,
    });

  }

  const { error } =
    await supabaseAdmin
      .from("news_images")
      .insert(imageRows);

  if (error) throw error;

}

function getStoragePathFromUrl(url) {
  if (!url) return null;

  const marker = `/storage/v1/object/public/${BUCKET}/`;

  const index = url.indexOf(marker);

  if (index === -1) return null;

  return decodeURIComponent(
    url.substring(index + marker.length)
  );
}

async function deleteImage(url) {
  const path = getStoragePathFromUrl(url);

  if (!path) return;

  await supabaseAdmin.storage
    .from(BUCKET)
    .remove([path]);
}

async function deleteNewsImages(newsId) {

  const {
    data: images,
    error,
  } = await supabaseAdmin
    .from("news_images")
    .select("image_url")
    .eq("news_id", newsId);

  if (error) throw error;

  for (const image of images) {
    await deleteImage(image.image_url);
  }

  const { error: deleteError } =
    await supabaseAdmin
      .from("news_images")
      .delete()
      .eq("news_id", newsId);

  if (deleteError) throw deleteError;

}

exports.getNews =
async (req, res) => {

  try {

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("news_articles")
      .select(`
        *,
        news_categories(
          id,
          name
        ),
        news_images(
          id,
          image_url,
          sort_order
        )
      `)
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .order(
        "sort_order",
        {
          foreignTable: "news_images",
          ascending: true,
        }
      );

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getNewsById =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("news_articles")
      .select(`
        *,
        news_categories(
          id,
          name
        ),
        news_images(
          id,
          image_url,
          sort_order
        )
      `)
      .order("sort_order", {
        foreignTable: "news_images",
        ascending: true,
      })
      .eq("id", id)
      .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.createNews = async (req, res) => {
  try {

    

    const {
      category_id,
      title,
      slug,
      summary,
      content,
      author,
      published_at,
    } = req.body;

    const is_featured =
      req.body.is_featured === "true";

    const is_published =
      req.body.is_published === "true";

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("news_articles")
      .insert({

        category_id,
        title,
        slug,
        summary,
        content,

        author,

        published_at,

        is_featured,

        is_published,

      })
      .select()
      .single();

    if (error)
      throw error;

    if (req.files?.length) {
      await uploadNewsImages(data.id, req.files);
    }

    res.status(201).json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.updateNews = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      category_id,
      title,
      slug,
      summary,
      content,
      author,
      published_at,
    } = req.body;

    const is_featured =
      req.body.is_featured === "true";

    const is_published =
      req.body.is_published === "true";

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("news_articles")
      .update({
        category_id,
        title,
        slug,
        summary,
        content,
        author,
        published_at,
        is_featured,
        is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (req.files?.length) {

      await deleteNewsImages(id);

      await uploadNewsImages(id, req.files);

    }

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.deleteNews = async (req, res) => {
  try {

    const { id } = req.params;

    await deleteNewsImages(id);

    const { error } =
      await supabaseAdmin
        .from("news_articles")
        .delete()
        .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getPublicNews = async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 9;

    const category =
      req.query.category;

    const search =
      req.query.search;

    const from =
      (page - 1) * limit;

    const to =
      from + limit - 1;

    let query =
      supabaseAdmin
        .from("news_articles")
        .select(`
            *,
            news_categories(
                id,
                name
            ),
            news_images(
                id,
                image_url,
                sort_order
            )
        `, {
            count: "exact",
        })
        .eq(
          "is_published",
          true
        );

    // Filter Category
    if (
      category &&
      category !== "all"
    ) {

      query =
        query.eq(
          "category_id",
          category
        );

    }

    // Search
    if (search) {

      query =
        query.ilike(
          "title",
          `%${search}%`
        );

    }

    const {
      data,
      error,
      count,
    } = await query
      .order(
        "published_at",
        {
          ascending: false,
        }
      )
      .order("sort_order", {
          foreignTable: "news_images",
          ascending: true,
      })
      .range(
        from,
        to
      );

    if (error)
      throw error;

    res.json({

      data,

      pagination: {

        page,

        limit,

        total:
          count || 0,

        totalPages:
          Math.ceil(
            (count || 0) / limit
          ),

      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};

exports.getNewsCategories =
async (req, res) => {

  try {

    const { data, error } =
      await supabaseAdmin
        .from("news_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", {
          ascending: true,
        });

    if (error) throw error;

    res.json(data);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });

  }

};

exports.getPublicNewsDetail = async (req, res) => {

  try {

    const { slug } = req.params;

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("news_articles")
      .select(`
          *,
          news_categories(
              id,
              name
          ),
          news_images(
              id,
              image_url,
              sort_order
          )
      `)
      .order("sort_order", {
          foreignTable: "news_images",
          ascending: true,
      })
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) throw error;

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(404).json({
      message: "Article not found",
    });

  }

};