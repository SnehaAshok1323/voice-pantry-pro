import { Check, Zap, CreditCard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Particles } from '@/components/ui/particles';

const pricingPlans = [
  {
    name: 'Starter Pack',
    credits: 10,
    price: 50,
    popular: false,
    features: [
      '10 Voice Commands',
      'Basic Price Comparison',
      'Inventory Tracking',
      'Shopping List Generation'
    ]
  },
  {
    name: 'Power User',
    credits: 25,
    price: 100,
    popular: true,
    features: [
      '25 Voice Commands',
      'Advanced Price Comparison',
      'Smart Expiry Alerts',
      'Detailed Analytics',
      'Priority Support'
    ]
  },
  {
    name: 'Pro Bundle',
    credits: 50,
    price: 180,
    popular: false,
    features: [
      '50 Voice Commands',
      'All Premium Features',
      'Custom Categories',
      'Export Reports',
      'API Access'
    ]
  }
];

const recentTransactions = [
  { id: 1, credits: 10, amount: 50, date: '2024-08-28', status: 'completed' },
  { id: 2, credits: 25, amount: 100, date: '2024-08-15', status: 'completed' },
  { id: 3, credits: 10, amount: 50, date: '2024-08-01', status: 'completed' }
];

const Pricing = () => {
  return (
    <div className="min-h-screen animated-bg relative">
      <Particles />
      
      <div className="relative z-10 md:ml-64 p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Purchase Credits</h1>
          <p className="text-muted-foreground">Each voice command uses 1 credit. Choose your plan below.</p>
        </div>

        {/* Current Balance */}
        <div className="glass-card rounded-2xl p-6 mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
            <div>
              <div className="text-3xl font-bold text-accent">10 Credits</div>
              <div className="text-sm text-muted-foreground">Current Balance</div>
            </div>
          </div>
          <div className="w-full bg-secondary/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-accent to-primary h-3 rounded-full transition-all duration-500" 
              style={{ width: '60%' }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Credits never expire • Use them for voice commands and AI processing
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`glass-card rounded-2xl p-6 hover-lift relative ${
                plan.popular ? 'ring-2 ring-accent glow-accent' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold text-accent">₹{plan.price}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  {plan.credits} Credits
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-accent hover:bg-accent/90 text-accent-foreground glow-accent' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Purchase Now
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-3">
                ₹{(plan.price / plan.credits).toFixed(1)} per credit
              </p>
            </div>
          ))}
        </div>

        {/* Payment Security */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Razorpay Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Instant Activation</span>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            All payments are processed securely through Razorpay. Credits are added instantly to your account.
          </p>
        </div>

        {/* Transaction History */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Recent Purchases</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {transaction.credits} Credits
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">₹{transaction.amount}</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;