module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
    'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
	],
	root: true,
	env: {
		browser: true,
    es2021: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-restricted-imports': [
      'error',
      {
        'patterns': ['@mui/*/*/*']
      }
    ]
		// 'no-unused-vars': ['error', { vars: 'all' }],
	},
};
