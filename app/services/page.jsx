"use client";

import { ArrowRight, Home, Building2, Factory, Sparkles, CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Complete home cleaning solutions including deep cleaning, regular maintenance, and specialized treatments.',
    features: ['Kitchen & Bathroom Deep Clean', 'Floor & Carpet Care', 'Window Cleaning', 'Upholstery Treatment'],
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    description: 'Professional cleaning services for offices, retail spaces, and commercial properties.',
    features: ['Office Sanitization', 'Floor Maintenance', 'Restroom Hygiene', 'Waste Management'],
  },
  {
    icon: Factory,
    title: 'Industrial Cleaning',
    description: 'Heavy-duty cleaning solutions for warehouses, factories, and industrial facilities.',
    features: ['Equipment Cleaning', 'Pressure Washing', 'Degreasing Services', 'Safety Compliance'],
  },
  {
    icon: Sparkles,
    title: 'Specialized Services',
    description: 'Custom cleaning solutions for unique requirements and specialty surfaces.',
    features: ['Post-Construction Cleanup', 'Move-In/Move-Out Cleaning', 'Event Cleaning', 'Eco-Friendly Options'],
  },
];

const process = [
  { step: 1, title: 'Consultation', description: 'We assess your needs and create a customized cleaning plan.' },
  { step: 2, title: 'Product Selection', description: 'Choose from our premium range of cleaning products.' },
  { step: 3, title: 'Delivery', description: 'Fast, free delivery on orders over $50.' },
  { step: 4, title: 'Support', description: 'Ongoing customer support and satisfaction guarantee.' },
];

const Services = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className=" py-16 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-green-300/20  text-black  rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Professional Cleaning <span className=" text-primary ">Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From residential to industrial, we provide comprehensive cleaning products and solutions tailored to your specific needs.
            </p>
            <Link href="/contact">
              <Button variant="hero" size="lg">
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card rounded-2xl border border-border p-8 card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7  text-primary  " />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5  text-primary   flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10  text-primary   rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple <span className=" text-primary  ">Process</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-background rounded-2xl p-6 border border-border h-full">
                  <div className="w-12 h-12 rounded-full bg-primary  text-white  -foreground flex items-center justify-center font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6  text-primary  " />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16  lg:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold  text-black  -foreground mb-4">
                Need Help Choosing the Right Products?
              </h2>
              <p className="text-lg  text-black  -foreground mb-6">
                Our experts are here to help you find the perfect cleaning solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button
                  
                  className="bg-primary-foreground flex justify-between items-center gap-3 text-white px-6 py-3 rounded-lg hover:bg-primary-foreground/10 "
                >
                  <Phone className="w-5 h-5" />
                  Contact Us
                </button>
              </Link>
              <Link href="/products">
                <button

                  className="border flex justify-between items-center gap-3 text-white px-6 py-3 rounded-lg hover:bg-primary-foreground/10"
                >
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
