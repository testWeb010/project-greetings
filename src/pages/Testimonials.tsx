
import React, { useState } from 'react';
import TrustIndicators from '../components/Testimonials/TrustIndicators';
import TestimonialHeader from '../components/Testimonials/TestimonialHeader';
import TestimonialFilters from '../components/Testimonials/TestimonialFilters';
import TestimonialCarousel from '../components/Testimonials/TestimonialCarousel';
import VideoTestimonials from '../components/Testimonials/VideoTestimonials';
import AchievementStats from '../components/Testimonials/AchievementStats';
import SuccessMetrics from '../components/Testimonials/SuccessMetrics';
import TestimonialsCTA from '../components/Testimonials/TestimonialsCTA';

interface TestimonialUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  university?: string;
  propertyType?: string;
}

interface Testimonial {
  id: string;
  user: TestimonialUser;
  content: string;
  rating: number;
  date: string;
  category: string;
  verified: boolean;
  helpful: number;
  featured: boolean;
  tags: string[];
  propertyDetails?: {
    name: string;
    location: string;
    rent: number;
  };
}

const Testimonials: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      user: {
        id: '1',
        name: 'Priya Sharma',
        role: 'Engineering Student',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        location: 'Bangalore',
        university: 'IIT Bangalore',
        propertyType: 'PG'
      },
      content: 'The platform made finding a safe and comfortable PG so easy! I was able to directly chat with property owners and got verified details. The verification process gave me confidence, and I found my perfect accommodation within a week.',
      rating: 5,
      date: '2024-01-15',
      category: 'student',
      verified: true,
      helpful: 24,
      featured: true,
      tags: ['Safe', 'Quick Process', 'Verified Properties'],
      propertyDetails: {
        name: 'Green Valley PG',
        location: 'Koramangala, Bangalore',
        rent: 12000
      }
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Rahul Gupta',
        role: 'Property Owner',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        location: 'Delhi',
        propertyType: 'Shared Room'
      },
      content: 'As a property owner, this platform has been incredible. The quality of tenants is excellent, and the screening process ensures I get serious inquiries. My properties are always occupied thanks to the platform\'s reach.',
      rating: 5,
      date: '2024-01-12',
      category: 'owner',
      verified: true,
      helpful: 18,
      featured: true,
      tags: ['Quality Tenants', 'Good Reach', 'Easy Management']
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Anjali Reddy',
        role: 'Working Professional',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
        location: 'Mumbai',
        propertyType: 'Single Room'
      },
      content: 'Moving to Mumbai for work was stressful, but this platform made accommodation hunting a breeze. The filters helped me find exactly what I needed, and the virtual tours saved so much time. Highly recommended!',
      rating: 4,
      date: '2024-01-10',
      category: 'professional',
      verified: true,
      helpful: 15,
      featured: false,
      tags: ['Virtual Tours', 'Time Saving', 'Professional Service']
    },
    {
      id: '4',
      user: {
        id: '4',
        name: 'Vikram Singh',
        role: 'MBA Student',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
        location: 'Hyderabad',
        university: 'ISB Hyderabad',
        propertyType: 'Co-living'
      },
      content: 'The co-living space I found through this platform exceeded my expectations. The community aspect was exactly what I was looking for, and the amenities were as advertised. Great experience overall!',
      rating: 5,
      date: '2024-01-08',
      category: 'student',
      verified: true,
      helpful: 21,
      featured: true,
      tags: ['Co-living', 'Community', 'Great Amenities']
    },
    {
      id: '5',
      user: {
        id: '5',
        name: 'Sneha Patel',
        role: 'Research Scholar',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
        location: 'Pune',
        university: 'University of Pune',
        propertyType: 'PG'
      },
      content: 'Budget-friendly and safe options for female students are rare, but this platform delivered. The owner verification and safety ratings helped me make an informed decision. Very satisfied with my choice!',
      rating: 4,
      date: '2024-01-05',
      category: 'student',
      verified: true,
      helpful: 12,
      featured: false,
      tags: ['Budget-friendly', 'Safe for Females', 'Informed Decision']
    }
  ];

  const videoTestimonials = [
    {
      id: '1',
      user: testimonials[0].user,
      thumbnailUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      videoUrl: '#',
      title: 'How I Found My Dream PG in Bangalore',
      duration: '2:30',
      views: 1240
    },
    {
      id: '2',
      user: testimonials[1].user,
      thumbnailUrl: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      videoUrl: '#',
      title: 'Property Owner Success Story',
      duration: '3:15',
      views: 890
    }
  ];

  const categories = [
    { key: 'all', label: 'All Reviews', count: testimonials.length },
    { key: 'student', label: 'Students', count: testimonials.filter(t => t.category === 'student').length },
    { key: 'professional', label: 'Professionals', count: testimonials.filter(t => t.category === 'professional').length },
    { key: 'owner', label: 'Property Owners', count: testimonials.filter(t => t.category === 'owner').length }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesCategory = activeFilter === 'all' || testimonial.category === activeFilter;
    const matchesRating = selectedRating === 0 || testimonial.rating >= selectedRating;
    return matchesCategory && matchesRating;
  });

  const trustIndicators = [
    {
      id: 'verified',
      title: 'Verified Reviews',
      value: '10,000+',
      icon: 'Shield',
      color: 'blue'
    },
    {
      id: 'rating',
      title: 'Average Rating',
      value: '4.8/5',
      icon: 'Star',
      color: 'yellow'
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction Rate',
      value: '96%',
      icon: 'ThumbsUp',
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <TestimonialHeader />

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustIndicators />
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialFilters
            categories={categories}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel testimonials={filteredTestimonials} />
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoTestimonials videos={videoTestimonials} />
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AchievementStats />
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuccessMetrics />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsCTA />
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
