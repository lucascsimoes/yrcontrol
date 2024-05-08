"use client"

import { useState } from "react";

import { CategoryType } from "@/types/CategoryType";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export default function CardCategory({ id, name, icon }: CategoryType) {
    
    const [loading, setLoading] = useState<boolean>(false)
    console.log(name)
    
    return (
        <>
        { loading ?
            <Skeleton className="w-[355px] h-[90px] p-1 rounded-lg" />
            :
            <div className="flex flex-col items-center gap-5 p-1 min-w-[220px] rounded-lg border border-zinc-800 bg-zinc-900">
                <Image
                    width={64}
                    height={64}
                    alt={name}
                    src={icon}
                    className="invert"
                />
                <p> { name } </p>
            </div>
        }
        </>
    )
}