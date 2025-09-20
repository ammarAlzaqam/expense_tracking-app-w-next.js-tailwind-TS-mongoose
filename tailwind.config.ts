/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    fontSize: {
      heading1: [
        "36px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      heading2: [
        "30px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      heading3: [
        "24px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      heading4: [
        "20px",
        {
          lightHeight: "140%",
          fontWeight: "700",
        },
      ],
      "body-bold": [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      body: [
        "18px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "base-bold": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      base: [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "small-bold": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "600",
        },
      ],
      small: [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      subtle: [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: "500",
        },
      ],
      tiny: [
        "10px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
    },
    extend: {
      screens: {
        xs: "400px",
      },
    },
  },
};
