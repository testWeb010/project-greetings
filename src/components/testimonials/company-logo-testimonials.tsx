"use client";

import { User, GraduationCap, Briefcase, Home } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    icon: GraduationCap,
    quote:
      "Finding affordable PG accommodation near my college was so easy! The verified listings and transparent pricing saved me weeks of searching.",
    author: {
      name: "Priya Sharma",
      role: "Student",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Priya%20Sharma",
    },
  },
  {
    icon: Briefcase,
    quote:
      "As a working professional new to the city, HomeDaze helped me secure a great apartment with all amenities. The process was smooth and hassle-free.",
    author: {
      name: "Rahul Patel",
      role: "Working Professional",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rahul%20Patel",
    },
  },
  {
    icon: Home,
    quote:
      "I successfully rented out my 2BHK apartment within a week! The platform connects genuine tenants and the verification process gave me peace of mind.",
    author: {
      name: "Anjali Verma",
      role: "Property Owner",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Anjali%20Verma",
    },
  },
  {
    icon: GraduationCap,
    quote:
      "The detailed property descriptions and virtual tours helped me choose the perfect PG without even visiting. Highly recommended for students!",
    author: {
      name: "Vikram Singh",
      role: "Student",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Vikram%20Singh",
    },
  },
  {
    icon: Briefcase,
    quote:
      "Moving cities for work was stressful until I found HomeDaze. Got a furnished apartment with flexible lease terms that fit my job requirements perfectly.",
    author: {
      name: "Sneha Reddy",
      role: "Working Professional",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sneha%20Reddy",
    },
  },
  {
    icon: Home,
    quote:
      "The tenant screening and document verification features are excellent. I found reliable tenants for my property without any middleman hassles.",
    author: {
      name: "Kiran Kumar",
      role: "Property Owner",
      image: "https://api.dicebear.com/9.x/adventurer/svg?seed=Kiran%20Kumar",
    },
  },
];

const CompanyLogoTestimonials = () => {
  return (
    <section className="py-32 bg-neutral-light">
      <div className="border-y border-neutral-medium/20">
        <div className="container flex flex-col gap-6 border-x border-neutral-medium/20 py-4 max-lg:border-x lg:py-8">
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl text-neutral-dark">
            What Our Community Says
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Trusted by students, professionals, and property owners across the country
          </p>
        </div>
      </div>

      <div className="container mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => {
          const IconComponent = testimonial.icon;
          return (
            <Card
              key={index}
              className="flex flex-col gap-6 rounded-md bg-card p-6 shadow-sm border border-neutral-medium/20"
            >
              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>

              <blockquote className="text-muted-foreground text-lg font-normal italic">{`"${testimonial.quote}"`}</blockquote>

              <div className="mt-auto flex items-center gap-4">
                <img
                  src={testimonial.author.image}
                  alt={`${testimonial.author.name}'s profile picture`}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-lg tracking-[-0.36px] text-neutral-dark">
                    {testimonial.author.name}
                  </p>
                  <p className="text-muted-foreground">
                    {testimonial.author.role}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 h-8 w-full border-y border-neutral-medium/20 md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x border-neutral-medium/20"></div>
      </div>
    </section>
  );
};

export { CompanyLogoTestimonials };