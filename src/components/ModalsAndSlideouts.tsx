import React, { useState } from "react";
import { X, Trash2, ShoppingBag, Heart, Star, CheckCircle, ShieldCheck, Mail, ArrowRight, Download, Award, ShieldAlert } from "lucide-react";
import { Product, Course } from "../data";

// ================= SHOPPING CART SLIDEOUT =================
interface CartSlideoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
}
export function CartSlideout({ isOpen, onClose, cartItems, onRemoveFromCart, onClearCart }: CartSlideoutProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutMail, setCheckoutMail] = useState("");

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const appliedDiscount = Math.floor(subtotal * discount);
  const total = subtotal - appliedDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "AUTHORITY20") {
      setDiscount(0.2); // 20% off
      alert("Success! 20% discount code 'AUTHORITY20' applied successfully.");
    } else {
      alert("Invalid code. Try entering: AUTHORITY20");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutMail.trim()) return;

    setCheckoutSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white dark:bg-slate-950 w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative border-l border-slate-200 dark:border-slate-800 animate-slide-left text-left">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-secondary" />
            <span className="font-display font-extrabold text-sm text-slate-900 dark:text-white">Shopping Cart ({cartItems.length})</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Checkout Block */}
        {checkoutSuccess ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="font-display font-black text-lg text-slate-900 dark:text-white">Strategic Purchase Confirmed!</h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Taxes and payment are approved successfully. We have dispatched direct workspace links and zip archives of your toolkits to:
            </p>
            <span className="text-xs font-mono font-bold text-brand-secondary block">{checkoutMail}</span>
            <div className="pt-4">
              <button
                onClick={() => {
                  setCheckoutSuccess(false);
                  setCheckoutMail("");
                  onClearCart();
                  onClose();
                }}
                className="px-6 py-2 bg-brand-primary dark:bg-white text-white dark:text-slate-950 text-xs font-bold rounded-lg cursor-pointer"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                  <span className="text-4xl">🛒</span>
                  <p className="text-xs font-medium">Your shopping cart is empty.</p>
                  <p className="text-[10px] text-slate-500">Add a premium strategy toolkit to start.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center gap-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">{item.category}</span>
                      <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{item.title}</h4>
                      <span className="text-xs font-bold text-brand-secondary font-mono">${item.price}</span>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-slate-150 dark:border-slate-800 space-y-4 bg-slate-50 dark:bg-slate-900">
                {/* Coupon form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Voucher: e.g. AUTHORITY20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-950 dark:text-white uppercase font-mono"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg cursor-pointer">
                    Apply
                  </button>
                </form>

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs font-mono text-slate-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-brand-accent font-bold">
                      <span>Voucher Applied (20%)</span>
                      <span>-${appliedDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-slate-200/40 pt-1.5 text-slate-900 dark:text-white font-bold">
                    <span>Total Amount</span>
                    <span className="text-base text-brand-secondary font-mono">${total}</span>
                  </div>
                </div>

                {/* Form to submit details */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-2 pt-2">
                  <input
                    type="email"
                    placeholder="Enter email to receive downloads"
                    value={checkoutMail}
                    onChange={(e) => setCheckoutMail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-950 dark:text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-secondary hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Complete Secure Checkout
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ================= WISHLIST SLIDEOUT =================
interface WishlistSlideoutProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onMoveToCart: (prod: Product) => void;
}
export function WishlistSlideout({ isOpen, onClose, wishlistItems, onRemoveFromWishlist, onMoveToCart }: WishlistSlideoutProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white dark:bg-slate-950 w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative border-l border-slate-200 dark:border-slate-800 animate-slide-left text-left">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span className="font-display font-extrabold text-sm text-slate-900 dark:text-white">Personal Wishlist ({wishlistItems.length})</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
              <span className="text-4xl">⭐️</span>
              <p className="text-xs font-medium">Your wishlist is currently empty.</p>
              <p className="text-[10px] text-slate-500">Bookmark strategic courses or guides to purchase later.</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center gap-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">{item.category}</span>
                  <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{item.title}</h4>
                  <span className="text-xs font-bold text-brand-secondary font-mono">${item.price}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => { onMoveToCart(item); onRemoveFromWishlist(item.id); }}
                    className="p-1.5 bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary/20 rounded text-[10px] font-bold cursor-pointer"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="p-1.5 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                    aria-label="Delete bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ================= MEMBER DASHBOARD & LOGIN MODAL =================
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}
export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    onLoginSuccess(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center space-y-4 animate-scale-up text-left">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">✕</button>
        
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-secondary flex items-center justify-center mx-auto text-xl">🔑</div>
          <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">MD BIPLOB Client Portal</h3>
          <p className="text-[11px] text-slate-500 leading-relaxed">Enter any professional email to instantly authenticate and load your mock member workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">Registered Work Email</label>
            <input
              type="email"
              placeholder="e.g., director@brand.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">Access Token / Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-brand-primary dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl cursor-pointer hover:opacity-90"
          >
            Authenticate Workspace
          </button>
        </form>
      </div>
    </div>
  );
}
