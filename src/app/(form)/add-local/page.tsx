"use client"

import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send, MapPin, Layers, BadgeCheck, TriangleAlert } from "lucide-react";

import { LocalInstructionsType } from "@/types/LocalInstructionsType";
import FormInstruction from "@/components/FormInstruction";
import { createLocal } from "@/app/(principal)/locals/crud";
import { revalidateLocals } from "@/lib/actions";

const stepData = [
    {
        title: "Qual é o local que você quer adicionar?",
        subtitle: "Informar local",
        description: "Informe o local a adicionar",
        icon: <MapPin />,
    },
    {
        title: "Agora, qual é o andar respectivo? (opcional)",
        subtitle: "Informar andar",
        description: "Informe o respectivo andar",
        icon: <Layers />
    },
    {
        title: "Para finalizar, confirme as informações antes de enviar",
        subtitle: "Confirmar informações",
        description: "Revise as informações",
        icon: <BadgeCheck />
    }
];

export default function AddLocal(): ReactElement {

    const ref = useRef(null)

    const [localValue, setLocalValue] = useState<string>("")
    const [floorValue, setFloorValue] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const [step, setStep] = useState<number>(0)
    const handleStep = (type: string | number) => {
        if (typeof type === "number") {
            setStep(type)
        } else {
            if (type === "prev") {
                setStep(v => v - 1)
            } else {
                setStep(v => v + 1)
            }
        }
    }
    
    const handleSubmit = (e: FormEvent) => {   
        step < 2 ? console.log("submit") : e.preventDefault()
        // createLocal({ local: localValue, floor: floorValue === "" ? null : Number(floorValue) })
        
        // router.back()
    } 

    const checkNext = () => {
        if (step === 0) localValue !== "" ? handleStep("next") : setError("Informe um local para continuar");
        if (step === 1) floorValue === "" ? handleStep("next") : Number(floorValue) ? handleStep("next") : setError("Informe apenas números");
        // if (step === 2) handleSubmit();
    }

    useEffect(() => {
        setError(null)
    }, [step])

    return (
        <div className="h-full">
            <header className="border-b border-zinc-800 py-16">
                <h1 className="font-bold text-2xl"> Formulário para adicionar um local </h1>
                <p className="opacity-70"> Siga os 3 passos para adicionar </p>
            </header>
            <form onSubmit={handleSubmit} action={() => console.log("action")} className="h-full border-b border-zinc-800 lg:flex">
                <aside className="sticky top-0 lg:static bg-zinc-950 z-40 flex lg:flex-col justify-center gap-6 lg:w-2/5 lg:border-r border-b border-zinc-800 p-8 lg:pl-0">
                    { stepData.map((item: LocalInstructionsType, key: number) => (
                        <FormInstruction
                            onClick={() => handleStep(key)}
                            key={key}
                            { ...item }
                            state={step < key ? "next" : step > key ? "prev" : "current"}
                        />
                    )) }
                </aside>
                <main className="w-full py-12 lg:pr-0 lg:p-12">
                    <header className="pb-1 border-b">
                        <p className="opacity-70 mb-2"> Passo { step + 1 }/{ stepData.length } </p>
                        <h1 className="font-mono text-5xl"> { stepData[step].title } </h1>

                        <div className={`flex items-center gap-2 h-7 my-1 text-red-500 ${error ? "visible" : "invisible"}`}>
                            <TriangleAlert size={20} strokeWidth={1.5}/>
                            <p> { error } </p>
                        </div>
                    </header>
                    <section className="mt-8 mb-16">
                        { step === 0 ?
                            <Input 
                                placeholder={stepData[step].description} 
                                required
                                className="h-28 sm:text-4xl text-xl sm:px-12 px-6 placeholder:text-xl"
                                value={localValue}
                                onChange={e => setLocalValue(e.target.value)}
                            />
                            : step === 1 ?
                            <Input 
                                placeholder={stepData[step].description} 
                                required
                                className="h-28 sm:text-4xl text-xl sm:px-12 px-6 placeholder:text-xl"
                                value={floorValue}
                                onChange={e => setFloorValue(e.target.value)}
                            />
                            :
                            <section className="flex flex-col gap-4">
                                <div>
                                    <p className="text-primary font-semibold"> Local: </p>
                                    <h1 className="font-mono text-4xl"> { localValue } </h1>
                                </div>
                                <div>
                                    <p className="text-primary font-semibold"> Andar: </p>
                                    <h1 className="font-mono text-4xl"> { floorValue ? floorValue : "Indefinido" } </h1>
                                </div>
                            </section>
                        }
                    </section>
                    <footer className="flex items-center justify-end gap-3">
                        <Button disabled={step === 0} onClick={() => handleStep("prev")} className="w-16 h-24" variant={"ghost"}>
                            <ChevronLeft />
                        </Button>
                        <Button onClick={checkNext} className="w-16 h-24">
                            { step === 2 ? <Send/> : <ChevronRight /> }
                        </Button>
                    </footer>
                </main>
            </form>
        </div>
    )
}