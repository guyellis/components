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

import {
  ButtonItem,
  ButtonToggle,
  Icon,
  Heading,
  SpaceVertical,
} from '@looker/components'
import React, { useState } from 'react'
import { SupportedCollection } from '../supportedCollections'
import { PresentationProps, Presenter } from './Presenter'
import { PresentationType } from './types'

type CollectionProps = SupportedCollection & PresentationProps

export const Collection = ({ icon, title, href, items }: CollectionProps) => {
  const [presentation, setPresentation] = useState<PresentationType>('list')

  const onChangePresentation = (newPresentation: string) => {
    switch (newPresentation) {
      case 'cards':
      case 'list':
      case 'table':
        setPresentation(newPresentation)
    }
  }

  const presentationToggle = (
    <ButtonToggle value={presentation} onChange={onChangePresentation}>
      <ButtonItem value="cards">Cards</ButtonItem>
      <ButtonItem value="list">List</ButtonItem>
      <ButtonItem value="table">Table</ButtonItem>
    </ButtonToggle>
  )

  return (
    <SpaceVertical>
      <Heading fontSize="xxxxlarge">
        {icon && <Icon color="key" icon={icon} display="inline-block" />}
        {title}
      </Heading>
      {presentationToggle}
      <Presenter href={href} presentation={presentation} items={items} />
    </SpaceVertical>
  )
}
