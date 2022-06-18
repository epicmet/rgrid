import { HTMLAttributes } from "react";

export interface Breakpoints {
  xs?: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
}

export type BreakPointsSchema = { [key: string]: number | string };

export type WidthsType = { [key: string]: number | string | undefined };

export interface GridProps extends HTMLAttributes<HTMLElement>, Breakpoints {
  container?: boolean;
  item?: boolean;
  spacing?: number | string | (BreakPointsSchema & Breakpoints);
  columns?: number | string | (BreakPointsSchema & Breakpoints);
  component?: React.ReactNode;
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  direction?: "column-reverse" | "column" | "row-reverse" | "row";
  justifyContent?:
    | "flexStart"
    | "center"
    | "flexEnd"
    | "spaceBetween"
    | "spaceAround"
    | "spaceEvenly";
  alignItems?: "flexStart" | "center" | "flexEnd" | "stretch" | "baseline";
  gapBase?: string;
}
