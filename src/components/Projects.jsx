import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Box, Torus, Octahedron, Icosahedron, Tetrahedron } from '@react-three/drei'
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa'
import { Suspense } from 'react'
import * as THREE from 'three'

const RotatingCube = ({ color, isHovered }) => {
  const cubeRef = useRef()

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.8
      cubeRef.current.rotation.y = state.clock.elapsedTime * 1.2
      cubeRef.current.scale.setScalar(isHovered ? 1.3 : 1)
    }
  })

  return (
    <Box ref={cubeRef} args={[1, 1, 1]}>
      <MeshDistortMaterial
        color={color}
        distort={isHovered ? 0.4 : 0.2}
        speed={isHovered ? 3 : 1}
        roughness={0.1}
        metalness={0.8}
      />
    </Box>
  )
}

const SpinningTorus = ({ color, isHovered }) => {
  const torusRef = useRef()

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.5
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.8
      torusRef.current.scale.setScalar(isHovered ? 1.4 : 1)
    }
  })

  return (
    <Torus ref={torusRef} args={[0.6, 0.2, 16, 32]}>
      <MeshDistortMaterial
        color={color}
        distort={isHovered ? 0.5 : 0.3}
        speed={isHovered ? 2.5 : 1.5}
        roughness={0.2}
        metalness={0.7}
      />
    </Torus>
  )
}

const FloatingOctahedron = ({ color, isHovered }) => {
  const octaRef = useRef()

  useFrame((state) => {
    if (octaRef.current) {
      octaRef.current.rotation.y = state.clock.elapsedTime * 0.6
      octaRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2
      octaRef.current.scale.setScalar(isHovered ? 1.5 : 1)
    }
  })

  return (
    <Octahedron ref={octaRef} args={[1, 0]}>
      <MeshDistortMaterial
        color={color}
        distort={isHovered ? 0.6 : 0.3}
        speed={isHovered ? 3.5 : 2}
        roughness={0.1}
        metalness={0.9}
      />
    </Octahedron>
  )
}

const BouncingIcosahedron = ({ color, isHovered }) => {
  const icoRef = useRef()

  useFrame((state) => {
    if (icoRef.current) {
      icoRef.current.rotation.x = state.clock.elapsedTime * 0.7
      icoRef.current.rotation.z = state.clock.elapsedTime * 1.1
      icoRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 0.3
      icoRef.current.scale.setScalar(isHovered ? 1.6 : 1)
    }
  })

  return (
    <Icosahedron ref={icoRef} args={[1, 0]}>
      <MeshDistortMaterial
        color={color}
        distort={isHovered ? 0.7 : 0.4}
        speed={isHovered ? 4 : 2.5}
        roughness={0.2}
        metalness={0.6}
      />
    </Icosahedron>
  )
}

const ProjectCard3D = ({ project, isHovered }) => {
  const getGeometryComponent = () => {
    const geometries = [
      RotatingCube,
      SpinningTorus,
      FloatingOctahedron,
      BouncingIcosahedron
    ]

    // Choose geometry based on project title hash for consistency
    const hash = project.title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const geometryIndex = Math.abs(hash) % geometries.length
    const GeometryComponent = geometries[geometryIndex]

    return <GeometryComponent color={project.color} isHovered={isHovered} />
  }

  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, -3, -3]} intensity={0.5} />
        <Float speed={2} rotationIntensity={isHovered ? 2 : 1} floatIntensity={isHovered ? 3 : 1}>
          {getGeometryComponent()}
        </Float>
      </Suspense>
    </Canvas>
  )
}

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleCardClick = () => {
    if (project.demo && project.demo !== "#") {
      window.open(project.demo, '_blank', 'noopener,noreferrer')
    } else {
      // If no demo link, redirect to GitHub
      window.open(project.github, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-gray-800/50 backdrop-blur-glass rounded-xl overflow-hidden border border-gray-700 hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <ProjectCard3D project={project} isHovered={isHovered} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2">
              {project.title}
            </h3>
            {project.title === "Web3 Product Development" && (
              <FaLock size={16} className="text-yellow-500 flex-shrink-0" title="Private Project" />
            )}
          </div>
          <div className="flex space-x-2 ml-2 flex-shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-400 transition-colors p-1"
              onClick={(e) => e.stopPropagation()}
              aria-label="View on GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={project.demo && project.demo !== "#" ? project.demo : project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-400 transition-colors p-1"
              onClick={(e) => e.stopPropagation()}
              aria-label="View demo"
            >
              <FaExternalLinkAlt size={18} />
            </a>
          </div>
        </div>

        <p className="text-gray-300 mb-4 text-sm sm:text-base line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs sm:text-sm whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-sm w-full sm:w-auto"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          {project.title === "Web3 Product Development" ? "View Profile" : "Learn More"}
        </motion.button>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const projects = [
    {
      title: "Chativio - AI Friend App",
      description: "An offline/online AI friend built with Flutter. Chat naturally, auto-detect events and reminders, and read short motivational stories — all while keeping your data private and local by default.",
      technologies: ["Flutter", "AI/ML", "Dart", "Mobile Development"],
      github: "https://github.com/Subrata0Ghosh/",
      demo: "https://chativio.blogspot.com/",
      color: "#06d6a0"
    },
    {
      title: "AI Website Builder",
      description: "Full-stack project built using FastAPI and OpenAI API, allowing users to generate complete multi-page websites (HTML, CSS, JS) automatically from text descriptions. Includes user authentication, task management, and automatic project zipping.",
      technologies: ["FastAPI", "OpenAI API", "Python", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/Subrata0Ghosh/",
      demo: "https://github.com/Subrata0Ghosh/ai-website-builder",
      color: "#3b82f6"
    },
    {
      title: "Charging Alert App",
      description: "Lightweight Flutter app that monitors device battery level and sends alerts when it reaches a specified percentage. Features simple UI, low memory use, and no unnecessary background processes.",
      technologies: ["Flutter", "Dart", "Mobile Development", "Battery API"],
      github: "https://github.com/Subrata0Ghosh/",
      demo: "https://github.com/Subrata0Ghosh/charge_alert",
      color: "#f59e0b"
    },
    {
      title: "Resume Analyzer & Organizer",
      description: "Web-based tool that handles resumes in PDF and DOCX formats. Extracts essential details, evaluates resumes based on specific criteria, and organizes information into Excel files.",
      technologies: ["Python", "Flask", "PDF Processing", "DOCX Processing", "Excel"],
      github: "https://github.com/Subrata0Ghosh/",
      demo: "https://github.com/Subrata0Ghosh/cv-to-csv-file-converter",
      color: "#8b5cf6"
    },
    {
      title: "Virtual Try-On System",
      description: "Final year project allowing customers to virtually try on shirts, sweaters, coats, and pants. Advanced computer vision and augmented reality technology for realistic virtual fitting.",
      technologies: ["Computer Vision", "AR", "Python", "OpenCV", "Machine Learning"],
      github: "https://github.com/Subrata0Ghosh/",
      demo: "https://github.com/Subrata0Ghosh/vertual-try-on",
      color: "#ef4444"
    },
    {
      title: "Web3 Product Development",
      description: "Developed product-based software using Core PHP, HTML, CSS, JavaScript, Web3, and SQL for enterprise clients. Responsible for testing, debugging, and deploying software to production. Completed over 100+ projects (Private enterprise work - source code not publicly available).",
      technologies: ["PHP", "Web3", "SQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/Subrata0Ghosh/",
      demo: "#", // Private projects - no public demo available
      color: "#6366f1"
    }
  ]

  return (
    <section id="projects" className="section-padding bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-primary-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in web development and 3D design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
