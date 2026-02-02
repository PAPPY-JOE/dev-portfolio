import React, { useState } from 'react'
import { Send, Loader2, AlertCircle } from 'lucide-react'
import { submitContactMessage } from '../services/firebase'
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        message: '',
      })
      // Reset to idle after showing success
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      setErrorMessage(
        'Failed to send message. Please try again or email directly.',
      )
      // Reset to idle after showing error
      setTimeout(() => setStatus('idle'), 5000)
    }
  }
  return (
    <section id="contact" className="py-20 px-4 max-w-2xl mx-auto">
      <div className="mb-12 text-center font-mono">
        <h2 className="text-3xl font-bold text-terminal-text mb-4">
          <span className="text-accent-green">./contact-me.sh</span>
        </h2>
        <p className="text-terminal-muted">
          Execute the form below to initialize communication protocol.
        </p>
      </div>

      <div className="bg-terminal-card border border-terminal-border rounded-lg p-8 shadow-xl relative overflow-hidden">
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 rounded-full bg-accent-green/20 flex items-center justify-center mb-4">
              <Send className="text-accent-green" size={32} />
            </div>
            <h3 className="text-xl font-mono text-accent-green mb-2">
              Message Transmitted!
            </h3>
            <p className="text-terminal-muted font-mono text-sm">
              I will respond to your signal shortly.
            </p>
            <div className="mt-4 text-xs text-terminal-muted font-mono">
              <span className="text-accent-blue">status:</span> delivered ✓
            </div>
          </div>
        ) : status === 'error' ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 rounded-full bg-accent-red/20 flex items-center justify-center mb-4">
              <AlertCircle className="text-accent-red" size={32} />
            </div>
            <h3 className="text-xl font-mono text-accent-red mb-2">
              Transmission Failed
            </h3>
            <p className="text-terminal-muted font-mono text-sm max-w-xs">
              {errorMessage}
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-accent-blue hover:underline font-mono text-sm"
            >
              Try again →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-mono">
            <div>
              <label className="block text-accent-blue text-sm mb-2">
                <span className="text-accent-purple">const</span> name{' '}
                <span className="text-terminal-text">=</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-terminal-muted">
                  &gt;
                </span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  disabled={status === 'submitting'}
                  className="w-full bg-terminal-black border border-terminal-border rounded p-3 pl-8 text-terminal-text focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green transition-all disabled:opacity-50"
                  placeholder="Enter your name..."
                />
              </div>
            </div>

            <div>
              <label className="block text-accent-blue text-sm mb-2">
                <span className="text-accent-purple">const</span> email{' '}
                <span className="text-terminal-text">=</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-terminal-muted">
                  &gt;
                </span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  disabled={status === 'submitting'}
                  className="w-full bg-terminal-black border border-terminal-border rounded p-3 pl-8 text-terminal-text focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green transition-all disabled:opacity-50"
                  placeholder="Enter your email..."
                />
              </div>
            </div>

            <div>
              <label className="block text-accent-blue text-sm mb-2">
                <span className="text-accent-purple">const</span> message{' '}
                <span className="text-terminal-text">=</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-terminal-muted">
                  &gt;
                </span>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  disabled={status === 'submitting'}
                  className="w-full bg-terminal-black border border-terminal-border rounded p-3 pl-8 text-terminal-text focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green transition-all resize-none disabled:opacity-50"
                  placeholder="Type your message..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-accent-blue/10 hover:bg-accent-blue/20 disabled:hover:bg-accent-blue/10 text-accent-blue border border-accent-blue/50 py-3 rounded transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-70"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span>Execute Send</span>
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
} 