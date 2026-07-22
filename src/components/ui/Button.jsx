// components/ui/Button.jsx
/**
 * @param {'primary' | 'ghost' | 'cta'} variant
 * @param {string} className - extra classes
 */
export default function Button({ children, variant = 'primary', className = '', onClick, ...props }) {
  const base =
    'text-label-md font-medium rounded-full inline-flex items-center justify-center touch-manipulation transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'

  const variants = {
    primary:
      'bg-[#b7aee6] text-[#474070] px-8 py-3 min-h-[48px] hover:shadow-[0_0_15px_rgba(183,174,230,0.5)] active:scale-95',
    ghost:
      'glass-panel border border-[#b7aee6] text-[#b7aee6] px-8 py-3 min-h-[48px] hover:bg-[#b7aee6]/10 active:scale-95',
    nav:
      'bg-[#b7aee6] text-[#474070] px-6 py-2 min-h-[44px] hover:scale-95',
    cta:
      'bg-[#d3caff] text-[#312a59] text-[20px] font-semibold px-10 py-4 min-h-[56px] hover:shadow-[0_0_25px_rgba(211,202,255,0.6)] hover:scale-105 active:scale-100',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
