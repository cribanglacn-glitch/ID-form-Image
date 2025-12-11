import { StyleConfig, PhotoStyle } from './types';

const COMMON_PARAMS = "Solid bright white background. High quality, photorealistic, sharp focus, professional ID photo style, soft studio lighting, maintain facial features exactly.";
const FASHION_PARAMS = "High editorial fashion quality, photorealistic, sharp focus, stylish studio lighting, maintain facial features exactly, neutral soft studio background.";

// Professional / ID Presets (Female focus on Hair, Male focus on Suits)

export const FEMALE_PRESETS: StyleConfig[] = [
  {
    id: 'hair-bob',
    name: PhotoStyle.ShortBob,
    promptSuffix: `Change hairstyle to a sleek, chin-length bob cut. Side part. Professional and modern. ${COMMON_PARAMS}`
  },
  {
    id: 'hair-wavy',
    name: PhotoStyle.LongWavy,
    promptSuffix: `Change hairstyle to long, soft distinct waves. Volume at the roots. Blowout look. ${COMMON_PARAMS}`
  },
  {
    id: 'hair-pony',
    name: PhotoStyle.HighPonytail,
    promptSuffix: `Change hairstyle to a sleek high ponytail pulled back tight from the face. Clean and sharp look. ${COMMON_PARAMS}`
  },
  {
    id: 'hair-pixie',
    name: PhotoStyle.PixieCut,
    promptSuffix: `Change hairstyle to a modern textured pixie cut with short bangs. Chic and professional. ${COMMON_PARAMS}`
  },
  {
    id: 'hair-straight',
    name: PhotoStyle.LongStraight,
    promptSuffix: `Change hairstyle to long, straight, sleek hair falling over shoulders. Middle part. Glossy finish. ${COMMON_PARAMS}`
  },
  {
    id: 'hair-curly',
    name: PhotoStyle.Curly,
    promptSuffix: `Change hairstyle to shoulder-length defined curly hair. Natural curls with volume. ${COMMON_PARAMS}`
  },
  {
    id: 'hair-bun',
    name: PhotoStyle.LowBun,
    promptSuffix: `Change hairstyle to a neat, professional low bun. No flyaways. Elegant corporate look. ${COMMON_PARAMS}`
  },
  {
    id: 'hair-side',
    name: PhotoStyle.SideSwept,
    promptSuffix: `Change hairstyle to side-swept hair with a deep side part. Glamorous yet professional. ${COMMON_PARAMS}`
  },
  {
    id: 'hair-layered',
    name: PhotoStyle.Layered,
    promptSuffix: `Change hairstyle to a medium-length layered cut with face-framing strands. ${COMMON_PARAMS}`
  }
];

export const MALE_PRESETS: StyleConfig[] = [
  {
    id: 'suit-navy',
    name: PhotoStyle.NavySuitRedTie,
    promptSuffix: `Change clothing to a dark navy blue professional suit jacket, crisp white dress shirt, and a red silk tie. ${COMMON_PARAMS}`
  },
  {
    id: 'suit-black-blue',
    name: PhotoStyle.BlackSuitBlueTie,
    promptSuffix: `Change clothing to a sharp black suit jacket, white shirt, and a royal blue tie. ${COMMON_PARAMS}`
  },
  {
    id: 'suit-charcoal',
    name: PhotoStyle.CharcoalSuit,
    promptSuffix: `Change clothing to a charcoal grey tailored suit, white shirt, and a dark grey textured tie. ${COMMON_PARAMS}`
  },
  {
    id: 'suit-tuxedo',
    name: PhotoStyle.Tuxedo,
    promptSuffix: `Change clothing to a formal black tuxedo with a black bow tie and white pleated shirt. ${COMMON_PARAMS}`
  },
  {
    id: 'suit-grey-blazer',
    name: PhotoStyle.GreyBlazer,
    promptSuffix: `Change clothing to a light grey blazer, open collar white crisp shirt, no tie. Smart business casual. ${COMMON_PARAMS}`
  },
  {
    id: 'suit-classic',
    name: PhotoStyle.ClassicBlack,
    promptSuffix: `Change clothing to a classic black suit, white shirt, and a skinny black tie. Modern professional. ${COMMON_PARAMS}`
  },
  {
    id: 'suit-business',
    name: PhotoStyle.BusinessCasual,
    promptSuffix: `Change clothing to a light blue oxford button-down shirt. Clean, ironed, professional look. No jacket. ${COMMON_PARAMS}`
  },
  {
    id: 'suit-pinstripe',
    name: PhotoStyle.Pinstripe,
    promptSuffix: `Change clothing to a navy pinstripe suit jacket, white shirt, and a burgundy tie. Corporate executive style. ${COMMON_PARAMS}`
  },
  {
    id: 'suit-tan',
    name: PhotoStyle.TanSuit,
    promptSuffix: `Change clothing to a beige/tan summer suit jacket, light blue shirt, and no tie. ${COMMON_PARAMS}`
  }
];

