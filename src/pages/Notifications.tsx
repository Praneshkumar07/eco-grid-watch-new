import { Bell, BellOff, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockNotifications, NotificationItem } from '@/data/mockData';
import { cn } from '@/lib/utils';

const getSeverityColor = (type: NotificationItem['type']) => {
  switch (type) {
    case 'critical':
      return 'bg-danger/10 border-danger/20 text-danger';
    case 'warning':
      return 'bg-warning/10 border-warning/20 text-warning';
    case 'info':
      return 'bg-accent/10 border-accent/20 text-accent';
    default:
      return 'bg-muted/50';
  }
};

const getSeverityBadge = (type: NotificationItem['type']) => {
  switch (type) {
    case 'critical':
      return { label: 'Critical', variant: 'destructive' as const };
    case 'warning':
      return { label: 'Warning', variant: 'secondary' as const };
    case 'info':
      return { label: 'Info', variant: 'outline' as const };
    default:
      return { label: 'Unknown', variant: 'outline' as const };
  }
};

export default function Notifications() {
  const criticalCount = mockNotifications.filter(n => n.type === 'critical').length;
  const warningCount = mockNotifications.filter(n => n.type === 'warning').length;
  const infoCount = mockNotifications.filter(n => n.type === 'info').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">System alerts and updates</p>
          </div>
          <Bell className="h-6 w-6 text-primary" />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-danger/10 to-danger/5 border-danger/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-danger">{criticalCount}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{warningCount}</div>
              <div className="text-sm text-muted-foreground">Warning</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{infoCount}</div>
              <div className="text-sm text-muted-foreground">Info</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Alerts</h2>
          
          {mockNotifications.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <BellOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {mockNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={cn(
                    'shadow-card transition-all duration-200 hover:shadow-energy',
                    getSeverityColor(notification.type)
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl">{notification.icon}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <Badge variant={getSeverityBadge(notification.type).variant}>
                              {getSeverityBadge(notification.type).label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}