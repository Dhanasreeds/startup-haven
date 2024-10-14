import React, { useState, lazy, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const LazyFileUpload = lazy(() => import('../components/FileUpload'));

const RegistrationPortal = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const handleNextStep = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1);
        setProgress((step / 3) * 100);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(((step - 2) / 3) * 100);
    }
  };

  const validateStep = () => {
    let stepErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!document.getElementById('companyName').value) {
        stepErrors.companyName = 'Company Name is required';
        isValid = false;
      }
      if (!document.getElementById('email').value) {
        stepErrors.email = 'Email is required';
        isValid = false;
      }
      if (!document.getElementById('phone').value) {
        stepErrors.phone = 'Phone Number is required';
        isValid = false;
      }
    } else if (step === 2) {
      if (!document.getElementById('ayushCategory').value) {
        stepErrors.ayushCategory = 'AYUSH Category is required';
        isValid = false;
      }
      if (!document.getElementById('employees').value) {
        stepErrors.employees = 'Number of Employees is required';
        isValid = false;
      }
      if (!document.getElementById('registrationNumber').value) {
        stepErrors.registrationNumber = 'Business Registration Number is required';
        isValid = false;
      }
    } else if (step === 3) {
      if (!document.getElementById('businessPlan').files[0]) {
        stepErrors.businessPlan = 'Business Plan is required';
        isValid = false;
      }
      if (!document.getElementById('ayushCertification').files[0]) {
        stepErrors.ayushCertification = 'AYUSH Certification is required';
        isValid = false;
      }
    }

    setErrors(stepErrors);
    return isValid;
  };

  const handleSubmit = () => {
    // Implement actual submission logic here
    toast({
      title: "Registration Submitted",
      description: "Your AYUSH startup registration has been submitted successfully.",
    });
  };

  const handleFileValidation = (file, fileType) => {
    const allowedTypes = {
      businessPlan: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      ayushCertification: ['application/pdf', 'image/jpeg', 'image/png']
    };

    if (!allowedTypes[fileType].includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [fileType]: `Invalid file format. Please upload a ${allowedTypes[fileType].join(' or ')} file.`
      }));
      return false;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({
        ...prev,
        [fileType]: 'File size should be less than 5MB.'
      }));
      return false;
    }

    setErrors(prev => ({ ...prev, [fileType]: null }));
    return true;
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
                <Input id="companyName" type="text" placeholder="Company Name" />
                {errors.companyName && <Alert variant="destructive"><AlertDescription>{errors.companyName}</AlertDescription></Alert>}
                <Input id="email" type="email" placeholder="Business Email" />
                {errors.email && <Alert variant="destructive"><AlertDescription>{errors.email}</AlertDescription></Alert>}
                <Input id="phone" type="tel" placeholder="Phone Number" />
                {errors.phone && <Alert variant="destructive"><AlertDescription>{errors.phone}</AlertDescription></Alert>}
              </>
            )}
            {step === 2 && (
              <>
                <Input id="ayushCategory" type="text" placeholder="AYUSH Category" />
                {errors.ayushCategory && <Alert variant="destructive"><AlertDescription>{errors.ayushCategory}</AlertDescription></Alert>}
                <Input id="employees" type="number" placeholder="Number of Employees" />
                {errors.employees && <Alert variant="destructive"><AlertDescription>{errors.employees}</AlertDescription></Alert>}
                <Input id="registrationNumber" type="text" placeholder="Business Registration Number" />
                {errors.registrationNumber && <Alert variant="destructive"><AlertDescription>{errors.registrationNumber}</AlertDescription></Alert>}
              </>
            )}
            {step === 3 && (
              <Suspense fallback={<div>Loading...</div>}>
                <LazyFileUpload
                  id="businessPlan"
                  accept=".pdf,.doc,.docx"
                  onValidate={(file) => handleFileValidation(file, 'businessPlan')}
                  error={errors.businessPlan}
                  label="Upload your business plan (PDF, DOC, DOCX)"
                />
                <LazyFileUpload
                  id="ayushCertification"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onValidate={(file) => handleFileValidation(file, 'ayushCertification')}
                  error={errors.ayushCertification}
                  label="Upload your AYUSH certification (PDF, JPG, PNG)"
                />
              </Suspense>
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