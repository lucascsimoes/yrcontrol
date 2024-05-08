"use client"

import { LocalInstructionsType } from "@/types/LocalInstructionsType";
import { ReactElement } from "react";
import { Separator } from "./ui/separator";

const styles = {
    icon: {
        prev: "bg-zinc-700",
        current: "bg-primary text-black",
        next: "bg-zinc-900 opacity-50"
    },
    mark: {
        prev: "bg-zinc-700",
        current: "bg-primary",
        next: "bg-transparent"
    }
}

export default function FormInstruction(
    props: LocalInstructionsType & 
    { state: "next" | "prev" | "current" } &
    { onClick: () => void }
): ReactElement {

    const { subtitle, description, icon, state, onClick } = props

    return (
        <button 
            onClick={onClick} 
            disabled={state !== "prev"} 
            className="relative w-full flex flex-col-reverse lg:flex-row items-center justify-end gap-5 lg:py-4 px-5 lg:pl-0 rounded-lg enabled:hover:bg-zinc-900 transition-colors" 
        >
            <div className="lg:text-right text-center hidden lg:block">
                <h2 className="font-semibold text-lg"> { subtitle } </h2>
                <p className="opacity-50 text-sm"> { description } </p>
            </div>
            
            <main className={`relative z-10 min-w-12 h-12 w-0 flex items-center justify-center rounded-full transition-colors ${ styles.icon[state] } bg-primary`}> 
                { icon } 
            </main>

            <aside className={`lg:translate-x-[43px] lg:translate-y-0 translate-y-[43px] flex items-center justify-center absolute lg:top-0 bottom-0 left-0 lg:left-auto right-0 lg:my-auto mx-auto w-min h-min p-[4px] rounded-full border border-zinc-800 bg-zinc-950`}>
                <div className={`w-2.5 h-2.5 rounded-full ${styles.mark[state]}`}></div>
            </aside>
        </button>
    )
}