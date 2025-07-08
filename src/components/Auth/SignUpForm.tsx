import React from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User
} from 'lucide-react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { ApiEndpoints } from '../../types';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiEndpoints: ApiEndpoints = { // Assuming ApiEndpoints is defined as a const object
        auth: { register: '/api/auth/register', login: '/api/auth/login', verifyEmail: '/api/auth/verify-email', forgotPassword: '/api/auth/forgot-password', resetPassword: '/api/auth/reset-password', googleRequest: '/api/auth/google-request', google: '/api/auth/google' },
        posts: { addPost: '/api/posts/addpost', getPosts: '/api/posts/getpost', getPostById: '/api/posts/get-post-by-id/:id', getPopularPosts: '/api/posts/get-popular-posts', getPostByUser: '/api/posts/get-post-by-user/:userId', getPostByLocation: '/api/posts/get-post-by-location/:city', activatePost: '/api/posts/activate-post/:postid', deletePost: '/api/posts/delete-post/:postid', subscription: '/api/posts/subscription/:postid', uniqueCities: '/api/posts/unique-cities', addMedia: '/api/posts/add-media/:postid', editPost: '/api/posts/edit-post/:postId' },
        user: { getUserById: '/api/user/get-user-by-id/:id', getUser: '/api/user/', changePassword: '/api/user/change-password', checkUsername: '/api/user/check-username' },
        payment: { pay: '/api/payment/pay', verify: '/api/payment/verify', changePlan: '/api/payment/change-plan/:planId' },
        contact: { contactUs: '/api/contact/contact-us', subscribers: '/api/contact/Subscribers' },
        coupon: { getAllCoupons: '/api/coupon/get-all-coupons', generateCoupon: '/api/coupon/generate-coupon', deleteCoupon: '/api/coupon/delete-coupon/:couponId', toggleCouponStatus: '/api/coupon/toggle-coupon-status/:couponId', verifyCoupon: '/api/coupon/verify-coupon' },
        membership: { getMemberships: '/api/membership/' },
        admin: { getStats: '/api/admin/get-stats', getAllUsers: '/api/admin/get-all-user', getAllMembershipUsers: '/api/admin/get-all-membership-users', getAllMemberships: '/api/admin/get-all-memberships', deleteUser: '/api/admin/delete-user-by-id/:userId', updatePost: '/api/admin/update-post/:postId', updateUser: '/api/admin/update-user-by-id/:id', getAllPosts: '/api/admin/get-all-posts', getPostByUserId: '/api/admin/get-post-by-user-id/:userId', deletePost: '/api/admin/delete-post-by-id/:postId', getAllPendingPosts: '/api/admin/get-all-pending-posts', updateMemberships: '/api/admin/update-memberships/:membershipId', getAllContacts: '/api/admin/get-all-contacts', getAllOrders: '/api/admin/get-all-orders', getAllAdmins: '/api/admin/get-all-admins', removeAdminRole: '/api/admin/remove-admin-role', recentAdminActivities: '/api/admin/recent-admin-activities' }
     };
      const response = await fetch(apiEndpoints.auth.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        console.log('Registration successful');
        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account.",
        })
        router.push('/verify-email');
      } else {
        // Registration failed
        console.error('Registration failed:', data.message);
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: data.message,
        })
      }
    } catch (error: any) {
      console.error('An error occurred during registration:', error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message,
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="username"
            id="username"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 hover:text-gray-500">
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
