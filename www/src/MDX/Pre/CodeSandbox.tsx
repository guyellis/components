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

import { Icon, IconButton, Tooltip } from '@looker/components'
import { Assignment, Warning } from '@styled-icons/material'
import { ExpandLess, ExpandMore } from '@styled-icons/material-rounded'
import type { PrismTheme, Language } from 'prism-react-renderer'
import type { FC, ReactNode } from 'react'
import React, { useState, useCallback } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  withLive,
} from 'react-live'
import styled from 'styled-components'
import { allComponents } from './allComponents'
import { prismTheme } from './prismTheme'

interface CodeSandboxProps {
  code: string
  language: Language
  editorVisible?: boolean
}

const transformCode = (code: string) => {
  if (code.startsWith(';')) {
    // Workaround for annoying issue where prettier likes to inject a leading semicolon
    return code.replace(/(^;)/g, '')
  } else if (code.startsWith('()') || code.startsWith('class')) {
    return code
  } else {
    return `<>${code}</>`
  }
}

export const CodeSandbox = ({
  code,
  language,
  editorVisible = true,
}: CodeSandboxProps) => {
  const [showEditor, setShowEditor] = useState(editorVisible)
  const toggleEditorView = () => {
    setShowEditor(!showEditor)
  }

  const liveEditorRef = useCallback(
    (node: HTMLDivElement) => {
      if (showEditor && node) {
        const liveEditorInput = node.querySelector('textarea')
        if (liveEditorInput) {
          liveEditorInput.tabIndex = -1
        }
      }
    },
    [showEditor]
  )

  return (
    <SandboxWrapper>
      <LiveProvider
        scope={allComponents}
        theme={prismTheme}
        code={code}
        language={language}
        transformCode={code => transformCode(code)}
      >
        <LivePreviewWrapper>
          <LiveConsumer>
            {(error?: string) => (
              <>
                {!!error || (
                  <PreviewWrapper>
                    <LivePreview />
                  </PreviewWrapper>
                )}
                {!!error && (
                  <ErrorWrapper>
                    <div>
                      <IconWrapper>
                        <Icon icon={<Warning />} size={24} />
                      </IconWrapper>
                    </div>
                    <LiveError />
                  </ErrorWrapper>
                )}
              </>
            )}
          </LiveConsumer>
        </LivePreviewWrapper>
        <EditorWrapper ref={liveEditorRef}>
          {showEditor && <LiveEditor />}
          <ActionLayout editorIsVisible={showEditor}>
            <ToggleCodeButton
              onClick={toggleEditorView}
              editorIsVisible={showEditor}
            />
            {showEditor && (
              <CopyButton code={code} editorIsVisible={showEditor} />
            )}
          </ActionLayout>
        </EditorWrapper>
      </LiveProvider>
    </SandboxWrapper>
  )
}

interface LiveProps {
  code: string
  disabled: boolean
  error?: string
  language: string
  theme: PrismTheme
  onChange: () => void
  onError: () => void
}

interface WithLiveProps {
  children: (error?: string) => ReactNode
  live?: LiveProps
}

const LivePreviewWrapper = styled.div`
  position: relative;
`

export const LiveConsumer = withLive<WithLiveProps>(({ children, live }) => {
  return <>{children((live as LiveProps).error)}</>
})

interface ActionProps {
  editorIsVisible: boolean
}

interface CopyButtonProps extends ActionProps {
  code: string
}

export const CopyButton: FC<CopyButtonProps> = ({ code, editorIsVisible }) => {
  return (
    <Tooltip content="Copy sample code" placement="left">
      {tooltipProps => (
        <CopyToClipboard
          text={code}
          onCopy={() => alert(`Sample code copied to clipboard.`)}
        >
          <ActionButton
            {...tooltipProps}
            label="Copy"
            icon={<Assignment />}
            size="xsmall"
            editorIsVisible={editorIsVisible}
            mt="small"
          />
        </CopyToClipboard>
      )}
    </Tooltip>
  )
}

interface ToggleButtonProps extends ActionProps {
  onClick: () => void
}

export const ToggleCodeButton: FC<ToggleButtonProps> = ({
  editorIsVisible,
  onClick,
}) => {
  const toggleIcon = editorIsVisible ? <ExpandLess /> : <ExpandMore />
  const toggleLabel = editorIsVisible ? 'Hide code editor' : 'Show code editor'
  return (
    <Tooltip content={toggleLabel} placement="left">
      <ActionButton
        editorIsVisible={editorIsVisible}
        onClick={onClick}
        label={toggleLabel}
        icon={toggleIcon}
        size="xsmall"
      />
    </Tooltip>
  )
}

const ActionButton = styled(IconButton)<ActionProps>`
  color: ${({ theme, editorIsVisible }) =>
    editorIsVisible ? theme.colors.text1 : theme.colors.text2};
`

const ActionLayout = styled.div<ActionProps>`
  background: ${({ theme, editorIsVisible }) =>
    editorIsVisible ? theme.colors.ui5 : theme.colors.ui2};
  display: grid;
  grid-template-rows: auto auto 1fr;
  justify-content: right;
  padding: ${({ theme }) => `${theme.space.u2}`};
  transition: background 350ms;
  width: auto;
`

const SandboxWrapper = styled.div`
  overflow: hidden;
  ${({ theme: { lineHeights, colors, radii } }) => `
    margin-bottom: ${lineHeights.medium};
    border: 1px solid ${colors.ui2};
    border-radius: ${radii.medium};
    color: ${colors.background};
  `}
`

const PreviewWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space.u3};
`

const EditorWrapper = styled.div`
  background: ${({ theme }) => theme.colors.ui5};
  display: grid;
  grid-template-columns: 1fr auto;
  line-height: ${({ theme }) => theme.lineHeights.medium};
  textarea,
  pre {
    ${({ theme: { space } }) => `
      padding: ${space.u3} !important;
    `}
  }
`

const ErrorWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  ${({ theme: { colors, space } }) => `
    grid-column-gap: ${space.u3};
    color: ${colors.criticalInteractive};
    padding: ${space.u3};
    background: ${colors.criticalAccent};
  `}
  pre {
    margin: 0;
  }
`

const IconWrapper = styled.div`
  align-content: center;
  background: ${({ theme }) => theme.colors.critical};
  border-radius: 100%;
  color: ${({ theme }) => theme.colors.inverseOn};
  display: grid;
  height: 45px;
  justify-content: center;
  width: 45px;

  svg {
    transform: translateY(-2px);
  }
`
