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
import React, { FC, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Grid,
  Card,
  CardContent,
  ButtonItem,
  ButtonToggle,
  ComponentsProvider,
  Flex,
  List,
  ListItem,
  Spinner,
} from '@looker/components'
import {
  ExtensionProvider,
  ExtensionContext,
  ExtensionContextData,
} from '@looker/extension-sdk-react'
// eslint-disable-next-line camelcase
import { all_dashboards, me } from '@looker/sdk/lib/4.0/funcs'
import { IDashboard, IUser } from '@looker/sdk/lib/4.0/models'

const getRoot = () => {
  const existingRoot = document.getElementById('extension-root')
  if (existingRoot) return existingRoot
  const root = document.createElement('div')
  root.setAttribute('id', 'extension-root')
  root.style.height = '100%'
  document.body.appendChild(root)
  return root
}

const presentationTypes = ['list', 'cards', 'table'] as const
type PresentationType = typeof presentationTypes[number]

type ItemProps = {
  title?: string
  id?: string
}

type CollectionProps = {
  collection: ItemProps[]
}

type PresenterProps = CollectionProps & {
  presentation: PresentationType
}

const DashboardCollection = () => {
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
      <Presenter presentation={presentation} collection={dashboards} />
    </>
  )
}

const Presenter: FC<PresenterProps> = ({ collection, presentation }) => {
  if (presentation === 'cards') {
    return <CardsPresenter collection={collection} />
  } else if (presentation === 'list') {
    return <ListPresenter collection={collection} />
  } else {
    return <p>Hold your horses buddy. We're workin' on it.</p>
  }
}

const ListItemPresenter: FC<ItemProps> = ({ title }) => (
  <ListItem>{title}</ListItem>
)

const ListPresenter: FC<CollectionProps> = ({ collection }) => (
  <List>
    {collection.map((item, i) => (
      <ListItemPresenter key={i} {...item} />
    ))}
  </List>
)

const CardPresenter: FC<ItemProps> = ({ title }) => (
  <Card>
    <CardContent>{title}</CardContent>
  </Card>
)

const CardsPresenter: FC<CollectionProps> = ({ collection }) => (
  <Grid columns={4}>
    {collection.map((item, i) => (
      <CardPresenter key={i} {...item} />
    ))}
  </Grid>
)

const MyAwesomeComponent = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>()

  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.core40SDK

  useEffect(() => {
    const get = async () => {
      const response = await sdk.ok(me(sdk))
      setCurrentUser(response)
    }

    get()
  }, [sdk])

  return <p>Hello {currentUser ? currentUser.first_name : '?'}</p>
}

const render = () => {
  const root = getRoot()
  const loading = (
    <Flex width="100%" height="90%" alignItems="center" justifyContent="center">
      <Spinner color="black" />
    </Flex>
  )

  ReactDOM.render(
    <ComponentsProvider>
      <ExtensionProvider
        loadingComponent={loading}
        requiredLookerVersion=">=21.0"
      >
        <MyAwesomeComponent />
        <DashboardCollection />
      </ExtensionProvider>
    </ComponentsProvider>,
    root
  )
}

window.addEventListener('DOMContentLoaded', async () => {
  render()
})
