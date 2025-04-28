import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { logIn } from '../store/authslice';
import { useDispatch ,useSelector } from 'react-redux';
import auth from '../supabase/supaauth';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.auth.isisAuthenticated); // moved to top
    const [sign, setSign] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
  
   const saveuserinfo=async(name,useremail)=>{
      const{data,error}=await supabase.from('usersdata').insert({
        username:name,
        email:useremail,
        usertype:'buyer'
      })
    }

    const onSubmit = async (data) => {
      try {
        let authResponse;
    
        if (sign) {
          authResponse = await auth.signUpWithEmail({
            email: data.email,
            password: data.password,
            options:{
              data:{
                role:'buyer',
                buyerName:data.name
              }
            }
          });

          saveuserinfo(data.name,data.email)
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
          dispatch(logIn({ userData: user,usertype:'buyer' }));
          navigate('/'); // ✅ navigate after successful login/signup
        } else {
          alert("Failed to get user session.");
        }
    
      } catch (error) {
        console.error("Authentication error:", error);
        alert(error.message || "Authentication failed.");
      }
    };
    
    
      
      
      
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          {sign ? 'Create an Account' : 'Login Account'}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field - Only on Sign Up */}
          {sign && (
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format"
                }
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
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

        {/* Toggle between Sign Up and Log In */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {sign ? 'Already have an account?' : "Don't have an account?"}
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

export default SignUp;
