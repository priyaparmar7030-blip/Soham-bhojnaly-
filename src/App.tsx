/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Instagram, 
  Check, 
  ExternalLink, 
  Clock, 
  UtensilsCrossed, 
  Heart,
  Copy,
  ShoppingBag,
  Flame,
  ChefHat
} from 'lucide-react';
import { MenuItem } from './data/menu';
import { CartItem } from './types';
import { MenuSection } from './components/MenuSection';
import { PreOrderModal } from './components/PreOrderModal';
import { StickyCartBar } from './components/StickyCartBar';

const FALLBACK_REVIEW_LINK = "https://maps.app.goo.gl/2yqQP6Cr2ZQvLG3KA";
const MAPS_URL = (import.meta.env.VITE_REVIEW_LINK as string) || FALLBACK_REVIEW_LINK;
const WHATSAPP_URL = "https://wa.me/919284488106?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0,%20%E0%A4%AE%E0%A4%B2%E0%A4%BE%20%E0%A4%9C%E0%A5%87%E0%A4%B5%E0%A4%A3%E0%A4%BE%E0%A4%9F%E0%A5%80%20%E0%A4%91%E0%A4%B0%E0%A5%8D%E0%A4%A1%E0%A4%B0%20%E0%A4%A6%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%E0%A4%9A%E0%A5%80%20%E0%A4%86%E0%A4%B9%E0%A5%87.";
const CALL_URL = "tel:+919284488106";
const INSTAGRAM_URL = "https://www.instagram.com/soham_bhojnalay?stkn=MWgybm42NWhvNjJ1ag==";

interface ReviewItem {
  id: string;
  stars: number;
  isFeatured?: boolean;
  text: string;
}

