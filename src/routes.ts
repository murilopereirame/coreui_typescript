import React, { LazyExoticComponent } from 'react'

//Dashboards
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

export interface IRoute {
  path: string
  exact?: boolean
  name: string
  element?: LazyExoticComponent<() => React.ReactElement<any, any>>
}

const routes: IRoute[] = [{ path: '/', exact: true, name: 'Home' }]

export default routes
