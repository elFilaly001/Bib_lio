import HomeContent from "@/components/HomeContent";
import NavBar from "../components/Navbar";
import { useState } from "react";
export default function HomePage() {

    const [search , setSearch] = useState('');

    
    return (
        <div>
            <NavBar/>
            <HomeContent/>
        </div>
    );
}