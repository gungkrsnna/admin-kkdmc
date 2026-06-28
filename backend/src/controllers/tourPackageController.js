const { supabaseAdmin } = require("../config/supabase");

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(
  title,
  excludeId = null
) {
  const baseSlug = generateSlug(title);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let query = supabaseAdmin
      .from("tour_packages")
      .select("id")
      .eq("slug", slug);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data } =
      await query.maybeSingle();

    if (!data) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

function getStoragePath(url) {

  if (!url) return null;

  const marker =
    "/tour-packages/";

  const index =
    url.indexOf(marker);

  if (index === -1) {
    return null;
  }

  return url.substring(
    index + marker.length
  );

}

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

exports.getTourPackages = async (
  req,
  res
) => {

  try {

    const { data, error } =
      await supabaseAdmin
        .from("tour_packages")
        .select(`
          *,
          categories (
            id,
            title
          ),
          sub_categories (
            id,
            title
          ),
          package_options (
            id,
            name,
            price,
            is_active
          )
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    const result =
      data.map(pkg => {

        const activeOptions =
          (pkg.package_options || [])
            .filter(
              option =>
                option.is_active
            );

        const startPrice =
          activeOptions.length > 0
            ? Math.min(
                ...activeOptions.map(
                  option =>
                    Number(option.price)
                )
              )
            : 0;

        return {
          ...pkg,
          start_price:
            startPrice,
        };

      });

    return res.json(
      result
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};

/*
|--------------------------------------------------------------------------
| GET BY ID
|--------------------------------------------------------------------------
*/

exports.getTourPackageById =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } =
        await supabaseAdmin
          .from("tour_packages")
          .select(`
            *,
            categories (
              id,
              title
            ),
            sub_categories (
              id,
              title
            )
          `)
          .eq("id", id)
          .single();

      if (error || !data) {
        return res.status(404).json({
          message:
            "Tour package not found",
        });
      }

      return res.json(data);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

exports.createTourPackage =
  async (req, res) => {
    try {
      const {
        category_id,
        sub_category_id,
        title,
        short_description,
        description,
        location,
        duration,
        minimum_pax,
        maximum_pax,
        featured_badge,
        image_url,
        rating,
        total_reviews,
        is_active,
      } = req.body;

      if (!title?.trim()) {
        return res.status(400).json({
          message: "Title is required",
        });
      }

      if (!category_id) {
        return res.status(400).json({
          message:
            "Category is required",
        });
      }

      const slug =
        await generateUniqueSlug(
          title
        );

      const { data, error } =
        await supabaseAdmin
          .from("tour_packages")
          .insert([
            {
              category_id,
              sub_category_id:
                sub_category_id || null,
              title,
              slug,
              short_description:
                short_description || null,
              description:
                description || null,
              location:
                location || null,
              duration:
                duration || null,
              minimum_pax:
                minimum_pax || null,
              maximum_pax:
                maximum_pax || null,
              featured_badge:
                featured_badge || null,
              image_url:
                image_url || null,
              rating:
                rating ?? 5,
              total_reviews:
                total_reviews ?? 0,
              is_active:
                is_active === undefined
                  ? true
                  : is_active,
            },
          ])
          .select()
          .single();

      if (error) throw error;

      return res.status(201).json(
        data
      );

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

exports.updateTourPackage =
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        category_id,
        sub_category_id,
        title,
        short_description,
        description,
        location,
        duration,
        minimum_pax,
        maximum_pax,
        featured_badge,
        image_url,
        rating,
        total_reviews,
        is_active,
      } = req.body;

      if (!title?.trim()) {
        return res.status(400).json({
          message: "Title is required",
        });
      }

      if (!category_id) {
        return res.status(400).json({
          message:
            "Category is required",
        });
      }

      const {
        data: existingPackage,
        error: existingError,
      } = await supabaseAdmin
        .from("tour_packages")
        .select("*")
        .eq("id", id)
        .single();

      if (
        existingError ||
        !existingPackage
      ) {
        return res.status(404).json({
          message:
            "Tour package not found",
        });
      }

      let slug =
        existingPackage.slug;

      if (
        existingPackage.title !==
        title
      ) {
        slug =
          await generateUniqueSlug(
            title,
            id
          );
      }

      const { data, error } =
        await supabaseAdmin
          .from("tour_packages")
          .update({
            category_id,
            sub_category_id:
              sub_category_id || null,
            title,
            slug,
            short_description,
            description,
            location,
            duration,
            minimum_pax,
            maximum_pax,
            featured_badge,
            image_url,
            rating,
            total_reviews,
            is_active,
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();

      if (error) throw error;

      return res.json(data);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

exports.deleteTourPackage =
  async (req, res) => {

    try {

      const { id } = req.params;

      const { data: existing } =
        await supabaseAdmin
          .from("tour_packages")
          .select("*")
          .eq("id", id)
          .maybeSingle();

      if (!existing) {

        return res.status(404).json({
          message:
            "Tour package not found",
        });

      }

      // hapus gambar lama

      if (existing.image_url) {

        const filePath =
          getStoragePath(
            existing.image_url
          );

        if (filePath) {

          const {
            error: storageError,
          } =
            await supabaseAdmin
              .storage
              .from("tour-packages")
              .remove([
                filePath
              ]);

          if (storageError) {
            console.error(
              "Storage delete error:",
              storageError
            );
          }

        }

      }

      // hapus package

      const { error } =
        await supabaseAdmin
          .from("tour_packages")
          .delete()
          .eq("id", id);

      if (error) throw error;

      return res.json({
        success: true,
        message:
          "Tour package deleted",
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        message:
          error.message,
      });

    }

};

exports.getTourPackageBySlug =
  async (req, res) => {

    try {

      const { slug } =
        req.params;

      const {
        data,
        error,
      } =
        await supabaseAdmin
          .from("tour_packages")
          .select(`
            *,
            categories (
              id,
              title
            ),
            sub_categories (
              id,
              title
            ),
            package_options (
              id,
              name,
              price,
              is_default,
              sort_order,
              is_active
            )
          `)
          .eq("slug", slug)
          .single();

      if (
        error ||
        !data
      ) {

        return res.status(404).json({
          message:
            "Tour package not found",
        });

      }

      const packageId =
        data.id;

      // highlights
      const {
        data: highlights,
      } =
        await supabaseAdmin
          .from(
            "package_highlights"
          )
          .select("*")
          .eq(
            "package_id",
            packageId
          );

      // inclusions
      const {
        data: inclusions,
      } =
        await supabaseAdmin
          .from(
            "package_inclusions"
          )
          .select("*")
          .eq(
            "package_id",
            packageId
          )
          .order(
            "sort_order",
            {
              ascending: true,
            }
          );

      // terms
      const {
        data: terms,
      } =
        await supabaseAdmin
          .from(
            "package_terms_conditions"
          )
          .select("*")
          .eq(
            "package_id",
            packageId
          )
          .maybeSingle();

      // features per option
      const options =
        await Promise.all(

          (
            data.package_options ||
            []
          ).map(
            async (
              option
            ) => {

              const {
                data:
                  features,
              } =
                await supabaseAdmin
                  .from(
                    "package_option_features"
                  )
                  .select("*")
                  .eq(
                    "option_id",
                    option.id
                  );

              return {
                ...option,
                features:
                  features ||
                  [],
              };

            }
          )
        );

      const activeOptions =
        options.filter(
          option =>
            option.is_active
        );

      const startPrice =
        activeOptions.length >
        0
          ? Math.min(
              ...activeOptions.map(
                option =>
                  Number(
                    option.price
                  )
              )
            )
          : 0;

      return res.json({
        ...data,
        package_options:
          options,
        highlights:
          highlights ||
          [],
        inclusions:
          inclusions ||
          [],
        terms_conditions:
          terms,
        start_price:
          startPrice,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        message:
          error.message,
      });

    }

  };