'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCogs, FaComments, FaCube, FaFileAlt, FaFolder, FaHome, FaLayerGroup, FaUser, FaUsers } from 'react-icons/fa';
import { GrDashboard } from "react-icons/gr";

interface SideBarItem { 
    path: string;
    icon: React.ReactElement;
    title: string;
    roles: string[];
}

interface SidebarProps {
    userRole: string;
    activeLinkColor?: string;
    inactiveLinkColor?: string;
}
const staffRoles = ['admin', 'manager', 'finance_officer', 'record_officer'];

const sidebarItems: SideBarItem[] = [
    { 
        path: '/ams/dashboard', 
        icon: <FaHome style={{ fontSize: '1.5rem', color: '#FFFFFF' }} />, 
        title: 'Home',
        roles: ['*']  // Visible to all roles
    },
    { 
        path: '/ams/cases', 
        icon: <FaFolder style={{ fontSize: '1.5rem', color: '#FFFFFF' }} />, 
        title: 'Cases',
        roles: staffRoles
    },
    { 
        path: '/ams/reports', 
        icon: <FaFileAlt style={{ fontSize: '1.5rem', color: '#FFFFFF' }} />, 
        title: 'Reports',
        roles: staffRoles
    },
    { 
        path: '/ams/users', 
        icon: <FaUsers style={{ fontSize: '1.5rem', color: '#FFFFFF' }} />, 
        title: 'Users',
        roles: ['ADMIN', 'admin']
    },
    { 
        path: '/ams/settings', 
        icon: <FaCogs style={{ fontSize: '1.5rem', color: '#FFFFFF' }} />, 
        title: 'Settings',
        roles: ['ADMIN', 'admin']
    }
];

const SidebarNav: React.FC<SidebarProps> = ({ userRole }) => {
    const currentPath = usePathname();

    const isActiveLink = (path: string) => currentPath === path;

    const canAccessLink = (item: SideBarItem) => {
        return item.roles.includes('*') || item.roles.includes(userRole);
    };

    return (
        <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, index) => (
                canAccessLink(item) && (
                    <li key={index} className="flex space-x-2">
                        <div className={`${isActiveLink(item.path) ? 'bg-sky-200 w-2 md:h-18 lg:h-12 my-1 rounded-lg' : ''}`}></div>
                        <Link
                            href={item.path}
                            className={`flex items-center w-full px-2 py-2 rounded-lg justify-start space-x-2 ${
                                isActiveLink(item.path) ? 'bg-sky-300' : 'text-gray-100'
                            }`}
                        >
                            {item.icon}
                            <div className="flex justify-center">
                                <span className="text-gray-100 text-xs lg:text-base lg:font-semibold">
                                    {item.title}
                                </span>
                            </div>
                        </Link>
                    </li>
                )
            ))}
        </ul>
    );
}

export default SidebarNav;