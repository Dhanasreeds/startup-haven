import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Implement actual signup logic here
      login({ id: 1, name: 'John Doe' });
      navigate('/dashboard');
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
                  <Input type="email" id="email" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Input type="password" id="password" required className="mt-1" />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <Input type="text" id="name" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
                  <Input type="text" id="company" required className="mt-1" />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                  <Input type="text" id="industry" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700">Number of Employees</label>
                  <Input type="number" id="employees" required className="mt-1" />
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