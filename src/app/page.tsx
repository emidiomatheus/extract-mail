import { Dropzone } from "@/components/dropzone";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-950">
      <h1 className="text-slate-50 text-4xl font-bold mb-2">
        extract
        <span className="text-blue-600 text-5xl">.</span>
        mail
      </h1>

      <Dropzone />
    </main>
  );
}
