import bcrypt from 'bcryptjs';
import { 
  IUser, 
  IService, 
  ILead, 
  IClient, 
  IProject, 
  ITestimonial, 
  IBlog, 
  IAuditRequest, 
  IReport, 
  IWebContent, 
  INotification 
} from '../models/types';

// In-Memory Fallback State (Pre-populated with rich data for Options IT Ltd)
class DataStore {
  public users: IUser[] = [];
  public services: IService[] = [];
  public leads: ILead[] = [];
  public clients: IClient[] = [];
  public projects: IProject[] = [];
  public testimonials: ITestimonial[] = [];
  public blogs: IBlog[] = [];
  public auditRequests: IAuditRequest[] = [];
  public reports: IReport[] = [];
  public webContent: IWebContent | null = null;
  public notifications: INotification[] = [];
  public visitorCount: number = 28450;
  public isMongoConnected: boolean = false;

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // 1. Initial Users (Super Admin, Admin, Editor, Client)
    const salt = bcrypt.genSaltSync(10);
    const superAdminPassword = bcrypt.hashSync('SuperAdmin@2026', salt);
    const adminPassword = bcrypt.hashSync('Admin@2026', salt);
    const editorPassword = bcrypt.hashSync('Editor@2026', salt);
    const clientPassword = bcrypt.hashSync('Client@2026', salt);

