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

import {
  NavList,
  ListItem,
  Aside,
  ListItemProps,
  IconType,
} from '@looker/components'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { SupportedCollections } from '../supportedCollections'
import useNavigate from './useNavigate'

const ACTIVE_CLASS_NAME = 'active'

export const Navigation: FC<{ collections: SupportedCollections }> = ({
  collections,
}) => {
  const items = collections.map(({ title, icon }, i) => (
    <NavigationItem key={i} to={title.toLowerCase()} icon={icon}>
      {title}
    </NavigationItem>
  ))

  return (
    <Aside py="medium" width="navigation">
      <NavList>{items}</NavList>
    </Aside>
  )
}

const Defaults: FC<ListItemProps & { navigate(): void }> = ({
  navigate,
  onClick: propsOnClick,
  ...props
}) => {
  const onClick = useNavigate(navigate, {
    onClick: propsOnClick,
    target: props.target,
  })

  return (
    <ListItem
      itemRole="link"
      selected={props.className?.split(' ').includes(ACTIVE_CLASS_NAME)}
      truncate
      onClick={onClick}
      {...props}
    />
  )
}

const NavigationItem: FC<{ to: string; icon?: IconType }> = ({
  to,
  ...props
}) => {
  const NavigableWithProps = React.useCallback(
    (linkProps) => <Defaults {...linkProps} />,
    Object.values(props) // shallow equality check
  )

  return (
    <NavLink
      activeClassName={ACTIVE_CLASS_NAME}
      exact
      to={to}
      component={NavigableWithProps}
      {...props}
    />
  )
}
