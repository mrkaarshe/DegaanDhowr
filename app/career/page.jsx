"use client";
import Link from 'next/link';
import { ArrowRight, Briefcase, MapPin, Clock, DollarSign, Users, Heart, Zap, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  { icon: Heart, title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage.' },
  { icon: Clock, title: 'Flexible Hours', description: 'Work-life balance with flexible scheduling options.' },
  { icon: DollarSign, title: 'Competitive Pay', description: 'Industry-leading salaries and performance bonuses.' },
  { icon: Zap, title: 'Growth Opportunities', description: 'Career development programs and promotions from within.' },
  { icon: Users, title: 'Team Culture', description: 'Collaborative and supportive work environment.' },
  { icon: Coffee, title: 'Perks', description: 'Product discounts, team events, and more.' },
];

const openings = [
  {
    id: 1,
    title: 'Sales Representative',
    department: 'Sales',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Join our sales team to help customers find the perfect cleaning solutions.',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead product development and bring innovative cleaning solutions to market.',
  },
  {
    id: 3,
    title: 'Customer Support Specialist',
    department: 'Support',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    description: 'Provide exceptional support and ensure customer satisfaction.',
  },
  {
    id: 4,
    title: 'Marketing Coordinator',
    department: 'Marketing',
    location: 'Chicago, IL',
    type: 'Full-time',
    description: 'Help create compelling marketing campaigns that inspire cleaner spaces.',
  },
  {
    id: 5,
    title: 'Warehouse Associate',
    department: 'Operations',
    location: 'Multiple Locations',
    type: 'Part-time',
    description: 'Ensure accurate order fulfillment and inventory management.',
  },
];

const Career = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className=" py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Careers
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Join Our <span className="text-primary">Growing Team</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented individuals who share our passion for cleanliness and customer satisfaction. Build your career with Deegan Dhowr!
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="#">
                View Open Positions
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-100 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Why Join Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Benefits & <span className="text-primary">Perks</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We take care of our team members with comprehensive benefits and a positive work environment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-background rounded-2xl border border-border p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Open Positions
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Current <span className="text-primary">Openings</span>
            </h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {openings.map((job) => (
              <div
                key={job.id}
                className="bg-background rounded-2xl border border-border p-6 hover:border-primary transition-colors"
              >
                <div className=" lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                        {job.department}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="flex-shrink-0 mt-3">
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-green-500/70">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Don't See the Right Fit?
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
            <Link href="/contact">
              <button
                variant="outline"
                size="xl"
                className="w-1/1 bg-black text-white flex justify-center items-center p-4 gap-4  rounded-md border-primary-foreground  hover:bg-primary-foreground "
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Career;
