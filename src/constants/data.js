// constants/data.js
// Structural/visual props only — all display copy lives in src/i18n/locales
// and is resolved via useTranslation() in the consuming components.

import q8nitroImg from '../assets/q8nitro.png'
import syTourismImg from '../assets/sytoursim/sytoursimlandscape.png'
import sooqCarsImg from '../assets/sooqcars/sooq-hero.png'
import easyTripsImg from '../assets/easytrips/easytrips-hero.png'
import vertexImg from '../assets/vertex/home.png'

export const NAV_LINKS = [
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'process', href: '/#process' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
]

// ─── About Page ───────────────────────────────────────────────────
export const STATS = [
  {
    id: 'projects',
    icon: 'rocket_launch',
    iconBg: 'bg-[#42e3ff]/10',
    iconColor: 'text-[#42e3ff]',
    value: '20+',
  },
  {
    id: 'reach',
    icon: 'visibility',
    iconBg: 'bg-[#b7aee6]/10',
    iconColor: 'text-[#b7aee6]',
    value: '30K+',
  },
  {
    id: 'satisfaction',
    icon: 'favorite',
    iconBg: 'bg-[#42e3ff]/10',
    iconColor: 'text-[#42e3ff]',
    value: '98%',
  },
  {
    id: 'years',
    icon: 'military_tech',
    iconBg: 'bg-[#b7aee6]/10',
    iconColor: 'text-[#b7aee6]',
    value: '2+',
  },
]

export const PROCESS_STEPS = [
  {
    id: 'strategy',
    number: '1',
    numberColor: 'text-[#d3caff]',
    labelColor: 'text-[#d3caff]',
    glowColor: 'bg-[#b7aee6]/10',
  },
  {
    id: 'design',
    number: '2',
    numberColor: 'text-[#42e3ff]',
    labelColor: 'text-[#42e3ff]',
    glowColor: 'bg-[#42e3ff]/10',
  },
  {
    id: 'development',
    number: '3',
    numberColor: 'text-[#d3caff]',
    labelColor: 'text-[#d3caff]',
    glowColor: 'bg-[#b7aee6]/10',
  },
  {
    id: 'launch',
    number: '4',
    numberColor: 'text-[#42e3ff]',
    labelColor: 'text-[#42e3ff]',
    glowColor: 'bg-[#42e3ff]/10',
  },
]

// Index-aligned with the `about.testimonials` translation array.
export const TESTIMONIALS = [
  {
    id: 'alex',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDp9YGTlblg7FjQrYL1yQMFPZnvPkWu4C-zcOrM9Gysq03Cs5rU_DR15cQWA0odFOwDbtVJTOJ6YcNTvuqWKZ1OPnVNOShrmH-Kx5JmSORfg_8SKUJ8U_CyYiLZ1IR5G7LT8WafIF39p9HKzZYlf3Q75kdyQQJaGxpwJ636B0zsaL5uHe11aL6_VSnS-Vzfq09EPf3HRQ1508mWzdIuu2TFXY4j-G00LXd_o2QyayFz_Whm3vRKMp8ukug9eaiQELCxXGom9lS4ywc',
    glowColor: 'from-[#42e3ff]/5 to-transparent',
  },
  {
    id: 'sarah',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVrumDrJ41dYSbRPNbO8DMGdpsvesbeAWePd8kd4nQQNfYtiL3iLpyCn3gvfc7yMd0_OkLAVlmW6-xGIc37lGexPyJZgBE04MZ2SN1eqleBeUn1uCe0ELzZaVJG7fazMGzPMDZRpjaaqFfCUcWbcqTlw6oMF-LdGuMf9Q00duQF8q8dEQFZDQ_zweIT0YyXO_NMeBDOROdAbou11pvcMseMiezOGir5BQRQQR_PoSmLYbR89fTVHgdWQoq287sgzDqTIscIfzma3I',
    glowColor: 'from-[#b7aee6]/5 to-transparent',
  },
  {
    id: 'marcus',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWxUXmMhzSeKBmBy6r_HGQOzHj-PivQVu1IdmCkTWvPnNCWkNMD83JkzOoyVaVDQJzzntT9ucjqAmRL8D0ujzw9eGbd9xd8VyCF0I8zsZIqOlHXALBbPlm8YSC3QdqTlq4Dm1kpwRv0rH-5o-4gJgo8Yg-oA6k5NWuolwyVYdQBB6Ilb9QX1vm1CXwbThgBTndjXn5xhZUpQ2IL9kIzvTiPeQpJt8AiMtb18KPQb_y8fhH3hQfgJ1Ljf8k_TjCDFVV2U9CCpZQMTk',
    glowColor: 'from-[#42e3ff]/5 to-transparent',
  },
]

