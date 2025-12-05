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
        <div className={`tw:sticky tw:top-0 tw:z-1000 tw:w-full tw:flex tw:flex-row tw:my-auto tw:py-4 tw:lg:px-8 tw:border-b tw:border-border tw:backdrop-blur-sm`}>
            <SidebarTrigger></SidebarTrigger>
            <NavigationMenu viewport={false} className="tw:min-w-full tw:flex tw:justify-start tw:mx-auto tw:px-4 tw:lg:px-6 tw:items-stretch tw:lg:gap-4">

                <NavigationMenuList className="tw:flex tw:flex-row tw:justify-start tw:mx-auto tw:px-4 tw:lg:px-6">

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Astuces</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="tw:grid tw:gap-2 tw:md:w-[400px] tw:lg:w-[500px] tw:lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <span
                                            className="tw:from-muted/50 tw:to-muted tw:flex tw:h-full tw:w-full tw:flex-col tw:justify-end tw:rounded-md tw:bg-linear-to-b tw:p-6 tw:no-underline tw:outline-hidden tw:select-none tw:focus:shadow-md"
                                            onClick={() => navClickHandle('outils-ia')}
                                        >
                                            <div className="tw:mt-4 tw:mb-2 tw:text-lg tw:font-medium">
                                                Outils IA
                                            </div>
                                            <p className="tw:text-muted-foreground tw:text-sm tw:leading-tight">
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
                            <ul className="tw:grid tw:w-[400px] tw:gap-2 tw:md:w-[500px] tw:md:grid-cols-2 tw:lg:w-[600px]">
                                {components.map((component, index) => (
                                    <li key={index}>
                                        <NavigationMenuLink asChild>
                                            <span onClick={() => navClickHandle(component.href)}>
                                                <div className="tw:text-sm tw:leading-none tw:font-medium">{component.title}</div>
                                                <p className="tw:text-muted-foreground tw:line-clamp-2 tw:text-sm tw:leading-snug">
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
                            <ul className="tw:grid tw:w-[300px] tw:gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <span onClick={() => navClickHandle('')}>
                                            <div className="tw:font-medium">Projets en cours</div>
                                            <div className="tw:text-muted-foreground">
                                                Liste des projets en cours sur la page actuelle
                                            </div>
                                        </span>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <span onClick={() => navClickHandle('')}>
                                            <div className="tw:font-medium">A/B Test</div>
                                            <div className="tw:text-muted-foreground">
                                                Liste des AB Test en cours sur la page actuelle
                                            </div>
                                        </span>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <span onClick={() => navClickHandle('')}>
                                            <div className="tw:font-medium">Prestataires</div>
                                            <div className="tw:text-muted-foreground">
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
                    <div className="tw:text-sm tw:leading-none tw:font-medium">{title}</div>
                    <p className="tw:text-muted-foreground tw:line-clamp-2 tw:text-sm tw:leading-snug">
                        {children}
                    </p>
                </span>
            </NavigationMenuLink>
        </li>
    )
}
