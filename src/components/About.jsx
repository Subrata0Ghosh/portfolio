import { motion } from 'framer-motion'
import { FaCode, FaMobile, FaDatabase, FaBrain, FaGlobe } from 'react-icons/fa'
import { useMemo } from 'react'

// Calculate total years of experience dynamically
const calculateYearsOfExperience = () => {
  const experiences = [
    { start: '2023-02-01', end: '2025-08-01' }, // As Softech
    { start: '2020-06-01', end: '2020-10-01' }  // Volstory
  ];

  // Calculate historical experience
  const totalHistoricalMonths = experiences.reduce((total, exp) => {
    const startDate = new Date(exp.start);
    const endDate = new Date(exp.end);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                   (endDate.getMonth() - startDate.getMonth());
    return total + months;
  }, 0);

  // Add current experience from last work date to today
  const lastWorkEndDate = new Date('2025-08-01'); // Last work end date
  const today = new Date();
  const currentMonths = (today.getFullYear() - lastWorkEndDate.getFullYear()) * 12 +
                        (today.getMonth() - lastWorkEndDate.getMonth());

  const totalMonths = totalHistoricalMonths + Math.max(0, currentMonths);
  const years = totalMonths / 12;

  return Math.ceil(years); // Round up to show more experience
};

const About = () => {
  const yearsOfExperience = useMemo(() => calculateYearsOfExperience(), [])
  const skills = [
    {
      icon: <FaCode />,
      title: "Full-Stack Development",
      description: "Expert in PHP, Python, JavaScript with experience in both frontend and backend development",
      technologies: ["PHP", "Python", "JavaScript", "FastAPI", "Flask"]
    },
    {
      icon: <FaMobile />,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications with Flutter and modern UI/UX practices",
      technologies: ["Flutter", "Dart", "Mobile UI/UX"]
    },
    {
      icon: <FaBrain />,
      title: "AI & Machine Learning",
      description: "Developing AI-powered applications including chatbots, website builders, and intelligent systems",
      technologies: ["OpenAI API", "AI/ML", "Computer Vision", "NLP"]
    },
    {
      icon: <FaDatabase />,
      title: "Database & Web3",
      description: "Proficient in SQL databases and Web3 technologies for blockchain-based applications",
      technologies: ["SQL", "Web3", "Database Design", "Blockchain"]
    },
    {
      icon: <FaGlobe />,
      title: "Web Technologies",
      description: "Creating responsive and interactive web applications with modern frameworks",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    }
  ]

  const experience = [
    {
      company: "As Softech, Kalyani",
      position: "Web Developer",
      period: "Feb 2023 - Aug 2025",
      description: "Developed product-based software using Core PHP, HTML, CSS, JavaScript, Web3, and SQL. Responsible for testing, debugging, and deploying software to production. Completed over 100+ projects."
    },
    {
      company: "Volstory",
      position: "Web Development Intern",
      period: "Jun 2020 - Oct 2020",
      description: "Worked as a volunteer to design a website for 'Indradhanusha Youth Social Foundation' as part of Digital Utsava initiative."
    }
  ]

  const education = {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science & Technology",
    gpa: "9.12",
    university: "Modern Institute Of Engineering And Technology",
    period: "Feb 2019 - Nov 2023"
  }

  return (
    <section id="about" className="section-padding bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary-400">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Results-driven software developer with {yearsOfExperience}+ years of experience delivering high-quality solutions for businesses and startups. Specialized in full-stack development, mobile applications, and AI-powered solutions that drive growth and efficiency.
          </p>
        </motion.div>

        {/* Skills Grid - Reorganized for better visual balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {skills.slice(0, 4).map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-glass rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/70 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                  <div className="text-primary-400 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-primary-300 transition-colors">
                  {skill.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {skill.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {skill.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded-lg text-xs font-medium group-hover:bg-primary-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {skill.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded-lg text-xs font-medium">
                      +{skill.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Skills - Highlight key technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Core Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Flutter', 'React', 'Python', 'PHP', 'Web3', 'AI/ML', 'FastAPI', 'Three.js'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/20 hover:border-primary-500/40 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
        {/*
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-glass rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-primary-400">{exp.position}</h4>
                    <p className="text-gray-300">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400">{exp.period}</span>
                </div>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
        */}

        {/* Education */}
        {/*
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Education</h3>
          <div className="bg-gray-900/50 backdrop-blur-glass rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-lg font-semibold text-primary-400">{education.degree}</h4>
                <p className="text-gray-300">{education.major}</p>
                <p className="text-sm text-gray-400">{education.university}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-400">{education.period}</span>
                <p className="text-primary-400 font-semibold">CGPA: {education.gpa}</p>
              </div>
            </div>
          </div>
        </motion.div>
        */}
        </div>
      </div>
    </section>
  )
}

export default About
