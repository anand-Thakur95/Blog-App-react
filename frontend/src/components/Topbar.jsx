import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navlogo from '@/assets/Images/nav.logo.png'
import { Button } from './ui/button'
import { IoMdLogIn } from "react-icons/io";
import SearchBox from './SearchBox';
import { RouteIndex, RouteProfile,RouteSignIn } from '@/helpers/RouteName';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar,AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/Images/user.png'
import { FaPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { FaRegUser } from "react-icons/fa6";

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


function Topbar() {

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

  return (
    <div className='flex justify-between items-center h-14 fixed w-full z-20 bg-white px-5 border-b'>
        <div >
            <img src={navlogo} width={180} alt="" />
        </div>
        <div className='w-[500px]'>
            <SearchBox/>
        </div>
        <div>

         
        {!user.isLoggedIn ?
                    <Button asChild >
                        <Link to={RouteSignIn}  >
                            <FiLogOut />
                            Sign In
                        </Link>
                    </Button>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                            <AvatarImage src={user.user.avatar || usericon} />
                                {/* Debugging line to check the avatar URL  */}
                                {/* console.log('User Avatar:', user.user.avatar); */}
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <p>{user.user.name}</p>
                                <p className='text-sm'>{user.user.email}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
    <DropdownMenuItem asChild>
      
      <Link to={RouteProfile}><FaRegUser />
      Profile
      </Link>
    </DropdownMenuItem>

    <DropdownMenuItem asChild>
      
      <Link to= "">
      <FaPlus />Create Blog
      </Link>
    </DropdownMenuItem>

<DropdownMenuSeparator />


    <DropdownMenuItem onClick ={handleLogout}>
      <FiLogOut color='red' />
      Logout
    </DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>

          }
        </div>
     
    </div>
  )
}

export default Topbar
