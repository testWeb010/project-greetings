import React from 'react';
import { ArrowRight, Users, Shield, Award, Phone, Mail, MapPin, Download, Star, CheckCircle, MessageCircle, Zap, Crown, Heart, TrendingUp, Building, Sparkles, Globe, Clock } from 'lucide-react';

const CallToAction: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: '100% Verified Properties',
      description: 'Every property is verified by our expert team for your safety and security',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50'
    },
    {
      icon: MessageCircle,
      title: 'Direct Chat with Owners',
      description: 'Chat directly without any middleman interference or hidden charges',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Crown,
      title: 'Premium Student Experience',
      description: 'Designed specifically for students and young professionals across India',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: '+91 98765 43210',
      action: 'Call Now',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'support@homedaze.com',
      action: 'Send Email',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Mumbai, Delhi, Bangalore',
      action: 'Find Office',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  const achievements = [
    { number: '50L+', label: 'Happy Students', icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50' },
    { number: '10L+', label: 'Properties Listed', icon: Building, color: 'from-emerald-500 to-green-500', bgColor: 'from-emerald-50 to-green-50' },
    { number: '500+', label: 'Cities Covered', icon: Globe, color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50' },
    { number: '99%', label: 'Satisfaction Rate', icon: Star, color: 'from-orange-500 to-red-500', bgColor: 'from-orange-50 to-red-50' },
  ];

  const appFeatures = [
    { icon: Zap, title: 'Lightning Fast', description: 'Find properties in seconds' },
    { icon: Shield, title: 'Secure & Safe', description: 'Your data is protected' },
    { icon: Clock, title: '24/7 Support', description: 'Always here to help' },
    { icon: Heart, title: 'Student Friendly', description: 'Built for students' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-2xl blur-3xl animate-pulse delay-1000 transform rotate-12"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-200">
            <TrendingUp className="h-4 w-4" />
            <span>Join 50L+ Happy Students</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Ready to Find Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Perfect Home?
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Join thousands of satisfied students who found their dream homes with India's most trusted rental platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 flex items-center justify-center space-x-3">
              <MessageCircle className="h-6 w-6" />
              <span>Start Free Chat</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-3">
              <Download className="h-6 w-6" />
              <span>Download App</span>
            </button>
          </div>

          {/* App Store Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <div className="bg-black rounded-2xl p-4 hover:bg-gray-800 transition-colors cursor-pointer group transform hover:scale-105">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-lg">📱</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-300">Download on the</div>
                  <div className="text-white font-semibold text-lg">App Store</div>
                </div>
              </div>
            </div>
            <div className="bg-black rounded-2xl p-4 hover:bg-gray-800 transition-colors cursor-pointer group transform hover:scale-105">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-lg">🤖</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-300">Get it on</div>
                  <div className="text-white font-semibold text-lg">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className={`bg-gradient-to-br ${feature.bgColor} rounded-3xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 text-center`}>
                <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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

        {/* Contact Methods */}
        <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Need Help? We're Here for You
            </h3>
            <p className="text-xl text-gray-600">
              Get in touch with our property experts for personalized assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${method.bgColor} rounded-2xl p-8 border border-white/50 hover:shadow-lg transition-all duration-300 text-center`}>
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h4>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <button className={`bg-gradient-to-r ${method.color} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold transform hover:scale-105`}>
                    {method.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Features Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Mobile App Features</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">
              Download Our App for Better Experience
            </h3>
            <p className="text-xl text-blue-100">
              Get instant notifications, faster search, and exclusive mobile-only features
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {appFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-white">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">RERA Approved</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">Secure Transactions</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-600 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Crown className="h-4 w-4" />
              <span>Limited Time Offer</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Start Your Journey Today
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Get 6 free chats and find your perfect home within minutes. No hidden charges, no brokerage fees!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-10 py-4 rounded-2xl hover:from-emerald-700 hover:to-green-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Start Free Chat</span>
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-2xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold text-lg">
                View Membership Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;