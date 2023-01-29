import * as React from 'react'
import routes from './routing/browserRoutes'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import NoMatch from './NoMatch'
import ColorfulBorder from './components/ColorfulBorder'
import './styles.css'
import { Loading } from "./components/Loading";

export default function App({ serverData = null }) {
  return (
    <React.Suspense fallback={<Loading />}>
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
    </React.Suspense>
  )
}