
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Add from './components/Add'
import GetUser from './components/GetUser'
import Update from './components/Update'

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element:<GetUser/>
    }, {
      path: "/add",
      element: <Add/>
    },
    {
      path: "/update/:id",
      element: <Update/>
    }

  ])

  return (
    <>
      <div className='bg-slate-700 h-screen'>
        <RouterProvider router={route}/>
      </div>
    </>
  )
}

export default App
