
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Shield, Car, Leaf } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name: profileData.name,
    });
  };
  
  if (!isAuthenticated) {
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in or register to view your profile</CardDescription>
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
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                
                <Separator className="my-4" />
                
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">12 rides completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-eco" />
                    <span className="text-sm">48.3 kg CO₂ saved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Verified Account</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="rides">My Rides</TabsTrigger>
              <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        placeholder="Your address"
                      />
                    </div>
                    
                    <Button type="submit">Update Profile</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rides">
              <Card>
                <CardHeader>
                  <CardTitle>My Rides</CardTitle>
                  <CardDescription>Manage your scheduled rides</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center py-12">
                    <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium text-lg mb-2">No rides yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't offered or booked any rides yet
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild>
                        <a href="/rides">Find a Ride</a>
                      </Button>
                      <Button asChild variant="outline">
                        <a href="/offer">Offer a Ride</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Track your contribution to a greener planet</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <Leaf className="h-8 w-8 mx-auto mb-2 text-eco" />
                      <div className="text-2xl font-bold">48.3 kg</div>
                      <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <Car className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-sm text-muted-foreground">Rides Shared</p>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-3xl mb-2">🌳</div>
                      <div className="text-2xl font-bold">1.9</div>
                      <p className="text-sm text-muted-foreground">Trees Equivalent</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 border rounded-lg p-6 bg-white">
                    <h3 className="font-medium mb-4">What does this mean?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      By carpooling instead of driving alone, you've helped reduce carbon emissions by 48.3 kg. This is equivalent to the CO₂ that 1.9 trees absorb in a year.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Keep up the good work! Every shared ride makes a difference to our environment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
