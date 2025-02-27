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

import type { FC, ReactNode } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  DialogContext,
  Icon,
  IconButton,
  Space,
} from '@looker/components'
import { Close, Done } from '@styled-icons/material'
import { Refresh } from '@styled-icons/material-outlined'

export interface HeaderButtonProps {
  needsUpdate: boolean
  update: () => void
}

export const HeaderButtons: FC<HeaderButtonProps> = ({
  needsUpdate,
  update,
}) => {
  const { closeModal } = useContext(DialogContext)

  // Show a check mark after the run button is clicked
  // until the next time it needs to be clicked again
  const [hasClicked, setHasClicked] = useState(false)
  const handleClick = () => {
    setHasClicked(true)
    update()
  }

  useEffect(() => {
    if (needsUpdate) {
      setHasClicked(false)
    }
  }, [needsUpdate])

  let runButton: ReactNode = null
  if (needsUpdate) {
    runButton = (
      <Button
        iconBefore={<Refresh />}
        onClick={handleClick}
        size="small"
        disabled={hasClicked}
      >
        Run
      </Button>
    )
  } else if (hasClicked) {
    runButton = <Icon icon={<Done />} size="small" color="positive" />
  }

  return (
    <Space gap="u2">
      {runButton}
      <IconButton
        label="Close"
        icon={<Close />}
        size="medium"
        onClick={closeModal}
      />
    </Space>
  )
}
