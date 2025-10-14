"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/app/providers/AuthContext";
import { useRouter } from "next/navigation";
const Page = () => {
  const { setUser, user } = useUser();
  const { push } = useRouter();
  const login = async () => {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: "gnbn@gmail.com",
        password: "ganaa876",
      }),
    });
    const token = await response.json();
    localStorage.setItem("token", token);
    setUser(user);
  };
  if (user) push("/");
  return (
    <div>
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                
                
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
               
             
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/sign-in"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div> */}
      <div>
        <Input ></Input>
        <Input></Input>
      <Button onClick={login}></Button>
      </div>
    </div>
  );
};
export default Page;
