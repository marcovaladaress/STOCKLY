import { ReactNode } from "react";

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-slate-500/10 text-slate-500 md:mb-4 md:h-9 md:w-9">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-xs font-medium text-slate-500 md:text-sm">{children}</p>
  );
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-xl font-semibold text-slate-900 md:text-2xl">
      {" "}
      {children}
    </p>
  );
};

const SummaryCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="space-y-4 rounded-xl bg-white p-4 md:space-y-5 md:p-6">
      <div>{children}</div>
    </div>
  );
};

export const SummaryCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-white p-4 md:p-6">
      <div className="space-y-2">
        <div className="h-8 w-8 rounded-md bg-gray-200 md:h-9 md:w-9" />
        <div className="h-4 w-[86.26px] rounded-md bg-gray-200 md:h-5" />
        <div className="h-6 w-32 rounded-md bg-gray-200 md:h-8 md:w-48" />
      </div>
    </div>
  );
};

export default SummaryCard;
