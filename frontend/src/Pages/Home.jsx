import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Video, PenTool, Heart, Leaf, IndianRupee } from 'lucide-react';
import Navbar from '../Component/Layout/Navbar';
import Footer from '../Component/Layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-orange-100 to-red-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604600111728-5914c8aea6ae')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center relative">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Beautiful Digital Invitations
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Blend tradition with technology. Design personalized greetings and invitations that celebrate Indian culture.
            </p>
            <Link
              to="/customize"
              className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition shadow-lg hover:shadow-xl"
            >
              Create Your Invitation Now
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Mail, title: 'Digital Greetings', desc: 'Personalized e-cards for every occasion' },
              { icon: Heart, title: 'Invitations', desc: 'Beautiful designs for your special moments' },
              { icon: Video, title: 'Video Invitations', desc: 'Bring your invitations to life' },
              { icon: PenTool, title: 'Custom Letters', desc: 'Express yourself with elegance' }
            ].map((service, index) => (
              <div key={index} className="p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition">
                <service.icon className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Eco-Friendly', desc: 'Supporting sustainable digital solutions' },
              { icon: Heart, title: 'Make in India', desc: 'Proudly created and developed in India' },
              { icon: IndianRupee, title: 'Digital India', desc: 'Embracing digital transformation' }
            ].map((initiative, index) => (
              <div key={index} className="text-center p-6">
                <initiative.icon className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Design Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'https://images.unsplash.com/photo-1600948836101-f9ffda59d250',
              'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
              'https://images.unsplash.com/photo-1561731216-c3a4d99437d5'
            ].map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <img src={img} alt={`Design preview ${index + 1}`} className="w-full h-64 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;