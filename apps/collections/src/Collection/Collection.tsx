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
  Space,
  SpaceVertical,
} from '@looker/components'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { SupportedCollection } from '../supportedCollections'
import { CollectionContext, CollectionContextProps } from './CollectionContext'
import { PresentationProps, Presenter } from './Presenter'
import { PresentationType } from './types'

type CollectionProps = SupportedCollection &
  PresentationProps &
  CollectionContextProps

export const Collection = ({
  icon,
  title,
  itemType,
  href,
  items,
  select,
}: CollectionProps) => {
  const history = useHistory()
  const { collection, presentation = 'list' } =
    useParams<{ collection: string; presentation?: PresentationType }>()

  const onChangePresentation = (newPresentation: string) => {
    switch (newPresentation) {
      case 'cards':
      case 'list':
      case 'table':
        history.push(`/${collection}/${newPresentation}`)
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
    <CollectionContext.Provider value={{ select }}>
      <SpaceVertical>
        <Space between>
          <Space gap="xsmall" width="auto">
            {icon && (
              <Icon
                color="key"
                icon={icon}
                display="inline-block"
                size="large"
              />
            )}
            <Heading fontSize="xxxxlarge">{title}</Heading>
          </Space>
          <div>{presentationToggle}</div>
        </Space>
        <Presenter
          itemType={itemType}
          href={href}
          presentation={presentation}
          items={items}
        />
      </SpaceVertical>
    </CollectionContext.Provider>
  )
}
