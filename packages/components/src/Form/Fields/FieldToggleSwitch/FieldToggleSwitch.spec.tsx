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
import { composeStories } from '@storybook/testing-react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@looker/components-test-utils'
import { screen } from '@testing-library/react'
import { FieldToggleSwitch } from './FieldToggleSwitch'
import * as stories from './FieldToggleSwitch.stories'

const { Tabstops } = composeStories(stories)

describe('FieldToggleSwitch', () => {
  test('error has proper aria setup', () => {
    const errorMessage = 'This is an error'

    const { container } = renderWithTheme(
      <FieldToggleSwitch
        id="test"
        defaultValue="example"
        validationMessage={{ message: errorMessage, type: 'error' }}
      />
    )

    const input = screen.getByDisplayValue('example')
    const id = input.getAttribute('aria-describedby')
    expect(id).toBeDefined()
    expect(id).toEqual('describedby-test')
    expect(container).toHaveTextContent(errorMessage)
  })

  test('disabled', () => {
    renderWithTheme(
      <FieldToggleSwitch
        disabled
        id="FieldToggleSwitchID"
        label="Toggle Switch"
      />
    )

    expect(screen.getByLabelText('Toggle Switch')).toBeDisabled()
  })

  test('required', () => {
    renderWithTheme(
      <FieldToggleSwitch
        id="FieldToggleSwitchID"
        label="Toggle Switch"
        required
      />
    )

    expect(screen.getByTestId('requiredStar')).toBeVisible()
  })

  test('tabStops', () => {
    renderWithTheme(<Tabstops />)

    const input = screen.getByRole('switch')
    const detail = screen.getByRole('button')
    const link = screen.getByText('Link')

    userEvent.tab()
    expect(input).toHaveFocus()
    userEvent.tab()
    expect(detail).toHaveFocus()
    userEvent.tab()
    expect(link).toHaveFocus()
  })
})
