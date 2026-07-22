// data/caseStudies.ts
// One rich, typed case study per portfolio project.
// Swap for a CMS/API later — components only depend on the CaseStudy contract.
//
// i18n note: this file holds the canonical (English) content. Arabic
// overrides live in caseStudies.ar.ts as a partial overlay, merged in by
// getCaseStudy()/getRelated() based on the active language — so none of
// the ~20 case-study components need to know about locales at all, they
// just render whatever `CaseStudy` object they're handed.

import type { CaseStudy } from '../types/caseStudy'
import q8nitroImg from '../assets/q8nitro.png'
import syTourismHero from '../assets/sytoursim/sytoursimlandscape.png'
import syTourismLogin from '../assets/sytoursim/screen2.png'
import syTourismNews from '../assets/sytoursim/screen1.png'
import sooqHero from '../assets/sooqcars/sooq-hero.png'
import sooqListings from '../assets/sooqcars/sooq-listings.png'
import sooqBrands from '../assets/sooqcars/sooq-brands.png'
import sooqDetails from '../assets/sooqcars/sooq-details.png'
import sooqPost from '../assets/sooqcars/sooq-post.png'
import easyTripsHero from '../assets/easytrips/easytrips-hero.png'
import easyTripsPackages from '../assets/easytrips/packages.png'
import easyTripsDestinations from '../assets/easytrips/destinations.png'
import easyTripsHotels from '../assets/easytrips/hotels.png'
import easyTripsBooking from '../assets/easytrips/booking.png'
import vertexHome from '../assets/vertex/home.png'
import vertexAbout from '../assets/vertex/about.png'
import vertexServices from '../assets/vertex/services.png'
import vertexMoodBoards from '../assets/vertex/mood-boards.png'
import vertexProjects from '../assets/vertex/projects.png'
import aeMenu from '../assets/ancientegypt/ae-menu.png'
import aeOffers from '../assets/ancientegypt/ae-offers.png'
import aeDetails from '../assets/ancientegypt/ae-details.png'
import aeCart from '../assets/ancientegypt/ae-cart.png'
import aePerfume from '../assets/ancientegypt/ae-perfume.png'
import halaHome from '../assets/halarashaqaty/hala-home.png'
import halaServices from '../assets/halarashaqaty/hala-services.png'
import halaBooking from '../assets/halarashaqaty/hala-booking.png'
import halaAppointments from '../assets/halarashaqaty/hala-appointments.png'
import { CASE_STUDIES_AR } from './caseStudies.ar'
import { deepMergeCaseStudy } from './localizeCaseStudy'

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

