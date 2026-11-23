import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Check,
  Copy,
  Download,
  Gamepad2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { TiltCard3D } from './TiltCard3D';

export const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        PROFILE.emailjs.serviceId,
        PROFILE.emailjs.templateId,
        formRef.current,
        { publicKey: PROFILE.emailjs.publicKey }
      );
      setStatus({
        type: 'success',
        text: 'Transmission received! Your message was sent directly to Tharindu.',
      });
      formRef.current.reset();
    } catch {
      setStatus({
        type: 'error',
        text: 'Direct relay unavailable right now — please email tharindu2003hs@gmail.com directly or try again.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] text-[#D4FF24] mb-3">
              05 // OPEN COMMS CHANNEL
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-none">
              <span className="font-serif italic text-[#D4FF24] font-semibold mr-3">Contact</span>
              <span className="font-display text-white">Me</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3C2] font-mono">
            Looking for a Unity Game Developer, Mobile/Web builder, or creative collaborator? Let&apos;s
            build something unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Direct Comms & Social Portals */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <TiltCard3D className="rounded-3xl flex-1" maxTilt={5} glowColor="cobalt">
              <div className="glass-panel rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between gap-7 hud-bracket">
                <div className="space-y-5">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Let&apos;s Launch Your Next Project
                  </h3>
                  <p className="text-sm text-[#A9B9D8] leading-relaxed">
                    Open to game development internships, freelance Unity 2D/3D prototypes, mobile
                    applications, and creative collaborations.
                  </p>

                  <div className="space-y-3">
                    {/* Email Card with Copy Button */}
                    <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#070E1E] border border-[#1558C9]/40">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#1558C9]/25 border border-[#1558C9]/60 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-[#D4FF24]" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[#7E94BE]">
                            Email
                          </div>
                          <a
                            href={`mailto:${PROFILE.email}`}
                            className="text-sm font-medium text-white hover:text-[#D4FF24] truncate block"
                          >
                            {PROFILE.email}
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-[10px] uppercase tracking-wider text-[#D4FF24] hover:bg-[#D4FF24] hover:text-[#030407] transition-colors shrink-0 inline-flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#070E1E] border border-[#1558C9]/30">
                      <div className="w-10 h-10 rounded-xl bg-[#1558C9]/20 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-[#D4FF24]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#7E94BE]">
                          Phone / WhatsApp
                        </div>
                        <a
                          href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                          className="text-sm font-medium text-white hover:text-[#D4FF24]"
                        >
                          {PROFILE.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#070E1E] border border-[#1558C9]/30">
                      <div className="w-10 h-10 rounded-xl bg-[#1558C9]/20 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#D4FF24]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#7E94BE]">
                          Location
                        </div>
                        <div className="text-sm font-medium text-white">{PROFILE.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#070E1E] border border-[#1558C9]/30">
                      <div className="w-10 h-10 rounded-xl bg-[#1558C9]/20 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-[#D4FF24]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-[#7E94BE]">
                          Education &amp; Honours
                        </div>
                        <div className="text-sm font-medium text-white">
                          BSc (Hons) Computer Science (Second Class Upper) — SLIIT City UNI
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Portals Grid */}
                <div className="pt-5 border-t border-white/10 space-y-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7E94BE]">
                    CONNECT ACROSS PLATFORMS
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { label: 'GitHub', href: PROFILE.socials.github, icon: Github },
                      { label: 'LinkedIn', href: PROFILE.socials.linkedin, icon: Linkedin },
                      { label: 'itch.io', href: PROFILE.socials.itch, icon: Gamepad2 },
                    ].map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#091328] border border-[#1558C9]/45 text-xs font-mono text-[#D5E1FA] hover:bg-[#D4FF24] hover:text-[#030407] hover:border-[#D4FF24] transition-all"
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {s.label}
                        </a>
                      );
                    })}
                    <a
                      href={PROFILE.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#D4FF24]/15 border border-[#D4FF24]/50 text-xs font-mono text-[#D4FF24] hover:bg-[#D4FF24] hover:text-[#030407] transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      CV PDF
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* RIGHT: Futuristic EmailJS Message Terminal */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-9 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4FF24]">
                    DIRECT TRANSMISSION
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                    Send a Message
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#7FAFFF]">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF24] animate-pulse" />
                  ONLINE
                </span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="from_name"
                      className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#8DA3CC] mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#060B17] border border-[#1558C9]/40 text-white placeholder-[#52658A] focus:outline-none focus:border-[#D4FF24] transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="from_email"
                      className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#8DA3CC] mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      required
                      placeholder="you@studio.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#060B17] border border-[#1558C9]/40 text-white placeholder-[#52658A] focus:outline-none focus:border-[#D4FF24] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#8DA3CC] mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Unity 3D Project / Game Dev Opportunity"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#060B17] border border-[#1558C9]/40 text-white placeholder-[#52658A] focus:outline-none focus:border-[#D4FF24] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[#8DA3CC] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your game, app, or collaboration idea..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#060B17] border border-[#1558C9]/40 text-white placeholder-[#52658A] focus:outline-none focus:border-[#D4FF24] transition-colors resize-none"
                  />
                </div>

                {status && (
                  <div
                    className={`p-4 rounded-xl font-mono text-xs border ${
                      status.type === 'success'
                        ? 'bg-[#D4FF24]/10 border-[#D4FF24]/50 text-[#D4FF24]'
                        : 'bg-red-500/10 border-red-400/50 text-red-300'
                    }`}
                  >
                    {status.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D4FF24] text-[#030407] font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all hover:bg-[#E4FF6E] hover:scale-[1.02] disabled:opacity-60 acid-glow"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Transmitting...' : 'Send Transmission'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
