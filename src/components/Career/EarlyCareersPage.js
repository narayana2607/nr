import React from "react";
import "./EarlyCareers.css";



export default function EarlyCareersPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0')] bg-cover bg-center h-[60vh] flex items-center justify-center text-white text-center px-4">
        <div className="bg-black bg-opacity-50 p-6 rounded-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Launch Your Career at Johnson Controls</h1>
          <p className="text-lg md:text-xl mb-6">Explore our early career programs and shape the future with us.</p>
          <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-semibold">Explore Programs</button>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Early Career Programs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Accounting & Finance Rotation Program",
              desc: "Gain experience in tax, treasury, audit, and more. Develop leadership in financial strategy."
            },
            {
              title: "Accelerated Controls Excellence (ACE)",
              desc: "Two-year sales and technical program designed to groom future leaders in controls."
            },
            {
              title: "Supply Chain Development Program (SCDP)",
              desc: "Hands-on rotational program across supply chain roles including procurement and logistics."
            },
            {
              title: "Building Engineering Sales Training (BEST)",
              desc: "4-month fast-track training for engineers to step into technical sales roles."
            },
            {
              title: "IT Rotational Program",
              desc: "Two-year journey through data, security, automation, and more in IT tracks."
            }
          ].map((program, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
              <p>{program.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What Our Interns Say</h2>
          <div className="space-y-8">
            <blockquote className="italic">“The rotational program helped me find my passion and build strong skills.” — Alex R.</blockquote>
            <blockquote className="italic">“BEST gave me confidence to jump into a technical sales role straight out of college.” — Jamie K.</blockquote>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to take the next step?</h2>
        <p className="mb-6">Submit your resume or apply directly to one of our programs today.</p>
        <button className="bg-white text-blue-600 hover:bg-gray-100 transition px-6 py-3 rounded-xl font-semibold">Apply Now</button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Johnson Controls. All rights reserved.</p>
      </footer>
    </div>
  );
}
