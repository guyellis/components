/*

 MIT License

 Copyright (c) 2022 Looker Data Sciences, Inc.

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

import { Box2, Code, Text, Heading, UnorderedList } from '@looker/components'
import type { FC } from 'react'
import React from 'react'
import styled from 'styled-components'

const spacingTypes = [
  { label: 'Margin', value: 'm' },
  { label: 'Padding', value: 'p' },
]

const spacingSides = [
  { defaultLabel: '(default)', label: 'All', value: '-' },
  { label: 'Top', value: 't' },
  { label: 'Right', value: 'r' },
  { label: 'Bottom', value: 'b' },
  { label: 'Left', value: 'l' },
  { label: 'Left & Right', value: 'x' },
  { label: 'Top & Bottom', value: 'y' },
]

const spacingSizes = [
  { label: '4px', value: 'u1' },
  { label: '8px', value: 'u2' },
  { label: '12px', value: 'u3' },
  { label: '16px', value: 'u4' },
  { label: '20px', value: 'u5' },
  { label: '32px', value: 'u8' },
  { label: '40px', value: 'u10' },
  { label: '64px', value: 'u16' },
]

export interface ColumnExample {
  value: string
  label: string
  defaultLabel?: string
}

const SpacingTable = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  margin: 2rem 0;
  & > div {
    border-right: 1px solid ${({ theme }) => theme.colors.ui2};
    &:last-child {
      border-right: none;
    }
  }
`

const ListRender = (
  value: string,
  label: string,
  key: number,
  defaultLabel?: string
) => {
  return (
    <li key={key}>
      <Box2
        px="u2"
        as="span"
        bg="ui1"
        borderRadius="4px"
        display="inline-block"
        color="key"
      >
        <Code fontSize="xsmall">{value}</Code>
      </Box2>
      <Box2 ml="u3" as="span">
        <Text fontSize="small">{label}</Text>
        <Box2 as="span" ml="u2">
          <Text fontSize="xsmall" color="text1">
            {defaultLabel}
          </Text>
        </Box2>
      </Box2>
    </li>
  )
}

interface BoxSpacingRecipeTableProps {
  types: ColumnExample[]
  sides: ColumnExample[]
  sizes: ColumnExample[]
}

export const BoxSpacingRecipeTable: FC<BoxSpacingRecipeTableProps> = ({
  types = spacingTypes,
  sides = spacingSides,
  sizes = spacingSizes,
}) => (
  <SpacingTable>
    <div>
      <Heading
        fontSize="medium"
        color="text2"
        textTransform="uppercase"
        fontWeight="semiBold"
      >
        1. Type
      </Heading>
      <UnorderedList pl="none">
        {types.map((col, i) => ListRender(col.value, col.label, i))}
      </UnorderedList>
    </div>
    <div>
      <Heading
        fontSize="medium"
        color="text2"
        textTransform="uppercase"
        fontWeight="semiBold"
      >
        2. Side
      </Heading>
      <UnorderedList pl="none">
        {sides.map((col, i) =>
          ListRender(col.value, col.label, i, col.defaultLabel)
        )}
      </UnorderedList>
    </div>
    <div>
      <Heading
        fontSize="medium"
        color="text2"
        textTransform="uppercase"
        fontWeight="semiBold"
      >
        3. Amount
      </Heading>
      <UnorderedList pl="none">
        {sizes.map((col, i) => ListRender(col.value, col.label, i))}
      </UnorderedList>
    </div>
  </SpacingTable>
)
