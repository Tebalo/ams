import { PulaSign } from "@/components/PulaSign";


export const formatPula = (amount: number): JSX.Element => {
  const formattedAmount = amount.toLocaleString('en-BW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <PulaSign />{formattedAmount}
    </>
  );
};