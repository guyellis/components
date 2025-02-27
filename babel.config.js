/*

 MIT License

 Copyright (c) 2022 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

const ignore = [
  '**/*.d.ts',
  '**/*.spec.ts',
  '**/*.spec.tsx',
  '**/*.stories.tsx',
  '**/stories/*',
  '__snapshots__',
  '__tests__',
  '__mocks__',
]

const plugins = [
  ['babel-plugin-styled-components', { pure: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ['@babel/plugin-proposal-private-methods', { loose: true }],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
]

const presets = ['@babel/preset-react', '@babel/preset-typescript']

module.exports = api => {
  api.cache(true)

  return {
    env: {
      cjs: {
        ignore,
        plugins,
        presets: [
          [
            '@babel/env',
            {
              corejs: 3,
              targets: {
                node: 6,
              },
              useBuiltIns: 'usage',
            },
          ],
          ...presets,
        ],
      },
      esm: {
        ignore,
        plugins,
        presets: [
          [
            '@babel/env',
            {
              corejs: 3,
              modules: false,
              useBuiltIns: 'usage',
            },
          ],
          ...presets,
        ],
      },
    },
    plugins,
    presets: [
      ['@babel/preset-env', { targets: { esmodules: true } }],
      ...presets,
    ],
  }
}
