"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { AuthContext, useUser } from "../../providers/AuthContext";

export default function Page() {
  const { token, user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [imgurl, setimgurl] = useState("");
  const [loading, setloading] = useState(false);
  const HF_API_KEY = process.env.HF_API_KEY;

  const imageGenerator = async () => {
    if (!prompt.trim()) return;
    setloading(true);
    setimgurl("");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HF_API_KEY}`,
      };

      const res = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              negative_prompt: "blurrry , bad, distorted",
              num_interface_steps: 20,
              guidence_scale: 8.5,
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Error status${res.status}`);
      }
      const blob = await res.blob();

      const file = new File([blob], "generated.png", { type: "image/png" });

      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      setimgurl(uploaded.url);
    } catch (err) {
      console.error("image generation failed;", err);
    } finally {
      setloading(false);
    }
  };

  const postWithAI = async () => {
    const response1 = await fetch("http://localhost:8000/create/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        caption: "hi",
        images: imgurl,
        userId: user?._id,
      }),
    });
  };

  return (
    <div>
      <div className="border-b">
        <a href="/create">
          <div>X</div>
        </a>
        <CardTitle className="flex justify-center m-2">
          ai Generate for new post
        </CardTitle>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Input
          className="h-20"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="enter your prompt..."
        />
        <Button
          onClick={() => imageGenerator()}
          disabled={loading}
          className="bg-blue-500"
        >
          {loading ? "generating..." : "generate"}
        </Button>
        {imgurl && (
          <img src={imgurl} alt="generated" className="rounded-xl shadow-lg" />
        )}
      </div>
      <div>
        <button
          className="class=sssrelative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 w-30 h-10"
          onClick={postWithAI}
        >
          upload photo
        </button>
      </div>
    </div>
  );
}
