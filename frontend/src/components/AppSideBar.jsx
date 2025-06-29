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
import { RouteCategoryDetails } from "@/helpers/RouteName";


function AppSideBar() {
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
                  <Link to= "">Home</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <SidebarMenuButton>
                <BiCategoryAlt />
                  <Link to= {RouteCategoryDetails}>Categories</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <SidebarMenuButton>
                <ImBlog />
                  <Link to= "">Blogs</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <SidebarMenuButton>
                <LiaComments />
                  <Link to= "">Comments</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
                <SidebarMenuButton>
                <FaUserCircle />
                  <Link to= "">Users</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>

        </SidebarMenu>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>
            Categories
        </SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                <FaRegDotCircle />
                  <Link to= "">Category items</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
  
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    
  </Sidebar>
  )
}

export default AppSideBar
