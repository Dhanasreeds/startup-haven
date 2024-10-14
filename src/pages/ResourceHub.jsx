import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const resources = [
  { title: 'Business Plan Template', description: 'A comprehensive template to help you create a solid business plan.' },
  { title: 'Funding Guide', description: 'Learn about different funding options available for startups.' },
  { title: 'Legal Checklist', description: 'Essential legal considerations for new businesses.' },
  { title: 'Marketing Strategies', description: 'Effective marketing tactics for startups on a budget.' },
  { title: 'Networking Tips', description: 'How to build valuable connections in the startup ecosystem.' },
  { title: 'Financial Modeling', description: 'Guide to creating financial projections for your startup.' },
];

const ResourceHub = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Startup Resource Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{resource.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;