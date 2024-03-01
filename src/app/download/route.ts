import { NextRequest } from "next/server";
import { writeFileSync, readFileSync } from "fs";

export async function POST(request: NextRequest) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', {
            status: 405
        })
    }

    const data: string[] = await request.json()

    let files = ''

    data.forEach(filename => {
        let parsedFile = '';

        if (filename.includes('.com')) {
            parsedFile = filename.replace('.key', '').replace('.txt', '')
        }
        
        parsedFile = filename.replace('key', 'com').replace('.txt', '')

        files += parsedFile + '\n'
    })

    const filePath = '/tmp/file.txt';

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