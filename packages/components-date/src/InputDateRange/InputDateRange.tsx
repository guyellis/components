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
import type { FC, SyntheticEvent, Ref } from 'react'
import React, { useState, useEffect, forwardRef } from 'react'
import type { RangeModifier } from 'react-day-picker'
import styled from 'styled-components'
import isFunction from 'lodash/isFunction'
import partial from 'lodash/partial'
import min from 'lodash/min'
import max from 'lodash/max'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import {
  inputCSS,
  inputHeight,
  InputTextContent,
  InlineInputTextBase,
  inputTextHover,
  inputTextFocus,
  inputTextValidation,
  inputTextDisabled,
  ErrorIcon,
  VisuallyHidden,
  useID,
  useReadOnlyWarn,
} from '@looker/components'
import { Calendar, formatMonthTitle } from '../Calendar'
import { formatDateString, parseDateFromString } from '../locale'
import type { InputDateBaseProps } from '../types'

export type InputDateRangeProps = InputDateBaseProps & {
  defaultValue?: Partial<RangeModifier>
  onChange?: (range?: Partial<RangeModifier>) => void
  readOnly?: boolean
  ref?: Ref<HTMLDivElement>
  value?: Partial<RangeModifier>
}

type Endpoint = 'to' | 'from'

// Add or subtract given number of months to provided date
const transformMonth = (
  // eslint-disable-next-line default-param-last
  date: Date = new Date(Date.now()),
  monthDiff: number
) => {
  const newDate = new Date(date)
  newDate.setDate(1) // normalize to 1st of the month, so that no impossible dates are returned (e.g. Feb 31)
  newDate.setMonth(newDate.getMonth() + monthDiff)
  return newDate
}

// Decide which dates (from, to, or both) get updated based on active state and current value
// Example: if newDate is later than dateRange.to, update dateRange.to regardless of the
// activeDateInput value.
const chooseDatesToSet = (
  activeDateInput: Endpoint,
  newDate?: Date,
  dateRange: Partial<RangeModifier> = {}
): Endpoint[] => {
  const { from, to } = dateRange
  if (newDate) {
    if (
      isEmpty(dateRange) ||
      Number(newDate) === Number(from) ||
      Number(newDate) === Number(to)
    ) {
      return ['to', 'from'] // update both
    } else if (from && newDate < from) {
      return ['from']
    } else if (to && newDate > to) {
      return ['to']
    }
  }
  return [activeDateInput]
}

const isDateRangeInView = (
  dateRange: Partial<RangeModifier>,
  viewMonth: Date
) => {
  if (!dateRange.from || !dateRange.to) {
    return false
  }
  const monthOneTimestamp = viewMonth.getTime()
  const monthTwoTimestamp = transformMonth(viewMonth, 2).getTime()
  const fromTimestamp = dateRange.from.getTime()
  const toTimestamp = dateRange.to.getTime()

  if (fromTimestamp < monthOneTimestamp || toTimestamp >= monthTwoTimestamp) {
    return false
  }

  return true
}

