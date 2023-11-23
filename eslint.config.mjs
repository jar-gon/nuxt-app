import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/attributes-order': ['error', { alphabetical: true }],
    'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: false }],
    'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],
  },
});
