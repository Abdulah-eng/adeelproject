import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from '../Images/image.png';
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.usertype);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loginfun = () => {
    navigate('/signup');
  };

  const buyeraccountfun = () => {
    navigate('/start-selling');
  };

  const dashboardfun = () => {
    if (userType === 'buyer') {
      navigate('/buyer-dashboard');
    } else if (userType === 'seller') {
      navigate('/seller-dashboard');
    }
  };

  return (
    <header className={`sticky top-0 z-50 px-5 h-[70px] flex items-center justify-between transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-md' 
        : 'bg-white shadow-sm'
    }`}>
      {/* Left side: Logo with hover animation */}
      <div 
        className="flex items-center cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <img 
          src={logo} 
          alt="Company Logo" 
          className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" 
        />
        <span className="ml-2.5 text-xl font-semibold text-indigo-600 transition-all duration-300 group-hover:text-indigo-700 group-hover:tracking-wide">
          Store
        </span>
      </div>

      {/* Right side: Buttons with animations */}
      <div className="flex items-center gap-2.5">
        {/* Start Selling for non-login or buyers */}
        {(!isLogin || userType === 'buyer') && (
          <Button 
            onClick={buyeraccountfun}
            className="px-4 py-2 rounded-lg font-medium bg-indigo-50 text-indigo-700 border-none cursor-pointer 
            transition-all duration-300 hover:bg-indigo-100 hover:shadow-md hover:-translate-y-0.5
            active:translate-y-0 active:shadow-sm"
          >
            Start Selling
          </Button>
        )}

        {/* Dashboard Button for buyer or seller */}
        {isLogin && (userType === 'buyer' || userType === 'seller') && (
          <Button
            onClick={dashboardfun}
            className="px-4 py-2 rounded-lg font-medium bg-green-100 text-green-800 border-none cursor-pointer
            transition-all duration-300 hover:bg-green-200 hover:shadow-md hover:-translate-y-0.5
            active:translate-y-0 active:shadow-sm"
          >
            Dashboard
          </Button>
        )}

        {/* Login/Signup or Logout button */}
        {!isLogin ? (
          <Button 
            onClick={loginfun}
            className="px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white border-none cursor-pointer
            transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
            active:translate-y-0 active:shadow-md"
          >
            Login / Sign Up
          </Button>
        ) : (
          <LogoutButton className="hover:-translate-y-0.5 transition-transform duration-300" />
        )}
      </div>
    </header>
  );
}

export default Header;