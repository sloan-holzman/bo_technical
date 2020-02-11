module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],

  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "babel-jest"
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  testMatch: [
    "<rootDir>/**/*test*.(js|jsx|ts|tsx)"
  ],

  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  preset: "@vue/cli-plugin-unit-jest"
};
