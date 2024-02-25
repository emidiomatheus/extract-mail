import { NextRequest } from "next/server";
import { writeFileSync, readFileSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', {
            status: 405
        })
    }

    const data: string[] = await request.json()

    let files = ''

    data.forEach(file => {
        const parsedFile = file.replace('.key', '.com')

        files += parsedFile + '\n'
    })

    const filePath = path.join(process.cwd(), 'src/assets', 'emails.txt');

    writeFileSync(filePath, files)
    const file = readFileSync(filePath)

    return new Response(file, {
        status: 200,
        headers: {
            'Content-Disposition': 'attachment; filename=emails.txt',
            'Content-Type': 'application/text'
        },
    })
}