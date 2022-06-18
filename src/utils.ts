import { WidthsType } from "./gridTypes";

type adjustWidthsOptions = { isGap?: boolean };
export function adjustWidths(
  widths: WidthsType,
  options: adjustWidthsOptions = { isGap: false }
) {
  const { isGap } = options;

  let prevVal = isGap ? 1 : 12;

  Object.keys(widths).forEach((k) => {
    const val = widths[k];

    if (!val) {
      widths[k] = prevVal;
    } else {
      prevVal = typeof val === "string" ? parseInt(val) : val;
    }
  });
}
