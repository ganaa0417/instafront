"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
} from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
type ContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  login: (email: string, password: string) => Promise<void>;
  sign: (Username: string, email: string, password: string) => Promise<void>;
  token: string | null;
  // setToken: Dispatch<SetStateAction<string | User>>;
};
export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  age: string;
  bio: string | null;
  profilePic: string | null;
  createdAt: Date;
};

export const AuthContext = createContext<ContextType | null>(null);
type DecodedTokenType = {
  data: User;
};
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedtoken: DecodedTokenType = jwtDecode(token);
      setToken(token);
      setUser(decodedtoken.data);
    }
  }, []);
  console.log(token);

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const token = await response.json();
    localStorage.setItem("token", token);
    setToken(token);
  };
  const sign = async (username: string, email: string, password: string) => {
    const userJson = await fetch("http://localhost:8000/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    if (userJson.ok) {
      const token = await userJson.json();
      localStorage.setItem("token", token);
    }
  };

  const values = {
    user: user,
    setUser: setUser,
    login: login,
    sign: sign,
    token: token,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("!!!!!!");
  }
  return authContext;
};
