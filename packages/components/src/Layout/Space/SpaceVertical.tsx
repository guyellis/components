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

import { shouldForwardProp } from '@looker/design-tokens'
import styled, { css } from 'styled-components'
import type { SpaceHelperProps } from './Space'
import { defaultGap, spaceCSS } from './Space'

export interface SpaceVerticalProps extends Omit<SpaceHelperProps, 'align'> {
  /**
   * Align items vertically within `Space`.
   * `stretch` will cause items to stretch the full-width the `SpaceVertical`
   * `start` & `end` will apply a `flex-start` and `flex-end` behavior respectively
   * @default start
   */
  align?: 'start' | 'center' | 'end' | 'stretch'
}

const flexGap = ({ gap = defaultGap, reverse }: SpaceVerticalProps) => css`
  @supports (-moz-appearance: none) {
    gap: ${({ theme: { space } }) => space[gap]};
  }

  @supports not (-moz-appearance: none) {
    && > * {
      margin-top: ${({ theme: { space } }) => space[gap]};
    }

    ${({ theme: { space } }) =>
      reverse
        ? `&& > *:last-child { margin-top: ${space.none}; }`
        : `&& > *:first-child { margin-top: ${space.none}; }`}
  }
`

export const SpaceVertical = styled.div
  .withConfig({ shouldForwardProp })
  .attrs<SpaceVerticalProps>(({ align = 'flex-start', width = '100%' }) => {
    // Use `flex-start|end` instead of `start|end`
    if (['start', 'end'].includes('align')) {
      align = `flex-${align}`
    }

    return {
      alignItems: align,
      width,
    }
  })<SpaceVerticalProps>`
  ${spaceCSS}
  ${flexGap}
  flex-direction: ${({ reverse }) => (reverse ? 'column-reverse' : 'column')};
`
