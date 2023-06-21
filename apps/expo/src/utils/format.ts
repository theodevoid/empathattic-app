export const toRupiah = (amount: number) => {
  return "Rp " + amount.toLocaleString("id-ID");
};

export const toPercentage = (
  numerator: number,
  denominator: number,
): string => {
  return `${Math.round(numerator / denominator)}%`;
};
