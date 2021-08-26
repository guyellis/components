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

import type { FC } from 'react'
import React from 'react'
import styled from 'styled-components'
import { Space, SpaceVertical } from '../../Layout'
import { Paragraph } from '../../Text'
import { ValidationMessage } from '../ValidationMessage/ValidationMessage'
import { Truncate } from '../../Truncate'
import type { FieldBaseProps } from './FieldBase'
import { RequiredStar } from './RequiredStar'
/**
 * `<FieldInline />` allows the rendering of a label (for FieldCheckbox, FieldRadio and FieldToggleSwitch),
 * and can render a validation message.
 * The label will always be placed on the right side of the input.
 */

interface FieldInlinePropsInternal extends FieldBaseProps {
  id: string
}

const FieldInlineLayout: FC<FieldInlinePropsInternal> = ({
  className,
  children,
  description,
  detail,
  label,
  id,
  required,
  validationMessage,
}) => {
  return (
    <Space gap="u2" align="start" className={className}>
      {children}
      <SpaceVertical className={className} gap="u1">
        <Space gap="u2" align="start">
          <label htmlFor={id}>
            <Truncate>{label}</Truncate>
            {required && <RequiredStar />}
          </label>
          {detail && <FieldDetail>{detail}</FieldDetail>}
        </Space>
        <div id={`${id}-describedby`}>
          {description && <FieldDescription>{description}</FieldDescription>}
          {validationMessage ? (
            <ValidationMessage {...validationMessage} />
          ) : null}
        </div>
      </SpaceVertical>
    </Space>
  )
}

const FieldDetail = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.text2};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  line-height: ${({ theme }) => theme.lineHeights.xsmall};
  padding-left: ${({ theme }) => theme.space.u2};
`

const FieldDescription = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.text2};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  line-height: ${({ theme }) => theme.lineHeights.xsmall};
  padding-bottom: ${({ theme }) => theme.space.u1};
`

export const FieldInline = styled(FieldInlineLayout)`
  label {
    color: ${({ theme, disabled }) => disabled && theme.colors.text1};
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: ${({ theme }) => theme.lineHeights.xsmall};
  }
`
