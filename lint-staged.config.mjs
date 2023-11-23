export default {
  '*.{js,cjs,jsx,mjs,ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.vue': ['prettier --write', 'eslint --fix --max-warnings=0', 'stylelint --fix', 'prettier --write'],
  '*.css': ['prettier --write', 'stylelint --fix', 'prettier --write'],
  '*.{styl,stylus}': 'stylelint --fix',
  '*.{json,jsonc,md,yaml,yml}': 'prettier --write',
};
