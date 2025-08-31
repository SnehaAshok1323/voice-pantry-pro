import { Link, useLocation } from 'react-router-dom';
import { 
  Mic, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  DollarSign,
  TrendingDown,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/inventory', icon: Package, label: 'Inventory' },
  { path: '/shopping-list', icon: ShoppingCart, label: 'Shopping List' },
  { path: '/price-comparison', icon: TrendingDown, label: 'Price Compare' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/pricing', icon: DollarSign, label: 'Credits' },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:left-0 md:bottom-auto md:w-64 md:h-screen">
      <div className="glass-card rounded-t-2xl md:rounded-none md:rounded-r-2xl p-4 md:p-6 m-2 md:m-4 md:ml-0">
        {/* Logo */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SmartPantry</h1>
              <p className="text-sm text-muted-foreground">AI Grocery Assistant</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex md:flex-col gap-2 justify-around md:justify-start overflow-x-auto md:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover-lift",
                  isActive
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="hidden md:block text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Credits Display */}
        <div className="hidden md:block mt-8 p-4 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Credits</span>
            <span className="text-lg font-bold text-accent">10</span>
          </div>
          <div className="w-full bg-secondary/30 rounded-full h-2">
            <div className="bg-gradient-to-r from-accent to-primary h-2 rounded-full" style={{ width: '70%' }} />
          </div>
        </div>
      </div>
    </nav>
  );
};