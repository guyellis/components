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

import type { CompatibleHTMLProps } from '@looker/design-tokens'
import { shouldForwardProp } from '@looker/design-tokens'
import styled from 'styled-components'
import type { TableCellProps } from './tableCell'
import { tableCellCSS } from './tableCell'

export interface TableDataCellProps
  extends TableCellProps,
    Omit<CompatibleHTMLProps<HTMLTableDataCellElement>, 'color'> {}

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const TableDataCell = styled.td
  .withConfig({ shouldForwardProp })
  .attrs<TableDataCellProps>(
    ({ borderColor = 'ui2', borderTop = 'solid 1px' }) => ({
      borderTop,
      borderColor,
      /**
       * It's important that `borderColor` go after `borderTop`,
       *   otherwise borderColor is inferred to black
       **/
    })
  )<TableDataCellProps>`
  ${tableCellCSS}
`
