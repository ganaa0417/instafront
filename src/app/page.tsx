"use client";

import { useState, useEffect } from "react";
import { User, useUser } from "./providers/AuthContext";
type PostType = {
  userId: User;
  caption: string;
  images: string[];
  like: string[];
  _id: string;
};
import instafont from "./img/instafont.png";
import Home1 from "./img/Home.png";
import Add from "./img/Add.png";
import Search from "./img/Search.png";
import User1 from "./img/User.png";
import heart from "./img/heart.png";
import Image from "next/image";
import { CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Home() {
  const [post, setPost] = useState<PostType[]>([]);
  const { token } = useUser();
  const { push } = useRouter();
  const homepush = () => push("/");
  const searchpush = () => push("/");
  const addpush = () => push("/create");
  const userPush = () => push("/profile");
  const pos = async () => {
    const response = await fetch("http://localhost:8000/create/postall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setPost(data);
  };
  const isliked = async (postId: string) => {
    const res = await fetch(`http://localhost:8000/toggle-like/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const follow = async (followedUserId: string) => {
    const res = await fetch(
      `http://localhost:8000/toggleFollow/${followedUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  useEffect(() => {
    if (token) {
      pos();
    }
  }, [token]);
  console.log(post);
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center">
      <div className="fixed top-0 z-50 w-full max-w-screen-100 px-4 py-3 bg-white border-b shadow-sm flex items-center justify-between">
        <Image src={instafont} alt="Instagram logo" className="h-8" />
      </div>
      <div className="pt-20 w-full max-w-screen-sm">
        {post?.map((posts, index) => (
          <div
            key={index}
           
            className="bg-white border border-gray-200 rounded-md mb-6 shadow-sm"
            
          >
            <div className="flex items-center p-4">
              <div className="bg-gray-300 w-10 h-10 rounded-full mr-3" />
              <p className="font-semibold text-sm">{posts?.userId.username}</p>
              <Button onClick={() => follow(posts._id)}>follow</Button>
            </div>
            <img
              src={posts?.images?.[0]}
              alt="Post"
              className="w-full object-cover max-h-[600px]"
            />

            <div className="p-4">
              <span className="font-semibold mr-2">
                <div onClick={() => isliked(posts._id)}>
                  {posts.like.includes(posts._id!) ? (
                    <Heart color="red" fill="red" />
                  ) : (
                    <Heart />
                  )}
                </div>
                {posts.like.length} likes
              </span>
              {posts?.caption}
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 z-50 w-full max-w-screen-100 px-4 py-3 bg-white border-b shadow-sm flex items-center justify-between">
        <Image src={Home1} alt="home" className="" onClick={homepush} />
        <Image src={Add} alt="add logo" className="" onClick={addpush} />
        <Image
          src={Search}
          alt="serach logo"
          className=""
          onClick={searchpush}
        />
        <Image src={User1} alt="user logo" className="" onClick={userPush} />
      </div>
    </div>
  );
}
