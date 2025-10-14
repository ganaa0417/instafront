"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/providers/AuthContext";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const { sign } = useUser();
  const [inputValue, setInputvalue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const input = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    if (name === "username") {
      setInputvalue({ ...inputValue, username: event.target.value });
    } else if (name === "email") {
      setInputvalue({ ...inputValue, email: event.target.value });
    } else if (name === "password") {
      setInputvalue({ ...inputValue, password: event.target.value });
    }
  };

  const handle = () => {
    sign(inputValue.username, inputValue.email, inputValue.password);
  };

  return (
    <div>
      {/* <Input placeholder="Username" name="username" onChange={input} />
      <Input placeholder="email" name="email" onChange={input} />
      <Input placeholder="password" name="password" onChange={input} />
      <Button onClick={handle}>sign up</Button> */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-center mb-6"></div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Create a New Account
          </h2>
          <form onClick={handle} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                placeholder="YourUsername"
                name="username"
                onChange={input}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                // type="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                placeholder="you@example.com"
                name="email"
                onChange={input}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                placeholder="••••••••"
                name="password"
                onChange={input}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Page;
