import React from "react";
import { Badge } from "@/components/ui/badge"

export type SidebarBadgeProps = {
    children: React.ReactNode;
}

function SidebarBadge({ children }: SidebarBadgeProps) {
    return (
        <Badge
            data-slot="badge"
            className="tw:inline-flex tw:items-center tw:justify-center tw:border tw:font-medium tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 [&amp;_svg]:-ms-px [&amp;_svg]:shrink-0 tw:bg-secondary tw:text-secondary-foreground tw:border-transparent tw:rounded-sm tw:px-[0.325rem] tw:h-5 tw:min-w-5 tw:gap-1 tw:text-[0.6875rem] tw:leading-[0.75rem] [&amp;_svg]:size-3 tw:ms-auto tw:me-[-10px]"
        >
            {children}
        </Badge>
    );
}

export default SidebarBadge;