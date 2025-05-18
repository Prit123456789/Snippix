import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
    "plugin:tailwindcss/recommended",
  ),
  {
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-custom-classname": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            e2e: true,
          },
          replacements: {
            props: false,
            ref: false,
            params: false,
          },
        },
      ],
    },
  },
  {
    plugins: ["simple-import-sort", "tailwindcss"],
  },
]

export default eslintConfig
