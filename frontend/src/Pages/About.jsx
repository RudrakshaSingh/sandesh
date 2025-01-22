import React from 'react';
import { Leaf, Heart, IndianRupee } from 'lucide-react';
import Navbar from '../Component/Layout/Navbar';
import Footer from '../Component/Layout/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-100 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Paigaam</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Blending tradition with technology to create meaningful connections through digital invitations
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Paigaam, we're committed to preserving and celebrating Indian traditions while embracing modern technology. Our platform enables users to create beautiful digital invitations that reflect the richness of Indian culture.
              </p>
              <p className="text-gray-700">
                We believe in making celebration planning easier, more sustainable, and more personal through innovative digital solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1604600111728-5914c8aea6ae',
                'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
                'https://images.unsplash.com/photo-1561731216-c3a4d99437d5',
                'https://images.unsplash.com/photo-1600948836101-f9ffda59d250'
              ].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`About us ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'Committed to reducing paper waste through digital solutions'
              },
              {
                icon: Heart,
                title: 'Cultural Heritage',
                description: 'Preserving and celebrating Indian traditions in the digital age'
              },
              {
                icon: IndianRupee,
                title: 'Accessibility',
                description: 'Making beautiful invitations affordable and accessible to everyone'
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6">
                <value.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Wedding Planning',
                text: 'Paigaam made our wedding invitations truly special. The designs perfectly captured our traditional values.'
              },
              {
                name: 'Rahul Verma',
                role: 'Birthday Celebration',
                text: 'The platform is so easy to use, and the results are stunning. Highly recommend for any celebration!'
              },
              {
                name: 'Anita Patel',
                role: 'Festival Organizer',
                text: 'The cultural elements in their designs are authentic and beautiful. Perfect for our community events.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default About;