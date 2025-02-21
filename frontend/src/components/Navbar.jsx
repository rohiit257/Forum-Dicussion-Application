"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    (<div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    
    </div>)
  );
}

function Navbar({
  className
}) {
  const [active, setActive] = useState(null);
  return (
    (<div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} href="/" item="Home">
        
        </MenuItem>
       
        <MenuItem setActive={setActive} active={active} item="Chat">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/User">Chatroom</HoveredLink>
        
          </div>
        </MenuItem>
      </Menu>
    </div>)
  );
}
