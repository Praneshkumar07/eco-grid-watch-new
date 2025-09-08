export interface EnergyData {
  generation: number;
  storage: number;
  consumption: number;
  exported: number;
  batteryPercentage: number;
  solarHealth: number;
  windHealth: number;
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
  consumption: number;
  storage: number;
}

// Mock current energy data
export const currentEnergyData: EnergyData = {
  generation: 12.8,
  storage: 18.5,
  consumption: 8.2,
  exported: 4.6,
  batteryPercentage: 78,
  solarHealth: 92,
  windHealth: 85,
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
  
  switch (period) {
    case 'week':
      points = 7;
      timeUnit = 'day';
      break;
    case 'month':
      points = 30;
      timeUnit = 'day';
      break;
    case 'year':
      points = 12;
      timeUnit = 'month';
      break;
  }

  for (let i = 0; i < points; i++) {
    baseData.push({
      time: `${i + 1}${timeUnit === 'hour' ? ':00' : timeUnit === 'day' ? ' Day' : ' Month'}`,
      generation: Math.random() * 15 + 5,
      consumption: Math.random() * 10 + 3,
      storage: Math.random() * 20 + 10,
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
  maxConsumption: 15,
  darkMode: false,
  language: 'English'
};

// Mock weather location
export const mockLocation = {
  city: 'San Francisco',
  region: 'CA',
  country: 'USA'
};