'use client'
import { isLoggedIn } from "@/services/auth.service";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu,NavbarMenuItem} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from 'next/link';
import TeacherJoining from "../ui/teacher-joining";
const NavbarPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
      "Home"
    ];
    const userLogin=isLoggedIn()
    const router=useRouter()
    const handleLogOut=()=>{
      localStorage.removeItem('access')
      router.push('/login')
    }
    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">Softmax Online School</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
        {
              userLogin?<>
               <Link  href={'/profile'}>
             Dashboard
            </Link>
              </>:''
            }
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
       {
        userLogin?<>
          <Button className="text-white" color="primary" variant="shadow" onClick={handleLogOut}   >
            Logout
          </Button>
        </>:<>
         <NavbarItem className="hidden lg:flex">
         <Button  color="primary" variant="shadow" className="text-white"><Link href="/login">Login</Link></Button>
          
        </NavbarItem>
        <NavbarItem>
          <Button className="text-white" as={Link} color="primary"  href="/signup" variant="shadow">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <TeacherJoining/>
        </NavbarItem>
        </>
       }
      </NavbarContent>
      <NavbarMenu>
        
       
          <NavbarMenuItem >
          <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
          <NavbarItem>
          {
              userLogin?<>
               <Link  href={'/profile'}>
             Dashboard
            </Link>
              </>:''
            }
          
        </NavbarItem>
           
            
           
          </NavbarMenuItem>
       
      </NavbarMenu>
    </Navbar> 
        </>
    );
};

export default NavbarPage;