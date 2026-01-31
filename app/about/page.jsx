"use client";
import { ArrowRight, Users, Target, Award, Heart, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '100+', label: 'Products' },
  { value: '24/7', label: 'Customer Support' },
];

const values = [
  {
    icon: Target,
    title: 'Quality First',
    description: 'We never compromise on the quality of our products. Every item is tested and approved by industry experts.',
  },
  {
    icon: Heart,
    title: 'Customer Focused',
    description: 'Your satisfaction is our priority. We listen, adapt, and continuously improve based on your feedback.',
  },
  {
    icon: Award,
    title: 'Innovation',
    description: 'We stay ahead of the curve with cutting-edge cleaning technology and eco-friendly solutions.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in building lasting relationships with our customers, partners, and the communities we serve.',
  },
];

const timeline = [
  { year: '2015', event: 'Deegan Dhowr was founded with a mission to revolutionize cleaning.' },
  { year: '2017', event: 'Launched our first eco-friendly product line.' },
  { year: '2019', event: 'Expanded to serve commercial clients nationwide.' },
  { year: '2021', event: 'Reached 50,000+ satisfied customers milestone.' },
  { year: '2024', event: 'Introduced smart cleaning solutions and bundled kits.' },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-green-500/10 text-primary rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
             We provide Professional <span className="text-primary">Cleaning Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
             Degaan Dhowr Cleaning company is a dedicated provider of professional cleaning services, committed to delivering exceptional cleanliness and customer satisfaction. With a focus on reliability, efficiency, and attention to detail, Degaan Dhowr aims to exceed client expectations in every cleaning project. Our skilled team employs modern techniques and eco-friendly products to ensure a pristine environment for homes and businesses alike. Trust Degaan Dhowr Cleaning services to transform spaces into immaculate havens, promoting health and well-being through their top-tier cleaning solutions
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-green-500/80 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-white text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-green-500/70/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                From Humble Beginnings to <span className="text-primary">Industry Leaders</span>
              </h2>
              <p className="text-muted-foreground mb-4">
                Deegan Dhowr started with a simple idea: cleaning should be simple, effective, and environmentally responsible. What began as a small family business has grown into a trusted name in the cleaning industry.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, we serve thousands of homes and businesses across the country, offering a comprehensive range of cleaning products that deliver professional results without the professional price tag.
              </p>
              <Link href="/products">
                <Button variant="hero">
                  Explore Our Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-1">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className="flex  items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/80 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{item.year}</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-foreground">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-green-500/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Drives <span className="text-primary">Us Forward</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background rounded-2xl p-6 border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/70/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-500/80 lg:py-24 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl text-white font-bold  mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-white max-w-xl mx-auto mb-8">
            Join thousands of satisfied customers who have transformed their cleaning routine with Deegan Dhowr.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <button
                
                className="border-primary-foreground flex justify-between items-center gap-3 bg-black p-4 rounded-md  text-white hover:bg-black/96 hover:text-white-foreground "
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button
                className="border-white p-4 rounded-md border text-white hover:bg-green-500/70 hover:text-white-foreground "
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
