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
import ReactDOM from 'react-dom'
import { ComponentsProvider } from '@looker/components'
import { ExtensionProvider2 } from '@looker/extension-sdk-react'
import { Looker40SDK } from '@looker/sdk'
import { App } from './App'
import { Loading } from './Loading'

const getRoot = () => {
  const existingRoot = document.getElementById('extension-root')
  if (existingRoot) return existingRoot
  const root = document.createElement('div')
  root.setAttribute('id', 'extension-root')
  root.style.height = '100%'

  document.body.appendChild(root)
  document.body.style.margin = '0'
  return root
}

const render = () => {
  const root = getRoot()

  ReactDOM.render(
    <ComponentsProvider>
      <ExtensionProvider2 type={Looker40SDK} loadingComponent={<Loading />}>
        <App />
      </ExtensionProvider2>
    </ComponentsProvider>,
    root
  )
}

window.addEventListener('DOMContentLoaded', async () => {
  render()
})