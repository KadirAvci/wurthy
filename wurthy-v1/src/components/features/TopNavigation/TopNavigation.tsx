"use client"

import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/features/ModeToggle/ModeToggle"

import { useAppDispatch } from "@/store/hook";
import { setActivePage } from "@/pages/routerSlice";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Membres E-Business",
        href: "membres",
        description:
            "Retrouver tous les membres de l'équipe par pôle",
    },
    {
        title: "Les personnalités",
        href: "personalities",
        description:
            "Voir la personnalités des membres de l'équipe pour mieux coopérer",
    },
    {
        title: "Wall of Fame",
        href: "wall-of-fame",
        description:
            "Les petits Anges nous ont quitté mais on ne les oubliera pas !",
    },
    {
        title: "Stater packs",
        href: "starter-pack",
        description: "Les starters pack pour mieux choisir les cadeaux de Noel",
    },
    {
        title: "Process",
        href: "process",
        description:
            "Trouver qui fait quoi dans chaque équipe",
    },
    {
        title: "A qui s'adresser",
        href: "who",
        description:
            "Si vous ne s'avez pas à qui vous adressez pour effectuer une modification, avoir des infos",
    },
]

export function TopNavigation() {
    const dispatch = useAppDispatch();
    const navClickHandle = (pageId: string) => { dispatch(setActivePage(pageId)) }

    return (
        <div className={`sticky top-0 z-1000 w-full flex flex-row my-auto py-4 lg:px-8 border-b border-border backdrop-blur-sm`}>
            <SidebarTrigger></SidebarTrigger>
            <NavigationMenu viewport={false} className="min-w-full flex justify-start mx-auto px-4 lg:px-6 items-stretch lg:gap-4">

                <NavigationMenuList>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Astuces</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <span
                                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                            onClick={() => navClickHandle('outils-ia')}
                                        >
                                            <div className="mt-4 mb-2 text-lg font-medium">
                                                Outils IA
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-tight">
                                                Trouver une liste non exhaustive d'outils IA qui peuvent vous aider au quotidien
                                            </p>
                                        </span>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="astuces-pc" title="Window">
                                    Astuces pour améliorer votre utilisation de window (exp: press papier)
                                </ListItem>
                                <ListItem href="astuces-navigateur" title="Navigateur">
                                    Tips pour les navigateurs pour vous aider à mieux chercher et vous organiser
                                </ListItem>
                                <ListItem href="astuces" title="Tous voir">
                                    Retrouver tous les tips qui vous permettrons de gagner en productivités
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Team</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {components.map((component, index) => (
                                    <li key={index}>
                                        <NavigationMenuLink asChild>
                                            <span onClick={() => navClickHandle(component.href)}>
                                                <div className="text-sm leading-none font-medium">{component.title}</div>
                                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                    {component.description}
                                                </p>
                                            </span>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <span onClick={() => navClickHandle('projets-eshop')}>Projets Eshop</span>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <span onClick={() => navClickHandle('docs')}>Docs</span>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Page actuelle</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[300px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <span onClick={() => navClickHandle('')}>
                                            <div className="font-medium">Projets en cours</div>
                                            <div className="text-muted-foreground">
                                                Liste des projets en cours sur la page actuelle
                                            </div>
                                        </span>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <span onClick={() => navClickHandle('')}>
                                            <div className="font-medium">A/B Test</div>
                                            <div className="text-muted-foreground">
                                                Liste des AB Test en cours sur la page actuelle
                                            </div>
                                        </span>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <span onClick={() => navClickHandle('')}>
                                            <div className="font-medium">Prestataires</div>
                                            <div className="text-muted-foreground">
                                                Liste des fonctionnalités des prestataires en cours sur la page actuelle
                                            </div>
                                        </span>
                                    </NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <ModeToggle></ModeToggle>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {

    const dispatch = useAppDispatch();
    const navClickHandle = (pageId: string) => {
        dispatch(setActivePage(pageId))
    }
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <span onClick={() => navClickHandle(href)}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </span>
            </NavigationMenuLink>
        </li>
    )
}
