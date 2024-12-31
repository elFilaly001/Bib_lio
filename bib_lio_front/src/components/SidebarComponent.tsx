import { Book, HandHelping } from "lucide-react";
import { Link, Outlet, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

// Define the types for menu items and subtasks
interface Subtask {
    title: string;
    url: string;
}

interface MenuItem {
    title: string;
    url: string;
    icon: React.ComponentType;
    subtasks?: Subtask[];
}

// Menu items with subtasks
const items: MenuItem[] = [
    {
        title: "Books",
        url: "#",
        icon: Book,
        subtasks: [
            {
                title: "All Books",
                url: "books/all",
            },
            {
                title: "Add Book",
                url: "books/add",
            },
        ],
    },
    {
        title: "Borrows",
        url: "#",
        icon: HandHelping,
        subtasks: [
            {
                title: "All Borrows",
                url: "borrows/all",
            },
        ],
    },
];

function SidebarComponent() {
    return (
        <div className="max-w-1/5">
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <span>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </span>
                                            </SidebarMenuButton>
                                            {/* Render subtasks if available */}
                                            {item.subtasks && (
                                                <SidebarMenu>
                                                    {item.subtasks.map((subtask) => (
                                                        <SidebarMenuItem key={subtask.title} className="pl-6">
                                                            <SidebarMenuButton asChild>
                                                                <Link to={subtask.url}>
                                                                    <span>{subtask.title}</span>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))}
                                                </SidebarMenu>
                                            )}
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </div>
    );
}

export default SidebarComponent;