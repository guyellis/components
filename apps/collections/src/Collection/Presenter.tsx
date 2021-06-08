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

import React, { FC } from 'react'
import { SupportedCollection } from '../supportedCollections'
import { Presenter as CardsPresenter } from './Presentations/Cards'
import { Presenter as ListPresenter } from './Presentations/List'
import { Presenter as TablePresenter } from './Presentations/Table'
import { ItemProps, PresentationType } from './types'

export type PresentationProps = Pick<SupportedCollection, 'href'> & {
  items: ItemProps[]
}

export type PresenterProps = PresentationProps & {
  presentation: PresentationType
}

export const Presenter: FC<PresenterProps> = ({
  items,
  presentation,
  ...props
}) => {
  if (presentation === 'cards') {
    return <CardsPresenter items={items} {...props} />
  } else if (presentation === 'list') {
    return <ListPresenter items={items} {...props} />
  } else {
    return <TablePresenter items={items} {...props} />
  }
}
