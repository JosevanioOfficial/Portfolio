"use client";
import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useControls, useCreateStore, useStoreContext } from "leva";

export default function PearModel({ sceneParentElement }) {
    const meshRef = useRef();
    const { nodes, materials } = useGLTF("/models/pear/scene.gltf");
    const { viewport } = useThree();
    // const lala = useControls({ shce: { lala: 1 } });

    useFrame(() => {
        meshRef.current.rotation.y += 0.02;
        // meshRef.current.rotation.z += 0.01;
    });

    // const materialProps = {
    //     thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    //     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    //     // transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    //     ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    //     chromaticAberration: { value: 0.02, min: 0, max: 1 },
    //     backside: { value: true },
    // };

    const materialProps = {
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

        roughness: { value: 0, min: 0, max: 1, step: 0.1 },

        transmission: { value: 1, min: 0, max: 1, step: 0.1 },

        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

        chromaticAberration: { value: 0.02, min: 0, max: 1 },

        backside: { value: true },
    };

    return (
        <group scale={sceneParentElement.current.clientWidth / (sceneParentElement.current.clientWidth / 1.5)}>
            {/* <Text fontSize={1} fontWeight={"bold"} position={[0, 0, -1]} anchorX="center" anchorY="middle">
                Hello World!
            </Text> */}

            <mesh ref={meshRef} castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials.Pear_fruit_shader} {...materialProps}>
                <MeshTransmissionMaterial />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.Fruit_Stem_Orchard_Anchor}
                position={[0.005, 1.509, 0]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-0.028, 0.166, 0.028]}
            />
        </group>
    );
}

useGLTF.preload("/models/pear/scene.gltf");
