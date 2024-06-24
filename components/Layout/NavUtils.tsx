'use client'
import React from "react";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface NavUtilsProps {
    username: string;
}

const NavUtils: React.FC<NavUtilsProps> = ({ username }) => {
    const router = useRouter();

    const handleLogout = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    
        try {
          await logout();
          router.push('/login'); // Redirect to login page after logout
        } catch (error) {
          console.error('Error during logout:', error);
          // Handle logout error (e.g., show an error message to the user)
        }
    };

    const menuItems = [
        { label: "Profile", action: () => router.push('/profile') },
        { label: "Preferences", action: () => router.push('/preferences') },
        { label: "Switch Portal", action: () => console.log("Switch Portal clicked") },
        { label: "About this app", action: () => router.push('/about') },
        { label: "Logout", action: handleLogout },
    ];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full hover:bg-sky-500 px-0">
                    <div className="flex lg:justify-start justify-center md:w-full items-center">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{username ? username[0].toUpperCase() : ''}</AvatarFallback>
                        </Avatar>
                        <span className="flex-1 hidden lg:block ms-1 text-left rtl:text-right lg:text-base text-white font-medium whitespace-nowrap">{username}</span>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60" side='right' align="start">
                <div className="grid gap-2">
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <div 
                                className="flex items-center w-full justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
                                onClick={item.action}
                            >
                                <Label className="font-normal cursor-pointer">{item.label}</Label>
                            </div>
                            {index < menuItems.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default NavUtils;