import { NextRequest, NextResponse } from "next/server";
import { db } from "../db";

export async function GET() {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM categories`, (error: any, results: []) => {
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

export async function POST(request: NextRequest) {

    const { name, icon } = await request.json()
    console.log(name, icon)

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM categories`, (error: any, results: []) => {
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