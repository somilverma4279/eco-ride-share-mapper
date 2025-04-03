
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MapComponent from "@/components/map/MapComponent";
import { Calendar, Car, Clock, IndianRupee, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

const OfferRide = () => {
  const { isAuthenticated } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState({
    source: null as { lat: number; lng: number; address: string } | null,
    destination: null as { lat: number; lng: number; address: string } | null,
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(2);
  const [price, setPrice] = useState(500);  // Default price in INR

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation.source || !selectedLocation.destination) {
      toast({
        variant: "destructive",
        title: "Missing locations",
        description: "Please select both pickup and drop-off locations",
      });
      return;
    }
    
    if (!date || !time) {
      toast({
        variant: "destructive",
        title: "Missing date/time",
        description: "Please select both date and time for your ride",
      });
      return;
    }
    
    toast({
      title: "Ride offered successfully!",
      description: "Your ride has been posted and is now visible to potential passengers.",
    });
    
    // In a real app, we would send this data to the server
    console.log("Ride offered:", {
      source: selectedLocation.source,
      destination: selectedLocation.destination,
      date,
      time,
      seats,
      price,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in or register to offer a ride</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button asChild variant="default">
              <a href="/login">Log In</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/register">Register</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Offer a Ride</h1>
        <p className="text-muted-foreground">
          Share your journey with others, reduce carbon emissions, and split costs
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Ride Details</CardTitle>
              <CardDescription>Enter the information about your journey</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label>Route</Label>
                <MapComponent 
                  onSourceSelect={(location) => setSelectedLocation({...selectedLocation, source: location})}
                  onDestinationSelect={(location) => setSelectedLocation({...selectedLocation, destination: location})}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Departure Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="seats" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Available Seats
                    </Label>
                    <span className="text-sm font-medium">{seats}</span>
                  </div>
                  <Slider
                    id="seats"
                    min={1}
                    max={6}
                    step={1}
                    value={[seats]}
                    onValueChange={(values) => setSeats(values[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between pt-1">
                    <span className="text-xs text-muted-foreground">1 seat</span>
                    <span className="text-xs text-muted-foreground">6 seats</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="price" className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4" />
                      Price per Seat (₹)
                    </Label>
                    <span className="text-sm font-medium">₹{price}</span>
                  </div>
                  <Slider
                    id="price"
                    min={0}
                    max={2000}
                    step={50}
                    value={[price]}
                    onValueChange={(values) => setPrice(values[0])}
                    className="mt-2"
                  />
                  <div className="flex justify-between pt-1">
                    <span className="text-xs text-muted-foreground">₹0</span>
                    <span className="text-xs text-muted-foreground">₹2000</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <Button type="submit" size="lg" className="gap-2">
                  <Car className="h-4 w-4" />
                  Publish Ride
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default OfferRide;
