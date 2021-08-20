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

import styled from 'styled-components'
import type {
  CompatibleHTMLProps,
  HeightProps,
  WidthProps,
} from '@looker/design-tokens'
import {
  disabledSwatchColor,
  height,
  reset,
  shouldForwardProp,
  width,
} from '@looker/design-tokens'
import {
  inputCSS,
  inputTextHover,
  inputTextDisabled,
} from '../../../Inputs/InputText'
import { inputHeight } from '../../height'

export interface SwatchProps
  extends WidthProps,
    HeightProps,
    CompatibleHTMLProps<HTMLDivElement> {
  /**
   * The background color to display on the swatch.
   */
  color?: string
}

const emptySwatch = `position: relative;
  &:after {
    position: absolute;
    display: block;
    content: '';
    height: 1px;
    width: calc(100% + 12px);
    background: red;
    top: 50%;
    margin-left: -6px;
    transform: rotate(-45deg);
  }`

export const Swatch = styled.div
  .withConfig({ shouldForwardProp })
  .attrs<SwatchProps>(
    ({ color = 'transparent', height = inputHeight, width = inputHeight }) => ({
      color,
      'data-testid': 'swatch',
      height,
      width,
    })
  )<SwatchProps>`
  ${reset}

  ${inputCSS}
  ${width}
  ${height}
  background-color: ${({ color, disabled }) =>
    disabled ? disabledSwatchColor(color) : color};
  flex-shrink: 0;
  margin-top: auto;

  &:disabled {
    ${inputTextDisabled}
  }

  &:hover:not([disabled]) {
    ${inputTextHover}
  }

  ${(props) => props.color === 'transparent' && emptySwatch}
`
