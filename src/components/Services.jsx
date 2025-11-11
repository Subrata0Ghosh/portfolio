import { motion } from 'framer-motion'
import { FaCode, FaMobileAlt, FaDatabase, FaRobot, FaCloud, FaPaintBrush } from 'react-icons/fa'

const Services = () => {
  const services = [
    {
      icon: <FaCode size={40} />,
      title: "Full-Stack Web Development",
      description: "Complete web solutions using PHP, Python, JavaScript, and modern frameworks. From concept to deployment.",
      technologies: ["PHP", "Python", "JavaScript", "React", "Node.js"]
    },
    {
      icon: <FaMobileAlt size={40} />,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications with Flutter. Native performance with single codebase approach.",
      technologies: ["Flutter", "Dart", "Android", "iOS", "Firebase"]
    },
    {
      icon: <FaDatabase size={40} />,
      title: "Database Design & API Development",
      description: "Robust database architecture and RESTful APIs. SQL and NoSQL solutions for scalable applications.",
      technologies: ["MySQL", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"]
    },
    {
      icon: <FaRobot size={40} />,
      title: "AI & Machine Learning Solutions",
      description: "Intelligent applications using AI/ML technologies. Chatbots, data analysis, and automation solutions.",
      technologies: ["Python", "TensorFlow", "NLP", "Computer Vision", "Automation"]
    },
    {
      icon: <FaCloud size={40} />,
      title: "Web3 & Blockchain Development",
      description: "Decentralized applications and blockchain solutions. Smart contracts and crypto integrations.",
      technologies: ["Web3.js", "Solidity", "Ethereum", "Smart Contracts", "DeFi"]
    },
    {
      icon: <FaPaintBrush size={40} />,
      title: "UI/UX Design & 3D Graphics",
      description: "Beautiful user interfaces and 3D visualizations. Modern design principles with cutting-edge graphics.",
      technologies: ["Figma", "Three.js", "React Three Fiber", "UI/UX", "3D Design"]
    }
  ]

  return (
    <section id="services" className="section-padding bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-primary-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional development services tailored to your business needs. From concept to deployment, I deliver quality solutions that drive results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-glass rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all duration-300 group"
            >
              <div className="text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-8">
            Ready to start your project? Let's discuss your requirements and create something amazing together.
          </p>
          <a href="#contact" className="btn-primary">
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
