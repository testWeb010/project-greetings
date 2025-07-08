import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Activity, 
  Users, 
  MessageCircle,
  Eye,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'mainAdmin' | 'employeeAdmin';
  avatar: string;
  permissions: string[];
  lastActive: string;
}

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  actor: {
    id: string;
    name: string;
    role: 'mainAdmin' | 'employeeAdmin';
    avatar: string;
  };
  target?: {
    type: 'user' | 'property' | 'chat' | 'employee' | 'system';
    id: string;
    name: string;
  };
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

interface ActivityLogsProps {
  currentAdmin: AdminUser;
}

const ActivityLogs: React.FC<ActivityLogsProps> = ({ currentAdmin }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterActor, setFilterActor] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  // Only main admin can access this component
  if (currentAdmin.role !== 'mainAdmin') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">Only main administrators can access activity logs.</p>
        </div>
      </div>
    );
  }

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      action: 'user.ban',
      description: 'Banned user for violating terms of service',
      actor: {
        id: '2',
        name: 'Sarah Johnson',
        role: 'employeeAdmin',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      },
      target: {
        type: 'user',
        id: '123',
        name: 'John Smith'
      },
      timestamp: '2024-01-20T14:30:00Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'high',
      metadata: {
        reason: 'Spam messages',
        duration: '7 days'
      }
    },
    {
      id: '2',
      action: 'property.approve',
      description: 'Approved property listing after verification',
      actor: {
        id: '3',
        name: 'Mike Chen',
        role: 'employeeAdmin',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      target: {
        type: 'property',
        id: '456',
        name: 'Modern PG in Koramangala'
      },
      timestamp: '2024-01-20T13:15:00Z',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      severity: 'medium'
    },
    {
      id: '3',
      action: 'employee.create',
      description: 'Created new employee admin account',
      actor: {
        id: '1',
        name: 'John Doe',
        role: 'mainAdmin',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
      },
      target: {
        type: 'employee',
        id: '789',
        name: 'Lisa Rodriguez'
      },
      timestamp: '2024-01-20T12:00:00Z',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'critical',
      metadata: {
        permissions: ['users.read', 'chats.moderate'],
        department: 'Chat Moderation'
      }
    },
    {
      id: '4',
      action: 'chat.flag',
      description: 'Flagged chat conversation for inappropriate content',
      actor: {
        id: '4',
        name: 'Lisa Rodriguez',
        role: 'employeeAdmin',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg'
      },
      target: {
        type: 'chat',
        id: '321',
        name: 'Chat between Priya and Rajesh'
      },
      timestamp: '2024-01-20T11:45:00Z',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
      status: 'success',
      severity: 'medium',
      metadata: {
        reason: 'Inappropriate language',
        autoFlag: false
      }
    },
    {
      id: '5',
      action: 'system.backup',
      description: 'Automated system backup completed',
      actor: {
        id: 'system',
        name: 'System',
        role: 'mainAdmin',
        avatar: ''
      },
      timestamp: '2024-01-20T03:00:00Z',
      ipAddress: 'internal',
      userAgent: 'System/1.0',
      status: 'success',
      severity: 'low'
    },
    {
      id: '6',
      action: 'property.delete',
      description: 'Attempted to delete property but failed due to active bookings',
      actor: {
        id: '2',
        name: 'Sarah Johnson',
        role: 'employeeAdmin',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      },
      target: {
        type: 'property',
        id: '654',
        name: 'Shared Room in Hauz Khas'
      },
      timestamp: '2024-01-19T16:20:00Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'failed',
      severity: 'medium',
      metadata: {
        error: 'Property has active bookings',
        activeBookings: 3
      }
    }
  ];

  const getActionIcon = (action: string) => {
    const iconMap: Record<string, React.ElementType> = {
      'user.ban': Ban,
      'user.create': UserCheck,
      'user.edit': Edit,
      'user.delete': Trash2,
      'property.approve': CheckCircle,
      'property.reject': AlertTriangle,
      'property.delete': Trash2,
      'property.edit': Edit,
      'employee.create': Plus,
      'employee.edit': Edit,
      'employee.delete': Trash2,
      'chat.flag': AlertTriangle,
      'chat.moderate': MessageCircle,
      'system.backup': Settings,
      'system.update': Settings
    };
    return iconMap[action] || Activity;
  };

  const getActionColor = (action: string) => {
    const colorMap: Record<string, string> = {
      'user.ban': 'text-red-600',
      'user.create': 'text-green-600',
      'user.edit': 'text-blue-600',
      'user.delete': 'text-red-600',
      'property.approve': 'text-green-600',
      'property.reject': 'text-red-600',
      'property.delete': 'text-red-600',
      'property.edit': 'text-blue-600',
      'employee.create': 'text-green-600',
      'employee.edit': 'text-blue-600',
      'employee.delete': 'text-red-600',
      'chat.flag': 'text-yellow-600',
      'chat.moderate': 'text-purple-600',
      'system.backup': 'text-gray-600',
      'system.update': 'text-blue-600'
    };
    return colorMap[action] || 'text-gray-600';
  };

  const getSeverityBadge = (severity: string) => {
    const badges = {
      low: { color: 'bg-gray-100 text-gray-800', label: 'Low' },
      medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
      high: { color: 'bg-orange-100 text-orange-800', label: 'High' },
      critical: { color: 'bg-red-100 text-red-800', label: 'Critical' }
    };
    return badges[severity as keyof typeof badges] || badges.low;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      success: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      failed: { color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock }
    };
    return badges[status as keyof typeof badges] || badges.success;
  };

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (log.target?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action.startsWith(filterAction);
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesActor = filterActor === 'all' || log.actor.role === filterActor;
    
    return matchesSearch && matchesAction && matchesSeverity && matchesActor;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor all admin activities and system events
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Activities</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{activityLogs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Actions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {activityLogs.filter(log => log.severity === 'critical').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed Actions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {activityLogs.filter(log => log.status === 'failed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Admins</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {new Set(activityLogs.map(log => log.actor.id)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
            />
          </div>
          
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Actions</option>
            <option value="user">User Actions</option>
            <option value="property">Property Actions</option>
            <option value="employee">Employee Actions</option>
            <option value="chat">Chat Actions</option>
            <option value="system">System Actions</option>
          </select>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={filterActor}
            onChange={(e) => setFilterActor(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Actors</option>
            <option value="mainAdmin">Main Admin</option>
            <option value="employeeAdmin">Employee Admin</option>
          </select>

          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Activity Timeline ({filteredLogs.length} entries)
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {filteredLogs.map((log) => {
              const ActionIcon = getActionIcon(log.action);
              const actionColor = getActionColor(log.action);
              const severityBadge = getSeverityBadge(log.severity);
              const statusBadge = getStatusBadge(log.status);
              
              return (
                <div key={log.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center ${actionColor}`}>
                    <ActionIcon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {log.description}
                          </p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${severityBadge.color}`}>
                            {severityBadge.label}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            <statusBadge.icon className="h-3 w-3 mr-1" />
                            {log.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{log.actor.name} ({log.actor.role})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimestamp(log.timestamp)}</span>
                          </div>
                          {log.target && (
                            <div className="flex items-center space-x-1">
                              <span>Target: {log.target.name}</span>
                            </div>
                          )}
                        </div>
                        
                        {log.metadata && (
                          <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Details:</p>
                            <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                              {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing 1 to {filteredLogs.length} of {activityLogs.length} activities
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
