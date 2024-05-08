import { Quicksand, Bebas_Neue } from "next/font/google";

export const quicksand = Quicksand({
    subsets: ['latin'],
    variable: '--font-primary',
    display: 'swap'
})

export const bebas = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-secondary',
    display: 'swap'
})