export const InputDateRange: FC<InputDateRangeProps> = forwardRef(
  (
    {
      'aria-labelledby': ariaLabelledby,
      dateStringFormat,
      defaultValue = {},
      disabled,
      firstDayOfWeek,
      id,
      locale,
      onChange,
      onValidationFail,
      readOnly,
      validationType,
      value,
    },
    ref: Ref<HTMLDivElement>
  ) => {
    useReadOnlyWarn('InputDateRange', value, onChange)

    /*
     * JOINT State
     */
    const [dateRange, setDateRange] = useState<Partial<RangeModifier>>(
      value || defaultValue
    )

    // toggle between selecting start and end dates
    const [activeDateInput, setActiveDateInput] = useState<Endpoint>('from')

    // Calendar 1 view
    let calView = new Date(Date.now())
    if (value && value.from) {
      calView = value.from
    } else if (defaultValue && defaultValue.from) {
      calView = defaultValue.from
    }

    const [viewMonth, setViewMonth] = useState<Date>(calView)

    // Calendar 2 view
    const viewNextMonth = new Date(viewMonth)
    viewNextMonth.setMonth(viewNextMonth.getMonth() + 1)

    /*
     * FROM State
     */
    const [fromTextInputValue, setFromTextInputValue] = useState(
      formatDateString(dateRange.from, dateStringFormat, locale)
    )
    const [validFromDate, setValidFromDate] = useState(
      validationType !== 'error'
    )
    const fromID = useID(id && `from-${id}`)

    /*
     * TO State
     */
    const [toTextInputValue, setToTextInputValue] = useState(
      formatDateString(dateRange.to, dateStringFormat, locale)
    )
    const [validToDate, setValidToDate] = useState(validationType !== 'error')
    const toID = useID(id && `to-${id}`)

    /*
     * Combine state into one easily traversable object
     */
    const inputs = {
      from: {
        isValid: validFromDate,
        setIsValid: setValidFromDate,
        setValue: setFromTextInputValue,
        value: fromTextInputValue,
      },
      to: {
        isValid: validToDate,
        setIsValid: setValidToDate,
        setValue: setToTextInputValue,
        value: toTextInputValue,
      },
    }

    /*
     * Set up necessary callbacks
     */

    useEffect(() => {
      // controlled component: update state when value changes externally
      if (value && !isEqual(value, dateRange)) {
        setDateRange(value)
        value.from &&
          inputs.from.setValue(
            formatDateString(value.from, dateStringFormat, locale)
          )
        value.to &&
          inputs.to.setValue(
            formatDateString(value.to, dateStringFormat, locale)
          )
        value.from &&
          !isDateRangeInView(value, viewMonth) &&
          setViewMonth(value.from)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputs.from, inputs.to, value, onChange])

    const toggleActiveDateInput = () => {
      if (activeDateInput === 'from') {
        setActiveDateInput('to')
      } else {
        setActiveDateInput('from')
      }
    }

    const handleDateChange = (datesToSet: Endpoint[], date?: Date) => {
      /* eslint-disable sort-keys-fix/sort-keys-fix */
      const newDateRange: Partial<RangeModifier> = {
        ...dateRange,
        ...datesToSet.reduce(
          (r: Partial<RangeModifier>, endpoint) => ({
            ...r,
            [endpoint]: date,
          }),
          {}
        ),
      }

      // prevent reversed date ranges like Feb 23 - Jan 1
      // also make sure that there is always a `from` and `to` value
      if (activeDateInput === 'from') {
        // process `to` first so that you can always push the date range later than current `to` value
        newDateRange.to = max(values(newDateRange))
        newDateRange.from = min(values(newDateRange))
      } else {
        // process `from` first so that you can always push the date range earlier than current `from` value
        newDateRange.from = min(values(newDateRange))
        newDateRange.to = max(values(newDateRange))
      }

      // update input boxes to match selected dates
      // only update inactive input so as not to block manual keyboard input
      const nonActiveInput = datesToSet[0] === 'from' ? 'to' : 'from'
      inputs[nonActiveInput].setValue(
        formatDateString(newDateRange[nonActiveInput], dateStringFormat, locale)
      )

      if (!validationType) {
        // clear potentially stale date validation errors
        inputs.from.isValid || inputs.from.setIsValid(true)
        inputs.to.isValid || inputs.to.setIsValid(true)
      }

      // update final selected date range
      setDateRange(newDateRange)
      if (isFunction(onChange)) {
        onChange(newDateRange)
      }
    }

    const handleCalendarClick = (date: Date) => {
      const datesToSet = chooseDatesToSet(activeDateInput, date, dateRange)
      for (const d of datesToSet) {
        inputs[d].setValue(formatDateString(date, dateStringFormat, locale))
      }
      if (datesToSet[0] === activeDateInput && datesToSet.length === 1) {
        toggleActiveDateInput()
      }
      handleDateChange(datesToSet, date)
    }

    const handleTextInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
      const value = (e.target as HTMLInputElement).value
      inputs[activeDateInput].setValue(value)

      if (value.length === 0) {
        const inactiveDateInput = activeDateInput === 'from' ? 'to' : 'from'
        if (inputs[inactiveDateInput].value === '') {
          handleDateChange([activeDateInput, inactiveDateInput])
        } else {
          handleDateChange([activeDateInput])
        }
      } else {
        const parsedValue = parseDateFromString(value, locale, dateStringFormat)
        if (parsedValue) {
          const newMonthFocus =
            activeDateInput === 'to'
              ? transformMonth(parsedValue, -1)
              : parsedValue
          setViewMonth(newMonthFocus)
          handleDateChange([activeDateInput], parsedValue)
        }
      }
    }

    const handleValidation = (e: SyntheticEvent<HTMLInputElement>) => {
      // only revalidate if validationType is not set externally
      if (!validationType) {
        const value = (e.target as HTMLInputElement).value
        // is valid if text input is blank or parseDateFromString returns a date object
        const isValid =
          value.length === 0 ||
          !!parseDateFromString(value, locale, dateStringFormat)
        inputs[activeDateInput].setIsValid(isValid)
        if (!isValid && isFunction(onValidationFail)) {
          onValidationFail(value)
        }
      }
    }

    const handleNextClick = () => {
      setViewMonth(transformMonth(viewMonth, 1))
    }

    const handlePrevClick = () => {
      setViewMonth(transformMonth(viewMonth, -1))
    }

    const handleNowClick = () => {
      setViewMonth(new Date(Date.now()))
    }

    const handleTextInputFocus = (label: Endpoint) => setActiveDateInput(label)

    const handleMonthChange = (viewMonthDiff: number, month: Date) => {
      setViewMonth(transformMonth(month, viewMonthDiff))
    }

    const startDateLabelledby = `startDate-labelledby-${id}`
    const endDateLabelledby = `endDate-labelledby-${id}`

    const _formatMonthTitle = formatMonthTitle(locale)
    const monthTitle = `${_formatMonthTitle(viewMonth)} ${_formatMonthTitle(
      viewNextMonth
    )}`

    return (
      <InputDateRangeWrapper ref={ref}>
        <InputTextGroupWrapper
          disabled={disabled}
          active={activeDateInput === 'from'}
          validationType={
            inputs.from.isValid && inputs.to.isValid ? undefined : 'error'
          }
        >
          <VisuallyHidden id={startDateLabelledby}>Start date</VisuallyHidden>
          <InlineInputTextBase
            placeholder={`${formatDateString(
              new Date(Date.now()),
              dateStringFormat,
              locale
            )}`}
            disabled={disabled}
            data-testid="date-from-text-input"
            fontSize="small"
            id={fromID}
            onBlur={handleValidation}
            onChange={handleTextInputChange}
            onFocus={partial(handleTextInputFocus, 'from')}
            readOnly={readOnly}
            value={inputs.from.value}
            aria-labelledby={`${ariaLabelledby} ${startDateLabelledby}`}
          />
          <HyphenWrapper
            hasInputValues={!isEmpty(dateRange)}
            aria-hidden="true"
          >
            &ndash;
          </HyphenWrapper>
          <VisuallyHidden id={endDateLabelledby}>End date</VisuallyHidden>
          <InlineInputTextBase
            placeholder={formatDateString(
              new Date(Date.now()),
              dateStringFormat,
              locale
            )}
            disabled={disabled}
            fontSize="small"
            data-testid="date-to-text-input"
            id={toID}
            onBlur={handleValidation}
            onChange={handleTextInputChange}
            onFocus={partial(handleTextInputFocus, 'to')}
            readOnly={readOnly}
            value={inputs.to.value}
            aria-labelledby={`${ariaLabelledby} ${endDateLabelledby}`}
          />
          {(inputs.from.isValid && inputs.to.isValid) || (
            <InputTextContent pr="u2">
              <ErrorIcon />
            </InputTextContent>
          )}
        </InputTextGroupWrapper>
        <MultiCalendarLayout>
          <VisuallyHidden aria-live="assertive">{monthTitle}</VisuallyHidden>
          <CalendarWrapper>
            <Calendar
              disabled={disabled}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              onDayClick={handleCalendarClick}
              onMonthChange={partial(handleMonthChange, 0)}
              onNowClick={handleNowClick}
              onPrevClick={handlePrevClick}
              readOnly={readOnly}
              selectedDates={dateRange as RangeModifier}
              showNextButton={false}
              viewMonth={viewMonth}
            />
          </CalendarWrapper>
          <CalendarWrapper>
            <Calendar
              disabled={disabled}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              onDayClick={handleCalendarClick}
              onMonthChange={partial(handleMonthChange, -1)}
              onNextClick={handleNextClick}
              onNowClick={handleNowClick}
              readOnly={readOnly}
              selectedDates={dateRange as RangeModifier}
              showPreviousButton={false}
              viewMonth={viewNextMonth}
            />
          </CalendarWrapper>
        </MultiCalendarLayout>
      </InputDateRangeWrapper>
    )
  }
)

