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

import { ExtendedStatefulColor } from '@looker/design-tokens'
import { CSSProperties, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { useMeasuredElement, useCallbackRef } from '../utils'
import { RippleCallbacks } from './types'
import { useRippleState } from './useRippleState'
import { useRippleStateBG } from './useRippleStateBG'

export type UseRippleProps = {
  /**
   * Use for elements where the ripple disappears at the edges of
   * a visible rectangle, e.g. a default Button
   */
  bounded?: boolean
  /**
   * Change the color of the ripple background and foreground
   * @default neutral
   */
  color?: ExtendedStatefulColor
}

export type UseRippleResponse = {
  /**
   * The start and end functions for the background and foreground
   */
  callbacks: RippleCallbacks
  /**
   * The class names used in rippleStyle to trigger the animations
   */
  className: string
  /**
   * ref is only used for bounded ripple, to detect element dimensions
   */
  ref?: (node: HTMLElement | null) => void
  /**
   * style contains CSS variables to control the animation
   */
  style: CSSProperties
}

const getMinMaxDimensions = (width: number, height: number) => {
  const min = Math.min(width, height)
  const max = Math.max(width, height)
  return [min, max]
}

const getRippleScaleRange = (
  min: number,
  max: number,
  bounded?: boolean,
  noScale?: boolean
): [number, number] => {
  // For squares it looks best to start the ripple very small
  const start = 0.1
  if (bounded) {
    // For rectangles it looks better to start at the size of the smaller dimension
    // which is 1 because of how size is calculated
    const startBounded = min === max ? start : 1
    // The ripple needs to spread past all corners, use hypotenuse as the
    // final diameter, and start at 1 to make the animation less jarring
    const end = Math.hypot(min, max) / min

    if (noScale) {
      return [end, end]
    }
    return [startBounded, end]
  }

  if (noScale) {
    return [1, 1]
  }
  // Start small and expand to the full size
  return [start, 1]
}

const getRippleOffset = (min: number, max: number, bounded?: boolean) => {
  if (!bounded || min === max) {
    return '0, 0'
  }
  // If the element is rectangular, adjust the center of the ripple
  // further along the larger dimension
  // NOTE: Currently only works for a horizontal rectangle like a Button
  const offset = max / 2 - min / 2
  return `${offset}px, 0`
}

/**
 * @returns callbacks should be mapped to DOM event handlers (see useRippleHandlers)
 * and remaining props should be passed to an internal element that includes rippleStyle
 */
export const useRipple = ({
  bounded,
  color = 'neutral',
}: UseRippleProps): UseRippleResponse => {
  // ref is actually only used for bounded, when dimensions are needed
  // otherwise ref is wasteful since it triggers a state update & re-render
  const [element, ref] = useCallbackRef()
  const [{ width, height }] = useMeasuredElement(element)
  // Get the theme colors to apply the right value for the color prop
  // brandAnimation toggles the animation
  const {
    colors,
    defaults: { brandAnimation },
  } = useContext(ThemeContext)

  // Get values for animation – bounded uses dimensions, otherwise they're static
  const [min, max] = getMinMaxDimensions(width, height)
  const rippleScaleRange = getRippleScaleRange(
    min,
    max,
    bounded,
    !brandAnimation
  )
  const rippleOffset = getRippleOffset(min, max, bounded)

  // Background (hover, focus) and foreground (press) ripple states
  const { start: startBG, end: endBG, className: bgClass } = useRippleStateBG()
  const { start: startFG, end: endFG, className: fgClass } = useRippleState()
  // bounded needs an explicit size, otherwise just fill the whole area

  // Limitations of style/CSSProperties type
  // https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
  const style = {
    ['--ripple-color' as any]: colors[color],
    ['--ripple-scale-end' as any]: rippleScaleRange[1] || 1,
    ['--ripple-scale-start' as any]: rippleScaleRange[0],
    ['--ripple-size' as any]: bounded ? `${min}px` : '100%',
    ['--ripple-translate' as any]: rippleOffset,
  }

  return {
    // Functions to be called from event handlers
    // Use useRippleHandlers for most common mapping
    callbacks: {
      endBG,
      endFG,
      startBG,
      startFG,
    },
    // Props to be applied to the same element that gets rippleStyle
    className: `${bgClass} ${fgClass}`,
    // bounded needs to get the element size
    ref: bounded ? ref : undefined,
    style,
  }
}