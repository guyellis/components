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

import { Box, Paragraph, Heading, useSelectManager } from '@looker/components'
import React, { useEffect, useState } from 'react'
import { getCoreSDK2 } from '@looker/extension-sdk-react'
import { useParams } from 'react-router-dom'
import { Looker40SDK } from '@looker/sdk'
import { supportedCollections } from '../supportedCollections'
import { Page, PageHeader } from '../Page'
import { Collection } from './Collection'
import { ItemProps } from './types'

export const CollectionRouter = () => {
  const sdk = getCoreSDK2<Looker40SDK>()
  const [items, setItems] = useState<ItemProps[]>([])
  // const [error, setError] = useState<string>()

  const { collection } = useParams<{ collection?: string }>()

  const supportedCollection = supportedCollections.find(
    (c) => c.title.toLowerCase() === collection
  )

  const endpoint = supportedCollection && supportedCollection.endpoint

  const itemIds = items.map(({ id }) => String(id))
  const { onSelect, onSelectAll, selections, setSelections } =
    useSelectManager(itemIds)

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

  useEffect(() => setSelections([]), [collection, setSelections])

  const selectConfig = {
    onSelect,
    onSelectAll,
    pageItems: itemIds,
    selectedItems: selections,
  }

  return supportedCollection && supportedCollection.endpoint ? (
    <Collection {...supportedCollection} items={items} select={selectConfig} />
  ) : (
    <Page header={<PageHeader>Collection not yet implemented</PageHeader>}>
      <Box p="xxlarge">
        <Paragraph
          py="large"
          textAlign="center"
          style={{
            fontSize: '16rem',
            lineHeight: 1,
          }}
        >
          😱
        </Paragraph>
        <Heading as="h1" fontSize="xxxxlarge" color="text3" textAlign="center">
          Oh noes!
        </Heading>
      </Box>
    </Page>
  )
}
