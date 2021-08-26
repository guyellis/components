/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

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

import React from 'react'
import { render } from 'react-dom'
import {
  ComponentsProvider,
  Box2,
  FieldCheckboxGroup,
  Truncate,
} from '@looker/components'

const longOption = {
  label: `All legislative Powers herein granted shall be vested in a Congress of the
  United States, which shall consist of a Senate and House of
  Representatives.`,
  value: 'long',
}

export const TruncatedCheckbox = () => (
  <Box2 width={300}>
    <FieldCheckboxGroup label="Cheeses" options={[longOption]} />
  </Box2>
)
const App = () => {
  return (
    <ComponentsProvider>
      <TruncatedCheckbox />
      <Box2 width={100}>
        <Truncate>
          Blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah
        </Truncate>
      </Box2>
    </ComponentsProvider>
  )
}
document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('container'))
})
