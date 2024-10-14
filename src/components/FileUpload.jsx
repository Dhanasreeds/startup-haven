import React from 'react';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FileUpload = ({ id, accept, onValidate, error, label }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onValidate(file);
    }
  };

  return (
    <div>
      <Input id={id} type="file" accept={accept} onChange={handleFileChange} />
      <p className="text-sm text-gray-500 mt-1">{label}</p>
      {error && <Alert variant="destructive" className="mt-2"><AlertDescription>{error}</AlertDescription></Alert>}
    </div>
  );
};

export default FileUpload;