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

import React from 'react'
import type { Story } from '@storybook/react/types-6-0'
import styled, { css } from 'styled-components'
import type { SimpleLayoutProps } from '../Layout'
import { simpleLayoutCSS } from '../Layout'
import type { UseBoundedRippleProps, UseRippleProps } from './'
import { useRipple, useBoundedRipple, useRippleHandlers, rippleStyle } from './'

type RippleProps = SimpleLayoutProps & UseRippleProps & { className?: string }

const styles = css`
  ${simpleLayoutCSS}
  ${rippleStyle}

align-items: center;
  display: flex;
  justify-content: center;
`

const Ripple = styled(
  ({ bounded, className, color, height, width, ...props }: RippleProps) => {
    const { callbacks, ...rippleProps } = useRipple({
      bounded,
      className,
      color,
      height,
      width,
    })

    const rippleHandlers = useRippleHandlers(callbacks, {})

    return (
      <div tabIndex={0} {...rippleProps} {...rippleHandlers} {...props}>
        click me
      </div>
    )
  }
)<SimpleLayoutProps>`
  ${styles}
`

type BoundedRippleProps = SimpleLayoutProps &
  Omit<UseBoundedRippleProps, 'ref'> & { className?: string }

const BoundedRipple = styled(
  ({ className, color, height, width, ...props }: BoundedRippleProps) => {
    const { callbacks, ...rippleProps } = useBoundedRipple<HTMLDivElement>({
      className,
      color,
    })

    const rippleHandlers = useRippleHandlers(callbacks, {})

    return (
      <div tabIndex={0} {...rippleProps} {...rippleHandlers} {...props}>
        click me
      </div>
    )
  }
)<SimpleLayoutProps>`
  ${styles}
`

const Template: Story<RippleProps> = args => <Ripple {...args} />
const BoundedTemplate: Story<BoundedRippleProps> = args => (
  <BoundedRipple {...args} />
)

export const Basic = Template.bind({})
Basic.args = { height: 80, width: 80 }
Basic.parameters = { storyshots: { disable: true } }

export const Bounded = BoundedTemplate.bind({})
Bounded.args = { ...Basic.args, width: 200 }
Bounded.parameters = { storyshots: { disable: true } }

export const Key = Template.bind({})
Key.args = { ...Basic.args, color: 'key' }
Key.parameters = { storyshots: { disable: true } }

export const Critical = Template.bind({})
Critical.args = { ...Basic.args, color: 'critical' }
Critical.parameters = { storyshots: { disable: true } }

export const Calculation = Template.bind({})
Calculation.args = { ...Basic.args, color: 'calculation' }
Calculation.parameters = { storyshots: { disable: true } }

export const Dimension = Template.bind({})
Dimension.args = { ...Basic.args, color: 'dimension' }
Dimension.parameters = { storyshots: { disable: true } }

export const Measure = Template.bind({})
Measure.args = { ...Basic.args, color: 'measure' }
Measure.parameters = { storyshots: { disable: true } }

export const NoAnimation = () => <Ripple height={80} width={80} />
NoAnimation.parameters = { storyshots: { disable: true } }

export default {
  component: Ripple,
  title: 'Ripple',
}
