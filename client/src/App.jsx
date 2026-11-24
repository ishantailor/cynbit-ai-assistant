
import { useState } from 'react'
import {
  ArrowRight,
  Bot,
  Menu,
  X,
  Code2,
  BrainCircuit,
  Cloud,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react'

const services = [
  {
    icon: <Code2 size={28} />,
    title: 'Software Development',
    description: 'Custom software solutions designed to help businesses grow and operate efficiently.',
  },
  {
    icon: <BrainCircuit size={28} />,
    title: 'AI & Automation',
    description: 'Intelligent AI solutions and automation to simplify business processes.',
  },
  {
    icon: <Cloud size={28} />,
    title: 'Cloud Solutions',
    description: 'Scalable cloud technologies for modern digital businesses.',
  },
]

function App() {
 const [menuOpen, setMenuOpen] = useState(false)
const [chatOpen, setChatOpen] = useState(false)

const [messages, setMessages] = useState([
  {
    role: 'assistant',
    content: "Hi! I'm your Cynbit AI assistant. I can help you learn about our services, products and solutions. What would you like to know?"
  }
])

const [input, setInput] = useState('')
const [loading, setLoading] = useState(false)


const handleSend = async () => {
  const message = input.trim()

  if (!message || loading) return

  const history = messages.map(({ role, content }) => ({
    role,
    content
  }))

  setMessages(prev => [
    ...prev,
    { role: 'user', content: message }
  ])

  setInput('')
  setLoading(true)

  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        history
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong')
    }

    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: data.reply }
    ])

  } catch (error) {
    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        content: error.message || 'Unable to connect. Please try again.'
      }
    ])
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#080b14]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#home" className="text-2xl font-bold tracking-wide">
            cynbit<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm text-gray-300 hover:text-cyan-400">Home</a>
            <a href="#services" className="text-sm text-gray-300 hover:text-cyan-400">Services</a>
            <a href="#about" className="text-sm text-gray-300 hover:text-cyan-400">About</a>
            <a href="#contact" className="text-sm text-gray-300 hover:text-cyan-400">Contact</a>
          </div>

          <a href="#contact" className="hidden rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 md:block">
            Let's Talk <ArrowRight className="ml-2 inline" size={16} />
          </a>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-5 border-t border-white/10 px-6 py-5 md:hidden">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-28 md:grid-cols-2 md:py-36">
          <div>
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <Sparkles size={15} /> Innovation meets intelligence
            </span>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Building the
              <span className="block text-cyan-400">Future with</span>
              Technology.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
              Transforming ideas into intelligent digital solutions through
              software development, AI innovation and automation.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#services" className="rounded-full bg-cyan-400 px-7 py-4 font-semibold text-black transition hover:bg-cyan-300">
                Explore Services <ArrowRight className="ml-2 inline" size={18} />
              </a>

              <a href="#contact" className="rounded-full border border-white/20 px-7 py-4 font-semibold transition hover:border-cyan-400">
                Get in Touch
              </a>
            </div>
          </div>

          <div className="relative flex min-h-[350px] items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full border border-cyan-400/20" />
            <div className="absolute h-56 w-56 rounded-full border border-cyan-400/30" />
            <div className="flex h-40 w-40 items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10 shadow-2xl shadow-cyan-500/20">
              <BrainCircuit size={90} className="text-cyan-300" />
            </div>
            <div className="absolute bottom-8 right-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
              <p className="text-sm text-gray-400">Technology</p>
              <p className="font-semibold text-cyan-300">Beyond Limits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/10 bg-[#0d1220] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">What We Do</p>
            <h2 className="text-4xl font-bold md:text-5xl">Our Services</h2>
            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              Technology-driven solutions designed to solve real business challenges.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-2 hover:border-cyan-400/50">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  {service.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold">{service.title}</h3>
                <p className="leading-7 text-gray-400">{service.description}</p>
                <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">About Cynbit</p>
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              Turning Ideas Into Digital Reality
            </h2>
          </div>
          <div>
            <p className="leading-8 text-gray-400">
              We believe technology should make businesses smarter, faster
              and more efficient. Through innovative software, intelligent
              automation and modern digital solutions, we help businesses
              move forward.
            </p>
            <a href="#contact" className="mt-7 inline-flex items-center gap-2 font-semibold text-cyan-400">
              Connect With Us <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#0d1220] px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-transparent p-10 text-center md:p-16">
          <h2 className="text-4xl font-bold">Have a Project in Mind?</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
            Let's discuss your ideas and explore how technology can help
            your business grow.
          </p>
          <a href="mailto:info@cynbit.in" className="mt-8 inline-block rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black hover:bg-cyan-300">
            Contact Our Team
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Cynbit AI Assistant Prototype. Built for demonstration.
      </footer>

      {/* AI Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="mb-4 w-[min(350px,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#111827] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-600 p-4">
              <div className="flex items-center gap-3">
                <Bot size={25} />
                <div>
                  <p className="font-semibold">Cynbit AI Assistant</p>
                  <p className="text-xs text-white/80">Here to help you</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)}><X size={20} /></button>
            </div>

         
<div className="flex max-h-80 min-h-48 flex-col gap-3 overflow-y-auto p-4">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`max-w-[90%] rounded-xl p-3 text-sm leading-6 ${
        msg.role === 'user'
          ? 'ml-auto bg-cyan-500 text-black'
          : 'mr-auto bg-white/5 text-gray-200'
      }`}
    >
      {msg.content}
    </div>
  ))}

  {loading && (
    <div className="mr-auto rounded-xl bg-white/5 p-3 text-sm text-cyan-300">
      AI is thinking...
    </div>
  )}
</div>

<div className="flex items-center gap-2 border-t border-white/10 p-3">
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') handleSend()
    }}
    placeholder="Ask me anything..."
    disabled={loading}
    className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-cyan-400"
  />

  <button
    onClick={handleSend}
    disabled={loading || !input.trim()}
    className="rounded-lg bg-cyan-400 p-3 text-black transition hover:bg-cyan-300 disabled:opacity-40"
  >
    <Send size={17} />
  </button>
</div>

            {/* <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                placeholder="Ask me anything..."
                className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-3 text-sm outline-none"
                disabled
              />
              <button disabled className="rounded-lg bg-cyan-500 p-3 text-black opacity-50">
                <Send size={17} />
              </button>
            </div> */}
            <p className="pb-3 text-center text-xs text-gray-500">AI integration coming next</p>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-black shadow-xl shadow-cyan-500/30 transition hover:scale-110"
          aria-label="Open AI assistant"
        >
          {chatOpen ? <X size={27} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </div>
  )
}

export default App
