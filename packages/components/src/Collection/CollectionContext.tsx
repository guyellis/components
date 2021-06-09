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

import { DensityRamp } from 'packages/components/src/List/types'
import { createContext } from 'react'

export interface SelectConfig {
  /**
   * The ids of all items which should be displayed as "selected"
   */
  selectedItems: string[]
  /**
   * Callback performed when user makes a selection
   */
  onSelect: (id: string) => void

  /**
   * These props are necessary for select all behavior
   * At the moment, only DataTable makes use of these props / select all behavior
   */
  pageItems: string[]
  onSelectAll: () => void
}

export interface CollectionContextProps {
  density: DensityRamp
  select?: SelectConfig
}

export const CollectionContext = createContext<CollectionContextProps>({
  density: 0,
})
