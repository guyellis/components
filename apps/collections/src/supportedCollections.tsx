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
import { IconType } from '@looker/components/src'
import { Dashboard } from '@styled-icons/material-outlined/Dashboard'
import { Poll } from '@styled-icons/material-outlined/Poll'
import { Bookmarks } from '@styled-icons/material-outlined/Bookmarks'
import React from 'react'
import { IError, Looker40SDK } from '@looker/sdk'

/* eslint-disable camelcase */
import {
  all_dashboards,
  all_looks,
  search_boards,
} from '@looker/sdk/lib/4.0/funcs'
/* eslint-enable camelcase */
import type { SDKResponse } from '@looker/sdk-rtl'
import { ItemProps } from './Collection/types'

export type SupportedCollection = {
  title: string
  href?: (id: number | string) => string
  icon?: IconType
  endpoint?: (sdk: Looker40SDK) => Promise<SDKResponse<ItemProps[], IError>>
}

export type SupportedCollections = SupportedCollection[]

export const supportedCollections: SupportedCollection[] = [
  {
    // Ideally, this would just be the all_boards endpoint but that's bugged atm
    endpoint: (sdk: Looker40SDK) => search_boards(sdk, { title: '%' }),
    href: (id: string | number) => `/boards/${id}`,
    icon: <Bookmarks />,
    title: 'Boards',
  },
  {
    endpoint: all_dashboards,
    href: (id: string | number) => `/dashboards-next/${id}`,
    icon: <Dashboard />,
    title: 'Dashboards',
  },
  {
    endpoint: all_looks,
    href: (id: string | number) => `/looks/${id}`,
    icon: <Poll />,
    title: 'Looks',
  },
]
