import type { WidthsType } from "../src/gridTypes";
import { adjustWidths } from "../src/utils";

describe("adjustWidths function", () => {
  let widths: WidthsType;

  beforeEach(() => {
    widths = {};
  });

  it("Adjusts an empty object", () => {
    widths = {
      xs: undefined,
      sm: undefined,
      md: undefined,
      lg: undefined,
      xl: undefined,
    };

    adjustWidths(widths);

    expect(widths).toStrictEqual({
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
    });

    widths = {
      xs: undefined,
      sm: undefined,
      md: undefined,
      lg: undefined,
      xl: undefined,
    };

    adjustWidths(widths, { isGap: true });

    expect(widths).toStrictEqual({
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1,
      xl: 1,
    });
  });

  it("Adjusts based on smallest set value", () => {
    // Random number between 1 to 12
    const baseValue = Math.floor(Math.random() * 12) + 1;

    widths = {
      xs: baseValue,
      sm: undefined,
      md: undefined,
      lg: undefined,
      xl: undefined,
    };

    adjustWidths(widths);

    expect(widths).toStrictEqual({
      xs: baseValue,
      sm: baseValue,
      md: baseValue,
      lg: baseValue,
      xl: baseValue,
    });

    widths = {
      xs: 1,
      sm: baseValue,
      md: undefined,
      lg: undefined,
      xl: undefined,
    };

    adjustWidths(widths);

    expect(widths).toStrictEqual({
      xs: 1,
      sm: baseValue,
      md: baseValue,
      lg: baseValue,
      xl: baseValue,
    });
  });
});
