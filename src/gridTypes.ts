import { HTMLAttributes } from "react";

type AllowedUnits = "px" | "em" | "rem" | "vh" | "vw" | "vmin" | "vmax" | "%";

type BreakPointValue = number | `${number}${AllowedUnits}`;
export interface Breakpoints {
  xs?: BreakPointValue;
  sm?: BreakPointValue;
  md?: BreakPointValue;
  lg?: BreakPointValue;
  xl?: BreakPointValue;
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
