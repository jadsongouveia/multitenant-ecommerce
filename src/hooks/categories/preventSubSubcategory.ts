import type { CollectionBeforeChangeHook } from "payload"

export const preventSubSubcategory: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (!data.parent) return data

  const parentId = typeof data.parent === "object" ? data.parent.id : data.parent

  const parent = await req.payload.findByID({
    collection: "categories",
    id: String(parentId),
  })

  if ((parent as unknown as { parent?: unknown })?.parent) {
    throw new Error("Subcategorias não podem ter subcategorias")
  }

  return data
}