import React from 'react';
import { Play } from 'lucide-react';

interface VideoTestimonial {
  id: number;
  title: string;
  student: string;
  image: string;
}

interface VideoTestimonialsProps {
  videos: VideoTestimonial[];
}

const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({
  videos
}) => {
  return (
    <div className="text-center mb-16">
      <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
        Watch Real Student Journeys
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videos.map((video) => (
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
                {/* Assuming 'LIVE' is a static indicator for now, could be dynamic */}
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
  );
};

export default VideoTestimonials;
