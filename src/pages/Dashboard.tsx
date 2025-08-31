import { Package, ShoppingCart, TrendingDown, DollarSign } from 'lucide-react';
import { VoiceRecorder } from '@/components/voice/VoiceRecorder';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Particles } from '@/components/ui/particles';
import heroImage from '@/assets/hero-pantry.jpg';

const Dashboard = () => {
  const handleTranscript = (text: string) => {
    console.log('Voice command:', text);
    // TODO: Process voice command through AI
  };

  return (
    <div className="min-h-screen animated-bg relative">
      <Particles />
      
      <div className="relative z-10 md:ml-64 p-6">
        {/* Hero Section */}
        <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SmartPantry
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Your AI-powered grocery management assistant. Speak your commands, 
              track your pantry, and find the best prices across all platforms.
            </p>
            
            {/* Voice Recorder */}
            <div className="flex justify-center mb-8">
              <VoiceRecorder onTranscript={handleTranscript} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Items in Pantry"
            value={42}
            description="3 items expiring soon"
            icon={Package}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Shopping List"
            value={8}
            description="Items to purchase"
            icon={ShoppingCart}
            trend={{ value: 5, isPositive: false }}
          />
          <StatsCard
            title="Potential Savings"
            value="₹245"
            description="vs highest prices"
            icon={TrendingDown}
            trend={{ value: 18, isPositive: true }}
          />
          <StatsCard
            title="Credits Remaining"
            value={10}
            description="Voice commands left"
            icon={DollarSign}
          />
        </div>

        {/* Recent Commands */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Voice Commands</h2>
          <div className="space-y-3">
            {[
              { command: "Add 2kg potatoes to shopping list", time: "2 minutes ago", status: "completed" },
              { command: "Update rice stock to half finished", time: "1 hour ago", status: "completed" },
              { command: "Show cheapest milk prices", time: "3 hours ago", status: "completed" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.command}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;