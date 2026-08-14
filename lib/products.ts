export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  shortDesc: string;
  weight: string;
  price: number;
  currency: string;
  category: "signature" | "heritage" | "limited";
  flavourProfile: string[];
  accentColor: string;        // HSL or hex — product identity
  accentColorLight: string;
  packageColor: string;       // Visual theme of box
  image: string;              // Primary product image
  imagePkg: string;           // Packaging image
  imageStory: string;         // Wide/editorial image
  ingredients: string[];
  videoSources?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
};

// ── All 5 VOCCA products
export const products: Product[] = [
  {
    id:             "pistachio-kunafa",
    slug:           "pistachio-kunafa-milk-chocolate",
    name:           "Pistachio Kunafa",
    subtitle:       "The Viral Dubai Chocolate",
    description:    "Indulge in the irresistible Pistachio Kunafa Milk Chocolate Bar — a delightful fusion inspired by the viral Dubai chocolate sensation. Each bite unveils a creamy milk chocolate exterior encapsulating a rich layer of pistachio-infused kunafa, delivering a perfect balance of nutty crunch and velvety sweetness. Topped with a sprinkle of toasted pistachios.",
    shortDesc:      "Pistachio-infused kunafa in milk chocolate. The sensation that started it all.",
    weight:         "150g",
    price:          179,
    currency:       "ZAR",
    category:       "signature",
    flavourProfile: ["Pistachio", "Kunafa", "Milk Chocolate", "Toasted Nuts"],
    accentColor:    "#7A9C5A",
    accentColorLight: "#A8C484",
    packageColor:   "#7A8C4A",
    image:          "/images/products/pastichio.png",
    imagePkg:       "/images/products/pastichio.png",
    imageStory:     "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&q=85&auto=format&fit=crop",
    ingredients:    ["Belgian Milk Chocolate", "Pistachio Paste", "Kunafa Pastry", "Toasted Pistachios", "Sea Salt"],
    isNew:          false,
    isFeatured:     true,
  },
  {
    id:             "lotus-kunafa",
    slug:           "lotus-kunafa-milk-chocolate",
    name:           "Lotus Kunafa",
    subtitle:       "Belgian Milk Chocolate",
    description:    "Creamy Lotus Kunafa Bar in Belgian Milk Chocolate. A dreamy marriage of caramelised Lotus biscuit crunch folded into crisp kunafa strands, enrobed in velvety Belgian milk chocolate. Each piece is a meditation on texture — crisp, yielding, and endlessly indulgent.",
    shortDesc:      "Caramelised Lotus biscuit meets kunafa in Belgian milk chocolate.",
    weight:         "150g",
    price:          179,
    currency:       "ZAR",
    category:       "signature",
    flavourProfile: ["Lotus Biscoff", "Kunafa", "Caramel", "Belgian Chocolate"],
    accentColor:    "#C6A56B",
    accentColorLight: "#DFC99A",
    packageColor:   "#C4A84A",
    image:          "/images/products/lotus.jpeg",
    imagePkg:       "/images/products/lotus.jpeg",
    imageStory:     "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=1200&q=85&auto=format&fit=crop",
    ingredients:    ["Belgian Milk Chocolate", "Lotus Biscoff Paste", "Kunafa Pastry", "Caramelised Sugar"],
    isNew:          false,
    isFeatured:     true,
  },
  {
    id:             "hazelnut-kunafa",
    slug:           "hazelnut-kunafa-milk-chocolate",
    name:           "Hazelnut Kunafa",
    subtitle:       "Belgian Milk Chocolate",
    description:    "Creamy Hazelnut Kunafa Bar in Belgian Milk Chocolate. Italian hazelnuts, slow-roasted and blended into a silken praline, woven through crisp kunafa pastry and sealed in a thick shell of Belgian milk chocolate. Rich, deep, and profoundly satisfying.",
    shortDesc:      "Slow-roasted hazelnuts and kunafa in premium Belgian milk chocolate.",
    weight:         "150g",
    price:          179,
    currency:       "ZAR",
    category:       "signature",
    flavourProfile: ["Hazelnut", "Praline", "Kunafa", "Milk Chocolate"],
    accentColor:    "#8B5E3C",
    accentColorLight: "#B8845C",
    packageColor:   "#7A4A28",
    image:          "/images/products/hazelnut-kunafa.png",
    imagePkg:       "/images/products/hazelnut-kunafa.png",
    imageStory:     "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200&q=85&auto=format&fit=crop",
    ingredients:    ["Belgian Milk Chocolate", "Hazelnut Praline", "Kunafa Pastry", "Roasted Hazelnuts"],
    isNew:          false,
    isFeatured:     true,
  },
  {
    id:             "angel-hair",
    slug:           "angel-hair-white-chocolate",
    name:           "Angel Hair",
    subtitle:       "White Chocolate · 200g",
    description:    "Fluffy Cotton Candy in White Chocolate. A playful, surreal experience — clouds of hand-spun cotton candy suspended in ivory white chocolate, drizzled with a dreamlike iridescent glaze. Light, ethereal, and unmistakably VOCCA.",
    shortDesc:      "Hand-spun cotton candy suspended in ivory white chocolate.",
    weight:         "200g",
    price:          200,
    currency:       "ZAR",
    category:       "limited",
    flavourProfile: ["Cotton Candy", "White Chocolate", "Vanilla", "Light Sugar"],
    accentColor:    "#D4849A",
    accentColorLight: "#F0D8E0",
    packageColor:   "#C875B0",
    image:          "/images/products/angel.png",
    imagePkg:       "/images/products/angel.png",
    imageStory:     "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&q=85&auto=format&fit=crop",
    ingredients:    ["Belgian White Chocolate", "Cotton Candy", "Vanilla Extract", "Natural Colours"],
    isNew:          true,
    isFeatured:     true,
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
