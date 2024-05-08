import { NextRequest, NextResponse } from "next/server";
import { db } from "../../db";

export async function POST(request: NextRequest) {
        
    const { id } = await request.json()

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(`SELECT equipments.id AS equipment_id, categories.name AS category_name, categories.id AS category_id
                    FROM equipments
                    INNER JOIN categories ON equipments.categoryId = categories.id
                    WHERE localId = ${id}`, (error: any, results: []) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })

        return NextResponse.json(results)

    } catch (error) {
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}