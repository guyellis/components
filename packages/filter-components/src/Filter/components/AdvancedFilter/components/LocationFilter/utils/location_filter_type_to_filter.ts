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
import type {
  FilterTypeMap,
  LocationFilterType,
} from '@looker/filter-expressions'
import { MatchesAdvanced } from '../../MatchesAdvanced'
import { UserAttributes } from '../../UserAttributes'

import { LocationBox } from '../components/LocationBox'
import { LocationCircle } from '../components/LocationCircle'
import { LocationExact } from '../components/LocationExact'

const Blank = () => ''

const filterTypeToLocationMap: FilterTypeMap<LocationFilterType> = {
  location: LocationExact,
  circle: LocationCircle,
  box: LocationBox,
  anyvalue: Blank,
  null: Blank,
  notnull: Blank,
  user_attribute: UserAttributes,
}

export const locationFilterTypeToFilter = (type: LocationFilterType) =>
  filterTypeToLocationMap[type] || MatchesAdvanced
