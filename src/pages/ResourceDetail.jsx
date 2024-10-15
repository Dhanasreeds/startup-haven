import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const resourceDetails = {
  'business-plan': {
    title: 'Business Plan Template',
    content: 'Detailed guide on creating a comprehensive business plan...',
    realTimeInfo: () => `As of ${new Date().toLocaleString()}, successful business plans are focusing on sustainability and digital transformation.`,
    suggestions: [
      'Include a section on your company\'s environmental impact',
      'Detail your digital marketing strategy',
      'Highlight your remote work capabilities'
    ]
  },
  'funding-guide': {
    title: 'Funding Guide',
    content: 'In-depth information about various funding options for startups...',
    realTimeInfo: () => `Current trend: Angel investors are showing increased interest in health tech startups as of ${new Date().toLocaleString()}.`,
    suggestions: [
      'Research crowdfunding platforms',
      'Prepare a compelling elevator pitch',
      'Network with industry-specific investor groups'
    ]
  },
  'legal-checklist': {
    title: 'Legal Checklist',
    content: 'Comprehensive checklist of legal considerations for new businesses...',
    realTimeInfo: () => `Recent update: New data protection regulations came into effect on ${new Date().toLocaleDateString()}.`,
    suggestions: [
      'Consult with a startup-focused lawyer',
      'Review your intellectual property strategy',
      'Ensure compliance with local business regulations'
    ]
  },
  'marketing-strategies': {
    title: 'Marketing Strategies',
    content: 'Detailed marketing tactics and strategies for startups...',
    realTimeInfo: () => `Trending: TikTok marketing is showing high engagement rates for B2C startups as of ${new Date().toLocaleString()}.`,
    suggestions: [
      'Develop a content marketing plan',
      'Explore influencer partnerships',
      'Optimize your website for local SEO'
    ]
  },
  'networking-tips': {
    title: 'Networking Tips',
    content: 'Advanced guide on building valuable connections in the startup ecosystem...',
    realTimeInfo: () => `Upcoming: Virtual startup networking event scheduled for ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.`,
    suggestions: [
      'Join online startup communities',
      'Attend industry-specific webinars',
      'Engage with thought leaders on LinkedIn'
    ]
  },
  'financial-modeling': {
    title: 'Financial Modeling',
    content: 'Step-by-step guide to creating financial projections for your startup...',
    realTimeInfo: () => `Market update: Average seed funding round size has increased by 15% since ${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}.`,
    suggestions: [
      'Use scenario planning in your financial models',
      'Include a detailed cash flow projection',
      'Consider seeking advice from a startup financial advisor'
    ]
  }
};

const ResourceDetail = () => {
  const { resourceId } = useParams();
  const [currentTime, setCurrentTime] = useState(new Date());
  const resource = resourceDetails[resourceId];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

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
          <p className="mb-4">{resource.content}</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Real-Time Information</h3>
          <p className="mb-4">{resource.realTimeInfo()}</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Suggestions</h3>
          <ul className="list-disc pl-5">
            {resource.suggestions.map((suggestion, index) => (
              <li key={index} className="mb-2">{suggestion}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-4">Last updated: {currentTime.toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceDetail;