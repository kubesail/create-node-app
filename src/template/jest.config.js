module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  "testMatch": [
    "<rootDir>/test/**/*.test.ts"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/jest/setup.js",
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/jest"
  ],
};
