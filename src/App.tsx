import { useState, useEffect, useRef } from 'react';
import LampIntro from './LampIntro';
import {
  Mail,
  Phone,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  ShoppingBag,
  Search,
  TrendingUp,
  RefreshCw,
  Package,
  BarChart3,
  Database,
  FileSpreadsheet,
  PenTool,
  Users,
  Target,
  Zap,
  Award,
  Clock,
  Shield,
  Star,
  ChevronUp,
  Menu,
  X,
  CheckCircle2,
  Layers,
  Box,
  Globe,
  Briefcase,
  Send,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Settings,
  Sun,
  Moon,
  Sparkles,
  Eye,
  Play,
  Pause,
  Maximize2,
  XCircle,
  Info,
  AlertCircle,
  MessageSquare,
  Building2,
  DollarSign,
  Clock3,
  ArrowRight,
  Heart,
  ThumbsUp,
  Monitor,
  LayoutGrid,
  List,
  FileImage,
  ImageOff,
  Edit3,
  Lightbulb,
  Lock,
  HelpCircle,
  FileDown,
  Loader2,
} from 'lucide-react';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

interface PortfolioProject {
  id: string;
  title: string;
  platforms: string[];
  description: string;
  overview: string;
  objective: string;
  responsibilities: string[];
  process: string[];
  outcome: string;
  tools: string[];
  skills: string[];
  results: string[];
  category: string;
  date: string;
  status: string;
  screenshots: string[];
}

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  overview: string;
  process: string[];
  deliverables: string[];
  tools: string[];
  results: string[];
  faq: { q: string; a: string }[];
}

// ============================================
// CONFIG — live endpoints
// ============================================
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdvqaqz';
const CALENDLY_URL = 'https://calendly.com/jadraqueraymart8';

// ============================================
// BRAND LOGOS — pixel-perfect official-color SVGs + uploaded images
// ============================================

// Shopify — official 3D shopping bag with white S
const ShopifyLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shopFront" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A8CE4A"/>
        <stop offset="100%" stopColor="#89AE36"/>
      </linearGradient>
      <linearGradient id="shopSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#5E8E3E"/>
        <stop offset="100%" stopColor="#4A7030"/>
      </linearGradient>
      <linearGradient id="shopTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C3DC7E"/>
        <stop offset="100%" stopColor="#95BF47"/>
      </linearGradient>
    </defs>
    {/* Bag body — front face */}
    <path d="M30 80 L30 200 L145 200 L145 80 Z" fill="url(#shopFront)"/>
    {/* Bag body — right side face (3D) */}
    <path d="M145 80 L170 55 L170 175 L145 200 Z" fill="url(#shopSide)"/>
    {/* Bag top — front rim */}
    <path d="M30 80 L145 80 L170 55 L55 55 Z" fill="url(#shopTop)"/>
    {/* Handles — left */}
    <path d="M65 55 C65 35 80 20 88 20 C96 20 100 30 100 40 L100 55 L92 55 L92 42 C92 34 89 28 88 28 C84 28 73 36 73 55 Z" fill="#5E8E3E"/>
    {/* Handles — right */}
    <path d="M100 55 L100 40 C100 30 104 20 113 20 C121 20 135 35 135 55 L127 55 C127 36 115 28 113 28 C112 28 108 34 108 42 L108 55 Z" fill="#5E8E3E"/>
    {/* White "S" letter */}
    <text x="87" y="168" textAnchor="middle" fontSize="90" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" fill="white" letterSpacing="-2">S</text>
  </svg>
);

// Amazon — official "a" mark with orange smile arrow (matches brand reference)
const AmazonLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* White background circle */}
    <circle cx="100" cy="100" r="100" fill="white"/>
    {/* Big black lowercase "a" — Amazon's iconic a-mark */}
    <text x="100" y="125" textAnchor="middle" fontSize="120" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" fill="#1A1A1A">a</text>
    {/* Orange smile arrow — curves from left to right under the "a" */}
    <path d="M42 155 Q100 185 158 155" stroke="#FF9900" strokeWidth="9" strokeLinecap="round" fill="none"/>
    {/* Arrow tip pointing right */}
    <path d="M148 148 L160 155 L150 165" stroke="#FF9900" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// eBay — official multi-color overlapping wordmark
const EBayLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* White background */}
    <rect width="280" height="100" fill="white"/>
    {/* eBay letters — slightly overlapping, official brand colors */}
    {/* e — red */}
    <text x="-4" y="84" fontSize="90" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" fill="#E53238">e</text>
    {/* b — blue, shifted left to overlap */}
    <text x="54" y="84" fontSize="90" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" fill="#0064D2">b</text>
    {/* a — yellow, shifted left to overlap */}
    <text x="112" y="84" fontSize="90" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" fill="#F5AF02">a</text>
    {/* y — green, shifted left to overlap */}
    <text x="172" y="84" fontSize="90" fontWeight="900" fontFamily="'Arial Black',Arial,sans-serif" fill="#86B817">y</text>
  </svg>
);

// Poshmark — official red/maroon "P" mark
const PoshmarkLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#C4282B"/>
    <text x="24" y="34" textAnchor="middle" fontSize="30" fontWeight="900" fontFamily="Georgia,serif" fill="white">P</text>
  </svg>
);

// Zik Analytics — official teal-gradient background with white eye + spiral
const ZikAnalyticsLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="zikGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3ECFB2"/>
        <stop offset="50%" stopColor="#1A9E8E"/>
        <stop offset="100%" stopColor="#0A5A52"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="36" fill="url(#zikGrad)"/>
    {/* Eye outer shape — wide ellipse */}
    <ellipse cx="100" cy="100" rx="82" ry="52" fill="white"/>
    {/* Eye inner iris — teal circle */}
    <circle cx="100" cy="100" r="36" fill="#1A9E8E"/>
    {/* Spiral/swirl inside iris */}
    <path
      d="M100 72 C120 72 136 86 136 100 C136 114 120 128 100 128 C82 128 68 116 68 102 C68 90 78 82 90 82 C100 82 108 90 108 100 C108 108 102 114 94 112"
      stroke="white" strokeWidth="9" strokeLinecap="round" fill="none"
    />
    {/* Eye corner points */}
    <path d="M18 100 Q50 48 100 48 Q150 48 182 100" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M18 100 Q50 152 100 152 Q150 152 182 100" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
  </svg>
);

// Vendoo — official purple heart-V logomark
const VendooLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#1E0E4B"/>
    <defs>
      <linearGradient id="vGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316"/>
        <stop offset="35%" stopColor="#EC4899"/>
        <stop offset="70%" stopColor="#8B5CF6"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </linearGradient>
    </defs>
    {/* Vendoo V-heart shape */}
    <path d="M24 36 C24 36 10 25 10 17 C10 12 14 9 18 9 C20.5 9 22.5 10.5 24 13 C25.5 10.5 27.5 9 30 9 C34 9 38 12 38 17 C38 25 24 36 24 36Z" stroke="url(#vGrad)" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
  </svg>
);

// Easync — blue cloud-sync icon
const EasyncLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#0EA5E9"/>
    <path d="M33 22a9 9 0 00-18 0 6 6 0 000 12h18a6 6 0 000-12z" fill="white" opacity="0.9"/>
    <path d="M20 29l-3-3 3-3" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 26h5" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M28 26l3 3-3 3" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M31 29h-5" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Google Workspace — official 4-color tile grid
const GoogleWorkspaceLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="18" height="18" rx="3" fill="#4285F4"/>
    <rect x="26" y="4" width="18" height="18" rx="3" fill="#34A853"/>
    <rect x="4" y="26" width="18" height="18" rx="3" fill="#FBBC04"/>
    <rect x="26" y="26" width="18" height="18" rx="3" fill="#EA4335"/>
    <rect x="14" y="14" width="20" height="20" rx="4" fill="white"/>
    <path d="M24 18v6M21 21h6" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Google Sheets — official green document icon
const GoogleSheetsLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 4H12a4 4 0 00-4 4v32a4 4 0 004 4h24a4 4 0 004-4V18L30 4z" fill="#34A853"/>
    <path d="M30 4l10 14H30V4z" fill="#188038"/>
    <rect x="14" y="22" width="20" height="2.5" rx="1" fill="white"/>
    <rect x="14" y="28" width="20" height="2.5" rx="1" fill="white"/>
    <rect x="14" y="34" width="13" height="2.5" rx="1" fill="white"/>
    <line x1="24" y1="22" x2="24" y2="36" stroke="white" strokeWidth="1" opacity="0.5"/>
  </svg>
);

// Microsoft Excel — official green Excel icon
const ExcelLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 4H12a4 4 0 00-4 4v32a4 4 0 004 4h24a4 4 0 004-4V18L28 4z" fill="#217346"/>
    <path d="M28 4l12 14H28V4z" fill="#185C37"/>
    <path d="M15 23l3.5 5L22 23h3l-5 7.5 5 7.5h-3l-3.5-5.5L15 38h-3l5-7.5L12 23h3z" fill="white"/>
  </svg>
);

// Canva — official blue-to-purple gradient rounded square with Canva script text
const CanvaLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="canvaGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00C4CC"/>
        <stop offset="50%" stopColor="#7B3FE4"/>
        <stop offset="100%" stopColor="#9B59D0"/>
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="44" fill="url(#canvaGrad2)"/>
    {/* "Canva" in white italic script-style */}
    <text
      x="100" y="122"
      textAnchor="middle"
      fontSize="54"
      fontStyle="italic"
      fontWeight="600"
      fontFamily="'Georgia','Times New Roman',serif"
      fill="white"
      letterSpacing="-1"
    >Canva</text>
  </svg>
);

// QuickBooks — official green QB logo
const QuickBooksLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="qbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2CA01C"/>
        <stop offset="100%" stopColor="#1a7a12"/>
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="10" fill="url(#qbGrad)"/>
    <circle cx="20" cy="24" r="8" stroke="white" strokeWidth="3" fill="none"/>
    <circle cx="20" cy="24" r="3.5" fill="white"/>
    <path d="M28 28l6 6" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <text x="10" y="15" fontSize="9" fontWeight="bold" fontFamily="Arial,sans-serif" fill="white">QB</text>
  </svg>
);

// ============================================
// MODAL COMPONENT
// ============================================

