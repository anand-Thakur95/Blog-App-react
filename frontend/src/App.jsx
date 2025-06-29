import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Index from './pages/Index.jsx'
import Layout from './Layout/Layout'
import { RouteAddCategory, RouteCategoryDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './helpers/RouteName'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/Category/AddCategory'
import CategoryDetails from './pages/Category/CategoryDetails'
import EditCategory from './pages/Category/EditCategory'


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path = {RouteIndex} element = {<Layout/>} >
    <Route index element={<Index />} ></Route>

    <Route path = {RouteProfile} element = {<Profile />} ></Route>
    <Route path = {RouteAddCategory} element = {<AddCategory />} ></Route>
    <Route path = {RouteCategoryDetails} element = {<CategoryDetails />} ></Route>
    <Route path = {RouteEditCategory()} element = {<EditCategory />} ></Route>


    </Route>
   

    <Route path={RouteSignIn} element={<Signin/>} />
    <Route path={RouteSignUp} element={<SignUp/>} />

   </Routes>
   </BrowserRouter>
  )
}

export default App
