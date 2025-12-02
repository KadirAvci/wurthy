import Logo from "../Logo/Logo";

import { useAppDispatch } from "@/store/hook";
import { setActivePage } from "@/pages/routerSlice";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { Icons } from "@/components/ui/icons";
import SidebarBadge from "../SidebarBadge/SidebarBadge.tsx";
import { Separator } from "@/components/ui/separator";

export type NavItemProps = {
    title: string,
    url: string,
    isActive?: boolean,
    isProductionReady?: boolean
}

export type SidebarProps = {
    versions: string[],
    navMain: NavItemProps[]
}

// This is sample data.
const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Skeepers / Avis Vérifiés",
            url: "#",
            items: [
                {
                    title: "Récupérer les Avis",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Récupérer les Q/R ",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
            ],
        },
        {
            title: "Cadeaux",
            url: "#",
            items: [
                {
                    title: "Tous les cadeaux",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Par population",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                }
            ],
        },
        {
            title: "Client",
            url: "#",
            items: [
                {
                    title: "Client Actuel",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Population",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                }
            ],
        },
        {
            title: "Produit",
            url: "#",
            items: [
                {
                    title: "Actuel",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Cadeaux par population",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                }
            ],
        },
        {
            title: "Page",
            url: "#",
            items: [
                {
                    title: "Actuel",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Projets présent sur la page",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Favoris",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Types de pages",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Rechercher",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                }
            ],
        },
        {
            title: "Jeux",
            url: "#",
            items: [
                {
                    title: "Snake",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Tetris",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Mémoire",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Skull King",
                    url: "#",
                    isActive: false,
                    isProductionReady: false
                },
                {
                    title: "Tous voir",
                    url: "games",
                    isActive: false,
                    isProductionReady: false
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const dispatch = useAppDispatch();
    const navClickHandle = (pageId: string) => {
        dispatch(setActivePage(pageId))
    }

    return (
        <div className="relative">
            <Sidebar {...props}>
                <SidebarHeader>
                    <div onClick={() => navClickHandle('dashboard')}>
                        <Logo />
                    </div>
                </SidebarHeader>
                <SidebarContent className={"scroll-auto"} style={{ scrollbarWidth: "none" }}>
                    <Collapsible defaultOpen className={"group/collapsible"}>
                        <SidebarGroup>
                            <SidebarGroupLabel>Eshop</SidebarGroupLabel>
                            <SidebarGroupLabel asChild className={"group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"}>
                                <CollapsibleTrigger>
                                    Outils
                                    <Icons.chevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent className={'pl-6'}>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={() => navClickHandle('settings')}>
                                                Hide chat
                                                <SidebarBadge>Soon</SidebarBadge>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={() => navClickHandle('hack-gpt')}>
                                                Hack GPT
                                                <SidebarBadge>Soon</SidebarBadge>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={() => navClickHandle('excel-transformer')}>
                                                Excel Transformer
                                                <SidebarBadge>Soon</SidebarBadge>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={() => navClickHandle('arborescence-categories')}>
                                                Arbo Catégories
                                                <SidebarBadge>Soon</SidebarBadge>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>

                    {/* We create a SidebarGroup for each parent. */}
                    {data.navMain.map((item) => (
                        <>
                            <Separator />
                            <SidebarGroup key={item.title}>
                                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton isActive={item.isActive} onClick={() => dispatch(setActivePage(item.url))}>

                                                    {item.title}
                                                    {!item.isProductionReady &&
                                                        <SidebarBadge>Soon</SidebarBadge>
                                                    }

                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </>

                    ))}

                </SidebarContent>
            </Sidebar>
        </div>
    )
}
