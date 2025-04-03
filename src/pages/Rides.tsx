
import { useState } from "react";
import MapComponent from "@/components/map/MapComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Navigation, User, Users, Leaf, IndianRupee } from "lucide-react";

// Updated mock data with Indian locations and prices in INR
const mockRides = [
  {
    id: '1',
    driver: {
      name: 'Rajesh K.',
      rating: 4.8,
      trips: 42
    },
    source: {
      address: 'Mumbai, Maharashtra, India',
      lat: 19.076, 
      lng: 72.8777
    },
    destination: {
      address: 'Pune, Maharashtra, India',
      lat: 18.5204, 
      lng: 73.8567
    },
    date: '2023-08-15',
    time: '08:30',
    seats: 3,
    price: 450,
    carbonSaved: 4.3
  },
  {
    id: '2',
    driver: {
      name: 'Priya S.',
      rating: 4.9,
      trips: 78
    },
    source: {
      address: 'Delhi, India',
      lat: 28.7041, 
      lng: 77.1025
    },
    destination: {
      address: 'Jaipur, Rajasthan, India',
      lat: 26.9124, 
      lng: 75.7873
    },
    date: '2023-08-15',
    time: '09:15',
    seats: 2,
    price: 580,
    carbonSaved: 3.8
  },
  {
    id: '3',
    driver: {
      name: 'Amit R.',
      rating: 4.7,
      trips: 23
    },
    source: {
      address: 'Bangalore, Karnataka, India',
      lat: 12.9716, 
      lng: 77.5946
    },
    destination: {
      address: 'Chennai, Tamil Nadu, India',
      lat: 13.0827, 
      lng: 80.2707
    },
    date: '2023-08-16',
    time: '10:00',
    seats: 4,
    price: 650,
    carbonSaved: 5.2
  },
  {
    id: '4',
    driver: {
      name: 'Sunita M.',
      rating: 4.8,
      trips: 56
    },
    source: {
      address: 'Hyderabad, Telangana, India',
      lat: 17.385, 
      lng: 78.4867
    },
    destination: {
      address: 'Bangalore, Karnataka, India',
      lat: 12.9716, 
      lng: 77.5946
    },
    date: '2023-08-17',
    time: '07:45',
    seats: 3,
    price: 720,
    carbonSaved: 4.7
  }
];

const Rides = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    source: null as { lat: number; lng: number; address: string } | null,
    destination: null as { lat: number; lng: number; address: string } | null,
  });
  const [filteredRides, setFilteredRides] = useState(mockRides);
  const [isSearching, setIsSearching] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = () => {
    if (!selectedLocation.source || !selectedLocation.destination) {
      return;
    }
    
    setIsSearching(true);
    setSearchActive(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Filter rides based on source and destination
      const filtered = mockRides.filter(ride => {
        const sourceMatch = selectedLocation.source && 
          ride.source.address.toLowerCase().includes(selectedLocation.source.address.toLowerCase());
        const destMatch = selectedLocation.destination && 
          ride.destination.address.toLowerCase().includes(selectedLocation.destination.address.toLowerCase());
        
        return sourceMatch || destMatch;
      });
      
      setFilteredRides(filtered.length > 0 ? filtered : []);
      setIsSearching(false);
    }, 1000);
  };

  const resetSearch = () => {
    setSelectedLocation({
      source: null,
      destination: null
    });
    setFilteredRides(mockRides);
    setSearchActive(false);
  };

  return (
    <div className="container py-8 md:py-12 space-y-8 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Available Rides</h1>
        <p className="text-muted-foreground">
          Search for carpooling opportunities across India and beyond
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <MapComponent 
              onSourceSelect={(location) => setSelectedLocation({...selectedLocation, source: location})}
              onDestinationSelect={(location) => setSelectedLocation({...selectedLocation, destination: location})}
            />
            
            <div className="flex gap-3">
              <Button 
                className="flex-1" 
                onClick={handleSearch}
                disabled={isSearching || !selectedLocation.source || !selectedLocation.destination}
              >
                {isSearching ? "Searching..." : "Search Rides"}
              </Button>
              
              {searchActive && (
                <Button 
                  variant="outline" 
                  onClick={resetSearch}
                >
                  Reset
                </Button>
              )}
            </div>
            
            {selectedLocation.source && selectedLocation.destination && (
              <Card className="p-3 bg-muted/30">
                <div className="text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-eco-dark shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-xs">From:</div>
                      <div>{selectedLocation.source.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Navigation className="h-4 w-4 text-eco-dark shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-xs">To:</div>
                      <div>{selectedLocation.destination.address}</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <h2 className="font-medium text-xl mb-4 flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-eco" />
            Available Rides
          </h2>
          
          <div className="space-y-4">
            {filteredRides.map(ride => (
              <Card key={ride.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="grid md:grid-cols-3 gap-4">
                  <CardHeader className="md:col-span-2 p-4 md:p-6 space-y-2 pb-0 md:pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{ride.driver.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.driver.rating} ⭐ • {ride.driver.trips} trips
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-eco">
                        <Leaf className="h-4 w-4 mr-1" />
                        <span className="font-medium">{ride.carbonSaved} kg</span>
                      </div>
                    </div>
                    
                    <div className="grid gap-3 pt-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-eco-dark shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">From</div>
                          <div className="text-sm text-muted-foreground">{ride.source.address}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Navigation className="h-5 w-5 text-eco-dark shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">To</div>
                          <div className="text-sm text-muted-foreground">{ride.destination.address}</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 md:p-6 pt-0 md:pt-6 md:border-l border-border">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{ride.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{ride.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{ride.seats} seats available</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xl font-semibold">
                        <IndianRupee className="h-5 w-5" />
                        <span>{ride.price}</span>
                      </div>
                      
                      <Button className="w-full">Book Ride</Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
            
            {filteredRides.length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="font-medium text-lg mb-2">No rides found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or offer a ride yourself
                </p>
                <Button className="mt-4" variant="outline" asChild>
                  <a href="/offer">Offer a Ride</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rides;
