export const kodaColors = {
  brand: {
    50: "#EEEDFE",
    100: "#E0DCFC",
    200: "#C4C2F7",
    300: "#A7A3EF",
    400: "#7F76E1",
    500: "#534AB7",
    600: "#443AA0",
    700: "#373080",
    800: "#2F286D",
    900: "#26215C"
  },
  reward: {
    amber: "#EF9F27"
  },
  status: {
    danger: "#E24B4A",
    success: "#3B6D11"
  }
} as const;

export const kodaTailwindTheme = {
  colors: kodaColors,
  fontFamily: {
    sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
  }
} as const;
