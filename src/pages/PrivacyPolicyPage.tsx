import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import { Shield, Mail, Lock } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Privacy Policy - InfosBrain"
        description="Privacy policy and data governance practices for InfosBrain digital agency."
      />

      {/* Hero Banner Section with Cyber Security & Compliance Imagery */}
      <PageHeroBanner
        badge="LEGAL & DATA GOVERNANCE"
        badgeIcon={<Shield className="w-3.5 h-3.5 text-cyan-400" />}
        title="Enterprise Privacy &"
        highlightText="Data Governance"
        description="How InfosBrain safeguards client information, proprietary trade data, and telemetry across our digital technology and growth engineering consulting practices."
        image={{
          src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Cyber Security and Data Governance Architecture',
          tag: 'SOC 2 & GDPR Protocols',
          statPill: {
            value: 'SOC 2 & GDPR',
            label: 'Data Integrity',
            subtext: 'Zero Unauthorized Data Retention',
          },
          secondaryPill: {
            text: '256-Bit SSL Encrypted',
            icon: <Lock className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        keyPoints={[
          'Strict Client NDA Compliance',
          'Zero Third-Party Data Resale',
          'Full Intellectual Property Isolation',
        ]}
      />

      <section className="py-12 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-sm leading-relaxed">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">1. Introduction & Scope</h2>
            <p>
              This Privacy Policy details how <strong>{siteConfig.brand.name}</strong> ("InfosBrain", "we", "us", or "our") collects, processes, and safeguards information when you visit our website, submit project inquiries, or engage our digital technology and marketing consulting services.
            </p>
            <p>
              We treat client information and proprietary business data with strict confidentiality. If you have questions regarding this policy, contact our data privacy officer at <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="text-cyan-300 underline font-mono">{siteConfig.contact.primaryEmail}</a>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">2. Information We Collect</h2>
            <p>We may collect personal and technical information when you interact with our platform:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Contact Information:</strong> Full name, professional email address, phone number, company name, and job title submitted via consultation forms.</li>
              <li><strong>Project Data:</strong> Technical briefs, existing domain URLs, ad spend budgets, and strategic objectives provided for estimation purposes.</li>
              <li><strong>Technical & Telemetry Data:</strong> IP address, browser type, operating system, referring URLs, and page session metrics recorded anonymously for Core Web Vitals optimization.</li>
            </ul>
          </div>

          <div id="cookies" className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">3. Cookies & Tracking Technologies</h2>
            <p>
              InfosBrain utilizes necessary, performance, and marketing cookies to enhance user navigation, measure traffic patterns, and refine our service offerings. You can adjust your cookie preferences at any time using our on-site cookie controls or via your browser settings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">4. How We Use Information</h2>
            <p>We process collected data exclusively for valid business purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>To evaluate project scopes and deliver technical proposals and architectural audits.</li>
              <li>To execute contractual client engagements across web engineering, SEO, and paid media management.</li>
              <li>To deliver requested newsletter dispatches and industry briefs (with instant unsubscribe options).</li>
              <li>To ensure cybersecurity, prevent fraudulent activity, and enforce contractual agreements.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">5. Data Security & Storage</h2>
            <p>
              We implement industry-standard encryption protocols (TLS/SSL), restricted role-based credential access, and continuous monitoring to guard your personal data against unauthorized disclosure or loss.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">6. Your Rights (GDPR & CCPA Alignment)</h2>
            <p>
              Depending on your jurisdiction, you have the right to request access to, correction of, or deletion of your personal data held by InfosBrain. To exercise these rights, submit a written request to <a href={`mailto:${siteConfig.contact.secondaryEmail}`} className="text-cyan-300 underline font-mono">{siteConfig.contact.secondaryEmail}</a>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/30 space-y-2">
            <h2 className="text-lg font-bold text-white font-display">7. Contact the Privacy Office</h2>
            <p className="text-slate-400">
              Official inquiries regarding data governance, privacy, and compliance:
            </p>
            <div className="pt-2 space-y-1 text-xs font-mono">
              <div>Email: <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="text-cyan-300 underline">{siteConfig.contact.primaryEmail}</a></div>
              <div>Operations: <a href={`mailto:${siteConfig.contact.secondaryEmail}`} className="text-cyan-300 underline">{siteConfig.contact.secondaryEmail}</a></div>
              <div className="text-slate-500">InfosBrain Agency • All Rights Reserved</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
