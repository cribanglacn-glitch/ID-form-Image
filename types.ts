export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  styleName: string;
  loading: boolean;
  error?: string;
}

export enum PhotoStyle {
  // Female Hairstyles (Professional)
  ShortBob = 'Sleek Bob',
  LongWavy = 'Long Soft Waves',
  HighPonytail = 'High Ponytail',
  PixieCut = 'Pixie Cut',
  LongStraight = 'Straight & Sleek',
  Curly = 'Voluminous Curls',
  LowBun = 'Professional Bun',
  SideSwept = 'Side Swept',
  Layered = 'Layered Cut',

  // Female Fashion (Trendy)
  BlueSaree = 'Royal Blue Saree',
  DenimChic = 'Denim & White Tank',
  RedSkirtCombo = 'Red Top & Printed Skirt',
  WhiteTeeJeans = 'White Tee & Blue Jeans',
  BlackCropTrendy = 'Black Top & Jeans',
  ModernKurti = 'Modern Kurti',
  LeatherJacket = 'Leather Jacket Style',
  BohoDress = 'Bohemian Summer Dress',
  EveningGown = 'Evening Gown',

  // Male Formal Attire (Professional)
  NavySuitRedTie = 'Navy Suit & Red Tie',
  BlackSuitBlueTie = 'Black Suit & Blue Tie',
  CharcoalSuit = 'Charcoal Grey Suit',
  Tuxedo = 'Formal Tuxedo',
  GreyBlazer = 'Grey Blazer & White Shirt',
  ClassicBlack = 'Classic Black Suit',
  BusinessCasual = 'Blue Button-down',
  Pinstripe = 'Pinstripe Suit',
  TanSuit = 'Beige Professional Suit',

  // Male Fashion (Trendy)
  UrbanHoodie = 'Sage Green Hoodie',
  LayeredScarf = 'Blazer & Scarf Layering',
  RustBlazer = 'Rust Blazer & Orange Shirt',
  BrownSuitVintage = 'Brown Vintage Suit',
  DenimShirt = 'Denim Shirt & White Tee',
  StreetwearBomber = 'Bomber Jacket',
  PoloChinos = 'Polo Shirt & Chinos',
  TurtleneckCoat = 'Turtleneck & Overcoat',
  FloralShirt = 'Summer Floral Shirt',
  
  Custom = 'Custom Edit'
}

export interface StyleConfig {
  id: string;
  name: string;
  promptSuffix: string;
}