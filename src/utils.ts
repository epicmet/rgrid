import { WidthsType } from "./gridTypes";

type adjustWidthsOptions = { isGap?: boolean };
export function adjustWidths(
  widths: WidthsType,
  options: adjustWidthsOptions = { isGap: false }
) {
  const { isGap } = options;

  let prevValue = isGap ? 1 : 12;

  Object.keys(widths).forEach((key) => {
    const value = widths[key];

    if (!value) {
      widths[key] = prevValue;
      return;
    }

    const newValue = typeof value === "string" ? parseInt(value) : value;
    prevValue = newValue;
  });
}
