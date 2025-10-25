import React from 'react';

const FoundersNote = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-manorBg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Founder's Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src="/images/founder-prem.jpg"
                alt="Prem - Founder of MANOR"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-manorAccent shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-manorAccent text-white px-3 py-1 rounded-full text-sm font-semibold">
                Founder
              </div>
            </div>
          </div>

          {/* Founder's Message */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-manorText mb-4">
              A Note from Our Founder
            </h2>

            <blockquote className="text-lg md:text-xl text-manorText/90 leading-relaxed mb-6 italic">
              "At MANOR, we believe that great tea isn't just about taste—it's about creating moments of peace and connection in our busy lives.
              Every leaf we source, every blend we craft, carries our commitment to bringing you the finest tea experience, straight from the heart of India's tea estates to your cup."
            </blockquote>

            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="text-sm text-manorText/70">
                <strong className="text-manorText">Prem</strong><br />
                Founder & Tea Master
              </div>
              <div className="hidden md:block w-px h-12 bg-manorAccent/30"></div>
              <div className="text-sm text-manorText/70">
                <strong className="text-manorText">15+ Years</strong><br />
                Tea Expertise
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersNote;
