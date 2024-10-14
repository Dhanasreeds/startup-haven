import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    validateFile(selectedFile);
  };

  const validateFile = (file) => {
    if (!file) {
      setValidationMessage(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValidationMessage({ type: 'error', message: 'File size should be less than 5MB.' });
    } else if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      setValidationMessage({ type: 'error', message: 'Only PDF, JPEG, and PNG files are allowed.' });
    } else {
      setValidationMessage({ type: 'success', message: 'File is valid and ready for upload.' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement actual file upload logic here
    console.log('File uploaded:', file);
  };

  return (
    <div className="container mx-auto mt-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700">Upload Document</label>
              <Input type="file" id="document" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" className="mt-1" />
            </div>
            {validationMessage && (
              <Alert variant={validationMessage.type === 'error' ? 'destructive' : 'default'}>
                {validationMessage.type === 'error' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                <AlertTitle>{validationMessage.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                <AlertDescription>{validationMessage.message}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={!file || validationMessage?.type === 'error'}>Upload Document</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;