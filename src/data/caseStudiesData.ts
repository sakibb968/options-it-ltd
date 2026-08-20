import { CaseStudy } from '../types';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'lumina-apparel',
    clientName: 'Lumina Activewear',
    industry: 'Fashion & Apparel D2C',
    platform: 'Shopify Plus',
    timeframe: '3 Weeks Implementation',
    summary: 'A fast-growing US activewear brand was suffering from 45% untracked iOS 14+ sales in Meta Ads, resulting in unstable ROAS and climbing CPA.',
    before: {
      dataLoss: '44% of purchases untracked in Meta',
      roas: '1.75x ROAS',
      trackingIssue: 'Standard browser pixel with no server CAPI and 0 event deduplication',
      attributionScore: '4.2 / 10 Meta EMQ'
    },
    after: {
      eventMatchQuality: '9.3 / 10 Meta EMQ',
      roas: '4.40x ROAS (+151%)',
      revenueUplift: '+$74,000/mo tracked sales',
      attributionScore: '99.4% Event Capture Rate'
    },
    solutionDetails: [
      'Configured custom subdomain Stape.io GTM Server container with first-party cookie extension.',
      'Implemented Meta CAPI with unique event_id deduplication and advanced customer parameters (hashed phone/email, fbp/fbc).',
      'Restructured Meta Advantage+ campaigns with verified server event signals, unlocking automated scaling.'
    ],
    clientQuote: {
      text: "Options IT Ltd fixed our tracking in 48 hours. Our Meta ad algorithm suddenly started finding high-paying buyers again, and our ROAS shot up from 1.8x to over 4.4x within weeks!",
      author: 'Marcus Vance',
      role: 'Head of Growth, Lumina Activewear'
    }
  },
  {
    id: 'techgear-electronics',
    clientName: 'AudioPulse Tech',
    industry: 'Consumer Electronics',
    platform: 'WooCommerce',
    timeframe: '5 Days to Unban',
    summary: 'A premier electronics brand had their Google Merchant Center account suspended for "Misrepresentation", paralyzing their 6-figure monthly Google Shopping revenue.',
    before: {
      dataLoss: 'GMC Account Suspended (0 Shopping impressions)',
      roas: '0.0x (All Google Shopping paused)',
      trackingIssue: 'Policy misalignments, faulty GTIN feed mapping, missing trust signals',
      attributionScore: 'Account Suspended'
    },
    after: {
      eventMatchQuality: '100% Policy Approved',
      roas: '5.10x PMax ROAS',
      revenueUplift: '$115,000/mo restored revenue',
      gmcStatus: 'Approved & Active',
      attributionScore: '99.1% Feed Compliance'
    },
    solutionDetails: [
      'Conducted a 42-point Google Merchant Center policy compliance audit of the store UI, return policy, and checkout.',
      'Overhauled product feed attributes (GTIN, MPN, brand, Google product categories) using automated rules.',
      'Drafted policy compliance appeal with direct evidence, resulting in full reinstatement on the first submission.'
    ],
    clientQuote: {
      text: "We were banned on GMC for 3 months with other agencies failing. Options IT audited our site, fixed every subtle policy issue, and got us reinstated in just 5 days. Absolute lifesavers.",
      author: 'Elena Rostova',
      role: 'Operations Director, AudioPulse'
    }
  },
  {
    id: 'organics-skincare',
    clientName: 'NaturaGlow Cosmetics',
    industry: 'Beauty & Skincare',
    platform: 'Shopify 2.0',
    timeframe: '10 Days Setup',
    summary: 'A clean skincare brand experienced severe discrepancies: GA4 was double-counting PayPal sales, while Meta reported 40% fewer purchases than Shopify.',
    before: {
      dataLoss: '38% Meta Underreporting & GA4 Payment loop duplicates',
      roas: '2.10x ROAS',
      trackingIssue: 'Payment gateway referral loops and unorganized dataLayer triggers',
      attributionScore: '5.1 / 10 GA4 Quality'
    },
    after: {
      eventMatchQuality: '9.1 / 10 Meta EMQ',
      roas: '3.85x ROAS (+83%)',
      revenueUplift: '1:1 GA4/Shopify Reconciliation',
      attributionScore: '99.8% Data Accuracy'
    },
    solutionDetails: [
      'Built a custom client-side dataLayer with server-side GTM proxy to capture post-checkout thank you page events without gateway reloads.',
      'Excluded PayPal and Stripe URLs from GA4 unwanted referral traffic.',
      'Calibrated Google Ads Enhanced Conversions for exact purchase values with custom profit margin signals.'
    ],
    clientQuote: {
      text: "For the first time in 3 years, our Shopify sales match our GA4 and ad dashboards dollar-for-dollar. We can finally make ad spend decisions with 100% certainty.",
      author: 'Sophia Chen',
      role: 'Founder & CMO, NaturaGlow'
    }
  }
];
