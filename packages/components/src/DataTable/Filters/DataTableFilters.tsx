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
import type { FC, ReactElement } from 'react'
import React from 'react'
import { densityTarget } from '@looker/design-tokens'
import { DividerVertical } from '../../Divider'
import type { InputFiltersProps } from '../../Form/Inputs/InputFilters'
import { InputFilters } from '../../Form/Inputs/InputFilters'
import type { DataTableColumns } from '../Column'
import { ItemTarget } from '../Item/ItemTarget'
import type { ColumnSelectorProps } from './ColumnSelector'
import { ColumnSelector } from './ColumnSelector'

export interface DataTableFiltersProps extends ColumnSelectorProps {
  className?: string
  children: ReactElement<InputFiltersProps>
}

const hasSelectableColumns = (columns: DataTableColumns) =>
  Boolean(columns.find(c => c.hide !== undefined))

const DataTableFiltersLayout: FC<DataTableFiltersProps> = ({
  className,
  children,
  ...props
}) => {
  const columnsSelector = (
    <>
      <DividerVertical mx="none" stretch />
      <ItemTarget>
        <ColumnSelector {...props} />
      </ItemTarget>
    </>
  )

  return (
    <div className={className}>
      {children}
      {hasSelectableColumns(props.columns) && columnsSelector}
    </div>
  )
}

export const DataTableFilters = styled(DataTableFiltersLayout)`
  align-items: flex-start;
  border-bottom: solid 1px ${({ theme }) => theme.colors.ui2};
  border-top: solid 1px ${({ theme }) => theme.colors.ui2};
  display: flex;

  ${InputFilters} {
    border: none;
  }

  ${ItemTarget} {
    /* Reduce to compensate for outer borders */
    min-height: calc(${densityTarget} - 2px);
  }
`
