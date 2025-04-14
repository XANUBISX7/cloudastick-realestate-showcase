
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from "@react-three/drei";
import { Mesh, Group } from "three";
import { motion } from "framer-motion";

// This is a simplified 3D apartment model component
// In a production app, you would use a detailed 3D model loaded from a GLTF file
const ApartmentModel = () => {
  return (
    <div className="scene-container">
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#111111"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="apartment" />
        
        <group position={[0, -1, 0]}>
          <Model />
          <ContactShadows 
            position={[0, -0.1, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={1.5} 
            far={4} 
          />
        </group>
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-center bg-black/30 backdrop-blur-md p-6 rounded-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Experience Luxury Real Estate</h2>
          <p className="text-white/80 mb-4">Interact with our 3D models to explore properties</p>
          <button className="cta-button">
            Explore Smart Real Estate
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Simplified apartment model
// In a real implementation, you would import a detailed model
function Model() {
  const groupRef = useRef<Group>(null);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });
  
  const rooms = [
    { id: "livingRoom", position: [1, 0.5, 0], size: [2, 1, 1.5], color: "#F6D984", name: "Living Room" },
    { id: "kitchen", position: [-1, 0.5, 0], size: [1, 1, 1.5], color: "#E6C974", name: "Kitchen" },
    { id: "bedroom", position: [0, 0.5, -1.5], size: [1.8, 1, 1], color: "#D6B964", name: "Bedroom" },
    { id: "bathroom", position: [-1.5, 0.5, -1.5], size: [0.8, 1, 1], color: "#C6A954", name: "Bathroom" },
  ];
  
  const handleRoomClick = (roomId: string) => {
    setActiveRoom(activeRoom === roomId ? null : roomId);
  };
  
  return (
    <group ref={groupRef}>
      {/* Base/Floor */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[5, 0.2, 4]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Outer walls */}
      <mesh position={[0, 0.5, -2]} receiveShadow castShadow>
        <boxGeometry args={[5, 1, 0.1]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[0, 0.5, 2]} receiveShadow castShadow>
        <boxGeometry args={[5, 1, 0.1]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[-2.5, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.1, 1, 4]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[2.5, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.1, 1, 4]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      
      {/* Rooms */}
      {rooms.map((room) => (
        <mesh 
          key={room.id}
          position={room.position}
          castShadow
          receiveShadow
          onClick={() => handleRoomClick(room.id)}
          onPointerOver={() => setHovered(room.id)}
          onPointerOut={() => setHovered(null)}
        >
          <boxGeometry args={room.size} />
          <meshStandardMaterial 
            color={activeRoom === room.id ? "#F6D984" : hovered === room.id ? "#E6C974" : room.color} 
            transparent 
            opacity={0.8} 
          />
          
          {(activeRoom === room.id || hovered === room.id) && (
            <Html position={[0, 1.5, 0]} center>
              <div className="bg-black/80 text-white px-3 py-2 rounded text-sm whitespace-nowrap">
                {room.name}
              </div>
            </Html>
          )}
        </mesh>
      ))}
      
      {/* Example furniture */}
      <mesh position={[1, 0.15, 0]} castShadow>
        <boxGeometry args={[1.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      <mesh position={[-1, 0.3, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
      
      <mesh position={[0, 0.25, -1.5]} castShadow>
        <boxGeometry args={[1.5, 0.5, 0.8]} />
        <meshStandardMaterial color="#4B0082" />
      </mesh>
    </group>
  );
}

export default ApartmentModel;
