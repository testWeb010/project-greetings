import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Users, 
  Edit, 
  CheckCircle,
  Clock,
  Ban
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

interface EmployeeManagementProps {
  currentAdmin: AdminUser;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const employees: AdminUser[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'mainAdmin',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      permissions: ['all'],
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'employeeAdmin',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      permissions: ['users', 'properties'],
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      name: 'Bob Williams',
      email: 'bob@example.com',
      role: 'employeeAdmin',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      permissions: ['chats', 'reports'],
      lastActive: '3 days ago'
    }
  ];

  const handleEmployeeAction = (action: string, employeeId: string) => {
    console.log(`${action} employee:`, employeeId);
    // Implement employee actions
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action}:`, selectedEmployees);
    // Implement bulk actions
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      mainAdmin: { color: 'bg-red-100 text-red-800', label: 'Main Admin' },
      employeeAdmin: { color: 'bg-blue-100 text-blue-800', label: 'Employee Admin' }
    };
    return badges[role as keyof typeof badges] || badges.employeeAdmin;
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || employee.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage admin accounts and permissions
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{employees.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Employees</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{employees.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Response Time</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">14m 32s</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="mainAdmin">Main Admin</option>
              <option value="employeeAdmin">Employee Admin</option>
            </select>
          </div>

          {selectedEmployees.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedEmployees.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEmployees(filteredEmployees.map(emp => emp.id));
                      } else {
                        setSelectedEmployees([]);
                      }
                    }}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.map((employee) => {
                const roleBadge = getRoleBadge(employee.role);
                
                return (
                  <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmployees([...selectedEmployees, employee.id]);
                          } else {
                            setSelectedEmployees(selectedEmployees.filter(id => id !== employee.id));
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${roleBadge.color}`}>
                          {roleBadge.label}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Last active: {employee.lastActive}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {employee.permissions.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEmployeeAction('edit', employee.id)}
                          className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEmployeeAction('delete', employee.id)}
                          className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
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
          Showing 1 to {filteredEmployees.length} of {employees.length} employees
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

export default EmployeeManagement;
