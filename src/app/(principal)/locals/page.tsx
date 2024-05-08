import { Bolt, Plus } from "lucide-react";
import { LocalType } from "@/types/LocalType";
import CardLocal from "@/components/CardLocal";

import { getLocal } from "./crud";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'yrControl - Locais',
}

export default async function Locals() {

    const locals = await getLocal()
    console.log(locals)

    return (
        <div>
            <header className="flex items-center justify-between gap-3 mb-20">
                <h1 className="flex-1 text-5xl italic font-mono "> Meus locais </h1>
                <nav className="flex items-center gap-3">
                    <Link className="py-3 px-4 text-zinc-300 bg-zinc-700 font-semibold rounded-lg text-[15px] hover:bg-zinc-700/90 transition-colors" href={"/config/locals"}> 
                        <Bolt size={22} strokeWidth={1.5} /> 
                    </Link>
                    <Link className="py-3 px-4 bg-primary font-semibold rounded-lg text-[15px] hover:bg-primary/90 transition-colors" href={"/add-local"}> 
                        <Plus size={22} strokeWidth={1.75} /> 
                    </Link>
                </nav>
            </header>

            <main className="flex items-center gap-10 flex-wrap">
                { !!locals.length ?
                    locals.map(({ id, local, floor }: LocalType, key: number) => (
                        <CardLocal
                            key={key}
                            id={id}
                            local={local}
                            floor={floor}
                        />
                    ))
                    :
                    <p> Nenhum local </p>
                }
            </main>
        </div>
    )
}