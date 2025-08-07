import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export const HeaderTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-xl md:text-2xl font-bold">{children}</h1>;
};

export const HeaderSubTitle = ({ children }: { children: ReactNode }) => {
  return (
    <span className="text-muted-foreground text-xs font-semibold">
      {children}
    </span>
  );
};

export const HeaderLeft = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-1">{children}</div>;
};

export const HeaderRight = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center">{children}</div>;
};

const Header = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full items-start sm:items-center justify-between", className)}>
      {children}
    </div>
  );
};

export default Header;
