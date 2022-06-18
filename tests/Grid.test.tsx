import React from "react";
import { cleanup, render } from "@testing-library/react";
import Grid from "../src/Grid";

const getRandomItemOfArr = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

afterEach(() => {
  cleanup();
});

describe("Grid component", () => {
  describe("container and item properties", () => {
    it("Only container", () => {
      const { container } = render(<Grid container />);

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.className.includes("grid__row")).toBeTruthy();
      expect(gridComponent?.className.includes("grid__item")).toBeFalsy();
    });

    it("Only item", () => {
      const { container } = render(<Grid item />);

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.className.includes("grid__item")).toBeTruthy();
      expect(gridComponent?.className.includes("grid__row")).toBeFalsy();
    });

    it("Both container and item", () => {
      const { container } = render(<Grid container item />);

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.className.includes("grid__item")).toBeTruthy();
      expect(gridComponent?.className.includes("grid__row")).toBeTruthy();
    });
  });

  describe("component and children properties", () => {
    it("component property exists", () => {
      const Comp: React.FC = () => <div>Comp</div>;

      const { baseElement } = render(
        <Grid component={<Comp />}>children</Grid>
      );

      expect(baseElement.textContent).toBe("Comp");
      expect(baseElement.textContent).not.toBe("children");
    });

    it("component property does not exists", () => {
      const { baseElement } = render(<Grid>children</Grid>);

      expect(baseElement.textContent).toBe("children");
    });
  });

  describe("flex box properties", () => {
    const wrap = getRandomItemOfArr(["wrap", "nowrap", "wrap-reverse"]);
    const direction = getRandomItemOfArr([
      "column-reverse",
      "column",
      "row-reverse",
      "row",
    ]);
    const justifyContent = getRandomItemOfArr([
      "flexStart",
      "center",
      "flexEnd",
      "spaceBetween",
      "spaceAround",
      "spaceEvenly",
    ]);
    const alignItems = getRandomItemOfArr([
      "flexStart",
      "center",
      "flexEnd",
      "stretch",
      "baseline",
    ]);

    it("container with flex properties", () => {
      const { container } = render(
        <Grid
          container
          wrap={wrap}
          direction={direction}
          justifyContent={justifyContent}
          alignItems={alignItems}
        />
      );

      const gridComponent = container.querySelector("div");

      expect(gridComponent?.className.includes(wrap)).toBeTruthy();
      expect(gridComponent?.className.includes(direction)).toBeTruthy();
      expect(gridComponent?.className.includes(justifyContent)).toBeTruthy();
      expect(gridComponent?.className.includes(alignItems)).toBeTruthy();
    });

    it("item with flex properties", () => {
      const { container } = render(
        <Grid
          item
          wrap={wrap}
          direction={direction}
          justifyContent={justifyContent}
          alignItems={alignItems}
        />
      );

      const gridComponent = container.querySelector("div");

      expect(gridComponent?.className.includes(wrap)).not.toBeTruthy();
      expect(gridComponent?.className.includes(direction)).not.toBeTruthy();
      expect(
        gridComponent?.className.includes(justifyContent)
      ).not.toBeTruthy();
      expect(gridComponent?.className.includes(alignItems)).not.toBeTruthy();
    });
  });

  describe("spacing property", () => {
    describe("on container", () => {
      it("[number type]", () => {
        // Random number between 1 an 5
        const spacing = Math.floor(Math.random() * 5) + 1;

        const { container } = render(<Grid container spacing={spacing} />);

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-gap")).toBe(
          spacing.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-gap")).toBe(
          spacing.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-gap")).toBe(
          spacing.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-gap")).toBe(
          spacing.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-gap")).toBe(
          spacing.toString()
        );
      });

      it("[string type]", () => {
        // Random number between 1 an 5
        const spacing = Math.floor(Math.random() * 5) + 1;

        const { container } = render(
          <Grid container spacing={spacing.toString()} />
        );

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-gap")).toBe(
          spacing.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-gap")).toBe(
          spacing.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-gap")).toBe(
          spacing.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-gap")).toBe(
          spacing.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-gap")).toBe(
          spacing.toString()
        );
      });

      it("[object type]", () => {
        const spacing = { xs: 4, sm: 7, md: 1, lg: 3, xl: 9 };

        const { container } = render(<Grid container spacing={spacing} />);

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-gap")).toBe(
          spacing.xs.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-gap")).toBe(
          spacing.sm.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-gap")).toBe(
          spacing.md.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-gap")).toBe(
          spacing.lg.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-gap")).toBe(
          spacing.xl.toString()
        );
      });
    });

    describe("on item", () => {
      it("should not set", () => {
        // Random number between 1 an 5
        const spacing = Math.floor(Math.random() * 5) + 1;

        const { container } = render(
          <Grid item spacing={spacing.toString()} />
        );

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-gap")).toBeFalsy();
        expect(gridComponent?.style.getPropertyValue("--sm-gap")).toBeFalsy();
        expect(gridComponent?.style.getPropertyValue("--md-gap")).toBeFalsy();
        expect(gridComponent?.style.getPropertyValue("--lg-gap")).toBeFalsy();
        expect(gridComponent?.style.getPropertyValue("--xl-gap")).toBeFalsy();
      });
    });
  });

  describe("columns property", () => {
    describe("on container", () => {
      it("[number type]", () => {
        // Random number between 1 an 12
        const columns = Math.floor(Math.random() * 12) + 1;

        const { container } = render(<Grid container columns={columns} />);

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-columns")).toBe(
          columns.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-columns")).toBe(
          columns.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-columns")).toBe(
          columns.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-columns")).toBe(
          columns.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-columns")).toBe(
          columns.toString()
        );
      });

      it("[string type]", () => {
        // Random number between 1 an 12
        const columns = Math.floor(Math.random() * 12) + 1;

        const { container } = render(
          <Grid container columns={columns.toString()} />
        );

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-columns")).toBe(
          columns.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-columns")).toBe(
          columns.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-columns")).toBe(
          columns.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-columns")).toBe(
          columns.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-columns")).toBe(
          columns.toString()
        );
      });

      it("[object type]", () => {
        const columns = { xs: 3, sm: 1, md: 4, lg: 5, xl: 8 };

        const { container } = render(<Grid container columns={columns} />);

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-columns")).toBe(
          columns.xs.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-columns")).toBe(
          columns.sm.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-columns")).toBe(
          columns.md.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-columns")).toBe(
          columns.lg.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-columns")).toBe(
          columns.xl.toString()
        );
      });
    });

    describe("on item", () => {
      it("[number type]", () => {
        // Random number between 1 an 12
        const widths = Math.floor(Math.random() * 12) + 1;

        const { container } = render(<Grid item columns={widths} />);

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-width")).toBe(
          widths.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-width")).toBe(
          widths.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-width")).toBe(
          widths.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-width")).toBe(
          widths.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-width")).toBe(
          widths.toString()
        );
      });

      it("[string type]", () => {
        // Random number between 1 an 12
        const widths = Math.floor(Math.random() * 12) + 1;

        const { container } = render(<Grid item columns={widths.toString()} />);

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-width")).toBe(
          widths.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-width")).toBe(
          widths.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-width")).toBe(
          widths.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-width")).toBe(
          widths.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-width")).toBe(
          widths.toString()
        );
      });

      it("[object type]", () => {
        const widths = { xs: 3, sm: 1, md: 4, lg: 5, xl: 8 };

        const { container } = render(<Grid item columns={widths} />);

        const gridComponent = container.querySelector("div");

        expect(gridComponent).toBeTruthy();
        expect(gridComponent?.style.getPropertyValue("--xs-width")).toBe(
          widths.xs.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--sm-width")).toBe(
          widths.sm.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--md-width")).toBe(
          widths.md.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--lg-width")).toBe(
          widths.lg.toString()
        );
        expect(gridComponent?.style.getPropertyValue("--xl-width")).toBe(
          widths.xl.toString()
        );
      });
    });
  });

  describe("gap base property", () => {
    it("on container", () => {
      const gapBase = "10px";

      const { container } = render(<Grid container gapBase={gapBase} />);

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.style.getPropertyValue("--gap-base")).toBe(gapBase);
    });

    it("on item", () => {
      const gapBase = "10px";

      const { container } = render(<Grid item gapBase={gapBase} />);

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.style.getPropertyValue("--gap-base")).toBeFalsy();
    });
  });

  describe("individual breakpoints properties", () => {
    it("on container", () => {
      const xs = 1;
      const sm = 4;
      const md = 3;
      const lg = 8;
      const xl = 10;

      const { container } = render(
        <Grid container xs={xs} sm={sm} md={md} lg={lg} xl={xl} />
      );

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.style.getPropertyValue("--xs-columns")).toBe(
        xs.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--sm-columns")).toBe(
        sm.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--md-columns")).toBe(
        md.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--lg-columns")).toBe(
        lg.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--xl-columns")).toBe(
        xl.toString()
      );
    });

    it("on item", () => {
      const xs = 1;
      const sm = 4;
      const md = 3;
      const lg = 8;
      const xl = 10;

      const { container } = render(
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} />
      );

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.style.getPropertyValue("--xs-width")).toBe(
        xs.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--sm-width")).toBe(
        sm.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--md-width")).toBe(
        md.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--lg-width")).toBe(
        lg.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--xl-width")).toBe(
        xl.toString()
      );
    });
  });

  describe("columns and individual breakpoints properties", () => {
    it("on container", () => {
      const xs = 1;
      const sm = 4;
      const md = 3;
      const lg = 8;
      const xl = 10;

      const columns = 12;

      const { container } = render(
        <Grid
          container
          xs={xs}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
          columns={columns}
        />
      );

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.style.getPropertyValue("--xs-columns")).toBe(
        columns.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--sm-columns")).toBe(
        columns.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--md-columns")).toBe(
        columns.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--lg-columns")).toBe(
        columns.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--xl-columns")).toBe(
        columns.toString()
      );
    });

    it("on item", () => {
      const xs = 1;
      const sm = 4;
      const md = 3;
      const lg = 8;
      const xl = 10;

      const columns = 12;

      const { container } = render(
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} columns={columns} />
      );

      const gridComponent = container.querySelector("div");

      expect(gridComponent).toBeTruthy();
      expect(gridComponent?.style.getPropertyValue("--xs-width")).toBe(
        columns.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--sm-width")).toBe(
        columns.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--md-width")).toBe(
        columns.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--lg-width")).toBe(
        columns.toString()
      );
      expect(gridComponent?.style.getPropertyValue("--xl-width")).toBe(
        columns.toString()
      );
    });
  });

  describe("className property", () => {
    const className = "random-class-name";

    const { container } = render(<Grid className={className} />);

    const gridComponent = container.querySelector("div");

    expect(gridComponent).toBeTruthy();
    expect(gridComponent?.className.includes(className)).toBeTruthy();
  });
});
