export function singleOrDefault<T>(items: T[] | undefined): T | undefined {
  if (items && items.length > 1) {
    throw new Error("More than one element in list");
  }

  const item = items ? items[0] : undefined;
  return item;
}

export function single<T>(items: T[] | undefined): T {
  if (!items || (items && items.length === 0)) {
    throw new Error("Sequence is empty");
  }

  if (items.length > 1) {
    throw new Error("Sequence contains more than 1 element");
  }

  return items[0]!;
}
