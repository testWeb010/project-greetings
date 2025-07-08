import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Building, 
  MessageCircle, 
  Settings, 
  BarChart3, 
  Shield, 
  Bell, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  User, 
  ChevronDown,
  Moon,
  Sun,
  Activity,
  Crown,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Filter
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement'
import PropertyManagement from './PropertyManagement';
import ChatManagement from './ChartManagement';
import EmployeeManagement from './EmployeeManagement';
import ActivityLogs from './ActivityLogs';
import AdminSettings from './AdminSettings';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'mainAdmin' | 'employeeAdmin';
  avatar: string;
  permissions: string[];
  lastActive: string;
}

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Mock admin user - in real app this would come from auth context
  const currentAdmin: AdminUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@homedaze.com',
    role: 'mainAdmin', // Change to 'employeeAdmin' to test employee view
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    permissions: ['all'], // mainAdmin has all permissions
    lastActive: new Date().toISOString()
  };

  const isMainAdmin = currentAdmin.role === 'mainAdmin';

  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: BarChart3, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      available: true
    },
    { 
      id: 'users', 
      name: 'User Management', 
      icon: Users, 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      available: true
    },
    { 
      id: 'properties', 
      name: 'Property Management', 
      icon: Building, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      available: true
    },
    { 
      id: 'chats', 
      name: 'Chat Management', 
      icon: MessageCircle, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      available: true
    },
    { 
      id: 'employees', 
      name: 'Employee Management', 
      icon: UserCheck, 
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      available: isMainAdmin // Only main admin can access
    },
    { 
      id: 'activity', 
      name: 'Activity Logs', 
      icon: Activity, 
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      available: isMainAdmin // Only main admin can access
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Settings, 
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      available: true
    }
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard currentAdmin={currentAdmin} />;
      case 'users':
        return <UserManagement currentAdmin={currentAdmin} />;
      case 'properties':
        return <PropertyManagement currentAdmin={currentAdmin} />;
      case 'chats':
        return <ChatManagement currentAdmin={currentAdmin} />;
      case 'employees':
        return isMainAdmin ? <EmployeeManagement currentAdmin={currentAdmin} /> : <div>Access Denied</div>;
      case 'activity':
        return isMainAdmin ? <ActivityLogs currentAdmin={currentAdmin} /> : <div>Access Denied</div>;
      case 'settings':
        return <AdminSettings currentAdmin={currentAdmin} />;
      default:
        return <AdminDashboard currentAdmin={currentAdmin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">HomeDaze</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Info */}
        {isSidebarOpen && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={currentAdmin.avatar}
                  alt={currentAdmin.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                  isMainAdmin ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {isMainAdmin && <Crown className="h-2 w-2 text-white m-0.5" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {currentAdmin.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {currentAdmin.role === 'mainAdmin' ? 'Main Admin' : 'Employee Admin'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.filter(item => item.available).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id
                  ? `${item.bgColor} ${item.color} shadow-sm`
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeTab === item.id ? item.color : ''}`} />
              {isSidebarOpen && (
                <span className="font-medium">{item.name}</span>
              )}
              {!isSidebarOpen && (
                <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.name}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              {!isMainAdmin && (
                <div className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Employee Access</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <img
                    src={currentAdmin.avatar}
                    alt={currentAdmin.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{currentAdmin.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{currentAdmin.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;