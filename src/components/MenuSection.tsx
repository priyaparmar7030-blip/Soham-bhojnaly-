import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Check, Flame, Sparkles, ChefHat } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/menu';
import { CartItem } from '../types';

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  cart,
  onAddToCart,
  onUpdateQuantity,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cartMap = useMemo(() => {
    const map = new Map<string, number>();
    cart.forEach((c) => map.set(c.id, c.quantity));
    return map;
  }, [cart]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.englishName.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="flex flex-col gap-4 sm:gap-5">
      {/* Brand Pre-Order Highlight Banner */}
      <div className="bg-gradient-to-br from-[#4A0E17] via-[#5C121D] to-[#3A0A10] rounded-3xl p-5 sm:p-6 shadow-xl border border-[#D4AF37]/50 text-white relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Pre-Order Special
            </span>
            <span className="text-[11px] font-medium text-amber-200/90">
              हॉटेलवर जेवण गरम तयार मिळेल
            </span>
          </div>

          <h2 className="font-serif-dev text-xl sm:text-2xl font-black text-[#F3E5AB] leading-snug">
            घरूनच Pre-Order करा आणि हॉटेलवर पोहोचण्याआधी तुमचं जेवण गरमागरम तयार!
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
            आधी Order करा → हॉटेलवर या → गरमागरम जेवण Enjoy करा 🔥
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-base block">⏱️</span>
              <span className="text-[11px] font-bold text-[#F3E5AB]">वेळेची बचत</span>
              <span className="text-[9px] block text-gray-300">वाट पाहणे नाही</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-base block">🍲</span>
              <span className="text-[11px] font-bold text-[#F3E5AB]">ताजे & गरम</span>
              <span className="text-[9px] block text-gray-300">येण्याआधी तयार</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2 border border-white/10">
              <span className="text-base block">📲</span>
              <span className="text-[11px] font-bold text-[#F3E5AB]">WhatsApp ऑर्डर</span>
              <span className="text-[9px] block text-gray-300">१ क्लिक कन्फर्मेशन</span>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Menu Header & Search */}
      <div className="bg-[#FDFBF7] dark:bg-[#221917] rounded-3xl p-4 sm:p-5 shadow-[0_4px_20px_-2px_rgba(74,14,23,0.05),0_2px_6px_-1px_rgba(0,0,0,0.03)] border border-[#E9DFCE] dark:border-[#3A2722] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif-dev text-lg sm:text-xl font-bold text-[#4A0E17] dark:text-[#D4AF37]">
                डिजिटल मेनू (Digital Menu)
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
              प्रत्येक पदार्थ निवडा आणि WhatsApp Pre-Order करा
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="मेनू शोधा... (उदा. थाळी, शेव भाजी)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D4AF37]/30 bg-[#F7F3EB]/70 dark:bg-[#181211] text-[#231714] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#5C121D] text-[#FDFBF7] border-[#D4AF37] shadow-sm'
                  : 'bg-[#F7F3EB] dark:bg-[#181211] text-[#231714] dark:text-gray-300 border-[#D4AF37]/30 hover:border-[#D4AF37]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {filteredItems.map((item) => {
            const qty = cartMap.get(item.id) || 0;
            const inCart = qty > 0;

            return (
              <div
                key={item.id}
                className={`rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 flex flex-col justify-between gap-3 relative ${
                  inCart
                    ? 'border-[#D4AF37] bg-[#FDF8F0] dark:bg-[#2c1d19] shadow-md ring-1 ring-[#D4AF37]/40'
                    : 'border-[#E9DFCE] dark:border-[#3A2722] bg-[#F7F3EB]/50 dark:bg-[#1f1715]/70 hover:border-[#D4AF37]/60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif-dev font-bold text-base text-[#4A0E17] dark:text-[#F3E5AB] leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-sans">
                        {item.englishName}
                      </p>
                    </div>

                    {item.badge && (
                      <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-[#D4AF37] text-[#3A0A10] shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#D4AF37]/20 mt-1">
                  <div>
                    <span className="text-base font-extrabold text-[#4A0E17] dark:text-[#D4AF37]">
                      ₹{item.price}
                    </span>
                    {item.unit && (
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 ml-1">
                        / {item.unit}
                      </span>
                    )}
                  </div>

                  {/* Quantity selector */}
                  {inCart ? (
                    <div className="flex items-center gap-1.5 bg-[#4A0E17] text-white p-1 rounded-xl shadow-xs border border-[#D4AF37]/50">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition active:scale-90"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#F3E5AB]">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition active:scale-90"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#5C121D] hover:bg-[#6E1624] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition active:scale-95 border border-[#D4AF37]/40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>जोडा (Add)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            कोणताही पदार्थ सापडला नाही. कृपया दुसरा शब्द शोधा.
          </div>
        )}

        {/* Bottom Menu Notice */}
        <div className="mt-2 p-3 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <span className="text-lg">📢</span>
          <div>
            <strong>Pre-Order / Party Orders Available:</strong> मोठ्या ऑर्डरसाठी किंवा कौटुंबिक जेवणासाठी आगाऊ ऑर्डर देणे आवश्यक आहे.
          </div>
        </div>
      </div>
    </section>
  );
};
