import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Solutions",
      company: "TechStart Solutions",
      content: "Subrata delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise helped us achieve a 40% increase in online sales within the first quarter.",
      rating: 5,
      project: "E-commerce Platform"
    },
    {
      name: "Michael Chen",
      position: "Product Manager",
      company: "InnovateLabs",
      content: "Working with Subrata on our AI-powered analytics dashboard was outstanding. He not only built a robust solution but also provided valuable insights that improved our product strategy.",
      rating: 5,
      project: "AI Analytics Dashboard"
    },
    {
      name: "Emily Rodriguez",
      position: "Founder",
      company: "MobileFirst Apps",
      content: "Subrata's Flutter expertise helped us launch our mobile app 2 months ahead of schedule. The app's performance and user experience have been praised by all our users.",
      rating: 5,
      project: "Cross-platform Mobile App"
    },
    {
      name: "David Kumar",
      position: "CTO",
      company: "BlockChain Ventures",
      content: "The Web3 marketplace Subrata developed for us is both technically sound and user-friendly. His understanding of blockchain technology and security best practices is impressive.",
      rating: 5,
      project: "Web3 NFT Marketplace"
    }
  ]

  return (
    <section id="testimonials" className="section-padding bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-primary-400">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what clients and partners have to say about working with me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-glass rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <FaQuoteLeft size={24} className="text-primary-400 mr-3" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" size={16} />
                  ))}
                </div>
              </div>

              <blockquote className="text-gray-300 mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              <div className="border-t border-gray-700 pt-4">
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-primary-400 text-sm">{testimonial.position}</div>
                <div className="text-gray-400 text-sm">{testimonial.company}</div>
                <div className="text-gray-500 text-xs mt-1">Project: {testimonial.project}</div>
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
            Ready to join these satisfied clients? Let's discuss your project today.
          </p>
          <a href="#contact" className="btn-primary">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
