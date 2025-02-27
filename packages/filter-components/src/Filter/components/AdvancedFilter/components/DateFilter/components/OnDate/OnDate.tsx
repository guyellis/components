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
import type { FilterModel } from '@looker/filter-expressions'
import {
  clearTimeFilterDateTimeModel,
  dateToFilterDateTimeModel,
  filterDateTimeModelToDate,
} from '@looker/filter-expressions'
import type { FC } from 'react'
import React from 'react'
import { DateInput } from '../DateInput'

interface OnDateParamProps {
  item: FilterModel
  onChange: (id: string, item: Partial<FilterModel>) => void
}

export const OnDate: FC<OnDateParamProps> = ({ item, onChange }) => {
  const { id, date } = item
  const dateChange = (newValue: Date) => {
    const newDateTimeModel = dateToFilterDateTimeModel(newValue)
    // Since filter is 'on date' skip the time part (DX-5280)
    onChange(id, { date: clearTimeFilterDateTimeModel(newDateTimeModel) })
  }
  const actualDate = date
    ? filterDateTimeModelToDate(date)
    : new Date(Date.now())

  return <DateInput date={actualDate} onChange={dateChange} placement="right" />
}
