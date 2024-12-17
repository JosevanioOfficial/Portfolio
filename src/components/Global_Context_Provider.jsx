"use client";

import { createContext, useContext, useRef, useState } from "react";

// Torna variáveis abaixo globais e permite serem usadas em todo o aplicativo
const GlobalContext = createContext({});
export const useGlobal = () => useContext(GlobalContext);

export default function Global_Context_Provider({ children }) {
    // const loaderRef = useRef(); // Referência do loader verde
    const toggleNavbar = useRef();
    const modalBackdrop = useRef();
    const modalBox = useRef([]);
    const navElemRef = useRef([]);

    const value = { toggleNavbar, modalBackdrop, modalBox, navElemRef };
    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
