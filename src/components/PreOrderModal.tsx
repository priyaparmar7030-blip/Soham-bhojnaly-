import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Clock, User, Phone, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { CartItem, PreOrderForm } from '../types';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const SOHAM_WHATSAPP_NUMBER = "919284488106";

export const PreOrderModal: React.FC<PreOrderModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [formData, setFormData] = useState<PreOrderForm>({
    name: '',
    phone: '',
    arrivalTime: '',
    specialInstructions: '',
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string; arrivalTime?: string }>({});

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const quickArrivalOptions = [
    '१५ मिनिटांत (15 Mins)',
    '३० मिनिटांत (30 Mins)',
    '४५ मिनिटांत (45 Mins)',
    '१ तासात (1 Hour)',
    'दुपारी १:०० (1:00 PM)',
    'दुपारी १:३० (1:30 PM)',
    'रात्री ८:०० (8:00 PM)',
    'रात्री ८:३० (8:30 PM)',
  ];

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string; arrivalTime?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'कृपया आपले नाव प्रविष्ट करा (Enter Name)';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'कृपया वैध १० अंकी मोबाईल नंबर टाका (Enter 10-digit mobile)';
    }

    if (!formData.arrivalTime.trim()) {
      newErrors.arrivalTime = 'कृपया हॉटेलवर येण्याची अंदाजित वेळ सांगा (Select arrival time)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppPreOrder = () => {
    if (cart.length === 0) return;

    if (!validate()) {
      // scroll to error
      return;
    }

    // Format WhatsApp Message exactly as requested
    const orderItemsText = cart
      .map((item) => `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`)
      .join('\n');

    const specialInstructionsLine = formData.specialInstructions.trim()
      ? `विशेष सूचना: ${formData.specialInstructions.trim()}`
      : `विशेष सूचना: कृपया जेवण गरम तयार ठेवा.`;

    const message = `नमस्कार Soham Bhojnalay,

मला माझी Pre-Order द्यायची आहे.

ऑर्डर:
${orderItemsText}

एकूण: ₹${totalAmount}

नाव: ${formData.name.trim()}
मोबाईल: ${formData.phone.trim()}
येण्याची वेळ: ${formData.arrivalTime.trim()}
${specialInstructionsLine}

मी दिलेल्या वेळेच्या आसपास Soham Bhojnalay येथे येत आहे.
कृपया माझी Pre-Order confirm करा.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SOHAM_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#FDFBF7] dark:bg-[#1f1715] w-full max-w-[520px] max-h-[92vh] rounded-3xl shadow-2xl border border-[#D4AF37]/40 flex flex-col overflow-hidden text-[#231714] dark:text-[#F5EFEB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A0E17] to-[#3A0A10] p-4 sm:p-5 text-[#FDFBF7] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-lg">
              🔥
            </div>
            <div>
              <h3 className="font-serif-dev text-lg sm:text-xl font-bold text-[#F3E5AB]">
                Pre-Order कार्ट ({totalItemCount} पदार्थ)
              </h3>
              <p className="text-xs text-[#EDE5D8]/80 font-medium">
                हॉटेलवर येण्यापूर्वी ऑर्डर पाठवा
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-5">
          {/* Important Notice Banner */}
          <div className="bg-[#F7F3EB] dark:bg-[#2a1c18] border border-[#D4AF37]/40 rounded-2xl p-3.5 flex items-start gap-3 shadow-xs">
            <span className="text-xl shrink-0">🍲</span>
            <div className="text-xs leading-relaxed">
              <strong className="text-[#4A0E17] dark:text-[#D4AF37] block font-bold text-[13px] mb-0.5">
                घरूनच Pre-Order करा आणि हॉटेलवर गरमागरम जेवण मिळवा!
              </strong>
              <span className="text-gray-600 dark:text-gray-300">
                ही होम डिलिव्हरी नाही. आपण हॉटेलवर पोहोचण्यापूर्वी तुमचे जेवण ताजे तयार ठेवले जाईल. पेमेंट हॉटेलवर रोख / UPI ने करा.
              </span>
            </div>
          </div>

          {/* Cart Items List */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-serif-dev font-bold text-sm text-[#4A0E17] dark:text-[#D4AF37]">
                निवडलेले पदार्थ (Selected Items)
              </span>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[11px] text-red-600 dark:text-red-400 hover:underline font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  सर्व काढा
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 px-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-dashed border-[#D4AF37]/30">
                <span className="text-3xl block mb-2">🍽️</span>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  तुमच्या कार्टमध्ये अजून कोणतेही पदार्थ नाहीत.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  मेनूमधून आवडीचे पदार्थ जोडा.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white dark:bg-[#251b18] rounded-xl border border-[#E9DFCE] dark:border-[#3A2722] shadow-xs flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm text-[#231714] dark:text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ₹{item.price} {item.unit ? `/${item.unit}` : ''} × {item.quantity} = <strong className="text-[#4A0E17] dark:text-[#D4AF37]">₹{item.price * item.quantity}</strong>
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 bg-[#F7F3EB] dark:bg-[#1a1210] p-1 rounded-lg border border-[#D4AF37]/30">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-md bg-white dark:bg-[#2b1f1c] hover:bg-[#5C121D] hover:text-white flex items-center justify-center transition active:scale-95 text-[#4A0E17] dark:text-[#D4AF37]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#4A0E17] dark:text-[#D4AF37]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-md bg-white dark:bg-[#2b1f1c] hover:bg-[#5C121D] hover:text-white flex items-center justify-center transition active:scale-95 text-[#4A0E17] dark:text-[#D4AF37]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition"
                      title="काढा"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Subtotal row */}
                <div className="p-3 bg-[#F7F3EB] dark:bg-[#231714] rounded-xl border border-[#D4AF37]/30 flex items-center justify-between text-sm font-bold">
                  <span>एकूण रक्कम (Total Bill):</span>
                  <span className="text-base text-[#4A0E17] dark:text-[#D4AF37]">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Customer Details Form */}
          {cart.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-[#D4AF37]/25">
              <div className="flex items-center gap-1.5">
                <span className="text-base">📝</span>
                <span className="font-serif-dev font-bold text-sm text-[#4A0E17] dark:text-[#D4AF37]">
                  Pre-Order माहिती (Customer Details)
                </span>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>आपले पूर्ण नाव (Full Name) *</span>
                </label>
                <input
                  type="text"
                  placeholder="उदा. राहुल देशमुख"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                    errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D4AF37]/40'
                  } bg-white dark:bg-[#251b18] text-[#231714] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>मोबाईल नंबर (WhatsApp Mobile) *</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs font-bold bg-[#EDE5D8] dark:bg-[#2a1c18] border border-r-0 border-[#D4AF37]/40 rounded-l-xl text-gray-600 dark:text-gray-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, phone: val });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-r-xl border ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D4AF37]/40'
                    } bg-white dark:bg-[#251b18] text-[#231714] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Expected Arrival Time */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>हॉटेलवर येण्याची अंदाजित वेळ (Arrival Time) *</span>
                </label>

                {/* Quick Time Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2">
                  {quickArrivalOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, arrivalTime: opt });
                        if (errors.arrivalTime) setErrors({ ...errors, arrivalTime: undefined });
                      }}
                      className={`text-[11px] py-1.5 px-2 rounded-lg font-medium transition text-center border ${
                        formData.arrivalTime === opt
                          ? 'bg-[#5C121D] text-white border-[#D4AF37] shadow-xs'
                          : 'bg-white dark:bg-[#251b18] text-gray-700 dark:text-gray-300 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="किंवा इतर वेळ लिहा (उदा. 1:45 PM, 20 मिनिटांत)"
                  value={formData.arrivalTime}
                  onChange={(e) => {
                    setFormData({ ...formData, arrivalTime: e.target.value });
                    if (errors.arrivalTime) setErrors({ ...errors, arrivalTime: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border ${
                    errors.arrivalTime ? 'border-red-500 ring-1 ring-red-500' : 'border-[#D4AF37]/40'
                  } bg-white dark:bg-[#251b18] text-[#231714] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]`}
                />
                {errors.arrivalTime && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.arrivalTime}
                  </p>
                )}
              </div>

              {/* Special Instructions (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>विशेष सूचना / टीप (Special Instructions - Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="उदा. कमी तिखट ठेवा, चपाती जास्त भाजलेली हवी, इत्यादी."
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D4AF37]/40 bg-white dark:bg-[#251b18] text-[#231714] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F7F3EB] dark:bg-[#1a1210] border-t border-[#D4AF37]/30 flex flex-col gap-2.5">
          {cart.length > 0 ? (
            <>
              <button
                type="button"
                onClick={handleWhatsAppPreOrder}
                className="w-full min-h-[48px] py-3 px-5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition border border-emerald-400/50"
              >
                <span className="text-lg">🔥</span>
                <span>WhatsApp Pre-Order पाठवा (₹{totalAmount})</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-1">
                  थेट WhatsApp उघडेल
                </span>
              </button>
              <p className="text-[11px] text-center text-gray-500 dark:text-gray-400">
                ✓ हॉटेल Soham Bhojnalay (+91 92844 88106) वर थेट मेसेज जाईल
              </p>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-5 rounded-xl bg-[#4A0E17] text-[#FDFBF7] font-bold text-xs sm:text-sm"
            >
              मेनू पहा आणि पदार्थ जोडा
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
