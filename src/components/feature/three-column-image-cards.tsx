"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const propertyTypes = [
  {
    title: "PG Accommodations",
    description:
      "Shared living spaces with meals included. Perfect for students and young professionals seeking community living with hassle-free amenities.",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e460b1e1?q=80&w=1069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Private Apartments",
    description:
      "Independent living spaces with complete privacy and freedom. Ideal for those who prefer their own kitchen, bathroom, and living area.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Single Rooms",
    description:
      "Affordable private spaces with shared common areas. Great balance of privacy and community for budget-conscious individuals.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ThreeColumnImageCards = () => {
  return (
    <section className="py-32 bg-neutral-light">
      <div className="container">
        <div className="m-auto mb-24 max-w-xl text-center">
          <h2 className="mb-6 text-3xl font-semibold lg:text-5xl text-neutral-dark">
            Choose Your Ideal Living Space
          </h2>
          <p className="m-auto max-w-3xl text-lg lg:text-xl text-neutral-medium">
            From budget-friendly PGs to premium apartments, find the perfect match for your lifestyle and budget.
          </p>
          <div className="mt-8 flex flex-col items-center space-y-2">
            <Button
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              onClick={() => window.open("/browse", "_blank")}
            >
              Browse Properties
            </Button>
          </div>
        </div>
        <div className="mt-11 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {propertyTypes.map((property, index) => (
            <Card key={index} className="border-0 pt-0 bg-card">
              <img
                src={property.image}
                alt={property.title}
                className="aspect-video w-full rounded-t-xl object-cover"
              />
              <div className="p-5">
                <p className="mb-1 font-medium text-neutral-dark">{property.title}</p>
                <p className="text-muted-foreground">{property.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ThreeColumnImageCards };