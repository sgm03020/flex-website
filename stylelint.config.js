module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  ignoreFiles: ['node_modules/**/*.css', 'assets/styles/**/-*.scss'],
  rules: {
    'block-no-empty': null,
    'comment-empty-line-before': null,
    'color-hex-length': null,
    'selector-pseudo-element-no-unknown': null,
    // @mixinを使う場合
    'at-rule-no-unknown': null,
    // 'scss/at-rule-no-unknown': true,
  },
}
