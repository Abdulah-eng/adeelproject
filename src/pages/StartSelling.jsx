import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { logIn } from '../store/authslice'; // import your auth action
import { useNavigate } from 'react-router-dom';
import auth from '../supabase/supaauth'; // your supabase auth helper
import { supabase } from '../supabase/supabaseClient';

function StartSelling() {
  const [sign, setSign] = useState(true); 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveuserinfo=async(name,useremail)=>{
    const{data,error}=await supabase.from('usersdata').insert({
      username:name,
      email:useremail,
      usertype:'seller'
    })
  }

  const onSubmit = async (data) => {
    try {
      let authResponse;

      if (sign) {
        authResponse = await auth.signUpWithEmail({
          email: data.email,
          password: data.password,
          options: {
            data: {
              role: 'seller',
              sellerName: data.sellerName,
              storeName: data.storeName
            }
          }
        });
        saveuserinfo(data.name,data.email);
      } else {
        authResponse = await auth.signInWithEmail({
          email: data.email,
          password: data.password,
        });
      }

      if (authResponse.error) {
        throw authResponse.error;
      }

      const user = await auth.onAuthStateChangedOnce();

      if (user) {
        dispatch(logIn({ userData: user,usertype:'seller' }));
        if(user.user_metadata?.role=='seller'){
          navigate('/seller-dashboard')
        }else
        navigate('/seller-dashboard'); // redirect to home page
      } else {
        alert("Failed to get user session.");
      }

    } catch (error) {
      console.error("Authentication error:", error);
      alert(error.message || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          {sign ? 'Create Seller Account' : 'Seller Login'}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Seller Name (only in Sign Up) */}
          {sign && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Seller Name</label>
              <input
                {...register("sellerName", { required: "Seller name is required" })}
                type="text"
                placeholder="Enter your seller name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.sellerName && (
                <p className="text-sm text-red-500 mt-1">{errors.sellerName.message}</p>
              )}
            </div>
          )}

          {/* Store Name (only in Sign Up) */}
          {sign && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Store Name</label>
              <input
                {...register("storeName", { required: "Store name is required" })}
                type="text"
                placeholder="Enter your store name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.storeName && ( // ✅ Fixed here
                <p className="text-sm text-red-500 mt-1">{errors.storeName.message}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
              placeholder="Enter your business email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            {sign ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        {/* Toggle Sign/Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {sign ? 'Already a seller?' : 'New seller?'}
          <button
            type="button"
            onClick={() => setSign(!sign)}
            className="ml-1 text-purple-600 font-semibold hover:underline"
          >
            {sign ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default StartSelling;
