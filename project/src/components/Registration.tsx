import React, { useState } from 'react';
import {
  User, Mail, Phone, GraduationCap, Users, Heart, Gift
} from 'lucide-react';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    gender: '',
    interests: [] as string[],
    paymentMode: '',
    goodies: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const {
      fullName, email, phone, department, year,
      gender, interests, paymentMode, goodies
    } = formData;

    if (
      !fullName || !email || !phone || !department || !year ||
      !gender || interests.length === 0 || !paymentMode || !goodies
    ) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          branch: department,
          year,
          gender,
          interests,
          payment: paymentMode,
          goodies
        })
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setShowDuplicateError(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          department: '',
          year: '',
          gender: '',
          interests: [],
          paymentMode: '',
          goodies: ''
        });
      } else {
        if (result?.error === "Phone number already exists") {
          setShowDuplicateError(true);
        } else {
          alert(result?.error || "Something went wrong.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }

    setIsSubmitting(false);
  };

  const interests = [
    'Dance', 'Public Affairs', 'Management', 'Tech Support',
    'Anchoring', 'Singing', 'Artwork', 'Support'
  ];

  return (
    <section id="register" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Join ACE – Start Your Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Become part of the future leaders in Computer Science and Engineering
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" /> Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" /> Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2" /> Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="inline w-4 h-4 mr-2" /> Department *
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Department</option>
                {["CSE", "AIML", "CIC", "AIDS", "IT", "ECE", "EEE", "Mech", "Civil", "CSBS", "CSG", "CSIT"].map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Year of Study *</label>
              <div className="space-y-2">
                {["1 Year Freshers", "2 Year Laterals"].map(year => (
                  <label key={year} className="flex items-center">
                    <input
                      type="radio"
                      name="year"
                      value={year}
                      checked={formData.year === year}
                      onChange={handleInputChange}
                      className="mr-3 text-blue-600"
                    />
                    {year}
                  </label>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Heart className="inline w-4 h-4 mr-2" /> Areas of Interest *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {interests.map(interest => (
                  <label key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="mr-3 text-blue-600"
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 mb-2">
                Payment Mode *
              </label>
              <select
                id="paymentMode"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Payment Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Gift className="inline w-4 h-4 mr-2" /> Goodies *
              </label>
              <div className="space-y-2">
                {["Yes", "No"].map(val => (
                  <label key={val} className="flex items-center">
                    <input
                      type="radio"
                      name="goodies"
                      value={val}
                      checked={formData.goodies === val}
                      onChange={handleInputChange}
                      className="mr-3 text-blue-600"
                    />
                    {val}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105 text-white'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <Users className="inline w-5 h-5 mr-2" />
                  Join ACE Now
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
            <p className="text-gray-600 mb-6">
              Welcome to ACE! We're excited to have you join our community.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {showDuplicateError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Duplicate Phone Number</h3>
            <p className="text-gray-600 mb-6">
              This phone number has already been used to register. Please use a different number.
            </p>
            <button
              onClick={() => setShowDuplicateError(false)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
export default Registration;