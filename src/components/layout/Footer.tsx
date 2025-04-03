
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-eco text-white rounded-full flex items-center justify-center">
                <span className="font-bold">E</span>
              </div>
              <span className="text-lg font-semibold text-eco-dark">EcoRide</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Reducing carbon emissions one shared ride at a time. Join our community of eco-conscious travelers today.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-eco transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eco transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-eco transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rides" className="text-muted-foreground hover:text-eco transition-colors">
                  Find Rides
                </Link>
              </li>
              <li>
                <Link to="/offer" className="text-muted-foreground hover:text-eco transition-colors">
                  Offer a Ride
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-muted-foreground hover:text-eco transition-colors">
                  Carbon Calculator
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-eco transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-eco transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-eco transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/my-rides" className="text-muted-foreground hover:text-eco transition-colors">
                  My Rides
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-eco transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-eco transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-eco transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-eco transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EcoRide. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0 gap-2">
            <Leaf size={16} className="text-eco" />
            <span>Saved 2,450 kg of CO₂ this month</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
