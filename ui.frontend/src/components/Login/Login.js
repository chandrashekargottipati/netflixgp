import React, { useState } from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';

const NetflixLogin = (props) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    username: placeholderUsername,
    password: placeholderPassword,
    description,
    redirectUrl,
    logo,
    backgroundImage
  } = props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Email or phone number is required';
    } else if (formData.username.includes('@') && !/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.log('Login successful:', formData);
      }
    } catch (err) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Netflix-like background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 to-black/80">
        {backgroundImage && (
          <img 
            src={backgroundImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
        )}
      </div>
      
      {/* Netflix logo */}
      <div className="absolute top-8 left-8 z-10">
        {logo && (
          <img 
            src={logo} 
            alt="Netflix Logo" 
            className="w-32 md:w-40 h-auto"
          />
        )}
      </div>

      {/* Login form */}
      <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
        <div className="bg-black/75 rounded-lg p-12 w-full max-w-md text-white">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>
          
          {errors.general && (
            <div className="bg-red-900/80 text-orange-300 text-sm p-3 mb-4 rounded">
              {errors.general}
            </div>
          )}
          
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder={placeholderUsername || 'Email or phone number'}
                autoComplete="username"
                className={`w-full px-4 py-3 bg-gray-700 text-white rounded ${errors.username ? 'border-2 border-red-500' : ''}`}
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={placeholderPassword || 'Password'}
                autoComplete="current-password"
                className={`w-full px-4 py-3 bg-gray-700 text-white rounded ${errors.password ? 'border-2 border-red-500' : ''}`}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-netflix-red hover:bg-red-700 py-3 rounded-md text-white font-medium mt-2 transition-colors"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className="flex justify-between items-center mt-2 text-gray-400 text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 accent-netflix-red" />
                Remember me
              </label>
              <span className="hover:underline cursor-pointer">Need help?</span>
            </div>
          </form>
          
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <div className="flex-grow h-px bg-gray-700"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-700"></div>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-3 rounded-md text-white font-medium transition-colors">
              <span className="text-blue-400 font-bold">f</span>
              Login with Facebook
            </button>
            
            <div className="mt-6 text-gray-400 text-center">
              <p>New to Netflix? <span className="text-white hover:underline cursor-pointer">Sign up now</span>.</p>
              <p className="text-xs mt-3">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapTo('netflixgpt/components/netflix-login')(NetflixLogin);
