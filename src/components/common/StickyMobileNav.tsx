import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Home, Layers, Bot, Globe2, PhoneCall } from 'lucide-react';

export const StickyMobileNav: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Services', icon: Layers, path: '/services' },
    { label: 'AI Tools', icon: Bot, path: '/ai-solutions' },
    { label: 'Global', icon: Globe2, path: '/#global' },
    { label: 'Contact', icon: PhoneCall, path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '');
      if (currentPath !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav
      aria-label="Sticky mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071A35]/95 backdrop-blur-xl border-t border-[#0078FF]/20 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? currentPath === '/'
              : item.path.startsWith('/#')
              ? false
              : currentPath.startsWith(item.path);

          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#0078FF] font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-[#0078FF]/15 text-[#0078FF]' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
