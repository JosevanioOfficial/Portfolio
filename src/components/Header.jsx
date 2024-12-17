"use client";
import React, { useState } from "react";
import { useGlobal } from "./Global_Context_Provider";
import ThemeSwitcher from "./ThemeSwitcher";
import Particles from "./Particles";
import { change_active_option_status, closeModal } from "../utils/globalFunctions";
import "animate.css";

export default function Header() {
    const { toggleNavbar, modalBackdrop, modalBox, navElemRef } = useGlobal();
    const [welcomeMsg, setWelcomeMsg] = useState("welcome!");

    return (
        <header className="flex bg-white_background dark:bg-dark_background" id="header">
            {/* Hamburguer menu button */}
            <div className="flex justify-center items-center hamburguer_wrapper">
                <i
                    className="bi bi-list cursor-pointer font-bold text-3xl icons_thickness transition ease-in-out"
                    onClick={(e) => {
                        if (e.target.classList.contains("bi-x")) {
                            change_active_option_status(navElemRef, navElemRef.current.length + 1, modalBackdrop, modalBox);
                            toggleNavbar.current.classList.remove("animate__slideInLeft");
                            toggleNavbar.current.classList.add("animate__slideOutLeft");

                            closeModal(modalBox, modalBackdrop);

                            e.target.classList.remove("bi-x");
                            e.target.classList.add("bi-list");
                        } else {
                            if (toggleNavbar.current.classList.contains("hidden")) toggleNavbar.current.classList.remove("hidden");

                            toggleNavbar.current.classList.remove("animate__slideOutLeft");
                            toggleNavbar.current.classList.add("animate__slideInLeft");
                            e.target.classList.remove("bi-list");
                            e.target.classList.add("bi-x");
                        }
                    }}
                ></i>
            </div>

            {/* Menu and Particle welcome message */}
            <div className="particles_wrapper">
                <div id="custom_canvas">
                    <Particles welcomeMsg={welcomeMsg} />
                </div>
            </div>

            {/* Theme switcher */}
            <div className="flex justify-center items-center themeswitch_wrapper">
                <ThemeSwitcher welcomeMsg={welcomeMsg} setWelcomeMsg={setWelcomeMsg} />
            </div>
        </header>
    );
}
