
import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.plugins('react', '@typescript-eslint'),
  {
    files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'max-len': ['error', { 'code': 100, 'ignoreUrls': true }],
      'no-unused-vars': 'warn'
    }
  }
]

export default eslintConfig
