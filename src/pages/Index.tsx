
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Globe, Leaf, Award } from "lucide-react";
import { useState } from "react";
import MapComponent from "@/components/map/MapComponent";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    source: null as { lat: number; lng: number; address: string } | null,
    destination: null as { lat: number; lng: number; address: string } | null,
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/30 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-eco px-3 py-1 text-sm text-white mb-4">
                Eco-friendly transportation
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Share Rides, <span className="text-eco">Save the Planet</span>
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Join our community of eco-conscious travelers. Reduce your carbon footprint, share costs, and make new connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild size="lg">
                  <Link to="/rides">Find a Ride</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/offer">Offer a Ride</Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:ml-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl transform rotate-1"></div>
              <img 
                src="https://images.unsplash.com/photo-1464564531096-f0163633a18a?auto=format&fit=crop&q=80&w=1200" 
                alt="People carpooling" 
                className="relative z-10 rounded-2xl shadow-lg w-full object-cover h-[300px] md:h-[400px]"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md z-20 max-w-xs">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Leaf className="text-eco h-4 w-4" />
                  <span>-28% CO₂ with shared rides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route Finder Section */}
      <section className="py-16 container px-4 md:px-6">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Plan Your Eco-Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your starting point and destination to find available rides or calculate your potential carbon impact
          </p>
        </div>
        
        <MapComponent 
          onSourceSelect={(location) => setSelectedLocation({...selectedLocation, source: location})}
          onDestinationSelect={(location) => setSelectedLocation({...selectedLocation, destination: location})}
          className="mx-auto max-w-4xl"
        />
        
        <div className="mt-6 text-center">
          <Button 
            asChild 
            disabled={!selectedLocation.source || !selectedLocation.destination}
            className="gap-1"
          >
            <Link to="/rides">
              Find Available Rides
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">How EcoRide Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and sustainable carpooling in just a few steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-eco" />
              </div>
              <h3 className="font-bold text-lg mb-2">Search Routes</h3>
              <p className="text-muted-foreground">
                Enter your starting point and destination to find rides along your route
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-eco" />
              </div>
              <h3 className="font-bold text-lg mb-2">Book or Offer</h3>
              <p className="text-muted-foreground">
                Reserve your seat in a ride or offer your own to the community
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-eco" />
              </div>
              <h3 className="font-bold text-lg mb-2">Track Impact</h3>
              <p className="text-muted-foreground">
                See how many CO₂ emissions you've helped save with each shared ride
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-16 container px-4 md:px-6">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Your Impact Matters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the difference carpooling can make to our environment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Carpooling Impact</h3>
              <Award className="h-6 w-6 text-eco" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">CO₂ Reduced</span>
                <div className="font-medium">15,230 kg</div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Rides Shared</span>
                <div className="font-medium">4,583</div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Users</span>
                <div className="font-medium">2,140</div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Trees Equivalent</span>
                <div className="font-medium">635 trees</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Emissions Calculator</h3>
              <Leaf className="h-6 w-6 text-eco" />
            </div>
            
            <p className="mb-4 text-muted-foreground">
              Curious about how much you're saving? Use our carbon calculator to see your environmental impact.
            </p>
            
            <Button asChild>
              <Link to="/calculator" className="w-full">
                Try Carbon Calculator
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-eco text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Start sharing rides, reducing costs, and saving the planet today. Create your account in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white hover:bg-white hover:text-eco">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
