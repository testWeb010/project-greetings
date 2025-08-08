"use client"

import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Wifi, Car, Snowflake, Heart, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PropertyAmenity {
  id: string
  name: string
  icon: React.ReactNode
}

interface PropertyStats {
  bedrooms: number
  bathrooms: number
  area: number
}

interface Property {
  id: string
  images: string[]
  type: string
  title: string
  location: string
  pricePerMonth: number
  amenities: string[]
  stats: PropertyStats
  isVerified: boolean
  isSaved?: boolean
}

interface PropertyListingGridProps {
  properties: Property[]
  loading?: boolean
  onContactOwner: (propertyId: string) => void
  onToggleSave: (propertyId: string) => void
  className?: string
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  ac: <Snowflake className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />,
}

const PropertyCard: React.FC<{
  property: Property
  onContactOwner: (propertyId: string) => void
  onToggleSave: (propertyId: string) => void
}> = ({ property, onContactOwner, onToggleSave }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <Card className="bg-card border border-border hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <div className="relative">
        {/* Image Carousel */}
        <div className="relative h-48 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-neutral-light animate-pulse" />
          )}
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={handleImageLoad}
          />
          
          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronLeft className="h-4 w-4 text-neutral-dark" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronRight className="h-4 w-4 text-neutral-dark" />
              </button>
            </>
          )}
          
          {/* Image Dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    index === currentImageIndex
                      ? "bg-white scale-110"
                      : "bg-white/60 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Property Type Badge */}
        <Badge 
          variant="secondary"
          className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-medium"
        >
          {property.type}
        </Badge>

        {/* Save Button */}
        <button
          onClick={() => onToggleSave(property.id)}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200"
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors duration-200",
              property.isSaved 
                ? "fill-destructive text-destructive" 
                : "text-neutral-medium hover:text-destructive"
            )}
          />
        </button>
      </div>

      <CardContent className="p-4 bg-card">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-display font-bold text-lg text-foreground mb-1 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center text-neutral-medium text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="font-mono font-bold text-xl text-foreground">
            ₹{property.pricePerMonth.toLocaleString()}
          </span>
          <span className="text-neutral-medium text-sm ml-1">/month</span>
        </div>

        {/* Amenities */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-1 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs"
              >
                {AMENITY_ICONS[amenity.toLowerCase()] || <div className="w-4 h-4" />}
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
            {property.amenities.length > 3 && (
              <div className="flex items-center bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs">
                +{property.amenities.length - 3} more
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-neutral-medium text-sm mb-4">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.stats.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.stats.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{property.stats.area} sq ft</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Verified Badge */}
          {property.isVerified && (
            <div className="flex items-center gap-1 text-secondary text-xs">
              <Shield className="h-4 w-4" />
              <span>Verified Owner</span>
            </div>
          )}
          
          {/* Contact Button */}
          <Button 
            onClick={() => onContactOwner(property.id)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 text-sm ml-auto"
          >
            Contact Owner
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const PropertyListingGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <Card key={index} className="bg-card border border-border overflow-hidden">
        <div className="h-48 bg-neutral-light animate-pulse" />
        <CardContent className="p-4 bg-card">
          <div className="space-y-3">
            <div className="h-6 bg-neutral-light rounded animate-pulse" />
            <div className="h-4 bg-neutral-light rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-neutral-light rounded w-1/2 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-6 bg-neutral-light rounded w-16 animate-pulse" />
              <div className="h-6 bg-neutral-light rounded w-16 animate-pulse" />
              <div className="h-6 bg-neutral-light rounded w-16 animate-pulse" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-neutral-light rounded w-20 animate-pulse" />
              <div className="h-9 bg-neutral-light rounded w-28 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const EmptyState: React.FC = () => (
  <div className="text-center py-12 bg-card">
    <div className="max-w-md mx-auto">
      <div className="w-16 h-16 bg-neutral-light rounded-full flex items-center justify-center mx-auto mb-4">
        <MapPin className="h-8 w-8 text-neutral-medium" />
      </div>
      <h3 className="font-display font-bold text-xl text-foreground mb-2">
        No properties found
      </h3>
      <p className="text-neutral-medium">
        Try adjusting your search criteria to find more properties that match your needs.
      </p>
    </div>
  </div>
)

export default function PropertyListingGrid({
  properties,
  loading = false,
  onContactOwner,
  onToggleSave,
  className
}: PropertyListingGridProps) {
  if (loading) {
    return <PropertyListingGridSkeleton />
  }

  if (properties.length === 0) {
    return <EmptyState />
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onContactOwner={onContactOwner}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  )
}