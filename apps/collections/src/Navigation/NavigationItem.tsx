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

import { ListItem, ListItemProps } from '@looker/components'
import React, { FC } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import useNavigate from './useNavigate'

const ACTIVE_CLASS_NAME = 'active'

const Navigable: FC<ListItemProps & { navigate(): void }> = ({
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

type NavigationItemProps = ListItemProps & NavLinkProps

export const NavigationItem: FC<NavigationItemProps> = ({ to, ...props }) => (
  <NavLink
    activeClassName={ACTIVE_CLASS_NAME}
    to={to}
    component={Navigable}
    {...props}
  />
)
