
import { useState } from "react";
import MapComponent from "@/components/map/MapComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Navigation, User, Users, Leaf } from "lucide-react";

// Mock data for rides
const mockRides = [
  {
    id: '1',
    driver: {
      name: 'John D.',
      rating: 4.8,
      trips: 42
    },
    source: {
      address: 'Central Park, New York',
      lat: 40.785091,
      lng: -73.968285
    },
    destination: {
      address: 'Brooklyn Bridge, New York',
      lat: 40.7061,
      lng: -73.9969
    },
    date: '2023-08-15',
    time: '08:30',
    seats: 3,
    price: 12,
    carbonSaved: 4.3
  },
  {
    id: '2',
    driver: {
      name: 'Sarah M.',
      rating: 4.9,
      trips: 78
    },
    source: {
      address: 'Times Square, New York',
      lat: 40.7580,
      lng: -73.9855
    },
    destination: {
      address: 'Grand Central Terminal, New York',
      lat: 40.7527,
      lng: -73.9772
    },
    date: '2023-08-15',
    time: '09:15',
    seats: 2,
    price: 8,
    carbonSaved: 2.1
  },
  {
    id: '3',
    driver: {
      name: 'Michael R.',
      rating: 4.7,
      trips: 23
    },
    source: {
      address: 'Central Park, New York',
      lat: 40.785091,
      lng: -73.968285
    },
    destination: {
      address: 'Grand Central Terminal, New York',
      lat: 40.7527,
      lng: -73.9772
    },
    date: '2023-08-16',
    time: '10:00',
    seats: 4,
    price: 15,
    carbonSaved: 5.2
  }
];

const Rides = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    source: null as { lat: number; lng: number; address: string } | null,
    destination: null as { lat: number; lng: number; address: string } | null,
  });
  const [filteredRides, setFilteredRides] = useState(mockRides);

  return (
    <div className="container py-8 md:py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Available Rides</h1>
        <p className="text-muted-foreground">
          Search for carpooling opportunities that match your route and schedule
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <MapComponent 
              onSourceSelect={(location) => setSelectedLocation({...selectedLocation, source: location})}
              onDestinationSelect={(location) => setSelectedLocation({...selectedLocation, destination: location})}
            />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <h2 className="font-medium text-xl mb-4">Available Rides</h2>
          
          <div className="space-y-4">
            {filteredRides.map(ride => (
              <Card key={ride.id} className="overflow-hidden">
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
                      
                      <div className="text-xl font-semibold">${ride.price}</div>
                      
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
                <Button className="mt-4" variant="outline">
                  Offer a Ride
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
