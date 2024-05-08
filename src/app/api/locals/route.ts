import { db } from "../db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const results = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM locals", (error: any, results: []) => {
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

    const { local, floor } = await request.json()
    const query = floor === null ? `INSERT INTO locals (local) VALUES ("${ local }")` : `INSERT INTO locals (local, floor) VALUES ("${ local }", ${ floor })`

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(query, (error: any, results: []) => {
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

export async function DELETE(request: NextRequest) {
    
    const id = await request.json()

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(`DELETE FROM locals WHERE id = ${ id }`, (error: any, results: []) => {
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