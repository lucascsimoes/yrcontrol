"use client"

import { ChangeEvent, ReactElement, useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send, Box, Image as Icon, BadgeCheck, TriangleAlert, Plus, CircleAlert } from "lucide-react";

import { LocalInstructionsType } from "@/types/LocalInstructionsType";
import FormInstruction from "@/components/FormInstruction";
import Link from "next/link";

import { createCategory } from "@/app/(principal)/categories/crud";


const stepData = [
    {
        title: "Qual é a categoria que quer adicionar?",
        subtitle: "Informar categoria",
        description: "Informe a categoria a adicionar",
        icon: <Box />,
    },
    {
        title: "Adicione um ícone correspondente à categoria",
        subtitle: "Adicionar ícone",
        description: "Adicione um ícone respectivo",
        icon: <Icon />
    },
    {
        title: "Para finalizar, confirme as informações antes de enviar",
        subtitle: "Confirmar informações",
        description: "Revise as informações",
        icon: <BadgeCheck />
    }
];

const selectedStyle = "hover:none after:content-['SELECIONADO'] after:absolute after:top-[-18px] after:left-8 after:py-2 after:px-3 after:bg-primary after:text-[13px] after:font-semibold after:rounded-md"

export default function AddLocal(): ReactElement {

    const router = useRouter()

    const [categoryValue, setCategoryValue] = useState<string>("")
    const [icon, setIcon] = useState<File | string | null>(null)
    const [uploadIcon, setUploadIcon] = useState<File | null>(null)
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

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && isImageFile(file)) {
          setUploadIcon(file);
          setIcon(file);
        } else {
          setError('Por favor, selecione um arquivo de imagem válido.');
        }
      };
    
    const isImageFile = (file: File): boolean => {
        const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        return acceptedImageTypes.includes(file.type);
    };

    const handleSelectIcon = (e: MouseEvent<HTMLButtonElement>) => {
        const selectedIcon = e.currentTarget.value === "" ? "/assets/categories/0.png" : uploadIcon
        setIcon(selectedIcon)
    }
    
    const handleSubmit = () => {    
        if (icon === uploadIcon && uploadIcon !== null) {
            createCategory({ name: categoryValue, icon: icon === null ? "/assets/categories/0.png" : URL.createObjectURL(uploadIcon) })
        }
        
        router.back()
    } 

    const checkNext = () => {
        if (step === 0) categoryValue !== "" ? handleStep("next") : setError("Informe uma categoria para continuar");
        if (step === 1) handleStep("next");
        if (step === 2) handleSubmit();
    }

    useEffect(() => {
        setError(null)
    }, [step])

    useEffect(() => {
        console.log(icon)
    }, [icon])

    return (
        <div className="h-full">
            <header className="border-b border-zinc-800 py-16">
                <h1 className="font-bold text-2xl"> Formulário para adicionar uma categoria </h1>
                <p className="opacity-70"> Siga os 3 passos para adicionar </p>
            </header>
            <section className="h-full border-b border-zinc-800 lg:flex">
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
                                value={categoryValue}
                                onChange={e => setCategoryValue(e.target.value)}
                            />
                            : step === 1 ?
                            <>
                                <button disabled={typeof icon === "string" || icon === null} onClick={handleSelectIcon} className={`${icon === null || typeof icon === "string" ? selectedStyle : "hover:bg-zinc-800 transition-colors" } relative flex items-center gap-8 text-left bg-zinc-900 w-full py-6 px-8 rounded-lg border border-zinc-800`}>
                                    <Image
                                        width={45}
                                        height={45}
                                        alt=""
                                        src={"/assets/categories/0.png"}
                                    />
                                    <div>   
                                        <h1 className="font-mono text-2xl"> Ícone padrão </h1>
                                        <p className="opacity-50"> Se não quiser adicionar um ícone agora, pode selecionar o ícone padrão </p>
                                    </div>
                                </button>

                                <p className="text-center opacity-50 my-5"> ou </p>

                                { uploadIcon === null ?
                                    <>
                                    <input type="file" hidden accept=".png,.jpg,.jpeg,.webp" name="upload" id="uploadIcon" onChange={handleFileChange}/>
                                    <label htmlFor="uploadIcon" className="relative flex items-center gap-8 text-left w-full py-6 px-8 rounded-lg border-2 border-dashed border-zinc-800 cursor-pointer">
                                        <Plus size={32} opacity={.3}/>
                                        <div>   
                                            <h1 className="font-mono text-2xl"> Adicionar ícone </h1>
                                            <p className="opacity-50"> Você pode adicionar uma imagem que corresponda à categoria </p>
                                        </div>
                                    </label>
                                    </>
                                    :
                                    <button disabled={icon === uploadIcon} onClick={handleSelectIcon} value={"byUser"} className={`${icon === uploadIcon ? selectedStyle : "hover:bg-zinc-800 transition-colors" } relative flex items-center gap-8 text-left bg-zinc-900 w-full py-6 px-8 rounded-lg border border-zinc-800`}>
                                        <Image 
                                            width={45} 
                                            height={45}
                                            src={URL.createObjectURL(uploadIcon)} 
                                            alt="Imagem selecionada" 
                                        />
                                        <div>   
                                            <h1 className="font-mono text-2xl"> Ícone escolhido </h1>
                                        </div>
                                    </button>
                                }

                                <div className="flex items-center gap-4 opacity-50 mb-2 mt-4">
                                    <CircleAlert size={20}/>
                                    <p> É recomendado o uso do site <Link className="font-semibold" href="https://icons8.com.br/icons">https://icons8.com.br/icons</Link> para a escolha dos ícones </p>
                                </div>
                                <div className="flex items-center gap-4 opacity-50 mb-2">
                                    <CircleAlert size={20}/>
                                    <p> É recomendado imagens de tamanho 45x45 </p>
                                </div>
                                <div className="flex items-center gap-4 opacity-50">
                                    <CircleAlert size={20}/>
                                    <p> São suportadas apenas imagens nos formatos png, jpg, jpeg ou webp </p>
                                </div>
                            </>
                            :
                            <section className="flex flex-col gap-4">
                                <div className="flex flex-col items-center gap-5 p-1 min-w-[220px] w-0 rounded-lg border border-zinc-800 bg-zinc-900">
                                    <Image
                                        width={64}
                                        height={64}
                                        alt=""
                                        src={icon === null ? "/assets/categories/0.png" : icon === uploadIcon ? URL.createObjectURL(uploadIcon) : icon as string}
                                    />
                                    <p> { categoryValue } </p>
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
            </section>
        </div>
    )
}