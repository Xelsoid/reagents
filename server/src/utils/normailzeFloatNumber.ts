export function normalizeFloatNumber(value: string | number) {
  if (typeof value === "string") {
    return parseFloat(value.replace(",", "."));
  }
}
