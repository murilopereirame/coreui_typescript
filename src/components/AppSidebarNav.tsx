import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

interface INavLinkProps {
  name: React.FC<any> | string
  icon?: React.ReactElement<any, any>
  badge?: {
    color: string
    text: string
  }
}

export interface INavItemProps {
  component: React.FC<any>
  name: string
  badge?: {
    color: string
    text: string
  }
  items?: any[]
  icon?: React.ReactElement<any, any>
  to?: string
  href?: string
}

interface IAppSidebarNavProps {
  items: INavItemProps[]
}

export const AppSidebarNav: React.FC<IAppSidebarNavProps> = ({ items }) => {
  const location = useLocation()
  const navLink = (props: INavLinkProps) => {
    return (
      <>
        {props.icon && props.icon}
        {props.name && props.name}
        {props.badge && (
          <CBadge color={props.badge.color} className="ms-auto">
            {props.badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item: INavItemProps, index: number) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink({ name, icon, badge })}
      </Component>
    )
  }
  const navGroup = (item: INavItemProps, index: number) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink({ name, icon })}
        visible={location.pathname.startsWith(to ? to : '')}
        {...rest}
      >
        {item.items?.map((item: any, index: number) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item: any, index: number) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
    </React.Fragment>
  )
}
