import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import Error from './components/Error';
// import RestaurantMenu from './components/RestaurantMenu';
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import Cart from './components/Cart'
import {Provider} from 'react-redux';
import appStore from './redux/store';
// import RestaurantsForSelectedDish from './components/RestaurantsForSelectedDish';

const RestaurantMenu = lazy(()=>import('./components/RestaurantMenu'));
const RestaurantsForSelectedDish = lazy(()=>import('./components/RestaurantsForSelectedDish'));

//===== code optimization and improve performance
// chunking || code splitting || lazy loading || on demand loading || Dynamic Loading || Dynamic import
// --> instaed on importing that file directly we can use React.lazy() method. which is waited to load until u click that page and creates 
//     seperate bundle.js 
// if we use lazy() then we have wrap that component with <Suspense fallback={<>JSX</>}></Suspense> component with a fallback attribute which returns JSX


const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className='app'>
        <Header />
        {/* Outlet component will be replace by path in children key based on route matching */}
        <Outlet />
      </div>
    </Provider>
  )
}


// creating routes for navigating to different pages
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children:[
      {
        path: '/',
        element: <Body/>
      },
      {
        path: '/restaurants/:resId',
        element: <Suspense fallback={<h1>Loading...</h1>}><RestaurantMenu/></Suspense>
      },
      {
        path: '/cart',
        element: <Cart/> 
      },
      {
        path: '/dish/:dishId',
        element: <Suspense fallback={<h1>Loading...</h1>}><RestaurantsForSelectedDish/></Suspense>
      }
    ],
    errorElement:<Error/>
  },
  
]);


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<RouterProvider router={appRouter}/>)