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
import { screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { LocationCircle } from './LocationCircle'

describe('LocationCircle filter tests', () => {
  const item = {
    id: '1',
    type: 'anywhere',
    is: true,
    lat: 1,
    lon: 1,
    distance: 5,
    unit: 'feet',
  }

  it('should render a LocationCircle', () => {
    renderWithTheme(<LocationCircle item={item} onChange={jest.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('feet')
    expect(screen.getByDisplayValue('5')).toBeVisible()
  })

  it('should call onChange with the correct distance when distance is changed', () => {
    const onChange = jest.fn()
    renderWithTheme(<LocationCircle item={item} onChange={onChange} />)
    fireEvent.change(screen.getByDisplayValue('5'), { target: { value: '6' } })
    expect(onChange).toHaveBeenCalledWith('1', { distance: '6', unit: 'feet' })
  })

  it('should call onChange with the correct unit when unit is changed', () => {
    const onChange = jest.fn()
    renderWithTheme(<LocationCircle item={item} onChange={onChange} />)

    const selectInput = screen.getByDisplayValue('feet')
    fireEvent.click(selectInput)

    const kilometers = screen.getByText('kilometers')
    fireEvent.click(kilometers)
    expect(onChange).toHaveBeenCalledWith('1', { unit: 'kilometers' })
  })
})
