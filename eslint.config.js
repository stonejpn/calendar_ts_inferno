import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import inferno from "eslint-plugin-inferno/configs/recommended.js"
// import { fixupConfigRules } from "@eslint/compat";

export default [
    ...ts.configs.recommended,
    inferno,
    {
        languageOptions: {globals: globals.browser},
        files: ['src/**/*.tsx', "src/**/*.ts"],
        rules: {
            ...js.configs.recommended.rules,
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
        }
    },
];
