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

import styled from 'styled-components'
import {
  CollectionContext,
  List,
  ListItem,
  Link,
  Menu,
  MenuItem,
  IconButton,
} from '@looker/components'
import { MoreVert } from '@styled-icons/material-outlined/MoreVert'
import { ExtensionContext2 } from '@looker/extension-sdk-react'
import React, { FC, useContext } from 'react'
import { PresentationProps } from '../Presenter'
import { ItemProps } from '../types'
import { spreadItemProps } from '../spreadItemProps'
import { SupportedCollection } from '../../supportedCollections'

export type PresentItemProps = ItemProps & Pick<SupportedCollection, 'actions'>

const ActionMenus: FC<PresentItemProps> = ({ actions, ...itemProps }) => {
  if (!actions) return null

  const items = actions.map(({ callback, icon, title }, i) => (
    <MenuItem key={i} icon={icon} onClick={() => callback(itemProps)}>
      {title}
    </MenuItem>
  ))

  return (
    <Menu content={items}>
      <IconButton label="Actions" icon={<MoreVert />} />
    </Menu>
  )
}

const Item: FC<PresentItemProps> = (props) => {
  const { description, href, id, onSelect, title } = props
  const { extensionSDK } = useContext(ExtensionContext2)
  const handleClick = () => id && href && extensionSDK.updateLocation(href(id))

  return (
    <ListItem
      detail={<ActionMenus {...props} />}
      id={String(id)}
      onClick={() => onSelect && onSelect(String(id))}
      description={description}
    >
      {href ? <Link onClick={handleClick}>{title}</Link> : title}
    </ListItem>
  )
}

const PresenterInternal: FC<PresentationProps> = ({
  actions,
  items,
  href,
  ...props
}) => {
  const { density, select } = useContext(CollectionContext)

  return (
    <List color="key" density={density} select={select} width="100%" {...props}>
      {items.map((item, i) => (
        <Item
          key={i}
          {...spreadItemProps(item)}
          href={href}
          actions={actions}
          onSelect={select?.onSelect}
        />
      ))}
    </List>
  )
}

export const Presenter = styled(PresenterInternal)`
  ${ListItem} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.ui2};
  }
`
