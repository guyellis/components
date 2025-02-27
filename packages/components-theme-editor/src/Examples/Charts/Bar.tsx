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

import { Box2 } from '@looker/components'
import type { FC } from 'react'
import React from 'react'
import styled from 'styled-components'

const FauxChartLayout: FC<{ className?: string }> = ({ className }) => (
  <ul className={className}>
    <li>
      <Box2 mx="u5" height="20%" title="Gouda" bg="inform"></Box2>
    </li>
    <li>
      <Box2 mx="u5" height="60%" title="Cheddar" bg="positive"></Box2>
    </li>
    <li>
      <Box2 mx="u5" height="90%" title="Swiss" bg="warn"></Box2>
    </li>
    <li>
      <Box2 mx="u5" height="40%" title="Blue" bg="critical"></Box2>
    </li>
  </ul>
)

export const FauxBarChart = styled(FauxChartLayout)`
  display: table;
  height: calc(100% - 1.5rem);
  table-layout: fixed;
  width: 100%;

  li {
    display: table-cell;
    height: 90%;
    position: relative;
    vertical-align: bottom;
  }

  div::before {
    content: attr(title);
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.small};
    left: 0;
    padding: 5px 1rem 0;
    position: absolute;
    right: 0;
    text-align: center;
    top: 100%;
    word-wrap: break-word;
  }
`
