import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EnergyCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  progress?: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'solar' | 'wind' | 'storage' | 'consumption';
}

const variantStyles = {
  default: 'bg-gradient-card',
  solar: 'bg-gradient-to-br from-energy-solar/10 to-energy-solar/5 border-energy-solar/20',
  wind: 'bg-gradient-to-br from-energy-wind/10 to-energy-wind/5 border-energy-wind/20',
  storage: 'bg-gradient-to-br from-energy-storage/10 to-energy-storage/5 border-energy-storage/20',
  consumption: 'bg-gradient-to-br from-energy-consumption/10 to-energy-consumption/5 border-energy-consumption/20',
};

const iconStyles = {
  default: 'text-primary',
  solar: 'text-energy-solar',
  wind: 'text-energy-wind',
  storage: 'text-energy-storage',
  consumption: 'text-energy-consumption',
};

export function EnergyCard({
  title,
  value,
  unit,
  icon: Icon,
  progress,
  trend,
  className,
  variant = 'default'
}: EnergyCardProps) {
  return (
    <Card className={cn('shadow-card hover:shadow-energy transition-all duration-300', variantStyles[variant], className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className={cn('h-5 w-5', iconStyles[variant])} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold">
              {typeof value === 'number' ? value.toFixed(1) : value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
          
          {progress !== undefined && (
            <div className="space-y-1">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {progress}% capacity
              </p>
            </div>
          )}
          
          {trend && (
            <div className="flex items-center text-xs">
              <span
                className={cn(
                  'font-medium',
                  trend.isPositive ? 'text-success' : 'text-danger'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-1 text-muted-foreground">vs yesterday</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}