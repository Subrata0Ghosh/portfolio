import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, Box, Torus, Octahedron, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef, Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'

// Error boundary component
const CanvasErrorFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-blue-800/20">
    <div className="text-center text-white">
      <div className="text-6xl mb-4">🌐</div>
      <p className="text-lg">3D Scene Loading...</p>
    </div>
  </div>
)

// Loading fallback
const CanvasLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-blue-800/20">
    <div className="text-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
      <p>Loading 3D Scene...</p>
    </div>
  </div>
)

const calculateYearsOfExperience = () => {
  const experiences = [
    { start: '2023-02-01', end: '2025-08-01' }, // As Softech
    { start: '2020-06-01', end: '2020-10-01' },// Volstory
    { start: '2025-12-01', end: '' }, // skr technosoft (current)
  ];

  const today = new Date();

  let intervals = experiences.map(exp => {
    const start = new Date(exp.start);
    let end = exp.end ? new Date(exp.end) : today;
    if (end > today) end = today;
    return { start, end };
  });

  intervals.sort((a, b) => a.start - b.start);

  const mergedIntervals = [];
  let currentInterval = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const nextInterval = intervals[i];
    if (nextInterval.start <= currentInterval.end) {
      currentInterval = {
        start: currentInterval.start,
        end: new Date(Math.max(currentInterval.end.getTime(), nextInterval.end.getTime()))
      };
    } else {
      mergedIntervals.push(currentInterval);
      currentInterval = nextInterval;
    }
  }
  mergedIntervals.push(currentInterval);

  const totalMonths = mergedIntervals.reduce((total, interval) => {
    return total + (interval.end.getFullYear() - interval.start.getFullYear()) * 12 + (interval.end.getMonth() - interval.start.getMonth());
  }, 0);

  return (totalMonths / 12).toFixed(1);
};

const FloatingGeometry = ({ position, rotation, scale, color }) => {
  const meshRef = useRef()
  const { viewport, mouse } = useThree()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      // Mouse interaction - objects follow mouse with parallax effect
      const mouseInfluence = 0.1
      meshRef.current.rotation.x += 0.01 + mouse.y * mouseInfluence
      meshRef.current.rotation.y += 0.005 + mouse.x * mouseInfluence

      // Scroll-based floating - objects move based on scroll position
      const scrollInfluence = scrollY * 0.001
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.01 + scrollInfluence * 0.5

      // Mouse parallax effect on position
      meshRef.current.position.x = position[0] + mouse.x * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Octahedron ref={meshRef} position={[position[0], position[1] + scrollY * 0.0005, position[2]]} scale={scale} args={[1, 0]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3 + Math.abs(mouse.x) * 0.2} // Mouse affects distortion
          speed={1 + Math.abs(mouse.y) * 2} // Mouse affects animation speed
          roughness={0.2}
          metalness={0.8}
        />
      </Octahedron>
    </Float>
  )
}

const AnimatedTorus = ({ position, color }) => {
  const torusRef = useRef()
  const { mouse } = useThree()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (torusRef.current) {
      // Enhanced mouse interaction - more responsive rotation
      torusRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5 + mouse.y * 0.3
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.2 + mouse.x * 0.2

      // Scroll-based movement
      const scrollInfluence = scrollY * 0.0008
      torusRef.current.position.y = position[1] + scrollInfluence

      // Mouse parallax on position
      torusRef.current.position.x = position[0] + mouse.x * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <Torus ref={torusRef} position={[position[0], position[1] + scrollY * 0.0003, position[2]]} args={[0.8, 0.2, 16, 32]} scale={0.8}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2 + Math.abs(mouse.x) * 0.1} // Mouse affects distortion
          speed={1.5 + Math.abs(mouse.y) * 1.5} // Mouse affects speed
          roughness={0.1}
          metalness={0.9}
        />
      </Torus>
    </Float>
  )
}

const FloatingParticles = () => {
  const particlesRef = useRef()
  const { mouse } = useThree()
  const particleCount = 50
  const [scrollY, setScrollY] = useState(0)

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      // Mouse influences particle rotation and speed
      particlesRef.current.rotation.y = state.clock.elapsedTime * (0.05 + Math.abs(mouse.x) * 0.1)
      particlesRef.current.rotation.x = state.clock.elapsedTime * (0.03 + Math.abs(mouse.y) * 0.05)

      // Scroll affects particle movement
      const scrollInfluence = scrollY * 0.0002
      particlesRef.current.rotation.z += scrollInfluence
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02 + Math.abs(mouse.x) * 0.01} // Mouse affects particle size
        color="#60a5fa"
        transparent
        opacity={0.6 + Math.abs(mouse.y) * 0.2} // Mouse affects opacity
        sizeAttenuation
      />
    </points>
  )
}

