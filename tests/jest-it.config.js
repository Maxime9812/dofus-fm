/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.*\\.it-spec\\.ts$',
};
