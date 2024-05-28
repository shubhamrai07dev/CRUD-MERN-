
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

  const myStyle = {
    backgroundImage: "url(https://images.pexels.com/photos/47334/meadow-grass-palm-tree-forest-plenty-of-natural-light-47334.jpeg?auto=compress&cs=tinysrgb&w=400)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: 'fixed',
    backgroundSize: "cover",
    objectFit: "cover",
    backgroundPosition: "center"
  }

  return (
    <>
      <div
        className='h-screen'
        style={myStyle}>
        <RouterProvider router={route}/>
      </div>
    </>
  )
}

export default App
