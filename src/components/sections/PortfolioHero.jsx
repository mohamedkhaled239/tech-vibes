// components/sections/PortfolioHero.jsx
export default function PortfolioHero() {
  return (
    <div className="text-center mb-[48px] relative z-10">
      {/* Badge */}
      <span className="inline-block bg-[#42e3ff]/10 text-[#42e3ff] border border-[#42e3ff]/20 font-['Geist'] text-[12px] font-medium uppercase px-4 py-1.5 rounded-full mb-[12px] tracking-widest backdrop-blur-sm">
        OUR WORK
      </span>

      {/* Heading */}
      <h1 className="font-['Sora'] text-[32px] md:text-[64px] font-bold leading-[1.1] tracking-[-0.02em] text-[#e2dfff] mb-[24px]">
        Selected Projects <br className="hidden md:block" />
        &amp; Success Stories
      </h1>

      {/* Sub-copy */}
      <p className="font-['Inter'] text-[18px] leading-[1.6] text-[#c9c5d0] max-w-3xl mx-auto">
        A showcase of software products, digital experiences, and marketing solutions
        crafted for ambitious brands.
      </p>
    </div>
  )
}
