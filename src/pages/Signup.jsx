import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const Signup = () => {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    industry: '',
    employees: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        await signup(formData);
      } catch (error) {
        console.error('Signup failed:', error);
        // Handle signup error (e.g., show error message to user)
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up - Step {step} of 3</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Input type="password" id="password" value={formData.password} onChange={handleChange} required className="mt-1" />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <Input type="text" id="name" value={formData.name} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
                  <Input type="text" id="company" value={formData.company} onChange={handleChange} required className="mt-1" />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                  <Input type="text" id="industry" value={formData.industry} onChange={handleChange} required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700">Number of Employees</label>
                  <Input type="number" id="employees" value={formData.employees} onChange={handleChange} required className="mt-1" />
                </div>
              </>
            )}
            <Button type="submit" className="w-full">{step === 3 ? 'Complete Signup' : 'Next'}</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;