    this.users = [
      {
        _id: 'usr_super_01',
        name: 'Executive Super Admin',
        email: 'superadmin@optionitld.com',
        password: superAdminPassword,
        role: 'Super Admin',
        phone: '+8801806301888',
        companyName: 'Options IT Ltd',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'usr_admin_02',
        name: 'Sakib Al-Hasan (Admin)',
        email: 'admin@optionitld.com',
        password: adminPassword,
        role: 'Admin',
        phone: '+8801806301888',
        companyName: 'Options IT Ltd',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'usr_editor_03',
        name: 'Sarah Content Editor',
        email: 'editor@optionitld.com',
        password: editorPassword,
        role: 'Editor',
        phone: '+8801806301888',
        companyName: 'Options IT Ltd',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'usr_client_04',
        name: 'Julian Hayes (Apex Nutrition)',
        email: 'client@apexnutrition.com',
        password: clientPassword,
        role: 'Client',
        phone: '+1 415 890 2341',
        companyName: 'Apex Performance Nutrition',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // 2. Services (7 core services + Ecom development)
    this.services = [
      {
        _id: 'srv_01',
        serviceName: 'Server-Side Tracking (SST)',
        slug: 'server-side-tracking',
        shortDescription: 'Bypass iOS 14.5+ restrictions and adblockers using a first-party cloud server container.',
        fullDescription: 'We set up and maintain a dedicated first-party tagging server (Google Cloud Platform or Stape) under your custom subdomain (e.g. ssgtm.yourbrand.com). All user interactions are routed directly through your server, bypassing browser ad-blockers, Safari ITP 7-day cookie limits, and third-party script blockers.',
        icon: 'Server',
        bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        features: [
          'First-Party Subdomain (ssgtm.yourbrand.com)',
          'Extends Safari ITP Cookie Life up to 1-2 years',
          'Bypasses Adblockers & Brave browser shields',
          'Eliminates Heavy Browser JS Execution Speed Lag',
          'Zero Data Leakage with Custom Anonymization'
        ],
        pricingStartingAt: 499,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'srv_02',
        serviceName: 'Meta Pixel & Conversions API (CAPI)',
        slug: 'meta-capi-setup',
        shortDescription: 'Enterprise dual-tagging with precise event_id deduplication and 9.0+ Event Match Quality.',
        fullDescription: 'Direct server-to-server integration sending purchase, checkout, and lead events straight into Meta Graph API alongside browser Pixel signals. Deduplicates accurately using unique event_id hashes, sending enhanced user parameters (fbp, fbc, hashed email, phone, city, IP, user-agent).',
        icon: 'Activity',
        bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        features: [
          'High Event Match Quality (Target 8.5 – 9.8)',
          'Dynamic event_id & timestamp deduplication',
          'User Parameter Enrichment (em, ph, fn, ct, zp)',
          'Custom Offline Conversion & Subscription sync',
          '100% iOS 14.5+ Purchase Recovery'
        ],
        pricingStartingAt: 399,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'srv_03',
        serviceName: 'Google Tag Manager (GTM) Setup',
        slug: 'google-tag-manager-setup',
        shortDescription: 'Clean Web & Server GTM containers with custom dataLayer integration for Shopify & Woo.',
        fullDescription: 'Comprehensive structure using Google Tag Manager Web & Server containers. We write customized JavaScript dataLayer pushes for all standard eCommerce events: view_item_list, select_item, view_item, add_to_cart, remove_from_cart, view_cart, begin_checkout, add_shipping_info, add_payment_info, and purchase.',
        icon: 'Layers',
        bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        features: [
          'Dual Web + Server Container Setup',
          'Custom JavaScript dataLayer listeners',
          'Google Consent Mode v2 implementation',
          'Multi-currency & discount tax reconciliation',
          'Zero tag conflicts or page slowdown'
        ],
        pricingStartingAt: 349,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'srv_04',
        serviceName: 'GA4 Ecommerce Tracking',
        slug: 'ga4-ecommerce-tracking',
        shortDescription: '100% accurate revenue reconciliation matching Shopify and WooCommerce admin reports.',
        fullDescription: 'Audit, debug, and configure Google Analytics 4 for eCommerce. We configure custom dimensions, item scoped metrics, internal traffic filtering, cross-domain payment gateway handling (PayPal, Stripe, Klarna, Afterpay), and Google BigQuery daily streaming exports.',
        icon: 'LineChart',
        bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        features: [
          'Zero Unassigned / Direct Traffic Spikes',
          'Cross-Domain Payment Gateway referral exclusion',
          'BigQuery Export & Looker Studio Dashboards',
          'Granular Funnel & Drop-off Analysis',
          'Google Ads Enhanced Conversions link'
        ],
        pricingStartingAt: 399,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'srv_05',
        serviceName: 'Meta Ads Management',
        slug: 'meta-ads-management',
        shortDescription: 'Data-driven Advantage+ Shopping Campaigns (ASC) and creative testing frameworks.',
        fullDescription: 'Full-funnel Meta advertising management built upon clean first-party server data. We structure ASC+ scaling campaigns, dynamic creative testing modules (DCT), and customer retention retargeting pools that drive profitable ROAS.',
        icon: 'Target',
        bannerImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
        features: [
          'Advantage+ Shopping Campaign (ASC) scaling',
          'Dynamic Creative Testing (DCT) frameworks',
          'Lookalike audiences built from first-party server data',
          'Weekly performance audits and creative iteration'
        ],
        pricingStartingAt: 899,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'srv_06',
        serviceName: 'Google Ads Management',
        slug: 'google-ads-management',
        shortDescription: 'High-intent Performance Max, Search, and Shopping campaigns optimized with Enhanced Conversions.',
        fullDescription: 'Performance Max (PMax) asset group structuring, high-intent Search keyword harvesting, negative keyword pruning, and Google Shopping feed optimization with server-side Enhanced Conversions.',
        icon: 'Zap',
        bannerImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
        features: [
          'Performance Max segmentation & asset optimization',
          'Exact match Search structures with high intent',
          'Enhanced Conversions with server-side lead value hashing',
          'Smart Bidding feed optimization'
        ],
        pricingStartingAt: 899,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'srv_07',
        serviceName: 'Google Merchant Center (GMC) Fix & Approval',
        slug: 'gmc-fix-approval',
        shortDescription: 'Fix Misrepresentation, policy violations, feed dis專approvals, and get accounts reinstated.',
        fullDescription: 'Deep technical and policy audit of your store, checkout flow, refund/shipping policies, product structured data (Schema.org), GTIN/MPN identifiers, and Merchant Center feed taxonomy.',
        icon: 'ShieldCheck',
        bannerImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        features: [
          'Misrepresentation suspension unbanning',
          'Policy & Compliance page restructuring',
          'GTIN / MPN & Brand identifier feed cleanup',
          'Microdata / JSON-LD Schema price & availability sync'
        ],
        pricingStartingAt: 450,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // 3. Leads (CRM)
    this.leads = [
      {
        _id: 'lead_01',
        name: 'Marcus Vance',
        email: 'marcus@vanceleather.co',
        phone: '+1 312 902 4411',
        companyName: 'Vance Leather Goods',
        websiteURL: 'https://vanceleather.co',
        serviceRequired: 'Server-Side Tracking & Meta CAPI',
        budget: '$5,000 - $10,000 / month',
        message: 'Our Meta CPA jumped by 40% after iOS update. We suspect Safari purchases are not recording.',
        status: 'New',
        notes: [
          { text: 'Initial lead captured from homepage audit form. Store has ~45k monthly visitors on Shopify.', author: 'System', createdAt: new Date(Date.now() - 3600000).toISOString() }
        ],
        assignedTo: 'Sakib Al-Hasan',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        _id: 'lead_02',
        name: 'Fatima Al-Mansoor',
        email: 'fatima@silkandvelvet.ae',
        phone: '+971 50 123 4567',
        companyName: 'Silk & Velvet D2C',
        websiteURL: 'https://silkandvelvet.ae',
        serviceRequired: 'Google Merchant Center (GMC) Fix',
        budget: '$2,500 - $5,000 / month',
        message: 'GMC account suspended for Misrepresentation 3 days ago. Need urgent unban for Google Shopping ads.',
        status: 'Qualified',
        notes: [
          { text: 'Audited checkout terms; identified missing return policy link on footer and Schema mismatch.', author: 'Sakib Al-Hasan', createdAt: new Date(Date.now() - 86400000).toISOString() }
        ],
        assignedTo: 'Lead Policy Specialist',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        _id: 'lead_03',
        name: 'Oliver Brandt',
        email: 'oliver@nordiclighting.de',
        phone: '+49 170 555 9182',
        companyName: 'Nordic Lighting Studio',
        websiteURL: 'https://nordiclighting.de',
        serviceRequired: 'GA4 Ecommerce Tracking & GTM Setup',
        budget: '$5,000 - $10,000 / month',
        message: 'GA4 revenue shows 30% lower than Shopify admin because of PayPal and Klarna redirects.',
        status: 'Proposal Sent',
        notes: [
          { text: 'Sent formal statement of work for Server-Side GTM + Stape EU cloud hosting.', author: 'Sakib Al-Hasan', createdAt: new Date(Date.now() - 172800000).toISOString() }
        ],
        assignedTo: 'Sakib Al-Hasan',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        _id: 'lead_04',
        name: 'Chloe Bennett',
        email: 'chloe@luminescentskin.com',
        phone: '+1 415 777 2209',
        companyName: 'Luminescent Skincare',
        websiteURL: 'https://luminescentskin.com',
        serviceRequired: 'Meta Ads Management & Server-Side Tracking',
        budget: '$10,000+ / month',
        message: 'Looking for an agency that handles both server tracking setup and ongoing Meta Ads scaling.',
        status: 'Converted',
        notes: [
          { text: 'Signed annual management retainer. Client onboarding initiated.', author: 'Super Admin', createdAt: new Date(Date.now() - 259200000).toISOString() }
        ],
        assignedTo: 'Super Admin',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        updatedAt: new Date(Date.now() - 259200000).toISOString()
      }
    ];

    // 4. Clients
    this.clients = [
      {
        _id: 'cli_01',
        clientName: 'Julian Hayes',
        companyName: 'Apex Performance Nutrition',
        email: 'client@apexnutrition.com',
        phone: '+1 415 890 2341',
        website: 'https://apexnutrition.com',
        servicePlan: 'Enterprise Server-Side CAPI & Meta Ads Scaling',
        projectStatus: 'Running',
        trackingSetupProgress: {
          dataAudit: true,
          gtmContainerConfigured: true,
          serverSideCloudProvisioned: true,
          capiAndDeduplicationActive: true,
          ga4EnhancedEcommerceVerified: true,
          gmcFeedApproved: true,
          percentComplete: 95
        },
        startDate: '2026-01-15',
        assignedEngineer: 'Sakib Al-Hasan (Senior Tracking Architect)',
        invoicesCount: 3,
        totalPaid: 4500,
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'cli_02',
        clientName: 'Fatima Al-Mansoor',
        companyName: 'Silk & Velvet D2C',
        email: 'fatima@silkandvelvet.ae',
        phone: '+971 50 123 4567',
        website: 'https://silkandvelvet.ae',
        servicePlan: 'GMC Misrepresentation Reinstatement & PMax Feed Fix',
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
        startDate: '2026-02-01',
        endDate: '2026-02-12',
        assignedEngineer: 'Lead Policy Specialist',
        invoicesCount: 1,
        totalPaid: 1200,
        createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'cli_03',
        clientName: 'Oliver Brandt',
        companyName: 'Nordic Lighting Studio',
        email: 'oliver@nordiclighting.de',
        phone: '+49 170 555 9182',
        website: 'https://nordiclighting.de',
        servicePlan: 'GA4 Server Tracking + Google Ads Enhanced Conversions',
        projectStatus: 'Running',
        trackingSetupProgress: {
          dataAudit: true,
          gtmContainerConfigured: true,
          serverSideCloudProvisioned: true,
          capiAndDeduplicationActive: false,
          ga4EnhancedEcommerceVerified: false,
          gmcFeedApproved: false,
          percentComplete: 60
        },
        startDate: '2026-02-10',
        assignedEngineer: 'Sakib Al-Hasan',
        invoicesCount: 2,
        totalPaid: 2800,
        createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // 5. Projects / Case Studies
    this.projects = [
      {
        _id: 'proj_01',
        clientName: 'Apex Performance Nutrition',
        projectTitle: 'Shopify Plus Server-Side CAPI & 31% CPA Reduction',
        slug: 'apex-nutrition-server-capi',
        problem: 'Client had lost 35% of purchase events on Safari/iOS browsers, leading Meta algorithm to overbid and drop ROAS from 3.8x to 2.1x.',
        solution: 'Provisioned Google Cloud Server GTM on custom subdomain. Integrated Meta Conversions API with dynamic event_id deduplication and 9 user parameters.',
        servicesUsed: ['Server-Side Tracking', 'Meta Pixel & CAPI', 'Shopify dataLayer Integration'],
        results: 'Meta Event Match Quality jumped from 4.8 to 9.6. Ad CPA reduced by 31% within 14 days, driving $140,000+ in attributed monthly revenue.',
        beforeAfterData: {
          beforeMetric: '2.1x ROAS (4.8 EMQ)',
          afterMetric: '3.9x ROAS (9.6 EMQ)',
          roasUplift: '+85.7%',
          emqScore: '9.6 / 10'
        },
        images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'],
        testimonial: {
          quote: 'We migrated our Shopify Plus store to Options IT Server-Side CAPI. Our Meta Event Match Quality jumped to 9.6 and our CPA dropped by 31% in the first 14 days. Truly enterprise quality.',
          author: 'Julian Hayes',
          role: 'CEO, Apex Performance Nutrition'
        },
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'proj_02',
        clientName: 'Silk & Velvet D2C',
        projectTitle: 'GMC Misrepresentation Reinstatement & 4-Day Approval',
        slug: 'silk-velvet-gmc-reinstatement',
        problem: 'Store was slapped with an automatic GMC Misrepresentation suspension for 2 months, halting $80k/month Google Shopping revenues.',
        solution: 'Audited 42 policy checkpoints, structured Schema.org JSON-LD microdata, updated refund/billing terms, and fixed shipping rate table discrepancies.',
        servicesUsed: ['Google Merchant Center Fix', 'Schema.org Optimization', 'Feed Disapproval Resolution'],
        results: 'GMC account fully approved and reinstated within 4 days of resubmission. Google Shopping campaign ROAS reached 4.6x.',
        beforeAfterData: {
          beforeMetric: 'Account Suspended ($0 Rev)',
          afterMetric: 'Approved & Scaled ($92k/mo)',
          roasUplift: '4.6x PMax ROAS',
          emqScore: '100% Policy Clean'
        },
        images: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'],
        testimonial: {
          quote: 'We had an impossible GMC Misrepresentation suspension for 2 months. Options IT audited our site, identified 6 subtle compliance errors, and had our Google Merchant Center approved in 4 days.',
          author: 'Fatima Al-Mansoor',
          role: 'Head of E-Commerce, Silk & Velvet D2C'
        },
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'proj_03',
        clientName: 'Nordic Lighting Studio',
        projectTitle: 'GA4 & BigQuery Revenue Reconciliation (100% Accuracy)',
        slug: 'nordic-lighting-ga4-revenue-fix',
        problem: 'GA4 missed 28% of purchases made via PayPal and Klarna due to incomplete thank-you page redirects.',
        solution: 'Implemented Webhook-to-Server-GTM architecture. Purchases trigger on backend order placement regardless of browser redirect behavior.',
        servicesUsed: ['GA4 Ecommerce Tracking', 'GTM Webhooks', 'Google Ads Enhanced Conversions'],
        results: 'Zero revenue discrepancy with Shopify admin. Google Ads Smart Bidding unlocked high-value customer bidding with 4.1x ROAS.',
        beforeAfterData: {
          beforeMetric: '28% Revenue Unrecorded',
          afterMetric: '100% Match with Shopify',
          roasUplift: '+42% Tracked Orders',
          emqScore: '9.8 / 10'
        },
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
        testimonial: {
          quote: 'Finally, our GA4 e-commerce revenue reconciles 100% with our Shopify admin. No more duplicate payment events or missing Safari purchases. The best investment we made this quarter.',
          author: 'Oliver Brandt',
          role: 'Founder, Nordic Lighting Studio'
        },
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // 6. Testimonials
    this.testimonials = [
      {
        _id: 'test_01',
        clientName: 'Julian Hayes',
        company: 'Apex Performance Nutrition',
        role: 'CEO',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        review: 'We migrated our Shopify Plus store to Options IT Server-Side CAPI. Our Meta Event Match Quality jumped to 9.6 and our CPA dropped by 31% in the first 14 days. Truly enterprise quality.',
        rating: 5,
        platform: 'Shopify Plus',
        status: 'approved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'test_02',
        clientName: 'Fatima Al-Mansoor',
        company: 'Silk & Velvet D2C',
        role: 'Head of E-Commerce',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        review: 'We had an impossible GMC Misrepresentation suspension for 2 months. Options IT audited our site, identified 6 subtle compliance errors, and had our Google Merchant Center approved in 4 days.',
        rating: 5,
        platform: 'WooCommerce',
        status: 'approved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'test_03',
        clientName: 'Oliver Brandt',
        company: 'Nordic Lighting Studio',
        role: 'Founder',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        review: 'Finally, our GA4 e-commerce revenue reconciles 100% with our Shopify admin. No more duplicate payment events or missing Safari purchases. The best investment we made this quarter.',
        rating: 5,
        platform: 'Shopify 2.0',
        status: 'approved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // 7. Blogs
    this.blogs = [
      {
        _id: 'blog_01',
        title: 'How Server-Side Tracking Recovers 30%+ Lost iOS 14.5 Conversions',
        slug: 'server-side-tracking-ios-recovery',
        content: `Safari Intelligent Tracking Prevention (ITP) caps client-side cookies at 1-7 days. When users purchase after clicking your Facebook or Google ad, standard browser pixels fail to attribute the order. 
        
By routing tags through a first-party subdomain (e.g. ssgtm.yourdomain.com), cookies become authentic first-party httpOnly storage, extending attribution lifespan up to 1-2 years and bypassing ad-blockers entirely.`,
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        category: 'Server Tracking',
        tags: ['Meta CAPI', 'Server-Side GTM', 'iOS 14.5', 'eCommerce Tracking'],
        seoTitle: 'Server-Side Tracking Guide: How to Recover Lost iOS 14.5 Conversions',
        seoDescription: 'Learn how first-party server-side tagging restores Meta Event Match Quality and lowers customer acquisition costs for Shopify & WooCommerce stores.',
        author: 'Sakib Al-Hasan',
        readTime: '6 min read',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'blog_02',
        title: 'Step-by-Step Guide to Fixing GMC Misrepresentation Suspensions in 2026',
        slug: 'fix-google-merchant-center-misrepresentation',
        content: `Google Merchant Center's algorithmic misrepresentation suspension is the #1 threat to eCommerce Google Shopping revenue. 
        
In this deep-dive guide, we cover the top 7 root causes: mismatched Schema.org prices, missing contact business identifiers, non-compliant return policies, and payment gateway trust indicators.`,
        featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        category: 'Google Ads & GMC',
        tags: ['Google Merchant Center', 'Misrepresentation Fix', 'Google Shopping', 'Policy Reinstatement'],
        seoTitle: 'How to Fix Google Merchant Center Misrepresentation (2026 Guide)',
        seoDescription: 'Proven framework to unban Google Merchant Center accounts suspended for policy violations and Misrepresentation.',
        author: 'Options IT Policy Team',
        readTime: '8 min read',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // 8. Audit Requests
    this.auditRequests = [
      {
        _id: 'audit_01',
        name: 'Harrison Sterling',
        businessName: 'Sterling Chrono Watches',
        website: 'https://sterlingchrono.com',
        email: 'harrison@sterlingchrono.com',
        phone: '+1 646 800 4521',
        trackingProblem: 'Meta Pixel shows 4.2 EMQ and GA4 purchase values do not match Shopify revenue.',
        adPlatform: 'Meta Ads & Google Ads',
        status: 'reviewed',
        technicalNotes: 'Found duplicate purchase tags in theme.liquid and missing user email hashing in CAPI payload.',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'audit_02',
        name: 'Elena Rostova',
        businessName: 'Aura Cosmetics UK',
        website: 'https://auracosmetics.co.uk',
        email: 'elena@auracosmetics.co.uk',
        phone: '+44 7911 123456',
        trackingProblem: 'Google Merchant Center suspended for Misrepresentation after theme redesign.',
        adPlatform: 'Google Shopping / PMax',
        status: 'pending',
        technicalNotes: '',
        createdAt: new Date(Date.now() - 14400000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // 9. Reports
    this.reports = [
      {
        _id: 'rep_01',
        clientId: 'cli_01',
        clientName: 'Apex Performance Nutrition',
        reportTitle: 'Server-Side CAPI Implementation & Event Match Quality Diagnostic',
        reportType: 'Tracking Audit',
        reportDate: '2026-02-15',
        fileUrl: '/uploads/reports/Apex_Nutrition_CAPI_Audit_2026.pdf',
        fileSize: '3.4 MB',
        summary: 'Completed GCP server container setup on ssgtm.apexnutrition.com. Event Match Quality elevated to 9.6/10 with 98.9% deduplication reliability.',
        metrics: {
          spend: 14200,
          roas: 3.9,
          conversions: 840,
          emqScore: 9.6
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'rep_02',
        clientId: 'cli_01',
        clientName: 'Apex Performance Nutrition',
        reportTitle: 'Meta Ads Monthly Scaling & ASC+ Performance Report (February 2026)',
        reportType: 'Meta Ads',
        reportDate: '2026-02-18',
        fileUrl: '/uploads/reports/Apex_Nutrition_Meta_Ads_Feb_2026.pdf',
        fileSize: '4.1 MB',
        summary: 'Scaled Advantage+ Shopping budget with blended ROAS at 3.9x. First-party audience lookalikes delivered 42% of total new-to-brand orders.',
        metrics: {
          spend: 18500,
          roas: 3.92,
          conversions: 1120,
          emqScore: 9.6
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'rep_03',
        clientId: 'cli_02',
        clientName: 'Silk & Velvet D2C',
        reportTitle: 'Google Merchant Center Reinstatement & Schema Compliance Report',
        reportType: 'Tracking Audit',
        reportDate: '2026-02-12',
        fileUrl: '/uploads/reports/Silk_Velvet_GMC_Approval_Report.pdf',
        fileSize: '2.8 MB',
        summary: 'Resolved all 6 policy warning flags. GMC approval granted on Feb 12. PMax campaigns running at 100% health.',
        metrics: {
          spend: 6400,
          roas: 4.6,
          conversions: 320,
          emqScore: 10
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // 10. Web Content
    this.webContent = {
      _id: 'cms_options_it',
      homepage: {
        heroTitle: 'Fix Your Tracking. Optimize Your Ads. Scale Your Revenue.',
        heroSubtitle: 'We help businesses get accurate data, better ad performance, and measurable growth through advanced tracking solutions.',
        ctaPrimaryText: 'Get Free Tracking Audit',
        ctaSecondaryText: 'Chat on WhatsApp',
        bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        statistics: [
          { label: 'eCommerce Stores Tracked', value: '500', suffix: '+' },
          { label: 'Average EMQ Score', value: '9.4', suffix: '/10' },
          { label: 'Attributed Ad Spend Managed', value: '$12M', suffix: '+' },
          { label: 'Average ROAS Lift', value: '38', suffix: '%' }
        ],
        trustBadges: [
          'Meta Certified Media Technical Specialist',
          'Google Tag Manager & GA4 Certified',
          'Google Cloud Platform Partner',
          'Shopify Plus & Woo Verified Partner'
        ]
      },
      aboutPage: {
        companyDescription: 'Options IT Ltd is a specialized digital marketing and tracking engineering agency. We bridge the critical technical gap between e-commerce platforms and ad network algorithms.',
        mission: 'To eliminate tracking data loss, restore advertising attribution accuracy, and empower brands with first-party intelligence.',
        vision: 'To be the global authority in privacy-first server-side data infrastructure and profit-driven ads scaling for high-growth e-commerce.',
        coreValues: [
          '100% First-Party Data Sovereignty',
          'Rigorous Technical Precision (Zero Fake Data)',
          'Transparent, Quantifiable ROAS Growth',
          '24/7 Client Engineering Availability'
        ]
      },
      contactInfo: {
        whatsapp: '+8801806301888',
        email: 'info@optionitld.com',
        domain: 'optionitld.com',
        address: 'Options IT Ltd, Dhaka, Bangladesh (Global Remote eCommerce Services)',
        supportHours: '24/7 Dedicated Support'
      },
      updatedAt: new Date().toISOString()
    };

    // 11. Notifications
    this.notifications = [
      {
        _id: 'notif_01',
        type: 'lead',
        title: 'New High-Value Lead Received',
        message: 'Marcus Vance from Vance Leather Goods requested Server-Side Tracking & Meta CAPI ($5k-$10k budget).',
        read: false,
        createdAt: new Date(Date.now() - 1800000).toISOString()
      },
      {
        _id: 'notif_02',
        type: 'audit',
        title: 'New Store Audit Queued',
        message: 'Sterling Chrono Watches requested a 5-minute video diagnostic for Meta Pixel & GA4 revenue errors.',
        read: false,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        _id: 'notif_03',
        type: 'client',
        title: 'Client Tracking Progress Milestone',
        message: 'Apex Performance Nutrition reached 95% completion. Meta CAPI EMQ verified at 9.6.',
        read: true,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  }
}

export const db = new DataStore();
