import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navlogo from '@/assets/Images/nav.logo.png'
import { Button } from './ui/button'
import { IoMdLogIn } from "react-icons/io";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile,RouteSignIn } from '@/helpers/RouteName';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar,AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/Images/user.png'
import { FaPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getenv';
import { removeUser } from '@/redux/user/user.slice';
import { useSidebar } from './ui/sidebar';

function Topbar() {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
        method: 'get',
        credentials: 'include',
      })
      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }
      dispatch(removeUser())
      navigate(RouteIndex)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className='flex justify-between items-center h-12 fixed w-full z-20 bg-white px-3 sm:px-5 border-b'>
      {/* Left section with menu and logo */}
      <div className='flex items-center gap-2 sm:gap-4'>
        <button 
          onClick={toggleSidebar} 
          className='p-1.5 hover:bg-gray-100 rounded-md md:hidden'
        >
          <FiMenu size={20} className="text-gray-600"/>
        </button>
        <Link to={RouteIndex}>
        <img 
          src={navlogo} 
          alt="Blog Logo" 
    
          className='h-8 sm:h-10 w-auto sm:block [@media(max-width:320px)]:hidden'
        />
        </Link>
      </div>

      {/* Search section */}
      <div className='hidden sm:block sm:w-[300px] md:w-[400px] lg:w-[500px]'>
        <SearchBox />
      </div>

      {/* Mobile search */}
      <div className='sm:hidden'>
        <div className={`absolute top-14 left-0 w-full p-3 bg-white border-b ${showSearch ? 'block' : 'hidden'}`}>
          <SearchBox />
        </div>
      </div>

      {/* Right section with search toggle and user menu */}
      <div className='flex items-center gap-3 sm:gap-5'>
        <button 
          onClick={toggleSearch}  
          type='button' 
          className='p-1.5 hover:bg-gray-100 rounded-md sm:hidden'
        >
          <FaSearch size={18} className="text-gray-600"/>
        </button>
          
        {!user.isLoggedIn ? (
          <Button asChild className='text-sm sm:text-base'>
            <Link to={RouteSignIn}>
              <FiLogOut className='mr-1.5 sm:mr-2' />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'>
              <Avatar className='w-8 h-8 sm:w-10 sm:h-10'>
                <AvatarImage src={user.user?.avatar || usericon} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>
                <p className='font-medium'>{user.user?.name}</p>
                <p className='text-sm text-gray-500'>{user.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={RouteProfile} className='flex items-center gap-2'>
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={RouteBlogAdd} className='flex items-center gap-2'>
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className='text-red-600 focus:text-red-600 focus:bg-red-50'
              >
                <FiLogOut className='mr-2' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default Topbar
