import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { submitContactMessage } from '../services/firebase';
import { useContent } from '../context/ContentContext';

export function ContactForm() {
  const { content } = useContent();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      await submitContactMessage(formData);
      setStatus('success'); setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }
  return <section id="contact" className="section-wrap contact-section">
    <div className="contact-copy"><p className="eyebrow">Get in touch</p><h2>Have something in mind?</h2><p>For software projects, product conversations or a useful introduction, send me a note.</p><a className="contact-email" href={`mailto:${content.social.email}`}>{content.social.email}</a><div className="contact-social"><a href={content.social.github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={content.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div>
    <div className="contact-panel">{status === 'success' ? <div className="contact-success" role="status"><p className="eyebrow">Thank you</p><h3>Message sent.</h3><p>Your message has been saved. You can also reach me directly by email.</p><button type="button" className="button button-secondary" onClick={() => setStatus('idle')}>Write another message</button></div> : <form onSubmit={handleSubmit}>
      <div className="contact-fields"><label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required value={formData.name} disabled={status === 'submitting'} onChange={event => setFormData({ ...formData, name: event.target.value })} /></label><label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required value={formData.email} disabled={status === 'submitting'} onChange={event => setFormData({ ...formData, email: event.target.value })} /></label></div>
      <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" rows={5} required value={formData.message} disabled={status === 'submitting'} onChange={event => setFormData({ ...formData, message: event.target.value })} /></label>
      {status === 'error' && <p role="alert" className="form-error">Your message could not be sent. Your draft is kept. Try again or email me directly.</p>}
      <button type="submit" className="button button-primary" disabled={status === 'submitting'}>{status === 'submitting' && <Loader2 className="animate-spin" size={18} aria-hidden="true" />}{status === 'submitting' ? 'Sending…' : 'Send message'}</button>
    </form>}</div>
  </section>;
}
