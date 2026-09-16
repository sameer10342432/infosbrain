import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ThemeProvider } from './context/ThemeContext';
import { TranslationProvider } from './context/TranslationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingContactCTA } from './components/common/FloatingContactCTA';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { AutoTranslateNotification } from './components/common/AutoTranslateNotification';
import { CookieConsent } from './components/common/CookieConsent';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { BlogPage } from './pages/BlogPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AISolutionsHubPage } from './pages/AISolutionsHubPage';
import { AISolutionDetailPage } from './pages/AISolutionDetailPage';

const PageContent: React.FC = () => {
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

  switch (cleanPath) {
    case '/':
      return <HomePage />;
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

export default function App() {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <RouterProvider>
          <div className="min-h-screen bg-[#050816] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-250">
            <Navbar />
            <div className="flex-grow">
              <PageContent />
            </div>
            <Footer />
            <FloatingWhatsApp />
            <FloatingContactCTA />
            <AutoTranslateNotification />
            <CookieConsent />
          </div>
        </RouterProvider>
      </TranslationProvider>
    </ThemeProvider>
  );
}
