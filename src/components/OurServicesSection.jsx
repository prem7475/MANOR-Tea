import React from 'react';
import { Package, Truck, Gift, Star, Coffee, ShoppingBag } from 'lucide-react';

const OurServicesSection = () => {
  const services = [
    {
      title: 'Premium Tea Collection',
      description: 'Discover our hand-selected premium teas from the finest plantations worldwide.',
      icon: Coffee,
      color: 'text-manorGreen',
      link: '/products?category=premium'
    },
    {
      title: 'Free Home Delivery',
      description: 'Complimentary home delivery service available exclusively in Nagpur.',
      icon: Truck,
      color: 'text-manorGold',
      link: '/contact'
    },
    {
      title: 'Luxury Gift Hampers',
      description: 'Elegant gift hampers perfect for special occasions and corporate gifting.',
      icon: Gift,
      color: 'text-manorGreen',
      link: '/gifts'
    },
    {
      title: 'Dry Fruits & Nuts',
      description: 'Premium quality dry fruits and nuts, sourced fresh and packaged with care.',
      icon: Package,
      color: 'text-manorGold',
      link: '/products?category=dryfruits'
    },
    {
      title: 'Grocery Essentials',
      description: 'Complete range of grocery items to complement your tea experience.',
      icon: ShoppingBag,
      color: 'text-manorGreen',
      link: '/products?category=grocery'
    },
    {
      title: 'Custom Orders',
      description: 'Special requests and custom blends crafted to your unique preferences.',
      icon: Star,
      color: 'text-manorGold',
      link: '/contact'
    },
  ];

  return (
    <section
      id="services"
      className="relative py-16 bg-manorBg"
      style={{ backgroundImage: "url('/manor%20bg%201.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Shop Our Collections
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium teas, gourmet gifts, and essential groceries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <a
                key={index}
                href={service.link}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group block"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-manorBg mb-4 group-hover:scale-110 transition-transform ${service.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-manorDark mb-3 group-hover:text-manorGreen transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
