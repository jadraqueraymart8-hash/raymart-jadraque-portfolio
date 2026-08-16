import { useState } from "react";
import { ArrowUpRight, Search, Boxes, Mail } from "lucide-react";

/**
 * Portfolio — replaces your existing Portfolio component.
 * - Featured case studies keep their photos (Kingsley Manor, Art Geometry, Lumière Beauty).
 * - SEO Optimized Listings / Inventory Management / Email Management are pulled
 *   out into a separate, photo-less "Additional Case Studies" row below —
 *   matching the icon-card style you already use for Shopify Product Listings.
 * Edit the arrays below with your real content/links.
 */

const featuredCaseStudies = [
  {
    tag: "SHOPIFY STORE DEVELOPMENT",
    tagColor: "text-emerald-400",
    badge: "Featured Case Study",
    title: "Kingsley Manor — Premium Menswear Store",
    desc: "Built and managed a full Shopify storefront for a premium menswear brand — from homepage setup to organized collections, product cataloging, and SEO-optimized product pages.",
    chips: ["Store Setup", "Collection Mgmt", "Product Listing", "Navigation", "QA Review"],
    image: "/images/portfolio/kingsley-manor.jpg",
    href: "#",
  },
  {
    tag: "SHOPIFY · TECH & ACCESSORIES",
    tagColor: "text-blue-400",
    badge: "Case Study",
    title: "Art Geometry — Tech & Desk Accessories Store",
    desc: "Designed and built a complete Shopify storefront for a tech accessories brand — featuring a curated homepage, desk-space collection, trust-badge sections, FAQ, and community email capture.",
    chips: ["Store Setup", "Collection Design", "Homepage UX", "Trust Badges", "FAQ Build", "Community CTA"],
    stats: [
      { value: "3+", label: "Collections" },
      { value: "8+", label: "Page Sections" },
      { value: "5", label: "Screenshots" },
    ],
    image: "/images/portfolio/art-geometry.jpg",
    href: "#",
  },
  {
    tag: "SHOPIFY · BEAUTY & SKINCARE",
    tagColor: "text-pink-400",
    badge: "Case Study",
    title: "Lumière Beauty — Beauty & Skincare Store",
    desc: "Designed and built a Shopify storefront for a beauty and skincare brand — including hero sections, tabbed product collections, and category navigation.",
    chips: ["Shopify", "Store Setup", "Product Listing"],
    stats: [
      { value: "4+", label: "Collections" },
      { value: "6+", label: "Page Sections" },
      { value: "5", label: "Screenshots" },
    ],
    image: "/images/portfolio/lumiere-beauty.jpg",
    href: "#",
  },
];

const additionalCaseStudies = [
  {
    icon: Search,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    platform: "Amazon · eBay",
    title: "SEO Optimized Listings",
    desc: "Improved rankings by 40% through strategic keyword research and listing optimization.",
    href: "#",
  },
  {
    icon: Boxes,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    platform: "Shopify · Amazon",
    title: "Inventory Management",
    desc: "Real-time stock tracking and low-stock alerts across multiple marketplaces to prevent overselling.",
    href: "#",
  },
  {
    icon: Mail,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    platform: "Customer Support",
    title: "Email & Ticket Management",
    desc: "Handled customer inquiries, refunds, and account concerns while maintaining high satisfaction.",
    href: "#",
  },
];

function FeaturedCard({ item }: { item: (typeof featuredCaseStudies)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group grid md:grid-cols-2 gap-0 bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 md:h-full overflow-hidden">
        {item.badge && (
          <span className="absolute top-4 left-4 z-10 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {item.badge}
          </span>
        )}
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            hovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-8 flex flex-col justify-center">
        <span className={`text-xs font-semibold tracking-wider ${item.tagColor}`}>
          {item.tag}
        </span>
        <h3 className="mt-2 text-2xl font-bold text-white">{item.title}</h3>
        <p className="mt-3 text-slate-400 leading-relaxed">{item.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.chips.map((chip) => (
            <span
              key={chip}
              className="text-xs px-3 py-1 rounded-full bg-slate-700/60 text-slate-300"
            >
              {chip}
            </span>
          ))}
        </div>

        {item.stats && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            {item.stats.map((s) => (
              <div key={s.label} className="bg-slate-800/60 rounded-lg py-3 text-center">
                <div className="text-lg font-bold text-blue-400">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <a
          href={item.href}
          className="mt-6 inline-flex items-center gap-1 text-emerald-400 font-medium text-sm w-fit
                     after:content-[''] after:block after:h-px after:bg-emerald-400 after:w-0
                     hover:after:w-full after:transition-all after:duration-300"
        >
          View Full Case Study <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-[#0b1120] py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold text-white">Portfolio</h2>
        <p className="mt-2 text-slate-400">Real results from real e-commerce projects</p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {featuredCaseStudies.map((item) => (
          <FeaturedCard key={item.title} item={item} />
        ))}
      </div>

      {/* Additional case studies — text-only, no photos */}
      <div className="max-w-5xl mx-auto mt-16">
        <h3 className="text-lg font-semibold text-white mb-6">Additional Case Studies</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {additionalCaseStudies.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 hover:bg-slate-800/60 transition-colors"
            >
              <div className={`${item.iconBg} ${item.iconColor} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <item.icon size={18} />
              </div>
              <span className="block mt-4 text-xs font-medium text-emerald-400">{item.platform}</span>
              <h4 className="mt-1 text-white font-semibold">{item.title}</h4>
              <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-slate-300 group-hover:text-white">
                View Details <ArrowUpRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
