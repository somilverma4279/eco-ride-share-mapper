
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock: In a real app, we'd use actual MapBox or Google Maps
const MapComponent: React.FC<{
  onSourceSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onDestinationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  className?: string;
}> = ({ onSourceSelect, onDestinationSelect, className }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [sourceQuery, setSourceQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const isMobile = useIsMobile();

  // Mock locations for demo
  const mockLocations = [
    { address: "Central Park, New York", lat: 40.785091, lng: -73.968285 },
    { address: "Brooklyn Bridge, New York", lat: 40.7061, lng: -73.9969 },
    { address: "Times Square, New York", lat: 40.7580, lng: -73.9855 },
    { address: "Grand Central Terminal, New York", lat: 40.7527, lng: -73.9772 },
  ];

  useEffect(() => {
    // In a real app, initialize map here
    const mapElement = mapContainerRef.current;
    if (!mapElement) return;

    // Mock map initialization
    setTimeout(() => {
      mapElement.classList.add("bg-sky-light/10");
      mapElement.innerHTML = `
        <div class="w-full h-full flex items-center justify-center text-muted-foreground flex-col">
          <div class="flex flex-col items-center mb-4">
            <MapPin className="h-12 w-12 mb-2 text-eco" />
            <p>Map would render here with actual MapBox/Google Maps integration</p>
          </div>
          <div class="text-sm">Example map showing route between selected locations</div>
        </div>
      `;
    }, 500);

    return () => {
      // Cleanup
    };
  }, []);

  const handleSearch = (type: "source" | "destination") => {
    setIsSearching(true);
    
    // Mock API call to get location suggestions
    setTimeout(() => {
      setIsSearching(false);
      
      const query = type === "source" ? sourceQuery : destinationQuery;
      
      if (!query.trim()) {
        toast({
          variant: "destructive",
          title: "Empty search",
          description: "Please enter a location to search",
        });
        return;
      }
      
      // Find matching location from our mock data
      const foundLocation = mockLocations.find(loc => 
        loc.address.toLowerCase().includes(query.toLowerCase())
      );
      
      if (foundLocation) {
        if (type === "source" && onSourceSelect) {
          onSourceSelect(foundLocation);
          toast({
            title: "Source location set",
            description: `Selected ${foundLocation.address}`,
          });
        } else if (type === "destination" && onDestinationSelect) {
          onDestinationSelect(foundLocation);
          toast({
            title: "Destination location set",
            description: `Selected ${foundLocation.address}`,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Location not found",
          description: "Try something like 'Central Park' or 'Times Square'",
        });
      }
    }, 800);
  };

  return (
    <Card className={`overflow-hidden ${className || ""}`}>
      <div className="flex flex-col md:flex-row h-[500px] md:h-[400px]">
        <div ref={mapContainerRef} className="flex-1 min-h-[250px] border border-border rounded-t-lg md:rounded-l-lg md:rounded-t-none transition-all duration-300 bg-muted/30">
          {/* Map will be rendered here */}
        </div>
        
        <CardContent className="flex flex-col gap-4 p-4 md:min-w-[300px] md:max-w-[350px]">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-eco" />
              Starting Point
            </h3>
            <div className="flex">
              <Input
                placeholder="Enter starting location"
                value={sourceQuery}
                onChange={(e) => setSourceQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button 
                variant="outline"
                size="icon"
                className="rounded-l-none border-l-0"
                onClick={() => handleSearch("source")}
                disabled={isSearching}
              >
                <Search size={16} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Navigation size={16} className="text-eco" />
              Destination
            </h3>
            <div className="flex">
              <Input
                placeholder="Enter destination"
                value={destinationQuery}
                onChange={(e) => setDestinationQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button 
                variant="outline"
                size="icon"
                className="rounded-l-none border-l-0"
                onClick={() => handleSearch("destination")}
                disabled={isSearching}
              >
                <Search size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              className="w-full gap-2"
              onClick={() => {
                if (sourceQuery && destinationQuery) {
                  handleSearch("source");
                  setTimeout(() => handleSearch("destination"), 500);
                } else {
                  toast({
                    variant: "destructive",
                    title: "Missing locations",
                    description: "Please enter both source and destination",
                  });
                }
              }}
            >
              <Navigation size={16} />
              <span>Set Route</span>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MapComponent;
