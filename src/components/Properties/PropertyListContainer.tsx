import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyListItem from './PropertyListItem';
import Pagination from './Pagination';
import { Property, SearchFilters, ApiEndpoints } from '../../types'; // Assuming Filters interface and ApiEndpoints are in types/index.ts

interface PropertyListContainerProps {
  filters: SearchFilters;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  onPropertyClick: () => void;
}

const API_ENDPOINTS: ApiEndpoints = { // Placeholder, actual endpoints should be imported or defined elsewhere
  auth: { register: '/api/auth/register', login: '/api/auth/login', verifyEmail: '/api/auth/verify-email', forgotPassword: '/api/auth/forgot-password', resetPassword: '/api/auth/reset-password', googleRequest: '/api/auth/google-request', google: '/api/auth/google' },
  posts: { addPost: '/api/posts/addpost', getPosts: '/api/posts/getpost', getPostById: '/api/posts/get-post-by-id/:id', getPopularPosts: '/api/posts/get-popular-posts', getPostByUser: '/api/posts/get-post-by-user/:userId', getPostByLocation: '/api/posts/get-post-by-location/:city', activatePost: '/api/posts/activate-post/:postid', deletePost: '/api/posts/delete-post/:postid', subscription: '/api/posts/subscription/:postid', uniqueCities: '/api/posts/unique-cities', addMedia: '/api/posts/add-media/:postid', editPost: '/api/posts/edit-post/:postId' },
  user: { getUserById: '/api/user/get-user-by-id/:id', getUser: '/api/user/', changePassword: '/api/user/change-password', checkUsername: '/api/user/check-username' },
  payment: { pay: '/api/payment/pay', verify: '/api/payment/verify', changePlan: '/api/payment/change-plan/:planId' },
  contact: { contactUs: '/api/contact/contact-us', subscribers: '/api/contact/Subscribers' },
  coupon: { getAllCoupons: '/api/coupon/get-all-coupons', generateCoupon: '/api/coupon/generate-coupon', deleteCoupon: '/api/coupon/delete-coupon/:couponId', toggleCouponStatus: '/api/coupon/toggle-coupon-status/:couponId', verifyCoupon: '/api/coupon/verify-coupon' },
  membership: { getMemberships: '/api/membership/' },
  admin: { getStats: '/api/admin/get-stats', getAllUsers: '/api/admin/get-all-user', getAllMembershipUsers: '/api/admin/get-all-membership-users', getAllMemberships: '/api/admin/get-all-memberships', deleteUser: '/api/admin/delete-user-by-id/:userId', updatePost: '/api/admin/update-post/:postId', updateUser: '/api/admin/update-user-by-id/:id', getAllPosts: '/api/admin/get-all-posts', getPostByUserId: '/api/admin/get-post-by-user-id/:userId', deletePost: '/api/admin/delete-post-by-id/:postId', getAllPendingPosts: '/api/admin/get-all-pending-posts', updateMemberships: '/api/admin/update-memberships/:membershipId', getAllContacts: '/api/admin/get-all-contacts', getAllOrders: '/api/admin/get-all-orders', getAllAdmins: '/api/admin/get-all-admins', removeAdminRole: '/api/admin/remove-admin-role', recentAdminActivities: '/api/admin/recent-admin-activities' }
};

const PropertyListContainer: React.FC<PropertyListContainerProps> = ({
  filters,
  searchQuery,
  viewMode,
  onPropertyClick,
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        // Construct query parameters from filters and searchQuery
        const queryParams = new URLSearchParams();
        if (searchQuery) {
          queryParams.append('location', searchQuery);
        }
        if (filters.propertyType) {
          queryParams.append('propertyType', filters.propertyType);
        }
        if (filters.genderPreference) {
          queryParams.append('genderPreference', filters.genderPreference);
        }
        if (filters.bedrooms) {
           queryParams.append('bedrooms', filters.bedrooms);
        }
        // Assuming the API supports min/max price range filters
         if (filters.priceRange.min > 0) {
             queryParams.append('priceMin', filters.priceRange.min.toString());
         }
         if (filters.priceRange.max < 50000) { // Use 50000 as a practical upper limit if not specified
             queryParams.append('priceMax', filters.priceRange.max.toString());
         }
        if (filters.amenities.length > 0) {
           queryParams.append('amenities', filters.amenities.join(',')); // Assuming API accepts comma-separated amenities
        }

        // Add pagination parameters
        queryParams.append('page', currentPage.toString());
        // Assuming API supports a limit parameter, e.g., 10 properties per page
        queryParams.append('limit', '10'); // Example limit

        const response = await fetch(`${API_ENDPOINTS.posts.getPosts}?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProperties(data.properties); // Assuming the API returns an object with a 'properties' array
        setTotalPages(data.totalPages); // Assuming the API returns 'totalPages'

      } catch (error: any) {
        setError(error.message);
        setProperties([]); // Clear properties on error
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, searchQuery, currentPage]); // Depend on filters, searchQuery, and currentPage

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading properties: {error}</div>;
  }

  if (properties.length === 0) {
    return <div>No properties found matching your criteria.</div>;
  }

  return (
    <div className="flex-1">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} onClick={onPropertyClick} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map(property => (
            <PropertyListItem key={property.id} property={property} onClick={onPropertyClick} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PropertyListContainer;
