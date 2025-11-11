import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Box, Torus, Octahedron, Icosahedron, Ring, Stars } from '@react-three/drei'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaGlobe, FaYoutube, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { SiFreelancer, SiUpwork } from 'react-icons/si'
import { Suspense } from 'react'
import emailjs from '@emailjs/browser'
import * as THREE from 'three'

const FloatingRing = ({ position, color, ringRef }) => {
  const ringRefInternal = useRef()

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
      <Ring ref={ringRef || ringRefInternal} position={position} args={[1, 1.5, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </Ring>
    </Float>
  )
}

const PulsingSphere = ({ position, color, sphereRef }) => {
  const sphereRefInternal = useRef()

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
      <Sphere ref={sphereRef || sphereRefInternal} position={position} args={[0.8, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  )
}

const TwistingTorus = ({ position, color, torusRef }) => {
  const torusRefInternal = useRef()

  return (
    <Float speed={2.2} rotationIntensity={1.5} floatIntensity={2}>
      <Torus ref={torusRef || torusRefInternal} position={position} args={[0.6, 0.3, 16, 32]}>
        <MeshDistortMaterial
          color={color}
          distort={0.5}
          speed={2.5}
          roughness={0.1}
          metalness={0.8}
        />
      </Torus>
    </Float>
  )
}

const Contact3DScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 60 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <Contact3DSceneInner />
      </Suspense>
    </Canvas>
  )
}

