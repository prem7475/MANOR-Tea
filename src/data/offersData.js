const offersData = [
  {
    id: 'TIER10',
    code: 'MANOR10',
    title: 'MANOR TIER 1',
    detail: 'Get 10% off on orders above ₹500',
    desc: '10% discount on orders above ₹500',
    terms: 'Min. order ₹500. Valid on all products.',
    logo: '/images/manor-logo.png',
    minAmount: 500,
    discount: 0.1,
    type: 'percent',
    value: 0.1,
    minOrder: 500
  },
  {
    id: 'TIER20',
    code: 'MANOR20',
    title: 'MANOR TIER 2',
    detail: 'Get 20% off on orders above ₹1,000',
    desc: '20% discount on orders above ₹1000',
    terms: 'Min. order ₹1,000. Valid on all products.',
    logo: '/images/manor-logo.png',
    minAmount: 1000,
    discount: 0.2,
    type: 'percent',
    value: 0.2,
    minOrder: 1000
  },
  {
    id: 'PAYTM100',
    code: 'PAYTM100',
    title: 'Paytm UPI - Up to ₹100 Cashback',
    detail: 'Up to ₹100 cashback if paid from Paytm UPI (on orders above ₹500)',
    desc: 'Up to ₹100 cashback if paid from Paytm UPI (on orders above ₹500)',
    terms: ['Valid on Paytm UPI', 'Orders above ₹500', 'Terms and conditions apply'],
    logo: '/images/paytm-logo.png',
    minAmount: 500,
    discount: 100,
    type: 'flat',
    value: 100,
    minOrder: 500
  },
];

export default offersData;