const reviewsData: Record<'mr' | 'en', { stars5: ReviewItem[]; stars4: ReviewItem[]; stars3: ReviewItem[] }> = {
  mr: {
    stars5: [
      {
        id: "mr-5-1",
        stars: 5,
        isFeatured: true,
        text: "जेवण खूप चविष्ट आणि घरगुती चवीचं आहे. सर्व्हिस पण झटपट आणि स्टाफ खूप प्रेमळ. कुटुंबासोबत जेवायला उत्तम जागा!"
      },
      {
        id: "mr-5-2",
        stars: 5,
        isFeatured: false,
        text: "अकोल्यातील एक उत्तम भोजनालय. भाज्या ताज्या, चव भन्नाट आणि किंमतही योग्य. नक्की भेट द्या!"
      },
      {
        id: "mr-5-3",
        stars: 5,
        isFeatured: false,
        text: "स्वच्छता, चव आणि सेवा तिन्ही उत्कृष्ट. सोहम भोजनालयाचं जेवण पुन्हा पुन्हा खावंसं वाटतं."
      }
    ],
    stars4: [
      {
        id: "mr-4-1",
        stars: 4,
        isFeatured: false,
        text: "जेवण चविष्ट आणि पोटभर आहे. सर्व्हिस चांगली आहे, गर्दीच्या वेळी थोडा वेळ लागतो पण चवीसाठी थांबायला हरकत नाही."
      },
      {
        id: "mr-4-2",
        stars: 4,
        isFeatured: false,
        text: "घरगुती चवीचं जेवण, किंमत वाजवी. बसण्याची जागा अजून थोडी वाढली तर आणखी छान. एकंदरीत चांगला अनुभव."
      },
      {
        id: "mr-4-3",
        stars: 4,
        isFeatured: false,
        text: "मित्रांसोबत जेवायला गेलो होतो. चव आणि क्वालिटी चांगली आहे. पुन्हा नक्की येईन."
      }
    ],
    stars3: [
      {
        id: "mr-3-1",
        stars: 3,
        isFeatured: false,
        text: "जेवण ठीकठाक आणि चांगलं आहे. सर्व्हिसमध्ये थोडी सुधारणा झाली तर नक्कीच आणखी चांगलं होईल."
      },
      {
        id: "mr-3-2",
        stars: 3,
        isFeatured: false,
        text: "चव चांगली आहे, पण गर्दीच्या वेळी वाट पाहावी लागली. एकदा जाऊन बघण्यासारखं आहे."
      }
    ]
  },
  en: {
    stars5: [
      {
        id: "en-5-1",
        stars: 5,
        isFeatured: true,
        text: "Delicious homestyle food, quick service and very friendly staff. A great place to eat with family in Akola!"
      },
      {
        id: "en-5-2",
        stars: 5,
        isFeatured: false,
        text: "Fresh ingredients, amazing taste and very reasonable prices. Soham Bhojnalay is a must-visit!"
      },
      {
        id: "en-5-3",
        stars: 5,
        isFeatured: false,
        text: "Clean, tasty and great service. The food here makes you want to come back again and again."
      }
    ],
    stars4: [
      {
        id: "en-4-1",
        stars: 4,
        isFeatured: false,
        text: "Tasty, filling food and good service. It gets a little busy at peak hours, but the taste is worth the wait."
      },
      {
        id: "en-4-2",
        stars: 4,
        isFeatured: false,
        text: "Homestyle food at a fair price. Slightly more seating would make it even better. Overall a good experience."
      },
      {
        id: "en-4-3",
        stars: 4,
        isFeatured: false,
        text: "Went with friends. Good taste and quality, and I will definitely come back."
      }
    ],
    stars3: [
      {
        id: "en-3-1",
        stars: 3,
        isFeatured: false,
        text: "Decent food and okay service. A bit of improvement in service would make it a lot better."
      },
      {
        id: "en-3-2",
        stars: 3,
        isFeatured: false,
        text: "Taste is good, but there was a wait at peak hours. Worth a visit once."
      }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'order' | 'reviews'>('order');
  const [lang, setLang] = useState<'mr' | 'en'>('mr');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, unit: item.unit }];
    });
    setToastMessage(`✓ ${item.name} कार्टमध्ये जोडले!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Review copy action
  const handleReviewCopy = (review: ReviewItem) => {
    setActiveReviewId(review.id);
    const msg = lang === 'mr' 
      ? "कॉपी झालं! Google Maps उघडत आहे… Paste करा." 
      : "Copied! Opening Google Maps… paste your review.";
    setToastMessage(msg);

    // Copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(review.text).catch(() => {
        fallbackCopy(review.text);
      });
    } else {
      fallbackCopy(review.text);
    }

    // Open Google Maps after ~900ms
    setTimeout(() => {
      window.open(MAPS_URL, '_blank');
    }, 900);

    setTimeout(() => {
      setToastMessage(null);
      setActiveReviewId(null);
    }, 3500);
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5 select-none" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i <= rating 
                ? 'text-amber-500 fill-amber-500 drop-shadow-sm' 
                : 'text-gray-300 dark:text-gray-600 fill-current'
            }`}
          />
        ))}
      </div>
    );
  };

  const currentReviews = reviewsData[lang];
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#F8F5EE] dark:bg-[#181211] text-[#231714] dark:text-[#F5EFEB] min-h-screen antialiased flex flex-col items-center selection:bg-[#D4AF37] selection:text-[#4A0E17] py-4 sm:py-8 px-3 w-full">
      {/* Desktop Wrapper Framing Centered Mobile Experience (max-width 500px) */}
      <main className="w-full max-w-[500px] flex flex-col gap-5 sm:gap-6 mx-auto pb-24">
        
        {/* ==========================================
           A. HERO SECTION: OFFICIAL LOGO & IDENTITY
           ========================================== */}
        <header className="bg-[#FDFBF7] dark:bg-[#221917] rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(74,14,23,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] border border-[#E9DFCE] dark:border-[#3A2722] text-center flex flex-col items-center relative overflow-hidden">
          {/* Top Decorative Ambient Glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#D4AF37]/15 dark:bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          {/* Centered Official Logo */}
          <div className="relative w-[155px] h-[155px] rounded-full p-[3px] gold-gradient-border shadow-[0_0_20px_-3px_rgba(212,175,55,0.25)] flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-[#4A0E17] overflow-hidden flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1qdzVC6Tx3_rn2hDMRVDTNvafYyTBwzrglrRvTX7fUaLCfOFfJLwUML_Lf4D6vA_UB4ta68GEpNKT9jOJlR5MuzoWjfW9r3B4qDURh_D9wG-qQdHqqpJeVOBrrl6VHeZDTBcjLxREZRilrDENHSctYtm8EdrYQC1p7Md9ARujBK97wuV291wkFerwMEil6fSC9a_tKztxU8Tl85kUEkUAsCpRW-ltZl-7ov1NlWOvQJ5C1VcOhFnd6Zl6Ewl4N2X-bg" 
                alt="सोहम भोजनालय अधिकृत लोगो" 
                className="w-full h-full object-contain rounded-full select-none"
                loading="eager"
              />
            </div>
          </div>

          {/* Delicate Hairline Gold Divider Line */}
          <div className="w-28 h-[1.5px] hairline-gold mt-5 mb-3"></div>

          {/* Restaurant Name & Subtitle */}
          <h1 className="font-serif-dev text-2xl sm:text-3xl font-extrabold text-[#4A0E17] dark:text-[#D4AF37] tracking-tight leading-tight">
            सोहम भोजनालय
          </h1>
          <p className="text-sm font-semibold tracking-wider text-gray-700 dark:text-gray-300 font-sans mt-0.5 uppercase">
            Soham Bhojnalay
          </p>

          {/* Location Pin */}
          <div className="flex items-center justify-center gap-1.5 mt-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
            <span className="text-[#4A0E17] dark:text-[#D4AF37]">📍</span>
            <span>Transport Nagar, Akola</span>
          </div>

          {/* Gold 5-Star Row */}
          <div className="flex items-center justify-center gap-1 mt-2.5" aria-label="5 Star Rating">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500 drop-shadow-sm" />
            ))}
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">5.0</span>
          </div>

          {/* Motto */}
          <p className="font-serif-dev italic text-sm text-[#4A0E17]/90 dark:text-[#D4AF37]/90 font-medium mt-2">
            "घरगुती चव • प्रेमाने सेवा"
          </p>
        </header>

        {/* ==========================================
           B. QUICK ACTION DOCK (3 EQUAL TOUCH TARGETS)
           ========================================== */}
        <div className="bg-[#FDFBF7] dark:bg-[#221917] rounded-2xl p-3.5 border border-[#E9DFCE] dark:border-[#3A2722] shadow-[0_4px_20px_-2px_rgba(74,14,23,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            
            {/* 1. WhatsApp Button */}
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] p-2.5 rounded-xl bg-[#F7F3EB] dark:bg-[#231714] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#4A0E17] dark:text-[#D4AF37] flex flex-col items-center justify-center text-center transition-all hover:shadow-sm active:scale-95 group"
            >
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="text-xs font-bold leading-tight">WhatsApp</span>
              </div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">ऑर्डर द्या</span>
            </a>

            {/* 2. Call Button */}
            <a 
              href={CALL_URL}
              className="min-h-[48px] p-2.5 rounded-xl bg-[#F7F3EB] dark:bg-[#231714] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#4A0E17] dark:text-[#D4AF37] flex flex-col items-center justify-center text-center transition-all hover:shadow-sm active:scale-95 group"
            >
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#4A0E17] dark:text-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold leading-tight">Call</span>
              </div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">कॉल करा</span>
            </a>

            {/* 3. Instagram Button */}
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] p-2.5 rounded-xl bg-[#F7F3EB] dark:bg-[#231714] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#4A0E17] dark:text-[#D4AF37] flex flex-col items-center justify-center text-center transition-all hover:shadow-sm active:scale-95 group"
            >
              <div className="flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5 text-[#E1306C] shrink-0" />
                <span className="text-xs font-bold leading-tight">Instagram</span>
              </div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">Follow</span>
            </a>

          </div>

          {/* Helper Badge Underneath */}
          <div className="mt-2.5 pt-2 border-t border-[#D4AF37]/15 flex items-center justify-center text-[11px] text-gray-600 dark:text-gray-300 font-medium">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#4A0E17] dark:text-[#D4AF37]" />
            <span>ऑर्डर / कॉल: <strong className="text-[#4A0E17] dark:text-[#D4AF37]">सकाळी 9 ते रात्री 10</strong> | +91 92844 88106</span>
          </div>
        </div>

        {/* ==========================================
           MAIN NAVIGATION TOGGLE: PRE-ORDER vs REVIEWS
           ========================================== */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-[#EDE5D8] dark:bg-[#231714] rounded-2xl border border-[#D4AF37]/40 shadow-sm w-full max-w-[420px]">
            <button
              type="button"
              onClick={() => setActiveTab('order')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'order'
                  ? 'bg-gradient-to-r from-[#4A0E17] to-[#5C121D] text-[#FDFBF7] shadow-md border border-[#D4AF37]/50'
                  : 'text-[#231714] dark:text-gray-300 hover:text-[#4A0E17]'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Pre-Order मेनू</span>
              {totalItemCount > 0 && (
                <span className="bg-[#D4AF37] text-[#3A0A10] text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {totalItemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-[#4A0E17] to-[#5C121D] text-[#FDFBF7] shadow-md border border-[#D4AF37]/50'
                  : 'text-[#231714] dark:text-gray-300 hover:text-[#4A0E17]'
              }`}
            >
              <span>⭐ Google Reviews</span>
            </button>
          </div>
        </div>

        {/* ==========================================
           TAB 1: PRE-ORDER MENU SECTION
           ========================================== */}
        {activeTab === 'order' && (
          <MenuSection 
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* ==========================================
           TAB 2: GOOGLE REVIEWS SECTION (ORIGINAL & VERIFIED)
           ========================================== */}
        {activeTab === 'reviews' && (
          <section className="bg-[#FDFBF7] dark:bg-[#221917] rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(74,14,23,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] border border-[#E9DFCE] dark:border-[#3A2722] flex flex-col">
            
            {/* Top Google Review Pill */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#4A0E17] dark:text-[#D4AF37] text-[11px] font-bold tracking-wider uppercase">
                ⭐ Google Review
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-dev text-xl sm:text-2xl font-bold text-center text-[#4A0E17] dark:text-[#D4AF37] mt-2.5">
              {lang === 'mr' ? 'तुमचा अनुभव शेअर करा ❤️' : 'Share Your Experience ❤️'}
            </h2>

            {/* 3-Step Clear Guidance */}
            <p className="text-xs sm:text-[13px] text-center font-medium text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed bg-[#F7F3EB]/80 dark:bg-[#231714]/60 py-2 px-3 rounded-xl border border-[#D4AF37]/20">
              {lang === 'mr' 
                ? 'आवडलेला रिव्ह्यू निवडा → कॉपी करा → Google Maps वर Paste करा' 
                : 'Choose a review → Tap to copy → Paste on Google Maps'}
            </p>

            {/* Language Switcher */}
            <div className="flex justify-center mt-4">
              <div className="inline-flex p-1 bg-[#EDE5D8] dark:bg-[#231714] rounded-xl border border-[#D4AF37]/30" role="tablist" aria-label="Language selector">
                <button
                  type="button"
                  role="tab"
                  aria-selected={lang === 'mr'}
                  onClick={() => setLang('mr')}
                  className={`px-5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    lang === 'mr' 
                      ? 'bg-[#5C121D] text-[#FDFBF7] shadow-sm border border-[#D4AF37]/40' 
                      : 'text-[#231714] dark:text-gray-300 hover:text-[#4A0E17]'
                  }`}
                >
                  मराठी
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={lang === 'en'}
                  onClick={() => setLang('en')}
                  className={`px-5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    lang === 'en' 
                      ? 'bg-[#5C121D] text-[#FDFBF7] shadow-sm border border-[#D4AF37]/40' 
                      : 'text-[#231714] dark:text-gray-300 hover:text-[#4A0E17]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Grouped Reviews Container */}
            <div className="mt-5 flex flex-col gap-5">
              
              {/* 5-Star Group */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif-dev font-bold text-sm sm:text-base text-[#4A0E17] dark:text-[#D4AF37]">
                    {lang === 'mr' ? '5 स्टार रिव्ह्यू' : '5 STAR REVIEWS'}
                  </span>
                  <div className="h-px bg-[#D4AF37]/25 flex-1"></div>
                </div>

                {currentReviews.stars5.map((review) => {
                  const isFeatured = review.isFeatured;
                  return (
                    <div 
                      key={review.id}
                      className={`rounded-2xl p-4 sm:p-4.5 border transition-all duration-200 flex flex-col gap-3 relative ${
                        isFeatured 
                          ? 'border-[#D4AF37]/80 dark:border-[#D4AF37]/70 bg-gradient-to-b from-[#FFFDF9] to-[#FDF8F0] dark:from-[#221917] dark:to-[#231714] shadow-md ring-1 ring-[#D4AF37]/30' 
                          : 'border-[#EADBCC] dark:border-[#3A2722] bg-[#F7F3EB]/60 dark:bg-[#231714]/70 hover:border-[#D4AF37]/50 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {renderStars(review.stars)}
                        {isFeatured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#D4AF37] text-[#3A0A10] shadow-xs">
                            {lang === 'mr' ? '⭐ सुंदर अनुभव' : '⭐ RECOMMENDED'}
                          </span>
                        )}
                      </div>

                      <p className="text-base text-[#231714] dark:text-gray-100 font-medium leading-[1.7] select-text">
                        "{review.text}"
                      </p>

                      <div className="flex flex-col gap-1.5 mt-1">
                        <button
                          type="button"
                          onClick={() => handleReviewCopy(review)}
                          className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] border border-[#D4AF37]/40 group ${
                            activeReviewId === review.id 
                              ? 'bg-emerald-700 border-emerald-500' 
                              : 'bg-[#4A0E17] hover:bg-[#5C121D] active:bg-[#3A0A10]'
                          }`}
                        >
                          <Copy className="w-4 h-4 opacity-90 group-hover:rotate-6 transition-transform" />
                          <span>
                            {activeReviewId === review.id 
                              ? (lang === 'mr' ? '✓ कॉपी झाले! Maps उघडत आहे...' : '✓ Copied! Opening Maps...')
                              : (lang === 'mr' ? '📋 कॉपी करा आणि रिव्ह्यू द्या' : '📋 Copy & Give Review')}
                          </span>
                        </button>
                        <p className="text-[11px] text-center text-gray-500 dark:text-gray-400">
                          {lang === 'mr' 
                            ? 'रिव्ह्यू कॉपी होईल आणि Google Maps उघडेल' 
                            : 'Review will be copied & Google Maps will open'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4-Star Group */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif-dev font-bold text-sm sm:text-base text-[#4A0E17] dark:text-[#D4AF37]">
                    {lang === 'mr' ? '4 स्टार रिव्ह्यू' : '4 STAR REVIEWS'}
                  </span>
                  <div className="h-px bg-[#D4AF37]/25 flex-1"></div>
                </div>

                {currentReviews.stars4.map((review) => (
                  <div 
                    key={review.id}
                    className="rounded-2xl p-4 sm:p-4.5 border border-[#EADBCC] dark:border-[#3A2722] bg-[#F7F3EB]/60 dark:bg-[#231714]/70 hover:border-[#D4AF37]/50 shadow-sm transition-all duration-200 flex flex-col gap-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      {renderStars(review.stars)}
                    </div>

                    <p className="text-base text-[#231714] dark:text-gray-100 font-medium leading-[1.7] select-text">
                      "{review.text}"
                    </p>

                    <div className="flex flex-col gap-1.5 mt-1">
                      <button
                        type="button"
                        onClick={() => handleReviewCopy(review)}
                        className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] border border-[#D4AF37]/40 group ${
                          activeReviewId === review.id 
                            ? 'bg-emerald-700 border-emerald-500' 
                            : 'bg-[#4A0E17] hover:bg-[#5C121D] active:bg-[#3A0A10]'
                        }`}
                      >
                        <Copy className="w-4 h-4 opacity-90 group-hover:rotate-6 transition-transform" />
                        <span>
                          {activeReviewId === review.id 
                            ? (lang === 'mr' ? '✓ कॉपी झाले! Maps उघडत आहे...' : '✓ Copied! Opening Maps...')
                            : (lang === 'mr' ? '📋 कॉपी करा आणि रिव्ह्यू द्या' : '📋 Copy & Give Review')}
                        </span>
                      </button>
                      <p className="text-[11px] text-center text-gray-500 dark:text-gray-400">
                        {lang === 'mr' 
                          ? 'रिव्ह्यू कॉपी होईल आणि Google Maps उघडेल' 
                          : 'Review will be copied & Google Maps will open'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3-Star Group */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif-dev font-bold text-sm sm:text-base text-[#4A0E17] dark:text-[#D4AF37]">
                    {lang === 'mr' ? '3 स्टार रिव्ह्यू' : '3 STAR REVIEWS'}
                  </span>
                  <div className="h-px bg-[#D4AF37]/25 flex-1"></div>
                </div>

                {currentReviews.stars3.map((review) => (
                  <div 
                    key={review.id}
                    className="rounded-2xl p-4 sm:p-4.5 border border-[#EADBCC] dark:border-[#3A2722] bg-[#F7F3EB]/60 dark:bg-[#231714]/70 hover:border-[#D4AF37]/50 shadow-sm transition-all duration-200 flex flex-col gap-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      {renderStars(review.stars)}
                    </div>

                    <p className="text-base text-[#231714] dark:text-gray-100 font-medium leading-[1.7] select-text">
                      "{review.text}"
                    </p>

                    <div className="flex flex-col gap-1.5 mt-1">
                      <button
                        type="button"
                        onClick={() => handleReviewCopy(review)}
                        className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] border border-[#D4AF37]/40 group ${
                          activeReviewId === review.id 
                            ? 'bg-emerald-700 border-emerald-500' 
                            : 'bg-[#4A0E17] hover:bg-[#5C121D] active:bg-[#3A0A10]'
                        }`}
                      >
                        <Copy className="w-4 h-4 opacity-90 group-hover:rotate-6 transition-transform" />
                        <span>
                          {activeReviewId === review.id 
                            ? (lang === 'mr' ? '✓ कॉपी झाले! Maps उघडत आहे...' : '✓ Copied! Opening Maps...')
                            : (lang === 'mr' ? '📋 कॉपी करा आणि रिव्ह्यू द्या' : '📋 Copy & Give Review')}
                        </span>
                      </button>
                      <p className="text-[11px] text-center text-gray-500 dark:text-gray-400">
                        {lang === 'mr' 
                          ? 'रिव्ह्यू कॉपी होईल आणि Google Maps उघडेल' 
                          : 'Review will be copied & Google Maps will open'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Direct Google Maps Link */}
            <div className="mt-7 pt-5 border-t border-[#D4AF37]/25 text-center flex flex-col items-center">
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                {lang === 'mr' ? 'Google Maps आधीच उघडायचं आहे?' : 'Want to open Google Maps directly?'}
              </p>
              <a 
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex min-h-[44px] items-center justify-center gap-2 py-2 px-5 rounded-xl border border-[#4A0E17]/30 dark:border-[#D4AF37]/40 bg-white/60 dark:bg-[#231714]/60 text-[#4A0E17] dark:text-[#D4AF37] font-bold text-xs sm:text-sm hover:bg-white dark:hover:bg-[#231714] hover:border-[#D4AF37] transition active:scale-95"
              >
                <span>📍</span>
                <span>{lang === 'mr' ? 'Maps थेट उघडा' : 'Open Maps Directly'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

          </section>
        )}

        {/* ==========================================
           H. ORDER / QUICK CALL CTA CARD
           ========================================== */}
        <section className="bg-[#FDFBF7] dark:bg-[#221917] rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(74,14,23,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] border border-[#E9DFCE] dark:border-[#3A2722] text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none"></div>
          
          <h3 className="font-serif-dev text-lg sm:text-xl font-bold text-[#4A0E17] dark:text-[#D4AF37] flex items-center justify-center gap-1.5">
            <UtensilsCrossed className="w-5 h-5 text-[#4A0E17] dark:text-[#D4AF37]" />
            <span>भूक लागलीय?</span>
          </h3>
          
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
            ऑर्डरसाठी WhatsApp करा किंवा थेट कॉल करा.
          </p>

          {/* Timing Badge */}
          <div className="inline-block mt-2 px-3 py-1 rounded-full bg-[#F7F3EB] dark:bg-[#231714] text-[11px] font-semibold text-[#4A0E17] dark:text-[#D4AF37] border border-[#D4AF37]/30">
            🕒 वेळ: सकाळी 9 ते रात्री 10
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
            {/* WhatsApp Order */}
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp वर ऑर्डर करा</span>
            </a>

            {/* Call Order */}
            <a 
              href={CALL_URL}
              className="min-h-[44px] py-2.5 px-4 rounded-xl bg-[#5C121D] hover:bg-[#6E1624] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>कॉल करा (+91 92844 88106)</span>
            </a>
          </div>
        </section>

        {/* ==========================================
           I. INSTAGRAM MINI CARD
           ========================================== */}
        <section className="bg-[#FDFBF7] dark:bg-[#221917] rounded-2xl p-5 shadow-[0_4px_20px_-2px_rgba(74,14,23,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] border border-[#E9DFCE] dark:border-[#3A2722] text-center">
          <h3 className="font-serif-dev text-sm sm:text-base font-bold text-[#231714] dark:text-gray-100 flex items-center justify-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Daily Updates साठी Follow करा</span>
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            नवीन पदार्थ आणि अपडेट्ससाठी आमचं Instagram Follow करा.
          </p>
          <div className="mt-3">
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 py-2 px-5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-xs sm:text-sm shadow-sm hover:opacity-95 active:scale-95 transition w-full sm:w-auto"
            >
              <Instagram className="w-4 h-4 shrink-0" />
              <span>Instagram वर Follow करा</span>
            </a>
          </div>
        </section>

        {/* ==========================================
           J. LOCATION CARD
           ========================================== */}
        <section className="bg-[#FDFBF7] dark:bg-[#221917] rounded-2xl p-5 shadow-[0_4px_20px_-2px_rgba(74,14,23,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] border border-[#E9DFCE] dark:border-[#3A2722] text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#D4AF37]/15 text-[#4A0E17] dark:text-[#D4AF37] mb-2">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-serif-dev text-base sm:text-lg font-bold text-[#4A0E17] dark:text-[#D4AF37]">
            सोहम भोजनालय
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5">
            Transport Nagar, Akola
          </p>
          <div className="mt-3">
            <a 
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 py-2 px-5 rounded-xl bg-[#F7F3EB] dark:bg-[#231714] text-[#4A0E17] dark:text-[#D4AF37] font-bold text-xs sm:text-sm border border-[#D4AF37]/40 hover:bg-[#EDE5D8] dark:hover:bg-[#221917] transition active:scale-95 w-full"
            >
              <span>🗺️</span>
              <span>Google Maps वर दिशा पहा</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75" />
            </a>
          </div>
        </section>

        {/* ==========================================
           K. PREMIUM FOOTER
           ========================================== */}
        <footer className="bg-[#3A0A10] text-[#EDE5D8] rounded-3xl p-6 sm:p-7 shadow-lg border border-[#D4AF37]/25 text-center flex flex-col items-center gap-3">
          {/* Mini Circular Logo */}
          <div className="w-11 h-11 rounded-full p-[1.5px] gold-gradient-border shadow-sm flex items-center justify-center">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnMCAMvJPGeHla8Bl5ls8tFh9_J5ReTzdKOxkhvsVMSuOV51rEmLnkOsXIctaUskQQZiieUr5FSyP0rf9kiHVCYfyLiTV871KIEeFSG8bD8qzyfb2YzrrJvh1cpgnQZK9JG9lf9E_-wOfgepLVPD2Q5wDeVj8tYArFq_jiyzy_1_2UuozKUoRwPMoTmUGVsF2B6pH116jYZYL6mDZnfFOw9ohUxYtVETo1Tu1fnsRzyWAWxbrIepI4R4lDBZAEA26OMQ" 
              alt="Soham Logo Icon" 
              className="w-full h-full object-contain rounded-full"
              loading="lazy"
            />
          </div>
          <div>
            <h4 className="font-serif-dev font-bold text-base text-[#D4AF37]">सोहम भोजनालय</h4>
            <p className="text-xs font-sans tracking-wide text-gray-300">Soham Bhojnalay • Transport Nagar, Akola</p>
          </div>
          <p className="font-serif-dev text-xs text-[#F3E5AB] italic">
            "घरगुती चव • प्रेमाने सेवा"
          </p>
          <div className="pt-2 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-gray-300 px-2">
            <a href={CALL_URL} className="hover:text-[#D4AF37] transition flex items-center gap-1">
              <Phone className="w-3 h-3" /> +91 92844 88106
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition flex items-center gap-1">
              <span>◎ Instagram</span> <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </footer>

      </main>

      {/* ==========================================
         STICKY CART BAR (WHEN ITEMS IN CART)
         ========================================== */}
      <StickyCartBar 
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* ==========================================
         PRE-ORDER MODAL & CHECKOUT DRAWER
         ========================================== */}
      <PreOrderModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* ==========================================
         FLOATING TOAST NOTIFICATION
         ========================================== */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite" 
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#3A0A10] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4AF37] flex items-center gap-3 z-50 text-xs sm:text-sm font-semibold max-w-[92vw] animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#4A0E17] font-bold shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
