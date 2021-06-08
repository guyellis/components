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
import {
  Card,
  CardContent,
  Grid,
  Heading,
  Icon,
  Space,
} from '@looker/components'
import { Home } from '@styled-icons/material-outlined/Home'
import { SupportedCollections } from '../supportedCollections'
import { Link } from '../Link'
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
      <Space gap="xsmall" width="auto">
        <Icon color="key" icon={<Home />} display="inline-block" size="large" />
        <Heading fontSize="xxxxlarge">Welcome</Heading>
      </Space>
      <Grid gap="xxlarge" py="large" columns={3}>
        {cards}
      </Grid>
    </>
  )
}
