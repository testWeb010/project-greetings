export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'rent';
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  featured?: boolean;
  verified?: boolean;
  owner: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: string; // Made avatar required
    verified: boolean;
    responseTime?: string;
    rating?: number;
  };
  deposit: number; // Added deposit
  totalCost: number; // Added totalCost
  location_details: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  reviews: {
    overall: number;
    cleanliness: number;
    location: number;
    valueForMoney: number;
    count: number;
  };
  amenities: { icon: any; name: string; available: boolean; }[];
  description: string;
  propertyType: string;
  genderPreference: string;
  availability: { available: boolean; availableFrom: string; };
  members: number;
  currentOccupancy: number;
  rules?: string[];
  nearbyPlaces?: string[];
  createdAt: string;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  verified: boolean;
  membershipTier: 'free' | 'basic' | 'premium' | 'pro' | 'admin';
  membershipExpiry?: string;
  chatCredits: number;
  joinedDate: string;
  preferences?: {
    budget: { min: number; max: number };
    location: string[];
    propertyType: string[];
    genderPreference: string;
  };
}

export interface Chat {
  id: string;
  propertyId: string;
  ownerId: string;
  tenantId: string;
  messages: Message[];
  status: 'active' | 'closed' | 'blocked';
  createdAt: string;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'contact' | 'location';
  timestamp: string;
  read: boolean;
}

export interface Membership {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
  chatCredits: number;
  priority: boolean;
  verificationSupport: boolean;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  propertyType: string;
  location: string;
}

export interface FeaturedProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  totalMembers: number;
  currentOccupancy: number;
  image: string;
  verified: boolean;
  featured: boolean;
  genderPreference: string;
  propertyType: string;
  owner: {
    name: string;
    responseTime: string;
    rating: number;
    verified: boolean;
    phone?: string; // Added optional phone property
  };
  amenities: string[];
  views: number;
  availableFrom: string;
  discount?: number;
}

export interface SearchFilters {
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  propertyType: string;
  genderPreference: string;
  amenities: string[];
  availableFrom?: string;
  bedrooms?: string; // Added bedrooms property
}

export interface PropertyFormData {
  city: string;
  pincode: string;
  contactNumber: string;
  propertyName: string;
  propertyType: string;
  totalRooms: number;
  totalRent: number;
  securityMoney: number;
  electricityIncluded: boolean;
  kitchenAvailable: boolean;
  kitchenShared: boolean;
  washroomAvailable: boolean;
  washroomShared: boolean;
  smokingAlcoholAllowed: boolean;
  totalMembersAllowed: number;
  independentProperty: boolean;
  propertyOwner: boolean;
  askingForRoommate: boolean;
  roWater: boolean;
  ac: boolean;
  foodServiceAvailable: boolean;
  preferredGender: string;
  description: string;
  images: File[];
  availableFrom: string;
  rules: string[];
  nearbyPlaces: string[];
}

export interface PropertyFormErrors {
  city?: string;
  pincode?: string;
  contactNumber?: string;
  propertyName?: string;
  propertyType?: string;
  totalRooms?: string;
  totalRent?: string;
  securityMoney?: string;
  electricityIncluded?: string;
  kitchenAvailable?: string;
  kitchenShared?: string;
  washroomAvailable?: string;
  washroomShared?: string;
  smokingAlcoholAllowed?: string;
  totalMembersAllowed?: string;
  independentProperty?: string;
  propertyOwner?: string;
  askingForRoommate?: string;
  foodServiceAvailable?: string;
  preferredGender?: string;
  description?: string;
  images?: string;
  availableFrom?: string;
  rules?: string;
  nearbyPlaces?: string;
}

export interface ApiEndpoints {
  // Auth endpoints
  auth: {
    register: '/api/auth/register';
    login: '/api/auth/login';
    verifyEmail: '/api/auth/verify-email';
    forgotPassword: '/api/auth/forgot-password';
    resetPassword: '/api/auth/reset-password';
    googleRequest: '/api/auth/google-request';
    google: '/api/auth/google';
  };
  
  // Post/Property endpoints
  posts: {
    addPost: '/api/posts/addpost';
    getPosts: '/api/posts/getpost';
    getPostById: '/api/posts/get-post-by-id/:id';
    getPopularPosts: '/api/posts/get-popular-posts';
    getPostByUser: '/api/posts/get-post-by-user/:userId';
    getPostByLocation: '/api/posts/get-post-by-location/:city';
    activatePost: '/api/posts/activate-post/:postid';
    deletePost: '/api/posts/delete-post/:postid';
    subscription: '/api/posts/subscription/:postid';
    uniqueCities: '/api/posts/unique-cities';
    addMedia: '/api/posts/add-media/:postid';
    editPost: '/api/posts/edit-post/:postId';
  };
  
  // User endpoints
  user: {
    getUserById: '/api/user/get-user-by-id/:id';
    getUser: '/api/user/';
    changePassword: '/api/user/change-password';
    checkUsername: '/api/user/check-username';
  };
  
  // Payment endpoints
  payment: {
    pay: '/api/payment/pay';
    verify: '/api/payment/verify';
    changePlan: '/api/payment/change-plan/:planId';
  };
  
  // Contact endpoints
  contact: {
    contactUs: '/api/contact/contact-us';
    subscribers: '/api/contact/Subscribers';
  };
  
  // Coupon endpoints
  coupon: {
    getAllCoupons: '/api/coupon/get-all-coupons';
    generateCoupon: '/api/coupon/generate-coupon';
    deleteCoupon: '/api/coupon/delete-coupon/:couponId';
    toggleCouponStatus: '/api/coupon/toggle-coupon-status/:couponId';
    verifyCoupon: '/api/coupon/verify-coupon';
  };
  
  // Membership endpoints
  membership: {
    getMemberships: '/api/membership/';
  };
  
  // Admin endpoints
  admin: {
    getStats: '/api/admin/get-stats';
    getAllUsers: '/api/admin/get-all-user';
    getAllMembershipUsers: '/api/admin/get-all-membership-users';
    getAllMemberships: '/api/admin/get-all-memberships';
    deleteUser: '/api/admin/delete-user-by-id/:userId';
    updatePost: '/api/admin/update-post/:postId';
    updateUser: '/api/admin/update-user-by-id/:id';
    getAllPosts: '/api/admin/get-all-posts';
    getPostByUserId: '/api/admin/get-post-by-user-id/:userId';
    deletePost: '/api/admin/delete-post-by-id/:postId';
    getAllPendingPosts: '/api/admin/get-all-pending-posts';
    updateMemberships: '/api/admin/update-memberships/:membershipId';
    getAllContacts: '/api/admin/get-all-contacts';
    getAllOrders: '/api/admin/get-all-orders';
    getAllAdmins: '/api/admin/get-all-admins';
    removeAdminRole: '/api/admin/remove-admin-role';
    recentAdminActivities: '/api/admin/recent-admin-activities';
  };
}