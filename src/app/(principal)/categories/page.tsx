import { Bolt, Plus } from "lucide-react";
import Link from "next/link";
import { getCategory } from "./crud";
import CardCategory from "@/components/CardCategory";
import { Metadata } from "next";
import { CategoryType } from "@/types/CategoryType";

export const metadata: Metadata = {
    title: 'yrControl - Categorias',
}

export default async function Categories() {

    const data = await getCategory()

    return (
        <div>
            <header className="flex items-center justify-between gap-3 mb-20">
                <h1 className="flex-1 text-5xl italic font-mono "> Minhas categorias </h1>
                <nav className="flex items-center gap-3">
                    <Link className="py-3 px-4 text-zinc-300 bg-zinc-700 font-semibold rounded-lg text-[15px] hover:bg-zinc-700/90 transition-colors" href={"/config/categories"}> 
                        <Bolt size={22} strokeWidth={1.5} /> 
                    </Link>
                    <Link className="py-3 px-4 bg-primary font-semibold rounded-lg text-[15px] hover:bg-primary/90 transition-colors" href={"/add-category"}> 
                        <Plus size={22} strokeWidth={1.75} /> 
                    </Link>
                </nav>
            </header>

            <main className="flex items-center gap-10 flex-wrap">
                { !!data.length ?
                    data.map(({ id, name, icon }: CategoryType, key: number) => (
                        <CardCategory
                            key={key}
                            id={id}
                            name={name}
                            icon={icon}
                        />
                    ))
                    :
                    <p> Nenhuma categoria </p>
                }
            </main>
        </div>
        
    )
}