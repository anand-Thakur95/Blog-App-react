import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Index from './pages/Index.jsx'
import Layout from './Layout/Layout'
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogByCategory, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteCommentDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUser } from './helpers/RouteName'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/Category/AddCategory'
import CategoryDetails from './pages/Category/CategoryDetails'
import EditCategory from './pages/Category/EditCategory'
import BlogDetails from './pages/Blog/BlogDetails'
import AddBlog from './pages/Blog/AddBlog'
import EditBlog from './pages/Blog/EditBlog'
import SingleBlogDetails from './pages/SingleBlogDetails'
import Comments from './pages/Comments'
import User from './pages/User'
import BlogByCategory from './pages/Blog/BlogByCategory'
import SearchResult from './pages/SearchResult'

import AuthRouteProtechtion from './components/AuthRouteProtection'
import OnlyAdminAllowed from './components/OnlyAdminAllowed'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path = {RouteIndex} element = {<Layout/>} >
    <Route index element={<Index />} ></Route>

  
    //blog 
    <Route path = {RouteBlogDetails()} element = {<SingleBlogDetails />} ></Route>
    <Route path = {RouteBlogByCategory()} element = {<BlogByCategory />} ></Route>
    <Route path = {RouteSearch()} element = {<SearchResult />} ></Route>


//AuthRouteProtechtion
<Route element= {<AuthRouteProtechtion/>}>
<Route path = {RouteProfile} element = {<Profile />} ></Route>
<Route path = {RouteBlog} element = {<BlogDetails />} ></Route>
    <Route path = {RouteBlogAdd} element = {<AddBlog />} ></Route>
    <Route path = {RouteBlogEdit()} element = {<EditBlog />} ></Route>
    <Route path = {RouteCommentDetails} element = {<Comments />} ></Route>
</Route>


//OnlyAdminAllowed
<Route element= {<OnlyAdminAllowed/>}>
<Route path = {RouteAddCategory} element = {<AddCategory />} ></Route>
    <Route path = {RouteCategoryDetails} element = {<CategoryDetails />} ></Route>
    <Route path = {RouteEditCategory()} element = {<EditCategory />} ></Route>
    <Route path = {RouteUser} element = {<User/>} ></Route>
</Route>

//SignIn
    </Route>
    <Route path={RouteSignIn} element={<Signin/>} />
    <Route path={RouteSignUp} element={<SignUp/>} />

   </Routes>
   </BrowserRouter>
  )
}

export default App
