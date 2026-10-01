export function specNumber(value: number | null, suffix = "") {
  return value == null ? "Not confirmed" : `${value.toLocaleString()}${suffix}`;
}

export function specPrice(value: number | null) {
  return value == null ? "Price not confirmed" : `$${value.toLocaleString()}`;
}