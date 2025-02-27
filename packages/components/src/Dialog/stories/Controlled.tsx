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

import React, { useState } from 'react'
import { Dialog } from '..'
import { DialogMediumContent } from '../../__mocks__/DialogMediumContent'

export const Controlled = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Dialog content={<DialogMediumContent />} isOpen={isOpen} setOpen={setOpen}>
      <button>Open Dialog</button>
    </Dialog>
  )
}

Controlled.parameters = {
  storyshots: { disable: true },
}

export const ControlledNoChildren = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Dialog
        content={<DialogMediumContent />}
        isOpen={isOpen}
        setOpen={setOpen}
      />
      <button onClick={() => setOpen(true)}>Open Dialog</button>
    </>
  )
}

ControlledNoChildren.parameters = {
  storyshots: { disable: true },
}

/**
 * Dialog previously supported a pseudo-controlled state.
 *
 * For the sake of backwards compartibility we need to continue supporting this behavior until we can
 * update downstream consumers to move to using our newer convention
 */
export const ControlledLegacy = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Dialog
        content={<DialogMediumContent />}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
      <button onClick={() => setOpen(true)}>Open Dialog</button>
    </>
  )
}

ControlledLegacy.parameters = {
  storyshots: { disable: true },
}
