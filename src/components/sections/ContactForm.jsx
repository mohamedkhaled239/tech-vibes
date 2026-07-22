// components/sections/ContactForm.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'

// ── EmailJS config ─────────────────────────────────────────────────────────
// Read from environment (Vite exposes VITE_* to the client). EmailJS keys are
// publishable by design, but keeping them in env lets each deploy set its own
// and keeps them out of source control. See .env.example.
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
// ──────────────────────────────────────────────────────────────────────────

const PROJECT_TYPE_KEYS = ['mobile', 'web', 'pos', 'uiux', 'marketing', 'branding', 'other']

function Label({ children }) {
  return (
    <label className="font-['Geist'] text-[12px] font-medium uppercase tracking-wider text-[#c9c5d0] block mb-2">
      {children}
    </label>
  )
}

const inputBase =
  "w-full bg-[#0A091A] border border-[#48454f]/30 rounded-[4px] px-4 py-3 text-[#e2dfff] placeholder:text-[#D8D2F3]/40 focus:outline-none font-['Inter'] text-[16px] leading-[1.6]"

const EMPTY = {
  full_name:     '',
  email:         '',
  mobile_number: '',
  project_type:  '',
  message:       '',
}

export default function ContactForm() {
  const { t } = useTranslation()
  const [fields, setFields] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // Missing email config → fail gracefully into the error banner.
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    setStatus('sending')

    try {
      const projectTypeLabel = fields.project_type
        ? t(`contact.form.projectTypes.${fields.project_type}`)
        : ''

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          full_name:     fields.full_name,
          email:         fields.email,
          mobile_number: fields.mobile_number,
          message:       projectTypeLabel
            ? `[${projectTypeLabel}]\n\n${fields.message}`
            : fields.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setFields(EMPTY)
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err?.text ?? err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const isSending = status === 'sending'

  return (
    <div className="lg:col-span-7 glass-panel rounded-xl p-[24px] md:p-[32px] relative overflow-hidden">
      {/* Corner glow */}
      <div
        className="absolute -top-20 -end-20 w-40 h-40 bg-[#42e3ff]/10 blur-[50px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Success banner ── */}
      {status === 'success' && (
        <div className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-[6px] px-4 py-3 relative z-10" role="status">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
          <p className="font-['Inter'] text-[14px] text-emerald-300">
            {t('contact.form.successMsg')}
          </p>
        </div>
      )}

      {/* ── Error banner ── */}
      {status === 'error' && (
        <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-[6px] px-4 py-3 relative z-10" role="alert">
          <span className="material-symbols-outlined text-red-400 text-[20px]">error</span>
          <p className="font-['Inter'] text-[14px] text-red-300">
            {t('contact.form.errorMsg')}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-[24px] relative z-10" noValidate>

        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          <div>
            <Label>{t('contact.form.name')}</Label>
            <div className="glow-cyan-focus rounded-[4px] transition-all duration-300">
              <input
                required
                type="text"
                name="full_name"
                value={fields.full_name}
                onChange={handleChange}
                placeholder={t('contact.form.namePlaceholder')}
                className={inputBase}
                id="contact-name"
                autoComplete="name"
              />
            </div>
          </div>
          <div>
            <Label>{t('contact.form.email')}</Label>
            <div className="glow-cyan-focus rounded-[4px] transition-all duration-300">
              <input
                required
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder={t('contact.form.emailPlaceholder')}
                className={inputBase}
                id="contact-email"
                dir="ltr"
                autoComplete="email"
              />
            </div>
          </div>
        </div>

        {/* Phone + Project type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
          <div>
            <Label>{t('contact.form.phone')}</Label>
            <div className="glow-cyan-focus rounded-[4px] transition-all duration-300">
              <input
                required
                type="tel"
                name="mobile_number"
                value={fields.mobile_number}
                onChange={handleChange}
                placeholder={t('contact.form.phonePlaceholder')}
                className={inputBase}
                id="contact-phone"
                dir="ltr"
                autoComplete="tel"
              />
            </div>
          </div>
          <div>
            <Label>{t('contact.form.projectType')}</Label>
            <div className="glow-cyan-focus rounded-[4px] transition-all duration-300 relative">
              <select
                name="project_type"
                value={fields.project_type}
                onChange={handleChange}
                className={`${inputBase} appearance-none cursor-pointer`}
                id="contact-project"
              >
                <option value="">{t('contact.form.projectTypePlaceholder')}</option>
                {PROJECT_TYPE_KEYS.map((key) => (
                  <option key={key} value={key}>{t(`contact.form.projectTypes.${key}`)}</option>
                ))}
              </select>
              <span
                className="material-symbols-outlined absolute end-4 top-1/2 -translate-y-1/2 text-[#c9c5d0] pointer-events-none"
                aria-hidden="true"
              >
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <Label>{t('contact.form.message')}</Label>
          <div className="glow-cyan-focus rounded-[4px] transition-all duration-300">
            <textarea
              required
              rows={5}
              name="message"
              value={fields.message}
              onChange={handleChange}
              placeholder={t('contact.form.messagePlaceholder')}
              className={`${inputBase} resize-none`}
              id="contact-message"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSending}
          className={`
            w-full font-['Geist'] text-[14px] font-semibold tracking-[0.05em]
            py-4 rounded-[4px]
            flex items-center justify-center gap-2
            transition-all duration-300
            ${isSending
              ? 'bg-[#b7aee6]/50 text-[#312a59]/70 cursor-not-allowed'
              : 'bg-[#b7aee6] text-[#312a59] hover:shadow-[0_0_20px_rgba(183,174,230,0.6)] hover:bg-[#c9bff9] active:scale-95'
            }
          `}
        >
          {isSending ? (
            <>
              <svg
                className="animate-spin h-[18px] w-[18px] text-[#312a59]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>{t('contact.form.sending')}</span>
            </>
          ) : (
            <>
              <span>{t('contact.form.send')}</span>
              <span className="material-symbols-outlined i18n-flip text-[18px]" aria-hidden="true">arrow_forward</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
