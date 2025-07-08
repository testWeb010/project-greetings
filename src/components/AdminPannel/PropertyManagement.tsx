import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  MoreVertical,
  Ban,
  Verified
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
  propertyType: string;
  owner: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  status: 'active' | 'pending' | 'rejected' | 'inactive';
  verified: boolean;
  featured: boolean;
  images: string[];
  amenities: string[];
  createdAt: string;
  views: number;
  inquiries: number;
  rating: number;
  totalMembers: number;
  currentOccupancy: number;
}

interface PropertyManagementProps {
  currentAdmin: AdminUser;
}

const PropertyManagement: React.FC<PropertyManagementProps> = ({ currentAdmin }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const properties: Property[] = [
    {
      id: '1',
      title: 'Modern PG in Koramangala',
      location: 'Koramangala, Bangalore',
      price: 12000,
      propertyType: 'PG',
      owner: {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
      },
      status: 'active',
      verified: true,
      featured: true,
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
      amenities: ['WiFi', 'AC', 'Food', 'Laundry'],
      createdAt: '2024-01-15',
      views: 245,
      inquiries: 18,
      rating: 4.5,
      totalMembers: 4,
      currentOccupancy: 2
    },
    {
      id: '2',
      title: 'Shared Room near IIT Delhi',
      location: 'Hauz Khas, Delhi',
      price: 8000,
      propertyType: 'Shared Room',
      owner: {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 87654 32109',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      },
      status: 'pending',
      verified: false,
      featured: false,
      images: ['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'],
      amenities: ['WiFi', 'Kitchen', 'Study Area'],
      createdAt: '2024-01-20',
      views: 89,
      inquiries: 5,
      rating: 0,
      totalMembers: 2,
      currentOccupancy: 1
    },
    {
      id: '3',
      title: 'Luxury Single Room in Bandra',
      location: 'Bandra West, Mumbai',
      price: 15000,
      propertyType: 'Single Room',
      owner: {
        name: 'Amit Singh',
        email: 'amit@example.com',
        phone: '+91 76543 21098',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
      },
      status: 'active',
      verified: true,
      featured: false,
      images: ['https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg'],
      amenities: ['AC', 'Attached Bathroom', 'Balcony', 'WiFi'],
      createdAt: '2024-01-10',
      views: 312,
      inquiries: 25,
      rating: 4.8,
      totalMembers: 1,
      currentOccupancy: 0
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
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      rejected: { color: 'bg-red-100 text-red-800', icon: Ban },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: AlertTriangle }
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesType = filterType === 'all' || property.propertyType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Property Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and monitor all property listings
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
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
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">8,921</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Approval</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">156</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Verified Properties</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">7,234</p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Properties</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">432</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
              <option value="rejected">Rejected</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="PG">PG</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Single Room">Single Room</option>
              <option value="Apartment">Apartment</option>
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
              <button
                onClick={() => handleBulkAction('feature')}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
              >
                Feature
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
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
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
                        <div className="relative">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          {property.featured && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Star className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{property.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="h-3 w-3" />
                              <span>{property.location}</span>
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{property.propertyType}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              {formatPrice(property.price)}/month
                            </span>
                            {property.verified && (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span className="text-xs text-green-600 dark:text-green-400">Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={property.owner.avatar}
                          alt={property.owner.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{property.owner.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{property.owner.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                        <statusBadge.icon className="h-3 w-3 mr-1" />
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{property.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{property.inquiries}</span>
                          </div>
                          {property.rating > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400" />
                              <span className="text-xs">{property.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {property.currentOccupancy}/{property.totalMembers} occupied
                        </p>
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
                        {property.status === 'pending' && currentAdmin.role === 'mainAdmin' && (
                          <>
                            <button
                              onClick={() => handlePropertyAction('approve', property.id)}
                              className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handlePropertyAction('reject', property.id)}
                              className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                              <Ban className="h-4 w-4" />
                            </button>
                          </>
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