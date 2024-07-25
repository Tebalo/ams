import { getRole, getSession } from "@/lib/auth";
import NavUtils from "./NavUtils";
import SidebarNav from "./SidebarNav";
import Image from "next/image";
import Coat from '@/public/Code-of-Arms-colour.png'

const DynamicSidebar: React.FC = async () => {
    const session = await getSession();
    // const userRole = await getRole();
    const username = session?.profile?.first_name +' '+ session?.profile?.last_name || 'User'; // Adjust this based on your session structure
    const userRole = session?.auth?.roles[0];
    console.log('USER',session?.auth?.roles[0])
    return (
        <aside id="dynamic-sidebar" className="top-0 left-0 lg:w-52 shadow-xl transition-transform -translate-x-full sm:translate-x-0 hidden md:block" aria-label="Sidebar">
            <div className="h-screen px-0 bg-sky-400 shadow-lg rounded-r-lg flex flex-col">
                <div className="md:rounded-r-lg rounded-b-lg bg-white lg:p-5 md:p-1 lg:w-48 md:w-36">
                    <Logo width={350} height={350} />
                </div>
                <div className="my-10 ml-5 flex-grow">
                    <SidebarNav userRole={userRole} />
                </div>
                <div className="w-full border-t bg-sky-400">
                    <NavUtils username={username} />
                </div>
            </div>
        </aside>
    );
}

interface LogoProps {
    width: number;
    height: number;
}

export const Logo: React.FC<LogoProps> = ({ width, height }) => {
    return (
        <Image
            src={Coat}
            width={width}
            height={height}
            alt="Picture of the coat of arms"
        />
    )
}

export default DynamicSidebar;