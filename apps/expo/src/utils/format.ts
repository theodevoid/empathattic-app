export const toRupiah = (amount: number) => {
  return "Rp " + amount.toLocaleString("id-ID");
};

export const toPercentage = (
  numerator: number,
  denominator: number,
): string => {
  return `${Math.round(numerator / denominator)}%`;
};

export const removeNonNumericCharacters = (str: string) => {
  return str.replace(/[^0-9]/g, "");
};
