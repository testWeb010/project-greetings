import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, CheckCircle, MessageCircle, Heart, TrendingUp, Users, Award, Shield, Sparkles, ArrowRight, Calendar, MapPin, Building } from 'lucide-react';
import { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'Computer Science Student',
      content: 'HomeDaze completely transformed my accommodation search! The direct chat feature helped me connect with the owner instantly, and I found my perfect PG in Bangalore within just 2 days. The verification process gave me complete confidence in my choice.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      propertyType: 'Girls PG',
      location: 'Koramangala, Bangalore'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      role: 'MBA Student',
      content: 'As a student on a tight budget, I was worried about finding good accommodation. HomeDaze not only helped me find an affordable shared room but also connected me with amazing roommates who became lifelong friends. The platform is truly a game-changer!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      propertyType: 'Shared Room',
      location: 'Hauz Khas, Delhi'
    },
    {
      id: '3',
      name: 'Sneha Patel',
      role: 'Engineering Student',
      content: 'The safety features and verified properties on HomeDaze gave my parents complete peace of mind. I found a secure PG near my college with all modern amenities. The 24/7 chat support was incredibly helpful throughout my entire journey.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
      propertyType: 'Co-ed PG',
      location: 'Andheri, Mumbai'
    },
    {
      id: '4',
      name: 'Amit Singh',
      role: 'Medical Student',
      content: 'Being new to the city, I was nervous about finding accommodation. HomeDaze\'s verified listings and direct owner contact made everything transparent and trustworthy. Found my single room near the hospital within a week!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      propertyType: 'Single Room',
      location: 'Sector 62, Noida'
    },
    {
      id: '5',
      name: 'Kavya Reddy',
      role: 'Design Student',
      content: 'The free chat credits were a lifesaver! I could talk to multiple property owners before making my decision. The platform is so student-friendly, and the membership plans are very affordable for our budgets.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      propertyType: 'Studio Apartment',
      location: 'Whitefield, Bangalore'
    },
    {
      id: '6',
      name: 'Arjun Mehta',
      role: 'Law Student',
      content: 'HomeDaze made my transition to a new city seamless. The detailed property descriptions and honest reviews helped me make an informed decision. The zero brokerage policy saved me thousands of rupees!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      propertyType: 'Co-living',
      location: 'Powai, Mumbai'
    },
  ];

  const categories = [
    { key: 'all', label: 'All Stories', count: testimonials.length },
    { key: 'PG', label: 'PG Stories', count: testimonials.filter(t => t.propertyType.includes('PG')).length },
    { key: 'Shared', label: 'Shared Room', count: testimonials.filter(t => t.propertyType.includes('Shared')).length },
    { key: 'Single', label: 'Single Room', count: testimonials.filter(t => t.propertyType.includes('Single')).length },
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.propertyType.toLowerCase().includes(activeCategory.toLowerCase()));

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const achievements = [
    { number: '50L+', label: 'Happy Students', icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50' },
    { number: '10L+', label: 'Properties Listed', icon: Building, color: 'from-emerald-500 to-green-500', bgColor: 'from-emerald-50 to-green-50' },
    { number: '500+', label: 'Cities Covered', icon: MapPin, color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50' },
    { number: '99%', label: 'Satisfaction Rate', icon: Star, color: 'from-orange-500 to-red-500', bgColor: 'from-orange-50 to-red-50' },
  ];

  const successMetrics = [
    { metric: '2.5 Days', label: 'Average Time to Find Home', icon: Calendar },
    { metric: '₹15,000', label: 'Average Savings on Brokerage', icon: Award },
    { metric: '4.8/5', label: 'Average Property Rating', icon: Star },
    { metric: '24/7', label: 'Customer Support', icon: Shield }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-[10%] w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-[20%] w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-200">
            <Sparkles className="h-4 w-4" />
            <span>Student Success Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            What Students
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Say About Us
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join thousands of satisfied students who found their perfect home with HomeDaze's trusted platform
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => {
                    setActiveCategory(category.key);
                    setCurrentTestimonial(0);
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    activeCategory === category.key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{category.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeCategory === category.key
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Testimonial Showcase */}
        <div className="mb-16">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            {/* Quote Icon */}
            <div className="absolute top-8 right-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <Quote className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-blue-600 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border border-blue-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-blue-600 p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg border border-blue-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="text-center max-w-5xl mx-auto relative z-10">
              {/* Rating */}
              <div className="mb-8">
                {renderStars(filteredTestimonials[currentTestimonial]?.rating || 5)}
              </div>

              {/* Content */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-10 leading-relaxed font-medium">
                "{filteredTestimonials[currentTestimonial]?.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                <div className="relative">
                  <img
                    src={filteredTestimonials[currentTestimonial]?.avatar}
                    alt={filteredTestimonials[currentTestimonial]?.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {filteredTestimonials[currentTestimonial]?.name}
                  </h4>
                  <p className="text-blue-600 font-semibold text-lg mb-2">
                    {filteredTestimonials[currentTestimonial]?.role}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span className="text-sm font-medium">{filteredTestimonials[currentTestimonial]?.propertyType}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">{filteredTestimonials[currentTestimonial]?.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-10 space-x-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300 w-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {successMetrics.map((metric, index) => (
            <div key={index} className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <metric.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {metric.metric}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center group">
              <div className={`bg-gradient-to-br ${achievement.bgColor} rounded-3xl p-8 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                <div className={`w-20 h-20 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <achievement.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials */}
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Watch Real Student Journeys
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, title: 'From Search to Home in 48 Hours', student: 'Priya\'s Journey', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
              { id: 2, title: 'Finding the Perfect Roommate', student: 'Rajesh\'s Story', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
              { id: 3, title: 'Safe & Secure Student Living', student: 'Sneha\'s Experience', image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg' }
            ].map((video) => (
              <div key={video.id} className="relative group cursor-pointer">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="h-8 w-8 text-blue-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      LIVE
                    </div>
                  </div>
                  <h4 className="text-gray-900 font-bold text-lg mb-2">{video.title}</h4>
                  <p className="text-blue-600 font-semibold mb-2">{video.student}</p>
                  <p className="text-gray-600 text-sm">Watch how HomeDaze transformed their housing search experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Shield className="h-4 w-4" />
              <span>Why Students Trust HomeDaze</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Built Specifically for Students
            </h3>
            <p className="text-xl text-blue-100">
              Every feature designed with student needs and safety in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4">100% Verified Properties</h4>
              <p className="text-blue-100 leading-relaxed">Every property and owner is thoroughly verified by our expert team for complete safety and authenticity</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Direct Owner Chat</h4>
              <p className="text-blue-100 leading-relaxed">Chat directly with property owners instantly without any middleman or hidden charges</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Student-First Approach</h4>
              <p className="text-blue-100 leading-relaxed">Designed with students' budgets, needs, and safety as our top priority</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-white/50 shadow-2xl">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-600 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <TrendingUp className="h-4 w-4" />
              <span>Join the Success Stories</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Start your journey with 6 free chats and find your perfect home today. Join thousands of happy students!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3">
                <MessageCircle className="h-5 w-5" />
                <span>Start Free Chat</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold text-lg">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;