import React from "react";
import { Badge } from "@/components/ui/badge"

export type SidebarBadgeProps = {
    children: React.ReactNode;
}

function SidebarBadge({ children }: SidebarBadgeProps) {
    return (
        <Badge
            data-slot="badge"
            className="inline-flex items-center justify-center border font-medium focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 [&amp;_svg]:-ms-px [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground border-transparent rounded-sm px-[0.325rem] h-5 min-w-5 gap-1 text-[0.6875rem] leading-[0.75rem] [&amp;_svg]:size-3 ms-auto me-[-10px]"
        >
            {children}
        </Badge>
    );
}

export default SidebarBadge;