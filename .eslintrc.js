module.exports = {
    plugins: ["solid"],
    parser: '@typescript-eslint/parser',
    extends: ["eslint:recommended", "plugin:solid/recommended", 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    }
};