const Hero3DScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "default"
      }}
      onError={(error) => console.error('Canvas error:', error)}
    >
      <Suspense fallback={null}>
        <Hero3DSceneInner />
      </Suspense>
    </Canvas>
  )
}

const Hero3DSceneInner = () => {
  const mainSphereRef = useRef()
  const leftCubeRef = useRef()
  const rightCubeRef = useRef()
  const starsRef = useRef()
  const shootingStarsRef = useRef([])
  const { mouse } = useThree()
  const [scrollY, setScrollY] = useState(0)
  const [dampedMouse, setDampedMouse] = useState({ x: 0, y: 0 })
  const [shootingStars, setShootingStars] = useState([])
  const [twinklingStars, setTwinklingStars] = useState([])
  const [comets, setComets] = useState([])
  const [mouseDistance, setMouseDistance] = useState(0)
  const materialRef = useRef()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)

    // Initialize twinkling stars
    const initialTwinklingStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300,
      z: (Math.random() - 0.5) * 300,
      baseBrightness: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 2 + 1
    }))
    setTwinklingStars(initialTwinklingStars)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Smooth damping for mouse position
    const dampingFactor = 0.08
    setDampedMouse({
      x: dampedMouse.x + (mouse.x - dampedMouse.x) * dampingFactor,
      y: dampedMouse.y + (mouse.y - dampedMouse.y) * dampingFactor
    })

    // Animate existing stars - make them twinkle and move
    if (starsRef.current) {
      // Add subtle rotation to star field
      starsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      starsRef.current.rotation.y = time * 0.05
    }

    // Update twinkling stars
    setTwinklingStars(prev => prev.map(star => ({
      ...star,
      brightness: star.baseBrightness + Math.sin(time * star.twinkleSpeed) * 0.3
    })))

    // Create shooting stars occasionally
    if (Math.random() < 0.005) { // 0.5% chance per frame
      const newShootingStar = {
        id: Date.now() + Math.random(),
        startX: (Math.random() - 0.5) * 200,
        startY: (Math.random() - 0.5) * 200,
        startZ: (Math.random() - 0.5) * 200,
        speed: Math.random() * 2 + 1,
        life: 2, // seconds
        maxLife: 2
      }
      setShootingStars(prev => [...prev, newShootingStar])
    }

    // Create comets occasionally
    if (Math.random() < 0.002) { // 0.2% chance per frame
      const newComet = {
        id: Date.now() + Math.random(),
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 400,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 50 + 20,
        speed: Math.random() * 0.02 + 0.01,
        life: 8, // seconds
        maxLife: 8
      }
      setComets(prev => [...prev, newComet])
    }

    // Update shooting stars
    setShootingStars(prev => prev.map(star => ({
      ...star,
      life: star.life - state.clock.getDelta()
    })).filter(star => star.life > 0))

    // Update comets
    setComets(prev => prev.map(comet => {
      const newAngle = comet.angle + comet.speed
      return {
        ...comet,
        angle: newAngle,
        x: Math.cos(newAngle) * comet.radius,
        z: Math.sin(newAngle) * comet.radius,
        life: comet.life - state.clock.getDelta()
      }
    }).filter(comet => comet.life > 0))

    // Advanced main sphere animations based on mouse
    if (mainSphereRef.current) {
      const scrollInfluence = scrollY * 0.0005
      const currentMouseDistance = Math.sqrt(dampedMouse.x ** 2 + dampedMouse.y ** 2)
      const mouseAngle = Math.atan2(dampedMouse.y, dampedMouse.x)

      setMouseDistance(currentMouseDistance)

      // Orbital movement - sphere moves in gentle orbits influenced by mouse
      const orbitRadius = 0.8 + currentMouseDistance * 0.5
      const orbitSpeed = 0.3 + currentMouseDistance * 0.2
      const orbitX = Math.cos(time * orbitSpeed + mouseAngle) * orbitRadius
      const orbitY = Math.sin(time * orbitSpeed * 0.7 + mouseAngle * 0.5) * orbitRadius * 0.5

      // Dynamic scaling based on mouse proximity and movement
      const baseScale = 2.5
      const proximityScale = 1 + currentMouseDistance * 0.3
      const breathingScale = Math.sin(time * 2) * 0.1 + 1
      const mouseInfluenceScale = 1 + Math.abs(dampedMouse.x + dampedMouse.y) * 0.2
      const dynamicScale = baseScale * proximityScale * breathingScale * mouseInfluenceScale

      // Complex multi-axis rotation with mouse influence
      const baseRotationY = time * 0.1
      const mouseRotationY = dampedMouse.x * 0.4
      const orbitalRotationY = Math.sin(time * 0.5) * 0.3

      const baseRotationX = dampedMouse.y * 0.2
      const wobbleRotationX = Math.sin(time * 1.5) * 0.1
      const mouseWobbleX = dampedMouse.y * 0.3

      const orbitalRotationZ = Math.cos(time * 0.8) * 0.2
      const mouseTwistZ = dampedMouse.x * dampedMouse.y * 0.5

      // Apply all transformations
      mainSphereRef.current.position.x = orbitX
      mainSphereRef.current.position.y = -2 + orbitY + scrollInfluence
      mainSphereRef.current.position.z = -2 + dampedMouse.y * 0.3

      mainSphereRef.current.rotation.y = baseRotationY + mouseRotationY + orbitalRotationY
      mainSphereRef.current.rotation.x = baseRotationX + wobbleRotationX + mouseWobbleX
      mainSphereRef.current.rotation.z = orbitalRotationZ + mouseTwistZ

      mainSphereRef.current.scale.setScalar(dynamicScale)

      // Update material properties dynamically
      if (materialRef.current) {
        materialRef.current.distort = 0.4 + mouseDistance * 0.3 + Math.sin(time * 3) * 0.1
        materialRef.current.speed = 2 + mouseDistance * 2 + Math.abs(dampedMouse.x) * 3
        materialRef.current.roughness = 0.1 + mouseDistance * 0.2
        materialRef.current.metalness = 0.5 + mouseDistance * 0.3
        materialRef.current.emissiveIntensity = 0.1 + mouseDistance * 0.4
      }
    }

    // Left cube responds to mouse and scroll
    if (leftCubeRef.current) {
      leftCubeRef.current.rotation.x = state.clock.elapsedTime * 0.8 + mouse.y * 0.2
      leftCubeRef.current.rotation.y = state.clock.elapsedTime * 0.5 + mouse.x * 0.3
      const scrollInfluence = scrollY * 0.0008
      leftCubeRef.current.position.y = 0 + scrollInfluence * 0.5
    }

    // Right cube responds to mouse and scroll
    if (rightCubeRef.current) {
      rightCubeRef.current.rotation.x = state.clock.elapsedTime * 1.2 + mouse.y * 0.4
      rightCubeRef.current.rotation.z = state.clock.elapsedTime * 0.7 + mouse.x * 0.2
      const scrollInfluence = scrollY * 0.001
      rightCubeRef.current.position.y = -3 + scrollInfluence * 0.3
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />

      {/* Stars background with animation */}
      <group ref={starsRef}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </group>

      {/* Twinkling Stars */}
      {twinklingStars.map((star) => (
        <mesh key={star.id} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={star.brightness}
          />
        </mesh>
      ))}

      {/* Orbiting Comets */}
      {comets.map((comet) => (
        <group key={comet.id} position={[comet.x, comet.y, comet.z]}>
          {/* Main comet body */}
          <mesh>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshBasicMaterial
              color="#4fc3f7"
              transparent
              opacity={comet.life / comet.maxLife}
            />
          </mesh>
          {/* Comet tail */}
          <mesh position={[-1, 0, 0]}>
            <coneGeometry args={[0.2, 2, 8]} />
            <meshBasicMaterial
              color="#81d4fa"
              transparent
              opacity={(comet.life / comet.maxLife) * 0.7}
            />
          </mesh>
          {/* Inner glow */}
          <mesh>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={(comet.life / comet.maxLife) * 0.8}
            />
          </mesh>
        </group>
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => {
        const progress = 1 - (star.life / star.maxLife)
        const currentX = star.startX + progress * star.speed * 50
        const currentY = star.startY + progress * star.speed * 30
        const currentZ = star.startZ - progress * star.speed * 40

        return (
          <group key={star.id} position={[currentX, currentY, currentZ]}>
            {/* Main shooting star */}
            <mesh>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={star.life / star.maxLife}
              />
            </mesh>
            {/* Trail effect */}
            <mesh position={[-2, -1, 2]}>
              <sphereGeometry args={[0.05, 6, 6]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={(star.life / star.maxLife) * 0.6}
              />
            </mesh>
            <mesh position={[-4, -2, 4]}>
              <sphereGeometry args={[0.03, 4, 4]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={(star.life / star.maxLife) * 0.3}
              />
            </mesh>
          </group>
        )
      })}

      {/* Main animated sphere */}
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={mainSphereRef} args={[1, 100, 200]} scale={2.5} position={[0, -2, -2]}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#3b82f6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.5}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>

      {/* Floating geometries */}
      <FloatingGeometry position={[-4, 2, -3]} scale={0.6} color="#8b5cf6" />
      <FloatingGeometry position={[4, -1, -4]} scale={0.8} color="#06d6a0" />
      <FloatingGeometry position={[-2, -3, -2]} scale={0.5} color="#f59e0b" />
      <FloatingGeometry position={[3, 3, -3]} scale={0.7} color="#ef4444" />

      {/* Animated torus */}
      <AnimatedTorus position={[2, -2, -3]} color="#6366f1" />
      <AnimatedTorus position={[-3, 1, -4]} color="#ec4899" />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Additional floating cubes */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.5}>
        <Box ref={leftCubeRef} position={[-5, 0, -5]} scale={0.3}>
          <MeshDistortMaterial
            color="#10b981"
            distort={0.4 + Math.abs(dampedMouse.x) * 0.1}
            speed={1.2 + Math.abs(dampedMouse.y) * 1}
            roughness={0.3}
            metalness={0.7}
          />
        </Box>
      </Float>

      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.8}>
        <Box ref={rightCubeRef} position={[5, -3, -6]} scale={0.4}>
          <MeshDistortMaterial
            color="#f97316"
            distort={0.3 + Math.abs(dampedMouse.x) * 0.15}
            speed={1.8 + Math.abs(dampedMouse.y) * 1.25}
            roughness={0.2}
            metalness={0.8}
          />
        </Box>
      </Float>

      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

const Hero = () => {
  const yearsOfExperience = calculateYearsOfExperience();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.addEventListener('mouseenter', handleMouseEnter)
      heroSection.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (heroSection) {
        heroSection.removeEventListener('mouseenter', handleMouseEnter)
        heroSection.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-200 ease-out"
        style={{
          left: `${(mousePosition.x + 1) * 50}%`,
          top: `${(-mousePosition.y + 1) * 50}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div
          className={`w-4 h-4 bg-blue-400 rounded-full opacity-60 blur-sm transition-all duration-300 ${
            isHovering ? 'scale-150 opacity-80' : 'scale-100'
          }`}
        />
        <div
          className={`absolute inset-0 w-4 h-4 bg-blue-300 rounded-full transition-all duration-300 ${
            isHovering ? 'scale-200 opacity-40' : 'scale-125 opacity-30'
          }`}
        />
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900" />

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<CanvasLoader />}>
          <Hero3DScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
            Full-Stack Developer &<br />
            <span className="text-primary-400 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Digital Solutions Expert
            </span>
          </h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Results-driven software developer with{" "}
            <span className="text-blue-400 font-semibold">{yearsOfExperience}+ years</span>{" "}
            of experience in full-stack development using{" "}
            <span className="text-purple-400 font-medium">PHP</span>,{" "}
            <span className="text-green-400 font-medium">SQL</span>,{" "}
            <span className="text-yellow-400 font-medium">Python</span>,{" "}
            <span className="text-pink-400 font-medium">Web3</span>,{" "}
            <span className="text-orange-400 font-medium">JavaScript</span>, and{" "}
            <span className="text-cyan-400 font-medium">Flutter</span>.{" "}
            Passionate about building{" "}
            <span className="text-emerald-400 font-medium">scalable applications</span>{" "}
            and{" "}
            <span className="text-indigo-400 font-medium">innovative AI solutions</span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="https://subrata0ghosh.github.io/cv-project/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              View Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
