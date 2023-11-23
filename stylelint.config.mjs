/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**'],
  overrides: [
    {
      files: ['**/*.styl', '**/*.stylus', '**/*.vue'],
      extends: ['stylelint-stylus/standard'],
      rules: {
        // This CSS-only rule cannot validate Stylus expressions or Vue v-bind().
        'declaration-property-value-no-unknown': null,
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'global', 'slotted'] }],
      },
    },
  ],
  rules: {
    'selector-class-pattern': null,
  },
};
