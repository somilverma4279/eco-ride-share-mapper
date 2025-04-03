
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search, Map as MapIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Extended mock locations to include Indian cities
const mockLocations = [
  { address: "Mumbai, Maharashtra, India", lat: 19.076, lng: 72.8777 },
  { address: "Delhi, India", lat: 28.7041, lng: 77.1025 },
  { address: "Bangalore, Karnataka, India", lat: 12.9716, lng: 77.5946 },
  { address: "Chennai, Tamil Nadu, India", lat: 13.0827, lng: 80.2707 },
  { address: "Kolkata, West Bengal, India", lat: 22.5726, lng: 88.3639 },
  { address: "Hyderabad, Telangana, India", lat: 17.385, lng: 78.4867 },
  { address: "Pune, Maharashtra, India", lat: 18.5204, lng: 73.8567 },
  { address: "Jaipur, Rajasthan, India", lat: 26.9124, lng: 75.7873 },
  // Global cities for international travel
  { address: "Central Park, New York", lat: 40.785091, lng: -73.968285 },
  { address: "Brooklyn Bridge, New York", lat: 40.7061, lng: -73.9969 },
  { address: "Times Square, New York", lat: 40.7580, lng: -73.9855 },
  { address: "Grand Central Terminal, New York", lat: 40.7527, lng: -73.9772 },
  { address: "London, United Kingdom", lat: 51.5074, lng: -0.1278 },
  { address: "Paris, France", lat: 48.8566, lng: 2.3522 },
  { address: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
  { address: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
];

const MapComponent: React.FC<{
  onSourceSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onDestinationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  className?: string;
}> = ({ onSourceSelect, onDestinationSelect, className }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [sourceQuery, setSourceQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ lat: number; lng: number; address: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeInput, setActiveInput] = useState<"source" | "destination" | null>(null);
  const isMobile = useIsMobile();

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
            <p>Map showing global locations with India as focus</p>
          </div>
          <div class="text-sm">Select any location worldwide for your ride</div>
        </div>
      `;
    }, 500);

    return () => {
      // Cleanup
    };
  }, []);

  const handleSearch = (type: "source" | "destination") => {
    setIsSearching(true);
    setShowSuggestions(false);
    
    const query = type === "source" ? sourceQuery : destinationQuery;
    
    if (!query.trim()) {
      toast({
        variant: "destructive",
        title: "Empty search",
        description: "Please enter a location to search",
      });
      setIsSearching(false);
      return;
    }
    
    // Find matching location from our mock data
    const foundLocation = mockLocations.find(loc => 
      loc.address.toLowerCase() === query.toLowerCase()
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
      // Filter matching locations
      const filteredLocations = mockLocations.filter(loc =>
        loc.address.toLowerCase().includes(query.toLowerCase())
      );
      
      if (filteredLocations.length > 0) {
        if (filteredLocations.length === 1) {
          // If only one match, select it directly
          const location = filteredLocations[0];
          if (type === "source" && onSourceSelect) {
            onSourceSelect(location);
            setSourceQuery(location.address);
            toast({
              title: "Source location set",
              description: `Selected ${location.address}`,
            });
          } else if (type === "destination" && onDestinationSelect) {
            onDestinationSelect(location);
            setDestinationQuery(location.address);
            toast({
              title: "Destination location set",
              description: `Selected ${location.address}`,
            });
          }
        } else {
          // If multiple matches, show suggestions
          setSuggestions(filteredLocations);
          setShowSuggestions(true);
          setActiveInput(type);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Location not found",
          description: "Try searching for a major city or landmark",
        });
      }
    }
    
    setIsSearching(false);
  };

  const handleSuggestionSelect = (location: { lat: number; lng: number; address: string }) => {
    if (activeInput === "source") {
      setSourceQuery(location.address);
      if (onSourceSelect) {
        onSourceSelect(location);
      }
    } else if (activeInput === "destination") {
      setDestinationQuery(location.address);
      if (onDestinationSelect) {
        onDestinationSelect(location);
      }
    }
    
    setShowSuggestions(false);
    setActiveInput(null);
    
    toast({
      title: `${activeInput === "source" ? "Source" : "Destination"} location set`,
      description: `Selected ${location.address}`,
    });
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
            <div className="flex relative">
              <Input
                placeholder="Enter starting location"
                value={sourceQuery}
                onChange={(e) => {
                  setSourceQuery(e.target.value);
                  if (e.target.value.length > 2) {
                    const filteredLocations = mockLocations.filter(loc =>
                      loc.address.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    setSuggestions(filteredLocations);
                    setShowSuggestions(filteredLocations.length > 0);
                    setActiveInput("source");
                  } else {
                    setShowSuggestions(false);
                  }
                }}
                className="rounded-r-none"
                onFocus={() => {
                  if (sourceQuery.length > 2) {
                    const filteredLocations = mockLocations.filter(loc =>
                      loc.address.toLowerCase().includes(sourceQuery.toLowerCase())
                    );
                    setSuggestions(filteredLocations);
                    setShowSuggestions(filteredLocations.length > 0);
                    setActiveInput("source");
                  }
                }}
                onBlur={() => {
                  // Delay hiding suggestions to allow clicking on them
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
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
              {showSuggestions && activeInput === "source" && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-md mt-1 shadow-md z-50 max-h-48 overflow-y-auto">
                  {suggestions.map((location, index) => (
                    <div 
                      key={`source-${index}`}
                      className="p-2 hover:bg-accent cursor-pointer"
                      onClick={() => handleSuggestionSelect(location)}
                    >
                      {location.address}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Navigation size={16} className="text-eco" />
              Destination
            </h3>
            <div className="flex relative">
              <Input
                placeholder="Enter destination"
                value={destinationQuery}
                onChange={(e) => {
                  setDestinationQuery(e.target.value);
                  if (e.target.value.length > 2) {
                    const filteredLocations = mockLocations.filter(loc =>
                      loc.address.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    setSuggestions(filteredLocations);
                    setShowSuggestions(filteredLocations.length > 0);
                    setActiveInput("destination");
                  } else {
                    setShowSuggestions(false);
                  }
                }}
                className="rounded-r-none"
                onFocus={() => {
                  if (destinationQuery.length > 2) {
                    const filteredLocations = mockLocations.filter(loc =>
                      loc.address.toLowerCase().includes(destinationQuery.toLowerCase())
                    );
                    setSuggestions(filteredLocations);
                    setShowSuggestions(filteredLocations.length > 0);
                    setActiveInput("destination");
                  }
                }}
                onBlur={() => {
                  // Delay hiding suggestions to allow clicking on them
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
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
              {showSuggestions && activeInput === "destination" && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-md mt-1 shadow-md z-50 max-h-48 overflow-y-auto">
                  {suggestions.map((location, index) => (
                    <div 
                      key={`destination-${index}`}
                      className="p-2 hover:bg-accent cursor-pointer"
                      onClick={() => handleSuggestionSelect(location)}
                    >
                      {location.address}
                    </div>
                  ))}
                </div>
              )}
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
              <MapIcon size={16} />
              <span>Find Route</span>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MapComponent;
