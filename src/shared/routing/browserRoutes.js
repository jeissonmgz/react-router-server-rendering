import { fetchPopularRepos } from '../api'

const routes =  [
  {
    path: '/',
    component: lazy(() => import("../pages/Home")),
  },
  {
    path: '/popular/:id',
    component: lazy(() => import("../pages/Grid")),
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes