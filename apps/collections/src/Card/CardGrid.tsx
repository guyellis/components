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

import { Breakpoint, Grid, GridProps } from '@looker/components'
import { DensityRamp } from 'packages/components/src/List/types'
import React, { FC } from 'react'
import { CardContext } from './CardContext'

const sharedProps: Pick<GridProps, 'gap' | 'py'> = {
  gap: 'large',
  py: 'medium',
}

export const CardGrid: FC<{ density?: DensityRamp }> = ({
  density = 0,
  ...props
}) => (
  <CardContext.Provider value={{ density }}>
    <Breakpoint show="mobile">
      <Grid columns={1} {...props} {...sharedProps} />
    </Breakpoint>
    <Breakpoint show={['tablet', 'laptop']}>
      <Grid {...props} {...sharedProps} />
    </Breakpoint>
    <Breakpoint show={['laptop', undefined]}>
      <Grid columns={3} {...props} {...sharedProps} />
    </Breakpoint>
  </CardContext.Provider>
)
