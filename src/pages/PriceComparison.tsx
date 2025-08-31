import { TrendingDown, ExternalLink, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Particles } from '@/components/ui/particles';

const mockPriceData = [
  {
    id: 1,
    name: 'Milk (1L)',
    prices: [
      { platform: 'Blinkit', price: 65, delivery: 15, total: 80, available: true },
      { platform: 'Zepto', price: 60, delivery: 10, total: 70, available: true },
      { platform: 'Amazon Fresh', price: 62, delivery: 0, total: 62, available: true },
      { platform: 'Swiggy Instamart', price: 68, delivery: 20, total: 88, available: false }
    ]
  },
  {
    id: 2,
    name: 'Bread (1 loaf)',
    prices: [
      { platform: 'Blinkit', price: 35, delivery: 15, total: 50, available: true },
      { platform: 'Zepto', price: 30, delivery: 10, total: 40, available: true },
      { platform: 'Amazon Fresh', price: 32, delivery: 0, total: 32, available: true },
      { platform: 'Swiggy Instamart', price: 38, delivery: 20, total: 58, available: true }
    ]
  }
];

const PriceComparison = () => {
  return (
    <div className="min-h-screen animated-bg relative">
      <Particles />
      
      <div className="relative z-10 md:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Price Comparison</h1>
          <p className="text-muted-foreground">Find the best deals across all grocery platforms</p>
        </div>

        {/* Savings Summary */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <TrendingDown className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-400 mb-1">₹245</div>
              <div className="text-sm text-muted-foreground">Total Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">18%</div>
              <div className="text-sm text-muted-foreground">Average Discount</div>
            </div>
            <div className="text-center">
              <Crown className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-sm font-semibold text-accent mb-1">Amazon Fresh</div>
              <div className="text-sm text-muted-foreground">Best Overall</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">₹12</div>
              <div className="text-sm text-muted-foreground">Avg per Item Saved</div>
            </div>
          </div>
        </div>

        {/* Price Comparison Cards */}
        <div className="space-y-6">
          {mockPriceData.map((item) => {
            const cheapest = item.prices
              .filter(p => p.available)
              .reduce((min, p) => p.total < min.total ? p : min);
            
            return (
              <div key={item.id} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Save up to ₹{Math.max(...item.prices.map(p => p.total)) - cheapest.total}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {item.prices.map((platform) => (
                    <div 
                      key={platform.platform}
                      className={`p-4 rounded-xl border transition-all hover-lift ${
                        platform.platform === cheapest.platform && platform.available
                          ? 'bg-green-500/10 border-green-500/30 glow-accent' 
                          : 'bg-secondary/30 border-border/50'
                      } ${!platform.available ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-foreground">{platform.platform}</h4>
                        {platform.platform === cheapest.platform && platform.available && (
                          <Crown className="w-4 h-4 text-accent" />
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Product:</span>
                          <span className="text-foreground">₹{platform.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery:</span>
                          <span className="text-foreground">₹{platform.delivery}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t border-border/30 pt-2">
                          <span className="text-foreground">Total:</span>
                          <span className="text-accent">₹{platform.total}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        disabled={!platform.available}
                      >
                        {platform.available ? (
                          <>
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Order Now
                          </>
                        ) : (
                          'Out of Stock'
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Auto-Update Notice */}
        <div className="glass-card rounded-2xl p-6 mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Prices updated every 30 minutes • Last update: 5 minutes ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceComparison;