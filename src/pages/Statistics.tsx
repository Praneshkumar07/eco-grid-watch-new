import { useState } from 'react';
import { TrendingUp, Zap, Battery, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergyCard } from '@/components/EnergyCard';
import { generateChartData } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

type TimePeriod = 'day' | 'week' | 'month' | 'year';

export default function Statistics() {
  const [activePeriod, setActivePeriod] = useState<TimePeriod>('day');
  
  const periodButtons = [
    { key: 'day' as const, label: 'Day' },
    { key: 'week' as const, label: 'Week' },
    { key: 'month' as const, label: 'Month' },
    { key: 'year' as const, label: 'Year' },
  ];

  const chartData = generateChartData(activePeriod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Energy Statistics</h1>
          <p className="text-muted-foreground">Analyze your energy patterns</p>
        </div>

        {/* Period Toggle */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg overflow-x-auto">
          {periodButtons.map(({ key, label }) => (
            <Button
              key={key}
              variant={activePeriod === key ? "default" : "ghost"}
              className="flex-1 min-w-fit"
              onClick={() => setActivePeriod(key)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <EnergyCard
            title="Today's Energy"
            value={12.8}
            unit="kWh"
            icon={Zap}
            variant="solar"
            trend={{ value: 12, isPositive: true }}
          />
          
          <EnergyCard
            title="This Month"
            value={384}
            unit="kWh"
            icon={TrendingUp}
            variant="wind"
            trend={{ value: 8, isPositive: true }}
          />
          
          <EnergyCard
            title="Lifetime Generated"
            value="4,256"
            unit="kWh"
            icon={Sun}
            variant="default"
          />
          
          <EnergyCard
            title="Efficiency"
            value={92}
            unit="%"
            icon={Battery}
            variant="storage"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Generation vs Consumption Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Generation vs Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs fill-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-xs fill-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="generation" 
                    stroke="hsl(var(--energy-solar))" 
                    strokeWidth={3}
                    name="Generation"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="hsl(var(--energy-consumption))" 
                    strokeWidth={3}
                    name="Consumption"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Storage Usage Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Storage Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs fill-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-xs fill-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="storage" 
                    fill="hsl(var(--energy-storage))" 
                    name="Storage"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Solar vs Wind Comparison */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Energy Source Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-energy-solar/10 to-energy-solar/5 rounded-lg border border-energy-solar/20">
                <Sun className="h-8 w-8 text-energy-solar mx-auto mb-2" />
                <h3 className="font-semibold">Solar</h3>
                <p className="text-2xl font-bold">68%</p>
                <p className="text-sm text-muted-foreground">of total generation</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-energy-wind/10 to-energy-wind/5 rounded-lg border border-energy-wind/20">
                <TrendingUp className="h-8 w-8 text-energy-wind mx-auto mb-2" />
                <h3 className="font-semibold">Wind</h3>
                <p className="text-2xl font-bold">32%</p>
                <p className="text-sm text-muted-foreground">of total generation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}