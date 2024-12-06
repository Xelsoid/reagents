// @ts-nocheck
export function normalizeFloatNumber(number) {
  if (typeof number === "string") {
    return parseFloat(number.replace(",", "."));
  }
}
