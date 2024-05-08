import { LocalType } from "@/types/LocalType";
import axios from "axios";
import { NextResponse } from "next/server";
import { cache } from "react";

export const getLocal = cache( async() => {
    const response = await fetch("http://localhost:3000/api/locals", {
        next: { tags: ['locals'] }
    });

    if (response.status !== 200) {
        throw new Error("Failed to fetch API")
    }

    return response.json()
} )

// export const getLocal = async () => {
//     const response = await axios.get("http://localhost:3000/api/locals");

//     if (response.status !== 200) {
//         throw new Error("Failed to fetch API")
//     }

//     return response.data
// }

export const getQuantity = async (id: number | undefined) => {
    const response = await axios.post("http://localhost:3000/api/locals/length", { id })

    if (response.status !== 200) {
        throw new Error("Failed to fetch API")
    }

    return response.data
}

export const getEquipmentsByLocal = async (id: number | undefined) => {
    const response = await axios.post("http://localhost:3000/api/locals/equipments", { id })

    if (response.status !== 200) {
        throw new Error("Failed to fetch API")
    }

    return response.data
}

export const createLocal = async (data: LocalType) => {

    const { local, floor } = data

    try {
        await axios.post("http://localhost:3000/api/locals", { local, floor })
    } catch (error) {
        console.error(error)
    }
}

export const deleteLocal = async (id: number | undefined) => {
    await axios.delete("http://localhost:3000/api/locals", { data: id });
}