"use client";
import { useRef, useEffect, useState } from "react";
import { useGlobal } from "./Global_Context_Provider";

export default function Particles({ welcomeMsg }) {
    const mainCanvas = useRef();
    const { toggleNavbar } = useGlobal();

    useEffect(() => {
        const ctx = mainCanvas.current.getContext("2d", {
            willReadFrequently: true,
        });

        mainCanvas.current.width = mainCanvas.current.parentElement.clientWidth;
        // mainCanvas.current.height = mainCanvas.current.parentElement.clientHeight / 4;
        mainCanvas.current.height = mainCanvas.current.parentElement.clientHeight;

        class Particle {
            constructor(effect, x, y, color) {
                this.effect = effect;

                // Will animate particles from a random position to their final position
                // this.x = this.effect.canvasWidth;
                // this.y = 0;

                this.x = Math.random() * this.effect.canvasWidth;
                this.y = this.effect.canvasHeight;

                this.color = color;
                this.originX = x;
                this.originY = y;
                this.size = this.effect.gap;
                this.dx = 0; // dx is the distance between the mouse and the particle
                this.dy = 0;
                this.vx = 0;
                this.vy = 0;
                this.force = 0; // speed to which the particle is pushed
                this.angle = 0;
                this.distance = 0;
                this.friction = Math.random() * 0.6 + 0.15;
                this.ease = Math.random() * 0.1 + 0.005;
            }

            draw() {
                this.effect.context.fillStyle = this.color;
                this.effect.context.fillRect(this.x, this.y, this.size, this.size);
            }

            // Moves particles away from the mouse
            update() {
                // Navbar client width is necessary because the mouse x position is influenced by the display of the navbar, since the navbar can be hidden or shown in the mobile version, then the navbar width changes. 0 when collapsed and 307px when opened on mobile
                // let navbarWidth = 0;
                // if (window.matchMedia("(min-width: 768px)").matches) navbarWidth = toggleNavbar.current.clientWidth;

                // dx is the distance between mouse x position and particle x position
                this.dx = this.effect.mouse.x - this.x - 50;

                // dy is the distance between mouse y position and particle y position
                this.dy = this.effect.mouse.y - this.y + 5;

                this.distance = this.dx * this.dx + this.dy * this.dy; // Calculates distance between particle and mouse
                this.force = -this.effect.mouse.radius / this.distance;

                if (this.distance < this.effect.mouse.radius) {
                    this.angle = Math.atan2(this.dy, this.dx);
                    this.vx += this.force * Math.cos(this.angle);
                    this.vy += this.force * Math.sin(this.angle);
                }

                this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
                this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
            }
        }

        class Effect {
            constructor(context, canvasWidth, canvasHeight) {
                this.context = context;
                this.canvasWidth = canvasWidth;
                this.canvasHeight = canvasHeight;
                this.textX = canvasWidth / 2;
                this.textY = canvasHeight / 2;
                this.fontSize = 2.5;
                this.textWidthLimit = this.canvasWidth * 0.8;
                this.lineHeight = this.fontSize * 20;
                this.verticalOffset = 0; // Allows to change text vertical position

                // Particle
                this.particle = [];
                this.gap = 1;
                this.mouse = {
                    radius: 1000,
                    // radius: 20000,
                    x: 0,
                    y: 0,
                };
                mainCanvas.current.addEventListener("mousemove", (e) => {
                    this.mouse.x = e.x;
                    this.mouse.y = e.y;
                });
            }

            wrapText(text) {
                // Text style
                // const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
                // gradient.addColorStop(0.3, "red");
                // gradient.addColorStop(0.5, "fuchsia");
                // gradient.addColorStop(0.7, "purple");
                // gradient.addColorStop(0.3, "#036563e3");
                // gradient.addColorStop(0.5, "#033649");
                // gradient.addColorStop(0.7, "#033649");
                // gradient.addColorStop(0.3, "black");
                // gradient.addColorStop(0.5, "black");
                // gradient.addColorStop(0.7, "#fff");

                // gradient.addColorStop(0.3, "rgb(183, 183, 183)");
                // gradient.addColorStop(0.7, "rgb(106, 106, 106)");

                // gradient.addColorStop(0.3, "rgb(183, 183, 183)");
                // gradient.addColorStop(0.7, "rgb(106, 106, 106)");

                // gradient.addColorStop(0.3, "rgba(0, 0, 0, 1)");
                // gradient.addColorStop(0.5, "rgba(57, 57, 54, 1)");

                // this.context.letterSpacing = "1px";
                this.context.textAlign = "center";
                this.context.textBaseline = "middle";
                this.context.fillStyle = "#484848";
                this.context.font = `100 ${this.fontSize}rem Poppins, sans-serif`;

                // Break multiple lines
                let lines = [];
                let words = text.split(" ");
                let counter = 0;
                let line = "";
                for (let i = 0; i < words.length; i++) {
                    let testline = line + words[i] + " ";

                    // Adds word to the next line if the width of the textline surpassses the limit
                    if (this.context.measureText(testline).width > this.textWidthLimit) {
                        line = words[i] + " ";
                        counter++;
                    } else {
                        // Adds the new word to the same textline where the previous one is at
                        line = testline;
                    }
                    lines[counter] = line;
                }

                let textBlockHeight = this.lineHeight * counter;
                this.textY = this.canvasHeight / 2 - textBlockHeight / 2;
                this.textY = this.canvasHeight / 2 - textBlockHeight / 2 + this.verticalOffset;

                // Places each textline on canvas and sets each one of their height based on font-size and line height
                lines.forEach((each, indx) => {
                    this.context.fillText(each, this.textX, this.textY + indx * this.lineHeight);
                });
                this.convertToParticles();
            }

            convertToParticles() {
                this.particles = [];
                const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;

                // Eliminates the text on the canvas after the particle is draw
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                for (let y = 0; y < this.canvasHeight; y += this.gap) {
                    for (let x = 0; x < this.canvasWidth; x += this.gap) {
                        const indx = (y * this.canvasWidth + x) * 4;
                        const alpha = pixels[indx + 3];
                        if (alpha > 0) {
                            const red = pixels[indx];
                            const green = pixels[indx] + 1;
                            const blue = pixels[indx] + 2;

                            // Color of non transparent cell
                            const color = `rgb ${red},${green},${blue}`;
                            this.particles.push(new Particle(this, x, y, color));
                        }
                    }
                }
            }

            render() {
                this.particles.forEach((each) => {
                    each.update();
                    each.draw();
                });
            }

            windowResize(width, height) {
                this.canvasWidth = width;
                this.canvasHeight = height;
                this.textX = this.canvasWidth / 2;
                this.textY = this.canvasHeight / 2;
                this.textWidthLimit = this.canvasWidth * 0.8;
            }
        }

        const effect = new Effect(ctx, mainCanvas.current.width, mainCanvas.current.height);
        effect.wrapText(welcomeMsg);
        effect.render();
        function animate() {
            ctx.clearRect(0, 0, mainCanvas.current.width, mainCanvas.current.height);
            effect.render();
            requestAnimationFrame(animate); // Creates a loop
        }
        animate();

        window.addEventListener("resize", (e) => {
            mainCanvas.current.width = mainCanvas.current.parentElement.clientWidth;
            // mainCanvas.current.height = mainCanvas.current.parentElement.clientHeight / 4;
            mainCanvas.current.height = mainCanvas.current.parentElement.clientHeight;
            effect.windowResize(mainCanvas.current.width, mainCanvas.current.height);
            effect.wrapText(welcomeMsg);
        });
    }, [welcomeMsg]);

    return <canvas ref={mainCanvas} id="main_canvas"></canvas>;
}
