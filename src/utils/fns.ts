export function omitUndefineds<T extends Partial<Record<string, unknown>>>(
  object: T
) {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => value !== undefined)
  ) as T;
}
