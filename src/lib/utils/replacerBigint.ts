export const replacerBigint = (key: string, value: unknown) =>
  typeof value === "bigint" ? value.toString() : value;
