const teaData = [
  {
    id: "1",
    name: "MANOR Tea leaf 250gms",
    description: "Rich and aromatic leaf tea pouch.",
    price: 150,
    originalPrice: 195,
    discountPercent: 5,
    isBestSeller: true,
    isSoldOut: false,
    image: "/Manor (1).jpg",
    weight: 250,
    rating: 4.8,
    reviews: 124,
    mood: ["Calming & Relaxing", "Focus"],
    benefit: ["Immunity"],
    tastingNotes: ["Spicy", "Floral"],
    ingredients: [
      { name: "Black Tea Leaves", description: "Premium Assam black tea leaves, rich in antioxidants and providing a robust base.", position: { top: "20%", left: "30%" } },
      { name: "Cardamom", description: "Aromatic spice that adds warmth and digestive benefits.", position: { top: "40%", left: "60%" } },
      { name: "Ginger", description: "Fresh ginger root for a spicy kick and immune support.", position: { top: "60%", left: "25%" } },
      { name: "Cinnamon", description: "Sweet and woody spice that enhances flavor complexity.", position: { top: "50%", left: "70%" } }
    ]
  },
  {
    id: "2",
    name: "MANOR Tea leaf 500gms",
    description: "Fresh leaf tea in jar packaging.",
    price: 300,
    originalPrice: 390,
    discountPercent: 3,
    isBestSeller: false,
    isSoldOut: false,
    image: "/Manor (2).jpg",
    weight: 500,
    rating: 4.6,
    reviews: 89,
    mood: ["Energizing"],
    benefit: ["Digestion"],
    tastingNotes: ["Earthy", "Robust"],
    ingredients: [
      { name: "Green Tea Leaves", description: "High-quality green tea leaves, packed with catechins for energy and metabolism.", position: { top: "25%", left: "35%" } },
      { name: "Jasmine Flowers", description: "Delicate jasmine blossoms that infuse a floral aroma.", position: { top: "45%", left: "65%" } },
      { name: "Lemon Grass", description: "Citrusy herb that aids digestion and adds brightness.", position: { top: "65%", left: "30%" } }
    ]
  },
  {
    id: "3",
    name: "MANOR Dust Tea Lose",
    description: "Smooth and flavorful leaf tea pouch.",
    price: 180,
    originalPrice: 260,
    discountPercent: 0,
    isBestSeller: false,
    isSoldOut: true,
    image: "/Manor (3).jpg",
    weight: 250,
    rating: 4.7,
    reviews: 67,
    ingredients: [
      { name: "Darjeeling Tea", description: "Champagne of teas, with muscatel notes and superior quality.", position: { top: "30%", left: "40%" } },
      { name: "Rose Petals", description: "Dried rose petals for a romantic floral touch.", position: { top: "55%", left: "60%" } }
    ]
  },
  {
    id: "4",
    name: "MANOR Custom made",
    description: "Refreshing Chahat leaf tea pouch.",
    price: 380,
    originalPrice: 520,
    discountPercent: 10,
    isBestSeller: false,
    isSoldOut: false,
    image: "/Manor (4).jpg",
    weight: 120,
    rating: 4.5,
    reviews: 156,
    ingredients: [
      { name: "White Tea Leaves", description: "Minimally processed tea leaves, rich in antioxidants.", position: { top: "35%", left: "45%" } },
      { name: "Mint Leaves", description: "Fresh mint for a cooling, refreshing sensation.", position: { top: "50%", left: "70%" } }
    ]
  },

  // Gift Hampers
  {
    id: "g1",
    name: "Manor Gift Hamper 1",
    description: "A delightful assortment of premium teas.",
    price: 399,
    originalPrice: 549,
    discountPercent: 17,
    isBestSeller: true,
    isSoldOut: false,
    image: "/gift hamper 1.jpg",
    weight: 500,
    rating: 4.8,
    reviews: 76
  },
  {
    id: "g2",
    name: "Manor Gift Hamper 2",
    description: "Luxury tea collection for special occasions.",
    price: 499,
    originalPrice: 799,
    discountPercent: 11,
    isBestSeller: false,
    isSoldOut: false,
    image: "/gift hamper 2.jpg",
    weight: 600,
    rating: 4.9,
    reviews: 43
  },
  {
    id: "g3",
    name: "Manor Gift Hamper 3",
    description: "Exquisite tea hamper with exotic flavors.",
    price: 1199,
    originalPrice: 1799,
    discountPercent: 13,
    isBestSeller: false,
    isSoldOut: false,
    image: "/gift hamper 3.jpg",
    weight: 550,
    rating: 4.7,
    reviews: 58
  },
  {
    id: "g4",
    name: "Manor Gift Hamper 4",
    description: "Premium tea selection for tea lovers.",
    price: 1499,
    originalPrice: 1999,
    discountPercent: 14,
    isBestSeller: true,
    isSoldOut: false,
    image: "/gift hamper 4.jpg",
    weight: 500,
    rating: 4.6,
    reviews: 89
  },
  {
    id: "g5",
    name: "Manor Gift Hamper 5",
    description: "Elegant tea hamper with assorted blends.",
    price: 499,
    originalPrice: 659,
    discountPercent: 10,
    isBestSeller: false,
    isSoldOut: false,
    image: "/gift hamper 5.jpg",
    weight: 600,
    rating: 4.8,
    reviews: 67
  },
  {
    id: "g6",
    name: "Manor Gift Hamper 6",
    description: "Ultimate tea gift set for connoisseurs.",
    price: 999,
    originalPrice: 1499,
    discountPercent: 9,
    isBestSeller: false,
    isSoldOut: false,
    image: "/gift hamper 6.jpg",
    weight: 650,
    rating: 4.9,
    reviews: 52
  },
];

export default teaData;
