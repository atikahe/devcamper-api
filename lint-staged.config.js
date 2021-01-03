/**
 * Run tests for all staged files with specific file format
 */
module.exports = {
  linters: {
    '**/*.+(js|md|ts|css|sass|less|graphql|yml|yaml|scss|json|vue)': [
      'eslint --fix',
      'prettier --write',
      /**
       * Add this after unit test available
       * 'jest --findRelatedTest
       * */
      'git add',
    ],
  },
};
