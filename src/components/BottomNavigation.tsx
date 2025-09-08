import { Home, BarChart3, Bell, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Statistics', path: '/statistics', icon: BarChart3 },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-energy z-50">
      <div className="flex justify-around items-center py-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200',
                'hover:bg-secondary/50',
                isActive
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  size={24} 
                  className={cn(
                    'transition-all duration-200',
                    isActive && 'scale-110'
                  )}
                />
                <span className="text-xs mt-1">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}