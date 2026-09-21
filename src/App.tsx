import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingContactCTA } from './components/common/FloatingContactCTA';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { CookieConsent } from './components/common/CookieConsent';
import { StickyMobileNav } from './components/common/StickyMobileNav';
import { ConsultationModal } from './components/common/ConsultationModal';
import { VideoModal } from './components/common/VideoModal';
import { AIAssistantModal } from './components/common/AIAssistantModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AISolutionsHubPage } from './pages/AISolutionsHubPage';
import { AISolutionDetailPage } from './pages/AISolutionDetailPage';

// Admin CMS Application
import { AdminApp } from './admin/AdminApp';

interface PageContentProps {
  onOpenConsultation: () => void;
  onOpenVideoModal: (title?: string, videoUrl?: string) => void;
  onOpenChatbot: () => void;
}

const PageContent: React.FC<PageContentProps> = ({
  onOpenConsultation,
  onOpenVideoModal,
  onOpenChatbot,
}) => {
  const { currentPath } = useRouter();

  // Normalize path by stripping query params and trailing slashes (except root)
  const cleanPath = currentPath.split('?')[0].replace(/\/$/, '') || '/';

  // Handle individual service detail routes: /services/:slug
  if (cleanPath.startsWith('/services/') && cleanPath.length > '/services/'.length) {
    const slug = cleanPath.replace('/services/', '');
    return <ServiceDetailPage slug={slug} />;
  }

  // Handle individual AI solution detail routes: /ai-solutions/:slug
  if (cleanPath.startsWith('/ai-solutions/') && cleanPath.length > '/ai-solutions/'.length) {
    const slug = cleanPath.replace('/ai-solutions/', '');
    return <AISolutionDetailPage slug={slug} />;
  }

  // Handle individual blog/insights article routes: /blog/:slug or /insights/:slug
  if (cleanPath.startsWith('/blog/') && cleanPath.length > '/blog/'.length) {
    const slug = cleanPath.replace('/blog/', '');
    return <BlogArticlePage slug={slug} />;
  }
  if (cleanPath.startsWith('/insights/') && cleanPath.length > '/insights/'.length) {
    const slug = cleanPath.replace('/insights/', '');
    return <BlogArticlePage slug={slug} />;
  }

  switch (cleanPath) {
    case '/':
      return (
        <HomePage
          onOpenConsultation={onOpenConsultation}
          onOpenVideoModal={onOpenVideoModal}
          onOpenChatbot={onOpenChatbot}
        />
      );
    case '/about':
      return <AboutPage />;
    case '/services':
      return <ServicesHubPage />;
    case '/ai-solutions':
    case '/ai':
    case '/solutions':
      return <AISolutionsHubPage />;
    case '/industries':
      return <IndustriesPage />;
    case '/case-studies':
    case '/work':
    case '/portfolio':
      return <CaseStudiesPage />;
    case '/blog':
    case '/insights':
      return <BlogPage />;
    case '/careers':
      return <CareersPage />;
    case '/contact':
      return <ContactPage />;
    case '/privacy-policy':
      return <PrivacyPolicyPage />;
    case '/terms':
      return <TermsPage />;
    default:
      return <NotFoundPage />;
  }
};

const AppShell: React.FC = () => {
  const { currentPath } = useRouter();
  const cleanPath = currentPath.split('?')[0].replace(/\/$/, '') || '/';

  // If visiting Admin Panel, render AdminApp exclusively
  if (cleanPath.startsWith('/admin')) {
    return <AdminApp />;
  }

  // Public website state and layout
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoModalData, setVideoModalData] = useState<{ title?: string; videoUrl?: string }>({});
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleOpenConsultation = () => setIsConsultationOpen(true);
  const handleOpenVideo = (title?: string, videoUrl?: string) => {
    setVideoModalData({ title, videoUrl });
    setIsVideoOpen(true);
  };
  const handleOpenChatbot = () => setIsChatbotOpen(true);

  return (
    <div className="min-h-screen bg-[#071A35] text-slate-100 flex flex-col font-sans selection:bg-[#0078FF] selection:text-white transition-colors duration-250 pb-16 md:pb-0">
      <Navbar onOpenConsultation={handleOpenConsultation} />
      <div className="flex-grow">
        <PageContent
          onOpenConsultation={handleOpenConsultation}
          onOpenVideoModal={handleOpenVideo}
          onOpenChatbot={handleOpenChatbot}
        />
      </div>
      <Footer />

      {/* Floating Overlays */}
      <FloatingWhatsApp />
      <FloatingContactCTA onOpenChatbot={handleOpenChatbot} />
      <CookieConsent />

      {/* Sticky Mobile Navigation */}
      <StickyMobileNav />

      {/* Global Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={videoModalData.title}
        videoUrl={videoModalData.videoUrl}
      />
      <AIAssistantModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onOpenConsultation={handleOpenConsultation}
      />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}

