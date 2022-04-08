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
import type { I18nState } from '../../utils'

const resources = {
  describe_date: {
    ' complete': ' concluído',
    'absolute prefix dateTime': '{{prefix}} {{dateTime}}',
    ago: 'há',
    'from now': 'daqui a',
    'is any time': 'é em qualquer altura',
    'is before': 'é antes de',
    'is day': 'é {{day}}',
    'is from dateTimeStart until dateTimeEnd':
      'é de {{dateTimeStart}} até {{dateTimeEnd}}',
    'is in month year': 'é em {{month}} {{year}}',
    'is in the last': 'é no último {{describeInterval}}',
    'is in the year year': 'é no ano {{year}}',
    'is interval ago': 'é há {{interval}}',
    'is intervalStart intervalType for intervalEnd':
      'é {{intervalStart}} {{intervalType}} até {{intervalEnd}}',
    'is not null': 'não é nulo',
    'is on dateTime': 'é em {{dateTime}}',
    'is on or after': 'é a ou depois de',
    'is previous unitLabel': 'é {{unitLabel}} anterior',
    'is type unitLabel': 'é {{type}} {{unitLabel}}',
    'prefix interval timePassed': '{{prefix}} {{interval}} {{timePassed}}',
    'prefix now': '{{prefix}} agora',
    'this startInterval to endInterval':
      'este {{startInterval}} até {{endInterval}}',
    'value complete unitLabel': '{{value}}{{complete}} {{unitLabel}}',
  },
  get_months: {
    April: 'Abril',
    August: 'Agosto',
    December: 'Dezembro',
    February: 'Fevereiro',
    January: 'Janeiro',
    July: 'Julho',
    June: 'Junho',
    March: 'Março',
    May: 'Maio',
    November: 'Novembro',
    October: 'Outubro',
    September: 'Setembro',
  },
  get_unit_label: {
    'complete day': 'dia completo',
    'complete days': 'dias completos',
    'complete fiscal quarter': 'trimestre fiscal completo',
    'complete fiscal quarters': 'trimestres fiscais completos',
    'complete fiscal year': 'ano fiscal completo',
    'complete fiscal years': 'anos fiscais completos',
    'complete hour': 'hora completa',
    'complete hours': 'horas completas',
    'complete minute': 'minuto completo',
    'complete minutes': 'minutos completos',
    'complete month': 'mês completo',
    'complete months': 'meses completos',
    'complete quarter': 'trimestre completo',
    'complete quarters': 'trimestres completos',
    'complete second': 'segundo completo',
    'complete seconds': 'segundos completos',
    'complete week': 'semana completa',
    'complete weeks': 'semanas completas',
    'complete year': 'ano completo',
    'complete years': 'anos completos',
    day: 'dia',
    days: 'dias',
    'fiscal quarter': 'trimestre fiscal',
    'fiscal quarters': 'trimestres fiscais',
    'fiscal year': 'ano fiscal',
    'fiscal years': 'anos fiscais',
    hour: 'hora',
    hours: 'horas',
    minute: 'minuto',
    minutes: 'minutos',
    month: 'mês',
    months: 'meses',
    quarter: 'trimestre',
    quarters: 'trimestres',
    second: 'segundo',
    seconds: 'segundos',
    week: 'semana',
    weeks: 'semanas',
    year: 'ano',
    years: 'anos',
  },
  summary: {
    'Value required': 'É necessário um valor',
  },
}

export const ptPT: I18nState = {
  locale: 'pt-PT',
  resources: { 'pt-PT': resources },
}
