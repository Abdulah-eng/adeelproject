import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "../supabase/supaauth";
import { logOut } from "../store/authslice";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutfun = async () => {
    try {
      const { error } = await auth.signOut();

      if (error) {
        alert('Logout failed: ' + error.message);
      } else {
        dispatch(logOut());
        navigate('/'); 
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert('Something went wrong during logout');
    }
  };

  return (
    <button 
      onClick={logoutfun}
      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
