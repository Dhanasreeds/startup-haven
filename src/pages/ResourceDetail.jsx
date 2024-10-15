import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const resourceDetails = {
  'business-plan': {
    title: 'Business Plan Template',
    message: 'Explore our comprehensive business plan template to kickstart your startup journey.'
  },
  'funding-guide': {
    title: 'Funding Guide',
    message: 'Discover various funding options to fuel your startup\'s growth and success.'
  },
  'legal-checklist': {
    title: 'Legal Checklist',
    message: 'Ensure your startup\'s legal compliance with our essential legal considerations checklist.'
  },
  'marketing-strategies': {
    title: 'Marketing Strategies',
    message: 'Learn effective marketing tactics to boost your startup\'s visibility and customer acquisition.'
  },
  'networking-tips': {
    title: 'Networking Tips',
    message: 'Build valuable connections in the startup ecosystem with our expert networking tips.'
  },
  'financial-modeling': {
    title: 'Financial Modeling',
    message: 'Master the art of financial projections to secure your startup\'s financial future.'
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
          <p className="text-lg">{resource.message}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceDetail;