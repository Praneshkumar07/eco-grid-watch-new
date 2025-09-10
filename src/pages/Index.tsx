import { Battery, Zap, Home, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnergyCard } from '@/components/EnergyCard';
import { currentEnergyData, mockUserSettings } from '@/data/mockData';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/microgrid-hero.jpg';

export default function Index() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Solar microgrid system" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
          <h1 className="text-3xl font-bold mb-2">
            {greeting}, {mockUserSettings.name}
          </h1>
          <p className="text-white/90">{currentDate}</p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Daily Summary Card */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-energy">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Today's Energy Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {currentEnergyData.generation} kWh
            </div>
            <div className="flex items-center text-primary-foreground/90">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+12% vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <EnergyCard
            title="Generation"
            value={currentEnergyData.generation}
            unit="kWh"
            icon={Zap}
            variant="solar"
            trend={{ value: 12, isPositive: true }}
          />
          
          <EnergyCard
            title="Storage"
            value={currentEnergyData.storage}
            unit="kWh"
            icon={Battery}
            variant="storage"
            progress={currentEnergyData.batteryPercentage}
          />
          
          <EnergyCard
            title="Usage"
            value={currentEnergyData.consumption}
            unit="kWh"
            icon={Home}
            variant="consumption"
            trend={{ value: -8, isPositive: false }}
          />
          
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link to="/monitoring">
              <Button variant="outline" className="w-full justify-start h-12">
                <Zap className="mr-3 h-5 w-5" />
                Monitor Solar
              </Button>
            </Link>
            
            <Link to="/statistics">
              <Button variant="outline" className="w-full justify-start h-12">
                <TrendingUp className="mr-3 h-5 w-5" />
                View Statistics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}