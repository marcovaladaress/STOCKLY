import { ReactNode } from "react";



export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500 mb-4">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm font-medium text-slate-500">{children}</p>;
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return <p className="text-2xl font-semibold text-slate-900"> {children}</p>;
};

const SummaryCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="space-y-5 rounded-xl bg-white p-6">
      <div>{children}</div>
    </div>
  );
};

export default SummaryCard;
