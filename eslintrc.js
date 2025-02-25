module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "airbnb",
      "airbnb/hooks",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "import/extensions": "off",
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/prop-types": "off",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  };
  