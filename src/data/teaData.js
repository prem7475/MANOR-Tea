const teaData = [
  {
    id: "1",
    name: "Manor Leaf Tea Pouch",
    description: "Rich and aromatic leaf tea pouch.",
    price: 147,
    originalPrice: 155,
    discountPercent: 5,
    isBestSeller: true,
    isSoldOut: false,
    image: "/Manor (1).jpg",
    weight: 100,
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
    name: "Manor Leaf Tea Jar",
    description: "Fresh leaf tea in jar packaging.",
    price: 160,
    originalPrice: 165,
    discountPercent: 3,
    isBestSeller: false,
    isSoldOut: false,
    image: "/Manor (2).jpg",
    weight: 150,
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
    name: "Manor Premium Leaf Tea Pouch",
    description: "Smooth and flavorful leaf tea pouch.",
    price: 318,
    originalPrice: 335,
    discountPercent: 0,
    isBestSeller: false,
    isSoldOut: true,
    image: "/Manor (3).jpg",
    weight: 200,
    rating: 4.7,
    reviews: 67,
    ingredients: [
      { name: "Darjeeling Tea", description: "Champagne of teas, with muscatel notes and superior quality.", position: { top: "30%", left: "40%" } },
      { name: "Rose Petals", description: "Dried rose petals for a romantic floral touch.", position: { top: "55%", left: "60%" } }
    ]
  },
  {
    id: "4",
    name: "Manor Chahat Leaf Tea Pouch",
    description: "Refreshing Chahat leaf tea pouch.",
    price: 54,
    originalPrice: 60,
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
  {
    id: "5",
    name: "Amar Leaf Tea",
    description: "Classic Amar leaf tea.",
    price: 120,
    originalPrice: 130,
    discountPercent: 8,
    isBestSeller: false,
    isSoldOut: true,
    image: "/Manor (5).jpg",
    weight: 180,
    rating: 4.4,
    reviews: 78,
    ingredients: [
      { name: "Oolong Tea", description: "Semi-oxidized tea with complex flavor profiles.", position: { top: "40%", left: "50%" } },
      { name: "Chrysanthemum", description: "Floral flower that adds subtle sweetness.", position: { top: "60%", left: "35%" } }
    ]
  },
  {
    id: "6",
    name: "Chai Leaf Tea",
    description: "Spicy and warm chai leaf tea.",
    price: 85,
    originalPrice: 92,
    discountPercent: 8,
    isBestSeller: false,
    isSoldOut: false,
    image: "/Manor (6).jpg",
    weight: 100,
    rating: 4.3,
    reviews: 92,
    ingredients: [
      { name: "Black Tea Base", description: "Strong black tea foundation for traditional chai.", position: { top: "20%", left: "40%" } },
      { name: "Cloves", description: "Aromatic spice that provides warmth and depth.", position: { top: "45%", left: "65%" } },
      { name: "Star Anise", description: "Licorice-like spice for complex flavor.", position: { top: "70%", left: "50%" } }
    ]
  },
  {
    id: "7",
    name: "Premium Leaf Tea Pouch",
    description: "Smooth and fragrant leaf tea pouch.",
    price: 200,
    originalPrice: 220,
    discountPercent: 9,
    isBestSeller: false,
    isSoldOut: true,
    image: "/Manor (7).jpg",
    weight: 100,
    rating: 4.6,
    reviews: 134,
    ingredients: [
      { name: "Pu-erh Tea", description: "Aged fermented tea with earthy, complex flavors.", position: { top: "30%", left: "50%" } },
      { name: "Orange Peel", description: "Citrus peel for bright, tangy notes.", position: { top: "55%", left: "30%" } }
    ]
  },
  {
    id: "8",
    name: "Leaf Tea Pack",
    description: "Special leaf tea pack with 15% off.",
    price: 170,
    originalPrice: 200,
    discountPercent: 15,
    isBestSeller: false,
    isSoldOut: false,
    image: "/Manor (1).jpg",
    weight: 100,
    rating: 4.7,
    reviews: 98,
    ingredients: [
      { name: "Assam Tea", description: "Bold black tea from Assam, full-bodied and malty.", position: { top: "25%", left: "35%" } },
      { name: "Vanilla Bean", description: "Sweet vanilla for a creamy, dessert-like quality.", position: { top: "50%", left: "60%" } }
    ]
  },
  // Gift Hampers
  {
    id: "g1",
    name: "Manor Gift Hamper 1",
    description: "A delightful assortment of premium teas.",
    price: 250,
    originalPrice: 300,
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
    price: 400,
    originalPrice: 450,
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
    price: 350,
    originalPrice: 400,
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
    price: 300,
    originalPrice: 350,
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
    price: 450,
    originalPrice: 500,
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
    price: 500,
    originalPrice: 550,
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
