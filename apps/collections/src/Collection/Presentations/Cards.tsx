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

import { ButtonOutline, Grid, Heading, Paragraph } from '@looker/components'
import React, { FC } from 'react'
import { Link } from '../../Link'
import { PresentationProps } from '../Presenter'
import { ItemProps } from '../types'
import { CardItem } from './CardItem'

const Item: FC<ItemProps & Pick<PresentationProps, 'itemType'>> = ({
  href,
  id,
  title,
  itemType,
  description,
}) => (
  <CardItem id={String(id)}>
    <Heading
      as="h4"
      color="text2"
      fontSize="xsmall"
      fontWeight="semiBold"
      textTransform="uppercase"
    >
      {itemType}
    </Heading>
    <Heading as="h2" fontSize="medium" fontWeight="semiBold" truncate>
      {title}
    </Heading>
    <Paragraph fontSize="small">{description}</Paragraph>
    {href && id && (
      <Link target="blank" to={href(id)}>
        <ButtonOutline size="small" mt="small">
          View
        </ButtonOutline>
      </Link>
    )}
  </CardItem>
)

export const Presenter: FC<PresentationProps> = ({ itemType, items, href }) => (
  <Grid columns={4}>
    {items.map((item, i) => (
      <Item key={i} {...item} href={href} itemType={itemType} />
    ))}
  </Grid>
)