function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-modal-enter`}
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          {title && <h3 className="text-xl font-semibold text-slate-900">{title}</h3>}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ============================================
// ANIMATED COUNTER HOOK
// ============================================

function useCounter(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

// ============================================
// INTERSECTION OBSERVER HOOK
// ============================================

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showIntro, setShowIntro] = useState(() => sessionStorage.getItem('lampIntroSeen') !== 'true');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  // Modal States
  const [hireMeModalOpen, setHireMeModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [shopifyCaseStudyOpen, setShopifyCaseStudyOpen] = useState(false);
  const [geoEssentialsCaseStudyOpen, setGeoEssentialsCaseStudyOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState<string | null>(null);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState<string | null>(null);
  const [skillModalOpen, setSkillModalOpen] = useState<string | null>(null);
  const [toolModalOpen, setToolModalOpen] = useState<string | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [testimonialModalOpen, setTestimonialModalOpen] = useState<number | null>(null);

  // Nav section modals (About / Services / Portfolio / Skills / Contact / Resources)
  const [navModal, setNavModal] = useState<string | null>(null);
  // Sub-navigation tabs inside nav modals
  const [portfolioTab, setPortfolioTab] = useState<'Case Studies' | 'Product Listings' | 'SEO Projects'>('Case Studies');
  const [skillsTab, setSkillsTab] = useState<'Platforms' | 'Tools'>('Platforms');
  const [contactTab, setContactTab] = useState<'Send a Message' | 'Schedule a Call'>('Send a Message');

  // Lamp login widget
  const [lampOn, setLampOn] = useState(false);
  const [loginCardVisible, setLoginCardVisible] = useState(false);

  // Settings
  const [darkMode, setDarkMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Hire Me Form
  const [hireForm, setHireForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    platform: '',
    budget: '',
    message: '',
  });

  // Schedule Form
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    timezone: '',
    method: 'Video Call',
    notes: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================
  // DATA DEFINITIONS
  // ============================================

  const services: Service[] = [
    {
      id: 'product-listing',
      icon: ShoppingBag,
      title: 'Product Listing',
      description: 'Professional product listings optimized for maximum visibility and conversions.',
      overview: 'Create compelling, SEO-optimized product listings that convert browsers into buyers across Shopify, Amazon, eBay, and Poshmark.',
      process: [
        'Research product specifications and market positioning',
        'Optimize titles with high-converting keywords',
        'Write compelling product descriptions',
        'Configure variants, pricing, and inventory',
        'Add high-quality images following platform guidelines',
        'Set up category-specific attributes and tags',
      ],
      deliverables: ['Complete product listings', 'SEO-optimized titles and descriptions', 'Proper categorization', 'Variant configuration', 'Image optimization'],
      tools: ['Shopify', 'Amazon Seller Central', 'eBay Seller Hub', 'Poshmark'],
      results: ['50% increase in product visibility', '30% improvement in conversion rates', 'Reduced listing time by 60%'],
      faq: [
        { q: 'How long does it take to list a product?', a: 'Typically 15-30 minutes per listing depending on complexity and platform.' },
        { q: 'Do you provide images?', a: 'I optimize and upload provided images. Image creation is available as an add-on service.' },
      ],
    },
    {
      id: 'product-research',
      icon: Search,
      title: 'Product Research',
      description: 'Data-driven research to identify profitable products and market opportunities.',
      overview: 'Comprehensive product research using advanced tools to identify profitable opportunities with low competition and high demand.',
      process: [
        'Analyze market trends and demand',
        'Research competitor pricing and strategies',
        'Identify profitable niches',
        'Calculate profit margins and ROI',
        'Generate research reports with recommendations',
      ],
      deliverables: ['Detailed research reports', 'Competitor analysis', 'Profit margin calculations', 'Product recommendations', 'Market insights'],
      tools: ['Zik Analytics', 'Google Trends', 'Amazon Best Sellers', 'eBay Terapeak'],
      results: ['Identified 100+ profitable products', 'Average 40% profit margin', 'Reduced research time by 50%'],
      faq: [
        { q: 'What platforms do you research?', a: 'I research across Amazon, eBay, Shopify, and Poshmark based on your target market.' },
        { q: 'How many products do you research?', a: 'Packages range from 10 to 100+ products based on your needs.' },
      ],
    },
    {
      id: 'seo-optimization',
      icon: TrendingUp,
      title: 'SEO Optimization',
      description: 'Strategic keyword integration to improve search rankings and drive organic traffic.',
      overview: 'Optimize your listings with strategic keywords, meta descriptions, and tags to rank higher in platform search results.',
      process: [
        'Keyword research for your niche',
        'Optimize product titles',
        'Rewrite descriptions with SEO best practices',
        'Configure meta descriptions and tags',
        'Implement backend keywords',
      ],
      deliverables: ['Keyword research report', 'Optimized titles', 'SEO descriptions', 'Backend keywords', 'Performance tracking setup'],
      tools: ['Zik Analytics', 'Helium 10', 'Google Keyword Planner', 'Platform analytics'],
      results: ['40% improvement in search rankings', 'Doubled organic traffic', 'Increased click-through rates by 25%'],
      faq: [
        { q: 'How long until I see results?', a: 'SEO improvements typically show results within 2-4 weeks.' },
        { q: 'Do you guarantee rankings?', a: 'While I use proven strategies, rankings depend on many factors. I guarantee significant optimization improvement.' },
      ],
    },
    {
      id: 'description-writing',
      icon: PenTool,
      title: 'Description Writing',
      description: 'Compelling, SEO-friendly product descriptions that engage customers and drive sales.',
      overview: 'Craft persuasive product descriptions that tell your product story while incorporating SEO best practices for maximum visibility.',
      process: [
        'Understand product features and benefits',
        'Research target audience pain points',
        'Write benefit-focused copy',
        'Incorporate keywords naturally',
        'Format for readability and scanability',
      ],
      deliverables: ['Compelling product descriptions', 'Feature-benefit analysis', 'SEO-optimized copy', 'Bullet point highlights', 'Call-to-action elements'],
      tools: ['Canva', 'Grammarly', 'Hemingway Editor', 'Platform editors'],
      results: ['25% increase in conversion rates', 'Lower bounce rates', 'Improved customer engagement'],
      faq: [
        { q: 'What makes your descriptions different?', a: 'I focus on benefits over features, use persuasive copywriting techniques, and optimize for both SEO and readability.' },
        { q: 'What length should descriptions be?', a: 'I optimize length per platform requirements - typically 150-300 words for optimal performance.' },
      ],
    },
    {
      id: 'crosslisting',
      icon: RefreshCw,
      title: 'Crosslisting Management',
      description: 'Efficient crosslisting across multiple platforms to maximize reach and streamline operations.',
      overview: 'List your products across multiple marketplaces simultaneously, maintaining consistent inventory and avoiding overselling.',
      process: [
        'Set up crosslisting workflow',
        'Configure platform-specific templates',
        'Sync inventory across platforms',
        'Monitor listings for errors',
        'Optimize for each platform requirements',
      ],
      deliverables: ['Cross-platform listings', 'Inventory sync setup', 'Platform-specific optimization', 'Listing templates', 'Error monitoring'],
      tools: ['Vendoo', 'Easync', 'List Perfectly', 'Manual management tools'],
      results: ['50% reduction in listing time', 'Multiplied sales channels', 'Zero overselling incidents'],
      faq: [
        { q: 'Which platforms can you crosslist to?', a: 'Shopify, Amazon, eBay, Poshmark, Mercari, Facebook Marketplace, and more.' },
        { q: 'How do you prevent overselling?', a: 'Real-time inventory sync and monitoring to automatically remove sold items across all platforms.' },
      ],
    },
    {
      id: 'order-fulfillment',
      icon: Package,
      title: 'Order Fulfillment',
      description: 'End-to-end order processing, tracking, and fulfillment coordination.',
      overview: 'Manage your orders from purchase to delivery, ensuring customer satisfaction with timely processing and communication.',
      process: [
        'Monitor incoming orders',
        'Verify order details and payment',
        'Process and pack orders',
        'Generate shipping labels',
        'Update tracking information',
        'Handle customer inquiries',
      ],
      deliverables: ['Order processing', 'Shipping label creation', 'Tracking updates', 'Customer communication', 'Issue resolution'],
      tools: ['Shipping platforms', 'Platform order management', 'Tracking tools', 'Customer service software'],
      results: ['99.9% accuracy rate', 'Same-day processing', 'Improved customer satisfaction scores'],
      faq: [
        { q: 'Do you handle physical fulfillment?', a: 'I manage the administrative side. Physical packing is typically handled by you or your fulfillment center, but I coordinate everything.' },
        { q: 'What platforms do you support?', a: 'All major e-commerce platforms including Shopify, Amazon FBA/MFN, eBay, and Poshmark.' },
      ],
    },
    {
      id: 'inventory-tracking',
      icon: Database,
      title: 'Inventory Tracking',
      description: 'Real-time inventory management to prevent stockouts and maintain accuracy.',
      overview: 'Maintain accurate inventory records across all platforms with real-time updates and automated alerts.',
      process: [
        'Set up inventory management system',
        'Sync across all sales channels',
        'Monitor stock levels',
        'Generate reorder alerts',
        'Update listings automatically',
      ],
      deliverables: ['Inventory dashboard', 'Stock level monitoring', 'Reorder alerts', 'Sales reports', 'Platform sync'],
      tools: ['Google Sheets', 'Excel', 'Platform inventory tools', 'Third-party management software'],
      results: ['60% reduction in stockouts', '99% inventory accuracy', 'Automated reorder system'],
      faq: [
        { q: 'How often is inventory updated?', a: 'Real-time sync across platforms, with manual audits as needed.' },
        { q: 'Can you handle multi-location inventory?', a: 'Yes, I can track inventory across multiple warehouses and locations.' },
      ],
    },
    {
      id: 'marketplace-support',
      icon: Globe,
      title: 'Marketplace Support',
      description: 'Comprehensive support across all major e-commerce platforms.',
      overview: 'Full-service support for all major marketplaces including account management, listing optimization, and customer service.',
      process: [
        'Platform setup and optimization',
        'Account health monitoring',
        'Issue resolution and appeals',
        'Customer service management',
        'Performance reporting',
      ],
      deliverables: ['Platform optimization', 'Account health monitoring', 'Issue resolution', 'Customer support', 'Performance reports'],
      tools: ['All major platforms', 'Help desk software', 'Analytics tools', 'Communication platforms'],
      results: ['Maintained 100% account health', 'Resolved 95% of issues within 24 hours', 'Improved seller metrics'],
      faq: [
        { q: 'Which platforms do you support?', a: 'Shopify, Amazon Seller Central, eBay Seller Hub, Poshmark, Mercari, Facebook Marketplace, and more.' },
        { q: 'Can you help with account issues?', a: 'Yes, I assist with appeals, policy violations, and account reinstatement processes.' },
      ],
    },
  ];

  const skills = [
    { name: 'Shopify Product Listing', icon: ShoppingBag, description: 'Complete product listing creation on Shopify including variants, collections, and SEO optimization', tools: ['Shopify Admin', 'Shopify Flow', 'Metafields'], tasks: ['Product creation', 'Variant setup', 'Collection management', 'Theme customization'] },
    { name: 'Amazon Product Listing', icon: Layers, description: 'Amazon Seller Central product listings with A+ content and backend keywords optimization', tools: ['Amazon Seller Central', 'Helium 10', 'Jungle Scout'], tasks: ['Product creation', 'A+ Content', 'Keyword optimization', 'Category management'] },
    { name: 'eBay Product Listing', icon: ShoppingBag, description: 'eBay listing creation with SEO-optimized titles and eBay-specific best practices', tools: ['eBay Seller Hub', 'Terapeak', 'eBay Tools'], tasks: ['Listing creation', 'Template design', 'Category research', 'Promoted listings'] },
    { name: 'Poshmark Listing', icon: ShoppingBag, description: 'Fashion-focused Poshmark listings with platform-specific optimization', tools: ['Poshmark Seller Dashboard', 'Poshmark Tools'], tasks: ['Product posting', 'Sharing strategies', 'Inventory management', 'Pricing optimization'] },
    { name: 'Product Research', icon: Search, description: 'Data-driven product research to identify profitable opportunities with competition analysis', tools: ['Zik Analytics', 'Helium 10', 'Jungle Scout', 'Google Trends'], tasks: ['Market analysis', 'Competitor research', 'Profit calculation', 'Trend identification'] },
    { name: 'SEO Optimization', icon: TrendingUp, description: 'Strategic keyword research and implementation for improved search rankings', tools: ['Google Keyword Planner', 'Ahrefs', 'SEMrush', 'Platform Tools'], tasks: ['Keyword research', 'On-page optimization', 'Title optimization', 'Backend keywords'] },
    { name: 'Product Description Writing', icon: PenTool, description: 'Compelling, conversion-focused product descriptions optimized for SEO', tools: ['Grammarly', 'Hemingway Editor', 'Canva'], tasks: ['Description writing', 'Feature highlighting', 'Benefit mapping', 'Copy editing'] },
    { name: 'Crosslisting Expert', icon: RefreshCw, description: 'Efficient crosslisting across multiple platforms with inventory synchronization', tools: ['Vendoo', 'Easync', 'List Perfectly'], tasks: ['Multi-platform listing', 'Inventory sync', 'Template management', 'Error monitoring'] },
    { name: 'Order Fulfillment', icon: Package, description: 'End-to-end order processing and fulfillment coordination', tools: ['Shipping Platforms', 'Platform OM', 'Label Generators'], tasks: ['Order processing', 'Label creation', 'Tracking updates', 'Issue resolution'] },
    { name: 'Inventory Management', icon: Database, description: 'Real-time inventory tracking and management across platforms', tools: ['Google Sheets', 'Excel', 'Inventory Software'], tasks: ['Stock tracking', 'Reorder alerts', 'Sync management', 'Reporting'] },
    { name: 'Data Entry', icon: FileSpreadsheet, description: 'Accurate data entry and management for product information', tools: ['Excel', 'Google Sheets', 'Platform Tools'], tasks: ['Data input', 'Data cleaning', 'Migration', 'Validation'] },
    { name: 'Google Sheets', icon: FileSpreadsheet, description: 'Advanced spreadsheet management with formulas and automation', tools: ['Google Sheets', 'Apps Script'], tasks: ['Template creation', 'Formula automation', 'Data analysis', 'Dashboard building'] },
    { name: 'Microsoft Excel', icon: FileSpreadsheet, description: 'Professional Excel usage for data management and reporting', tools: ['Microsoft Excel', 'Pivot Tables', 'Charts'], tasks: ['Data organization', 'Reporting', 'Analysis', 'Automation'] },
    { name: 'Customer Support', icon: Users, description: 'Professional customer service across all channels', tools: ['Help Desk Software', 'Chat Tools', 'Email'], tasks: ['Inquiry handling', 'Issue resolution', 'Follow-up', 'Feedback management'] },
  ];

  const toolsData = [
    { name: 'Shopify', Logo: ({ className = "w-8 h-8" }: { className?: string }) => (
      <img src="/logos/shopify/image.png" alt="Shopify" className={`${className} object-contain drop-shadow-sm`} />
    ), experience: 'Expert', description: 'Complete store management from product listing to order fulfillment', tasks: ['Product management', 'Order processing', 'Analytics', 'Theme editing'] },
    { name: 'Amazon Seller Central', Logo: AmazonLogo, experience: 'Expert', description: 'Full Amazon marketplace management including FBA and FBM', tasks: ['Listing creation', 'Inventory management', 'Advertising', 'Reports'] },
    { name: 'eBay Seller Hub', Logo: EBayLogo, experience: 'Expert', description: 'Complete eBay selling operations including international shipping', tasks: ['Listing management', 'Order processing', 'Promoted listings', 'Analytics'] },
    { name: 'Poshmark', Logo: PoshmarkLogo, experience: 'Expert', description: 'Fashion marketplace expertise with sharing strategies', tasks: ['Product posting', 'Social sharing', 'Inventory sync', 'Pricing'] },
    { name: 'Zik Analytics', Logo: ZikAnalyticsLogo, experience: 'Advanced', description: 'eBay product research and market analysis', tasks: ['Product research', 'Competitor analysis', 'Profit calculation', 'Trend spotting'] },
    { name: 'Vendoo', Logo: VendooLogo, experience: 'Expert', description: 'Multi-platform crosslisting and inventory management', tasks: ['Crosslisting', 'Inventory sync', 'Bulk editing', 'Order routing'] },
    { name: 'Easync', Logo: EasyncLogo, experience: 'Intermediate', description: 'Dropshipping automation and fulfillment', tasks: ['Product sourcing', 'Order automation', 'Price monitoring', 'Inventory sync'] },
    { name: 'Google Workspace', Logo: GoogleWorkspaceLogo, experience: 'Expert', description: 'Complete Google productivity suite — Gmail, Drive, Docs, Sheets, Calendar', tasks: ['Sheets', 'Docs', 'Drive', 'Calendar', 'Gmail'] },
    { name: 'Google Sheets', Logo: GoogleSheetsLogo, experience: 'Expert', description: 'Advanced spreadsheet management for inventory tracking and reporting', tasks: ['Inventory tracking', 'Formulas & automation', 'Dashboards', 'Reporting'] },
    { name: 'Microsoft Excel', Logo: ExcelLogo, experience: 'Advanced', description: 'Professional Excel for data analysis and business reporting', tasks: ['Data organization', 'Pivot tables', 'Reporting', 'Automation'] },
    { name: 'Canva', Logo: CanvaLogo, experience: 'Intermediate', description: 'Graphic design for product images and marketing materials', tasks: ['Image editing', 'Social posts', 'Infographics', 'Templates'] },
    { name: 'Bookkeeping & QuickBooks', Logo: QuickBooksLogo, experience: 'In Progress', description: 'Currently learning QuickBooks for financial management', tasks: ['Income tracking', 'Expense management', 'Reporting', 'Invoicing'] },
  ];

  const portfolioProjects: PortfolioProject[] = [
    {
      id: 'shopify-listings',
      title: 'Shopify Product Listings',
      platforms: ['Shopify'],
      description: 'Created 500+ optimized product listings with SEO-friendly descriptions and proper categorization.',
      overview: 'Managed complete product catalog migration and optimization for a Shopify home goods store.',
      objective: 'Migrate 500+ products to Shopify with improved SEO and organization.',
      responsibilities: ['Product listing creation', 'SEO optimization', 'Category organization', 'Variant configuration', 'Image optimization'],
      process: ['Analyzed existing catalog', 'Keyword research', 'Created listing templates', 'Batch processed products', 'Quality verification'],
      outcome: 'Successfully migrated all products with 50% improvement in search visibility.',
      tools: ['Shopify Admin', 'Excel', 'Keyword Tools', 'Image Tools'],
      skills: ['Shopify Management', 'SEO', 'Data Entry', 'Image Optimization'],
      results: ['500+ products listed', '50% visibility increase', '30% conversion improvement', 'Reduced setup time by 40%'],
      category: 'Product Listing',
      date: '2024',
      status: 'Completed',
      screenshots: [],
    },
    {
      id: 'seo-optimization',
      title: 'SEO Optimized Listings',
      platforms: ['Amazon', 'eBay'],
      description: 'Improved search rankings by 40% through strategic keyword research and listing optimization.',
      overview: 'Complete SEO overhaul for Amazon and eBay stores in the outdoor equipment niche.',
      objective: 'Improve organic search rankings and increase traffic.',
      responsibilities: ['Keyword research', 'Title optimization', 'Description rewriting', 'Backend keyword implementation'],
      process: ['Competitor analysis', 'Keyword gap research', 'Title A/B testing', 'Bulk optimization', 'Performance tracking'],
      outcome: '40% improvement in search rankings within 60 days.',
      tools: ['Helium 10', 'Zik Analytics', 'Amazon Seller Central', 'eBay Seller Hub'],
      skills: ['SEO', 'Keyword Research', 'Listing Optimization', 'Analytics'],
      results: ['40% ranking improvement', '2x organic traffic', '25% conversion increase', '15 new first-page rankings'],
      category: 'SEO',
      date: '2024',
      status: 'Completed',
      screenshots: [],
    },
    {
      id: 'product-research',
      title: 'Product Research Reports',
      platforms: ['Zik Analytics'],
      description: 'Delivered comprehensive product research with profit margin analysis and competition overview.',
      overview: 'Ongoing product research for Amazon FBA private label project.',
      objective: 'Identify 20+ profitable products for private label launch.',
      responsibilities: ['Market analysis', 'Competitor research', 'Profit calculation', 'Report generation'],
      process: ['Niche selection', 'Market analysis', 'Competitor deep-dive', 'Profit modeling', 'Recommendation report'],
      outcome: 'Identified 25 products with 40%+ profit margins.',
      tools: ['Zik Analytics', 'Jungle Scout', 'Helium 10', 'Google Sheets'],
      skills: ['Product Research', 'Market Analysis', 'Data Analysis', 'Reporting'],
      results: ['25 products identified', '40%+ average margin', 'Comprehensive reports', 'Ongoing monitoring'],
      category: 'Research',
      date: '2024',
      status: 'Ongoing',
      screenshots: [],
    },
    {
      id: 'inventory-management',
      title: 'Inventory Management Sheets',
      platforms: ['Google Sheets', 'Excel'],
      description: 'Built automated inventory tracking systems reducing stockouts by 60%.',
      overview: 'Custom inventory management system for multi-channel e-commerce business.',
      objective: 'Create automated inventory tracking across 4 platforms.',
      responsibilities: ['System design', 'Formula creation', 'Automation setup', 'Training'],
      process: ['Requirements analysis', 'System design', 'Build templates', 'Automate syncs', 'Testing and training'],
      outcome: '60% reduction in stockouts, real-time visibility.',
      tools: ['Google Sheets', 'Google Apps Script', 'Excel', 'Inventory APIs'],
      skills: ['Spreadsheet Design', 'Automation', 'API Integration', 'Data Analysis'],
      results: ['60% stockout reduction', 'Real-time sync', 'Automated alerts', 'Custom dashboards'],
      category: 'Systems',
      date: '2024',
      status: 'Completed',
      screenshots: [],
    },
    {
      id: 'marketplace-management',
      title: 'Marketplace Management',
      platforms: ['Amazon', 'eBay', 'Poshmark'],
      description: 'Managed multi-platform stores with consistent branding and inventory sync.',
      overview: 'Complete marketplace management for a clothing and accessories brand.',
      objective: 'Grow sales across multiple marketplaces while maintaining brand consistency.',
      responsibilities: ['Account management', 'Listing optimization', 'Customer service', 'Performance monitoring'],
      process: ['Account audit', 'Optimization plan', 'Implementation', 'Monitoring', 'Reporting'],
      outcome: 'Doubled revenue across platforms in 6 months.',
      tools: ['Seller Platforms', 'Help Desk', 'Analytics Tools', 'Inventory Software'],
      skills: ['Account Management', 'Customer Service', 'Analytics', 'Strategy'],
      results: ['100% revenue growth', 'Account health maintained', 'Customer satisfaction 4.8/5', 'Expanded to new markets'],
      category: 'Management',
      date: '2024',
      status: 'Ongoing',
      screenshots: [],
    },
  ];

  const strengths = [
    { icon: Target, title: 'Detail-Oriented', description: 'Meticulous attention to every aspect of your business' },
    { icon: Layers, title: 'Organized', description: 'Systematic approach to managing complex tasks' },
    { icon: Shield, title: 'Reliable', description: 'Consistent, dependable support you can count on' },
    { icon: Zap, title: 'Fast Learner', description: 'Quick to adapt to new tools and platforms' },
    { icon: Award, title: 'Strong Work Ethic', description: 'Committed to delivering excellence every time' },
    { icon: TrendingUp, title: 'Results-Driven', description: 'Focused on outcomes that grow your business' },
    { icon: Briefcase, title: 'E-Commerce Focused', description: 'Specialized expertise in online retail' },
    { icon: CheckCircle2, title: 'Excellent Attention to Detail', description: 'Precision in every task and deliverable' },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'E-Commerce Store Owner',
      content: 'Raymart transformed our product listings and helped us increase sales by 35%. His attention to detail and SEO expertise are unmatched. Highly recommend for any e-commerce business looking to scale.',
      rating: 5,
      fullContent: 'Working with Raymart has been an absolute game-changer for our Shopify store. He took the time to understand our products, conducted thorough keyword research, and optimized over 500 listings. Our organic traffic increased by 50%, and conversions improved by 35%. His communication is excellent, deadlines are always met, and the quality of work exceeds expectations. I cannot recommend him enough for any e-commerce business looking to scale efficiently.',
    },
    {
      name: 'David K.',
      role: 'Amazon FBA Seller',
      content: 'Outstanding product research and crosslisting support. Ray made managing multiple platforms seamless and efficient. His research reports are thorough and actionable.',
      rating: 5,
      fullContent: 'As an Amazon FBA seller, I was struggling to expand to other platforms while maintaining inventory accuracy. Raymart set up our crosslisting workflow using Vendoo, and now we seamlessly sell on Amazon, eBay, and Poshmark without any overselling issues. His product research has helped us identify profitable products with 40%+ margins. The detailed reports he provides are actionable and have directly contributed to our growth. He is now an essential part of our team.',
    },
    {
      name: 'Jennifer L.',
      role: 'Poshmark Boutique Owner',
      content: 'Raymart\'s dedication and professionalism exceeded our expectations. Our inventory management has never been better. Fast, accurate, and always communicative.',
      rating: 5,
      fullContent: 'I run a Poshmark boutique with over 1,000 active listings, and inventory management was a nightmare before Raymart joined. He implemented a Google Sheets system that syncs across all our platforms, set up automated alerts for low stock, and manages our daily crosslisting. Our stockouts have been reduced by 60%, and listing time is down 50%. His professionalism, quick communication, and dedication to our success make him invaluable.',
    },
  ];

  const stats = [
    { value: 1000, label: 'Products Listed', suffix: '+' },
    { value: 500, label: 'Orders Processed', suffix: '+' },
    { value: 4, label: 'Marketplaces Managed', suffix: '' },
    { value: 100, label: 'SEO Optimized Listings', suffix: '+' },
  ];

  const howIHelp = [
    { title: 'Product Listing', description: 'Professional listings optimized for visibility and conversions' },
    { title: 'Product Research', description: 'Data-driven product identification and analysis' },
    { title: 'SEO Optimization', description: 'Strategic keyword implementation for higher rankings' },
    { title: 'Crosslisting', description: 'Multi-platform selling with inventory sync' },
    { title: 'Inventory Tracking', description: 'Real-time stock management and alerts' },
    { title: 'Order Fulfillment', description: 'End-to-end order processing and tracking' },
    { title: 'Marketplace Management', description: 'Complete platform account management' },
  ];

  const navLinks = [
    { name: 'About', href: '#about', modal: 'about' },
    { name: 'Services', href: '#services', modal: 'services' },
    { name: 'Portfolio', href: '#portfolio', modal: 'portfolio' },
    { name: 'Skills', href: '#skills', modal: 'skills' },
    { name: 'Resources', href: '#resources', modal: 'resources' },
    { name: 'Contact', href: '#contact', modal: 'contact' },
  ];

  const serviceOptions = [
    'Shopify Product Listing',
    'Amazon Listing',
    'eBay Listing',
    'Poshmark Listing',
    'Product Research',
    'SEO Optimization',
    'Description Writing',
    'Crosslisting',
    'Order Fulfillment',
    'Inventory Management',
    'General E-Commerce Support',
  ];

  const platformOptions = ['Shopify', 'Amazon', 'eBay', 'Poshmark', 'Multiple Platforms', 'Other'];
  const budgetOptions = ['Under $3,000', '$3,000 – $7,000', '$7,000 – $15,000', '$15,000+'];
  const timeZones = ['UTC-8 (Pacific)', 'UTC-5 (Eastern)', 'UTC+0 (GMT)', 'UTC+8 (Philippines)', 'Other'];
  const contactMethods = ['Video Call (Zoom/Google Meet)', 'Phone Call', 'Email', 'Chat'];

  // ============================================
  // HANDLERS
  // ============================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Message: formData.message,
          _subject: 'New Contact Form Message from RayVA',
        }),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        setFormError('Something went wrong sending your message. Please try again or email me directly.');
      }
    } catch {
      setFormStatus('error');
      setFormError('Network error. Please check your connection and try again.');
    }
  };

  const [hireFormStatus, setHireFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [hireFormError, setHireFormError] = useState('');

  const handleHireFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHireFormStatus('submitting');
    setHireFormError('');
    try {
      const res = await fetch('https://formspree.io/f/mqevwyqg', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: hireForm.name,
          Email: hireForm.email,
          Company: hireForm.company,
          Service: hireForm.service,
          Platform: hireForm.platform,
          Budget: hireForm.budget,
          Message: hireForm.message,
          _subject: 'New Hire Me Inquiry from RayVA',
        }),
      });
      if (res.ok) {
        setHireFormStatus('success');
        setHireForm({
          name: '',
          email: '',
          company: '',
          service: '',
          platform: '',
          budget: '',
          message: '',
        });
        setTimeout(() => {
          setHireMeModalOpen(false);
          setHireFormStatus('idle');
        }, 1800);
      } else {
        setHireFormStatus('error');
        setHireFormError('Something went wrong sending your inquiry. Please try again or email me directly.');
      }
    } catch {
      setHireFormStatus('error');
      setHireFormError('Network error. Please check your connection and try again.');
    }
  };

  const [scheduleSubmitted, setScheduleSubmitted] = useState(false);
  const [scheduleSubmitting, setScheduleSubmitting] = useState(false);
  const [scheduleError, setScheduleError] = useState('');

  const handleScheduleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleSubmitting(true);
    setScheduleError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: scheduleForm.name,
          Email: scheduleForm.email,
          'Preferred Date': scheduleForm.date,
          'Preferred Time': scheduleForm.time,
          'Time Zone': scheduleForm.timezone,
          'Contact Method': scheduleForm.method,
          Notes: scheduleForm.notes,
          _subject: 'New Discovery Call Request from RayVA',
        }),
      });
      if (res.ok) {
        setScheduleSubmitted(true);
        setScheduleForm({ name: '', email: '', date: '', time: '', timezone: '', method: 'Video Call', notes: '' });
      } else {
        setScheduleError('Something went wrong sending your booking. Please try again or email me directly.');
      }
    } catch {
      setScheduleError('Network error. Please check your connection and try again.');
    } finally {
      setScheduleSubmitting(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  if (showIntro) {
    return (
      <LampIntro
        onComplete={() => {
          sessionStorage.setItem('lampIntroSeen', 'true');
          setShowIntro(false);
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans antialiased ${darkMode ? 'dark bg-slate-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">RayVA</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setNavModal(link.modal)}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => setHireMeModalOpen(true)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
              >
                Hire Me
              </button>
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="p-2 text-slate-600 dark:text-slate-300"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setNavModal(link.modal);
                  }}
                  className="block py-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setHireMeModalOpen(true);
                }}
                className="block w-full text-center py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full"
              >
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 dark:from-slate-800/50 dark:via-slate-900 dark:to-slate-800/30" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/30 dark:from-emerald-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-100/40 dark:from-amber-900/10 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Available for Projects</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                E-Commerce Virtual Assistant Helping{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                  Online Stores
                </span>{' '}
                Grow Efficiently
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Shopify • Amazon • eBay • Poshmark • Crosslisting • Product Research • SEO • Fulfillment
              </p>

              <p className="text-lg text-slate-500 dark:text-slate-500 mb-8 max-w-xl mx-auto lg:mx-0">
                Helping E-Commerce Businesses Scale Through Product Listings, SEO Optimization, Crosslisting, Product Research, and Order Fulfillment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setHireMeModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:scale-105 shadow-lg shadow-slate-900/20"
                >
                  <Mail className="w-5 h-5" />
                  Hire Me
                </button>
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-full hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Portfolio
                </a>
              </div>
            </div>

            {/* 3D E-Commerce Ecosystem Visual */}
            <div className="hidden lg:flex relative items-center justify-center">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Dashboard Card */}
                <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl shadow-slate-900/15 border border-slate-200 dark:border-slate-700 p-5 rotate-1 hover:rotate-0 transition-transform duration-500">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <div className="flex-1 ml-3 h-5 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center px-2">
                      <span className="text-[10px] text-slate-400">crosslisting workflow</span>
                    </div>
                  </div>

                  {/* Revenue row */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-[#96BF48]/10 border border-[#96BF48]/30 rounded-xl p-3 flex items-center gap-2">
                      <img src="/logos/shopify/image.png" alt="Shopify" className="w-8 h-8 object-contain" />
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Shopify</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">$24,580</div>
                      </div>
                    </div>
                    <div className="bg-[#FF9900]/10 border border-[#FF9900]/30 rounded-xl p-3 flex items-center gap-2">
                      <img src="/logos/amazon/image.png" alt="Amazon" className="w-8 h-8 object-contain" />
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Amazon</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">$31,240</div>
                      </div>
                    </div>
                  </div>

                  {/* Crosslisting workflow with real logos */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 mb-3">
                    <div className="flex items-center gap-1 mb-2">
                      <RefreshCw className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Live Crosslisting</span>
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Shopify */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-white dark:bg-slate-600 rounded-xl shadow-sm flex items-center justify-center p-1">
                          <img src="/logos/shopify/image.png" alt="Shopify" className="w-7 h-7 object-contain" />
                        </div>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Shopify</span>
                      </div>
                      {/* Arrow */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-px bg-gradient-to-r from-emerald-300 to-amber-300 relative">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                      </div>
                      {/* Amazon */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-black rounded-xl shadow-sm flex items-center justify-center p-1">
                          <img src="/logos/amazon/image.png" alt="Amazon" className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Amazon</span>
                      </div>
                      {/* Arrow */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-px bg-gradient-to-r from-amber-300 to-blue-300 relative">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                        </div>
                      </div>
                      {/* eBay */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-white dark:bg-slate-600 rounded-xl shadow-sm flex items-center justify-center p-1">
                          <img src="/logos/ebay/image.png" alt="eBay" className="w-8 h-6 object-contain" />
                        </div>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">eBay</span>
                      </div>
                      {/* Arrow */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-px bg-gradient-to-r from-blue-300 to-pink-300 relative">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                        </div>
                      </div>
                      {/* Poshmark */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-white dark:bg-slate-600 rounded-xl shadow-sm flex items-center justify-center p-1">
                          <img src="/logos/poshmark/image.png" alt="Poshmark" className="w-7 h-7 object-contain" />
                        </div>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Poshmark</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">1,024</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Listed</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-amber-700 dark:text-amber-400">512</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Orders</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-blue-700 dark:text-blue-400">4</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Platforms</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">+40%</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">SEO</div>
                    </div>
                  </div>
                </div>

                {/* Floating: Shopify growth */}
                <div className="absolute -top-5 -right-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-3 border border-slate-200 dark:border-slate-700 animate-float">
                  <div className="flex items-center gap-2">
                    <img src="/logos/shopify/image.png" alt="Shopify" className="w-8 h-8 object-contain" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Growth</p>
                      <p className="text-sm font-bold text-emerald-600">+35%</p>
                    </div>
                  </div>
                </div>

                {/* Floating: Amazon orders */}
                <div className="absolute -bottom-4 -left-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-3 border border-slate-200 dark:border-slate-700 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <img src="/logos/amazon/image.png" alt="Amazon" className="w-8 h-8 object-contain bg-black rounded-lg p-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Products</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">1,000+</p>
                    </div>
                  </div>
                </div>

                {/* Floating: eBay */}
                <div className="absolute top-1/3 -left-10 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-3 border border-slate-200 dark:border-slate-700 animate-float-alt">
                  <div className="flex items-center gap-2">
                    <img src="/logos/ebay/image.png" alt="eBay" className="w-10 h-7 object-contain" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Listings</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">250+</p>
                    </div>
                  </div>
                </div>

                {/* Floating: Poshmark */}
                <div className="absolute bottom-1/4 -right-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-3 border border-slate-200 dark:border-slate-700 animate-float-slow">
                  <div className="flex items-center gap-2">
                    <img src="/logos/poshmark/image.png" alt="Poshmark" className="w-8 h-8 object-contain" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Fulfilled</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">500+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-slate-400 dark:bg-slate-500 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Results / How I Help Section */}
      <section className="py-20 lg:py-28 bg-emerald-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Results That Matter</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How I Help Store Owners
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Proven outcomes that drive real business growth
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const { ref, isInView } = useInView();
              const count = useCounter(stat.value, 2000, isInView);

              return (
                <div
                  key={index}
                  ref={ref}
                  className="bg-white dark:bg-slate-700 rounded-2xl p-6 text-center shadow-sm border border-emerald-100 dark:border-slate-600"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {count.toLocaleString()}{stat.suffix}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* How I Help List */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howIHelp.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white dark:bg-slate-700 px-5 py-4 rounded-xl border border-emerald-100 dark:border-slate-600"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">About RayVA</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Hi, I'm <span className="text-emerald-600 dark:text-emerald-400">Raymart</span>
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Shopify, Amazon & eBay E-Commerce VA
              </p>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                I help e-commerce businesses streamline operations through product listing, SEO optimization, product research, crosslisting, inventory management, and order fulfillment. My goal is to help online stores save time, stay organized, and grow efficiently across multiple marketplaces.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setHireMeModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Hire Me
                </button>
                <button
                  onClick={() => setScheduleModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-600 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a Discovery Call
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl transform rotate-3 opacity-10" />
                <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Product Listings</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Professional listings across all platforms</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Search className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Product Research</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Data-driven insights for profitability</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">SEO Optimization</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Rank higher, sell more</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">My Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Skills & Capabilities
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive e-commerce expertise across multiple platforms
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {skills.map((skill, index) => (
              <button
                key={index}
                onClick={() => setSkillModalOpen(skill.name)}
                className="card-glow group bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-600 rounded-2xl p-5 lg:p-6 transition-all text-left"
              >
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/50 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/70 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <skill.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="font-medium text-slate-900 dark:text-white">{skill.name}</h4>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-emerald-400">Tech Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tools & Platforms
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Proficient in industry-leading e-commerce tools
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {toolsData.map((tool, index) => (
              <button
                key={index}
                onClick={() => setToolModalOpen(tool.name)}
                className="card-glow bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 text-center hover:bg-slate-700/50 transition-all group"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 overflow-hidden bg-slate-900/40 group-hover:bg-slate-700/60 transition-all">
                  <tool.Logo className="w-12 h-12" />
                </div>
                <h4 className="font-medium text-white text-sm mb-1">{tool.name}</h4>
                {tool.experience === 'In Progress' ? (
                  <span className="text-xs text-amber-400">In Progress</span>
                ) : (
                  <span className="text-xs text-emerald-400">{tool.experience}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">What I Offer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Services
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              End-to-end e-commerce support designed to scale your business
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setServiceModalOpen(service.id)}
                className="card-glow group bg-white dark:bg-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-900/5 transition-all text-left"
              >
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/50 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/70 rounded-2xl flex items-center justify-center mb-5 transition-colors">
                  <service.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.description}</p>
                <div className="mt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 lg:py-32 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">My Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Portfolio
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real results from real e-commerce projects
            </p>
          </div>

          {/* Featured Shopify Case Study Card */}
          <div className="mb-6">
            <button
              onClick={() => setShopifyCaseStudyOpen(true)}
              className="w-full group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all text-left"
              style={{ boxShadow: '0 0 0 1px rgba(0,242,254,0.08), 0 4px 32px rgba(0,0,0,0.08)' }}
            >
              {/* Featured badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">Featured Case Study</span>
                <span className="bg-slate-900 text-white text-xs font-medium px-3 py-1 rounded-full">Shopify</span>
              </div>
              <div className="flex flex-col md:flex-row">
                {/* Screenshot preview — 2 stacked images */}
                <div className="md:w-1/2 relative overflow-hidden bg-slate-100 dark:bg-slate-700 h-64 md:h-72">
                  <img
                    src="/screenshots/portfolio/Screenshot_2026-07-07_142519.png"
                    alt="Kingsley Manor Shopify Store — Homepage"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 dark:to-slate-900/40" />
                </div>
                {/* Content */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">Shopify Store Development</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Kingsley Manor — Premium Menswear Store</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      Built and managed a full Shopify storefront for a premium menswear brand — from homepage setup to organized collections, product cataloging, and SEO-optimized product pages.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {['Store Setup', 'Collection Mgmt', 'Product Listing', 'Navigation', 'QA Review'].map((tag) => (
                        <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:gap-3 transition-all flex items-center gap-1.5">
                      View Full Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Geo Essentials Featured Case Study */}
          <div className="mb-10">
            <button
              onClick={() => setGeoEssentialsCaseStudyOpen(true)}
              className="group w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 text-left border border-blue-100 dark:border-slate-600"
            >
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                  <img
                    src="/screenshots/portfolio/AG_22.png"
                    alt="Geo Essentials Hero"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-900/20" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {['/screenshots/portfolio/AG_20.png', '/screenshots/portfolio/AG_21.png', '/screenshots/portfolio/AG_23.png'].map((src, i) => (
                      <div key={i} className="w-14 h-10 rounded-lg overflow-hidden ring-2 ring-white/70 shadow-md">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-14 h-10 rounded-lg bg-black/50 backdrop-blur-sm ring-2 ring-white/70 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+2</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow">Case Study</span>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Shopify · Tech & Accessories</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Geo Essentials — Tech & Desk Accessories Store</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                      Designed and built a complete Shopify storefront for a tech accessories brand — featuring a curated homepage, GeoSETUP desk-space collection, trust-badge sections, customer reviews, FAQ, and community email capture.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {['Store Setup', 'Collection Design', 'Homepage UX', 'Trust Badges', 'FAQ Build', 'Community CTA'].map((tag) => (
                        <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg">{tag}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[{ label: 'Collections', value: '3+' }, { label: 'Page Sections', value: '8+' }, { label: 'Screenshots', value: '5' }].map((m) => (
                        <div key={m.label} className="bg-white dark:bg-slate-700 rounded-xl p-3 text-center shadow-sm">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{m.value}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      View Full Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setPortfolioModalOpen(project.id)}
                className="card-glow group bg-slate-50 dark:bg-slate-700 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-900/5 transition-all text-left"
              >
                {project.screenshots.length > 0 ? (
                  <div className="h-40 relative overflow-hidden bg-slate-200 dark:bg-slate-600">
                    <img
                      src={project.screenshots[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                      {project.screenshots.length} screenshot{project.screenshots.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center relative overflow-hidden">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                      Add screenshots
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.platforms.map((platform, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Me Section */}
      <section className="py-20 lg:py-32 bg-emerald-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Why RayVA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Hire Me
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Professional strengths that drive results for your business
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((item, index) => (
              <div
                key={index}
                className="card-glow bg-white dark:bg-slate-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Client Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Testimonials
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              What clients say about working with me
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setTestimonialModalOpen(index)}
                className="card-glow bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 text-left hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed line-clamp-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700/50 rounded-full px-4 py-1.5 mb-6">
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Get in Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Let's Work Together
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Ready to scale your e-commerce business? I'm here to help streamline your operations and drive growth.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:jadraqueraymart8@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors group"
                >
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/50 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/70 rounded-xl flex items-center justify-center transition-colors">
                    <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                    <p className="font-medium text-slate-900 dark:text-white">jadraqueraymart8@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://onlinejobs.ph/jobseekers/raymart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors group"
                >
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/50 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/70 rounded-xl flex items-center justify-center transition-colors">
                    <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">OnlineJobs.ph</p>
                    <p className="font-medium text-slate-900 dark:text-white">View Profile</p>
                  </div>
                </a>

                <button
                  onClick={() => setScheduleModalOpen(true)}
                  className="flex items-center gap-4 p-4 bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors group w-full text-left"
                >
                  <div className="w-12 h-12 bg-white/20 group-hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">Discovery Call</p>
                    <p className="font-medium text-white">Schedule a Consultation</p>
                  </div>
                </button>

                <button
                  onClick={() => setResumeModalOpen(true)}
                  className="flex items-center gap-4 p-4 bg-slate-900 dark:bg-slate-700 border border-slate-800 dark:border-slate-600 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors group w-full text-left"
                >
                  <div className="w-12 h-12 bg-white/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">View</p>
                    <p className="font-medium text-white">My Resume</p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Send a Message</h3>

                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Message Sent!</h4>
                    <p className="text-slate-600 dark:text-slate-400">I'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-slate-900 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-slate-900 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none text-slate-900 dark:text-white"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    {formStatus === 'error' && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-700 dark:text-red-400">{formError || 'Something went wrong. Please try again.'}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-white">RayVA</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setNavModal(link.modal)}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:jadraqueraymart8@gmail.com"
                className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8">
            <p className="text-center text-sm text-slate-500">
              © {new Date().getFullYear()} RayVA. All rights reserved. E-Commerce Virtual Assistant Services.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-100 transition-all z-40"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* ============================================ */}
      {/* MODALS */}
      {/* ============================================ */}

      {/* Hire Me Modal */}
      <Modal
        isOpen={hireMeModalOpen}
        onClose={() => setHireMeModalOpen(false)}
        title="Hire Me"
        size="lg"
      >
        <form onSubmit={handleHireFormSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Your Name *</label>
              <input
                type="text"
                required
                value={hireForm.name}
                onChange={(e) => setHireForm({ ...hireForm, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600/60 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={hireForm.email}
                onChange={(e) => setHireForm({ ...hireForm, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600/60 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Company Name</label>
            <input
              type="text"
              value={hireForm.company}
              onChange={(e) => setHireForm({ ...hireForm, company: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600/60 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
              placeholder="Your Company (optional)"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Service Needed *</label>
              <select
                required
                value={hireForm.service}
                onChange={(e) => setHireForm({ ...hireForm, service: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600/60 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-700 dark:text-slate-300 transition-colors"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Platform *</label>
              <select
                required
                value={hireForm.platform}
                onChange={(e) => setHireForm({ ...hireForm, platform: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600/60 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-700 dark:text-slate-300 transition-colors"
              >
                <option value="">Select platform</option>
                {platformOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Budget Range</label>
            <select
              value={hireForm.budget}
              onChange={(e) => setHireForm({ ...hireForm, budget: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600/60 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-700 dark:text-slate-300 transition-colors"
            >
              <option value="">Select budget range</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Message *</label>
            <textarea
              required
              rows={4}
              value={hireForm.message}
              onChange={(e) => setHireForm({ ...hireForm, message: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600/60 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
              placeholder="Tell me about your project requirements..."
            />
          </div>

          {hireFormStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-emerald-700 dark:text-emerald-400">Thanks! Your inquiry has been sent. I'll get back to you within 24 hours.</p>
            </div>
          )}
          {hireFormStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-400">{hireFormError || 'Something went wrong. Please try again.'}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={hireFormStatus === 'submitting'}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}
            >
              {hireFormStatus === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </>
              )}
            </button>
            <a
              href="#contact"
              onClick={() => setHireMeModalOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              Schedule Consultation
            </a>
          </div>
        </form>
      </Modal>

      {/* Schedule Consultation Modal */}
      <Modal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        title="Schedule a Discovery Call"
        size="lg"
      >
        <form onSubmit={handleScheduleFormSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Name *</label>
              <input
                type="text"
                required
                value={scheduleForm.name}
                onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={scheduleForm.email}
                onChange={(e) => setScheduleForm({ ...scheduleForm, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Date *</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={scheduleForm.date}
                onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Time *</label>
              <input
                type="time"
                required
                value={scheduleForm.time}
                onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Time Zone *</label>
              <select
                required
                value={scheduleForm.timezone}
                onChange={(e) => setScheduleForm({ ...scheduleForm, timezone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="">Select time zone</option>
                {timeZones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Contact Method *</label>
              <select
                required
                value={scheduleForm.method}
                onChange={(e) => setScheduleForm({ ...scheduleForm, method: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                {contactMethods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Notes</label>
            <textarea
              rows={3}
              value={scheduleForm.notes}
              onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-slate-900 dark:text-white"
              placeholder="Any topics you'd like to discuss..."
            />
          </div>

          {scheduleSubmitted && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-emerald-700 dark:text-emerald-400">Booking request sent! I'll confirm your time slot via email shortly.</p>
            </div>
          )}
          {scheduleError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-400">{scheduleError}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={scheduleSubmitting}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {scheduleSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Confirm Booking
                </>
              )}
            </button>
            <a
              href="mailto:jadraqueraymart8@gmail.com"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Directly
            </a>
          </div>
        </form>
      </Modal>

      {/* Service Modal */}
      {serviceModalOpen && (
        <Modal
          isOpen={!!serviceModalOpen}
          onClose={() => setServiceModalOpen(null)}
          title={services.find(s => s.id === serviceModalOpen)?.title}
          size="xl"
        >
          {(() => {
            const service = services.find(s => s.id === serviceModalOpen);
            if (!service) return null;

            return (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Overview</h4>
                  <p className="text-slate-600 dark:text-slate-400">{service.overview}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Process</h4>
                  <div className="space-y-2">
                    {service.process.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{i + 1}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Deliverables</h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Tools Used</h4>
                    <ul className="space-y-2">
                      {service.tools.map((tool, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Box className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Expected Results</h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {service.results.map((result, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3 text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">FAQ</h4>
                  <div className="space-y-3">
                    {service.faq.map((item, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                        <p className="font-medium text-slate-900 dark:text-white mb-1">{item.q}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setServiceModalOpen(null);
                      setHireMeModalOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Hire Me for This Service
                  </button>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      {/* Portfolio Modal */}
      {portfolioModalOpen && (
        <Modal
          isOpen={!!portfolioModalOpen}
          onClose={() => setPortfolioModalOpen(null)}
          title={portfolioProjects.find(p => p.id === portfolioModalOpen)?.title}
          size="xl"
        >
          {(() => {
            const project = portfolioProjects.find(p => p.id === portfolioModalOpen);
            if (!project) return null;

            return (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm">
                    {project.date}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400'}`}>
                    {project.status}
                  </span>
                </div>

                {/* Screenshots */}
                {project.screenshots.length > 0 ? (
                  <div className="space-y-3">
                    <img
                      src={project.screenshots[0]}
                      alt={`${project.title} screenshot`}
                      className="w-full rounded-2xl object-cover max-h-80"
                    />
                    {project.screenshots.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {project.screenshots.slice(1).map((src, i) => (
                          <img key={i} src={src} alt={`Screenshot ${i + 2}`} className="rounded-xl object-cover h-20 w-full" />
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                      Actual screenshots from completed work samples
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl p-10 text-center">
                    <FileImage className="w-14 h-14 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 mb-1">Screenshots Coming Soon</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500">Real work samples will be added here.</p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Overview</h4>
                    <p className="text-slate-600 dark:text-slate-400">{project.overview}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Objective</h4>
                    <p className="text-slate-600 dark:text-slate-400">{project.objective}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Responsibilities</h4>
                    <ul className="space-y-2">
                      {project.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Tools Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Process</h4>
                  <div className="space-y-2">
                    {project.process.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{i + 1}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Results</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {project.results.map((result, i) => (
                      <div key={i} className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-3 text-center">
                        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                  <strong>Outcome:</strong> {project.outcome}
                </p>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setPortfolioModalOpen(null);
                      setHireMeModalOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Hire Me for Similar Project
                  </button>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      {/* Skill Modal */}
      {skillModalOpen && (
        <Modal
          isOpen={!!skillModalOpen}
          onClose={() => setSkillModalOpen(null)}
          title={skillModalOpen}
          size="lg"
        >
          {(() => {
            const skill = skills.find(s => s.name === skillModalOpen);
            if (!skill) return null;

            return (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center">
                    <skill.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{skill.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((tool, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Sample Tasks</h4>
                  <ul className="space-y-2">
                    {skill.tasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      {/* Tool Modal */}
      {toolModalOpen && (
        <Modal
          isOpen={!!toolModalOpen}
          onClose={() => setToolModalOpen(null)}
          title={toolModalOpen}
          size="lg"
        >
          {(() => {
            const tool = toolsData.find(t => t.name === toolModalOpen);
            if (!tool) return null;

            return (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                    <tool.Logo className="w-12 h-12" />
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${tool.experience === 'In Progress' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400'}`}>
                      {tool.experience}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Tasks Performed</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {tool.tasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-600 dark:text-slate-300">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}

      {/* Resume Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Resume"
        size="xl"
      >
        <div className="space-y-8">
          {/* Professional Summary */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Professional Summary</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Experienced E-Commerce Virtual Assistant specializing in Shopify, Amazon, eBay, and Poshmark. Expert in product listing creation, SEO optimization, product research, crosslisting management, and order fulfillment. Proven track record of helping online stores scale efficiently through data-driven strategies and meticulous attention to detail.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['Product Listing', 'SEO Optimization', 'Product Research', 'Crosslisting', 'Order Fulfillment', 'Inventory Management', 'Shopify', 'Amazon Seller Central', 'eBay', 'Poshmark', 'Zik Analytics', 'Vendoo', 'Google Sheets', 'Excel', 'Customer Support'].map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Experience</h4>
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-semibold text-slate-900 dark:text-white">E-Commerce Virtual Assistant</h5>
                  <span className="text-sm text-slate-500 dark:text-slate-400">2022 - Present</span>
                </div>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">Freelance</p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Managed product listings across Shopify, Amazon, eBay, and Poshmark</li>
                  <li>• Conducted product research using Zik Analytics and other tools</li>
                  <li>• Optimized 1,000+ product listings for SEO</li>
                  <li>• Streamlined crosslisting workflows reducing listing time by 50%</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Education</h4>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
              <h5 className="font-semibold text-slate-900 dark:text-white">Bachelor's Degree</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">Continuous learning through online courses and certifications in E-Commerce and Digital Marketing</p>
            </div>
          </div>

          {/* Download Button */}
          <a
            href="#"
            className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        title="Settings"
        size="sm"
      >
        <div className="space-y-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-between w-full p-4 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" /> : <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />}
              <span className="text-slate-900 dark:text-white font-medium">Dark Mode</span>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </div>
          </button>

          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="flex items-center justify-between w-full p-4 bg-slate-50 dark:bg-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="text-slate-900 dark:text-white font-medium">Animations</span>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors ${animationsEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${animationsEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </div>
          </button>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Settings are saved locally in your browser.
            </p>
          </div>
        </div>
      </Modal>

      {/* Testimonial Modal */}
      {testimonialModalOpen !== null && (
        <Modal
          isOpen={testimonialModalOpen !== null}
          onClose={() => setTestimonialModalOpen(null)}
          title="Client Testimonial"
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[testimonialModalOpen].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
              ))}
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              "{testimonials[testimonialModalOpen].fullContent}"
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xl">{testimonials[testimonialModalOpen].name[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{testimonials[testimonialModalOpen].name}</p>
                <p className="text-slate-500 dark:text-slate-400">{testimonials[testimonialModalOpen].role}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ============================================ */}
      {/* SHOPIFY CASE STUDY MODAL */}
      {/* ============================================ */}
      <Modal
        isOpen={shopifyCaseStudyOpen}
        onClose={() => setShopifyCaseStudyOpen(false)}
        size="full"
      >
        <div className="space-y-0">

          {/* ── HERO HEADER ── */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden mb-10 p-8 lg:p-12">
            <div className="absolute inset-0 opacity-10">
              <img
                src="/screenshots/portfolio/Screenshot_2026-07-07_142519.png"
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Featured Case Study</span>
                <span className="border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">Shopify</span>
                <span className="border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">Store Development</span>
                <span className="border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">Menswear</span>
                <span className="bg-emerald-900/60 text-emerald-300 text-xs font-medium px-3 py-1.5 rounded-full">Completed</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                Kingsley Manor<br />
                <span className="text-emerald-400">Shopify Store Development</span>
              </h2>
              <p className="text-slate-300 text-base lg:text-lg max-w-2xl leading-relaxed mb-8">
                Built and structured a premium menswear Shopify storefront — from homepage design and hero banner to collection hierarchy, product cataloging, and SEO-optimized product pages.
              </p>
              {/* Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: '6', label: 'Collections Created', color: 'emerald' },
                  { value: '50+', label: 'Products Organized', color: 'blue' },
                  { value: '100%', label: 'Catalog Accuracy', color: 'amber' },
                  { value: '0', label: 'Listing Errors', color: 'rose' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                    <div className={`text-2xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SECTION 1: HOMEPAGE SETUP ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">01</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Homepage Setup & Hero Banner</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Storefront design, hero creation, and featured collection layout</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
                <img
                  src="/screenshots/portfolio/Screenshot_2026-07-07_142519.png"
                  alt="Kingsley Manor Homepage"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-5">
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium italic">
                    "Created and organized a premium menswear Shopify storefront with strategic collection hierarchy and customer-focused navigation."
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Hero Banner', desc: 'Full-width lifestyle photography with brand tagline "Timeless Style. Quiet Confidence."' },
                    { title: 'Featured Collections Grid', desc: 'Curated TIMELESS ESSENTIALS section showcasing Oxford Shirts, Jackets, Linen Shirts, and Knitwears' },
                    { title: 'Brand Consistency', desc: 'Maintained premium KM (Kingsley Manor) logo and neutral color palette throughout' },
                    { title: 'Navigation Structure', desc: 'Clean top navigation with MEN category and accessible account/cart icons' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: COLLECTION MANAGEMENT ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">02</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Collection Management & Product Grid</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Product categorization, collection grid layout, and browsing experience</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div className="space-y-5">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5">
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium italic">
                    "Every product was reviewed and assigned to the correct collection to ensure logical navigation, search accuracy, and improved customer experience."
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Oxford Shirts', 'Linen Shirts', 'Polo Shirts', 'Tailored Trousers', 'Outerwear / Coats', 'Footwear'].map((col) => (
                    <div key={col} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{col}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Accurate category assignment · Collection organization · Customer browsing optimization</p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
                <img
                  src="/screenshots/portfolio/Screenshot_2026-07-07_142529.png"
                  alt="Kingsley Manor Collections Grid"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* ── SECTION 3: NAVIGATION STRUCTURE ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">03</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Navigation & Category Hierarchy</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Product catalog structure and customer-facing menu organization</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg mb-6">
              <img
                src="/screenshots/portfolio/Screenshot_2026-07-07_142540.png"
                alt="Kingsley Manor Category Navigation"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: 'Catalog Precision', desc: 'Each item placed in the correct category — Oxford Shirt, Jacket, Linen Shirts, Kingsley Pants, Polo — with accurate product counts' },
                { title: 'New Arrivals Section', desc: 'Strategically featured new items in a dedicated storefront section for maximum visibility and freshness' },
                { title: 'SEO-Friendly Structure', desc: 'Collection names and hierarchy optimized for search relevance and Shopify\'s internal ranking algorithm' },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 4: BRAND STORY ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">04</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Brand Story & Content Management</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Storefront content, email list integration, and brand narrative sections</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
                <img
                  src="/screenshots/portfolio/Screenshot_2026-07-07_142604.png"
                  alt="Kingsley Manor Brand Story Section"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Managed the brand narrative section ("Made For Everyday, Built To Last"), highlighting premium quality attributes with structured content and feature callouts.
                </p>
                <div className="space-y-3">
                  {[
                    'Premium Fabrics — product description quality control',
                    'Clean Stitching — attention to detail verification',
                    'Comfort-First Fit — customer-benefit framing',
                    'Email list signup integration with Shopify forms',
                    'Footer structure and policy page setup',
                    'Powered by Shopify — complete store deployment',
                  ].map((item) => (
                    <div key={item} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RESPONSIBILITIES ── */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">My Responsibilities</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                'Shopify Store Setup',
                'Product Uploading',
                'Product Categorization',
                'Collection Organization',
                'Navigation Structure',
                'Product Page Formatting',
                'Inventory Management',
                'Quality Assurance Review',
                'Catalog Accuracy Verification',
                'Storefront Content Management',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RESULTS ── */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Results & Outcomes</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { metric: 'Organized product catalog structure', detail: 'Every item accurately placed in its collection' },
                { metric: 'Consistent collection hierarchy', detail: 'Oxford Shirts, Linen, Polo, Trousers, Outerwear, Footwear' },
                { metric: 'Improved customer navigation', detail: 'Logical browse experience reducing friction' },
                { metric: 'Zero categorization errors', detail: 'QA review confirmed 100% accuracy' },
                { metric: 'Professional storefront', detail: 'Enterprise-quality presentation for premium brand' },
                { metric: 'Scalable product system', detail: 'Structure supports 10x catalog growth' },
              ].map((item) => (
                <div key={item.metric} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <p className="font-semibold text-white text-sm">{item.metric}</p>
                  </div>
                  <p className="text-xs text-slate-400 pl-4">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm text-center sm:text-left">
                Interested in similar Shopify store management for your business?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setShopifyCaseStudyOpen(false); setHireMeModalOpen(true); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white font-semibold text-sm rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Hire Me
                </button>
                <button
                  onClick={() => { setShopifyCaseStudyOpen(false); setScheduleModalOpen(true); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold text-sm rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Call
                </button>
              </div>
            </div>
          </div>

        </div>
      </Modal>

      {/* ===== NAV SECTION MODALS ===== */}

      {/* About modal */}
      <Modal isOpen={navModal === 'about'} onClose={() => setNavModal(null)} title="About Raymart" size="lg">
        <div className="space-y-6">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            I'm Raymart, a dedicated E-commerce Virtual Assistant specializing in product research, listing optimization,
            and crosslisting across major marketplaces. I help sellers scale their operations with precision and efficiency.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{s.value}{s.suffix}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {strengths.map((t) => (
              <div key={t.title} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <t.icon className="w-6 h-6 text-emerald-500 mb-2" />
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{t.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Services modal */}
      <Modal isOpen={navModal === 'services'} onClose={() => setNavModal(null)} title="Services" size="lg">
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={() => { setNavModal(null); setServiceModalOpen(s.id); }}>
              <s.icon className="w-8 h-8 text-emerald-500 mb-3" />
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">{s.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.description}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* ============================================ */}
      {/* GEO ESSENTIALS CASE STUDY MODAL */}
      {/* ============================================ */}
      <Modal
        isOpen={geoEssentialsCaseStudyOpen}
        onClose={() => setGeoEssentialsCaseStudyOpen(false)}
        size="full"
      >
        <div className="space-y-0">

          {/* ── HERO HEADER ── */}
          <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl overflow-hidden mb-10 p-8 lg:p-12">
            <div className="absolute inset-0 opacity-10">
              <img
                src="/screenshots/portfolio/AG_22.png"
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Case Study</span>
                <span className="text-slate-400 text-xs">Shopify · Tech & Accessories</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                Geo Essentials<br />
                <span className="text-blue-400">Tech & Desk Accessories Store</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-2xl">
                A full Shopify storefront built for a tech accessories brand. The scope covered homepage architecture, collection design, trust-building sections, customer social proof, FAQ, and community email capture — all crafted to convert browsers into buyers.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                {[{ label: 'Platform', value: 'Shopify' }, { label: 'Niche', value: 'Tech Accessories' }, { label: 'Collections', value: '3+' }, { label: 'Page Sections', value: '8+' }].map((s) => (
                  <div key={s.label}>
                    <div className="text-slate-400 text-xs mb-0.5">{s.label}</div>
                    <div className="text-white font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SECTION 1: Homepage & Collections ── */}
          <div className="mb-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">01 · Homepage & Collections</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">A Clean, Navigable Storefront</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                The homepage was structured around three core collections — Laptop, Smartphone, and Office Desk Essentials — each given a dedicated card for immediate visual hierarchy. The layout ensures shoppers know exactly where to go from the moment they land.
              </p>
              <ul className="space-y-3">
                {[
                  { title: 'Clear Category Architecture', desc: 'Three prominent collection cards guide visitors to Laptop, Smartphone, and Office Desk Essentials with zero friction' },
                  { title: 'Brand Identity', desc: 'Consistent "Geo Essentials" branding, color palette, and typography applied site-wide' },
                  { title: 'Visual Hierarchy', desc: 'Featured products surfaced above the fold with compelling imagery and CTA placement' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.title}: </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
              <img
                src="/screenshots/portfolio/AG_20.png"
                alt="Geo Essentials Collections Grid"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* ── SECTION 2: GeoSETUP Feature ── */}
          <div className="mb-10 grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
              <img
                src="/screenshots/portfolio/AG_21.png"
                alt="GeoSETUP Desk Space Section"
                className="w-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">02 · GeoSETUP Collection</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Maximize Desk Space — A Signature Sub-Brand</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                The GeoSETUP section was designed as a lifestyle statement — aspirational desk setup photography paired with a focused "Maximize Desk Space" message. This sub-brand within the store gives workspace accessories a premium identity that resonates with remote workers and creatives.
              </p>
              <ul className="space-y-3">
                {[
                  { title: 'Lifestyle Photography', desc: 'High-quality desk setup imagery that sells the dream, not just the product' },
                  { title: 'Sub-brand Positioning', desc: 'GeoSETUP branded as its own collection, reinforcing store depth and specialization' },
                  { title: 'Conversion-Focused Copy', desc: 'Headlines and CTAs written to motivate add-to-cart from the collection page itself' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.title}: </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── SECTION 3: Hero Slider & Trust Badges ── */}
          <div className="mb-10">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">03 · Hero Slider & Trust Signals</span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Building Credibility Above the Fold</h3>
            <div className="grid lg:grid-cols-5 gap-6 items-start">
              <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
                <img
                  src="/screenshots/portfolio/AG_22.png"
                  alt="Geo Essentials Hero and Trust Badges"
                  className="w-full object-cover"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  A rotating hero slider was configured to highlight featured products and seasonal promotions, keeping the homepage fresh. Below the hero, a "Featured GEO-Products" strip with trust badges (Free Shipping, Secure Checkout, Easy Returns) was placed to immediately reduce purchase hesitation.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Hero Slides', value: 'Dynamic' },
                    { label: 'Trust Badges', value: '3 placed' },
                    { label: 'Featured Row', value: 'Above fold' },
                    { label: 'Load Design', value: 'Mobile-first' },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center">
                      <div className="text-base font-bold text-blue-600 dark:text-blue-400">{s.value}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 4: Reviews & FAQ ── */}
          <div className="mb-10 grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">04 · Social Proof & FAQ</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Reviews, Questions, Reassurance</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                A dedicated customer reviews section and a structured FAQ were added to address objections before they stall a purchase. Real testimonials surface social proof; the FAQ eliminates common shipping, returns, and product queries directly on the page.
              </p>
              <ul className="space-y-3">
                {[
                  { title: 'Customer Reviews Section', desc: 'Testimonials with star ratings displayed in a clean grid to build trust at scale' },
                  { title: 'FAQ Accordion', desc: 'Expandable Q&A covering shipping, returns, product compatibility, and more' },
                  { title: 'Objection Handling', desc: 'Every common hesitation addressed before the shopper reaches checkout' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.title}: </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
              <img
                src="/screenshots/portfolio/AG_23.png"
                alt="Geo Essentials Reviews and FAQ"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* ── SECTION 5: Community & Footer ── */}
          <div className="mb-10 grid lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
              <img
                src="/screenshots/portfolio/AG_24.png"
                alt="Geo Essentials Community and Footer"
                className="w-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 block">05 · Community & Footer</span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Join the Geo Community</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                The bottom of every page ends with a strong community email capture — "Join the Geo Community" — encouraging repeat engagement and email list growth. The footer was fully structured with navigation links, social handles, and policy pages to give the store a professional, complete feel.
              </p>
              <ul className="space-y-3">
                {[
                  { title: 'Email Capture CTA', desc: '"Join the Geo Community" section with an inline sign-up form above the footer' },
                  { title: 'Complete Footer', desc: 'Navigation links, social icons, and policy pages (Refund, Privacy, Terms) all wired up' },
                  { title: 'Brand Cohesion', desc: 'Footer matches the overall color system and typography so the store feels finished end-to-end' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.title}: </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── CLOSING SUMMARY ── */}
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-blue-100 dark:border-slate-700">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Project Summary</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Geo Essentials was built from the ground up as a conversion-ready Shopify store. Every section — from the hero slider to the community email capture — was purposefully designed to move a visitor from discovery to purchase while establishing the brand's credibility in the tech accessories space.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Platform', value: 'Shopify' },
                { label: 'Scope', value: 'Full Store Build' },
                { label: 'Deliverable', value: 'Live-Ready Storefront' },
              ].map((s) => (
                <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center shadow-sm">
                  <div className="text-base font-bold text-blue-600 dark:text-blue-400 mb-1">{s.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Modal>

      {/* Portfolio modal with sub-navigation */}
      <Modal isOpen={navModal === 'portfolio'} onClose={() => setNavModal(null)} title="Portfolio" size="lg">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {(['Case Studies', 'Product Listings', 'SEO Projects'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPortfolioTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${portfolioTab === tab ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-1">
            {portfolioProjects
              .filter((p) =>
                portfolioTab === 'Case Studies' ? ['Research', 'Systems', 'Management'].includes(p.category) :
                portfolioTab === 'Product Listings' ? p.category === 'Product Listing' :
                p.category === 'SEO'
              )
              .map((p) => (
                <div key={p.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={() => { setNavModal(null); setPortfolioModalOpen(p.id); }}>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">{p.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.platforms.map((pl) => (
                      <span key={pl} className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full">{pl}</span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>

      {/* Skills modal with sub-navigation */}
      <Modal isOpen={navModal === 'skills'} onClose={() => setNavModal(null)} title="Skills & Capabilities" size="lg">
        <div className="space-y-5">
          <div className="flex gap-2">
            {(['Platforms', 'Tools'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSkillsTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${skillsTab === tab ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {skillsTab === 'Platforms' ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolioProjects.flatMap(p => p.platforms).filter((v, i, a) => a.indexOf(v) === i).slice(0, 6).map((pl) => (
                <div key={pl} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">{pl}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Experienced in {pl} operations, listings, and management.</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {toolsData.map((t) => (
                <div key={t.name} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 flex items-start gap-3">
                  <t.Logo className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{t.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* Contact modal with sub-navigation */}
      <Modal isOpen={navModal === 'contact'} onClose={() => setNavModal(null)} title="Contact" size="lg">
        <div className="space-y-5">
          <div className="flex gap-2">
            {(['Send a Message', 'Schedule a Call'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setContactTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${contactTab === tab ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {contactTab === 'Send a Message' ? (
            <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-3">
              <input required placeholder="Your name" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 dark:text-white" />
              <input required type="email" placeholder="Your email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 dark:text-white" />
              <textarea required placeholder="Your message" rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-900 dark:text-white" />
              <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors">Send Message</button>
              {formSubmitted && <p className="text-emerald-600 dark:text-emerald-400 text-sm text-center">Thanks! I'll be in touch soon.</p>}
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-slate-600 dark:text-slate-300 text-sm">Book a free 30-minute discovery call to discuss your project.</p>
              <button onClick={() => { setNavModal(null); setScheduleModalOpen(true); }} className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors">Open Booking Form</button>
            </div>
          )}
        </div>
      </Modal>

      {/* Resources modal (FAQ + Rate Card) */}
      <Modal isOpen={navModal === 'resources'} onClose={() => setNavModal(null)} title="Resources" size="lg">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-emerald-500" /> Frequently Asked Questions</h4>
            <div className="space-y-3">
              {[
                { q: 'How long does a typical project take?', a: 'Most listing and research projects take 3–7 days. Larger crosslisting setups can take 1–2 weeks depending on catalog size.' },
                { q: 'Do you sign NDAs?', a: 'Yes. I am happy to sign a mutual NDA before we begin any engagement to protect your business information.' },
                { q: 'What is your typical process?', a: 'Discovery call → proposal → onboarding → execution with weekly progress updates → final delivery and review.' },
                { q: 'Which payment methods do you accept?', a: 'PayPal, Wise, and direct bank transfer. Invoices are sent weekly or per milestone, whichever you prefer.' },
                { q: 'Do you offer ongoing monthly support?', a: 'Yes — I offer retainer packages for sellers who need continuous listing, research, or inventory support.' },
              ].map((f) => (
                <details key={f.q} className="group bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                  <summary className="cursor-pointer font-medium text-slate-800 dark:text-slate-100 flex items-center justify-between">
                    {f.q}
                    <span className="text-emerald-500 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-5">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2"><FileDown className="w-5 h-5 text-emerald-500" /> Downloads</h4>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors">
                <FileDown className="w-4 h-4" /> Rate Card (PDF)
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <FileDown className="w-4 h-4" /> Case Study (PDF)
              </a>
            </div>
          </div>
        </div>
      </Modal>

      {/* ===== FLOATING LAMP LOGIN WIDGET ===== */}
      <div className="fixed bottom-6 right-6 z-50 hidden sm:flex flex-col items-end gap-4">
        {/* Login card */}
        <div
          className="transition-all duration-300 origin-bottom-right"
          style={{
            opacity: loginCardVisible ? 1 : 0,
            transform: loginCardVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
            pointerEvents: loginCardVisible ? 'auto' : 'none',
          }}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-80 shadow-2xl">
            <p className="text-sm text-slate-400 mb-4 uppercase tracking-wider font-medium">Client Login</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="text-sm text-slate-300 mb-1.5 block">Username</label>
                <input className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="username" />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-1.5 block">Password</label>
                <input type="password" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors">Sign In</button>
            </form>
          </div>
        </div>

        {/* Lamp toggle */}
        <button
          onClick={() => {
            if (lampOn) {
              setLoginCardVisible(false);
              setTimeout(() => setLampOn(false), 250);
            } else {
              setLampOn(true);
              setTimeout(() => setLoginCardVisible(true), 150);
            }
          }}
          className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-400"
          style={{
            background: lampOn ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.08)',
            boxShadow: lampOn
              ? '0 0 36px 10px rgba(16,185,129,0.5), 0 0 90px 30px rgba(16,185,129,0.3), inset 0 0 18px rgba(16,185,129,0.25)'
              : 'none',
          }}
          aria-label="Client login"
          title="Client Login"
        >
          <Lightbulb
            className="w-12 h-12 transition-colors duration-400"
            style={{ color: lampOn ? '#10b981' : '#64748b' }}
          />
          <span className="absolute -bottom-6 text-xs text-slate-400 whitespace-nowrap font-medium">Admin</span>
        </button>
      </div>
    </div>
  );
}

export default App;