// Fashion / Trendy Presets (New)

export const FEMALE_FASHION_PRESETS: StyleConfig[] = [
  {
    id: 'fashion-saree',
    name: PhotoStyle.BlueSaree,
    promptSuffix: `Change clothing to a traditional Royal Blue Saree with gold borders. Elegant South Asian style, draped perfectly. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-denim-chic',
    name: PhotoStyle.DenimChic,
    promptSuffix: `Change clothing to a white tank top with a blue denim jacket draped loosely over shoulders. Ripped jeans visible. Urban chic style. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-red-skirt',
    name: PhotoStyle.RedSkirtCombo,
    promptSuffix: `Change clothing to a fitted red long-sleeve top and a flowy printed midi skirt. Playful and vibrant fashion. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-white-tee',
    name: PhotoStyle.WhiteTeeJeans,
    promptSuffix: `Change clothing to a classic white V-neck t-shirt and blue denim jeans. Simple, clean, timeless casual look. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-black-crop',
    name: PhotoStyle.BlackCropTrendy,
    promptSuffix: `Change clothing to a stylish black sleeveless crop top and high-waisted jeans. Modern trendy influencer look. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-kurti',
    name: PhotoStyle.ModernKurti,
    promptSuffix: `Change clothing to a stylish modern Kurti top with intricate embroidery. Indo-western fusion style. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-leather',
    name: PhotoStyle.LeatherJacket,
    promptSuffix: `Change clothing to a black leather biker jacket over a white tee. Edgy, confident look. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-boho',
    name: PhotoStyle.BohoDress,
    promptSuffix: `Change clothing to a floral bohemian maxi dress. Soft, breezy, summer fashion style. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-gown',
    name: PhotoStyle.EveningGown,
    promptSuffix: `Change clothing to an elegant evening gown with sequins. Glamorous red carpet look. ${FASHION_PARAMS}`
  }
];

export const MALE_FASHION_PRESETS: StyleConfig[] = [
  {
    id: 'fashion-hoodie',
    name: PhotoStyle.UrbanHoodie,
    promptSuffix: `Change clothing to a sage green pullover hoodie. Casual streetwear style, hood down. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-scarf',
    name: PhotoStyle.LayeredScarf,
    promptSuffix: `Change clothing to a mustard brown blazer, a beige scarf wrapped loosely, and a dark vest. Artsy layered look. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-rust-blazer',
    name: PhotoStyle.RustBlazer,
    promptSuffix: `Change clothing to a rust-orange blazer, a bright orange button-down shirt, and grey trousers. Bold smart casual. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-vintage-suit',
    name: PhotoStyle.BrownSuitVintage,
    promptSuffix: `Change clothing to a chocolate brown vintage suit jacket, matching trousers, and a retro tie. Dapper gentleman style. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-denim-shirt',
    name: PhotoStyle.DenimShirt,
    promptSuffix: `Change clothing to a green-grey denim shirt worn open over a white t-shirt. Rugged casual style. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-bomber',
    name: PhotoStyle.StreetwearBomber,
    promptSuffix: `Change clothing to a black nylon bomber jacket over a grey hoodie. Modern urban outfit. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-polo',
    name: PhotoStyle.PoloChinos,
    promptSuffix: `Change clothing to a fitted navy polo shirt and beige chinos. Preppy casual look. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-turtleneck',
    name: PhotoStyle.TurtleneckCoat,
    promptSuffix: `Change clothing to a black turtleneck sweater and a camel overcoat. Sophisticated winter fashion. ${FASHION_PARAMS}`
  },
  {
    id: 'fashion-floral',
    name: PhotoStyle.FloralShirt,
    promptSuffix: `Change clothing to a short-sleeve tropical floral print shirt. Summer vacation vibe. ${FASHION_PARAMS}`
  }
];