const Contact3DSceneInner = () => {
  const mainSphereRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const sphere1Ref = useRef()
  const sphere2Ref = useRef()
  const torusRef = useRef()
  const octaRef = useRef()
  const icoRef = useRef()
  const cube1Ref = useRef()
  const cube2Ref = useRef()
  const { mouse } = useThree()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    // Scroll-based effects for all objects
    const scrollInfluence = scrollY * 0.0003

    if (mainSphereRef.current) {
      mainSphereRef.current.rotation.y = state.clock.elapsedTime * 0.1 + mouse.x * 0.2
      mainSphereRef.current.rotation.x = mouse.y * 0.1
      mainSphereRef.current.position.y = -1 + scrollInfluence
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.3 + mouse.y * 0.1
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.5 + mouse.x * 0.1
      ring1Ref.current.position.y = 2 + scrollInfluence * 0.5
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.4 + mouse.y * 0.15
      ring2Ref.current.rotation.z = state.clock.elapsedTime * 0.3 + mouse.x * 0.08
      ring2Ref.current.position.y = -1 + scrollInfluence * 0.3
    }

    if (sphere1Ref.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9
      sphere1Ref.current.scale.setScalar(pulse + Math.abs(mouse.x) * 0.1)
      sphere1Ref.current.position.y = 1.5 + scrollInfluence * 0.4
    }

    if (sphere2Ref.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2.5) * 0.08 + 0.9
      sphere2Ref.current.scale.setScalar(pulse + Math.abs(mouse.y) * 0.1)
      sphere2Ref.current.position.y = -1.5 + scrollInfluence * 0.6
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 1.2 + mouse.y * 0.1
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.8 + mouse.x * 0.05
      torusRef.current.position.y = -2 + scrollInfluence * 0.2
    }

    if (octaRef.current) {
      octaRef.current.rotation.y = state.clock.elapsedTime * 0.8 + mouse.x * 0.2
      octaRef.current.position.y = 1 + scrollInfluence * 0.7
    }

    if (icoRef.current) {
      icoRef.current.rotation.x = state.clock.elapsedTime * 0.6 + mouse.y * 0.15
      icoRef.current.rotation.z = state.clock.elapsedTime * 0.9 + mouse.x * 0.1
      icoRef.current.position.y = -2 + scrollInfluence * 0.8
    }

    if (cube1Ref.current) {
      cube1Ref.current.rotation.x = state.clock.elapsedTime * 0.7 + mouse.y * 0.1
      cube1Ref.current.rotation.y = state.clock.elapsedTime * 0.5 + mouse.x * 0.08
      cube1Ref.current.position.y = 3 + scrollInfluence * 0.3
    }

    if (cube2Ref.current) {
      cube2Ref.current.rotation.x = state.clock.elapsedTime * 1.1 + mouse.y * 0.12
      cube2Ref.current.rotation.z = state.clock.elapsedTime * 0.6 + mouse.x * 0.06
      cube2Ref.current.position.y = -3 + scrollInfluence * 0.5
    }
  })

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#60a5fa" />
      <spotLight position={[0, 5, 0]} angle={0.4} penumbra={1} intensity={0.8} />

      {/* Stars background */}
      <Stars radius={80} depth={40} count={4000} factor={3} saturation={0} fade speed={0.5} />

      {/* Main floating sphere */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere ref={mainSphereRef} args={[1.2, 100, 200]} scale={1.8} position={[0, -1, -1]}>
          <MeshDistortMaterial
            color="#3b82f6"
            attach="material"
            distort={0.4 + Math.abs(mouse.x) * 0.2}
            speed={1.5 + Math.abs(mouse.y) * 2}
            roughness={0.2}
            metalness={0.4}
          />
        </Sphere>
      </Float>

      {/* Floating rings */}
      <FloatingRing position={[-3, 2, -2]} color="#8b5cf6" ringRef={ring1Ref} />
      <FloatingRing position={[3, -1, -3]} color="#06d6a0" ringRef={ring2Ref} />

      {/* Pulsing spheres */}
      <PulsingSphere position={[2, 1.5, -2.5]} color="#f59e0b" sphereRef={sphere1Ref} />
      <PulsingSphere position={[-2, -1.5, -2]} color="#ef4444" sphereRef={sphere2Ref} />

      {/* Twisting torus */}
      <TwistingTorus position={[0, -2, -3]} color="#ec4899" torusRef={torusRef} />

      {/* Additional floating elements */}
      <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.2}>
        <Octahedron ref={octaRef} position={[4, 1, -4]} args={[1, 0]} scale={0.8}>
          <MeshDistortMaterial
            color="#10b981"
            distort={0.3 + Math.abs(mouse.x) * 0.1}
            speed={1.8 + Math.abs(mouse.y) * 1.5}
            roughness={0.2}
            metalness={0.7}
          />
        </Octahedron>
      </Float>

      <Float speed={2.5} rotationIntensity={1.8} floatIntensity={2.2}>
        <Icosahedron ref={icoRef} position={[-4, -2, -5]} args={[1, 0]} scale={0.6}>
          <MeshDistortMaterial
            color="#f97316"
            distort={0.4 + Math.abs(mouse.x) * 0.15}
            speed={2.2 + Math.abs(mouse.y) * 2}
            roughness={0.1}
            metalness={0.9}
          />
        </Icosahedron>
      </Float>

      {/* Floating cubes */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.6}>
        <Box ref={cube1Ref} position={[1, 3, -3]} scale={0.4}>
          <MeshDistortMaterial
            color="#6366f1"
            distort={0.5 + Math.abs(mouse.x) * 0.2}
            speed={2.8 + Math.abs(mouse.y) * 3}
            roughness={0.3}
            metalness={0.5}
          />
        </Box>
      </Float>

      <Float speed={2.1} rotationIntensity={1.4} floatIntensity={1.9}>
        <Box ref={cube2Ref} position={[-1, -3, -4]} scale={0.5}>
          <MeshDistortMaterial
            color="#84cc16"
            distort={0.6 + Math.abs(mouse.x) * 0.25}
            speed={3.2 + Math.abs(mouse.y) * 2.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Box>
      </Float>
    </>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // EmailJS configuration - using environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please check your .env file.')
      }

      // Prepare email data
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        to_email: 'technorchid.dev@gmail.com'
      }

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, emailData, publicKey)

      // Success
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      })

    } catch (error) {
      console.error('Email send failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'subrataghosh6799@gmail.com',
      href: 'mailto:subrataghosh6799@gmail.com'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+91 90732 09390',
      href: 'tel:+919073209390'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Kalyani, West Bengal, India',
      href: '#'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gray-800 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-10">
        <Contact3DScene />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your <span className="text-primary-400">Project</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business with cutting-edge technology? Let's discuss your project requirements and create a solution that drives results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-glass rounded-xl p-6 sm:p-8 border border-gray-700"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Project Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 text-base"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 text-base"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white text-base"
                >
                  <option value="">Select Project Type</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="ai-ml">AI/ML Solution</option>
                  <option value="web3-blockchain">Web3/Blockchain</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="database-api">Database & API Development</option>
                  <option value="consulting">Technical Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white text-base"
                  >
                    <option value="">Select Budget</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="over-50k">Over $50,000</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white text-base"
                  >
                    <option value="">Select Timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 text-base resize-none"
                  placeholder="Describe your project requirements, goals, and any specific features needed..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg py-3 sm:py-4"
              >
                {isSubmitting ? 'Sending...' : 'Submit Project Inquiry'}
              </motion.button>
            </form>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3"
              >
                <FaCheckCircle className="text-green-400 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-green-400 font-medium">Message Sent Successfully!</h4>
                  <p className="text-green-300 text-sm">Thank you for your inquiry. I'll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3"
              >
                <FaExclamationCircle className="text-red-400 flex-shrink-0" size={20} />
                <div>
                  <h4 className="text-red-400 font-medium">Failed to Send Message</h4>
                  <p className="text-red-300 text-sm">Please try again or contact me directly at technorchid.dev@gmail.com</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-6 lg:mb-8 text-base sm:text-lg">
                I'm always open to discussing new opportunities and exciting projects. Whether you need a full-stack solution, mobile app development, or AI-powered features, let's connect and explore how we can work together.
              </p>
            </div>

            <div className="space-y-4 lg:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 lg:space-x-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400">
                    {info.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-white text-sm lg:text-base">{info.label}</h4>
                    <a
                      href={info.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm lg:text-base break-all"
                    >
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 lg:pt-8 border-t border-gray-700">
              <h4 className="font-medium text-white mb-3 lg:mb-4 text-sm lg:text-base">Connect With Me</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-7 gap-3 lg:gap-4">
                <a
                  href="https://github.com/Subrata0Ghosh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all group"
                >
                  <FaGithub size={20} className="text-gray-400 group-hover:text-primary-400 mb-1" />
                  <span className="text-xs text-gray-400 group-hover:text-primary-400">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/subrata0ghosh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all group"
                >
                  <FaLinkedin size={20} className="text-gray-400 group-hover:text-primary-400 mb-1" />
                  <span className="text-xs text-gray-400 group-hover:text-primary-400">LinkedIn</span>
                </a>
                <a
                  href="https://www.freelancer.in/u/Asus1234?sb=t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all group"
                >
                  <SiFreelancer size={20} className="text-gray-400 group-hover:text-primary-400 mb-1" />
                  <span className="text-xs text-gray-400 group-hover:text-primary-400">Freelancer</span>
                </a>
                <a
                  href="https://www.upwork.com/freelancers/~01e62667811170b7bd?mp_source=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all group"
                >
                  <SiUpwork size={20} className="text-gray-400 group-hover:text-primary-400 mb-1" />
                  <span className="text-xs text-gray-400 group-hover:text-primary-400">Upwork</span>
                </a>
                <a
                  href="/Subrata Ghosh - Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all group"
                >
                  <FaGlobe size={20} className="text-gray-400 group-hover:text-primary-400 mb-1" />
                  <span className="text-xs text-gray-400 group-hover:text-primary-400">Resume</span>
                </a>
                <a
                  href="https://www.youtube.com/@technorchid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-2 lg:p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all group"
                >
                  <FaYoutube size={20} className="text-gray-400 group-hover:text-primary-400 mb-1" />
                  <span className="text-xs text-gray-400 group-hover:text-primary-400">YouTube</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
