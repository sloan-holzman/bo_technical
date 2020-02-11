// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/recommended", // Vue specific rules (i.e. no v-models on divs)
    "eslint:recommended", // default javascript best-practice rules
    "prettier/vue", // Vue specific prettier formatting
    "plugin:prettier/recommended" // use eslint-plugin-prettier and eslint-config-prettier
  ],
  parserOptions: {
    ecmaVersion: 6,
    parser: "babel-eslint"
  },
  plugins: ["filenames"],
  rules: {
    // allow debugging during development
    "no-prototype-builtins": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/attributes-order": "off",
    "vue/name-property-casing": ["warn", "PascalCase"],
    "vue/require-prop-types": "warn",
    "vue/require-default-prop": "warn",
    "filenames/match-exported": "off",
    "no-useless-escape": "warn",
    "no-unused-vars": "warn",
    "require-atomic-updates": "off",
    "prettier/prettier": "warn"
  }
};
