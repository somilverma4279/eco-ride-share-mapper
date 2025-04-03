
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Car, Calendar, MapPin, Navigation, Clock, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock rides data
const mockUpcomingRides = [] as any[];
const mockPastRides = [
  {
    id: '1',
    type: 'offered',
    source: 'Central Park, New York',
    destination: 'Brooklyn Bridge, New York',
    date: '2023-07-25',
    time: '08:30',
    passengers: 2,
    carbonSaved: 3.2
  },
  {
    id: '2',
    type: 'booked',
    source: 'Times Square, New York',
    destination: 'Grand Central Terminal, New York',
    date: '2023-07-20',
    time: '09:15',
    driver: 'Sarah M.',
    carbonSaved: 1.8
  },
];

const MyRides = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardContent>
              <p className="mb-4">Please log in or register to view your rides</p>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/login">Log In</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/register">Register</a>
                </Button>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Rides</h1>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming Rides</TabsTrigger>
            <TabsTrigger value="past">Past Rides</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {mockUpcomingRides.length > 0 ? (
              <div className="space-y-6">
                {/* Map through upcoming rides */}
              </div>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="p-12 text-center">
                  <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium text-lg mb-2">No upcoming rides</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any scheduled rides. Book or offer a ride to get started.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <a href="/rides">Find a Ride</a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="/offer">Offer a Ride</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {mockPastRides.length > 0 ? (
              <div className="space-y-6">
                {mockPastRides.map(ride => (
                  <Card key={ride.id} className="overflow-hidden">
                    <div className="flex items-center p-4 bg-muted/30 border-b">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-eco/10 text-eco text-xs font-medium rounded">
                            {ride.type === 'offered' ? 'You offered this ride' : 'You booked this ride'}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {ride.date}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm flex items-center">
                        <span className="flex items-center gap-1 text-eco">
                          <Car className="h-4 w-4" />
                          {ride.carbonSaved} kg CO₂ saved
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-eco-dark shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">From</div>
                              <div className="text-muted-foreground">{ride.source}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Navigation className="h-5 w-5 text-eco-dark shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">To</div>
                              <div className="text-muted-foreground">{ride.destination}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{ride.date}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{ride.time}</span>
                            </div>
                          </div>
                          
                          {ride.type === 'offered' ? (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{ride.passengers} passengers joined</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4 text-muted-foreground" />
                              <span>Driver: {ride.driver}</span>
                            </div>
                          )}
                          
                          <Button variant="outline" className="w-full sm:w-auto">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="p-12 text-center">
                  <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium text-lg mb-2">No past rides</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't completed any rides yet. Book or offer a ride to get started.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <a href="/rides">Find a Ride</a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="/offer">Offer a Ride</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyRides;
