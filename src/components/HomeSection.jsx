"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MatrixEffect } from "../utils/matrixEffect";
import Scene from "./Scene";

export default function HomeSection() {
    const homeSectionRef = useRef();
    const matrixCanvas = useRef();
    const sceneParentElement = useRef();
    const renderCount = useRef(0);
    const animationFrameId = useRef();
    const { theme } = useTheme();

    useEffect(() => {
        if (theme) {
            const ctx = matrixCanvas.current.getContext("2d");
            matrixCanvas.current.width = matrixCanvas.current.parentElement.clientWidth;
            matrixCanvas.current.height = matrixCanvas.current.parentElement.clientHeight;
            const matrixEffect = new MatrixEffect(matrixCanvas.current.width, matrixCanvas.current.height);
            let lastTimestamp = 0;
            const fps = 30;
            const nextframe = 1000 / fps;
            let timer = 0;
            if (renderCount.current > 0) {
                // Since the component is re-rendering again due to the change of theme, then the current animation is canceled so a new one can start
                cancelAnimationFrame(animationFrameId.current);
            } else if (renderCount.current === 0) {
                // Since the components is rendering for the first time, then add to the count
                renderCount.current = renderCount.current += 1;
            }
            // Animates the characters and the matrix effect
            function charactersAnimation(currentTimestamp) {
                // currentTimestamp argument is generated automatically by the requestAnimationFrame function
                const deltatime = currentTimestamp - lastTimestamp;
                lastTimestamp = currentTimestamp;
                if (timer > nextframe) {
                    // Makes the characters fade away as they reach the botton
                    ctx.fillStyle = theme === "light" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
                    ctx.textAlign = "center";
                    ctx.fillRect(0, 0, matrixCanvas.current.width, matrixCanvas.current.height);
                    // ctx.fillStyle = theme === "light" ? "#9f9fa1" : "#3a3a3a";
                    ctx.fillStyle = theme === "light" ? "green" : "#0aff0a";
                    ctx.font = `${matrixEffect?.fontSize}px monospace`;
                    matrixEffect.characters.forEach((character) => character.draw(ctx));
                    timer = 0;
                } else {
                    timer += deltatime;
                }
                animationFrameId.current = requestAnimationFrame(charactersAnimation); // creates endless animation loop
            }
            charactersAnimation(0);
            window.addEventListener("resize", () => {
                matrixCanvas.current.width = matrixCanvas.current.parentElement.clientWidth;
                matrixCanvas.current.height = matrixCanvas.current.parentElement.clientHeight;
                matrixEffect.resize(matrixCanvas.current.width, matrixCanvas.current.height);
            });
        }
    }, [theme]);

    return (
        <div ref={homeSectionRef} className="w-full h-full p-0 relative">
            {/* Matrix effect background */}
            <canvas ref={matrixCanvas} className="absolute top-0 left-0 w-full h-full"></canvas>

            {/* Pear 3D Model */}
            <div ref={sceneParentElement} className="absolute top-0 left-0 w-full h-full">
                <Scene sceneParentElement={sceneParentElement} />
            </div>

            {/* Info */}
            <div className="text-center absolute top-2/3 w-full h-fit">
                <p className="text-dark_font font-mono dark:text-light_font text-2xl">Josevânio António</p>
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
        </div>
    );
}