InputDateRange.displayName = 'InputDateRange'

const HyphenWrapper = styled.div<{ hasInputValues: boolean }>`
  align-items: center;
  color: ${({ theme, hasInputValues }) =>
    hasInputValues ? theme.colors.text3 : theme.colors.text1};
  display: flex;
  .label-down & {
    display: none;
  }
`
const InputDateRangeWrapper = styled.div`
  width: 100%;

  /* stylelint-disable media-feature-name-no-unknown */
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: grid;
    justify-items: center;
  }
`

const MultiCalendarLayout = styled.div`
  display: inline-grid;
  grid-column-gap: ${({ theme }) => theme.space.u5};
  grid-row-gap: ${({ theme }) => theme.space.u4};
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    margin: 0 auto;
  }
`

interface InputTextGroupWrapperProps {
  active: boolean
  disabled?: boolean
  validationType?: 'error'
}

const InputTextGroupWrapper = styled.div<InputTextGroupWrapperProps>`
  ${inputCSS}
  align-items: stretch;
  display: grid;
  font-family: ${({ theme }) => theme.fonts.body};
  grid-template-columns: auto auto auto 1fr;
  height: ${inputHeight};
  padding: ${({ theme: { space } }) => `${space.u05} ${space.u1}`};
  width: 100%;
  &:hover {
    ${inputTextHover}
  }

  &:focus-within {
    ${inputTextFocus}
  }

  ${inputTextValidation}

  ${({ disabled }) => disabled && inputTextDisabled}

  ${InputTextContent} {
    justify-self: right;
  }

  input {
    font-family: inherit;
  }
  ${InlineInputTextBase} {
    margin: ${({ theme }) => theme.space.u05} 0;
    &:focus-within {
      background: ${({ theme }) => theme.colors.keyAccent};
    }
    input,
    span {
      padding: 0 ${({ theme }) => theme.space.u2};
    }
  }
`

const CalendarWrapper = styled.div`
  ${Calendar} {
    padding: 0;
  }
`
