import React from 'react';
import { ShoppingBag, ChevronRight, Flame } from 'lucide-react';
import { CartItem } from '../types';

interface StickyCartBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const StickyCartBar: React.FC<StickyCartBarProps> = ({ cart, onOpenCart }) => {
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (totalItemCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-3 z-40 animate-in slide-in-from-bottom-5 duration-300">
      <div 
        onClick={onOpenCart}
        className="bg-gradient-to-r from-[#4A0E17] via-[#5C121D] to-[#3A0A10] text-[#FDFBF7] p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-[#D4AF37] flex items-center justify-between cursor-pointer hover:shadow-gold-glow active:scale-[0.99] transition"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 rounded-xl bg-[#D4AF37] text-[#3A0A10] flex items-center justify-center font-bold text-sm shadow-sm">
            <ShoppingBag className="w-5 h-5 text-[#3A0A10]" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border border-white">
              {totalItemCount}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-dev font-bold text-base text-[#F3E5AB]">
                ₹{totalAmount}
              </span>
              <span className="text-[11px] text-gray-300">
                ({totalItemCount} पदार्थ)
              </span>
            </div>
            <p className="text-[10px] text-emerald-300 font-medium">
              गरमागरम जेवण Pre-Order तयार
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenCart();
          }}
          className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <Flame className="w-4 h-4 fill-white" />
          <span>Pre-Order करा</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
