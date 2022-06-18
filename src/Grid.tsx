import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { adjustWidths } from "./utils";
import type { WidthsType, GridProps } from "./gridTypes";
import "./Grid.scss";

export const Grid: React.FC<GridProps> = ({
  container,
  item,
  spacing,
  columns,
  component,
  wrap = "wrap",
  direction = "row",
  justifyContent = "space-between",
  alignItems = "flex-start",
  gapBase = "5px",
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  children,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  let widths: WidthsType = {
    xs,
    sm,
    md,
    lg,
    xl,
  };

  if (typeof columns === "number" || typeof columns === "string") {
    const newColumn = typeof columns === "string" ? parseInt(columns) : columns;

    widths = {
      xs: newColumn,
      sm: newColumn,
      md: newColumn,
      lg: newColumn,
      xl: newColumn,
    };
  } else if (typeof columns === "object") {
    widths = { ...columns };
  }
  adjustWidths(widths);

  let gaps: WidthsType = {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  };

  if (typeof spacing === "number" || typeof spacing === "string") {
    const newGap = typeof spacing === "string" ? parseInt(spacing) : spacing;

    gaps = {
      xs: newGap,
      sm: newGap,
      md: newGap,
      lg: newGap,
      xl: newGap,
    };
  } else if (typeof spacing === "object") {
    gaps = { ...gaps, ...spacing };
  }
  adjustWidths(gaps, { isGap: true });

  useEffect(() => {
    const { current } = wrapperRef;

    // Setting widths and columns
    Object.keys(widths).forEach((k) => {
      const val = widths[k];

      if (val && current) {
        current.style.setProperty(
          `--${k}-${container ? "columns" : "width"}`,
          val.toString()
        );
      }
    });

    // Setting gap-base
    if (current && container) {
      current?.style.setProperty("--gap-base", gapBase);
    }

    // Setting gaps
    Object.keys(gaps).forEach((g) => {
      const val = gaps[g];

      if (current && container && val) {
        current.style.setProperty(`--${g}-gap`, val.toString());
      }
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        container && "grid__row",
        item && "grid__item",
        container && `grid__wrap__${wrap}`,
        container && `grid__direction__${direction}`,
        container && `grid__justify-content__${justifyContent}`,
        container && `grid__align-items__${alignItems}`,
        className && `${className}`
      )}
      {...props}
    >
      {component ? component : children}
    </div>
  );
};

export default Grid;
