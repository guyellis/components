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
import { renderWithTheme } from '@looker/components-test-utils'
import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import { Between } from './Between'

const fitlerData = {
  bounds: '[]',
  high: '5',
  id: '1',
  is: true,
  low: '3',
  type: 'between',
}

const mockChange = jest.fn()

describe('Between Filter tests', () => {
  it('Input fields only accept numbers', () => {
    renderWithTheme(<Between item={fitlerData} />)

    expect(screen.getByTestId('low')).toHaveAttribute('type', 'number')
    expect(screen.getByTestId('high')).toHaveAttribute('type', 'number')
  })

  it('registers input change', () => {
    renderWithTheme(<Between item={fitlerData} onChange={mockChange} />)

    fireEvent.change(screen.getByTestId('low'), { target: { value: 4 } })
    fireEvent.change(screen.getByTestId('high'), { target: { value: 15 } })

    expect(mockChange.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "1",
          Object {
            "low": "4",
          },
        ],
        Array [
          "1",
          Object {
            "high": "15",
          },
        ],
      ]
    `)
  })
})
