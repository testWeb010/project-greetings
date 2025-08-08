"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronDown, 
  ChevronUp, 
  X, 
  Filter,
  MapPin,
  Calendar,
  Home,
  Wifi,
  Car,
  Dumbbell,
  Wind,
  Utensils,
  Shield,
  Users,
  Heart
} from "lucide-react"

interface FilterState {
  propertyTypes: string[]
  location: string
  priceRange: [number, number]
  amenities: string[]
  roomPreferences: string[]
  moveInDate: string
  additionalFilters: string[]
}

interface AdvancedFilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  onFiltersChange: (filters: FilterState) => void
  isMobile?: boolean
}

const PROPERTY_TYPES = [
  { id: "pg", label: "PG", icon: Users },
  { id: "apartment", label: "Apartment", icon: Home },
  { id: "single_room", label: "Single Room", icon: Home }
]

const AMENITIES = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "ac", label: "AC", icon: Wind },
  { id: "parking", label: "Parking", icon: Car },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "kitchen", label: "Kitchen", icon: Utensils },
  { id: "security", label: "Security", icon: Shield }
]

const ROOM_PREFERENCES = [
  { id: "furnished", label: "Furnished" },
  { id: "unfurnished", label: "Unfurnished" },
  { id: "attached_bathroom", label: "Attached Bathroom" },
  { id: "shared_bathroom", label: "Shared Bathroom" }
]

const ADDITIONAL_FILTERS = [
  { id: "pet_friendly", label: "Pet Friendly" },
  { id: "female_only", label: "Female Only" },
  { id: "male_only", label: "Male Only" },
  { id: "couple_friendly", label: "Couple Friendly" },
  { id: "smoking_allowed", label: "Smoking Allowed" }
]

export default function AdvancedFilterSidebar({ 
  isOpen, 
  onClose, 
  onFiltersChange,
  isMobile = false 
}: AdvancedFilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    propertyTypes: [],
    location: "",
    priceRange: [0, 50000],
    amenities: [],
    roomPreferences: [],
    moveInDate: "",
    additionalFilters: []
  })

  const [expandedSections, setExpandedSections] = useState({
    propertyType: true,
    location: true,
    priceRange: true,
    amenities: true,
    roomPreferences: false,
    moveInDate: false,
    additionalFilters: false
  })

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }, [])

  const updateFilters = useCallback((key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }, [filters, onFiltersChange])

  const toggleArrayFilter = useCallback((key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFilters(key, newArray)
  }, [filters, updateFilters])

  const clearFilters = useCallback(() => {
    const clearedFilters: FilterState = {
      propertyTypes: [],
      location: "",
      priceRange: [0, 50000],
      amenities: [],
      roomPreferences: [],
      moveInDate: "",
      additionalFilters: []
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }, [onFiltersChange])

  const getActiveFilterCount = useCallback(() => {
    let count = 0
    if (filters.propertyTypes.length > 0) count++
    if (filters.location.trim() !== "") count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) count++
    if (filters.amenities.length > 0) count++
    if (filters.roomPreferences.length > 0) count++
    if (filters.moveInDate !== "") count++
    if (filters.additionalFilters.length > 0) count++
    return count
  }, [filters])

  const FilterSection = ({ 
    title, 
    sectionKey, 
    children 
  }: { 
    title: string
    sectionKey: string
    children: React.ReactNode 
  }) => (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-2 text-left group"
      >
        <h3 className="text-base font-medium text-neutral-dark font-[var(--font-display)]">
          {title}
        </h3>
        {expandedSections[sectionKey as keyof typeof expandedSections] ? (
          <ChevronUp className="h-4 w-4 text-neutral-medium transition-colors group-hover:text-neutral-dark" />
        ) : (
          <ChevronDown className="h-4 w-4 text-neutral-medium transition-colors group-hover:text-neutral-dark" />
        )}
      </button>
      <AnimatePresence>
        {expandedSections[sectionKey as keyof typeof expandedSections] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const sidebarContent = (
    <div className="bg-card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium text-neutral-dark font-[var(--font-display)]">
            Filters
          </h2>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="bg-primary-light text-primary">
              {getActiveFilterCount()}
            </Badge>
          )}
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Property Type */}
        <FilterSection title="Property Type" sectionKey="propertyType">
          <div className="grid grid-cols-1 gap-2">
            {PROPERTY_TYPES.map((type) => {
              const Icon = type.icon
              return (
                <label
                  key={type.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    filters.propertyTypes.includes(type.id)
                      ? "border-primary bg-primary-light"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <Checkbox
                    checked={filters.propertyTypes.includes(type.id)}
                    onCheckedChange={() => toggleArrayFilter("propertyTypes", type.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Icon className="h-4 w-4 text-neutral-medium" />
                  <span className="text-sm font-medium text-neutral-dark">
                    {type.label}
                  </span>
                </label>
              )
            })}
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection title="Location" sectionKey="location">
          <div className="space-y-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-medium" />
              <Input
                placeholder="Enter location or area"
                value={filters.location}
                onChange={(e) => updateFilters("location", e.target.value)}
                className="pl-10 bg-card border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" sectionKey="priceRange">
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters("priceRange", value)}
              max={50000}
              min={0}
              step={500}
              className="w-full"
            />
            <div className="flex items-center gap-2 text-sm">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => updateFilters("priceRange", [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                className="w-20 h-8 text-xs bg-card border-border"
              />
              <span className="text-neutral-medium">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilters("priceRange", [filters.priceRange[0], parseInt(e.target.value) || 50000])}
                className="w-20 h-8 text-xs bg-card border-border"
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-medium font-[var(--font-mono)]">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection title="Amenities" sectionKey="amenities">
          <div className="grid grid-cols-2 gap-2">
            {AMENITIES.map((amenity) => {
              const Icon = amenity.icon
              return (
                <label
                  key={amenity.id}
                  className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                    filters.amenities.includes(amenity.id)
                      ? "border-primary bg-primary-light"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <Checkbox
                    checked={filters.amenities.includes(amenity.id)}
                    onCheckedChange={() => toggleArrayFilter("amenities", amenity.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Icon className="h-4 w-4 text-neutral-medium" />
                  <span className="text-xs font-medium text-neutral-dark">
                    {amenity.label}
                  </span>
                </label>
              )
            })}
          </div>
        </FilterSection>

        {/* Room Preferences */}