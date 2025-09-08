import { Card, CardContent } from '@/components/ui/card';
import { Sun, Cloud, CloudRain, Thermometer, Clock } from 'lucide-react';
import { mockLocation } from '@/data/mockData';

interface WeatherWidgetProps {
  temperature: number;
  condition: string;
  sunlightHours: number;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return Sun;
    case 'cloudy':
      return Cloud;
    case 'rainy':
      return CloudRain;
    default:
      return Sun;
  }
};

export function WeatherWidget({ temperature, condition, sunlightHours }: WeatherWidgetProps) {
  const WeatherIcon = getWeatherIcon(condition);

  return (
    <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground">
              {mockLocation.city}, {mockLocation.region}
            </h3>
            <p className="text-2xl font-bold">{temperature}°C</p>
          </div>
          <WeatherIcon className="h-8 w-8 text-accent" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-accent rounded-full mr-2" />
            <span className="text-muted-foreground">{condition}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="h-3 w-3 text-accent mr-2" />
            <span className="text-muted-foreground">
              {sunlightHours}h sunlight
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}