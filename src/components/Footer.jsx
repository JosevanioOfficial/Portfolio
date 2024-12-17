"use client";
import React, { useState } from "react";
import { useGlobal } from "./Global_Context_Provider";

export default function Footer() {
    const { toggleNavbar } = useGlobal();

    return <footer className="bg-white_background dark:bg-dark_background" id="footer"></footer>;
}
