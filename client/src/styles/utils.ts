import { BringStyles, ResponsiveLabels } from "./types";

export const BringStylesDefaultValue: BringStyles = {
  spacing: {
    m: {
      t: {},
      b: {},
      l: {},
      r: {},
    },
    p: {
      t: {},
      b: {},
      l: {},
      r: {},
    },
  },
  visibility: {},
};

export const screenSizes: ResponsiveLabels = {
  "": {
    label: "Mobile",
    icon: "smartphone",
  },
  md: {
    label: "Tablet",
    icon: "tablet",
  },
  lg: {
    label: "Desktop",
    icon: "laptop",
  },
};
