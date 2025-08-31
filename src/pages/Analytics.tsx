import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Package, DollarSign, ShoppingCart } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Particles } from '@/components/ui/particles';

const inventoryData = [
  { month: 'Jan', items: 35 },
  { month: 'Feb', items: 42 },
  { month: 'Mar', items: 38 },
  { month: 'Apr', items: 45 },
  { month: 'May', items: 41 },
  { month: 'Jun', items: 48 }
];

const savingsData = [
  { platform: 'Amazon Fresh', savings: 245, orders: 12 },
  { platform: 'Zepto', savings: 180, orders: 8 },
  { platform: 'Blinkit', savings: 120, orders: 6 },
  { platform: 'Swiggy Instamart', savings: 95, orders: 4 }
];

const categoryData = [
  { name: 'Vegetables', value: 35, color: '#10b981' },
  { name: 'Dairy', value: 25, color: '#3b82f6' },
  { name: 'Grains', value: 20, color: '#f59e0b' },
  { name: 'Meat', value: 15, color: '#ef4444' },
  { name: 'Others', value: 5, color: '#8b5cf6' }
];

const spendingTrend = [
  { month: 'Jan', amount: 4500 },
  { month: 'Feb', amount: 3800 },
  { month: 'Mar', amount: 4200 },
  { month: 'Apr', amount: 3900 },
  { month: 'May', amount: 4100 },
  { month: 'Jun', amount: 3700 }
];

const Analytics = () => {
  return (
    <div className="min-h-screen animated-bg relative">
      <Particles />
      
      <div className="relative z-10 md:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your grocery management patterns and savings</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Savings"
            value="₹640"
            description="This month"
            icon={DollarSign}
            trend={{ value: 24, isPositive: true }}
          />
          <StatsCard
            title="Items Managed"
            value={48}
            description="In your pantry"
            icon={Package}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Orders Placed"
            value={30}
            description="Via price comparison"
            icon={ShoppingCart}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Avg Monthly Spend"
            value="₹3,950"
            description="Down from ₹4,200"
            icon={TrendingUp}
            trend={{ value: 6, isPositive: true }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Inventory Trend */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Inventory Levels Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="items" stroke="hsl(var(--accent))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Items by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Savings by Platform */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Savings by Platform</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="platform" 
                  stroke="#94a3b8" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="savings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Spending Trend */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-6">Monthly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`₹${value}`, 'Spending']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;