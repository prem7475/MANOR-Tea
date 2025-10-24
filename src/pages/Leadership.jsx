import React, { useState } from 'react';
import LeadershipCard from '../components/LeadershipCard.jsx';

const owners = [
  {
    id: 1,
    name: 'Prem Narayani',
    designation: 'Co-Founder, Managing Director & Chief Marketing Officer — MANOR',
    photo: '/PremCEO.jpg',
    details: 'Prem Narayani is the Co-Founder and Managing Director of MANOR, where he also leads marketing and technology operations. With a strong passion for innovation and branding, Prem manages all digital, online, and promotional initiatives that have shaped MANOR’s growing reputation as a premium yet affordable tea brand. Combining modern marketing strategies with traditional business values, he has played a key role in establishing MANOR’s identity and expanding its presence across markets. Prem’s leadership reflects a clear vision — to make MANOR a symbol of quality, trust, and everyday luxury in Indian tea.'
  },
  {
    id: 2,
    name: 'Mukesh Narayani',
    designation: 'Co-Founder, CEO & Chief Financial Officer — MANOR',
    photo: '/MukeshCEO.jpg',
    details: 'Mukesh Narayani is the Co-Founder, Chief Executive Officer, and Chief Financial Officer of MANOR. As the principal force behind the brand, he oversees the company’s strategic direction, operations, and financial planning. With a strong business acumen and commitment to excellence, Mukesh has been instrumental in shaping MANOR’s identity as a trusted and fast-growing tea brand. His leadership focuses on maintaining uncompromised quality, operational efficiency, and long-term sustainability — ensuring that every cup of MANOR tea delivers the perfect blend of tradition and innovation.'
  },
  {
    id: 3,
    name: 'Bhavika Narayani',
    designation: 'Managing Director — MANOR',
    photo: '/BhavikaMD.jpg',
    details: 'Bhavika Narayani is the Managing Director of MANOR, leading the company with a focus on innovation, quality, and customer satisfaction. Her leadership ensures that MANOR continues to grow as a trusted and beloved tea brand.'
  },
  {
    id: 4,
    name: 'Garv Narayani',
    designation: 'Co-Founder & Chief Operating Officer — MANOR',
    photo: '/BhavikaNarayani.jpg',
    details: 'Bhavika Narayani is the Managing Director of MANOR, leading the company with a focus on innovation, quality, and customer satisfaction. Her leadership ensures that MANOR continues to grow as a trusted and beloved tea brand.'
  }
];

const Leadership = () => {
  const [clickedCardId, setClickedCardId] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleCardClick = (id) => {
    setClickedCardId(id === clickedCardId ? null : id);
  };

  const handleShowMore = (id) => {
    setExpandedCardId(id === expandedCardId ? null : id);
  };

  const resetBlur = () => {
    setClickedCardId(null);
  };

  return (
    <div className="p-8 bg-[#fff8ea] text-[#82512f] font-serif min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center cursor-pointer hover:text-[#82512f]/80 transition-colors" onClick={resetBlur}>Our Leadership</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {owners.map(owner => (
          <LeadershipCard
            key={owner.id}
            {...owner}
            isBlurred={clickedCardId !== null && clickedCardId !== owner.id}
            onCardClick={handleCardClick}
            isExpanded={expandedCardId === owner.id}
            onShowMore={handleShowMore}
          />
        ))}
      </div>
    </div>
  );
};

export default Leadership;
