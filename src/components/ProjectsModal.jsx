"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useGlobal } from "./Global_Context_Provider";
import "animate.css";

export default function Projects() {
    const { modalBackdrop, modalBox } = useGlobal();

    return (
        <div ref={modalBackdrop} className="hidden w-full md:w-4/6 xl:w-4/5 absolute left-auto z-50 inset-0 modal_container">
            <div className="text-light_font w-full h-full transition-all grid xl:grid-cols-2 gap-2 p-2 overflow-auto animate__animated animate__fadeIn" id="backdrop">
                <div className="grid grid-rows-5 gap-2">
                    <div ref={(element) => (modalBox.current[0] = element)} className="text-center animate__animated animate__slideInDown animate__fast glass_effect">
                        <h1 className="font-mono font-bold tracking-widest">E-commerce Suitshop</h1>
                        <Link className="text-sm text-green-500" href="https://parabellum-eta.vercel.app/" target="_blank">
                            Parabellum <i className="bi bi-link-45deg"></i>
                        </Link>
                        <div>
                            <small>This e-commerce walks you through the whole process of authentication, adding products to cart, checking out and making payment.</small>
                        </div>
                    </div>

                    <div ref={(element) => (modalBox.current[1] = element)} className="relative row-span-3 animate__animated animate__headShake glass_effect" id="project_main_image"></div>

                    <div
                        ref={(element) => (modalBox.current[2] = element)}
                        className="rounded px-9 py-3 overflow-hidden flex justify-center items-center relative animate__animated animate__zoomIn animate__fast glass_effect"
                    >
                        <p>Loading...</p>
                    </div>
                </div>

                <div ref={(element) => (modalBox.current[3] = element)} className="max-xl:hidden flex justify-center items-center animate__animated animate__zoomIn glass_effect">
                    <p>Loading...</p>
                </div>
            </div>
        </div>
    );
}
