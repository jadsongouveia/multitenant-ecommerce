import { preventSubSubcategory } from "@/hooks/categories/preventSubSubcategory"
import { validateParentCategory } from "@/validations/categories/validateParentCategory"
import type { CollectionConfig } from "payload"

export const Categories: CollectionConfig = {
    slug: "categories",
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            index: true,
        },
        {
            name: "color",
            type: "text",
        },
        {
            name: "parent",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
            validate: validateParentCategory,
        },
        {
            name: "subcategories",
            type: "join",
            collection: "categories",
            on: "parent",
            hasMany: true,
        }
    ],
    hooks: {
        beforeChange: [preventSubSubcategory],
    },
}