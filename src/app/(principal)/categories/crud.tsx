import { CategoryType } from "@/types/CategoryType";
import axios from "axios";

export const getCategory = async () => {
    const response = await axios.get("http://localhost:3000/api/categories");

    if (response.status !== 200) {
        throw new Error("Failed to fetch API")
    }

    return response.data
}

export const createCategory = async (data: CategoryType) => {

    const { name, icon } = data

    const response = await axios.post("http://localhost:3000/api/categories", { name, icon });

    if (response.status !== 200) {
        throw new Error("Failed to fetch API")
    }

    return response.data
}