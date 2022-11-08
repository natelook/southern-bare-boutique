export function getSizeName(size: string) {
  return size === "XS"
    ? "Extra Small"
    : size === "SM"
    ? "Small"
    : size === "MD"
    ? "Medium"
    : size === "LG"
    ? "Large"
    : size === "XL"
    ? "Extra Large"
    : ""
}
