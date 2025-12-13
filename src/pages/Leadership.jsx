import React, { useState } from 'react';
import LeadershipCard from '../components/LeadershipCard.jsx';

const owners = [
  {
    id: 1,
    name: 'Prem Narayani',
    designation: 'Co-Founder, Managing Director & Chief Marketing Officer — MANOR',
    image: '/PremCEO.jpg', 
    details: 'Prem Narayani is the Co-Founder and Managing Director of MANOR, where he also leads marketing and technology operations. With a strong passion for innovation and branding, Prem manages all digital, online, and promotional initiatives that have shaped MANOR’s growing reputation as a premium yet affordable tea brand. Combining modern marketing strategies with traditional business values, he has played a key role in establishing MANOR’s identity and expanding its presence across markets. Prem’s leadership reflects a clear vision — to make MANOR a symbol of quality, trust, and everyday luxury in Indian tea.'
  },
  {
    id: 2,
    name: 'Mukesh Narayani',
    designation: 'Co-Founder, CEO & Chief Financial Officer — MANOR',
    image: '/MukeshCEO.jpg',
    details: 'Mukesh Narayani is the Co-Founder, Chief Executive Officer, and Chief Financial Officer of MANOR. As the principal force behind the brand, he oversees the company’s strategic direction, operations, and financial planning. With a strong business acumen and commitment to excellence, Mukesh has been instrumental in shaping MANOR’s identity as a trusted and fast-growing tea brand. His leadership focuses on maintaining uncompromised quality, operational efficiency, and long-term sustainability — ensuring that every cup of MANOR tea delivers the perfect blend of tradition and innovation.'
  },
  {
    id: 3,
    name: 'Bhavika Narayani',
    designation: 'Managing Director — MANOR',
    image: '/BhavikaMD.jpg',
    details: 'Bhavika Narayani is the Managing Director of MANOR, leading the company with a focus on innovation, quality, and customer satisfaction. Her leadership ensures that MANOR continues to grow as a trusted and beloved tea brand.'
  },
  {
    id: 4,
    name: 'Garv Narayani',
    designation: 'Co-Founder & Chief Operating Officer — MANOR',
    // Note: Using BhavikaMD.jpg temporarily as Garv's photo wasn't in the file list
    image: '/BhavikaMD.jpg', 
    details: 'Garv Narayani is the Co-Founder & COO of MANOR, leading the company with a focus on innovation, quality, and customer satisfaction.'
  }
];

const Leadership = () => {
  // We only need state for the "Show More" expansion now
  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleShowMore = (index) => {
    // If clicking the already expanded card, collapse it (null). Otherwise set to new ID.
    const id = owners[index].id;
    setExpandedCardId(id === expandedCardId ? null : id);
  };

  return (
    <div className="p-8 bg-[#FFF9F2] text-[#2B221F] font-serif min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center uppercase tracking-wide">
          Our Leadership
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {owners.map((owner, index) => (
            <LeadershipCard
              key={owner.id}
              {...owner}
              index={index}
              // Pass the state to the card so it knows if it should show full text
              isExpanded={expandedCardId === owner.id}
              onShowMore={handleShowMore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;