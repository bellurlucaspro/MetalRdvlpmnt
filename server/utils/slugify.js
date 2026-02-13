// Helper function to create SEO-friendly slugs
export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        // Remove accents
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Replace spaces with -
        .replace(/\s+/g, '-')
        // Remove special characters
        .replace(/[^\w\-]+/g, '')
        // Replace multiple - with single -
        .replace(/\-\-+/g, '-')
        // Remove - from start and end
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// Ensure unique slug by adding number suffix if needed
export const ensureUniqueSlug = async (Model, baseSlug, excludeId = null) => {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const query = { slug };
        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        const existing = await Model.findOne(query);
        if (!existing) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
};