// Home page teaser grid ("Selected Works") — id maps to portfolioGrid.cards.<id>
export const PORTFOLIO_PROJECTS = [
  {
    id: 'easytrips',
    colSpan: 'md:col-span-8',
    variant: 'featured',
    tagColors: ['tertiary', 'primary'],
    image: easyTripsImg,
    stat: { icon: 'travel_explore', value: 'Live' },
    gradientFrom: 'tertiary',
  },
  {
    id: 'growth',
    colSpan: 'md:col-span-4',
    variant: 'icon',
    tagColors: ['primary'],
    icon: 'trending_up',
    iconColor: 'tertiary',
  },
  {
    id: 'sytourism',
    colSpan: 'md:col-span-6',
    variant: 'featured',
    tagColors: ['tertiary', 'primary'],
    image: syTourismImg,
    stat: { icon: 'verified', value: 'iOS & Android' },
    gradientFrom: 'tertiary',
  },
  {
    id: 'sooqcars',
    colSpan: 'md:col-span-6',
    variant: 'featured',
    tagColors: ['tertiary', 'primary'],
    image: sooqCarsImg,
    stat: { icon: 'directions_car', value: '90+ Brands' },
    gradientFrom: 'primary',
  },
  {
    id: 'q8nitro',
    colSpan: 'md:col-span-6',
    variant: 'featured',
    tagColors: ['tertiary', 'primary'],
    image: q8nitroImg,
    stat: { icon: 'rocket_launch', value: '3 Months' },
    gradientFrom: 'primary',
  },
  {
    id: 'vertex',
    colSpan: 'md:col-span-6',
    variant: 'featured',
    tagColors: ['tertiary', 'primary'],
    image: vertexImg,
    stat: { icon: 'auto_awesome', value: 'Live' },
    gradientFrom: 'primary',
  },
  // Closing row — two balanced featured cards
  {
    id: 'ancientegypt',
    colSpan: 'md:col-span-6',
    variant: 'featured',
    tagColors: ['tertiary', 'primary'],
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1600&auto=format&fit=crop',
    stat: { icon: 'translate', value: '6 Languages' },
    gradientFrom: 'primary',
  },
  {
    id: 'halarashaqaty',
    colSpan: 'md:col-span-6',
    variant: 'featured',
    tagColors: ['tertiary', 'primary'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop',
    stat: { icon: 'event_available', value: '4-Step Booking' },
    gradientFrom: 'primary',
  },
]

// Home page "Our Expertise" cards — id maps to services.items.<id>
export const SERVICES = [
  { id: 'mobile', icon: 'smartphone', iconColor: 'tertiary' },
  { id: 'web', icon: 'code', iconColor: 'tertiary' },
  { id: 'pos', icon: 'point_of_sale', iconColor: 'tertiary' },
  { id: 'uiux', icon: 'design_services', iconColor: 'primary' },
  { id: 'marketing', icon: 'campaign', iconColor: 'primary' },
  { id: 'ads', icon: 'ads_click', iconColor: 'primary' },
]

// Services page bento grid — id maps to servicesPage.services.<id>
export const BENTO_SERVICES = [
  {
    id: 'mobile',
    icon: 'smartphone',
    iconColor: 'tertiary',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    layout: 'bottom',
    hasImage: true,
    animDelay: '0s',
  },
  {
    id: 'web',
    icon: 'web',
    iconColor: 'primary',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
    layout: 'bottom',
    hasImage: true,
    animDelay: '0.2s',
  },
  {
    id: 'pos',
    icon: 'point_of_sale',
    iconColor: 'tertiary',
    colSpan: 'lg:col-span-1',
    rowSpan: 'md:row-span-1',
    layout: 'center-row',
    hasImage: true,
    animDelay: '0.4s',
  },
  {
    id: 'marketing',
    icon: 'campaign',
    iconColor: 'primary',
    colSpan: 'lg:col-span-1',
    rowSpan: 'md:row-span-1',
    layout: 'between',
    hasImage: true,
    animDelay: '0.1s',
  },
  {
    id: 'uiux',
    icon: 'design_services',
    iconColor: 'tertiary',
    colSpan: 'md:col-span-2 lg:col-span-3',
    rowSpan: 'md:row-span-1',
    layout: 'row',
    hasImage: true,
    iconSize: 'lg',
    animDelay: '0.3s',
  },
  {
    id: 'branding',
    icon: 'branding_watermark',
    iconColor: 'primary',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    layout: 'between',
    hasImage: false,
    animDelay: '0.5s',
  },
]

// Index-aligned with the `servicesPage.chips` translation array.
export const SERVICES_PAGE_CHIPS = [
  { variant: 'cyan' },
  { variant: 'purple' },
  { variant: 'cyan' },
]

export const FOOTER_LINKS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'showcase', href: '/portfolio' },
  { key: 'contactUs', href: '/contact' },
]

// Social media — update href values with your real profile URLs.
// Platform names are proper nouns and are not translated.
export const SOCIAL_LINKS = [
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/201004226988' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/tech_vibes.1' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591222088154' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@tech_vibes.1' },
]
