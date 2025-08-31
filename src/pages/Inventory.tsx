import { Search, Plus, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Particles } from '@/components/ui/particles';

const mockInventory = [
  { id: 1, name: 'Basmati Rice', quantity: '2.5kg', stock: 'half', expires: '2024-12-15', category: 'grains' },
  { id: 2, name: 'Milk', quantity: '1L', stock: 'low', expires: '2024-09-05', category: 'dairy' },
  { id: 3, name: 'Potatoes', quantity: '3kg', stock: 'good', expires: '2024-09-20', category: 'vegetables' },
  { id: 4, name: 'Onions', quantity: '2kg', stock: 'good', expires: '2024-09-25', category: 'vegetables' },
  { id: 5, name: 'Tomatoes', quantity: '1kg', stock: 'low', expires: '2024-09-03', category: 'vegetables' },
  { id: 6, name: 'Bread', quantity: '1 loaf', stock: 'good', expires: '2024-09-02', category: 'bakery' }
];

const getStockColor = (stock: string) => {
  switch (stock) {
    case 'low': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'half': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'good': return 'bg-green-500/20 text-green-400 border-green-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const Inventory = () => {
  return (
    <div className="min-h-screen animated-bg relative">
      <Particles />
      
      <div className="relative z-10 md:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pantry Inventory</h1>
          <p className="text-muted-foreground">Manage your grocery stock levels and expiry dates</p>
        </div>

        {/* Search and Add */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search inventory..." 
                className="pl-10 bg-background/50 border-border/50" 
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 glow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockInventory.map((item) => {
            const isExpiringSoon = new Date(item.expires) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
            
            return (
              <div key={item.id} className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                  </div>
                  {isExpiringSoon && (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <span className="text-sm font-medium text-foreground">{item.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stock Level</span>
                    <Badge className={getStockColor(item.stock)}>
                      {item.stock}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Expires</span>
                    <span className={`text-sm font-medium ${isExpiringSoon ? 'text-yellow-400' : 'text-foreground'}`}>
                      {new Date(item.expires).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/30">
                  <Button variant="outline" size="sm" className="w-full">
                    Update Stock
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inventory;