'use client'

import { ChangeEvent, useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export function Dropzone() {
    const [filename, setFilename] = useState('')

    const handleDownload = useCallback((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename ? `${filename}.txt` : 'filename.txt';
        link.click();
    }, [filename])

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const parsedFilenames = acceptedFiles.map(file => {
            return file.name.replace('key', 'com').replace('.txt', '')
        })

        const response = await fetch('/download', {
            method: 'POST',
            body: JSON.stringify(parsedFilenames)
        })

        const blob = await response.blob()

        handleDownload(blob)
    }, [handleDownload])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    function handleChangeFilename(event: ChangeEvent<HTMLInputElement>) {
        setFilename(event.target.value)
    }

    return (
        <div className="w-full m-auto flex flex-col items-center">
            <div className="w-1/2 flex flex-col gap-1 mb-4">
                <label className="text-slate-300">Digite o nome do arquivo</label>
                <input
                    type="text"
                    value={filename}
                    onChange={handleChangeFilename}
                    className="w-full border-2 border-blue-950 bg-transparent p-2 rounded outline-none text-slate-50 focus-visible:border-blue-600"
                    maxLength={50}
                    placeholder="Ex.: filename.txt"
                />
            </div>
            <div
                className={`w-1/2 h-[300px] border-2 ${isDragActive ? 'border-blue-600' : 'border-blue-950'} hover:border-blue-900 transition-colors cursor-pointer border-dashed rounded p-4 flex items-center justify-center outline-none`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p className="text-slate-300">Solte os arquivos aqui ...</p> :
                        <p className="text-slate-300">Arraste e solte seus arquivos aqui, ou clique para selecionar os arquivos.</p>
                }
            </div>
        </div>
    )
}