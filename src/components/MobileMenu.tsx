import React, { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ href: string; label: string; }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      
      <div 
        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl"
        role="menu"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-primary touch-manipulation"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="px-4 py-2">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="block py-4 text-lg text-gray-600 hover:text-primary transition-colors touch-manipulation"
              onClick={onClose}
              role="menuitem"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};