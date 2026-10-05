/**
 * Official Soham Bhojnalay Menu Data
 * Transcribed accurately from the official menu board.
 */

export interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  category: 'thali' | 'bhaji' | 'roti' | 'khichdi' | 'breakfast';
  categoryLabel: string;
  price: number;
  unit?: string; // e.g. "प्लेट", "2 पीस"
  description?: string;
  isPopular?: boolean;
  isSpecial?: boolean;
  badge?: string;
}

export const MENU_CATEGORIES = [
  { id: 'all', label: 'सर्व पदार्थ', icon: '🍽️' },
  { id: 'thali', label: 'थाळी स्पेशल', icon: '🍛' },
  { id: 'bhaji', label: 'भाजी & मुख्य', icon: '🍲' },
  { id: 'roti', label: 'भाकरी & पोळी', icon: '🫓' },
  { id: 'khichdi', label: 'खिचडी स्पेशल', icon: '🍚' },
  { id: 'breakfast', label: 'नाश्ता & इतर', icon: '☕' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // 1. थाळी
  {
    id: 'thali-regular',
    name: 'Regular थाळी',
    englishName: 'Regular Thali',
    category: 'thali',
    categoryLabel: 'थाळी स्पेशल',
    price: 130,
    description: '२ भाज्या, ३ पोळ्या, ½ प्लेट भात, कढी, १ प्लेट (सलाड / लोणचं)',
    isPopular: true,
    badge: 'सर्वाधिक पसंती'
  },
  {
    id: 'thali-potbhar',
    name: 'पोटभर जेवण थाळी',
    englishName: 'Potbhar Jevan Thali',
    category: 'thali',
    categoryLabel: 'थाळी स्पेशल',
    price: 160,
    description: 'पोटभर अस्सल घरगुती जेवण (अमर्यादित समाधान)',
    isSpecial: true,
    badge: 'स्पेशल थाळी'
  },

  // 2. भाकरी & पोळी
  {
    id: 'roti-poli',
    name: '१ पोळी',
    englishName: '1 Poli (Chapati)',
    category: 'roti',
    categoryLabel: 'भाकरी & पोळी',
    price: 15,
    description: 'गरमागरम मऊ घरगुती गव्हाची पोळी'
  },
  {
    id: 'roti-bhakari',
    name: '१ भाकरी',
    englishName: '1 Bhakari (Jowar)',
    category: 'roti',
    categoryLabel: 'भाकरी & पोळी',
    price: 30,
    description: 'पारंपरिक चविष्ट गरमागरम ज्वारीची भाकरी',
    isPopular: true
  },

  // 3. खिचडी स्पेशल
  {
    id: 'khichdi-dal',
    name: 'डाळ खिचडी',
    englishName: 'Dal Khichdi',
    category: 'khichdi',
    categoryLabel: 'खिचडी स्पेशल',
    price: 100,
    description: 'तूप आणि मसाल्यांची खमंग फोडणी दिलेली चवदार डाळ खिचडी',
    isPopular: true
  },
  {
    id: 'khichdi-sadhi',
    name: 'साधी खिचडी',
    englishName: 'Sadhi Khichdi',
    category: 'khichdi',
    categoryLabel: 'खिचडी स्पेशल',
    price: 90,
    description: 'हलकी, पचायला सोपी साधी घरगुती खिचडी'
  },
  {
    id: 'khichdi-sabudana',
    name: 'साबुदाणा खिचडी',
    englishName: 'Sabudana Khichdi',
    category: 'khichdi',
    categoryLabel: 'खिचडी स्पेशल',
    price: 100,
    description: 'शेंगदाण्याचा कूट व बटाट्याची खमंग साबुदाणा खिचडी (उपवासास उपयुक्त)'
  },

  // 4. भाजी & मुख्य पदार्थ
  {
    id: 'bhaji-shev',
    name: 'शेव भाजी',
    englishName: 'Shev Bhaji',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 100,
    description: 'झणझणीत अस्सल वऱ्हाडी रस्सा आणि कुरकुरीत शेव',
    isPopular: true,
    badge: 'Best Seller'
  },
  {
    id: 'bhaji-patodi',
    name: 'पाटोदी',
    englishName: 'Patodi Rassa',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 100,
    description: 'वऱ्हाडी स्पेशल बेसन वडीची खमंग झणझणीत रस्सा भाजी',
    isSpecial: true
  },
  {
    id: 'bhaji-kadhi',
    name: 'कढी',
    englishName: 'Kadhi',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 50,
    description: 'ताकाची खमंग फोडणीची चविष्ट घरगुती कढी'
  },
  {
    id: 'bhaji-dal-fry',
    name: 'डाळ फ्राय',
    englishName: 'Dal Fry',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 120,
    description: 'लसूण व जिऱ्याची तडका दिलेली पिवळी डाळ फ्राय'
  },
  {
    id: 'bhaji-jeera-rice',
    name: 'जिरा राईस',
    englishName: 'Jeera Rice',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 80,
    description: 'खमंग जिऱ्याचा सुवासिक मोकळा भात'
  },
  {
    id: 'bhaji-vangyachi',
    name: 'वांग्याची भाजी',
    englishName: 'Vangyachi Bhaji (Brinjal)',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 70,
    description: 'मसालेदार अस्सल गावरान वांग्याची भाजी',
    isPopular: true
  },
  {
    id: 'bhaji-batatyachi',
    name: 'बटाट्याची भाजी',
    englishName: 'Batatyachi Bhaji',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 70,
    description: 'घरगुती फोडणीचा चविष्ट बटाटा'
  },
  {
    id: 'bhaji-matki',
    name: 'मटकीची भाजी',
    englishName: 'Matkichi Bhaji (Sprouts)',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 80,
    description: 'मोड आलेली पौष्टिक आणि चवदार मटकी उसळ'
  },
  {
    id: 'bhaji-tomato-chutney',
    name: 'टोमॅटो चटणी',
    englishName: 'Tomato Chutney',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 80,
    description: 'आंबट-गोड तिखट चवीची गरमागरम टोमॅटो भाजी/चटणी'
  },
  {
    id: 'bhaji-bharit',
    name: 'भरीत',
    englishName: 'Vangyache Bharit',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 80,
    description: 'भाजलेल्या वांग्याचे अस्सल खानदेशी/वऱ्हाडी भरीत',
    isPopular: true
  },
  {
    id: 'bhaji-mirchi-bhaji',
    name: 'मिरची भजी',
    englishName: 'Mirchi Bhaji',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 80,
    description: 'गरमागरम कुरकुरीत तळलेली चविष्ट मिरची भजी'
  },
  {
    id: 'bhaji-kadhi-gole',
    name: 'कढी गोळे',
    englishName: 'Kadhi Gole',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 70,
    description: 'पारंपरिक वऱ्हाडी बेसन गोळे आणि कढीची जुगलबंदी'
  },
  {
    id: 'bhaji-dal-bhaji',
    name: 'डाळ भाजी',
    englishName: 'Dal Bhaji',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 70,
    unit: 'प्लेट',
    description: 'डाळीची खमंग चवदार भाजी'
  },
  {
    id: 'bhaji-chhole',
    name: 'छोले',
    englishName: 'Chhole Masala',
    category: 'bhaji',
    categoryLabel: 'भाजी & मुख्य पदार्थ',
    price: 90,
    unit: 'प्लेट',
    description: 'मसालेदार टेस्टी काबुली चणे'
  },

  // 5. नाश्ता & इतर
  {
    id: 'snack-pohe',
    name: 'पोहे',
    englishName: 'Kanda Pohe',
    category: 'breakfast',
    categoryLabel: 'नाश्ता & इतर',
    price: 30,
    unit: 'प्लेट',
    description: 'कांदा-शेंगदाणे व शेव टाकून गरमागरम कांदे पोहे',
    isPopular: true
  },
  {
    id: 'snack-tea-cut',
    name: 'चहा कट',
    englishName: 'Cutting Chai',
    category: 'breakfast',
    categoryLabel: 'नाश्ता & इतर',
    price: 5,
    description: 'आलं-वेलची घातलेला कडक गरमागरम चहा कट'
  },
  {
    id: 'snack-shira',
    name: 'शिरा',
    englishName: 'Rava Shira',
    category: 'breakfast',
    categoryLabel: 'नाश्ता & इतर',
    price: 100,
    unit: 'प्लेट',
    description: 'शुद्ध तुपातला बदाम-काजू घातलेला चवदार गोड शिरा'
  },
  {
    id: 'snack-starter-papad',
    name: 'स्टार्टर पापड',
    englishName: 'Starter Papad',
    category: 'breakfast',
    categoryLabel: 'नाश्ता & इतर',
    price: 10,
    description: 'कुरकुरीत भाजलेला / तळलेला स्टार्टर पापड'
  },
  {
    id: 'snack-masala-papad',
    name: 'मसाला पापड',
    englishName: 'Masala Papad',
    category: 'breakfast',
    categoryLabel: 'नाश्ता & इतर',
    price: 20,
    description: 'कांदा, टोमॅटो, कोथिंबीर व चटपटीत मसाल्याचा पापड'
  },
  {
    id: 'snack-sweet',
    name: 'स्वीट (२ पीस)',
    englishName: 'Sweet (2 pcs)',
    category: 'breakfast',
    categoryLabel: 'नाश्ता & इतर',
    price: 20,
    unit: '२ पीस',
    description: 'गोड गुलाबजाम किंवा बर्फी (२ नग)'
  }
];
