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
import { CollectionContext, List, ListItem, Link } from '@looker/components'
import { ExtensionContext2 } from '@looker/extension-sdk-react'
import React, { FC, MouseEvent, useContext } from 'react'
import { PresentationProps } from '../Presenter'
import { ItemProps } from '../types'

const Item: FC<ItemProps> = ({ href, id, onSelect, title }) => {
  const { extensionSDK } = useContext(ExtensionContext2)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()

    // @TODO: Think of a better fallback URL
    const fallbackUrl = 'https://google.com'
    extensionSDK.updateLocation(id && href ? href(id) : fallbackUrl)
  }

  return (
    <ListItem id={String(id)} onClick={() => onSelect && onSelect(String(id))}>
      <Link onClick={handleClick}>{title}</Link>
    </ListItem>
  )
}

const PresenterInternal: FC<PresentationProps> = ({
  items,
  href,
  ...props
}) => {
  const { select } = useContext(CollectionContext)

  return (
    <List color="key" select={select} width="100%" {...props}>
      {items.map((item, i) => (
        <Item key={i} {...item} href={href} onSelect={select?.onSelect} />
      ))}
    </List>
  )
}

export const Presenter = styled(PresenterInternal)`
  ${ListItem} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.ui2};
  }
`
