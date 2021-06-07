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
import { Dashboard } from '@styled-icons/material-rounded/Dashboard'
import { Folder } from '@styled-icons/material-rounded/Folder'
import { QueryStats } from '@styled-icons/material-rounded/QueryStats'
import React from 'react'

export type SupportedCollection = {
  title: string
  href?: (id: string) => string
  icon?: IconType
}

export type SupportedCollections = SupportedCollection[]

export const supportedCollections: SupportedCollection[] = [
  {
    href: (id: string) => `dashboards-next/${id}`,
    icon: <Dashboard />,
    title: 'Dashboards',
  },
  {
    icon: <QueryStats />,
    title: 'Looks',
  },
  {
    icon: <Folder />,
    title: 'Boards',
  },
]
