"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ThemeSwitcher({ welcomeMsg, setWelcomeMsg }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState();

    useEffect(() => {
        setMounted(true);
    }, []);

    function change_Welcome_Msg(msg) {
        switch (msg) {
            case "welcome!":
                return "bem-vindo!";

            case "bem-vindo!":
                return "ようこそ";

            case "ようこそ":
                return "欢迎";

            case "欢迎":
                return "bienvenido!";

            case "bienvenido!":
                return "مرحباً";

            case "مرحباً":
                return "bienvenu!";

            case "bienvenu!":
                return "benvenuto!";

            case "benvenuto!":
                return "welcome!";

            default:
                break;
        }
        return;
    }

    return (
        mounted && (
            <div>
                {theme === "light" && (
                    <i
                        className="bi bi-moon cursor-pointer text-black text-2xl"
                        onClick={() => {
                            setTheme("dark");
                            // setWelcomeMsg(change_Welcome_Msg(welcomeMsg));
                        }}
                    ></i>
                )}

                {theme === "dark" && (
                    <i
                        className="bi bi-brightness-high-fill cursor-pointer text-white text-2xl"
                        onClick={() => {
                            setTheme("light");
                            // setWelcomeMsg(change_Welcome_Msg(welcomeMsg));
                        }}
                    ></i>
                )}
            </div>
        )
    );
}
