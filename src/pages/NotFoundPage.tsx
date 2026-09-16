import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { PageHeroBanner } from '../components/common/PageHeroBanner';
import { Compass, Home, Layers } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-16">
      <SEOHead
        title="404 - Node Not Located | InfosBrain"
        description="The requested page coordinate could not be located on the InfosBrain network."
      />

      <PageHeroBanner
        badge="ERROR PROTOCOL 404"
        badgeIcon={<Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />}
        title="Network Coordinate"
        highlightText="Not Found"
        description="The requested endpoint or resource is unavailable or has been relocated to another cluster on the InfosBrain global network architecture."
        image={{
          src: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
          alt: 'InfosBrain Cyberspace Coordinate Unresolved',
          tag: 'Protocol Status: 404 Disconnected',
          statPill: {
            value: '404',
            label: 'Route Missing',
            subtext: 'Safe Failover Engaged',
          },
        }}
        actions={
          <>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/')}
              icon={<Home className="w-4 h-4" />}
            >
              Return to Headquarters
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/services')}
              icon={<Layers className="w-4 h-4 text-cyan-400" />}
            >
              Explore All Services
            </Button>
          </>
        }
        keyPoints={[
          'Core Services Active',
          'Automatic DNS Verification',
          'Live 24/7 Node Monitoring',
        ]}
      />
    </div>
  );
};
