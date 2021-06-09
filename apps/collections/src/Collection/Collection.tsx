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
  CollectionContext,
  CollectionContextProps,
  SpaceVertical,
  Button,
  Popover,
  PopoverContent,
  Slider,
} from '@looker/components'
import { DensityRamp } from 'packages/components/src/List/types'
import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { PageHeader } from '../PageHeader/PageHeader'
import { SupportedCollection } from '../supportedCollections'
import { PresentationProps, Presenter } from './Presenter'
import { PresentationType } from './types'

type CollectionProps = SupportedCollection &
  PresentationProps &
  Omit<CollectionContextProps, 'density'>

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
  const [density, setDensity] = useState<DensityRamp>(0)

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

  // Can't nail down event parameter's type, revisit later
  const onSliderChange = (event: any) => {
    setDensity(event.target.value)
  }

  const densitySlider = (
    <Popover
      content={
        <PopoverContent p="large">
          <Slider
            width="500px"
            min={-3}
            max={1}
            value={density}
            onChange={onSliderChange}
          />
        </PopoverContent>
      }
    >
      <Button mr="large">Density Slider</Button>
    </Popover>
  )

  return (
    <CollectionContext.Provider value={{ density, select }}>
      <SpaceVertical>
        <PageHeader
          icon={icon}
          densitySlider={densitySlider}
          detail={presentationToggle}
        >
          {title}
        </PageHeader>
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
