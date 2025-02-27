"use client";

import AOS from "aos";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { LanguageType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [lang, setLang] = useState<LanguageType>({
    code: "fr",
    name: "French",
  });
  const [generatedTexts, setGeneratedTexts] = useState<string>("");

  const textRef = useRef<null | HTMLDivElement>(null);

  const scrollToTexts = () => {
    if (textRef.current !== null) {
      textRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateText = async (e: any) => {
    e.preventDefault();
    setGeneratedTexts("");
    setLoading(true);

    const res = await axios.post("/api/translate", {
      text,
      lang: lang.name,
    });

    setGeneratedTexts(res.data.message);

    scrollToTexts();
    setLoading(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl min-h-screen py-2 mx-auto">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-12 text-center sm:mt-20">
        <Link
          href="https://www.arpesh.in/"
          target="_blank"
          className="px-4 py-1 mb-5 text-sm transition duration-300 ease-in-out border rounded-2xl text-slate-500 hover:scale-105 "
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Developed by <b>Arpesh Gadekar</b>
        </Link>
        <h1
          className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="200"
        >
          Seamless Translation for Any Text You Need
        </h1>

        <div
          className="w-full max-w-xl"
          data-aos="fade-up"
          data-aos-duration="1400"
          data-aos-delay="400"
        >
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full mt-5 border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
            placeholder={"e.g. Who are you?"}
            maxLength={80}
          />
          {text?.length > 79 && (
            <p className="text-sm text-orange-400">
              Maximum of 80 characters are allowed.
            </p>
          )}
          <div className="flex items-center my-5 space-x-3">
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
              onClick={(e) => generateText(e)}
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
          {generatedTexts && (
            <>
              <div data-aos="fade-up" data-aos-duration="1200">
                <h2
                  className="mx-auto text-3xl font-bold sm:text-4xl text-slate-900"
                  ref={textRef}
                >
                  Your Translated Text
                </h2>
              </div>
              <div
                className="flex flex-col items-center justify-center max-w-xl mx-auto space-y-8"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <div
                  className="p-4 transition bg-white border shadow-md rounded-xl hover:bg-gray-100 cursor-copy"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedTexts);
                    toast("Text copied to clipboard", {
                      icon: "✂️",
                    });
                  }}
                >
                  <p>{generatedTexts}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
