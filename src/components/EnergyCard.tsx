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
  variant?: 'default' | 'solar' | 'storage' | 'consumption';
}

const variantStyles = {
  default: 'bg-gradient-card',
  solar: 'bg-gradient-to-br from-energy-solar/10 to-energy-solar/5 border-energy-solar/20',
  storage: 'bg-gradient-to-br from-energy-storage/10 to-energy-storage/5 border-energy-storage/20',
  consumption: 'bg-gradient-to-br from-energy-consumption/10 to-energy-consumption/5 border-energy-consumption/20',
};

const iconStyles = {
  default: 'text-primary',
  solar: 'text-energy-solar',
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
    <Card className={cn(
      'shadow-card hover:shadow-energy transition-all duration-500 hover:scale-[1.02] border-0 overflow-hidden relative group', 
      variantStyles[variant], 
      className
    )}>
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-125 transition-transform duration-500"></div>
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className={cn('h-5 w-5 transition-all duration-300 group-hover:scale-110', iconStyles[variant])} />
        </div>
      </CardHeader>
      <CardContent className="pt-0 relative z-10">
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
            <div className="space-y-2">
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
                  'font-medium px-2 py-1 rounded-full text-xs',
                  trend.isPositive ? 'text-success bg-success/10' : 'text-danger bg-danger/10'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-2 text-muted-foreground">vs yesterday</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}