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

import React from 'react'
import { renderWithTheme } from '@looker/components-test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { LkFieldItem } from '.'

describe('LkFieldItem', () => {
  test('Renders children', () => {
    renderWithTheme(<LkFieldItem>Dimension</LkFieldItem>)
    screen.getByText('Dimension')
  })

  test('Accepts onClick and onKeyDown props', () => {
    const handleClick = jest.fn()
    const handleKeyDown = jest.fn()
    renderWithTheme(
      <LkFieldItem onClick={handleClick} onKeyDown={handleKeyDown}>
        Dimension
      </LkFieldItem>
    )
    screen.getByText('Dimension')
  })

  test('Does not trigger onClick on detail click when accessory === true', () => {
    const onClick = jest.fn()
    renderWithTheme(
      <LkFieldItem
        detail={{ content: 'Detail', options: { accessory: true } }}
        onClick={onClick}
      >
        Dimension
      </LkFieldItem>
    )
    fireEvent.click(screen.getByText('Dimension'))
    expect(onClick).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByText('Detail'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('Triggers onClick on detail click when accessory === false', () => {
    const onClick = jest.fn()
    renderWithTheme(
      <LkFieldItem
        detail={{ content: 'Detail', options: { accessory: false } }}
        onClick={onClick}
      >
        Dimension
      </LkFieldItem>
    )
    fireEvent.click(screen.getByText('Dimension'))
    expect(onClick).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByText('Detail'))
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  test('Hides and shows detail when hoverDisclosure === true', () => {
    renderWithTheme(
      <LkFieldItem
        detail={{ content: 'Detail', options: { hoverDisclosure: true } }}
      >
        Label
      </LkFieldItem>
    )

    expect(screen.queryByText('Detail')).not.toBeInTheDocument()
    fireEvent.mouseEnter(screen.getByText('Label'), { bubbles: true })
    expect(screen.getByText('Detail')).toBeInTheDocument()
  })
})
