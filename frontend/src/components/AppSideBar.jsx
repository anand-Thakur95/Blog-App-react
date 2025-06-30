import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import navlogo from '@/assets/Images/nav.logo.png'
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { LiaComments } from "react-icons/lia";
import { FaUserCircle } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getenv";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";


function AppSideBar() {
const  user = useSelector(state => state.user);
  const {data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`,{
    method: 'get',
    Credential: 'include',

})

  return (
    <Sidebar>
    <SidebarHeader className= "bg-white">
      <img src={navlogo} width={180} alt="nav logo" />
    </SidebarHeader>
    <SidebarContent className= "bg-white">
      <SidebarGroup>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                <IoHomeOutline />
                  <Link to= {RouteIndex}>Home</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
{user && user.isLoggedIn 
?
<>
<SidebarMenuItem>
<SidebarMenuButton>
<ImBlog />
  <Link to= {RouteBlog}>Blogs</Link>
</SidebarMenuButton>
</SidebarMenuItem>

<SidebarMenuItem>
<SidebarMenuButton>
<LiaComments />
  <Link to= {RouteCommentDetails}>Comments</Link>

</SidebarMenuButton>
</SidebarMenuItem>
</>
:
<></>
}

{user && user.isLoggedIn && user.user?.role === "admin" ?
<>
  <SidebarMenuItem>
                <SidebarMenuButton>
                <BiCategoryAlt />
                  <Link to= {RouteCategoryDetails}>Categories</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

        
            <SidebarMenuItem>
                <SidebarMenuButton>
                <FaUserCircle />
                  <Link to= {RouteUser}>Users</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </>
            :
            <></>
}
           
        </SidebarMenu>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>
            Categories
        </SidebarGroupLabel>
        <SidebarMenu>
          {categoryData && categoryData.category.length > 0 && categoryData.category.map(category => <SidebarMenuItem key={category._id}><SidebarMenuButton>
            <FaRegDotCircle />
            <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
            </SidebarMenuButton></SidebarMenuItem>)}
            
          
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    
  </Sidebar>
  )
}

export default AppSideBar
