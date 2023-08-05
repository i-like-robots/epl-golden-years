module.exports = {
  '**/*.{js,jsx}': ['prettier --write', 'eslint --fix'],
  '**/*.{json,yml}': ['prettier --write'],
}
