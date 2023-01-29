import React from 'react'
import { fetchPopularRepos } from '../api'

const routes =  [
  {
    path: '/',
    component: React.lazy(() => import("../pages/Home")),
  },
  {
    path: '/popular/:id',
    component: React.lazy(() => import("../pages/Grid")),
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes