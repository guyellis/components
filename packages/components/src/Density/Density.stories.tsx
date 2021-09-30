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
import type { Story } from '@storybook/react/types-6-0'
import { defaultArgTypes as argTypes } from '../../../../apps/storybook/src/defaultArgTypes'
import { List } from '../List'
import { ListItem } from '../ListItem'
import type { DensityProps } from './Density'
import { Density } from './Density'

export default {
  argTypes,
  component: Density,
  title: 'Density',
}

const Template: Story<DensityProps> = (args) => (
  <Density {...args}>
    <List>
      <ListItem>Cheddar</ListItem>
      <ListItem>Gouda</ListItem>
      <ListItem>Swiss</ListItem>
    </List>
  </Density>
)

export const Plus1 = Template.bind({})
Plus1.args = {
  scale: 1,
}

export const Basic = Template.bind({})
Basic.args = {
  scale: 0,
}

export const Minus1 = Template.bind({})
Minus1.args = {
  scale: -1,
}

export const Minus2 = Template.bind({})
Minus2.args = {
  scale: -2,
}

export const Minus3 = Template.bind({})
Minus3.args = {
  scale: -3,
}