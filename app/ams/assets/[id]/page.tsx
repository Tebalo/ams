import { getRole, getSession } from "@/lib/auth";
import React from "react";

export default async function Page({params}:{params: {id: string}}){
    const id = await params.id;
    const session = await getSession();
    const userRole = await getRole()
    return (
        <main className="h-full">
            <div className="flex flex-row h-full gap-0">

            </div>
       </main>
    );
};