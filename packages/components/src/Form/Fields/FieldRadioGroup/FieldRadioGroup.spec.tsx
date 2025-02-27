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
import 'jest-styled-components'
import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@looker/components-test-utils'
import map from 'lodash/map'
import { fieldOptions } from '../../../__mocks__/CheckboxRadio'
import { FieldRadioGroup } from './FieldRadioGroup'

const fieldRadioProps = {
  defaultValue: 'cheddar',
  id: '1',
  name: 'group1',
  options: fieldOptions,
}
test('FieldRadioGroup render a radio list', () => {
  const extractCheckboxFromDomList = (list: HTMLElement) => {
    const options = list.getElementsByTagName('label')
    return map(options, (el: HTMLElement) => {
      return el.textContent
    })
  }

  const renderListContent = () => {
    renderWithTheme(<FieldRadioGroup {...fieldRadioProps} required />)
    return screen.getByTestId('radio-list')
  }

  const view = renderListContent()
  expect(extractCheckboxFromDomList(view)).toEqual([
    'Cheddar',
    'Gouda',
    'Swiss',
    'Roquefort',
  ])
})
