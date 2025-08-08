import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '../pages/Navigation';
import Footer from '../pages/Footer';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ChatInbox from '../features/chat/ChatInbox';
// import ChatConversation from '../features/chat/ChatConversation';

// Lazy load pages
const LandingPage = lazy(() => import('../pages/LandingPage'));
const AllPropertiesPage = lazy(() => import('../components/features/Properties/containers/AllPropertiesPage'));
const AddPropertyForm = lazy(() => import('../components/features/AddProperty/containers/AddPropertyForm'));
const PropertyDetailPage = lazy(() => import('../pages/PropertyDetailPage'));
const BlogPage = lazy(() => import('../components/features/Blog/containers/BlogPage'));
const MembershipPage = lazy(() => import('../pages/MembershipPage'));
const AdminPanel = lazy(() => import('../components/features/AdminPannel/components'));
const CheckoutPage = lazy(() => import('../pages/Checkoutpage'));

import PublicLayout from '../components/layout/PublicLayout';

const AppRoutes: React.FC = () => (
  // <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      {/* Admin routes - no navigation */}
      <Route path="/admin/*" element={<AdminPanel />} />
      {/* Public routes - with navigation */}
      <Route path="/*" element={<PublicLayout />}>
        <Route index element={<LandingPage />} /> {/* Use index for the root route */}
        <Route path="properties" element={<AllPropertiesPage onPropertyClick={() => {}} />} />
        <Route path="add-property" element={<AddPropertyForm />} />
        <Route path="property/:id" element={<PropertyDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="membership" element={<MembershipPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  // </Suspense>
);

export default AppRoutes;