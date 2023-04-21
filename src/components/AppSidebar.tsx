import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { IStore } from '../redux/store'
import { EAppActions } from '../redux/app'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state: IStore) => state.app.sidebarUnfoldable)
  const sidebarShow = useSelector((state: IStore) => state.app.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: EAppActions.UPDATE_SIDEBAR, payload: { sidebarShow: visible } })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex">
        <img
          className="sidebar-brand-full"
          src={require('../assets/brand/coreui.png')}
          style={{ padding: 10, width: '50%' }}
        />
        <img
          className="sidebar-brand-narrow"
          src={require('../assets/brand/coreui.png')}
          style={{ padding: 10, width: '100%' }}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({
            type: EAppActions.UPDATE_SIDEBAR,
            payload: { sidebarUnfoldable: !unfoldable },
          })
        }
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
