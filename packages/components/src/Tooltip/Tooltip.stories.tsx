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

import type { FormEvent, SyntheticEvent } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import type { Story } from '@storybook/react/types-6-0'
import { Button } from '../Button'
import { Card } from '../Card'
import { FieldToggleSwitch } from '../Form'
import { Space, SpaceVertical } from '../Layout'
import { Text } from '../Text'
import { Popover, PopoverContent } from '../Popover'
import { defaultArgTypes as argTypes } from '../../../../apps/storybook/src/defaultArgTypes'
import type { TooltipProps } from './'
import { Tooltip } from './'

const Template: Story<TooltipProps> = args => (
  <Tooltip {...args}>
    <Button m="xxxlarge">Open Tooltip</Button>
  </Tooltip>
)

export const Basic = Template.bind({})
Basic.args = {
  content: 'Simple Content',
}
Basic.parameters = {
  storyshots: { disable: true },
}

export const Open = Template.bind({})
Open.args = {
  ...Basic.args,
  isOpen: true,
}
Open.parameters = {
  storyshots: { disable: true },
}

export const PlacemenTop = Template.bind({})
PlacemenTop.args = {
  ...Basic.args,
  placement: 'top',
}
PlacemenTop.parameters = {
  storyshots: { disable: true },
}

export const PlacementRight = Template.bind({})
PlacementRight.args = {
  ...Basic.args,
  placement: 'right',
}
PlacementRight.parameters = {
  storyshots: { disable: true },
}

export const PlacementLeft = Template.bind({})
PlacementLeft.args = {
  ...Basic.args,
  content: 'Left',
  placement: 'left',
}
PlacementLeft.parameters = {
  storyshots: { disable: true },
}

export const DelayNone = Template.bind({})
DelayNone.args = {
  ...Basic.args,
  delay: 'none',
}
DelayNone.parameters = {
  storyshots: { disable: true },
}

export const OpenDelayNone = Template.bind({})
OpenDelayNone.args = {
  ...DelayNone.args,
  isOpen: true,
}
OpenDelayNone.parameters = {
  storyshots: { disable: true },
}

export const RenderProp = () => (
  <Tooltip content="Start editing" placement="right">
    {tooltipProps => (
      <Button m="xxxlarge" {...tooltipProps}>
        Open Tooltip
      </Button>
    )}
  </Tooltip>
)

RenderProp.parameters = {
  storyshots: { disable: true },
}

export const LargeTrigger = () => (
  <Tooltip content="See what happens when you scroll" placement="right">
    <Card width={500} height={800} raised p="u5">
      Very large trigger
    </Card>
  </Tooltip>
)

LargeTrigger.parameters = {
  storyshots: { disable: true },
}

export const NestedInPopover = () => {
  const [prevent, setPrevent] = useState(false)
  function handleChange(e: FormEvent<HTMLInputElement>) {
    setPrevent(e.currentTarget.checked)
  }

  const [lastEvent, setLastEvent] = useState('N/A')
  const getHandler = (text: string) => (e: SyntheticEvent) => {
    setLastEvent(text)
    if (prevent) {
      e.preventDefault()
    }
  }

  const handlers = {
    onBlur: getHandler('blur'),
    onClick: getHandler('click'),
    onFocus: getHandler('focus'),
    onMouseOut: getHandler('mouse out'),
    onMouseOver: getHandler('mouse over'),
  }

  return (
    <SpaceVertical p="u5">
      <Text>Last event: {lastEvent}</Text>
      <Space>
        <Popover content={<PopoverContent>Some content</PopoverContent>}>
          <Tooltip content="Some tooltip">
            <Button {...handlers}>Open</Button>
          </Tooltip>
        </Popover>
        <FieldToggleSwitch
          on={prevent}
          onChange={handleChange}
          label="Prevent default"
        />
      </Space>
    </SpaceVertical>
  )
}

NestedInPopover.parameters = {
  storyshots: { disable: true },
}

export const PerformanceTest = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value)
  const lastRenderRef = useRef(Date.now())
  useEffect(() => {
    const now = Date.now()
    const diff = now - lastRenderRef.current
    // eslint-disable-next-line no-console
    console.log(diff)
    lastRenderRef.current = now
  })
  return (
    <div>
      <p>Type fast then hold down delete:</p>
      <input type="text" value={value} onChange={handleChange} />
      <p>The text shouldn't freeze due to main thread being blocked.</p>
      <div>
        {Array.from(Array(1000), (_, i) => (
          <Tooltip key={i} content="I'm a tooltip">
            <button>Hover me</button>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

PerformanceTest.parameters = {
  storyshots: { disable: true },
}

export default {
  argTypes,
  component: Tooltip,
  title: 'Tooltip',
}
