import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [documentsResponse, statusResponse] = await Promise.all([
          axios.get('/api/user-documents'),
          axios.get('/api/registration-status')
        ]);
        setDocuments(documentsResponse.data);
        setRegistrationStatus(statusResponse.data.status);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard, {user.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.company && <p><strong>Company:</strong> {user.company}</p>}
            {user.industry && <p><strong>Industry:</strong> {user.industry}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length > 0 ? (
              <ul>
                {documents.map((doc, index) => (
                  <li key={index}>{doc.name}</li>
                ))}
              </ul>
            ) : (
              <p>You have no documents uploaded.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Registration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{registrationStatus}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Complete your profile</li>
              <li>Upload required documents</li>
              <li>Review startup resources</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;