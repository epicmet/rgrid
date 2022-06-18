# Rgrid

A simple light-weight grid component for your react app.

# Installation

```
yarn add @mahdi_ag/rgrid
```

# Usage

There is two main type of `<Grid />` component you can use, "container" and "item". As it sounds like it, you use `item`s inside a parent `container`.

# Examples

```ts
// This is just a simple component to showcase the examples below
const Item: React.FC = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "20px",
        backgroundColor: "#647593",
        borderRadius: "5px",
        display: "grid",
        placeItems: "center",
        color: "white",
        fontSize: "1.3rem",
        fontFamily: "monospace",
      }}
    >
      {children}
    </div>
  );
};
```

## Basics

```ts
import { Grid } from "@mahdi_ag/rgrid";

export const Basics: React.FC = () => (
  <>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={8}>
        <Item>xs=8</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid item xs={8}>
        <Item>xs=8</Item>
      </Grid>
    </Grid>
  </>
);
```

## Breakpoints And Inhertance

```ts
import { Grid } from "@mahdi_ag/rgrid";

export const BreakpointsAndInhertance: React.FC = () => (
  <>
    <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
      <Grid item xs={8} md={4}>
        <Item>xs=8 m=4 (I resize!)</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid item xs={8}>
        <Item>xs=8</Item>
      </Grid>
    </Grid>
  </>
);
```

## Nested Usage

```ts
import { Grid } from "@mahdi_ag/rgrid";

export const NestedUsage: React.FC = () => {
  const ChildComponent: React.FC = () => {
    return (
      <Grid container columns={{ sm: 5 }} style={{ border: "1px solid red" }}>
        <Grid item sm="3">
          <Item>sm=3</Item>
        </Grid>
        <Grid item sm={2}>
          <Item>sm=2</Item>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid container sm={5}>
        <Grid item sm={3}>
          <ChildComponent />
        </Grid>
        <Grid item sm={2}>
          <Item>sm=2</Item>
        </Grid>
        <Grid item sm={2}>
          <Item>sm=2</Item>
        </Grid>
      </Grid>
    </>
  );
};
```
