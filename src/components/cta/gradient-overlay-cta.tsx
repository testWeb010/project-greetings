"use client";

import { Button } from "@/components/ui/button";

const GradientOverlayCta = () => {
  return (
    <section className="py-32 bg-neutral-light">
      <div className="container">
        <div className="flex h-[620px] items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.2)),url('https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg')] bg-cover bg-center">
          <div className="flex flex-col gap-12 p-4 text-center max-w-4xl">
            <div className="space-y-6">
              <h2 className="text-primary-foreground text-5xl font-[var(--font-display)] font-bold">
                Ready to Find Your Perfect Home?
              </h2>
              <p className="text-primary-foreground/90 text-xl font-[var(--font-body)] max-w-3xl mx-auto">
                Whether you're searching for your ideal rental or looking to list your property, 
                HomeDaze connects you with the right opportunities in minutes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Tenant Section */}
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="text-primary-foreground text-2xl font-[var(--font-display)] font-bold">
                  For Tenants
                </h3>
                <p className="text-primary-foreground/80 text-center font-[var(--font-body)]">
                  Discover verified properties, connect with trusted owners, and find your next home effortlessly.
                </p>
                <Button size="lg" variant="default" className="w-full bg-primary hover:bg-primary/90">
                  Start Searching
                </Button>
              </div>

              {/* Owner Section */}
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="text-primary-foreground text-2xl font-[var(--font-display)] font-bold">
                  For Property Owners
                </h3>
                <p className="text-primary-foreground/80 text-center font-[var(--font-body)]">
                  List your property, reach qualified tenants, and manage everything from one platform.
                </p>
                <Button size="lg" variant="secondary" className="w-full bg-secondary hover:bg-secondary/90">
                  List Property
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { GradientOverlayCta };