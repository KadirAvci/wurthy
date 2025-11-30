
import { AppSidebar } from "@/components/features/AppSidebar/AppSidebar";
import {
    SidebarProvider
} from "@/components/animate-ui/components/radix/sidebar"

import logo from '@/assets/images/wurthy_logo.png';
import sadLogo from '@/assets/images/sad_logo2.png';
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { toggle } from "@/components/features/MainPanel/mainPanelSlice";
import { TopNavigation } from "@/components/features/TopNavigation/TopNavigation";

export type ManePanelProps = {
    children: React.ReactNode
}

function MainPanel({ children }: ManePanelProps) {
    const isActive = useAppSelector((state) => state.mainPanel.isActive);
    const dispatch = useAppDispatch();

    return (
        <div id="chatPanelContainer" style={{ position: "relative" }}>
            <button id="togglePanelBtn" onClick={() => dispatch(toggle())} style={{ width: "70px", height: "80px" }}>
                <img src={isActive ? logo : sadLogo} style={{ width: "100%", height: "100%" }} alt="wurthy logo" />
            </button>

            <div id="sidePanel" className={`side-panel ${isActive ? "open" : ""}`}>
                <SidebarProvider>
                    <AppSidebar className={isActive ? "fixed" : "absolute"} />
                    <main className="w-full">
                        <TopNavigation></TopNavigation>
                        {children}
                    </main>
                </SidebarProvider>
            </div>
        </div>
    );
}

export default MainPanel;