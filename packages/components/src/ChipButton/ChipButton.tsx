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

import styled from 'styled-components'
import { inputHeight } from '../Form/Inputs/height'
import type { ChipProps } from '../Chip/Chip'
import { Chip } from '../Chip/Chip'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChipButtonProps extends Omit<ChipProps, 'role'> {}

/**
   * Activates specialized styling Chip when used as a trigger for a Menu or Overlay

   * NOTE: Please consult with the @looker/components team when using this property
   * as it may be remove or extracted into a unique component in the future.
   *
   */
export const ChipButton = styled(Chip).attrs(() => ({
  role: 'button',
}))<ChipButtonProps>`
  border: 1px solid ${({ theme }) => theme.colors.ui3};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  height: ${inputHeight};
  padding: 0 ${({ theme }) => theme.space.u4};

  &:active,
  &[aria-pressed='true'] {
    border-color: ${({ theme }) => theme.colors.key};
  }
  &.focus,
  &:focus {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.key};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.neutralAccent};
    color: ${({ theme }) => theme.colors.neutral};
    cursor: default;

    &:hover {
      background: ${({ theme }) => theme.colors.neutralAccent};
      border-color: ${({ theme }) => theme.colors.keyAccent};
    }
  }

  &[aria-selected='false'] {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text3};

    &:hover {
      background: ${({ theme }) => theme.colors.ui1};
    }

    &:active {
      border-color: ${({ theme }) => theme.colors.ui4};
    }

    &[disabled] {
      opacity: 0.4;
    }
  }
`
