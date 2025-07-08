import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Building, 
  Eye, 
  Edit, 
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  MapPin
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

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
  amenities: string[];
  featured: boolean;
  status: 'active' | 'pending' | 'inactive' | 'rejected';
  submittedBy: string;
  submittedDate: string;
  verified: boolean;
  views: number;
  contacted: number;
}

interface PropertyManagementProps {
  currentAdmin: AdminUser;
}

const PropertyManagement: React.FC<PropertyManagementProps> = ({ currentAdmin }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const properties: Property[] = [
    {
      id: '1',
      title: 'Modern PG in Koramangala',
      location: 'Koramangala, Bangalore',
      price: 12000,
      bedrooms: 1,
      bathrooms: 1,
      area: 450,
      image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
      description: 'A modern and well-maintained PG in the heart of Koramangala, perfect for students and young professionals.',
      amenities: ['WiFi', 'AC', 'Attached Bathroom', 'Food Service'],
      featured: true,
      status: 'active',
      submittedBy: 'Rajesh Kumar',
      submittedDate: '2024-01-15',
      verified: true,
      views: 2345,
      contacted: 456
    },
    {
      id: '2',
      title: 'Shared Room near IIT Delhi',
      location: 'Hauz Khas, Delhi',
      price: 8000,
      bedrooms: 2,
      bathrooms: 1,
      area: 600,
      image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      description: 'Affordable shared room option for students studying near IIT Delhi, with easy access to public transport.',
      amenities: ['WiFi', 'Study Area', 'Common Kitchen', 'Laundry Service'],
      featured: false,
      status: 'pending',
      submittedBy: 'Amit Singh',
      submittedDate: '2024-01-10',
      verified: false,
      views: 1876,
      contacted: 321
    },
    {
      id: '3',
      title: 'Luxury Single Room in Bandra',
      location: 'Bandra West, Mumbai',
      price: 25000,
      bedrooms: 1,
      bathrooms: 1,
      area: 500,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      description: 'A luxurious single room in the upscale area of Bandra, offering premium amenities and a comfortable living experience.',
      amenities: ['WiFi', 'AC', 'Attached Bathroom', 'Food Service', 'Gym'],
      featured: true,
      status: 'active',
      submittedBy: 'Sneha Patel',
      submittedDate: '2024-01-05',
      verified: true,
      views: 3123,
      contacted: 567
    }
  ];

  const handlePropertyAction = (action: string, propertyId: string) => {
    console.log(`${action} property:`, propertyId);
    // Implement property actions
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action}:`, selectedProperties);
    // Implement bulk actions
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Property Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage property listings and their details
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{properties.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Listings</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {properties.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Approvals</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {properties.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {properties.reduce((sum, p) => sum + p.views, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {selectedProperties.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedProperties.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('approve')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Properties Table */}
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
                        setSelectedProperties(filteredProperties.map(p => p.id));
                      } else {
                        setSelectedProperties([]);
                      }
                    }}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProperties.map((property) => {
                const statusBadge = getStatusBadge(property.status);
                
                return (
                  <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(property.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProperties([...selectedProperties, property.id]);
                          } else {
                            setSelectedProperties(selectedProperties.filter(id => id !== property.id));
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{property.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Submitted by {property.submittedBy} on {new Date(property.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{property.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <p>Views: {property.views}</p>
                        <p>Contacted: {property.contacted}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedProperty(property);
                            setShowPropertyModal(true);
                          }}
                          className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePropertyAction('edit', property.id)}
                          className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {property.status === 'pending' && (
                          <button
                            onClick={() => handlePropertyAction('approve', property.id)}
                            className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        {property.status === 'pending' && (
                          <button
                            onClick={() => handlePropertyAction('reject', property.id)}
                            className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </button>
                        )}
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
          Showing 1 to {filteredProperties.length} of {properties.length} properties
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

export default PropertyManagement;
