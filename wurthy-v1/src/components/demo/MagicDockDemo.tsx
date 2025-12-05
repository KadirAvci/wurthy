"use client";

import StylishDock from "@/components/ui/magicdock";
import {
    Home as HomeIcon,
    FileText as DocsIcon,
    Download as InstallIcon,
    Code as UsageIcon,
    BookOpen as ApiIcon,
} from "lucide-react";

export default function MagicDockDemo() {

    const dockItems = [
        {
            id: 1,
            icon: <HomeIcon className="text-white" size={24} />,
            label: "Home",
            description: "Go to homepage",
            onClick: () => console.log("Home"),
        },
        {
            id: 2,
            icon: <DocsIcon className="text-white" size={24} />,
            label: "Docs",
            description: "Read documentation",
            onClick: () => console.log("Docs"),
        },
        {
            id: 3,
            icon: <InstallIcon className="text-white" size={24} />,
            label: "Installation",
            description: "Install guide",
            onClick: () => console.log("Installation"),
        },
        {
            id: 4,
            icon: <UsageIcon className="text-white" size={24} />,
            label: "Usage",
            description: "How to use",
            onClick: () => console.log("Usage"),
        },
        {
            id: 5,
            icon: <ApiIcon className="text-white" size={24} />,
            label: "API Reference",
            description: "Browse API",
            onClick: () => console.log("API Reference"),
        },
    ];

    return (
        <StylishDock
            items={dockItems}
            variant="tooltip"
            magnification={70}
            baseItemSize={48}
            distance={150}
            className="tw:flex tw:bottom-0 tw:left-1/2"
        />
    );
}
