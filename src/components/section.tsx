import { PropsWithChildren, ReactNode } from "react";

export interface SectionProps {
  title: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Section(props: PropsWithChildren<SectionProps>) {
  return (
    <div
      className={"bg-section ".concat(props.className ?? "")}
      onClick={props.onClick}
    >
      <div className="flex items-center justify-between px-2">
        <div className="text-sm font-medium truncate p-2 pt-3 w-full">
          {props.title}
        </div>
      </div>
      {props.children}
    </div>
  );
}
