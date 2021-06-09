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

import React from 'react'
import { Card, CardContent, Heading } from '@looker/components'
import { Home } from '@styled-icons/material-outlined/Home'
import { SupportedCollections } from '../supportedCollections'
import { Link } from '../Link'
import { PageHeader } from '../Page'
import { CardGrid } from '../Card/CardGrid'
import { CardBanner } from './CardBanner'

type HomeProps = {
  collections: SupportedCollections
}

export const HomePage = ({ collections }: HomeProps) => {
  const cards = collections.map(({ icon, title }, i) => (
    <Link to={`/${title.toLowerCase()}`} key={i}>
      <Card raised>
        {icon && <CardBanner>{icon}</CardBanner>}
        <CardContent>
          <Heading>{title}</Heading>
        </CardContent>
      </Card>
    </Link>
  ))

  return (
    <>
      <PageHeader icon={<Home />}>Welcome</PageHeader>
      <CardGrid>{cards}</CardGrid>
    </>
  )
}
