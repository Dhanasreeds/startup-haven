import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const resourceDetails = {
  'business-plan': {
    title: 'Business Plan Template',
    content: 'Detailed guide on creating a comprehensive business plan...'
  },
  'funding-guide': {
    title: 'Funding Guide',
    content: 'In-depth information about various funding options for startups...'
  },
  'legal-checklist': {
    title: 'Legal Checklist',
    content: 'Comprehensive checklist of legal considerations for new businesses...'
  },
  'marketing-strategies': {
    title: 'Marketing Strategies',
    content: 'Detailed marketing tactics and strategies for startups...'
  },
  'networking-tips': {
    title: 'Networking Tips',
    content: 'Advanced guide on building valuable connections in the startup ecosystem...'
  },
  'financial-modeling': {
    title: 'Financial Modeling',
    content: 'Step-by-step guide to creating financial projections for your startup...'
  }
};

const ResourceDetail = () => {
  const { resourceId } = useParams();
  const resource = resourceDetails[resourceId];

  if (!resource) {
    return <div>Resource not found</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{resource.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{resource.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceDetail;