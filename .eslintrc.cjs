// {
//   "env": {
//     "browser": true,
//     "es2020": true,
//     "jest": true,
//     "node": true
//   },
//   "settings": {
//     "react": {
//       "version": "detect"
//     }
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:@typescript-eslint/eslint-recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:prettier/recommended",
//     "plugin:tailwindcss/recommended"
//   ],
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "ecmaFeatures": {
//       "jsx": true
//     },
//     "ecmaVersion": 11,
//     "sourceType": "module"
//   },
//   "plugins": ["react", "react-hooks", "@typescript-eslint", "tailwindcss"],
//   "rules": {
//     "react-hooks/rules-of-hooks": "error",
//     "react-hooks/exhaustive-deps": "warn",
//     "react/prop-types": "off",
//     "react/react-in-jsx-scope": "off",
//     "@typescript-eslint/explicit-module-boundary-types": "off",
//     "@typescript-eslint/no-non-null-assertion": "off",
//     "tailwindcss/classnames-order": "warn",
//     "tailwindcss/no-custom-classname": "warn",
//     "tailwindcss/no-contradicting-classname": "error"
//   }
// }

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh @typescript-eslint"],
  rules: {
    // "react-refresh/only-export-components": [
    //   "warn",
    //   { allowConstantExport: true },
    // ],
    "react-refresh/only-export-components": "error",
    "@typescript-eslint/no-unused-vars": "off",
    // "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/rules-of-hooks": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-var-requires": "off",
     "no-unused-vars": "off"
    // " no-prototype-builtins": "off",
    // "react/jsx-uses-react": "off",
    // "react/react-in-jsx-scope": "off",
    // "@typescript-eslint/no-var-requires": "off",

  },
};
