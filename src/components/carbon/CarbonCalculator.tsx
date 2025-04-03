
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Users, TrendingDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const CarbonCalculator: React.FC = () => {
  // State
  const [distance, setDistance] = useState<number>(10);
  const [vehicleType, setVehicleType] = useState<string>("sedan");
  const [passengers, setPassengers] = useState<number>(1);
  const [result, setResult] = useState<{
    emissions: number;
    saved: number;
    trees: number;
  } | null>(null);
  
  // Emission factors (g CO2 per km)
  const emissionFactors = {
    sedan: 120,
    suv: 180,
    hatchback: 110,
    minivan: 160,
    truck: 200,
  };
  
  const calculateEmissions = () => {
    const factor = emissionFactors[vehicleType as keyof typeof emissionFactors];
    // Calculate total emissions for the trip
    const totalEmissions = (factor * distance);
    
    // Calculate emissions per person when carpooling
    const perPersonEmissions = totalEmissions / passengers;
    
    // Calculate emissions saved by carpooling vs. individual trips
    const savedEmissions = totalEmissions - perPersonEmissions;
    
    // Equivalent to trees absorbing CO2 (rough estimate: 1 tree absorbs ~25kg CO2 per year)
    const treesEquivalent = savedEmissions / 25000;
    
    setResult({
      emissions: perPersonEmissions / 1000, // Convert to kg
      saved: savedEmissions / 1000, // Convert to kg
      trees: treesEquivalent,
    });
  };

  return (
    <Card className="max-w-2xl w-full shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="text-eco h-5 w-5" />
          Carbon Footprint Calculator
        </CardTitle>
        <CardDescription>
          Calculate how much CO₂ you save by carpooling
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Distance */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="distance">Trip Distance (km)</Label>
            <span className="text-sm font-medium">{distance} km</span>
          </div>
          <Slider
            id="distance"
            min={1}
            max={1000}
            step={1}
            value={[distance]}
            onValueChange={(values) => setDistance(values[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 km</span>
            <span>1000 km</span>
          </div>
        </div>
        
        {/* Vehicle Type */}
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Vehicle Type</Label>
          <Select
            value={vehicleType}
            onValueChange={setVehicleType}
          >
            <SelectTrigger id="vehicleType">
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
              <SelectItem value="minivan">Minivan</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Number of Passengers */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="passengers">Number of Passengers</Label>
            <span className="text-sm font-medium">{passengers}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setPassengers(Math.max(1, passengers - 1))}
            >
              -
            </Button>
            <Slider
              id="passengers"
              min={1}
              max={6}
              step={1}
              value={[passengers]}
              onValueChange={(values) => setPassengers(values[0])}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setPassengers(Math.min(6, passengers + 1))}
            >
              +
            </Button>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-xs text-muted-foreground">1 person</span>
            <span className="text-xs text-muted-foreground">6 people</span>
          </div>
        </div>
        
        {/* Calculate Button */}
        <Button 
          className="w-full"
          onClick={calculateEmissions}
        >
          Calculate Carbon Footprint
        </Button>
        
        {/* Results */}
        {result && (
          <div className="mt-6 pt-6 border-t space-y-4">
            <h3 className="font-medium text-lg">Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <Car className="h-8 w-8 mx-auto mb-2 text-eco" />
                  <div className="text-2xl font-bold">{result.emissions.toFixed(2)} kg</div>
                  <p className="text-sm text-muted-foreground">CO₂ per person</p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-eco" />
                  <div className="text-2xl font-bold">{result.saved.toFixed(2)} kg</div>
                  <p className="text-sm text-muted-foreground">CO₂ saved by carpooling</p>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🌳</div>
                  <div className="text-2xl font-bold">{result.trees.toFixed(4)}</div>
                  <p className="text-sm text-muted-foreground">Trees required to absorb this CO₂</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarbonCalculator;
