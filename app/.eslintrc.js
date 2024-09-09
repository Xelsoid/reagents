module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    globalThis: "readonly",
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "import", "react", "jsx-a11y", "react-hooks", "prettier"],
  rules: {
    // General
    "no-plusplus": "off",
    "no-underscore-dangle": ["error"],
    "consistent-return": "error",
    "no-implicit-coercion": ["error", {}], // second argument needed to override airbnb config
    curly: [2, "all"],
    "no-empty-function": ["error", { allow: [] }],
    "react/default-props-match-prop-types": "error",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "error",
    "react/react-in-jsx-scope": "error",
    "react/no-array-index-key": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".js"] }],
    "react/jsx-boolean-value": "error",
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-key": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-one-expression-per-line": "off",
    "react-hooks/exhaustive-deps": "error",
    "react/function-component-definition": "off",

    // ES modules
    "no-duplicate-imports": "error",
    "import/no-unresolved": "error",
    "import/no-self-import": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "index",
          "parent",
          "sibling",
        ],
      },
    ],
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-multiple-empty-lines": "warn",
    "no-shadow": "error",
    "react/prop-types": "error",
    "react/display-name": "error",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message:
              'Use specific lodash methods instead like "lodash/isUndefined"',
          },
          {
            name: "lodash/fp",
            message:
              'Use specific lodash methods instead like "lodash/fp/compose"',
          },
        ],
        patterns: [
          {
            group: ["lodash.*"],
            message:
              'Import lodash methods from lodash package like "lodash/mergeWith"',
          },
        ],
      },
    ],
  },
};
