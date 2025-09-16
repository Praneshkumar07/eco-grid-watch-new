import { Battery, Zap, Home, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnergyCard } from '@/components/EnergyCard';
import { mockUserSettings } from '@/data/mockData';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/microgrid-hero.jpg';
import { useEnergyData } from '@/hooks/useEnergyData';

export default function Index() {
  const { energyData, loading, error } = useEnergyData();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!energyData) {
    return <div>No energy data available.</div>;
  }

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

      <div className="px-6 py-8 space-y-8 animate-in fade-in-50 duration-700">
        {/* Daily Summary Card */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-energy border-0 overflow-hidden relative animate-in slide-in-from-top-4 duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-6 w-6" />
              Today's Solar Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text">
              {energyData.generation} Wh
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-primary-foreground/90">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12% vs yesterday</span>
              </div>
              <div className="text-sm text-primary-foreground/80">
                Peak: 2.8 Wh
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-200">
          <EnergyCard
            title="Battery"
            value={energyData.storage}
            unit="Wh"
            icon={Battery}
            variant="storage"
            progress={energyData.batteryPercentage}
          />
          
          <EnergyCard
            title="Usage"
            value={Math.abs(energyData.generation-energyData.storage)}
            unit="Wh"
            icon={Home}
            variant="consumption"
            trend={{ value: -8, isPositive: false }}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <Link to="/monitoring">
              <Button variant="outline" className="w-full justify-start h-14 group hover:bg-energy-solar/10 hover:border-energy-solar/30 transition-all duration-300">
                <Zap className="mr-3 h-5 w-5 group-hover:text-energy-solar transition-colors" />
                <div className="text-left">
                  <div className="font-medium">Monitor Solar System</div>
                  <div className="text-sm text-muted-foreground">Real-time performance data</div>
                </div>
              </Button>
            </Link>
            
            <Link to="/statistics">
              <Button variant="outline" className="w-full justify-start h-14 group hover:bg-primary/5 hover:border-primary/30 transition-all duration-300">
                <TrendingUp className="mr-3 h-5 w-5 group-hover:text-primary transition-colors" />
                <div className="text-left">
                  <div className="font-medium">View Analytics</div>
                  <div className="text-sm text-muted-foreground">Historical data & trends</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
