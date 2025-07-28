import { ReactNode } from "react";



export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-500/10 text-slate-500 mb-4">
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

export const SummaryCardSkeleton = () =>{
  return (
    <div className="rounded-xl bg-white p-6">
      <div className="space-y-2">
        <div className="h-9 w-9 bg-gray-200 rounded-md"/>
        <div className="h-5 w-[86.26px] bg-gray-200 rounded-md"/>
        <div className="h-8 w-48 bg-gray-200 rounded-md"/>
      </div>
    </div>
  )
}

export default SummaryCard;
