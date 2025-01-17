import Home from '../pages/Home'
import Grid from '../pages/Grid'
import { fetchPopularRepos } from '../api'

const routes =  [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes