"use client"

import { LocalType } from "@/types/LocalType";
import { deleteLocal, getEquipmentsByLocal, getQuantity } from "@/app/(principal)/locals/crud";

import { Trash2, ChevronRight } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
  
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { LocalEquipmentType } from "@/types/LocalEquipmentType";
import Image from "next/image";
import Link from "next/link";


export default function CardLocal({ id, local, floor }: LocalType): ReactElement {

    const [checked, setChecked] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [quantity, setQuantity] = useState<number>(0)
    const [equipments, setEquipments] = useState<LocalEquipmentType[] | undefined>(undefined)

    useEffect(() => {
        getQuantityEquipments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = async () => await deleteLocal(id)
    const getQuantityEquipments = async () => {
        try {
            const data = await getQuantity(id)
            setQuantity(data[0].quantity)
            setLoading(false)
        } catch (error) {
            console.error("Error on fetching data: ", error)
        }
    }

    const getEquipments = async () => {
        try {
            const data = await getEquipmentsByLocal(id)
            setEquipments(data)
        } catch (error) {
            console.error("Error on fetching data: ", error)
        }
    }

    return (
        <>
        { loading ?
            <Skeleton className="w-[355px] h-[90px] p-1 rounded-lg" />
            :
            <div className="flex items-center gap-5 p-1 min-w-[220px] rounded-lg border border-zinc-800 bg-zinc-900">
                <Dialog onOpenChange={_ => setChecked(false)}>
                    <DialogTrigger className="w-20 h-20 flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors">
                        <Trash2 size={21} strokeWidth={1.5} opacity={.5} />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle className="text-center font-bold text-xl"> <p className="text-red-500"> ESPERE! </p> Você tem certeza disso? </DialogTitle>
                        <DialogDescription>
                            <p className="my-4"> Se você escolher excluir, <span className="font-bold"> todos os dados relacionados serão excluídos também </span> Recomendamos que revise se realmente quer excluir esse dado </p>
                            <div className="flex items-center gap-2 mb-4">
                                <Checkbox id="confirm" checked={checked} value={checked ? 1 : 0} onClick={() => setChecked(v => !v)}/>
                                <label htmlFor="confirm" className="cursor-pointer select-none"> Confirmo que desejo excluir </label>
                            </div>
                        </DialogDescription>
                        <DialogFooter>
                            <DialogClose className="flex gap-2">
                                <Button variant={"secondary"}> Agora não </Button>
                                <Button disabled={!checked} onClick={handleDelete} variant={"destructive"}> Excluir </Button>
                            </DialogClose>
                        </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
    
                <div>
                    <h1 className="font-bold italic text-xl tracking-wide"> { local } </h1>
                    <p className="text-sm my-1 text-primary font-semibold"> há { quantity } equipamentos aqui </p>

                    { !!floor &&
                        <div className="flex items-center gap-2">
                            <p className="opacity-70 leading-5"> andar: </p>
                            <p className="italic font-bold leading-5"> { floor } </p>
                        </div>
                    }
                </div>

                <Sheet onOpenChange={_ => equipments === undefined && getEquipments()}>
                    <SheetTrigger className="ml-8 w-8 h-20 flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors">
                        <ChevronRight size={21} strokeWidth={1.5} opacity={.5} />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader className="my-12">
                            <SheetTitle className="font-mono text-white text-5xl leading-4"> { local } </SheetTitle>
                            { !!floor && <SheetDescription className="text-lg"> andar { floor } </SheetDescription> }
                        </SheetHeader>

                        { equipments === undefined ?
                            Array(10).fill("").map((_, key: number) => (
                                <Skeleton key={key} className="w-full h-[90px] p-1 rounded-lg mb-3" />
                            ))
                            :
                            equipments.length === 0 ?
                            <p> Não há nenhum equipamento aqui </p>
                            :
                            equipments.map(({ equipment_id, category_name, category_id }: LocalEquipmentType, key: number) => (
                                <div key={key} className="flex items-center gap-3 w-full h-16 mb-3 bg-zinc-900 pl-3 p-1 rounded-lg">
                                    <Image
                                        width={45}
                                        height={45}
                                        alt={category_name}
                                        src={`/assets/categories/${category_id}.png`}
                                        className="invert"
                                    />
                                    <div>
                                        <h1 className="font-mono text-primary text-xl leading-4 tracking-widest"> { equipment_id } </h1>
                                        <p className="text-sm opacity-50"> { category_name } </p>
                                    </div>
                                    <Link href={`/equipments/${equipment_id}`} className="ml-auto w-10 h-full flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors">
                                        <ChevronRight size={19} strokeWidth={1.75} opacity={.5} />
                                    </Link>
                                </div>
                            ))
                        }
                    </SheetContent>
                </Sheet>
            </div>
        }
        </>
    )
}