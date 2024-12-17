"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

export default function Theme_Mode_Provider({ children }) {
    return (
        <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
            {children}
        </ThemeProvider>
    );
}
