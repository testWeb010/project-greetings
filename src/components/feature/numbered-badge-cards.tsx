"use client"

import { Search, MessageCircle, Home } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface DataItem {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

const DATA: DataItem[] = [
  {
    id: 1,
    number: "01",
    title: "Search & Filter",
    description:
      "Browse through verified properties with advanced filters for location, budget, and amenities",
    image:
      "https://images.unsplash.com/photo-1751755359997-40f4fb2293cd?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    number: "02",
    title: "Connect Directly",
    description:
      "Contact property owners directly through our secure messaging system",
    image:
      "https://images.unsplash.com/photo-1680499661732-3cfae4690e1c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    number: "03",
    title: "Move In",
    description:
      "Complete documentation online and move into your perfect home",
    image:
      "https://plus.unsplash.com/premium_photo-1676303291138-d44a46bd7c5d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const NumberedBadgeCards = () => {
  return (
    <section className="bg-accent py-32">
      <div className="container">
        <div className="flex flex-col items-center pb-4 text-center">
          <div>
            <span className="my-3 mb-4 flex items-center justify-center">
              <Badge variant="outline" className="bg-background px-3 py-1">
                <Home className="mr-2 h-4 w-4" />
                <p className="text-xs text-black">Simple Process</p>
              </Badge>
            </span>
          </div>
          <h1 className="pb-3 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            How HomeDaze Works
          </h1>
          <p className="text-muted-foreground max-w-md text-sm lg:max-w-2xl lg:text-lg">
            Find your perfect rental home in just three simple steps.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 md:px-8 lg:grid-cols-3 lg:px-12">
          {DATA.map((feature) => (
            <div
              key={feature.id}
              className="bg-background grid grid-cols-1 rounded-2xl border shadow-sm"
            >
              <div className="p-6">
                <div className="bg-primary text-primary-foreground inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                  {feature.number}
                </div>
                <p className="text-md my-4 font-semibold">{feature.title}</p>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="mt-auto flex min-h-[200px] justify-center rounded-b-2xl">
                <div className="h-[200px] w-full">
                  <img
                    src={feature.image}
                    alt="placeholder"
                    className="h-full w-full rounded-b-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { NumberedBadgeCards };