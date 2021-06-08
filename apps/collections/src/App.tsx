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

import { Page, Section } from '@looker/components'
import React, { useContext, useEffect, useState } from 'react'
// eslint-disable-next-line camelcase
import { all_dashboards } from '@looker/sdk/lib/4.0/funcs'
import { IDashboard } from '@looker/sdk'
import {
  ExtensionContextData,
  ExtensionContext,
} from '@looker/extension-sdk-react'
import { Navigation } from './Navigation/Navigation'
import { Collection } from './Collection/Collection'

import { supportedCollections } from './supportedCollections'

export const App = () => {
  const [dashboards, setDashboards] = useState<IDashboard[]>([])
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.core40SDK

  useEffect(() => {
    const get = async () => {
      const response = await sdk.ok(all_dashboards(sdk))
      setDashboards(response)
    }
    get()
  }, [sdk])

  return (
    <Page hasAside>
      <Navigation collections={supportedCollections} />
      <Section main py="medium">
        <Collection config={supportedCollections[0]} items={dashboards} />
      </Section>
    </Page>
  )
}
