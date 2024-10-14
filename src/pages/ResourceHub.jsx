import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const resources = [
  { id: 1, title: 'Business Plan Template', description: 'A comprehensive template to help you create a solid business plan.', path: '/resources/business-plan' },
  { id: 2, title: 'Funding Guide', description: 'Learn about different funding options available for startups.', path: '/resources/funding-guide' },
  { id: 3, title: 'Legal Checklist', description: 'Essential legal considerations for new businesses.', path: '/resources/legal-checklist' },
  { id: 4, title: 'Marketing Strategies', description: 'Effective marketing tactics for startups on a budget.', path: '/resources/marketing-strategies' },
  { id: 5, title: 'Networking Tips', description: 'How to build valuable connections in the startup ecosystem.', path: '/resources/networking-tips' },
  { id: 6, title: 'Financial Modeling', description: 'Guide to creating financial projections for your startup.', path: '/resources/financial-modeling' },
];

const ResourceHub = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Startup Resource Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{resource.description}</p>
              <Button asChild>
                <Link to={resource.path}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;