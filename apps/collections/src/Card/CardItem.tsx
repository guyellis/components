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
  Card,
  CardContent,
  CardProps,
  Checkbox,
  CollectionContext,
} from '@looker/components'
import React, { FC, useContext } from 'react'
import styled from 'styled-components'

const CardItemInternal: FC<CardProps> = ({ children, ...props }) => {
  const { select } = useContext(CollectionContext)
  const { id } = props

  if (select && id) {
    const formId = `checkbox-${id}`
    const isChecked = select?.selectedItems.includes(id)
    const handleChange = () => select.onSelect(id)

    return (
      <label htmlFor={formId}>
        <CardItemStyle selected={isChecked} {...props}>
          <div className="checkbox-container">
            <Checkbox checked={isChecked} id={formId} onChange={handleChange} />
          </div>
          {children}
        </CardItemStyle>
      </label>
    )
  } else {
    return <Card {...props}>{children}</Card>
  }
}

type CardItemStyleProps = CardProps & { selected?: boolean }

const CardItemStyle = styled(Card)<CardItemStyleProps>`
  background: ${({ selected, theme }) => selected && theme.colors.keySubtle};

  display: flex;
  flex-direction: row;
  width: 100%;

  .checkbox-container {
    padding: ${({ theme }) => theme.space.medium};
    padding-right: 0;
  }

  ${CardContent} {
    width: calc(100% - 2rem);
  }
`

export const CardItem = styled(CardItemInternal)``
