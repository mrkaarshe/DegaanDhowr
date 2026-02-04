"use client";
import Link from 'next/link';
import { 
  ArrowRight, Briefcase, MapPin, Clock, 
  CheckCircle2, Star, Target, Sparkles, 
  Sprout, GraduationCap, ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Career = () => {
  // Gardener Job Details
  const gardenerExpectations = [
    { title: 'Gardening Expertise', desc: 'Planting, pruning, and lawn care experience.', icon: Sprout },
    { title: 'Education', desc: 'Bachelor degree in Agriculture required.', icon: GraduationCap },
    { title: 'Attention to Detail', desc: 'Maintain debris-free and healthy landscapes.', icon: Target },
    { title: 'Safety Awareness', desc: 'Proper handling of chemicals and tools.', icon: ShieldCheck },
  ];

  const perks = [
    { 
      category: 'We Care', 
      items: ['Predictable salary progression', 'Flexible working hours', 'Team building activities'],
      icon: Star,
      color: 'text-green-600 bg-green-50'
    },
    { 
      category: 'We Improve', 
      items: ['Continuous mentorship', 'Internal & external training', 'Fast career growth'],
      icon: Sparkles,
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- Modern Hero --- */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-green-100/30 blur-[120px] rounded-full -z-10" />
        <div className="container mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest mb-6">
            <Briefcase size={14} /> Careers at Degaandhowr
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Grow your <span className="text-green-600">Future</span> with us.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Join a team that takes pride in maintaining beautiful landscapes and delivering world-class cleaning services.
          </p>
        </div>
      </section>

      {/* --- Featured Job: Gardener --- */}
      <section className="py-12">
        <div className="">
          <div className="bg-slate-900  p-8 md:p-16 text-white overflow-hidden relative">
            <div className='container mx-auto px-0 md:px-5 lg:px-7'>
            <div className="absolute top-0 right-0 p-12 opacity-10">
                <Sprout size={200} />
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1 bg-green-500 rounded-full text-xs font-bold uppercase">Hiring Now</span>
                  <span className="text-gray-400 font-medium">Full-time • Mogadishu</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Gardener Specialist</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  We are looking for a dedicated and skilled gardener to join our team. 
                  Help us maintain beautiful, healthy landscapes for our clients.
                </p>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 rounded-2xl font-bold text-lg group">
                   Apply for this Role
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gardenerExpectations.map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <item.icon className="text-green-400 mb-4" size={24} />
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Perks & Benefits --- */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Perks of Working with Us</h2>
            <p className="text-gray-500 mt-4">More than just a job, we offer a path to growth.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {perks.map((perk, idx) => (
              <Card key={idx} className="border-0 bg-gray-50/50 rounded-[2.5rem] p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl ${perk.color} flex items-center justify-center shadow-sm`}>
                    <perk.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">{perk.category}</h3>
                </div>
                <ul className="space-y-4">
                  {perk.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                      <CheckCircle2 className="text-green-500" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="  ">
        <div className="bg-green-600 r p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to join the mission?</h2>
            <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto">
              Please contact the below address along with your most recent CV and cover letter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:Careers@degaandhowr.com" 
                className="bg-white text-green-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all  shadow-green-900/20"
              >
                Careers@degaandhowr.com
              </a>
              <Link href="/contact" className="text-white font-bold flex items-center gap-2 hover:underline">
                Contact Support <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;