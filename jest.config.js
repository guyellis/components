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
process.env.TZ = 'PST8PDT'

module.exports = {
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/*.(ts)?(x)',
    '!packages/components-theme-editor/**/*',
    '!packages/**/stories/*',
    '!packages/**/*.stories.tsx',
    '!packages/demos/src/**/*',
    '!packages/icons/src/**/*',
    '!packages/**/index.ts',
    '!packages/**/types.ts',
  ],
  coverageReporters: ['json', 'html', 'lcov', 'text-summary'],
  moduleDirectories: ['./node_modules', './packages'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/config/jest/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/fileMock.js',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/?(*.)spec.(ts|js)?(x)'],
}
