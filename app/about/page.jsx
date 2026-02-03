"use client";
import { ArrowRight, Users, Target, Award, Heart, Clock, CheckCircle,Sparkles } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-green-500/10 text-primary rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
             We provide Professional <span className="text-primary">Cleaning Services</span>
            </h1>
            <p className="text-sm text-muted-foreground">
             Degaan Dhowr Cleaning company is a dedicated provider of professional cleaning services, committed to delivering exceptional cleanliness and customer satisfaction. With a focus on reliability, efficiency, and attention to detail, Degaan Dhowr aims to exceed client expectations in every cleaning project. Our skilled team employs modern techniques and eco-friendly products to ensure a pristine environment for homes and businesses alike. Trust Degaan Dhowr Cleaning services to transform spaces into immaculate havens, promoting health and well-being through their top-tier cleaning solutions
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-green-500/80 ">
        <div className="max-w-7xl mx-auto px-4">
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
<section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black text-xs tracking-[0.3em] uppercase mb-4 block">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-black/80 leading-tight">
              Driving Excellence in <span className="text-primary">Hygiene Solutions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* OUR MISSION */}
            <div className="group relative p-10 rounded-[40px] bg-[#FBFBFA] border border-black/5 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Sparkles size={32} className="text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-black text-black/80 mb-4 text-left">Our Mission</h3>
              <p className="text-gray-500 text-left leading-relaxed font-medium">
                To provide world-class professional cleaning services in Somalia, ensuring every home and office experiences the highest standards of hygiene and comfort.
              </p>
              <div className="absolute bottom-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Sparkles size={80} />
              </div>
            </div>

            {/* OUR VISION */}
            <div className="group relative p-10 rounded-[40px] bg-primary/5 border border-primary/10 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-black/80 mb-4 text-left">Our Vision</h3>
              <p className="text-gray-500 text-left leading-relaxed font-medium">
                To become the most trusted and innovative environmental service provider in the region, leading the way in eco-friendly and sustainable cleaning technologies.
              </p>
              <div className="absolute bottom-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Target size={80} />
              </div>
            </div>

            {/* OUR GOAL */}
            <div className="group relative p-10 rounded-[40px] bg-[#FBFBFA] border border-black/5 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Award size={32} className="text-primary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-black text-black/80 mb-4 text-left">Our Goal</h3>
              <p className="text-gray-500 text-left leading-relaxed font-medium">
                Our primary goal is 100% customer satisfaction by delivering consistent, reliable, and high-quality maintenance services that exceed expectations every time.
              </p>
              <div className="absolute bottom-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Award size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
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
        <div className="max-w-7xl mx-auto px-4 text-center">
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
