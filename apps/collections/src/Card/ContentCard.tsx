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

import { CardContent, CardProps, Heading, Paragraph } from '@looker/components'
import React, { FC, ReactNode } from 'react'
import { Link } from '../Link'
import { CardItem } from './CardItem'

type ContentCardProps = CardProps & {
  selected?: boolean
  overline?: string
  /**
   * optional extra description
   * I18n recommended: content that is user visible should be treated for i18n
   */
  description?: ReactNode
  /**
   * Detail element placed right of the item children. Prop value can take one of two forms:
   * 1. ReactNode
   * 2. Object with content and options properties
   *
   * I18n recommended: content that is user visible should be treated for i18n
   */
  detail?: ReactNode
}

export const ContentCard: FC<ContentCardProps> = ({
  overline,
  children,
  href,
  description,
  detail,
  ...cardProps
}) => {
  return (
    <CardItem {...cardProps}>
      <CardContent>
        <CardOverline>{overline}</CardOverline>
        <CardLabel href={href}>{children}</CardLabel>
        <CardDetail>{detail}</CardDetail>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </CardItem>
  )
}

const CardLabel = ({
  children,
  href,
}: {
  children?: ReactNode
  href?: string
}) => (
  <Heading as="h2" fontSize="medium" fontWeight="semiBold" truncate>
    {href ? (
      <Link visible target="blank" to={href}>
        {children}
      </Link>
    ) : (
      children
    )}
  </Heading>
)

const CardDescription = ({ children }: { children?: ReactNode }) =>
  children ? <Paragraph fontSize="small">{children}</Paragraph> : null

const CardDetail = ({ children }: { children?: ReactNode }) =>
  children ? (
    <Paragraph fontSize="xsmall" color="text2">
      {children}
    </Paragraph>
  ) : null

const CardOverline = ({ children }: { children?: string }) =>
  children ? (
    <Heading
      as="h4"
      color="text2"
      fontSize="xsmall"
      fontWeight="semiBold"
      textTransform="uppercase"
    >
      {children}
    </Heading>
  ) : null
