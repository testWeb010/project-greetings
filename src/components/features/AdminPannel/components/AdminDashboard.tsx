import React, { useState } from 'react';
import { 
  Users, 
  Building, 
  MessageCircle, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  MapPin,
  RefreshCw
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

interface AdminDashboardProps {
  currentAdmin: AdminUser;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentAdmin }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    {
      title: 'Total Users',
      value: '12,543',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Properties',
      value: '8,921',
      change: '+8.2%',
      trend: 'up',
      icon: Building,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Chats',
      value: '45,678',
      change: '+15.3%',
      trend: 'up',
      icon: MessageCircle,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Revenue',
      value: '₹2.4M',
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'user_registration',
      message: 'New user registered: Priya Sharma',
      time: '2 minutes ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'property_listed',
      message: 'New property listed in Bangalore',
      time: '5 minutes ago',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'chat_started',
      message: 'Chat initiated between user and owner',
      time: '8 minutes ago',
      icon: MessageCircle,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'property_verified',
      message: 'Property verification completed',
      time: '12 minutes ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: '5',
      type: 'issue_reported',
      message: 'User reported an issue with property',
      time: '15 minutes ago',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  const topCities = [
    { name: 'Bangalore', properties: 2543, growth: '+12%' },
    { name: 'Mumbai', properties: 1987, growth: '+8%' },
    { name: 'Delhi', properties: 1654, growth: '+15%' },
    { name: 'Pune', properties: 1234, growth: '+6%' },
    { name: 'Hyderabad', properties: 987, growth: '+18%' }
  ];

  const pendingApprovals = [
    {
      id: '1',
      type: 'Property Listing',
      title: 'Modern PG in Koramangala',
      submittedBy: 'Rajesh Kumar',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: '2',
      type: 'User Verification',
      title: 'Student ID Verification',
      submittedBy: 'Sneha Patel',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'Property Update',
      title: 'Rent Price Change Request',
      submittedBy: 'Amit Singh',
      time: '6 hours ago',
      priority: 'low'
    }
  ];

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back, {currentAdmin.name}! Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Cities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCities.map((city, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{city.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{city.properties} properties</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{city.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      {currentAdmin.role === 'mainAdmin' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</h3>
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                {pendingApprovals.length} pending
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500' :
                      item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.type} • {item.submittedBy} • {item.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
