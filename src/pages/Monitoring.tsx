import { useState } from 'react';
import { Sun, Wind, Zap, Battery, Home, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergyCard } from '@/components/EnergyCard';
import { CircularGauge } from '@/components/CircularGauge';
import { WeatherWidget } from '@/components/WeatherWidget';
import { currentEnergyData } from '@/data/mockData';

type EnergySource = 'solar' | 'wind' | 'grid';

export default function Monitoring() {
  const [activeSource, setActiveSource] = useState<EnergySource>('solar');
  
  const sourceButtons = [
    { key: 'solar' as const, label: 'Solar', icon: Sun },
    { key: 'wind' as const, label: 'Wind', icon: Wind },
    { key: 'grid' as const, label: 'Grid', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Energy Monitoring</h1>
          <p className="text-muted-foreground">Real-time microgrid performance</p>
        </div>

        {/* Weather Widget */}
        <WeatherWidget
          temperature={currentEnergyData.temperature}
          condition={currentEnergyData.weatherCondition}
          sunlightHours={currentEnergyData.sunlightHours}
        />

        {/* Source Toggle */}
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          {sourceButtons.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={activeSource === key ? "default" : "ghost"}
              className="flex-1 gap-2"
              onClick={() => setActiveSource(key)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* Energy Cards */}
        <div className="grid grid-cols-2 gap-4">
          <EnergyCard
            title="Generated"
            value={currentEnergyData.generation}
            unit="kWh"
            icon={Zap}
            variant="solar"
            trend={{ value: 12, isPositive: true }}
          />
          
          <EnergyCard
            title="Stored Energy"
            value={currentEnergyData.storage}
            unit="kWh"
            icon={Battery}
            variant="storage"
            progress={currentEnergyData.batteryPercentage}
          />
          
          <EnergyCard
            title="Consumption"
            value={currentEnergyData.consumption}
            unit="kWh"
            icon={Home}
            variant="consumption"
            trend={{ value: -5, isPositive: false }}
          />
          
          <EnergyCard
            title="Exported"
            value={currentEnergyData.exported}
            unit="kWh"
            icon={TrendingUp}
            variant="wind"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Progress Indicators */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <CircularGauge
                  value={currentEnergyData.irradiation}
                  label="Irradiation"
                  color="solar"
                  size="md"
                />
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <CircularGauge
                  value={activeSource === 'solar' ? currentEnergyData.solarHealth : currentEnergyData.windHealth}
                  label={`${activeSource === 'solar' ? 'Solar' : 'Wind'} Health`}
                  color={activeSource === 'solar' ? 'solar' : 'wind'}
                  size="md"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Maintenance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-medium">System Healthy</span>
                </div>
                <span className="text-sm text-muted-foreground">Last check: 2h ago</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="font-medium">Panel Cleaning Due</span>
                </div>
                <Button variant="outline" size="sm">
                  Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}