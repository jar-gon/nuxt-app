import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ESLint } from 'eslint';
import prettier from 'prettier';
import stylelint from 'stylelint';
import stagedTasks from '../lint-staged.config.mjs';

const eslint = new ESLint();
const eslintFix = new ESLint({ fix: true });

async function format(code, filePath) {
  return prettier.format(code, { ...(await prettier.resolveConfig(filePath)), filepath: filePath });
}

// Exercise the actual staged-file command order without changing the index or source files.
async function runStagedTasks(code, filePath, pattern) {
  for (const command of [].concat(stagedTasks[pattern])) {
    if (command === 'prettier --write') {
      code = await format(code, filePath);
    } else if (command === 'eslint --fix --max-warnings=0') {
      const [result] = await eslintFix.lintText(code, { filePath });
      assert.equal(result.errorCount + result.warningCount, 0, JSON.stringify(result.messages));
      code = result.output ?? code;
    } else if (command === 'stylelint --fix') {
      const result = await stylelint.lint({ code, codeFilename: filePath, fix: true });
      assert.equal(result.errored, false, result.report);
      code = result.code;
    } else {
      assert.fail(`Unsupported staged command: ${command}`);
    }
  }

  return code;
}

test('ESLint rejects unused TypeScript variables and undefined JavaScript references', async () => {
  for (const [filePath, code, ruleId] of [
    ['src/utils/tooling-probe.ts', 'const unused = 1;\nexport {};\n', '@typescript-eslint/no-unused-vars'],
    ['src/utils/tooling-probe.js', 'missingFunction();\n', 'no-undef'],
  ]) {
    const [result] = await eslint.lintText(code, { filePath });
    assert.ok(result.messages.some(message => message.ruleId === ruleId));
  }
});

test('Vue component names, props, model arguments, events and attribute/block order are fixed', async () => {
  const filePath = 'src/components/ToolingProbe.vue';
  const code = `<script setup lang="ts">const value = ref(''); const handle = () => {};</script>
<template><ExampleCard zProp="z" aProp="a" @someEvent="handle" v-model:someValue="value" /></template>
`;
  const [before] = await eslint.lintText(code, { filePath });
  for (const ruleId of ['component-name-in-template-casing', 'attribute-hyphenation', 'v-on-event-hyphenation', 'attributes-order', 'block-order']) {
    assert.ok(
      before.messages.some(message => message.ruleId === `vue/${ruleId}`),
      ruleId
    );
  }

  const fixed = await runStagedTasks(code, filePath, '*.vue');
  assert.match(fixed, /<example-card v-model:some-value="value" a-prop="a" z-prop="z" @some-event="handle"/);
  assert.ok(fixed.indexOf('<template>') < fixed.indexOf('<script'));
  assert.equal(await runStagedTasks(fixed, filePath, '*.vue'), fixed);
});

for (const [filePath, code, pattern] of [
  ['src/assets/style/tooling-probe.css', '.probe{color:red;display:flex;position:relative;}\n', '*.css'],
  ['src/assets/style/tooling-probe.styl', '.probe\n    color red\n    display flex\n    position relative\n', '*.{styl,stylus}'],
  ['src/assets/style/tooling-probe.stylus', '.probe\n    color red\n    display flex\n    position relative\n', '*.{styl,stylus}'],
  ['src/components/ToolingCss.vue', '<template><div /></template>\n<style>\n.probe{color:red;display:flex;position:relative;}\n</style>\n', '*.vue'],
  ['src/components/ToolingStylus.vue', '<template><div /></template>\n<style lang="stylus">\n.probe\n    color red\n    display flex\n    position relative\n</style>\n', '*.vue'],
]) {
  test(`Formats and sorts ${filePath}, with stable repeated fixes`, async () => {
    const before = await stylelint.lint({ code, codeFilename: filePath });
    assert.ok(before.results[0].warnings.some(warning => warning.rule === 'order/properties-order'));
    const fixed = await runStagedTasks(code, filePath, pattern);
    assert.ok(fixed.indexOf('position') < fixed.indexOf('display'));
    assert.ok(fixed.indexOf('display') < fixed.indexOf('color'));
    assert.equal(fixed.includes('\r'), false);
    const checked = await stylelint.lint({ code: fixed, codeFilename: filePath });
    assert.equal(checked.errored, false, checked.report);
    assert.equal(await runStagedTasks(fixed, filePath, pattern), fixed);
  });
}

test('Stylelint rejects unknown CSS properties', async () => {
  const result = await stylelint.lint({ code: '.probe { colr: red; }\n', codeFilename: 'src/assets/style/tooling-probe.css' });
  assert.ok(result.results[0].warnings.some(warning => warning.rule === 'property-no-unknown'));
});

test('Vue scoped selectors, v-bind(), style-less SFCs and Stylus expressions remain valid', async () => {
  for (const code of [
    '<template><div /></template>\n',
    '<template><div /></template>\n<style scoped>\n.probe :deep(.child) { color: v-bind(color); }\n\n:global(.global) { display: block; }\n\n:slotted(.slot) { display: block; }\n</style>\n',
    '<template><div /></template>\n<style lang="stylus">\nsize = 10px\n\n.probe\n  width size * 2\n</style>\n',
  ]) {
    const result = await stylelint.lint({ code, codeFilename: 'src/components/ToolingProbe.vue' });
    assert.equal(result.errored, false, result.report);
  }
});
