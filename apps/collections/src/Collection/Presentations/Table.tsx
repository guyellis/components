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
  CollectionContext,
  DataTable,
  DataTableCell,
  DataTableColumns,
  DataTableItem,
  Link,
} from '@looker/components'
import { ExtensionContext2 } from '@looker/extension-sdk-react'
import React, { FC, useContext } from 'react'
import { PresentationProps } from '../Presenter'
import { ItemProps } from '../types'
import { spreadItemProps } from '../spreadItemProps'

const Item: FC<ItemProps> = ({
  href,
  id,
  onSelect,
  title,
  description,
  // icon,
}) => {
  const { extensionSDK } = useContext(ExtensionContext2)
  const handleClick = () =>
    id && href ? extensionSDK.updateLocation(href(id)) : null

  return (
    <DataTableItem
      key={id}
      id={id ? String(id) : 'no_id'}
      onClick={() => onSelect && onSelect(String(id))}
    >
      <DataTableCell description={description}>
        {href ? <Link onClick={handleClick}>{title}</Link> : title}
      </DataTableCell>
      <DataTableCell>{id}</DataTableCell>
    </DataTableItem>
  )
}

export const Presenter: FC<PresentationProps> = ({ items, href }) => {
  const columns: DataTableColumns = [
    {
      // canSort: true,
      id: 'title',
      size: 'large',
      title: 'Title',
    },
    {
      // canSort: true,
      id: 'id',
      size: 'small',
      title: 'ID',
    },
  ]

  const { density, select } = useContext(CollectionContext)

  return (
    <DataTable
      caption="It's a table"
      columns={columns}
      density={density}
      select={select}
    >
      {items.map((item, i) => (
        <Item
          key={i}
          href={href}
          onSelect={select?.onSelect}
          {...spreadItemProps(item)}
        />
      ))}
    </DataTable>
  )
}
