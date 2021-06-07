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

import { ButtonItem, ButtonToggle } from '@looker/components'
import {
  ExtensionContextData,
  ExtensionContext,
} from '@looker/extension-sdk-react'
import { IDashboard } from '@looker/sdk'
// eslint-disable-next-line camelcase
import { all_dashboards } from '@looker/sdk/lib/4.0/funcs'
import React, { useState, useContext, useEffect } from 'react'
import { SupportedCollection } from '../App'
import { Presenter } from './Presenter'
import { PresentationType } from './types'

type CollectionProps = {
  config: SupportedCollection
}

export const Collection = ({ config }: CollectionProps) => {
  const [dashboards, setDashboards] = useState<IDashboard[]>([])
  const [presentation, setPresentation] = useState<PresentationType>('list')

  const onChangePresentation = (newPresentation: string) => {
    switch (newPresentation) {
      case 'cards':
      case 'list':
      case 'table':
        setPresentation(newPresentation)
    }
  }
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.core40SDK

  useEffect(() => {
    const get = async () => {
      const response = await sdk.ok(all_dashboards(sdk))
      setDashboards(response)
    }
    get()
  }, [sdk])

  const presentationToggle = (
    <ButtonToggle value={presentation} onChange={onChangePresentation}>
      <ButtonItem value="cards">Cards</ButtonItem>
      <ButtonItem value="list">List</ButtonItem>
      <ButtonItem value="grid">Table</ButtonItem>
    </ButtonToggle>
  )

  return (
    <>
      {presentationToggle}
      <Presenter
        presentation={presentation}
        collection={dashboards}
        {...config}
      />
    </>
  )
}
