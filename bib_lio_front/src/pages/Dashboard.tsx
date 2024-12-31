import SidebarComponent from "@/components/SidebarComponent";
import { Outlet } from "react-router-dom";


export default function Dashboard() {
    return (
        <>
        <div className="flex">
            <SidebarComponent/>
            <Outlet/>
        </div>
        </>
    )
}