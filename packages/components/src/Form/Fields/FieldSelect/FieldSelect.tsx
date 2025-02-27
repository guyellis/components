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

import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useID } from '../../../utils'
import { useFormContext } from '../../Form'
import type { SelectProps } from '../../Inputs/Select/Select'
import { Select } from '../../Inputs/Select/Select'
import type { FloatingLabelFieldProps } from '../Field'
import { FloatingLabelField, omitFieldProps, pickFieldProps } from '../Field'
import { getHasValue } from '../Field/useFloatingLabel'

export interface FieldSelectProps
  extends FloatingLabelFieldProps,
    SelectProps {}

const FieldSelectComponent = forwardRef(
  (props: FieldSelectProps, ref: Ref<HTMLInputElement>) => {
    const validationMessage = useFormContext(props)
    const id = useID(props.id)
    return (
      <FloatingLabelField
        {...pickFieldProps(props)}
        id={id}
        ariaLabelOnly
        validationMessage={validationMessage}
        hasValue={getHasValue(props)}
      >
        <Select
          {...omitFieldProps(props)}
          aria-describedby={`describedby-${id}`}
          aria-labelledby={`labelledby-${id}`}
          id={id}
          validationType={validationMessage && validationMessage.type}
          ref={ref}
        />
      </FloatingLabelField>
    )
  }
)

FieldSelectComponent.displayName = 'FieldSelectComponent'

export const FieldSelect = styled(FieldSelectComponent)``
