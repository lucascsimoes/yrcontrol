import { ReactElement } from "react";

import Link from "next/link";
import { Bolt, Plus } from "lucide-react";

export default async function Equipments() {

    return (
        <div>
            <header className="flex items-center justify-between gap-3">
                <h1 className="flex-1 text-5xl italic font-mono "> Meus equipamentos </h1>
                <nav className="flex items-center gap-3">
                    <Link className="py-3 px-4 text-zinc-300 bg-zinc-700 font-semibold rounded-lg text-[15px] hover:bg-zinc-700/90 transition-colors" href={"/config/equipments"}> 
                        <Bolt size={22} strokeWidth={1.5} /> 
                    </Link>
                    <Link className="py-3 px-4 bg-primary font-semibold rounded-lg text-[15px] hover:bg-primary/90 transition-colors" href={"/add/equipment"}> 
                        <Plus size={22} strokeWidth={1.75} /> 
                    </Link>
                </nav>
            </header>
        </div>
    )
}