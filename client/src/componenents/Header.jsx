import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themslice';
import { signoutSuccess } from '../redux/user/userSlice';



export const Header = () => {
    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const {theme} = useSelector(state => state.theme)
   

    const handleSignout = async(req, res, next) =>{
        try {
           const res = await fetch("/api/user/signout", {
               method: "POST"
           });
           const data = await res.json();
           if(!res.ok){
               console.log(error.message)
           }
           else{
              dispatch(signoutSuccess())
           }
        } catch (error) {
           console.log(error.message);
        }
  }
    
  return (
    <div>
       <Navbar className='border-b-2'>
         <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:-text-xl font-semibold dark:text-white'>
            <span className='px-2 py-2 bg-gradient-to-r from-teal-500 font-semibold  to-lime-500 rounded-lg text-blue-950'>SmartBrains</span>
            Blog
         </Link>
          <form >
            <TextInput type='text' placeholder='seacrh...' rightIcon={AiOutlineSearch} className='hidden lg:inline'/>

          </form>
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch/>
          </Button>
         <div className="flex gap-2 md:order-2">
            <Button className='w-12 h-10 hidden sm:inline ' color='gray' pill onClick={() => dispatch(toggleTheme())}>
               {theme === "light" ? <FaSun/> :  <FaMoon />}
            </Button>
            {currentUser ? (
                <Dropdown arrowIcon={false}
                 inline
                  label={<Avatar alt='user'
                   img={currentUser.profilePicture}
                    rounded
                    />}
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                   
                </Dropdown>
            ) : (
               <Link to={"/sign-in"} >
                <Button gradientDuoTone="tealToLime" outline>Sign in</Button>
             </Link>
            )}
           
            <Navbar.Toggle/>
         </div>
         <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to={"/"}>Home</Link>
                </Navbar.Link>
                <Navbar.Link  active={path === "/about"} as={"div"}>
                    <Link to={"/about"}>About</Link>
                </Navbar.Link>
                <Navbar.Link  active={path === "/projects"} as={"div"}>
                    <Link to={"/projects"}>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
       </Navbar>
    </div>
  )
}