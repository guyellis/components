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
import type { I18nState } from '../../utils'

const resources = {
  describe_date: {
    'absolute prefix dateTime': '{{prefix}} {{dateTime}}',
    ago: 'тому',
    'from now': 'відтепер',
    'is any time': 'є будь-яким часом',
    'is before': 'раніше',
    'is day': '{{day}}',
    'is from dateTimeStart until dateTimeEnd':
      'з {{dateTimeStart}} до {{dateTimeEnd}}',
    'is in month year': 'станом на {{month}} {{year}}',
    'is in the last': 'за останні {{describeInterval}}',
    'is in the year year': 'станом на {{year}} рік',
    'is interval ago': '{{interval}} тому',
    'is intervalStart intervalType for intervalEnd':
      'це {{intervalStart}} {{intervalType}} для {{intervalEnd}}',
    'is not null': 'не має значення NULL',
    'is on dateTime': 'станом на {{dateTime}}',
    'is on or after': 'не раніше',
    'is previous unitLabel': 'це попередній {{unitLabel}}',
    'is type unitLabel': 'це {{type}} {{unitLabel}}',
    'prefix interval timePassed': '{{prefix}} {{interval}} {{timePassed}}',
    'prefix now': '{{prefix}} зараз',
    'this startInterval to endInterval':
      'це {{startInterval}} до {{endInterval}}',
    'value complete unitLabel': '{{value}}{{complete}} {{unitLabel}}',
  },
  get_months: {
    April: 'квітня',
    August: 'серпня',
    December: 'грудня',
    February: 'лютого',
    January: 'січня',
    July: 'липня',
    June: 'червня',
    March: 'березня',
    May: 'трав.',
    November: 'листопада',
    October: 'жовтня',
    September: 'вересня',
  },
  get_unit_label: {
    'complete days': 'повних днів',
    'complete fiscal quarters': 'повних фінансових кварталів',
    'complete fiscal years': 'повних фінансових років',
    'complete hours': 'повних годин',
    'complete minutes': 'повних хвилин',
    'complete months': 'повних місяців',
    'complete quarters': 'повних кварталів',
    'complete seconds': 'повних секунд',
    'complete weeks': 'повних тижнів',
    'complete years': 'повних років',
    days: 'дн',
    'fiscal quarters': 'фінансових кварталів',
    'fiscal years': 'фінансових років',
    hours: 'год',
    minutes: 'хв',
    months: 'міс.',
    quarters: 'кварт.',
    seconds: 'сек',
    weeks: 'тижн',
    years: 'р.',
  },
  summary: {
    'Value required': 'Потрібно ввести значення',
  },
}

export const ukUA: I18nState = {
  locale: 'uk-UA',
  resources: { 'uk-UA': resources },
}