export const CASE_STUDIES: CaseStudy[] = [
  // ─── Growth Engine — Digital Marketing ────────────────────────────
  {
    id: 'growth',
    title: 'Growth Engine',
    tagline: 'Performance marketing, engineered like software.',
    description:
      'A full-funnel performance marketing system for a regional D2C brand — creative testing at scale, ruthless budget automation, and a 6.8x blended ROAS.',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    client: 'Velvet & Co.',
    industry: 'D2C E-Commerce',
    year: '2025',
    timeline: '9 Months (ongoing)',
    services: ['Performance Marketing', 'Meta & Google Ads', 'Creative Production', 'Conversion Optimization'],
    heroImage: u('photo-1460925895917-afdab827c52f', 2000),
    accent: { primary: '#fbbf24', secondary: '#f472b6', surface: '#2a1a05' },
    problem:
      'Velvet & Co. was burning budget on boosted posts with no attribution. ROAS hovered at 1.4x, creative fatigued within days, and every scaling attempt collapsed CPA. They had a great product and no growth system.',
    goals: [
      'Blended ROAS above 4x within two quarters',
      'A creative pipeline that never fatigues',
      'Full-funnel attribution they can trust',
      'Scale spend 5x without CPA collapse',
    ],
    challenges: [
      'iOS 14.5+ signal loss wrecking attribution',
      'A three-day creative fatigue cycle',
      'Seasonal demand swings of ±60%',
    ],
    solution: {
      intro:
        'We rebuilt the entire funnel as a system: server-side conversion tracking restored the signal, a weekly creative sprint ships 12 new ad variants every Monday, and automated budget rules move spend to winners within hours — not weeks.',
      points: [
        {
          icon: 'track_changes',
          title: 'Server-side signal',
          body: 'Conversions API + first-party events rebuilt attribution accuracy to 94% post-iOS 14.5.',
        },
        {
          icon: 'movie',
          title: 'Creative velocity',
          body: 'A 12-variant weekly testing sprint — hooks, angles and formats scored and recycled systematically.',
        },
        {
          icon: 'rule_settings',
          title: 'Budget automation',
          body: 'Rules shift spend to winning ad sets every 4 hours, with guardrails on CPA and frequency.',
        },
      ],
    },
    process: [
      { phase: '01', title: 'Research', description: 'Full funnel audit, pixel forensics, competitor ad-library teardown.', duration: '2 weeks' },
      { phase: '02', title: 'Wireframes', description: 'Landing page flows mapped to each ad angle and audience temperature.', duration: '2 weeks' },
      { phase: '03', title: 'UI Design', description: 'Creative system: hook library, brand-safe templates, motion ads.', duration: '3 weeks' },
      { phase: '04', title: 'Development', description: 'Server-side tracking, landing pages, automated reporting stack.', duration: '4 weeks' },
      { phase: '05', title: 'Testing', description: 'Structured A/B sprints across audiences, creatives and offers.', duration: 'ongoing' },
      { phase: '06', title: 'Launch', description: 'Scaled from $8k to $40k monthly spend at rising ROAS.', duration: 'month 3+' },
    ],
    marketing: {
      roas: 6.8,
      ctr: 3.4,
      cpa: '-58%',
      impressions: '18.2M',
      monthly: [
        { month: 'Jan', value: 18 },
        { month: 'Feb', value: 26 },
        { month: 'Mar', value: 34 },
        { month: 'Apr', value: 31 },
        { month: 'May', value: 48 },
        { month: 'Jun', value: 62 },
        { month: 'Jul', value: 71 },
        { month: 'Aug', value: 86 },
        { month: 'Sep', value: 100 },
      ],
      channels: [
        { name: 'Meta Ads', icon: 'thumb_up', spendShare: 52, roas: 7.4 },
        { name: 'Google Ads', icon: 'search', spendShare: 31, roas: 6.1 },
        { name: 'TikTok Ads', icon: 'music_note', spendShare: 17, roas: 5.2 },
      ],
    },
    gallery: [
      { src: u('photo-1611926653458-09294b3142bf', 1800), alt: 'Campaign performance dashboard', device: 'desktop' },
      { src: u('photo-1611162617213-7d7a39e9b1d7', 900), alt: 'Social media ad creative', device: 'phone' },
      { src: u('photo-1563986768609-322da13575f3', 900), alt: 'Story-format campaign creative', device: 'phone' },
    ],
    features: [
      { icon: 'ads_click', title: 'Full-Funnel Ads', description: 'Cold, warm and retention campaigns orchestrated as one system.' },
      { icon: 'science', title: 'Creative Testing Lab', description: '12 new variants weekly, scored on hook rate and hold rate.' },
      { icon: 'attribution', title: 'True Attribution', description: 'Server-side tracking with 94% conversion match quality.' },
      { icon: 'trending_up', title: 'Auto-Scaling Rules', description: 'Budget reallocates to winners every four hours.' },
      { icon: 'storefront', title: 'Landing Page CRO', description: 'Angle-matched pages lifted conversion 41% on cold traffic.' },
      { icon: 'summarize', title: 'Live Reporting', description: 'A single dashboard replacing three agencies’ PDF decks.' },
    ],
    techStack: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'GA4', 'Conversions API', 'Looker Studio', 'Klaviyo', 'Hotjar'],
    results: [
      { value: 6.8, decimals: 1, suffix: 'x', label: 'Blended ROAS', sublabel: 'up from 1.4x' },
      { value: 320, prefix: '+', suffix: '%', label: 'Revenue growth', sublabel: 'in nine months' },
      { value: 58, prefix: '-', suffix: '%', label: 'Cost per acquisition', sublabel: 'while scaling spend 5x' },
      { value: 3.4, decimals: 1, suffix: '%', label: 'Average CTR', sublabel: '2.6x the industry benchmark' },
    ],
    testimonial: {
      quote:
        'The marketing strategies yielded measurable impact within the first quarter. Their blend of technical precision and creative vision is unmatched in the agency space.',
      name: 'Layla Hassan',
      role: 'CMO',
      company: 'Velvet & Co.',
    },
    related: ['sytourism', 'easytrips', 'sooqcars'],
  },

  // ─── Q8Nitro — Mobile App ─────────────────────────────────────────
  {
    id: 'q8nitro',
    title: 'Q8Nitro',
    tagline: 'Kuwait’s automotive scene, in your pocket.',
    description:
      'A full-featured Flutter application backed by a Laravel API — built for a fast-growing Kuwaiti user base with real-time interactions and a brand-first interface.',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    client: 'Q8Nitro — Kuwait',
    industry: 'Automotive Community',
    year: '2025',
    timeline: '3 Months',
    services: ['Mobile App Development', 'Backend Engineering', 'UI/UX Design'],
    heroImage: q8nitroImg,
    accent: { primary: '#ff6b4a', secondary: '#ffb347', surface: '#2a0e05' },
    problem:
      'Q8Nitro needed a reliable, scalable mobile platform for a rapidly growing Kuwaiti community. The app had to combine complex backend logic with smooth real-time interactions and a polished Arabic-first UI — while staying fast on both Android and iOS.',
    goals: [
      'One codebase, native feel on both platforms',
      'Arabic-first UI with full RTL support',
      'Real-time community interactions',
      'A backend ready for 10x growth',
    ],
    challenges: [
      'Bidirectional RTL/LTR layouts throughout',
      'Real-time feeds on variable mobile networks',
      'Three-month deadline to market',
    ],
    solution: {
      intro:
        'We shipped the full product in one quarter: a Flutter app sharing a single high-performance codebase across iOS and Android, driven by a Laravel REST API that owns authentication, business logic and data. The UI was crafted around the Q8Nitro brand with full right-to-left support from day one.',
      points: [
        {
          icon: 'phone_iphone',
          title: 'Single codebase, two platforms',
          body: 'Flutter delivered pixel-identical experiences on iOS and Android with one team and one sprint cadence.',
        },
        {
          icon: 'dns',
          title: 'Laravel API core',
          body: 'JWT-secured REST API handling auth, feeds and media — load-tested well past projected growth.',
        },
        {
          icon: 'language',
          title: 'RTL-first design',
          body: 'Every screen designed in Arabic first, then mirrored — not the other way around.',
        },
      ],
    },
    process: [
      { phase: '01', title: 'Research', description: 'Community interviews and competitive scan of regional apps.', duration: '1 week' },
      { phase: '02', title: 'Wireframes', description: 'RTL-first flows for feed, profiles and messaging.', duration: '1 week' },
      { phase: '03', title: 'UI Design', description: 'Brand-driven dark UI with high-energy accent system.', duration: '2 weeks' },
      { phase: '04', title: 'Development', description: 'Flutter + Laravel build in weekly release trains.', duration: '7 weeks' },
      { phase: '05', title: 'Testing', description: 'Device-lab passes across 20 Android/iOS devices.', duration: '1 week' },
      { phase: '06', title: 'Launch', description: 'Simultaneous App Store and Play Store release.', duration: '3 days' },
    ],
    gallery: [
      { src: q8nitroImg, alt: 'Q8Nitro app home feed', device: 'phone' },
      { src: u('photo-1494976388531-d1058494cdd8', 900), alt: 'Automotive community content', device: 'phone' },
      { src: u('photo-1503376780353-7e6692767b70', 900), alt: 'Featured cars screen', device: 'phone' },
    ],
    features: [
      { icon: 'dynamic_feed', title: 'Live Community Feed', description: 'Real-time posts, reactions and comments with media.' },
      { icon: 'translate', title: 'Full RTL Support', description: 'Arabic-first layouts mirrored flawlessly for English.' },
      { icon: 'verified_user', title: 'JWT Security', description: 'Token-based auth with refresh rotation and device binding.' },
      { icon: 'notifications', title: 'Push Engagement', description: 'Segmented push campaigns straight from the admin panel.' },
      { icon: 'photo_camera', title: 'Rich Media', description: 'Compressed uploads tuned for regional network conditions.' },
      { icon: 'admin_panel_settings', title: 'Admin Console', description: 'Full moderation and content control for the Q8Nitro team.' },
    ],
    techStack: ['Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'REST API', 'JWT Auth', 'Firebase'],
    results: [
      { value: 2, label: 'Platforms shipped', sublabel: 'iOS & Android, one codebase' },
      { value: 3, label: 'Months to market', sublabel: 'concept to both stores' },
      { value: 100, suffix: '%', label: 'RTL coverage', sublabel: 'every screen, both directions' },
      { value: 99.9, decimals: 1, suffix: '%', label: 'Crash-free sessions', sublabel: 'across the device lab' },
    ],
    testimonial: {
      quote:
        'They understood the Kuwaiti market from day one. The app feels premium, runs fast on every phone we tested, and our community adopted it instantly.',
      name: 'Yousef Al-Rashid',
      role: 'Founder',
      company: 'Q8Nitro',
    },
    related: ['sytourism', 'ancientegypt', 'growth'],
  },

  // ─── Sy Tourism — Mobile App (Syrian Ministry of Tourism) ─────────
  {
    id: 'sytourism',
    aliases: ['sy-tourism'],
    title: 'Sy Tourism',
    tagline: "Syria's official digital gateway to its heritage, landmarks, and living culture.",
    description:
      'The official mobile application of the Syrian Ministry of Tourism — a single, trusted platform where residents and international visitors discover historical landmarks, archaeological sites, natural attractions, tourism news, and official ministry events.',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    client: 'Syrian Ministry of Tourism',
    industry: 'Government · Tourism & Culture',
    year: '2025',
    timeline: '3 Months',
    services: ['Mobile App Development', 'UI/UX Design', 'Backend & API Integration', 'Deployment & Publishing'],
    heroImage: syTourismHero,
    accent: { primary: '#a8c56f', secondary: '#e4c988', surface: '#141d0a' },
    problem:
      'Before Sy Tourism, there was no single digital destination that could speak for Syrian tourism with the authority of the Ministry itself. Information about landmarks, attractions, and events existed, but not as a unified, verified, and accessible experience — and certainly not as a native mobile product built to government standards of reliability and trust.',
    goals: [
      'Give Syrian tourism a modern, official digital presence',
      'Unify landmarks, news, and events in one trusted platform',
      'Ship an Arabic-first, fully bilingual experience',
      'Launch on both app stores within three months',
    ],
    challenges: [
      'Government-grade credibility with consumer-app polish',
      'Arabic-first bidirectional UI without an English afterthought',
      'A fixed three-month timeline covering delivery end to end',
    ],
    solution: {
      intro:
        'We designed and built Sy Tourism end-to-end as a native-feel Flutter application, architected around three pillars — discovery, credibility, and clarity — so it works as both a cultural showcase and a working government service: fast, secure, and built to scale with the Ministry’s digital strategy.',
      points: [
        {
          icon: 'travel_explore',
          title: 'Discovery',
          body: 'An interactive destination experience covering historical landmarks, archaeological sites, and natural attractions — from broad exploration to specific detail in a few taps.',
        },
        {
          icon: 'verified_user',
          title: 'Credibility',
          body: 'Secure authentication, an official tourism news module, and an events hub tied to the Ministry’s own calendar — every piece of content carries institutional weight.',
        },
        {
          icon: 'translate',
          title: 'Arabic-first clarity',
          body: 'Designed natively in Arabic around the Ministry’s visual identity, with English fully supported rather than bolted on.',
        },
      ],
    },
    process: [
      { phase: '01', title: 'Discovery', description: 'Aligning with the Ministry on scope, content structure, and governance standards.', duration: '1 week' },
      { phase: '02', title: 'UX Flows', description: 'Bilingual, Arabic-first flows for destinations, news, and events.', duration: '1 week' },
      { phase: '03', title: 'UI Design', description: 'A modern, minimal interface built around the Ministry’s brand identity.', duration: '2 weeks' },
      { phase: '04', title: 'Development', description: 'Flutter build on one codebase for iOS and Android, wired to Firebase and REST APIs.', duration: '6 weeks' },
      { phase: '05', title: 'Testing', description: 'Structured QA across devices and both languages — performance, security, content accuracy.', duration: '1 week' },
      { phase: '06', title: 'Launch', description: 'Publishing to the App Store and Google Play with ongoing technical support in place.', duration: '1 week' },
    ],
    gallery: [
      { src: syTourismLogin, alt: 'Sy Tourism login screen with the Ministry identity', device: 'phone' },
      { src: syTourismNews, alt: 'Official tourism news feed screen', device: 'phone' },
    ],
    features: [
      { icon: 'travel_explore', title: 'Destination Discovery', description: 'Historical landmarks, archaeological sites, and natural attractions with rich detail pages and image galleries.' },
      { icon: 'newspaper', title: 'Tourism News', description: 'An editorial feed of official announcements with categories, timing, and view tracking.' },
      { icon: 'event', title: 'Official Events', description: 'A ministry events hub with category filters and an upcoming-only toggle.' },
      { icon: 'search', title: 'Search & Categories', description: 'Fast, focused search across destinations and content with a clear category system.' },
      { icon: 'favorite', title: 'Favorites', description: 'A personal collection layer that turns one-time browsing into ongoing trip planning.' },
      { icon: 'translate', title: 'Arabic-First & Bilingual', description: 'Designed natively in Arabic with complete English support, down to the interface layer.' },
    ],
    techStack: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Clean Architecture', 'State Management', 'Secure Storage', 'Push Notifications'],
    results: [
      { value: 2, label: 'Platforms shipped', sublabel: 'iOS & Android, one codebase' },
      { value: 3, label: 'Months to launch', sublabel: 'end-to-end delivery' },
      { value: 2, label: 'Languages', sublabel: 'Arabic-first, full English' },
      { value: 12, label: 'Services delivered', sublabel: 'design to app-store release' },
    ],
    testimonial: {
      quote:
        'Sy Tourism gave the Ministry a single, trusted digital channel for Syrian tourism — a modern experience that carries the credibility of an official national platform.',
      name: 'Ministry of Tourism',
      role: 'Digital Transformation Office',
      company: 'Syrian Arab Republic',
    },
    related: ['q8nitro', 'ancientegypt', 'easytrips'],
  },

  // ─── Easy Trips Egypt — Web Platform ──────────────────────────────
  {
    id: 'easytrips',
    aliases: ['easytripsegypt', 'easy-trips'],
    title: 'Easy Trips Egypt',
    tagline: 'Egypt’s wonders, one booking away.',
    description:
      'A bilingual travel booking platform for an Egyptian tour operator — server-rendered Angular storefront, dynamic packages and hotels, WhatsApp-first booking, and a full multi-portal management backend.',
    category: 'web',
    categoryLabel: 'Web Platform',
    client: 'Easy Trips Egypt',
    industry: 'Travel & Tourism',
    year: '2025',
    timeline: '4 Months',
    services: ['Web Engineering', 'UI/UX Design', 'Backend & Admin Portals', 'SEO & Performance'],
    liveUrl: 'https://easytripsegypt.com',
    heroImage: easyTripsHero,
    accent: { primary: '#f77f1c', secondary: '#3b5bdb', surface: '#0d1330' },
    problem:
      'Easy Trips was selling Egypt’s most compelling travel experiences through channels it didn’t control — social posts and chat threads, with no official storefront to anchor trust. Packages, hotels, and offers changed weekly, and every update meant manual work. The agency needed a platform that looked as premium as the trips it sells and could be run day-to-day by its own team.',
    goals: [
      'A trusted official storefront for packages, hotels, and destinations',
      'Arabic and English with full RTL, one codebase',
      'Content the agency team updates without a developer',
      'Search-engine visibility for high-intent travel queries',
    ],
    challenges: [
      'Constantly changing packages, prices, and seasonal offers',
      'SEO for a JavaScript single-page application',
      'Bookings culture built around WhatsApp, not checkout forms',
    ],
    solution: {
      intro:
        'We built a server-rendered Angular storefront on a Laravel backend: every package, hotel, and destination is managed from an admin portal and rendered as SEO-ready pages at the edge of a click — while booking flows meet Egyptian travelers where they already are, on WhatsApp.',
      points: [
        {
          icon: 'storefront',
          title: 'Dynamic travel catalog',
          body: 'Packages, hotels, and destinations driven entirely by the admin portal — discounts, offers, and seasonal content go live without a deploy.',
        },
        {
          icon: 'bolt',
          title: 'Server-rendered Angular',
          body: 'SSG/SSR rendering gives a JavaScript-rich storefront the crawlability and first-paint speed of a static site.',
        },
        {
          icon: 'forum',
          title: 'WhatsApp-first booking',
          body: 'Every package funnels into a pre-filled WhatsApp conversation — the channel Egyptian travelers actually book through.',
        },
      ],
    },
    process: [
      { phase: '01', title: 'Discovery', description: 'Mapped the agency’s catalog, booking flow, and content operations.', duration: '2 weeks' },
      { phase: '02', title: 'UX Flows', description: 'Bilingual flows for packages, hotels, destinations, and inquiry funnels.', duration: '2 weeks' },
      { phase: '03', title: 'UI Design', description: 'A warm, photography-led interface with full dark mode.', duration: '3 weeks' },
      { phase: '04', title: 'Development', description: 'Angular SSG storefront + Laravel API with admin, vendor, and investor portals.', duration: '7 weeks' },
      { phase: '05', title: 'Testing', description: 'Cross-device QA in both languages, SEO and performance audits.', duration: '1 week' },
      { phase: '06', title: 'Launch', description: 'Production deployment with the team trained on the admin portal.', duration: '1 week' },
    ],
    web: {
      url: 'easytripsegypt.com',
      sections: [
        { name: 'Home', icon: 'home', description: 'A dual Hotels/Tours search engine over trust stats — 10+ hotels, 50+ tours, 4.8★ rating.', src: easyTripsHero },
        { name: 'Packages', icon: 'card_travel', description: 'Dynamic package cards with live discounts, durations, hotel and tour counts, and a price filter.', src: easyTripsPackages },
        { name: 'Destinations', icon: 'map', description: 'Curated destination guides from the Red Sea to Luxor and Aswan.', src: easyTripsDestinations },
        { name: 'Hotels', icon: 'hotel', description: 'Handpicked stays with imagery, amenities, and direct inquiry.', src: easyTripsHotels },
        { name: 'Booking', icon: 'forum', description: 'One tap from any page into a pre-filled WhatsApp booking conversation.', src: easyTripsBooking },
      ],
      highlights: ['Hotels & Tours search engine', 'Admin-driven package cards', 'SEO-ready destination guides', 'Curated hotel listings', 'WhatsApp booking funnel'],
      hotspots: [
        { x: 15, y: 12, icon: 'translate', title: 'Bilingual & RTL', body: 'Arabic and English from one codebase — layouts mirror correctly, not just translated.' },
        { x: 80, y: 14, icon: 'dark_mode', title: 'Full dark mode', body: 'Every page ships a hand-tuned dark theme, synced to system preference.' },
        { x: 30, y: 50, icon: 'sell', title: 'Live offers engine', body: 'Discount badges and seasonal pricing flow straight from the admin portal.' },
        { x: 68, y: 60, icon: 'travel_explore', title: 'SEO-ready pages', body: 'Server-side rendering makes every package and destination fully crawlable.' },
        { x: 45, y: 85, icon: 'forum', title: 'WhatsApp funnel', body: 'Pre-filled booking messages convert browsing into conversations instantly.' },
        { x: 88, y: 40, icon: 'admin_panel_settings', title: 'Three portals', body: 'Admin, vendor, and investor portals run the business behind the storefront.' },
      ],
      lighthouse: { performance: 92, accessibility: 96, bestPractices: 100, seo: 98 },
      codeSnippet: `export const routes: Routes = [
  {
    path: 'packages/:id',
    renderMode: RenderMode.Prerender,  // SSG
    loadComponent: () =>
      import('./package-details')
  },
]`,
      stickyNote: 'If a page isn’t crawlable, the trip doesn’t exist — render everything on the server.',
    },
    gallery: [
      { src: easyTripsHero, alt: 'Easy Trips Egypt home with Hotels & Tours search', device: 'desktop' },
      { src: easyTripsPackages, alt: 'Exclusive packages with discounts and price filter', device: 'desktop' },
      { src: easyTripsDestinations, alt: 'Destination guides', device: 'desktop' },
      { src: easyTripsHotels, alt: 'Handpicked hotel listings', device: 'desktop' },
    ],
    features: [
      { icon: 'card_travel', title: 'Dynamic Packages', description: 'Admin-managed packages with discounts, durations, hotels, and tours.' },
      { icon: 'translate', title: 'Arabic & English', description: 'Fully bilingual with correct RTL mirroring across every page.' },
      { icon: 'forum', title: 'WhatsApp Booking', description: 'Pre-filled inquiry messages from any package or hotel.' },
      { icon: 'dark_mode', title: 'Dark Mode', description: 'A complete hand-tuned dark theme, synced to system preference.' },
      { icon: 'admin_panel_settings', title: 'Multi-Portal Backend', description: 'Admin, vendor, and investor portals on one Laravel core.' },
      { icon: 'travel_explore', title: 'SEO-First Rendering', description: 'Server-rendered pages built to rank for travel queries.' },
    ],
    techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'Laravel', 'MySQL', 'REST API', 'SSR / SSG', 'Swiper'],
    results: [
      { value: 2, label: 'Languages', sublabel: 'Arabic-first, full English' },
      { value: 3, label: 'Business portals', sublabel: 'admin, vendor & investor' },
      { value: 100, suffix: '%', label: 'Server-rendered', sublabel: 'every public page, SEO-ready' },
      { value: 24, suffix: '/7', label: 'WhatsApp booking', sublabel: 'inquiries around the clock' },
    ],
    testimonial: {
      quote:
        'The platform finally matches the quality of the trips we sell. Our team updates packages and offers in minutes, and customers reach us in one tap.',
      name: 'Easy Trips Egypt',
      role: 'Operations Team',
      company: 'Easy Trips Egypt',
    },
    related: ['sooqcars', 'vertex', 'sytourism'],
  },

  // ─── Sooq Al Sayarat — Web Platform (car marketplace) ─────────────
  {
    id: 'sooqcars',
    aliases: ['sooqalsayarat', 'sooq-alsayarat'],
    title: 'Sooq Al Sayarat',
    tagline: 'The whole vehicle market, in one fast Arabic platform.',
    description:
      'A multi-country Arabic automotive marketplace — a 90+ brand catalog, a peer-to-peer listings market spanning cars, buses, motorcycles, heavy equipment and parts, advanced and voice search, side-by-side comparison, and direct buyer-seller chat, with companion iOS and Android apps.',
    category: 'web',
    categoryLabel: 'Web Platform',
    client: 'Sooq Al Sayarat',
    industry: 'Automotive Marketplace',
    year: '2025',
    timeline: '5 Months',
    services: ['Web Engineering', 'UI/UX Design', 'Marketplace Architecture', 'SEO & Performance'],
    liveUrl: 'https://sooqalsayarat.net',
    heroImage: sooqHero,
    accent: { primary: '#4f9dff', secondary: '#f68713', surface: '#08132a' },
    problem:
      'Buying or selling a vehicle in the Arab market meant scattering across classified apps, dealer pages, and chat groups — no single place to browse a real brand catalog, compare models honestly, and reach a seller directly, let alone across countries and currencies. Sooq Al Sayarat set out to be that one platform: fast, trustworthy, and built Arabic-first for buyers, sellers, and dealers alike.',
    goals: [
      'Unite a 90+ brand catalog and an open listings market in one place',
      'Cover the whole market — cars, buses, motorcycles, heavy equipment, parts',
      'Make search, comparison, and posting genuinely fast and honest',
      'Serve multiple countries and currencies from one platform',
    ],
    challenges: [
      'One platform serving a brand catalog and open user listings together',
      'Advanced multi-criteria search that stays fast across 90+ brands',
      'Multi-country, multi-currency pricing without fragmenting the experience',
    ],
    solution: {
      intro:
        'We built Sooq Al Sayarat as a single Angular platform where a 90+ brand catalog and a peer-to-peer listings market live side by side — spanning every vehicle category. Advanced and voice search make browsing effortless, a comparison tool puts models head to head, and built-in chat connects buyers and sellers directly, all in a fast, Arabic-first, multi-country RTL interface backed by native iOS and Android apps.',
      points: [
        {
          icon: 'inventory_2',
          title: 'Catalog + open market',
          body: 'A 90+ brand catalog with per-brand car and model counts, alongside an open listings market covering cars, buses, motorcycles, heavy equipment and parts.',
        },
        {
          icon: 'tune',
          title: 'Advanced & voice search',
          body: 'Multi-criteria filtering by brand, model, price, year and country — plus voice search and a side-by-side comparison tool.',
        },
        {
          icon: 'public',
          title: 'Multi-country & apps',
          body: 'Country and currency selection built in, with companion iOS and Android apps and direct buyer-seller chat.',
        },
      ],
    },
    process: [
      { phase: '01', title: 'Discovery', description: 'Mapped how buyers, sellers, and dealers move across categories and countries.', duration: '2 weeks' },
      { phase: '02', title: 'Architecture', description: 'Designed a marketplace model unifying a brand catalog and open listings.', duration: '2 weeks' },
      { phase: '03', title: 'UI Design', description: 'A fast, Arabic-first RTL interface with Cairo & Jakarta type.', duration: '3 weeks' },
      { phase: '04', title: 'Development', description: 'Angular platform — search, filters, compare, chat, favorites, ad posting.', duration: '10 weeks' },
      { phase: '05', title: 'Testing', description: 'Cross-device QA, multi-currency checks, search performance testing.', duration: '2 weeks' },
      { phase: '06', title: 'Launch', description: 'Production web launch alongside the iOS and Android apps.', duration: '1 week' },
    ],
    web: {
      url: 'sooqalsayarat.net',
      sections: [
        { name: 'Home', icon: 'home', description: 'Voice-enabled search, an app promo, and category discovery across every vehicle type.', src: sooqHero },
        { name: 'Listings', icon: 'sell', description: 'Peer-to-peer ads with a rich filter rail and seller profiles.', src: sooqListings },
        { name: 'Brands', icon: 'workspaces', description: '90+ car brands, each with live car and model counts.', src: sooqBrands },
        { name: 'Car Details', icon: 'directions_car', description: 'Full brand and model pages with imagery and specs.', src: sooqDetails },
        { name: 'Post an Ad', icon: 'add_box', description: 'A guided flow to list any vehicle in minutes.', src: sooqPost },
      ],
      highlights: ['Voice-enabled search', '90+ brand catalog', 'Every vehicle category', 'Multi-country & currency', 'Side-by-side comparison'],
      hotspots: [
        { x: 16, y: 12, icon: 'mic', title: 'Voice search', body: 'Search the whole market by voice, or type by name, brand, or model.' },
        { x: 80, y: 14, icon: 'public', title: 'Multi-country & currency', body: 'Switch country and currency — pricing and listings adapt to the region.' },
        { x: 30, y: 50, icon: 'workspaces', title: '90+ brands', body: 'A full brand directory, each with live car and model counts.' },
        { x: 68, y: 60, icon: 'tune', title: 'Advanced filters', body: 'Filter by category, brand, model, price range and country — fast at scale.' },
        { x: 45, y: 85, icon: 'sell', title: 'Post an ad', body: 'Any user can list a vehicle in minutes through a guided posting flow.' },
        { x: 88, y: 40, icon: 'smartphone', title: 'Companion apps', body: 'Native iOS and Android apps on the App Store and Google Play.' },
      ],
      lighthouse: { performance: 90, accessibility: 95, bestPractices: 100, seo: 96 },
      codeSnippet: `filterListings(q: MarketQuery): Listing[] {
  return this.listings.filter(l =>
    matchesCategory(l, q.category) &&
    matchesBrand(l, q.brand) &&
    inPriceRange(l, q.min, q.max, q.currency)
  )
}`,
      stickyNote: 'One market, every vehicle, one honest comparison — no more ten open tabs.',
    },
    gallery: [
      { src: sooqHero, alt: 'Sooq Al Sayarat home with voice search and categories', device: 'desktop' },
      { src: sooqListings, alt: 'Listings page with filter rail and seller cards', device: 'desktop' },
      { src: sooqBrands, alt: 'Brand directory with 90+ brands', device: 'desktop' },
      { src: sooqPost, alt: 'Guided ad-posting flow', device: 'desktop' },
    ],
    features: [
      { icon: 'workspaces', title: 'Brand Catalog', description: '90+ car brands, each with live car and model counts.' },
      { icon: 'sell', title: 'Listings Market', description: 'Cars, buses, motorcycles, heavy equipment and parts — anyone can post.' },
      { icon: 'compare_arrows', title: 'Compare Vehicles', description: 'Side-by-side comparison of models on specs and price.' },
      { icon: 'public', title: 'Multi-Country', description: 'Country and currency selection built into the experience.' },
      { icon: 'mic', title: 'Voice & Advanced Search', description: 'Voice input plus multi-criteria filtering across the market.' },
      { icon: 'smartphone', title: 'Companion Apps', description: 'Native iOS and Android apps alongside the web platform.' },
    ],
    techStack: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'REST API', 'Real-time Chat', 'SSR / SSG', 'Cairo Type'],
    results: [
      { value: 90, suffix: '+', label: 'Car brands', sublabel: 'with live model counts' },
      { value: 8, suffix: '+', label: 'Vehicle categories', sublabel: 'cars to heavy equipment' },
      { value: 3, label: 'Platforms', sublabel: 'web, iOS & Android' },
      { value: 100, suffix: '%', label: 'Arabic-first RTL', sublabel: 'multi-country & currency' },
    ],
    testimonial: {
      quote:
        'They turned a scattered vehicle-buying process into one fast platform across web and mobile. Browsing 90+ brands, comparing, and chatting now live in one place — exactly what the market needed.',
      name: 'Sooq Al Sayarat',
      role: 'Product Team',
      company: 'Sooq Al Sayarat',
    },
    related: ['easytrips', 'vertex', 'q8nitro'],
  },

  // ─── VERTEX Maison — Web Platform (interior design studio) ────────
  {
    id: 'vertex',
    aliases: ['vertexmaison', 'vertex-maison'],
    title: 'VERTEX Maison',
    tagline: 'Elevate your living experience.',
    description:
      'A premium corporate website for an interior design and architecture studio — an editorial, image-led experience showcasing services, mood boards, and portfolio projects, built to communicate luxury and win high-end clients.',
    category: 'web',
    categoryLabel: 'Web Platform',
    client: 'VERTEX Maison',
    industry: 'Interior Design & Architecture',
    year: '2025',
    timeline: '3 Months',
    services: ['Web Engineering', 'UI/UX Design', 'Brand-Led Art Direction', 'SEO & Performance'],
    liveUrl: 'https://vertexmaison.com',
    heroImage: vertexHome,
    accent: { primary: '#d4a24e', secondary: '#a8895f', surface: '#1a1712' },
    problem:
      'VERTEX creates elegant, minimalist residential spaces — but had no digital presence that matched the quality of the work. Prospective clients judging a luxury studio expect the website to feel as considered as the interiors; a generic template would undersell every project. The studio needed a site that was itself a statement of taste.',
    goals: [
      'A digital presence as premium as the studio’s interiors',
      'Let clients explore services, mood boards, and projects intuitively',
      'Showcase architecture through immersive, large-format imagery',
      'Communicate professionalism and luxury in every section',
    ],
    challenges: [
      'A template would undermine a premium design brand',
      'Heavy, high-resolution imagery without sacrificing load speed',
      'Editorial restraint — letting whitespace and typography carry the brand',
    ],
    solution: {
      intro:
        'We built VERTEX as an editorial, image-led corporate site where restraint is the design language: premium typography, generous whitespace, and immersive full-bleed photography let the work speak. Every section — services, mood boards, projects — is composed to feel like a page from a design monograph, backed by a fast Angular build.',
      points: [
        {
          icon: 'auto_awesome',
          title: 'Editorial art direction',
          body: 'Premium serif-led typography, generous whitespace, and a warm gold-on-charcoal palette that reads as luxury, not template.',
        },
        {
          icon: 'photo_library',
          title: 'Immersive imagery',
          body: 'Large-format, full-bleed photography and mood boards put the studio’s interiors and architecture front and center.',
        },
        {
          icon: 'view_quilt',
          title: 'Intuitive exploration',
          body: 'Services, mood boards, and portfolio projects laid out so a prospective client moves from philosophy to project effortlessly.',
        },
      ],
    },
    process: [
      { phase: '01', title: 'Discovery', description: 'Absorbed the studio’s design philosophy and positioning.', duration: '1 week' },
      { phase: '02', title: 'Art Direction', description: 'Set the typographic system, palette, and image language.', duration: '2 weeks' },
      { phase: '03', title: 'UI Design', description: 'Editorial layouts for home, services, mood boards, and projects.', duration: '3 weeks' },
      { phase: '04', title: 'Development', description: 'A fast Angular build tuned for heavy imagery and smooth transitions.', duration: '5 weeks' },
      { phase: '05', title: 'Testing', description: 'Cross-device QA, image optimization, and performance passes.', duration: '1 week' },
      { phase: '06', title: 'Launch', description: 'Production deployment with a downloadable portfolio.', duration: '1 week' },
    ],
    web: {
      url: 'vertexmaison.com',
      sections: [
        { name: 'Home', icon: 'home', description: 'A full-bleed hero — “Elevate Your Living Experience” — over tailored, elegant, premium value cards.', src: vertexHome },
        { name: 'About', icon: 'info', description: 'The studio’s philosophy told through editorial layout and imagery.', src: vertexAbout },
        { name: 'Services', icon: 'design_services', description: 'Interior design, decor, and turnkey finishing for apartments and villas.', src: vertexServices },
        { name: 'Mood Boards', icon: 'palette', description: 'Curated material, color, and styling boards that set each project’s tone.', src: vertexMoodBoards },
        { name: 'Projects', icon: 'photo_library', description: 'A portfolio of architectural projects and interior transformations.', src: vertexProjects },
      ],
      highlights: ['Full-bleed editorial hero', 'Design philosophy, told visually', 'Turnkey finishing services', 'Curated mood boards', 'Immersive project galleries'],
      hotspots: [
        { x: 16, y: 14, icon: 'auto_awesome', title: 'Editorial art direction', body: 'Premium typography and whitespace that reads as a design monograph, not a template.' },
        { x: 80, y: 12, icon: 'download', title: 'Downloadable portfolio', body: 'A one-tap portfolio download turns browsing into a qualified lead.' },
        { x: 30, y: 52, icon: 'palette', title: 'Mood boards', body: 'Curated material and color boards that communicate taste before a single call.' },
        { x: 68, y: 60, icon: 'photo_library', title: 'Immersive galleries', body: 'Large-format project imagery that lets the architecture speak for itself.' },
        { x: 45, y: 85, icon: 'design_services', title: 'Turnkey services', body: 'Interior design, decor, and finishing for apartments and villas, clearly laid out.' },
        { x: 88, y: 42, icon: 'speed', title: 'Fast despite imagery', body: 'A tuned Angular build keeps heavy, high-res photography loading fast.' },
      ],
      lighthouse: { performance: 91, accessibility: 97, bestPractices: 100, seo: 97 },
      codeSnippet: `@Component({
  selector: 'vx-project-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<img loading="lazy" [ngSrc]="p.image" />\`
})
export class ProjectGallery {}`,
      stickyNote: 'For a design studio, the website is the first project the client sees — treat it like one.',
    },
    gallery: [
      { src: vertexHome, alt: 'VERTEX Maison home with full-bleed hero', device: 'desktop' },
      { src: vertexServices, alt: 'Interior design and finishing services', device: 'desktop' },
      { src: vertexMoodBoards, alt: 'Curated mood boards', device: 'desktop' },
      { src: vertexProjects, alt: 'Portfolio of architectural projects', device: 'desktop' },
    ],
    features: [
      { icon: 'auto_awesome', title: 'Editorial Design', description: 'Premium typography and whitespace that reads as a luxury brand.' },
      { icon: 'photo_library', title: 'Immersive Galleries', description: 'Large-format, full-bleed project and interior imagery.' },
      { icon: 'palette', title: 'Mood Boards', description: 'Curated material, color, and styling boards per project.' },
      { icon: 'design_services', title: 'Turnkey Services', description: 'Interior design, decor, and finishing for apartments and villas.' },
      { icon: 'download', title: 'Portfolio Download', description: 'A one-tap portfolio download built to capture leads.' },
      { icon: 'devices', title: 'Fully Responsive', description: 'An elegant experience from mobile to large desktop.' },
    ],
    techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'SSR', 'NgOptimizedImage', 'REST API', 'SEO', 'Framer-style Motion'],
    results: [
      { value: 6, label: 'Editorial sections', sublabel: 'home to contact' },
      { value: 100, suffix: '%', label: 'Brand-led design', sublabel: 'no templates, all bespoke' },
      { value: 3, label: 'Months to launch', sublabel: 'end-to-end delivery' },
      { value: 100, suffix: '%', label: 'Responsive', sublabel: 'every device, every screen' },
    ],
    testimonial: {
      quote:
        'The website finally feels like our work — considered, elegant, and premium. It’s become our strongest first impression with new clients.',
      name: 'VERTEX Maison',
      role: 'Studio Founders',
      company: 'VERTEX Maison',
    },
    related: ['easytrips', 'sooqcars', 'ancientegypt'],
  },

  // ─── Ancient Egypt — Mobile App (multi-vertical commerce) ─────────
  {
    id: 'ancientegypt',
    aliases: ['ancient-egypt'],
    title: 'Ancient Egypt',
    tagline: 'Egyptian heritage, in your pocket.',
    description:
      'A multi-vertical commerce app bringing the spirit of Egyptian heritage to modern shopping — authentic food, clothing, original perfumes, and guided tours in one experience, published on the App Store and Google Play in six languages.',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    client: 'Ancient Egypt',
    industry: 'E-Commerce · Heritage & Tourism',
    year: '2025',
    timeline: '4 Months',
    services: ['Mobile App Development', 'UI/UX Design', 'Backend & API Integration', 'App Store Publishing'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.tolba.ancientegypt',
    heroImage: u('photo-1568322445389-f64ac2515020', 2000),
    accent: { primary: '#e8823c', secondary: '#8b5cf6', surface: '#241206' },
    problem:
      'Egyptian heritage products — authentic food, traditional clothing, aged perfumes, cultural tours — lived in scattered sellers and social pages, with no single trusted place to buy them, least of all for the global diaspora and tourists who want them most. Ancient Egypt set out to unite these very different categories into one polished, multilingual shopping experience.',
    goals: [
      'Unite food, clothing, perfumes, and tours in one app',
      'Serve a global audience in six languages',
      'A fast, enjoyable shopping and checkout flow',
      'Publish natively on both the App Store and Google Play',
    ],
    challenges: [
      'Four very different verticals under one coherent experience',
      'Full localization across six languages, including RTL',
      'Physical goods and bookable tours in a single cart',
    ],
    solution: {
      intro:
        'We built Ancient Egypt as a single, warm, multilingual commerce app where physical goods and bookable experiences live side by side. A tabbed structure — Products, Menu, Offers, Cart, Orders, Profile — keeps four verticals navigable, while a unified cart handles a koshary order, a bottle of aged perfume, and a Pyramids tour in one checkout.',
      points: [
        {
          icon: 'storefront',
          title: 'Four verticals, one app',
          body: 'Food, clothing, original perfumes, and guided tours unified under a clear tabbed structure — Products, Menu, Offers and more.',
        },
        {
          icon: 'translate',
          title: 'Six languages',
          body: 'Full localization for a global audience of diaspora and tourists, including right-to-left layouts.',
        },
        {
          icon: 'shopping_cart',
          title: 'Unified cart & checkout',
          body: 'Physical goods and bookable tours share one cart, order summary, and checkout flow.',
        },
      ],
    },
    process: [
      { phase: '01', title: 'Discovery', description: 'Mapped the four verticals and the global audience they serve.', duration: '2 weeks' },
      { phase: '02', title: 'UX Flows', description: 'A tabbed structure unifying products, menu, offers, and tours.', duration: '2 weeks' },
      { phase: '03', title: 'UI Design', description: 'A warm heritage palette with imagery-led product cards.', duration: '3 weeks' },
      { phase: '04', title: 'Development', description: 'Native app build with a commerce backend and six-language localization.', duration: '7 weeks' },
      { phase: '05', title: 'Testing', description: 'Cross-device QA across all six languages and both platforms.', duration: '1 week' },
      { phase: '06', title: 'Launch', description: 'Published to the App Store and Google Play.', duration: '1 week' },
    ],
    gallery: [
      { src: aeMenu, alt: 'Featured Egyptian food — koshary', device: 'phone' },
      { src: aeOffers, alt: 'Special offer — Pyramids & Museum tour', device: 'phone' },
      { src: aeDetails, alt: 'Tour details with image gallery', device: 'phone' },
      { src: aeCart, alt: 'Unified cart and order summary', device: 'phone' },
      { src: aePerfume, alt: 'Original Egyptian perfumes product page', device: 'phone' },
    ],
    features: [
      { icon: 'restaurant', title: 'Authentic Food', description: 'Traditional Egyptian dishes like koshary, ordered in a tap.' },
      { icon: 'checkroom', title: 'Clothing', description: 'Stylish, heritage-inspired outfits for every taste.' },
      { icon: 'local_mall', title: 'Original Perfumes', description: 'Aged oils and perfumes made with ancient Egyptian methods.' },
      { icon: 'tour', title: 'Guided Tours', description: 'Bookable cultural experiences like the Pyramids & Museum tour.' },
      { icon: 'sell', title: 'Exclusive Offers', description: 'A dedicated offers tab with special deals and discounts.' },
      { icon: 'translate', title: 'Six Languages', description: 'Full localization to serve customers around the world.' },
    ],
    techStack: ['Flutter', 'Dart', 'REST API', 'Localization (i18n)', 'Secure Payments', 'Push Notifications', 'App Store', 'Google Play'],
    results: [
      { value: 4, label: 'Verticals in one', sublabel: 'food, clothing, perfume, tours' },
      { value: 6, label: 'Languages', sublabel: 'a global audience' },
      { value: 2, label: 'Platforms', sublabel: 'iOS & Android, published' },
      { value: 6, label: 'App sections', sublabel: 'products to profile' },
    ],
    testimonial: {
      quote:
        'They brought four completely different product worlds into one app that still feels simple. Customers shop food, fashion, perfume, and tours without ever feeling lost.',
      name: 'Ancient Egypt',
      role: 'Founder',
      company: 'Ancient Egypt',
    },
    related: ['q8nitro', 'sytourism', 'halarashaqaty'],
  },

  // ─── Hala Rashaqaty — Mobile App (wellness appointment booking) ───
  {
    id: 'halarashaqaty',
    aliases: ['hala-rashaqaty', 'hala'],
    title: 'Hala Rashaqaty',
    tagline: 'Your path to a healthier life.',
    description:
      'An Arabic wellness and fitness appointment-booking app — a guided four-step booking flow, live availability calendar, and full appointment management, published on the App Store for a health and body-wellness studio.',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    client: 'Hala Rashaqaty',
    industry: 'Health & Wellness',
    year: '2025',
    timeline: '3 Months',
    services: ['Mobile App Development', 'UI/UX Design', 'Booking System', 'App Store Publishing'],
    liveUrl: 'https://apps.apple.com/us/app/id6757873185',
    heroImage: u('photo-1571019613454-1cb2f99b2d8b', 2000),
    accent: { primary: '#3ec46d', secondary: '#8fd14f', surface: '#0b1a12' },
    problem:
      'A wellness studio was managing client appointments over calls and messages — a bottleneck that lost bookings, double-booked slots, and gave clients no way to see availability or track their own visits. They needed an Arabic-first app that made booking a session as simple as a few taps, and gave clients ownership of their schedule.',
    goals: [
      'Turn call-based booking into a self-service flow',
      'Show live availability by day and time slot',
      'Let clients track, confirm, and cancel their own appointments',
      'An Arabic-first, RTL experience published on the App Store',
    ],
    challenges: [
      'A multi-step booking flow that stays effortless',
      'Live slot availability without double-booking',
      'Clear appointment states — confirmed, cancelled — with easy management',
    ],
    solution: {
      intro:
        'We built Hala Rashaqaty around a guided four-step booking flow — choose a service, pick a date and time, confirm — paired with a personal appointments screen where clients track every booking. A live calendar surfaces real availability, and swipe gestures make cancelling or removing a booking effortless, all in a clean Arabic-first RTL interface.',
      points: [
        {
          icon: 'event_available',
          title: 'Four-step booking',
          body: 'Choose a service, date, and time through a clear stepped wizard — booking a session in under a minute.',
        },
        {
          icon: 'calendar_month',
          title: 'Live availability',
          body: 'A day-and-time calendar surfaces real open slots, so clients book what’s actually free.',
        },
        {
          icon: 'manage_accounts',
          title: 'Appointment management',
          body: 'A personal screen to track, confirm, and swipe-to-cancel bookings — clients own their schedule.',
        },
      ],
    },
    process: [
      { phase: '01', title: 'Discovery', description: 'Mapped the studio’s services and manual booking bottlenecks.', duration: '1 week' },
      { phase: '02', title: 'UX Flows', description: 'Designed the four-step booking wizard and appointment management.', duration: '2 weeks' },
      { phase: '03', title: 'UI Design', description: 'A fresh green wellness palette with a clean Arabic-first RTL layout.', duration: '2 weeks' },
      { phase: '04', title: 'Development', description: 'Native build with a booking backend and live availability.', duration: '5 weeks' },
      { phase: '05', title: 'Testing', description: 'Cross-device QA and booking-conflict testing.', duration: '1 week' },
      { phase: '06', title: 'Launch', description: 'Published to the App Store.', duration: '1 week' },
    ],
    gallery: [
      { src: halaHome, alt: 'Hala Rashaqaty home — book or view appointments', device: 'phone' },
      { src: halaServices, alt: 'Step 1 — choose a service', device: 'phone' },
      { src: halaBooking, alt: 'Step 2 — pick a date and time', device: 'phone' },
      { src: halaAppointments, alt: 'My upcoming appointments with statuses', device: 'phone' },
    ],
    features: [
      { icon: 'event_available', title: 'Four-Step Booking', description: 'A guided wizard: service, date, time, confirm.' },
      { icon: 'calendar_month', title: 'Live Calendar', description: 'Real day-and-time availability, no double-booking.' },
      { icon: 'fact_check', title: 'Appointment Status', description: 'Clear confirmed and cancelled states at a glance.' },
      { icon: 'swipe', title: 'Swipe to Cancel', description: 'Swipe gestures to cancel or remove a booking.' },
      { icon: 'person', title: 'Client Profile', description: 'A personal account with full booking history.' },
      { icon: 'translate', title: 'Arabic-First RTL', description: 'A clean, natively right-to-left experience.' },
    ],
    techStack: ['Flutter', 'Dart', 'REST API', 'Booking Engine', 'Push Notifications', 'Secure Auth', 'App Store', 'RTL'],
    results: [
      { value: 4, label: 'Step booking flow', sublabel: 'service to confirmation' },
      { value: 100, suffix: '%', label: 'Self-service', sublabel: 'no more phone bookings' },
      { value: 1, label: 'Arabic-first', sublabel: 'full RTL interface' },
      { value: 1, label: 'Published', sublabel: 'live on the App Store' },
    ],
    testimonial: {
      quote:
        'Booking used to mean a phone call and a lot of back-and-forth. Now our clients book, confirm, and manage their own sessions in seconds — and we never double-book.',
      name: 'Hala Rashaqaty',
      role: 'Studio Owner',
      company: 'Hala Rashaqaty',
    },
    related: ['ancientegypt', 'q8nitro', 'sytourism'],
  },
]

/** Look up a case study by id or alias (case-insensitive), localized for `lang`. */
export function getCaseStudy(id?: string, lang: string = 'en'): CaseStudy | undefined {
  if (!id) return undefined
  const key = id.toLowerCase()
  const base = CASE_STUDIES.find((c) => c.id === key || c.aliases?.includes(key))
  if (!base) return undefined
  if (lang !== 'ar') return base
  return deepMergeCaseStudy(base, CASE_STUDIES_AR[base.id])
}

export function getRelated(study: CaseStudy, lang: string = 'en'): CaseStudy[] {
  return study.related
    .map((id) => getCaseStudy(id, lang))
    .filter((c): c is CaseStudy => Boolean(c))
}
