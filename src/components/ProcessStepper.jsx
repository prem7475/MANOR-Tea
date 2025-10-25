import React from 'react';

const ProcessStepper = () => {
  const steps = [
    {
      icon: '🌿',
      title: 'Sourced from Finest Estates',
      description: 'Hand-picked from premium tea gardens in Assam and Darjeeling'
    },
    {
      icon: '⚖️',
      title: 'Expertly Hand-Blended',
      description: 'Master blenders combine leaves for perfect balance and flavor'
    },
    {
      icon: '🔬',
      title: 'Quality Tested',
      description: 'Rigorous testing ensures purity and consistent excellence'
    },
    {
      icon: '📦',
      title: 'Packed Fresh for You',
      description: 'Sealed immediately after blending for maximum freshness'
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-manorText mb-4">
            Our Process
          </h2>
          <p className="text-lg text-manorText/80 max-w-2xl mx-auto">
            From leaf to cup, every step is crafted with care to bring you the perfect tea experience.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-manorAccent/20 via-manorAccent to-manorAccent/20"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="process-step text-center group">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-manorAccent text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-manorGold text-manorText rounded-full flex items-center justify-center text-lg font-bold">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-manorLight/50 rounded-lg p-6 h-full">
                  <h3 className="text-lg font-serif font-bold text-manorText mb-3">
                    {step.title}
                  </h3>
                  <p className="text-manorText/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <div className="w-8 h-8 border-r-2 border-b-2 border-manorAccent transform rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessStepper;
