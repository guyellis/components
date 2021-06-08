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
  Aside,
  Page,
  Paragraph,
  Section,
  useSelectManager,
} from '@looker/components'
import React, { useEffect, useState } from 'react'
import { getCoreSDK2 } from '@looker/extension-sdk-react'
// eslint-disable-next-line camelcase
import { Route, useParams } from 'react-router-dom'
import { Looker40SDK } from '@looker/sdk'
import { Navigation } from './Navigation/Navigation'
import { Collection } from './Collection/Collection'
import { supportedCollections } from './supportedCollections'
import { ItemProps } from './Collection/types'
import { HomePage } from './HomePage'

export const App = () => {
  return (
    <Page hasAside fixed>
      <Aside py="medium" width="navigation">
        <Navigation collections={supportedCollections} />
      </Aside>
      <Section main py="medium" px="xlarge">
        <Route exact path="/">
          <HomePage collections={supportedCollections} />
        </Route>
        <Route path="/:collection/:presentation?">
          <CollectionRouter />
        </Route>
      </Section>
    </Page>
  )
}

const CollectionRouter = () => {
  const sdk = getCoreSDK2<Looker40SDK>()
  const [items, setItems] = useState<ItemProps[]>([])
  const [error, setError] = useState<string>()

  const { collection } = useParams<{ collection?: string }>()

  const supportedCollection = supportedCollections.find(
    (c) => c.title.toLowerCase() === collection
  )

  const endpoint = supportedCollection && supportedCollection.endpoint

  const itemIds = items.map(({ id }) => String(id))
  const { onSelect, selections } = useSelectManager(itemIds)

  useEffect(() => {
    setItems([])

    if (endpoint) {
      const get = async () => {
        // TODO - This should reasonably handle SDK errors

        const response = await sdk.ok(endpoint(sdk))
        setItems(response)
      }
      get()
    }
  }, [sdk, endpoint])

  const selectConfig = {
    onSelect,
    selectedItems: selections,
  }

  return supportedCollection && supportedCollection.endpoint ? (
    <Collection {...supportedCollection} items={items} select={selectConfig} />
  ) : (
    <Paragraph color="critical">Collection type not yet implemented</Paragraph>
  )
}
