import * as React from 'react'
import { IconNames } from '../../../icons/build/IconNames'
import { Box, BoxProps } from '../../Box'
import { Button } from '../../Button'
import { Icon } from '../../Icon'
import { ModalContextProps, withModal } from '../ModalContext'

export interface ModalHeaderProps
  extends ModalContextProps,
    BoxProps<HTMLDivElement> {
  /**
   * Content that will be placed inside the DialogHeader
   * @required
   */
  children: React.ReactNode

  /**
   * Specify an icon to be used for close. Defaults to `Close`
   */
  closeIcon?: IconNames
}

const Internal: React.SFC<ModalHeaderProps> = ({
  children,
  closeModal,
  closeIcon = 'Close' as IconNames,
  ...props
}) => {
  /*
   * @TODO / Note: When chrome supports `flex-basis: fit-content` minHeight can be removed
   */

  return (
    <Box
      alignItems="center"
      display="flex"
      flexBasis="fit-content"
      flexDirection="row"
      is="header"
      minHeight="4.75rem"
      p="large"
      {...props}
    >
      <Box mr="xlarge">{children}</Box>
      <Button
        ml="auto"
        p="none"
        variant="transparent"
        color="neutral"
        onClick={closeModal}
      >
        <Icon name={closeIcon} size="1.25rem" />
      </Button>
    </Box>
  )
}

export const ModalHeader = withModal(Internal)
