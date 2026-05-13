import type { RelationshipFieldSingleValidation } from "payload"

export const validateParentCategory: RelationshipFieldSingleValidation = async (
  value,
  { req }
) => {
  if (!value) return true

  const parentId = typeof value === "object" ? (value as unknown as { id: string }).id : value

  const parent = await req.payload.findByID({
    collection: "categories",
    id: String(parentId),
  })

  if ((parent as unknown as { parent?: unknown })?.parent) {
    return "Subcategorias não podem ter subcategorias"
  }

  return true
}