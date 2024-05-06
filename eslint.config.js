export default [
  {
      files: ["**/*.js"],
      languageOptions: {
          globals: {
              MY_CUSTOM_GLOBAL: "readonly"
          }
      }
  },
  {
      files: ["tests/**/*.js"],
      languageOptions: {
          globals: {
              it: "readonly",
              describe: "readonly"
          }
      }
  }
];
