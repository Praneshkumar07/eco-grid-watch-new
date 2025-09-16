export interface EnergyData {
  generation: number;
  storage: number;
  usage: number;
  batteryPercentage: number;
  solarHealth: number;
  irradiation: number;
  temperature: number;
  weatherCondition: string;
  sunlightHours: number;
}

export interface NotificationItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  icon: string;
}

export interface ChartDataPoint {
  time: string;
  generation: number;
  usage: number;
  storage: number;
}

// Mock current energy data
export const currentEnergyData: EnergyData = {
  generation: 13.8,
  storage: 18.5,
  usage: 8.2,
  batteryPercentage: 78,
  solarHealth: 92,
  irradiation: 85,
  temperature: 24,
  weatherCondition: 'Sunny',
  sunlightHours: 8.2,
};

// Mock notifications
export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Solar Panel Cleaning Due',
    message: 'Panel efficiency has dropped to 92%. Schedule cleaning soon.',
    timestamp: '2 hours ago',
    icon: '🌞'
  },
  {
    id: '2',
    type: 'info',
    title: 'Peak Generation Hour',
    message: 'Solar panels are generating maximum power.',
    timestamp: '4 hours ago',
    icon: '⚡'
  },
  {
    id: '3',
    type: 'critical',
    title: 'Low Battery Warning',
    message: 'Battery level has dropped below 20%.',
    timestamp: '1 day ago',
    icon: '🔋'
  }
];

// Mock chart data for different time periods
export const generateChartData = (period: 'day' | 'week' | 'month' | 'year'): ChartDataPoint[] => {
  const baseData = [];
  let points = 24;
  let timeUnit = 'hour';
  let generationBase = 12;
  let usageBase = 8;
  let storageBase = 15;
  
  switch (period) {
    case 'week':
      points = 7;
      timeUnit = 'day';
      generationBase = 180; // Weekly totals
      usageBase = 120;
      storageBase = 200;
      break;
    case 'month':
      points = 30;
      timeUnit = 'day';
      generationBase = 25; // Daily averages for month
      usageBase = 18;
      storageBase = 35;
      break;
    case 'year':
      points = 12;
      timeUnit = 'month';
      generationBase = 750; // Monthly totals for year
      usageBase = 540;
      storageBase = 950;
      break;
  }

  for (let i = 0; i < points; i++) {
    // Add seasonal variation for yearly data
    let seasonalMultiplier = 1;
    if (period === 'year') {
      // Higher generation in summer months (April-September in India)
      seasonalMultiplier = (i >= 3 && i <= 8) ? 1.3 + (Math.sin((i - 3) * Math.PI / 6) * 0.4) : 0.7 + (Math.random() * 0.3);
    }
    
    // Add weekly pattern for daily data
    let weekdayMultiplier = 1;
    if (period === 'day') {
      // Peak hours pattern for solar generation
      weekdayMultiplier = i >= 6 && i <= 18 ? 1.2 + (Math.sin((i - 6) * Math.PI / 12) * 0.8) : 0.1 + (Math.random() * 0.2);
    }
    
    const multiplier = seasonalMultiplier * weekdayMultiplier;
    
    baseData.push({
      time: `${i + 1}${timeUnit === 'hour' ? ':00' : timeUnit === 'day' ? ' Day' : ' Month'}`,
      generation: Math.max(0, (Math.random() * generationBase + generationBase * 0.5) * multiplier),
      usage: Math.max(1, Math.random() * usageBase + usageBase * 0.7),
      storage: Math.max(5, Math.random() * storageBase + storageBase * 0.6),
    });
  }
  
  return baseData;
};

// Mock user settings
export const mockUserSettings = {
  name: 'Alex Johnson',
  role: 'Operator',
  lowStorageAlert: 20,
  minSolarHealth: 85,
  maxusage: 15,
  darkMode: false,
  language: 'English'
};

// Mock weather location
export const mockLocation = {
  city: 'Ramapur',
  region: 'Odisha',
  country: 'India'
};

// Mock energy data for solar
export const getEnergyDataBySource = (source: 'solar') => {
  const baseData = { ...currentEnergyData };
  
  return {
    ...baseData,
    generation: 15.2,
    storage: 22.8,
    usage: 9.1,
    batteryPercentage: 85,
    solarHealth: 94,
    irradiation: 92,
    temperature: 32,
    weatherCondition: 'Sunny',
    sunlightHours: 9.8,
  };
};