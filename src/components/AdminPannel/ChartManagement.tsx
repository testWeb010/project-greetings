import React, { useState } from 'react';
import { 
  Search, 
  MessageCircle, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Ban,
  Flag,
  TrendingUp,
  Activity
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

interface ChatSession {
  id: string;
  participants: {
    tenant: {
      id: string;
      name: string;
      avatar: string;
    };
    owner: {
      id: string;
      name: string;
      avatar: string;
    };
  };
  property: {
    id: string;
    title: string;
    location: string;
  };
  status: 'active' | 'closed' | 'flagged' | 'blocked';
  messageCount: number;
  lastMessage: {
    content: string;
    timestamp: string;
    sender: 'tenant' | 'owner';
  };
  startedAt: string;
  duration: string;
  flagged: boolean;
  flagReason?: string;
}

interface ChatManagementProps {
  currentAdmin: AdminUser;
}

const ChatManagement: React.FC<ChatManagementProps> = ({ currentAdmin }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);

  const chatSessions: ChatSession[] = [
    {
      id: '1',
      participants: {
        tenant: {
          id: '1',
          name: 'Priya Sharma',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
        },
        owner: {
          id: '2',
          name: 'Rajesh Kumar',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        }
      },
      property: {
        id: '1',
        title: 'Modern PG in Koramangala',
        location: 'Koramangala, Bangalore'
      },
      status: 'active',
      messageCount: 24,
      lastMessage: {
        content: 'When can I visit the property?',
        timestamp: '2 minutes ago',
        sender: 'tenant'
      },
      startedAt: '2024-01-20T10:30:00Z',
      duration: '2 hours',
      flagged: false
    },
    {
      id: '2',
      participants: {
        tenant: {
          id: '3',
          name: 'Amit Singh',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
        },
        owner: {
          id: '4',
          name: 'Sneha Patel',
          avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg'
        }
      },
      property: {
        id: '2',
        title: 'Shared Room near IIT Delhi',
        location: 'Hauz Khas, Delhi'
      },
      status: 'flagged',
      messageCount: 45,
      lastMessage: {
        content: 'This is inappropriate content',
        timestamp: '1 hour ago',
        sender: 'tenant'
      },
      startedAt: '2024-01-19T14:15:00Z',
      duration: '1 day',
      flagged: true,
      flagReason: 'Inappropriate content'
    },
    {
      id: '3',
      participants: {
        tenant: {
          id: '5',
          name: 'Kavya Reddy',
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg'
        },
        owner: {
          id: '6',
          name: 'Arjun Mehta',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
        }
      },
      property: {
        id: '3',
        title: 'Luxury Single Room in Bandra',
        location: 'Bandra West, Mumbai'
      },
      status: 'closed',
      messageCount: 18,
      lastMessage: {
        content: 'Thank you for your interest',
        timestamp: '2 days ago',
        sender: 'owner'
      },
      startedAt: '2024-01-18T09:00:00Z',
      duration: '3 hours',
      flagged: false
    }
  ];

  const handleChatAction = (action: string, chatId: string) => {
    console.log(`${action} chat:`, chatId);
    // Implement chat actions
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action}:`, selectedChats);
    // Implement bulk actions
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      closed: { color: 'bg-gray-100 text-gray-800', icon: Clock },
      flagged: { color: 'bg-red-100 text-red-800', icon: Flag },
      blocked: { color: 'bg-red-100 text-red-800', icon: Ban }
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const filteredChats = chatSessions.filter(chat => {
    const matchesSearch = chat.participants.tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.participants.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.property.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || chat.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chat Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage all chat conversations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Chats</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">45,678</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+15.3%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Chats</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,234</p>
              <div className="flex items-center mt-2">
                <Activity className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">Live now</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Flagged Chats</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">23</p>
              <div className="flex items-center mt-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-600">Needs attention</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <Flag className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">2.5m</p>
              <div className="flex items-center mt-2">
                <Clock className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium text-blue-600">Excellent</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                placeholder="Search chats..."
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
              <option value="closed">Closed</option>
              <option value="flagged">Flagged</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {selectedChats.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedChats.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('close')}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleBulkAction('flag')}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
              >
                Flag
              </button>
              <button
                onClick={() => handleBulkAction('block')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
              >
                Block
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chats Table */}
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
                        setSelectedChats(filteredChats.map(c => c.id));
                      } else {
                        setSelectedChats([]);
                      }
                    }}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredChats.map((chat) => {
                const statusBadge = getStatusBadge(chat.status);
                
                return (
                  <tr key={chat.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedChats.includes(chat.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedChats([...selectedChats, chat.id]);
                          } else {
                            setSelectedChats(selectedChats.filter(id => id !== chat.id));
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <img
                            src={chat.participants.tenant.avatar}
                            alt={chat.participants.tenant.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-800"
                          />
                          <img
                            src={chat.participants.owner.avatar}
                            alt={chat.participants.owner.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-800"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {chat.participants.tenant.name} ↔ {chat.participants.owner.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Started {new Date(chat.startedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{chat.property.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{chat.property.location}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                          <statusBadge.icon className="h-3 w-3 mr-1" />
                          {chat.status}
                        </span>
                        {chat.flagged && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <Flag className="h-3 w-3 mr-1" />
                            Flagged
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <p>{chat.messageCount} messages</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Last: {chat.lastMessage.timestamp}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          "{chat.lastMessage.content}"
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedChat(chat);
                            setShowChatModal(true);
                          }}
                          className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {chat.status === 'flagged' && currentAdmin.role === 'mainAdmin' && (
                          <button
                            onClick={() => handleChatAction('review', chat.id)}
                            className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
                          >
                            <Flag className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleChatAction('block', chat.id)}
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
          Showing 1 to {filteredChats.length} of {chatSessions.length} chats
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

export default ChatManagement;
