"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { LanguageType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [lang, setLang] = useState<LanguageType>({
    code: "fr",
    name: "French",
  });
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);

    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }

    // const runner = ChatCompletionStream.fromReadableStream(response.body!);
    // runner.on("content", (delta) => setGeneratedBios((prev) => prev + delta));

    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl min-h-screen py-2 mx-auto">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-12 text-center sm:mt-20">
        <p className="px-4 py-1 mb-5 text-sm transition duration-300 ease-in-out border rounded-2xl text-slate-500 hover:scale-105">
          <b>126,657</b> bios generated so far
        </p>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Seamless Translation for Any Text You Need
        </h1>

        <div className="w-full max-w-xl">
          <div className="flex items-center mt-10 space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="font-medium text-left">Enter Text </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full my-5 border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
            placeholder={"e.g. Who are you?"}
          />
          <div className="flex items-center mb-5 space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="font-medium text-left">Select Translation Language</p>
          </div>
          <div className="block">
            <DropDown lang={lang} setLang={(newlang) => setLang(newlang)} />
          </div>
          {loading ? (
            <button
              className="w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          ) : (
            <button
              className="w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80"
              onClick={(e) => generateBio(e)}
            >
              Translate your text &rarr;
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="my-10 space-y-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="mx-auto text-3xl font-bold sm:text-4xl text-slate-900"
                  ref={bioRef}
                >
                  Your generated bios
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center max-w-xl mx-auto space-y-8">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split(/2\.|3\./)
                  .map((generatedBio) => {
                    return (
                      <div
                        className="p-4 transition bg-white border shadow-md rounded-xl hover:bg-gray-100 cursor-copy"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
