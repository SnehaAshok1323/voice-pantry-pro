import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  TrendingUp, 
  CreditCard,
  Menu,
  X,
  LogOut,
  User,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Shopping List', href: '/shopping-list', icon: ShoppingCart },
  { name: 'Price Compare', href: '/price-comparison', icon: TrendingUp },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Credits', href: '/pricing', icon: CreditCard },
];

export const Navigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  // Don't show navigation on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  // Don't show navigation if not authenticated
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setSidebarOpen(true)}
          size="sm"
          className="glass-card"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-0
      `}>
        <div className="flex h-full flex-col glass-card border-r border-border/30 backdrop-blur-xl">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-foreground">SmartPantry</h1>
            </div>
            <Button
              onClick={() => setSidebarOpen(false)}
              size="sm"
              variant="ghost"
              className="md:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User info & Credits */}
          <div className="px-6 py-4 border-b border-border/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {profile?.name || user?.email}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground">Credits</span>
              </div>
              <span className="text-lg font-bold text-accent">
                25
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-primary text-primary-foreground glow-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sign out */}
          <div className="px-6 py-4 border-t border-border/30">
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};