import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  
} from "@nextui-org/react";
import HeaderAuth from "./Header-auth";
import SearchInput from "@/app/search-input";
import { Suspense } from "react";
export default  function Header() {
 
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
        <NavbarContent justify="center">
          <NavbarItem>
            <Suspense>
            <SearchInput />
            </Suspense>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
           <HeaderAuth/>
          </NavbarContent>
      </NavbarBrand>
    </Navbar>
  );
}
