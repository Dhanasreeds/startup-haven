import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const RegistrationPortal = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      setProgress((step / 3) * 100);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(((step - 2) / 3) * 100);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AYUSH Startup Registration - Step {step} of 3</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-4" />
          <form className="space-y-4">
            {step === 1 && (
              <>
                <Input type="text" placeholder="Company Name" />
                <Input type="email" placeholder="Business Email" />
                <Input type="tel" placeholder="Phone Number" />
              </>
            )}
            {step === 2 && (
              <>
                <Input type="text" placeholder="AYUSH Category" />
                <Input type="number" placeholder="Number of Employees" />
                <Input type="text" placeholder="Business Registration Number" />
              </>
            )}
            {step === 3 && (
              <>
                <Input type="file" accept=".pdf,.doc,.docx" />
                <p className="text-sm text-gray-500">Upload your business plan (PDF, DOC, DOCX)</p>
                <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                <p className="text-sm text-gray-500">Upload your AYUSH certification (PDF, JPG, PNG)</p>
              </>
            )}
            <div className="flex justify-between">
              <Button onClick={handlePrevStep} disabled={step === 1}>Previous</Button>
              <Button onClick={handleNextStep}>{step === 3 ? 'Submit' : 'Next'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPortal;