
import CarbonCalculator from "@/components/carbon/CarbonCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, TrendingDown, Info } from "lucide-react";

const Calculator = () => {
  return (
    <div className="container py-8 md:py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Carbon Footprint Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the environmental impact of your journeys and see how much CO₂ you can save by carpooling
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <CarbonCalculator />
      </div>
      
      <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-eco/10 rounded-full flex items-center justify-center shrink-0">
                <TrendingDown className="h-5 w-5 text-eco" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Why Carpooling Matters</h3>
                <p className="text-muted-foreground text-sm">
                  Transportation is one of the largest sources of carbon emissions globally. By sharing rides, we can significantly reduce the number of vehicles on the road, cutting emissions and traffic congestion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-eco/10 rounded-full flex items-center justify-center shrink-0">
                <Leaf className="h-5 w-5 text-eco" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Your Impact</h3>
                <p className="text-muted-foreground text-sm">
                  When you carpool, you're not just saving money on fuel and parking. You're actively contributing to a healthier planet by reducing carbon emissions, air pollution, and your personal carbon footprint.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="text-eco shrink-0 mt-1">
                <Info size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">About Our Calculations</h3>
                <p className="text-muted-foreground text-sm">
                  Our calculator uses average emission factors for different vehicle types based on industry standards. The exact emissions may vary depending on specific vehicle models, driving conditions, and fuel efficiency. These calculations are designed to give you a reasonable estimate of your carbon impact.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
