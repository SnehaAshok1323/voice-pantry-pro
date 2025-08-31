import { Check, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Particles } from '@/components/ui/particles';

const mockShoppingList = [
  { id: 1, name: 'Milk', quantity: '2L', priority: 'high', reason: 'Low stock', price: '₹120' },
  { id: 2, name: 'Bread', quantity: '2 loaves', priority: 'medium', reason: 'Expires today', price: '₹60' },
  { id: 3, name: 'Tomatoes', quantity: '1kg', priority: 'high', reason: 'Low stock', price: '₹40' },
  { id: 4, name: 'Rice', quantity: '5kg', priority: 'medium', reason: 'Half finished', price: '₹300' },
  { id: 5, name: 'Potatoes', quantity: '2kg', priority: 'low', reason: 'Voice command', price: '₹60' }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const ShoppingList = () => {
  return (
    <div className="min-h-screen animated-bg relative">
      <Particles />
      
      <div className="relative z-10 md:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Shopping List</h1>
          <p className="text-muted-foreground">Items automatically added based on your pantry status</p>
        </div>

        {/* Summary Card */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">{mockShoppingList.length}</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">₹580</div>
              <div className="text-sm text-muted-foreground">Estimated Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">₹85</div>
              <div className="text-sm text-muted-foreground">Potential Savings</div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="w-full bg-primary hover:bg-primary/90 glow-primary">
              <Check className="w-4 h-4 mr-2" />
              Compare All Prices
            </Button>
          </div>
        </div>

        {/* Shopping List Items */}
        <div className="space-y-4">
          {mockShoppingList.map((item) => (
            <div key={item.id} className="glass-card rounded-xl p-4 hover-lift">
              <div className="flex items-center gap-4">
                <Checkbox />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <span className="text-lg font-bold text-accent">{item.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Qty: {item.quantity}</span>
                    <span className={`px-2 py-1 rounded-lg border text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority} priority
                    </span>
                    <span className="text-muted-foreground">• {item.reason}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Compare Prices
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Custom Item */}
        <div className="glass-card rounded-2xl p-6 mt-8">
          <div className="text-center">
            <Button variant="outline" className="border-dashed border-2">
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Item
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Or use voice command: "Add [item] to shopping list"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;