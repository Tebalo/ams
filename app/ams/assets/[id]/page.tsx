import { getRole, getSession } from "@/lib/auth";


export default async function Page({params}:{params: {slug: string}}){
    const id = await params.slug;
    const session = await getSession();
    const userRole = await getRole()
    return (
        <main className="h-full">
            <div className="flex flex-row h-full gap-0">

            </div>
       </main>
    );
};