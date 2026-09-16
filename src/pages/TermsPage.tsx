import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { SEOHead } from '../components/common/SEOHead';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import { FileText, Shield } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <SEOHead
        title="Terms & Conditions - InfosBrain"
        description="Standard contractual terms and conditions for InfosBrain digital technology and marketing agency services."
      />

      {/* Hero Banner Section with Enterprise Agreement Imagery */}
      <PageHeroBanner
        badge="TERMS OF ENGAGEMENT"
        badgeIcon={<FileText className="w-3.5 h-3.5 text-cyan-400" />}
        title="Contractual Terms &"
        highlightText="Master Agreement"
        description="Clear, transparent master service agreement principles governing custom code ownership, milestone deliverables, and intellectual property."
        image={{
          src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Master Services Agreement and Governance',
          tag: 'Master Services Agreement',
          statPill: {
            value: '100% IP',
            label: 'Client Ownership',
            subtext: 'Transferred Upon Milestone Completion',
          },
          secondaryPill: {
            text: 'Direct Account Custody',
            icon: <Shield className="w-3.5 h-3.5 text-cyan-400" />,
          },
        }}
        keyPoints={[
          '100% Client Codebase Ownership',
          'Transparent Milestone Billing',
          'Global Jurisdiction Standards',
        ]}
      />

      <section className="py-12 bg-[#070B1F] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-sm leading-relaxed">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">1. Agreement Overview</h2>
            <p>
              By accessing this website or entering into a Statement of Work (SOW) with <strong>{siteConfig.brand.name}</strong> ("InfosBrain"), you agree to be bound by these Terms and Conditions. These terms apply to all digital services, including web development, SEO consulting, performance advertising, and graphic design.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">2. Intellectual Property & Ownership</h2>
            <p>
              Upon final settlement of all milestone invoices outlined in an agreed Statement of Work:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Client Ownership:</strong> The client receives 100% full intellectual property ownership of custom codebases, design assets, and brand collateral produced specifically for their engagement.</li>
              <li><strong>Advertising Accounts:</strong> All ad accounts (Google Ads, Meta Business Manager) remain the direct property of the client; InfosBrain operates solely as an authorized agency manager.</li>
              <li><strong>Pre-Existing Frameworks:</strong> Open-source libraries and InfosBrain internal boilerplate utilities remain under their respective licenses.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">3. Project Milestones & Payments</h2>
            <p>
              Project engagements proceed according to scheduled sprints and milestone sign-offs. Revisions within agreed SOW scopes are executed during designated review periods. Supplementary feature requests outside initial specifications will be quoted via formal change orders.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h2 className="text-lg font-bold text-white font-display">4. Limitation of Liability</h2>
            <p>
              While InfosBrain deploys elite engineering and optimization protocols, search engine ranking algorithms and third-party advertising platform policies are subject to unilateral changes by external providers (such as Google or Meta). InfosBrain is not liable for indirect or consequential damages beyond the contract fees paid for the specific service phase.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/30 space-y-2">
            <h2 className="text-lg font-bold text-white font-display">5. Legal Notice & Inquiries</h2>
            <p className="text-slate-400">
              For contractual inquiries, master service agreements, or vendor registration:
            </p>
            <div className="pt-2 space-y-1 text-xs font-mono">
              <div>Legal: <a href={`mailto:${siteConfig.contact.secondaryEmail}`} className="text-cyan-300 underline">{siteConfig.contact.secondaryEmail}</a></div>
              <div>General: <a href={`mailto:${siteConfig.contact.primaryEmail}`} className="text-cyan-300 underline">{siteConfig.contact.primaryEmail}</a></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
