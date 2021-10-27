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

import { renderWithTheme } from '@looker/components-test-utils'
import type { FC } from 'react'
import React from 'react'
import {
  QueryContext,
  mockQueryResult,
  mockSdkConfigResponse,
} from '@looker/visualizations-adapters'
import type { QueryFormatterProps } from './QueryFormatter'
import { QueryFormatter } from './QueryFormatter'

afterEach(() => {
  jest.clearAllMocks()
})

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('QueryFormatter component', () => {
  const QueryFormatterInContext: FC<QueryFormatterProps> = props => (
    <QueryContext.Provider
      value={{
        ...mockQueryResult,
        config: mockSdkConfigResponse,
      }}
    >
      <QueryFormatter {...props} />
    </QueryContext.Provider>
  )

  it('passes config object to child component', () => {
    const configLogger = jest.fn()
    const CustomVis: FC<any> = ({ config }) => {
      configLogger(config)
      return null
    }
    renderWithTheme(
      <QueryFormatterInContext>
        <CustomVis />
      </QueryFormatterInContext>
    )
    expect(configLogger.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "defaults_version": 1,
            "interpolation": "linear",
            "label_density": 25,
            "label_type": "lab",
            "legend": Object {
              "position": "bottom",
            },
            "plot_size_by_field": false,
            "point_style": "circle_outline",
            "series": Object {
              "orders.average_total_amount_of_order_usd": Object {
                "color": "#70BEFA",
                "label": "Average Order Price",
                "visible": false,
              },
              "orders.count": Object {
                "color": "#FA8072",
                "label": "Total Orders",
                "visible": true,
              },
            },
            "series_cell_visualizations": Object {
              "orders.count": Object {
                "is_active": true,
              },
            },
            "series_point_styles": Object {
              "orders.count": "diamond",
            },
            "series_types": Object {},
            "show_null_points": true,
            "show_value_labels": false,
            "show_view_names": false,
            "show_y_axis_labels": true,
            "show_y_axis_ticks": true,
            "size_by_field": "",
            "stacking": "grouped",
            "tooltips": true,
            "trellis": "",
            "type": "line",
            "value_labels": "legend",
            "x_axis": Array [
              Object {
                "gridlines": false,
                "label": "Orders Created Date",
                "reversed": false,
                "tick_density": "default",
                "values": true,
              },
            ],
            "x_axis_scale": "auto",
            "y_axis": Array [
              Object {
                "gridlines": true,
                "label": "Axis name (1)",
                "range": Array [
                  "auto",
                  "auto",
                ],
                "reversed": false,
                "tick_density": "default",
                "values": true,
              },
            ],
            "y_axis_combined": true,
            "y_axis_scale_mode": "linear",
            "y_axis_tick_density": "default",
            "y_axis_tick_density_custom": 5,
          },
        ],
      ]
    `)
  })

  it('passes tabular formatted data to child by default', () => {
    const dataLogger = jest.fn()
    const CustomVis: FC<any> = ({ data }) => {
      dataLogger(data)
      return null
    }
    renderWithTheme(
      <QueryFormatterInContext>
        <CustomVis />
      </QueryFormatterInContext>
    )
    expect(dataLogger.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Array [
            Object {
              "orders.count": 3087,
              "users.count": 1088,
              "users.gender": "f",
              "users.state": "California",
            },
            Object {
              "orders.count": 2515,
              "users.count": 1069,
              "users.gender": "m",
              "users.state": "California",
            },
          ],
        ],
      ]
    `)
  })

  it('passes fields object to child component', () => {
    const fieldsLogger = jest.fn()
    const CustomVis: FC<any> = ({ fields }) => {
      fieldsLogger(fields)
      return null
    }
    renderWithTheme(
      <QueryFormatterInContext>
        <CustomVis />
      </QueryFormatterInContext>
    )
    expect(fieldsLogger.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "dimensions": Array [
              Object {
                "is_filter": false,
                "is_fiscal": false,
                "is_numeric": false,
                "is_timeframe": true,
                "label": "Orders Created Date",
                "label_short": "Created Date",
                "name": "orders.created_date",
                "sortable": true,
                "type": "date_date",
                "view": "orders",
                "view_label": "Orders",
              },
            ],
            "measures": Array [
              Object {
                "is_numeric": true,
                "label": "Orders Count",
                "label_short": "Count",
                "name": "orders.count",
                "sortable": true,
                "view": "orders",
                "view_label": "Orders",
              },
              Object {
                "is_numeric": true,
                "label": "Orders Average Total Amount of Order USD",
                "label_short": "Average Total Amount of Order USD",
                "name": "orders.average_total_amount_of_order_usd",
                "sortable": true,
                "view": "orders",
                "view_label": "Orders",
              },
            ],
          },
        ],
      ]
    `)
  })

  it('passes custom user provided props to child component', () => {
    const propsLogger = jest.fn()
    const CustomVis: FC<any> = ({ customProp, customerData }) => {
      propsLogger({ customProp, customerData })
      return null
    }
    renderWithTheme(
      <QueryFormatterInContext>
        <CustomVis customProp={true} customerData="12345" />
      </QueryFormatterInContext>
    )
    expect(propsLogger.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "customProp": true,
            "customerData": "12345",
          },
        ],
      ]
    `)
  })
})