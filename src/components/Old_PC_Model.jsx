"use client";
import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useControls, useCreateStore, useStoreContext } from "leva";

export default function Old_PC_Model({ sceneParentElement }) {
    const meshRef = useRef();
    const { nodes, materials } = useGLTF("/models/old_pc/scene.gltf");
    const { viewport } = useThree();
    // const lala = useControls({ shce: { lala: 1 } });

    useFrame(() => {
        // meshRef.current.rotation.y += 0.02;
        // meshRef.current.rotation.z += 0.01;
    });

    const materialProps = {
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

        roughness: { value: 0, min: 0, max: 1, step: 0.1 },

        transmission: { value: 1, min: 0, max: 1, step: 0.1 },

        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

        chromaticAberration: { value: 0.02, min: 0, max: 1 },

        backside: { value: true },
    };

    return (
        <group dispose={null}>
            <group scale={0.01}>
                <group position={[0, 5, 175]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                    <mesh castShadow receiveShadow geometry={nodes.Cube003_Keyboard_0.geometry} material={materials.Keyboard} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube003_Mouse_0.geometry} material={materials.Mouse} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube003_Tower_0.geometry} material={materials.Tower} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube003_Monitor_0.geometry} material={materials.Monitor} />
                    <mesh castShadow receiveShadow geometry={nodes.Cube003_Screen_0.geometry} material={materials.Screen} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/models/old_pc/scene.gltf");
