import * as React from 'react'
import routes from './routing/serverRoutes'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import NoMatch from './NoMatch'
import ColorfulBorder from './components/ColorfulBorder'
import './styles.css'

export default function App({ serverData = null, isSSR = false }) {
  console.log("SSR", isSSR)
  return (
    <React.Fragment>
      <ColorfulBorder />
      <div className='container'>
        <Navbar />

        <Routes>
          {routes.map(({ path, fetchInitialData, component: C }) => (
            <Route
              key={path}
              path={path}
              element={<C data={serverData} fetchInitialData={fetchInitialData} />}
            />
          ))}
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
    </React.Fragment>
  )
}