import { NextRequest, NextResponse } from "next/server";
import { db } from "../../db";

export async function POST(request: NextRequest) {
        
    const { id } = await request.json()

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS quantity FROM equipments WHERE localId = ${id}`, (error: any, results: []) => {
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