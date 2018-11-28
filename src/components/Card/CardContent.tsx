import * as React from 'react'
import { Box, BoxProps } from '../Box'

export const CardContent: React.SFC<BoxProps<HTMLDivElement>> = ({
  ...props
}) => (
  <Box p="medium" {...props}>
    {props.children}
  </Box>
)
