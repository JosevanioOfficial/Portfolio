"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useGlobal } from "./Global_Context_Provider";
import { change_active_option_status } from "../utils/globalFunctions";
import "animate.css";

export default function Navbar() {
    const { toggleNavbar, modalBackdrop, modalBox, navElemRef } = useGlobal();

    return (
        <nav ref={toggleNavbar} className="hidden w-3/5 md:w-4/12 xl:w-1/5 absolute z-20 overflow-auto px-2 animate__animated animate__fast hidden_scrollbar glass_effect" id="navbar">
            <div className="text-center px-3 mt-4" id="about_section">
                <h1 className="text-black dark:text-white_font">Josevânio António</h1>
                <p>
                    Senior Full-Stack Software <br />
                    (Web, Desktop and Hybrid Mobile) <br /> Developer with 7 years of work <br />
                    experience and expertise.
                </p>
                <p className="mt-2">
                    Thank you for being here! <br />
                    It means a lot!
                </p>

                <div className="space-x-4 text-xl mt-2">
                    <Link href="https://wa.me/+244947045558" target="_blank">
                        <i className="bi bi-whatsapp text-green-700"></i>
                    </Link>

                    <Link href="mailto:josevanioofficial@gmail.com">
                        <i className="bi bi-envelope"></i>
                    </Link>

                    <Link href="https://www.linkedin.com/in/josevanioantonio/" target="_blank">
                        <i className="bi bi-linkedin text-cyan-600"></i>
                    </Link>

                    <Link href="https://github.com/JosevanioOfficial" target="_blank">
                        <i className="bi bi-github"></i>
                    </Link>
                </div>
                <p className="text-sm">josevanioofficial@gmail.com</p>
            </div>

            <div className="mt-6">
                <h1 className="font-bold dark:text-light_font text-center max-md:mt-32 mb-2">Projects</h1>

                <div
                    ref={(element) => (navElemRef.current[0] = element)}
                    className="nav_options"
                    onClick={() => {
                        change_active_option_status(navElemRef, 0, modalBackdrop, modalBox);
                        modalBackdrop.current.classList.remove("hidden");
                    }}
                >
                    <span className="space-x-3 md:space-x-5">
                        <small>
                            E-commerce <span className="max-md:hidden">Suitshop</span>
                        </small>
                        <small className="text-stone-600 dark:text-stone-300">2024</small>
                    </span>

                    <p className="text-xs font-normal">Parabellum</p>
                </div>
            </div>
        </nav>
    );
}
