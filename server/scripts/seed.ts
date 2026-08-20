import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ENV } from '../config/env';
import {
  UserModel,
  ServiceModel,
  LeadModel,
  ClientModel,
  ProjectModel,
  TestimonialModel,
  BlogModel,
  AuditRequestModel,
  ReportModel,
  WebContentModel,
  NotificationModel
} from '../models/mongooseSchemas';

export async function seedDatabase(options: { wipeExisting?: boolean; quiet?: boolean } = {}) {
  const { wipeExisting = false, quiet = false } = options;

  if (!quiet) {
    console.log('🌱 Starting Options IT Ltd Database Seeding process...');
    console.log(`📡 Target MongoDB URI: ${ENV.MONGODB_URI}`);
  }

  // Ensure Mongoose is connected
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    });
  }

  if (wipeExisting) {
    if (!quiet) console.log('🧹 Wiping existing collections for fresh initialization...');
    await UserModel.deleteMany({});
    await ServiceModel.deleteMany({});
    await LeadModel.deleteMany({});
    await ClientModel.deleteMany({});
    await ProjectModel.deleteMany({});
    await TestimonialModel.deleteMany({});
    await BlogModel.deleteMany({});
    await AuditRequestModel.deleteMany({});
    await ReportModel.deleteMany({});
    await WebContentModel.deleteMany({});
    await NotificationModel.deleteMany({});
  }

  // 1. Create the First Super Admin User (Mandatory)
  const salt = await bcrypt.genSalt(10);
  const hashedSuperAdminPassword = await bcrypt.hash(ENV.SUPER_ADMIN_PASSWORD, salt);

  const superAdminData = {
    name: ENV.SUPER_ADMIN_NAME || 'Sakib',
    email: (ENV.SUPER_ADMIN_EMAIL || 'admin@optionsitld.com').toLowerCase(),
    password: hashedSuperAdminPassword,
    role: 'super_admin',
    phone: '+8801806301888',
    companyName: 'Options IT Ltd',
    isActive: true
  };

  const existingSuperAdmin = await UserModel.findOne({ email: superAdminData.email });
  if (!existingSuperAdmin) {
    await UserModel.create(superAdminData);
    if (!quiet) console.log(`👑 Super Admin created: ${superAdminData.name} <${superAdminData.email}> (Role: ${superAdminData.role})`);
  } else {
    // Update credentials to ensure password & role are current
    await UserModel.updateOne({ email: superAdminData.email }, { $set: superAdminData });
    if (!quiet) console.log(`👑 Super Admin updated/verified: ${superAdminData.name} <${superAdminData.email}>`);
  }

  // Additional Team & Client Users
  const adminHashedPassword = await bcrypt.hash('Admin@2026', salt);
  const superAdminQuickHashedPassword = await bcrypt.hash('SuperAdmin@2026', salt);
  const clientHashedPassword = await bcrypt.hash('Client@2026', salt);
  const editorHashedPassword = await bcrypt.hash('Editor@2026', salt);

  const demoUsers = [
    {
      name: 'Agency Operations Admin',
      email: 'admin@optionitld.com',
      password: adminHashedPassword,
      role: 'Admin',
      phone: '+8801806301888',
      companyName: 'Options IT Ltd',
      isActive: true
    },
    {
      name: 'Super Admin',
      email: 'superadmin@optionitld.com',
      password: superAdminQuickHashedPassword,
      role: 'super_admin',
      phone: '+8801806301888',
      companyName: 'Options IT Ltd',
      isActive: true
    },
    {
      name: 'Super Admin',
      email: 'superadmin@optionsitld.com',
      password: superAdminQuickHashedPassword,
      role: 'super_admin',
      phone: '+8801806301888',
      companyName: 'Options IT Ltd',
      isActive: true
    },
    {
      name: 'Sarah Content Editor',
      email: 'editor@optionitld.com',
      password: editorHashedPassword,
      role: 'Editor',
      phone: '+8801806301888',
      companyName: 'Options IT Ltd',
      isActive: true
    },
    {
      name: 'Sarah Content Editor',
      email: 'editor@optionsitld.com',
      password: editorHashedPassword,
      role: 'Editor',
      phone: '+8801806301888',
      companyName: 'Options IT Ltd',
      isActive: true
    },
    {
      name: 'Julian Hayes (Apex Nutrition)',
      email: 'client@apexnutrition.com',
      password: clientHashedPassword,
      role: 'Client',
      phone: '+1 415 890 2341',
      companyName: 'Apex Performance Nutrition',
      isActive: true
    }
  ];

  for (const u of demoUsers) {
    const exists = await UserModel.findOne({ email: u.email });
    if (!exists) {
      await UserModel.create(u);
    }
  }

  // 2. Core Tracking & Development Services
  const servicesData = [
    {
      serviceName: 'Server-Side Tracking (SST)',
      slug: 'server-side-tracking',
      shortDescription: 'Bypass ad blockers, iOS 14.5+ ITP restrictions, and browser cookie limits using Stape.io & Google Cloud servers.',
      fullDescription: 'Traditional browser pixels lose up to 40% of conversion data due to Safari ITP, AdBlockers, and Brave privacy shields. Server-Side Tracking transmits customer interactions directly from your custom first-party subdomain (e.g. data.yourstore.com) to cloud tagging endpoints (GCP / Stape), restoring lost signals and extending cookie lifespans up to 400 days.',
      icon: 'Server',
      bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      features: [
        'First-party subdomain setup (data.yourdomain.com)',
        'Google Cloud Platform / Stape.io server provisioning',
        'Safari ITP 1-day cookie extension up to 400+ days',
        'Bypass Adblockers & Brave Browser shields',
        'Custom GTM server container configuration',
        'Complete user data payload encryption'
      ],
      pricingStartingAt: 149,
      status: 'active'
    },
    {
      serviceName: 'Meta Conversion API (CAPI) & Pixel Setup',
      slug: 'meta-conversion-api',
      shortDescription: 'Achieve 8.5+ Event Match Quality (EMQ) scores with dual-channel browser & server deduplication.',
      fullDescription: 'Send purchase, lead, and add-to-cart events directly from your server to Meta servers. Combined with client-side pixel deduplication using unique event_id tokens, this drastically reduces CPA and restores algorithm targeting accuracy.',
      icon: 'Activity',
      bannerImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Event Match Quality (EMQ) score optimization (8.5 - 9.8)',
        'Browser & Server event deduplication via unique event_id',
        'Advanced matching parameters (fn, ln, em, ph, ct, zp, country)',
        'Meta Aggregated Event Measurement prioritization',
        'Custom purchase value & currency synchronization',
        'Automated catalog dynamic ads pixel binding'
      ],
      pricingStartingAt: 149,
      status: 'active'
    },
    {
      serviceName: 'Google Ads Conversion Tracking & Enhanced Conversions',
      slug: 'google-ads-tracking',
      shortDescription: 'Feed first-party customer signals into Google Smart Bidding to drastically lower CPA and maximize ROAS.',
      fullDescription: 'Capture high-intent search and shopping conversions with cryptographic SHA-256 hashed customer parameters. Supercharge Google AI Smart Bidding with accurate offline conversion uploads, dynamic cart revenue, and new customer acquisition tracking.',
      icon: 'Target',
      bannerImage: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Google Ads Enhanced Conversions for Web & Leads',
        'SHA-256 hashed customer data collection (Email, Phone, Address)',
        'Server-Side Google Ads conversion uploads',
        'Offline Conversion Tracking (OCT) with gclid injection',
        'Dynamic conversion value & basket item tracking',
        'Consent Mode v2 Advanced integration'
      ],
      pricingStartingAt: 149,
      status: 'active'
    },
    {
      serviceName: 'GA4 Enhanced E-commerce Tracking',
      slug: 'ga4-enhanced-ecommerce',
      shortDescription: 'Full-funnel eCommerce measurement with custom dimensions, clean deduplication, and BigQuery data export.',
      fullDescription: 'Transform raw clicks into actionable business intelligence. We implement complete GA4 e-commerce schemas for item view, cart adds, checkout steps, promo clicks, coupon usage, and purchase transactions.',
      icon: 'BarChart3',
      bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Full 14-step GA4 e-commerce event schema',
        'Cross-domain tracking & payment gateway referral exclusion',
        'Custom parameters (user_type, lifetime_value, item_category)',
        'Google BigQuery raw event streaming export',
        'Server-Side GA4 measurement protocol setup',
        'Executive Looker Studio interactive dashboard'
      ],
      pricingStartingAt: 149,
      status: 'active'
    },
    {
      serviceName: 'Google Merchant Center (GMC) Setup & Fix',
      slug: 'gmc-setup-and-fix',
      shortDescription: 'Resolve account suspensions, misrepresentation warnings, and product feed errors for Google Shopping Ads.',
      fullDescription: 'Get your Google Shopping and Performance Max campaigns back online. We audit store compliance, fix feed attribute errors (GTIN, MPN, Brand), align checkout terms with Merchant policies, and request policy approval directly from Google support.',
      icon: 'CheckCircle2',
      bannerImage: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Misrepresentation & Untrustworthy Promotions fixes',
        'Automated supplemental XML / API product feed sync',
        'Shipping, returns, and tax rate policy configuration',
        'GTIN / Barcode validation and identifier overrides',
        'Direct appeals & escalation with Google Trust & Safety',
        'Seamless Shopify, WooCommerce, and Magento sync'
      ],
      pricingStartingAt: 199,
      status: 'active'
    },
    {
      serviceName: 'TikTok Events API & Pixel Setup',
      slug: 'tiktok-events-api',
      shortDescription: 'Scale TikTok Shop and Spark Ads with server-side Web Events API and high match rate deduplication.',
      fullDescription: 'TikTok ad delivery depends on fast, accurate pixel signals. We set up TikTok Events API via server container to measure CompletePayment, InitiateCheckout, and Lead events even on iOS devices.',
      icon: 'Video',
      bannerImage: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80',
      features: [
        'TikTok Web Events API (Server-Side)',
        'Advanced Matching (Email, Phone hash)',
        'Event ID deduplication between Web Pixel & API',
        'Custom product dynamic showcase tags',
        'Real-time TikTok Ads Manager event verification'
      ],
      pricingStartingAt: 149,
      status: 'active'
    },
    {
      serviceName: 'Pinterest & LinkedIn Conversion Tracking',
      slug: 'pinterest-linkedin-tracking',
      shortDescription: 'High-ticket B2B lead generation & lifestyle eCommerce tracking with first-party CAPI pipelines.',
      fullDescription: 'Accurately attribute high-value B2B pipeline deals on LinkedIn and luxury lifestyle purchases on Pinterest using modern server-side conversion architectures.',
      icon: 'Layers',
      bannerImage: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=1200&q=80',
      features: [
        'LinkedIn Conversions API & Insight Tag 2.0',
        'Pinterest API for Conversions (v5)',
        'Offline revenue attribution for CRM lead closes',
        'Enhanced event validation and compliance'
      ],
      pricingStartingAt: 149,
      status: 'active'
    },
    {
      serviceName: 'Custom eCommerce Solutions & Web Development',
      slug: 'custom-ecommerce-development',
      shortDescription: 'High-speed, conversion-optimized stores built on Shopify Plus, WooCommerce, and Custom React/Next.js.',
      fullDescription: 'Custom eCommerce stores engineered from the ground up for maximum speed, flawless mobile checkout UX, and built-in tracking readiness.',
      icon: 'Code2',
      bannerImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      features: [
        'Sub-second page load times with 95+ Google PageSpeed',
        'Headless Shopify & custom Next.js storefronts',
        'DataLayer architecture natively embedded in codebase',
        'One-page streamlined checkout optimization',
        'Custom ERP / CRM API integrations'
      ],
      pricingStartingAt: 499,
      status: 'active'
    }
  ];

  for (const s of servicesData) {
    await ServiceModel.findOneAndUpdate(
      { slug: s.slug },
      { $set: s },
      { upsert: true, new: true }
    );
  }
  if (!quiet) console.log(`📦 Seeded ${servicesData.length} core services in MongoDB.`);

  // 3. Initial Clients with Tracking Setup Workflows
  const clientsData = [
    {
      clientName: 'Julian Hayes',
      companyName: 'Apex Performance Nutrition',
      email: 'julian@apexnutrition.com',
      phone: '+1 415 890 2341',
      website: 'https://apexnutrition.com',
      servicePlan: 'Enterprise Server-Side Suite (Shopify Plus)',
      projectStatus: 'Running',
      trackingSetupProgress: {
        dataAudit: true,
        gtmContainerConfigured: true,
        serverSideCloudProvisioned: true,
        capiAndDeduplicationActive: true,
        ga4EnhancedEcommerceVerified: true,
        gmcFeedApproved: false,
        percentComplete: 85
      },
      startDate: new Date('2026-02-01').toISOString(),
      assignedEngineer: 'Sakib (Lead Tracking Architect)',
      invoicesCount: 2,
      totalPaid: 1850
    },
    {
      clientName: 'Elena Rostova',
      companyName: 'Velvet & Oak Apparel',
      email: 'elena@velvetandoak.co.uk',
      phone: '+44 20 7946 0912',
      website: 'https://velvetandoak.co.uk',
      servicePlan: 'Full Meta CAPI + Google Ads Tracking',
      projectStatus: 'Running',
      trackingSetupProgress: {
        dataAudit: true,
        gtmContainerConfigured: true,
        serverSideCloudProvisioned: true,
        capiAndDeduplicationActive: true,
        ga4EnhancedEcommerceVerified: false,
        gmcFeedApproved: false,
        percentComplete: 60
      },
      startDate: new Date('2026-02-10').toISOString(),
      assignedEngineer: 'Sakib (Lead Tracking Architect)',
      invoicesCount: 1,
      totalPaid: 950
    },
    {
      clientName: 'Marcus Vance',
      companyName: 'Lumina Tech Gadgets',
      email: 'marcus@luminagadgets.de',
      phone: '+49 30 2312 8890',
      website: 'https://luminagadgets.de',
      servicePlan: 'GMC Suspension Fix & Google PMax Tracking',
      projectStatus: 'Completed',
      trackingSetupProgress: {
        dataAudit: true,
        gtmContainerConfigured: true,
        serverSideCloudProvisioned: true,
        capiAndDeduplicationActive: true,
        ga4EnhancedEcommerceVerified: true,
        gmcFeedApproved: true,
        percentComplete: 100
      },
      startDate: new Date('2026-01-05').toISOString(),
      endDate: new Date('2026-01-28').toISOString(),
      assignedEngineer: 'Sakib (Lead Tracking Architect)',
      invoicesCount: 3,
      totalPaid: 2400
    }
  ];

  for (const c of clientsData) {
    await ClientModel.findOneAndUpdate(
      { email: c.email },
      { $set: c },
      { upsert: true, new: true }
    );
  }
  if (!quiet) console.log(`💼 Seeded ${clientsData.length} client accounts in MongoDB.`);

  // 4. Initial Real Leads
  const leadsData = [
    {
      name: 'Oliver Scott',
      email: 'oliver@scottleather.com.au',
      phone: '+61 400 987 654',
      companyName: 'Scott Handcrafted Leather',
      websiteURL: 'https://scottleather.com.au',
      serviceRequired: 'Server-Side Tracking (SST) & Meta CAPI',
      budget: '$5,000 - $10,000 / month',
      message: 'Safari buyers make up 65% of our traffic and our Meta ROAS dropped from 4.2 to 1.8. Need server-side setup urgently.',
      status: 'Qualified',
      notes: [
        {
          text: 'Verified Shopify Plus store. Safari traffic loss confirmed. High priority lead.',
          author: 'Sakib (Super Admin)',
          createdAt: new Date().toISOString()
        }
      ],
      assignedTo: 'Sakib'
    },
    {
      name: 'Darius Vance',
      email: 'darius@vanceaudio.com',
      phone: '+1 312 889 0122',
      companyName: 'Vance Audio Labs',
      websiteURL: 'https://vanceaudio.com',
      serviceRequired: 'Google Merchant Center (GMC) Setup & Fix',
      budget: '$10,000+ / month',
      message: 'Our GMC account was flagged for Misrepresentation 3 days ago. Need professional policy compliance fix.',
      status: 'Contacted',
      notes: [
        {
          text: 'Initial review of store policy pages sent on WhatsApp.',
          author: 'Sakib (Super Admin)',
          createdAt: new Date().toISOString()
        }
      ],
      assignedTo: 'Sakib'
    }
  ];

  for (const l of leadsData) {
    const exists = await LeadModel.findOne({ websiteURL: l.websiteURL });
    if (!exists) {
      await LeadModel.create(l);
    }
  }
  if (!quiet) console.log(`🔥 Seeded leads in MongoDB.`);

  // 5. Case Studies with Before & After Metrics
  const projectsData = [
    {
      clientName: 'Apex Performance Nutrition',
      projectTitle: 'Recovering 34% Missing Purchases on Shopify Plus with First-Party Stape SST',
      slug: 'apex-nutrition-sst-case-study',
      problem: 'High Safari mobile traffic volume was causing 35% of Shopify purchases to go untracked by Meta Pixel, severely handicapping ad algorithms and causing inflated CPA.',
      solution: 'Deployed first-party server GTM subdomain on Google Cloud with Meta Conversions API, advanced parameter hashing, and custom 400-day cookie extension.',
      servicesUsed: ['Server-Side Tracking', 'Meta CAPI', 'GA4 Enhanced Ecommerce'],
      results: '+38% Verified Revenue Attribution, +1.8x ROAS boost, EMQ score raised to 9.2/10.',
      beforeAfterData: {
        beforeMetric: 'Pixel Match Quality: 4.8/10 | Missing Data: ~35%',
        afterMetric: 'CAPI Match Quality: 9.2/10 | Data Accuracy: 99.4%',
        roasUplift: '+72% ROAS Improvement',
        emqScore: '9.2 / 10'
      },
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
      ],
      testimonial: {
        quote: 'Options IT completely transformed our ad stability. Within 48 hours of their server CAPI deployment, our Meta ad sets started finding high-ticket purchasers again.',
        author: 'Julian Hayes',
        role: 'CEO & Founder'
      },
      status: 'published'
    },
    {
      clientName: 'Lumina Tech Gadgets',
      projectTitle: 'Unlocking $120k/mo Google PMax Scale After Lifting 6-Month GMC Suspension',
      slug: 'lumina-gadgets-gmc-recovery',
      problem: 'Account was suspended for "Misrepresentation of self or product", completely blocking Google Shopping and Performance Max campaigns for over 180 days.',
      solution: 'Re-architected product feeds with valid GTIN/MPN identifiers, updated store return/shipping policy footers, resolved checkout discrepancies, and filed a direct verified appeal.',
      servicesUsed: ['Google Merchant Center Fix', 'Google Ads Enhanced Conversions'],
      results: 'Account reactivated in 72 hours. Achieved 4.3x ROAS on Google PMax campaigns.',
      beforeAfterData: {
        beforeMetric: 'GMC Status: Suspended (0 Impressions)',
        afterMetric: 'GMC Status: 100% Approved (All 2,400 SKUs Active)',
        roasUplift: '4.3x ROAS on $40k monthly ad spend',
        emqScore: '98% Feed Health Score'
      },
      images: [
        'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1000&q=80'
      ],
      testimonial: {
        quote: 'We hired two other agencies who failed to lift our GMC suspension. Options IT solved it in less than a week with absolute professionalism.',
        author: 'Marcus Vance',
        role: 'Head of Growth'
      },
      status: 'published'
    }
  ];

  for (const p of projectsData) {
    await ProjectModel.findOneAndUpdate(
      { slug: p.slug },
      { $set: p },
      { upsert: true, new: true }
    );
  }
  if (!quiet) console.log(`🏆 Seeded case studies in MongoDB.`);

  // 6. Testimonials
  const testimonialsData = [
    {
      clientName: 'Julian Hayes',
      company: 'Apex Performance Nutrition',
      role: 'Founder & CEO (USA)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      review: 'Options IT is the gold standard for server-side tracking. They set up our custom GCP server container, Meta CAPI, and GA4 with zero downtime. Our CPA dropped by 28% in the first two weeks.',
      rating: 5,
      platform: 'Shopify Plus',
      status: 'approved'
    },
    {
      clientName: 'Elena Rostova',
      company: 'Velvet & Oak Apparel',
      role: 'Marketing Director (UK)',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      review: 'Accurate attribution was our biggest hurdle in scaling Meta ads across Europe. Sakib and the Options IT team resolved our iOS 14 tracking gaps flawlessly.',
      rating: 5,
      platform: 'WooCommerce',
      status: 'approved'
    },
    {
      clientName: 'Marcus Vance',
      company: 'Lumina Tech Gadgets',
      role: 'Co-Founder & COO (Germany)',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      review: 'Our Google Merchant Center was stuck in misrepresentation hell for 6 months. Options IT audited our site, corrected our feeds, and got us reinstated within 4 days.',
      rating: 5,
      platform: 'Shopify',
      status: 'approved'
    }
  ];

  for (const t of testimonialsData) {
    await TestimonialModel.findOneAndUpdate(
      { clientName: t.clientName, company: t.company },
      { $set: t },
      { upsert: true, new: true }
    );
  }
  if (!quiet) console.log(`⭐ Seeded testimonials in MongoDB.`);

  // 7. WebContent (CMS)
  const webContentData = {
    homepage: {
      heroTitle: 'Fix Your Tracking. Optimize Your Ads. Scale Your Revenue.',
      heroSubtitle: 'We help global eCommerce brands capture 100% of conversion data with First-Party Server-Side Tracking (SST), Meta CAPI, GA4 Enhanced Ecommerce, and Google Merchant Center solutions.',
      ctaPrimaryText: 'Claim Free Tracking Audit',
      ctaSecondaryText: 'Chat on WhatsApp',
      bannerImage: '',
      statistics: [
        { label: 'Tracking Accuracy', value: '99.4', suffix: '%' },
        { label: 'Event Match Quality', value: '9.2', suffix: '/10' },
        { label: 'Average ROAS Lift', value: '38', suffix: '%' },
        { label: 'Satisfied Brands', value: '150', suffix: '+' }
      ],
      trustBadges: ['Meta Business Partner', 'Google Certified Expert', 'Stape Certified Partner', 'Shopify Plus Partner']
    },
    aboutPage: {
      companyDescription: 'Options IT Ltd is a specialized technical marketing and web engineering agency dedicated to eliminating data loss in modern advertising. We bridge the gap between browser privacy limitations and advertising algorithm efficiency.',
      mission: 'To empower high-growth eCommerce brands with infallible, first-party data infrastructure, ensuring every marketing dollar is accurately measured and maximized.',
      vision: 'To be the most trusted global authority in server-side web telemetry, advertising conversion APIs, and high-performance eCommerce engineering.',
      coreValues: ['Technical Rigor', 'Data Integrity', 'Measurable ROI', 'Client Confidentiality', 'Continuous Innovation']
    },
    contactInfo: {
      whatsapp: '+8801806301888',
      email: 'info@optionitld.com',
      domain: 'optionitld.com',
      address: 'Dhaka, Bangladesh (Serving Global eCommerce Clients Worldwide)',
      supportHours: '24/7 Priority WhatsApp & Slack Support'
    }
  };

  await WebContentModel.deleteMany({});
  await WebContentModel.create(webContentData);
  if (!quiet) console.log(`🌐 Seeded CMS WebContent in MongoDB.`);

  // 8. Initial Audit Requests & Reports
  const auditData = {
    name: 'Oliver Scott',
    businessName: 'Scott Handcrafted Leather',
    website: 'https://scottleather.com.au',
    email: 'oliver@scottleather.com.au',
    phone: '+61 400 987 654',
    trackingProblem: 'Safari/iOS tracking & ROAS drop on Meta',
    adPlatform: 'Meta Ads + Google Ads',
    status: 'pending',
    technicalNotes: 'Initial inspection indicates 38% missing Safari purchase tags.'
  };
  const auditExists = await AuditRequestModel.findOne({ website: auditData.website });
  if (!auditExists) {
    await AuditRequestModel.create(auditData);
  }

  // 9. Initial System Notifications
  const initialNotif = {
    type: 'system',
    title: '🚀 Options IT MongoDB Engine Online',
    message: `Connected successfully to MongoDB. Super Admin initialized: ${superAdminData.email}`,
    metadata: { version: 'v1.0.0', engine: 'MongoDB + Mongoose' },
    read: false
  };
  await NotificationModel.create(initialNotif);

  if (!quiet) {
    console.log('\n======================================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('======================================================');
    console.log(`👑 Super Admin Email:    ${superAdminData.email}`);
    console.log(`🔑 Super Admin Password: ${ENV.SUPER_ADMIN_PASSWORD}`);
    console.log(`🛡️ Super Admin Role:     ${superAdminData.role}`);
    console.log('======================================================\n');
  }

  return {
    superAdmin: {
      email: superAdminData.email,
      role: superAdminData.role,
      name: superAdminData.name
    },
    servicesCount: servicesData.length,
    clientsCount: clientsData.length,
    leadsCount: leadsData.length
  };
}

// Standalone execution entrypoint (CLI: `npm run seed`)
if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  seedDatabase({ wipeExisting: false })
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Database seed error:', err);
      process.exit(1);
    });
}
