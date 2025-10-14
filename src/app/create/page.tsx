"use client";

import Home1 from "../img/Home.png";
import Add from "../img/Add.png";
import Search from "../img/Search.png";
import User1 from "../img/User.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Instafont from "../img/Instafont.png";

const Page = () => {
  const { push } = useRouter();
  const homepush = () => push("/");
  const searchpush = () => push("/");
  const addpush = () => push("/create");
  const userPush = () => push("/profile");
  const aipush = () => push("/create/ai");
  return (
    <div>
      <div className="fixed top-0 z-50 w-full max-w-screen-100 px-4 py-3 bg-white border-b shadow-sm flex items-center justify-between">
        <Image src={Instafont} alt="Instagram logo" className="h-8" />
      </div>
      <div className="flex justify-center items-center h-screen">
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-md hover:opacity-90 transition duration-200"
          onClick={aipush}
        >
          Create with AI
        </button>
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
};
export default Page;
