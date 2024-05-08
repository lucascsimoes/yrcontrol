"use client"

import React, { ReactElement } from "react";

import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

import { LayoutGrid, Monitor, Package, MapPin, Bolt, Ban } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
    {
        icon: <LayoutGrid size={22} strokeWidth={1.25} />,
        path: '/dashboard',
        available: false
    },
    {
        icon: <Monitor size={22} strokeWidth={1.25} />,
        path: '/equipments',
        available: true
    },
    {
        icon: <Package size={22} strokeWidth={1.25} />,
        path: '/categories',
        available: true
    },
    {
        icon: <MapPin size={22} strokeWidth={1.25} />,
        path: '/locals',
        available: true
    },
    {
        icon: <Bolt size={22} strokeWidth={1.25} />,
        path: '/settings',
        available: false
    }
]

const styles = {
    default: "bg-transparent hover:bg-zinc-800",
    active: "bg-primary/10 text-primary"
}

export default function Sidebar(): ReactElement {

    const pathname = usePathname()

    return (
        <aside className="fixed top-0 left-0 flex flex-col items-center bg-foreground w-20 h-dvh py-6 px-6 z-50">
            <Image
                width={32}
                height={32}
                alt="yrControl Logo"
                src={'/assets/favicon.ico'}
                className="mb-6"
                priority={true}
            />

            <Separator className="mb-6"/>

            <nav className="flex flex-col gap-2">
                { links.map(({ icon, path, available }, key): ReactElement => (
                    <React.Fragment key={key}>
                        { available ? 
                        <Link 
                            key={key}
                            href={path}
                            className={`p-[10px] rounded-lg transition-colors ${ pathname === path ? styles.active : styles.default }`}
                        >
                            { icon }
                        </Link>
                        :
                        <HoverCard openDelay={300}>
                            <HoverCardTrigger className="p-[10px] rounded-lg opacity-30 cursor-no-drop"> { icon } </HoverCardTrigger>
                            <HoverCardContent side="right">
                                <header className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-1">
                                    <Ban size={16} strokeWidth={2} color="#dc2626"/>
                                    <p> Conteúdo indisponível </p>
                                </header>

                                <p className="text-zinc-500 text-sm"> Essa funcionalidade ainda não está disponível. <br/> Espere as próximas atualizações </p>
                            </HoverCardContent>
                        </HoverCard> }
                    </React.Fragment>
                )) }
            </nav>
        </aside>
    )
}