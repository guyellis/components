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

import type { Story } from '@storybook/react/types-6-0'
// import type { Page } from 'puppeteer'
import React, { useState } from 'react'
import { Space } from '../Layout'
import { defaultArgTypes as argTypes } from '../../../../apps/storybook/src/defaultArgTypes'
import type { ChipProps } from './Chip'
import { Chip } from './Chip'

export default {
  argTypes,
  component: Chip,
  title: 'Chip',
}

const Template: Story<ChipProps & { text: string }> = ({ text, ...args }) => (
  <Chip {...args}>{text}</Chip>
)

export const Basic = Template.bind({})
Basic.args = {
  text: 'Basic',
}

export const Focused = Template.bind({})
Focused.args = {
  text: 'Focused',
}

Focused.parameters = {
  // beforeScreenshot: async (page: Page) => {
  //   const chip = await page.$('span')
  //   await chip?.type(' ')
  //   await page.waitForTimeout(50)
  // },
  docs: { disable: true },
  storyshots: { disable: true },
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  text: 'Disabled',
}

export const Deletable = Template.bind({})
Deletable.args = {
  onDelete: () => {
    //
  },
  text: 'Deletable',
}

export const Prefix = Template.bind({})
Prefix.args = {
  prefix: 'role',
  text: 'admin',
}

export const MaxWidth = Template.bind({})
MaxWidth.args = {
  maxWidth: 150,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
}

export const ClickAndDelete = () => {
  const handleClick = () => alert('Clicked!')
  const handleDelete = () => alert('Deleted!')
  return (
    <Space>
      <Chip onClick={handleClick}>Click Me</Chip>
      <Chip disabled onClick={handleClick}>
        Click Me (nothing happens)
      </Chip>
      <Chip onClick={handleClick} onDelete={handleDelete}>
        Delete Me
      </Chip>
      <Chip disabled onClick={handleClick} onDelete={handleDelete}>
        Delete Me (nothing happens)
      </Chip>
    </Space>
  )
}

ClickAndDelete.parameters = {
  storyshots: { disable: true },
}

export const Removable = () => {
  const [values, setValues] = useState(['Cheddar', 'Gouda', 'Swiss'])
  function getDeleteHandler(item: string) {
    return () => {
      const newValues = values.filter(value => value !== item)
      setValues(newValues)
    }
  }
  return (
    <Space>
      {values.map(item => (
        <Chip onDelete={getDeleteHandler(item)} role="option" key={item}>
          {item}
        </Chip>
      ))}
    </Space>
  )
}

Removable.parameters = {
  storyshots: { disable: true },
}
