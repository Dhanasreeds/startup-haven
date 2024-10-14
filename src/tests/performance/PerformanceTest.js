import { performance } from 'perf_hooks';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

const simulateMultipleRegistrations = async (numUsers) => {
  const startTime = performance.now();
  
  const registrations = Array(numUsers).fill().map((_, i) => ({
    companyName: `Company ${i}`,
    email: `user${i}@example.com`,
    phone: `123456789${i}`,
  }));

  const results = await Promise.all(
    registrations.map(data => axios.post(`${API_URL}/register`, data))
  );

  const endTime = performance.now();
  const totalTime = endTime - startTime;

  console.log(`Time taken for ${numUsers} registrations: ${totalTime}ms`);
  console.log(`Average time per registration: ${totalTime / numUsers}ms`);

  return results;
};

const testLargeFileUpload = async () => {
  const file = new File(['a'.repeat(10 * 1024 * 1024)], 'large-file.pdf', { type: 'application/pdf' });
  const formData = new FormData();
  formData.append('file', file);

  const startTime = performance.now();
  
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    const endTime = performance.now();
    console.log(`Time taken for large file upload: ${endTime - startTime}ms`);
    
    return response;
  } catch (error) {
    console.error('Error uploading large file:', error);
  }
};

export { simulateMultipleRegistrations, testLargeFileUpload };