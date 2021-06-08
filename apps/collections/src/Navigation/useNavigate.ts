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
import { useCallback } from 'react'

// copied from react-router-dom/modules/Link.js
function isModifiedEvent(event: React.MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

// extracts useful behavior from React Router's <LinkAnchor /> for
// re-use in custom link components
export default function useNavigate<T extends Element>(
  navigate: () => void,
  {
    onClick,
    target,
  }: {
    onClick?: React.MouseEventHandler<T>
    target?: HTMLAnchorElement['target']
  } = {}
): React.MouseEventHandler<T> {
  return useCallback(
    (event) => {
      try {
        onClick?.(event)
      } catch (ex) {
        event.preventDefault()
        throw ex
      }

      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (target && target !== '_self') return
      if (isModifiedEvent(event)) return

      event.preventDefault()
      navigate()
    },
    [navigate, onClick, target]
  )
}
