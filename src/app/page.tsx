"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

export default function Home() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    lang: "en-IN",
  });

  const { speak } = useSpeechSynthesis();
  useEffect(() => {
    SpeechRecognition.startListening();
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex items-center justify-center my-28 w-[800px] break-keep text-white font-extrabold text-3xl">
        {transcript}
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={
            listening
              ? SpeechRecognition.stopListening
              : SpeechRecognition.startListening
          }
        >
          {listening ? "listening" : "start"}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-10 rounded"
          onClick={() => speak({ text: transcript })}
        >
          listen
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetTranscript}
        >
          clear
        </button>
      </div>
    </div>
  );
}
