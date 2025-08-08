const SimpleGridStats = () => {
  return (
    <section className="py-32 bg-neutral-light">
      <div className="container">
        <h1 className="text-center text-4xl font-semibold lg:text-6xl font-[var(--font-display)] text-neutral-dark">
          Trusted by Thousands
        </h1>
        <div className="grid gap-10 pt-9 md:grid-cols-4 lg:gap-0 lg:pt-20">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Verified Properties
            </p>
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-primary">5000+</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              quality listings
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Happy Tenants
            </p>
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-primary">15000+</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              found their home
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Trusted Owners
            </p>
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-primary">2500+</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              listing with us
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Satisfaction Rate
            </p>
            <p className="pt-4 text-7xl font-semibold lg:pt-10 text-secondary">98%</p>
            <p className="text-2xl font-semibold text-muted-foreground">
              customer rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SimpleGridStats };