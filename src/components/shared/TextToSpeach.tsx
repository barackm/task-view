"use client";
import React from "react";
import { Button } from "../ui/button";
import { textToSpeach } from "@/actions/ai";
import { toast } from "sonner";
import { errorHandler } from "@/lib/errorHandler";
import { LuLoader2 } from "react-icons/lu";

const TextToSpeach = () => {
  const [loading, setLoading] = React.useState(false);
  const [audio, setAudio] = React.useState<any>(null);
  const downloadAnchor = React.useRef(null);
  const audioRef = React.useRef(null);

  const handleTextToSpeach = async () => {
    try {
      setLoading(true);

      const audio = await textToSpeach();
      setAudio(audio);
      toast.success("Audio generated successfully");
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    const audio: any = audioRef.current;
    if (audio) {
      audio.play();
    }
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(audio);
    const a: any = downloadAnchor.current;
    if (a) {
      a.href = url;
      a.download = "audio.mp3";
      a.click();
    }
  };

  return (
    <div className="p-4">
      <a hidden ref={downloadAnchor} />
      <audio id="audio" ref={audioRef} controls src={audio} />
      <div className="flex gap-1 items-center">
        <Button onClick={handleTextToSpeach} disabled={loading}>
          {loading && <LuLoader2 className="animate-spin mr-2" />} Get Started
        </Button>
        <Button onClick={handleSpeak} disabled={!audio}>
          Speak
        </Button>
        <Button disabled={!audio} onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default TextToSpeach;
