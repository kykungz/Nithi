import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard'
import CarStamp from '../components/CarStamp'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/checkin',
    component: Dashboard
  },
  {
    path: '/carstamp',
    component: CarStamp
  },
]

export default () => (
  <Fragment>
    {routes.map((route, i) => <Route key={i} {...route} />)}
  </Fragment>
)
