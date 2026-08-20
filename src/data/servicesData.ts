import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'server-side-tracking',
    title: 'Server-Side Tracking (SST)',
    shortDesc: 'Improve data accuracy with first-party tracking and reduce lost conversions caused by iOS 14+ and ad blockers.',
    fullDesc: 'Standard browser tracking loses up to 40% of sales data. We deploy enterprise first-party Server-Side Tracking via Cloudflare & Google Cloud GTM Server container to capture 99%+ of user interactions with lifetime cookie extension.',
    iconName: 'Server',
    badge: 'Core Flagship',
    deliverables: [
      'Custom Subdomain First-Party Server URL (e.g., ssgtm.yourdomain.com)',
      'Stape.io / Google Cloud Platform (GCP) Server Container Setup',
      'Bypass iOS Safari ITP (Intelligent Tracking Prevention) & AdBlockers',
      'Cookie Lifetime Extension (from 1-7 days to 1-2 years)',
      'First-Party Context User Data Hashing (SHA256)',
      'High-speed Edge caching with 0ms client latency impact'
    ],
    problemsSolved: [
      'Missing 30-45% of purchase events on iOS devices',
      'Ad blockers wiping out client-side pixel requests',
      'Unreliable browser cookies expiring within 24 hours'
    ],
    techStack: ['GTM Server Container', 'Stape.io', 'Google Cloud', 'Cloudflare Workers', 'Docker'],
    roiBenefit: 'Recovers 25% - 40% untracked conversion data instantly.'
  },
  {
    id: 'meta-pixel-capi',
    title: 'Meta Pixel & Conversions API (CAPI)',
    shortDesc: 'Track customer actions correctly, eliminate duplicate events, and supercharge Meta Ads algorithm with Event Match Quality 8.5+.',
    fullDesc: 'Connect your store directly to Meta servers. We implement hybrid deduplication with custom event IDs and enriched user data parameters so Meta algorithms get 100% accurate conversion signals for lower CPA and higher ROAS.',
    iconName: 'Share2',
    badge: 'High Impact',
    deliverables: [
      'Browser Pixel + Server CAPI Hybrid Setup',
      'Robust Event Deduplication using unique event_id',
      'High Event Match Quality (EMQ score 8.2 - 9.5 out of 10)',
      'Advanced Customer Information Parameters (Email, Phone, FBP, FBC, IP, User Agent)',
      'Standard E-commerce Events (ViewContent, Search, AddToCart, InitiateCheckout, AddPaymentInfo, Purchase)',
      'Custom parameters for LTV, Product IDs, and Profit Margin optimization'
    ],
    problemsSolved: [
      'Low Event Match Quality (under 5/10) ruining ad delivery',
      'Double counted purchases skewing ROAS metrics',
      'Meta Advantage+ campaigns failing due to blind signal loss'
    ],
    techStack: ['Meta Graph API v20+', 'Facebook CAPI Gateway', 'Meta Business Manager', 'GTM Web & Server'],
    roiBenefit: 'Cuts Cost Per Acquisition (CPA) by 20% to 35% through better machine learning.'
  },
  {
    id: 'gtm-setup',
    title: 'Google Tag Manager (GTM) Setup',
    shortDesc: 'Professional event tracking, unified dataLayer implementation, and automated tag architecture without bloated code.',
    fullDesc: 'Clean, lightning-fast, and standardized Google Tag Manager configuration. We create robust custom dataLayers for Shopify, WooCommerce, Magento, and custom React/Next.js platforms to manage all your marketing tags in one organized hub.',
    iconName: 'Code2',
    badge: 'Infrastructure',
    deliverables: [
      'Web & Server GTM Container Architecture',
      'Custom JavaScript & Dynamic DataLayer Implementation',
      'Google Consent Mode v2 (Basic & Advanced) compliance',
      'Custom Triggers (Scroll depth, Video engagement, Form submits, Outbound clicks)',
      'Enhanced Conversions Web & Server Configuration',
      'Tag Clean-up, Speed Optimization & Debug Assurance'
    ],
    problemsSolved: [
      'Messy hard-coded script tags slowing down site speed',
      'Non-standard dataLayer missing dynamic prices and SKUs',
      'GDPR & EEA Consent Mode v2 non-compliance penalties'
    ],
    techStack: ['GTM Web', 'GTM Server', 'JavaScript DataLayer', 'Consent Mode v2', 'Cookiebot'],
    roiBenefit: 'Standardized tag management and up to 40% faster site load times.'
  },
  {
    id: 'ga4-tracking',
    title: 'GA4 Ecommerce Tracking',
    shortDesc: 'Advanced eCommerce analytics setup with custom funnels, revenue reconciliation, and Google BigQuery data stream exports.',
    fullDesc: 'Say goodbye to inaccurate analytics. We build flawless GA4 measurement systems with full e-commerce event lifecycles, cross-domain attribution, custom user properties, and automated revenue reconciliation dashboards.',
    iconName: 'BarChart3',
    badge: 'Analytics',
    deliverables: [
      'Full GA4 E-commerce Funnel (view_item_list -> view_item -> add_to_cart -> begin_checkout -> purchase)',
      'Cross-Domain Tracking & Payment Gateway Referral Exclusion (PayPal, Stripe, etc.)',
      'Enhanced Measurement & Custom Dimensions/Metrics',
      'Google BigQuery Raw Event Export Setup',
      'Custom Funnel Exploration & User Cohort Retention Reports',
      '1:1 Revenue Reconciliation with Shopify / WooCommerce Admin'
    ],
    problemsSolved: [
      'Payment gateways appearing as referring sources for sales',
      'Discrepancy between Shopify sales and GA4 reported revenue',
      'Inability to analyze true multi-touch customer journeys'
    ],
    techStack: ['Google Analytics 4', 'BigQuery', 'Google Looker Studio', 'Measurement Protocol'],
    roiBenefit: '100% confidence in analytics and multi-channel marketing attribution.'
  },
  {
    id: 'meta-ads-management',
    title: 'Meta Ads Management',
    shortDesc: 'Performance-focused Meta campaigns powered by rich server-side data, creative testing frameworks, and scale strategies.',
    fullDesc: 'We don’t just buy ads; we engineer profitable acquisition systems. Combining rich first-party audience signals with dynamic creative testing and Advantage+ shopping scaling frameworks to maximize eCommerce ROAS.',
    iconName: 'Target',
    badge: 'Ad Scale',
    deliverables: [
      'Advantage+ Shopping Campaigns (ASC) Structuring',
      'High-Converting Creative Angle & Hook Testing Frameworks',
      'First-Party Server-Side Custom & High LTV Lookalike Audiences',
      'Dynamic Product Ads (DPA) & Catalog Sales Retargeting',
      'Daily Budget Pacing, Bid Cap & Cost Cap Optimization',
      'Live ROAS & Blended MER Dashboard Reporting'
    ],
    problemsSolved: [
      'Ad fatigue and fluctuating ROAS',
      'Struggling to scale ad budgets past $500/day profitably',
      'Lack of granular creative testing data'
    ],
    techStack: ['Meta Ads Manager', 'Creative Matrix', 'Triple Whale / Northbeam Integration', 'Figma'],
    roiBenefit: 'Achieve sustainable 3.5x - 6.5x ROAS at scale.'
  },
  {
    id: 'google-ads-management',
    title: 'Google Ads Management',
    shortDesc: 'Performance Max, Search, and Shopping campaigns engineered with Enhanced Conversions and smart bidding calibration.',
    fullDesc: 'Capture high-intent buyers at the exact moment of search. We structure high-performing Google Ads ecosystems utilizing Performance Max asset groups, negative keyword hygiene, and server-side Enhanced Conversions.',
    iconName: 'Zap',
    badge: 'Paid Search',
    deliverables: [
      'Performance Max (PMax) Campaigns with Segmented Asset Groups',
      'High-Intent Standard Shopping & Search Funnels',
      'Enhanced Conversions for Leads & E-commerce Sales',
      'Negative Keyword Lists & Search Term Filtration',
      'tROAS (Target ROAS) and tCPA Smart Bidding Calibration',
      'Store Promotion & Local Inventory Ads Integration'
    ],
    problemsSolved: [
      'PMax wasting budget on branded cannibalization',
      'High Cost-Per-Click (CPC) with low buying intent traffic',
      'Smart Bidding starving due to insufficient conversion volume'
    ],
    techStack: ['Google Ads', 'Google Merchant Center', 'Enhanced Conversions API', 'Looker Studio'],
    roiBenefit: 'Generate consistent 4x+ ROAS on high-intent search and shopping traffic.'
  },
  {
    id: 'gmc-fix',
    title: 'Google Merchant Center (GMC) Fix & Approval',
    shortDesc: 'Fix Merchant Center suspensions, solve Misrepresentation bans, optimize product feeds, and get 100% compliant.',
    fullDesc: 'Is your GMC account suspended for "Misrepresentation" or "Website Needs Improvement"? Our specialized GMC compliance team audits your store, fixes policy violations, rewrites feeds, and gets your account approved swiftly.',
    iconName: 'ShieldCheck',
    badge: 'Specialized',
    deliverables: [
      'Complete Misrepresentation & Policy Violation Diagnostics',
      'Store Website UI & Trust Signals Compliance Overhaul',
      'Product Data Feed Optimization (GTIN, MPN, Brand, Categorization)',
      'Shipping, Tax & Return Policy Alignment with Google Standards',
      'Direct Communication & Appeal Strategy with Google Policy Team',
      'Post-Approval Account Hardening & Monitoring'
    ],
    problemsSolved: [
      'Account suspension blocking all Google Shopping & PMax ads',
      'Product disapprovals due to missing GTIN / identifiers',
      'Repeated automated appeal rejections'
    ],
    techStack: ['GMC Next', 'Content API for Shopping', 'Feedonomics / Channable', 'Policy Audits'],
    roiBenefit: 'Restore suspended revenue streams within 3 to 7 business days.'
  },
  {
    id: 'ecommerce-dev',
    title: 'E-commerce Website Development',
    shortDesc: 'Ultra-fast, conversion-optimized Shopify and WooCommerce stores with native DataLayer tracking built into the core code.',
    fullDesc: 'Most developers build beautiful sites that break tracking. We build high-converting, sub-second loading eCommerce stores natively engineered with seamless dataLayers, mobile checkout optimizations, and modern design.',
    iconName: 'ShoppingBag',
    badge: 'Development',
    deliverables: [
      'Custom Shopify 2.0 Theme & WooCommerce Store Build',
      'Sub-Second Page Load Speeds (90+ Google PageSpeed Score)',
      'Built-in Native Clean DataLayer for GTM & GA4',
      'High-Conversion Frictionless Mobile Checkout Funnel',
      'Dynamic Currency, Multi-Language & Upsell App Integrations',
      'SEO Architecture & Schema Markup Structured Data'
    ],
    problemsSolved: [
      'Slow websites with 4+ second load times bleeding visitors',
      'Broken cart/checkout scripts that drop tracking data',
      'Poor mobile UI causing high cart abandonment'
    ],
    techStack: ['Shopify Liquid', 'WooCommerce', 'Next.js / React', 'Tailwind CSS', 'Schema.org'],
    roiBenefit: 'Boost baseline store conversion rate by 25% - 60%.'
  }
];
