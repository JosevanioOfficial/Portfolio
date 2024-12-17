"use client";
import React, { Suspense } from "react";
import { Canvas, directionalLight } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
// import Old_PC_Model from "./Old_PC_Model";
import PearModel from "./PearModel";

export default function Scene({ sceneParentElement }) {
    return (
        <Canvas>
            <directionalLight intensity={2} position={[-3, 3, 1]} />
            <Environment preset="city" />
            <OrbitControls />
            {/* <Old_PC_Model sceneParentElement={sceneParentElement} /> */}
            <PearModel sceneParentElement={sceneParentElement} />
        </Canvas>
    );
}
{
    /* <Suspense fallback={<p>Loading...</p>}>
</Suspense> */
}
