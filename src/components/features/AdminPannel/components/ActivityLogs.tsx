
import React, { useState } from 'react';
import { 
  Search, 
  Download,
  Shield,
  Ban,
  UserCheck,
  Edit,
  Trash2,
  Plus,
  Settings
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
  timestamp: string;
  admin: {
    id: string;
    name: string;
  };
  type: string;
  description: string;
  details: any;
}

interface ActivityLogsProps {
  currentAdmin: AdminUser;
}

const ActivityLogs: React.FC<ActivityLogsProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const activities: ActivityLog[] = [
    {
      id: '1',
      timestamp: '2024-01-22T14:30:00Z',
      admin: {
        id: '1',
        name: 'John Doe'
      },
      type: 'user.ban',
      description: 'Banned user Priya Sharma',
      details: {
        userId: '3',
        userName: 'Priya Sharma'
      }
    },
    {
      id: '2',
      timestamp: '2024-01-22T13:45:00Z',
      admin: {
        id: '2',
        name: 'Alice Smith'
      },
      type: 'property.add',
      description: 'Added new property in Koramangala',
      details: {
        propertyId: '12',
        propertyName: 'Luxury PG'
      }
    },
    {
      id: '3',
      timestamp: '2024-01-21T22:10:00Z',
      admin: {
        id: '1',
        name: 'John Doe'
      },
      type: 'admin.login',
      description: 'Admin John Doe logged in',
      details: {
        adminId: '1',
        adminName: 'John Doe'
      }
    },
    {
      id: '4',
      timestamp: '2024-01-21T18:00:00Z',
      admin: {
        id: '2',
        name: 'Alice Smith'
      },
      type: 'property.edit',
      description: 'Edited property details in Jayanagar',
      details: {
        propertyId: '11',
        propertyName: 'Cozy Room'
      }
    },
    {
      id: '5',
      timestamp: '2024-01-20T09:20:00Z',
      admin: {
        id: '1',
        name: 'John Doe'
      },
      type: 'user.verify',
      description: 'Verified user Rajesh Kumar',
      details: {
        userId: '4',
        userName: 'Rajesh Kumar'
      }
    },
    {
      id: '6',
      timestamp: '2024-01-19T16:40:00Z',
      admin: {
        id: '2',
        name: 'Alice Smith'
      },
      type: 'property.delete',
      description: 'Deleted property in Indiranagar',
      details: {
        propertyId: '10',
        propertyName: 'Spacious Flat'
      }
    },
    {
      id: '7',
      timestamp: '2024-01-18T11:55:00Z',
      admin: {
        id: '1',
        name: 'John Doe'
      },
      type: 'admin.settings',
      description: 'Updated site settings',
      details: {
        settingName: 'Theme',
        settingValue: 'Dark'
      }
    },
    {
      id: '8',
      timestamp: '2024-01-17T19:15:00Z',
      admin: {
        id: '2',
        name: 'Alice Smith'
      },
      type: 'property.approve',
      description: 'Approved property listing in Whitefield',
      details: {
        propertyId: '9',
        propertyName: 'Affordable Hostel'
      }
    },
    {
      id: '9',
      timestamp: '2024-01-16T15:30:00Z',
      admin: {
        id: '1',
        name: 'John Doe'
      },
      type: 'user.edit',
      description: 'Edited user profile for Kavya Reddy',
      details: {
        userId: '5',
        userName: 'Kavya Reddy'
      }
    }
  ];

  const handleDownload = () => {
    console.log('Download activity logs');
    // Implement download functionality
  };

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      'user.ban': Ban,
      'user.verify': UserCheck,
      'user.edit': Edit,
      'user.delete': Trash2,
      'property.add': Plus,
      'property.edit': Edit,
      'property.delete': Trash2,
      'property.approve': UserCheck,
      'admin.settings': Settings,
      'admin.login': Settings
    };
    return icons[type] || Edit;
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           activity.admin.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || activity.type.startsWith(filterType);
    
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();

    if (sortBy === 'date') {
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }

    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track user and admin activities
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Activities</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{activities.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Week</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">123</p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">456</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="user">User Activities</option>
              <option value="property">Property Activities</option>
              <option value="admin">Admin Activities</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="date">Date</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredActivities.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type);
                
                return (
                  <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <ActivityIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.description}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Type: {activity.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {Object.entries(activity.details).map(([key, value]) => (
                          <p key={key}>
                            {key}: {String(value)}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{activity.admin.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing 1 to {filteredActivities.length} of {activities.length} activities
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
