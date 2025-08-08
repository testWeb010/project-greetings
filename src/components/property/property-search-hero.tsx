"use client";

import { useState } from "react";
import { Search, MapPin, Home, Building, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PropertySearchHero = () => {
  const [selectedPropertyType, setSelectedPropertyType] = useState("all");
  const [searchLocation, setSearchLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const propertyTypes = [
    { id: "all", label: "All Properties", icon: Home },
    { id: "pg", label: "PG", icon: Building },
    { id: "apartments", label: "Apartments", icon: Building },
    { id: "rooms", label: "Single Rooms", icon: Users },
  ];

  const popularLocations = [
    "Koramangala",
    "Whitefield",
    "Electronic City",
    "HSR Layout",
    "Indiranagar",
    "Marathahalli",
    "Bellandur",
    "Jayanagar",
  ];

  const priceRanges = [
    "₹5,000 - ₹15,000",
    "₹15,000 - ₹25,000",
    "₹25,000 - ₹40,000",
    "₹40,000 - ₹60,000",
    "₹60,000+",
  ];

  return (
    <div className="bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-20 h-20 rotate-12">
          <Home className="w-full h-full text-primary" />
        </div>
        <div className="absolute top-40 right-20 w-16 h-16 rotate-45">
          <Building className="w-full h-full text-secondary" />
        </div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 -rotate-12">
          <Users className="w-full h-full text-highlight" />
        </div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 rotate-30">
          <MapPin className="w-full h-full text-primary" />
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-12">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight">
            Find Your Perfect Home with{" "}
            <span className="text-primary">HomeDaze</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-neutral-medium max-w-3xl mx-auto leading-relaxed">
            Connect with verified property owners and discover your ideal living space. 
            From cozy single rooms to spacious apartments, we make finding your next home simple and secure.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8 max-w-4xl mx-auto">
          {/* Property Type Toggles */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {propertyTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedPropertyType === type.id;
              
              return (
                <Button
                  key={type.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPropertyType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 transition-all duration-200 ${
                    isSelected 
                      ? "bg-primary text-primary-foreground shadow-md transform scale-105" 
                      : "bg-muted text-neutral-medium hover:bg-primary-light hover:text-primary border-border"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {type.label}
                </Button>
              );
            })}
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Location Search */}
            <div className="lg:col-span-2 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium w-5 h-5 z-10" />
              <Input
                placeholder="Enter location (e.g., Koramangala, Bangalore)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-11 h-12 text-base border-border focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
              />
            </div>

            {/* Price Range Selector */}
            <div className="relative">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12 text-base border-border focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range} className="text-base">
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button 
              size="lg" 
              className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>

          {/* Popular Locations */}
          <div className="text-center">
            <p className="text-sm text-neutral-medium mb-3 font-medium">
              Popular locations:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularLocations.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary-light hover:text-primary transition-colors duration-200 px-3 py-1 text-sm bg-muted text-neutral-medium border-border"
                  onClick={() => setSearchLocation(location)}
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 text-neutral-medium">
          <p className="text-sm">
            Join thousands of happy tenants and property owners on HomeDaze
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchHero;