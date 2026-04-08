import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../App';
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle, ShoppingBag, Loader2 } from 'lucide-react';
import { GOOGLE_SCRIPT_URL } from '../constants';

// --- Types ---
interface ProductOption {
  name: string;
  values: string[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
  description: string;
  options?: ProductOption[];
}

interface CartItem extends Product {
  quantity: number;
  selectedOptions?: Record<string, string>;
  cartItemId: string; // Unique ID for cart items (product ID + options)
}

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "CLIC 'Future Innovator' Tee",
    price: 450,
    category: "Apparel",
    image_url: "https://loremflickr.com/600/600/tshirt,tech,fashion",
    description: "Premium cotton t-shirt featuring the 'Future Innovator' slogan. Perfect for lab work or casual wear.",
    options: [
      { name: "Size", values: ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
      { name: "Color", values: ["White", "Black", "Navy Blue"] }
    ]
  },
  {
    id: 2,
    name: "Official CLIC Hoodie",
    price: 1200,
    category: "Apparel",
    image_url: "https://loremflickr.com/600/600/hoodie,streetwear",
    description: "Warm and comfortable hoodie with the embroidered CLIC logo. Essential for late-night coding sessions.",
    options: [
      { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL"] },
      { name: "Color", values: ["Heather Grey", "Black"] }
    ]
  },
  {
    id: 3,
    name: "STEAM-IE Canvas Tote",
    price: 300,
    category: "Accessories",
    image_url: "https://loremflickr.com/600/600/bag,tote",
    description: "Durable canvas tote bag, spacious enough for your laptop and project materials.",
    options: [
      { name: "Color", values: ["Natural", "Black"] }
    ]
  },
  {
    id: 4,
    name: "Engineering Grid Notebook",
    price: 250,
    category: "Stationery",
    image_url: "https://loremflickr.com/600/600/notebook,stationery",
    description: "High-quality grid paper notebook for sketching designs, drafting circuits, and taking notes.",
    options: [
      { name: "Type", values: ["Grid", "Lined", "Blank"] }
    ]
  },
  {
    id: 5,
    name: "CLIC Snapback Cap",
    price: 350,
    category: "Apparel",
    image_url: "https://loremflickr.com/600/600/cap,hat",
    description: "Adjustable snapback cap with 3D puff embroidery. Represents the CLIC community style.",
    options: [
      { name: "Color", values: ["Black", "Navy", "Red"] }
    ]
  },
  {
    id: 6,
    name: "Eco-Metal Water Bottle",
    price: 500,
    category: "Accessories",
    image_url: "https://loremflickr.com/600/600/bottle,water",
    description: "Stainless steel water bottle to keep you hydrated during long workshops. Eco-friendly and durable.",
    options: [
      { name: "Color", values: ["Silver", "Matte Black", "Blue"] }
    ]
  }
];

const MerchSection = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentOptions, setCurrentOptions] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'telebirr'
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    paymentMethod: false
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^(\+251|0)[1-9]\d{8}$/.test(phone.replace(/\s+/g, ''));
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length > 0 &&
      validateEmail(formData.email) &&
      validatePhone(formData.phone) &&
      formData.address.trim().length > 0
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?type=products`);
        const data = await response.json();
        if (data.status === 'success') {
          // Parse options if they are stored as strings
          const parsedProducts = data.data.map((p: any) => ({
            ...p,
            options: p.options ? (typeof p.options === 'string' ? JSON.parse(p.options) : p.options) : undefined
          }));
          setProducts(parsedProducts);
        } else {
          throw new Error(data.message || 'Failed to fetch products');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- Cart Logic ---
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    // Initialize default options
    const defaults: Record<string, string> = {};
    if (product.options) {
      product.options.forEach(opt => {
        defaults[opt.name] = opt.values[0];
      });
    }
    setCurrentOptions(defaults);
  };

  const addToCart = () => {
    if (!selectedProduct) return;

    const cartItemId = `${selectedProduct.id}-${JSON.stringify(currentOptions)}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        ...selectedProduct, 
        quantity: 1, 
        selectedOptions: currentOptions,
        cartItemId 
      }];
    });
    
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- Checkout Logic ---
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, address: true });
    
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setCheckoutError(null);

    try {
      const orderData = {
        action: 'create_order',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        total: cartTotal.toString(),
        items: JSON.stringify(cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          options: item.selectedOptions
        })))
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(orderData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setOrderPlaced(true);
        setCart([]);
      } else {
        throw new Error(result.message || 'Failed to place order');
      }
    } catch (err: any) {
      setCheckoutError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCheckoutModal = () => {
    setOrderPlaced(false);
    setIsCheckoutOpen(false);
    setFormData({ name: '', email: '', phone: '', address: '', paymentMethod: 'telebirr' });
    setTouched({ name: false, email: false, phone: false, address: false, paymentMethod: false });
  };

  return (
    <section id="merch" className="py-24 bg-white dark:bg-gray-900 relative transition-colors duration-300 overflow-hidden">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-kuba opacity-[0.02] dark:opacity-[0.015] dark:invert pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Campus Store</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.merchDesc}
            </p>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg group"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--color-clic-red)] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-[var(--color-clic-blue)] mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-red-500 text-xl mb-2">Failed to load products</p>
            <p className="text-gray-500 dark:text-gray-400">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-xl">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                    <span className="text-lg font-bold text-[var(--color-clic-blue)]">
                      ETB {product.price}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                  
                  <button 
                    onClick={() => openProductModal(product)}
                    className="w-full py-3 rounded-xl font-bold text-white bg-gray-900 dark:bg-gray-700 hover:bg-[var(--color-clic-blue)] dark:hover:bg-[var(--color-clic-blue)] transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Product Options Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select Options</h3>
                <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-400">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto">
                <div className="flex gap-6 mb-8">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                    <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{selectedProduct.name}</h4>
                    <div className="text-[var(--color-clic-blue)] font-bold text-lg">ETB {selectedProduct.price}</div>
                  </div>
                </div>

                {selectedProduct.options && selectedProduct.options.map((option) => (
                  <div key={option.name} className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">{option.name}</label>
                    <div className="flex flex-wrap gap-3">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          onClick={() => setCurrentOptions(prev => ({ ...prev, [option.name]: value }))}
                          className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                            currentOptions[option.name] === value
                              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button 
                  onClick={addToCart}
                  className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-blue)] hover:bg-opacity-90 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  <Plus size={20} /> Add to Cart - ETB {selectedProduct.price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-2xl font-bold font-serif flex items-center gap-2 text-gray-900 dark:text-white">
                  <ShoppingBag className="text-[var(--color-clic-orange)]" /> Your Cart
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                    <ShoppingCart size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm">Start adding some awesome merch!</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h4>
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {Object.entries(item.selectedOptions).map(([key, value]) => (
                              <span key={key} className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <span className="text-gray-500 dark:text-gray-400">ETB {item.price} x {item.quantity}</span>
                          <span className="text-[var(--color-clic-blue)] font-bold">= ETB {item.price * item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.cartItemId, -1)} className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors text-gray-900 dark:text-white"><Minus size={14} /></button>
                            <span className="text-xs font-bold w-4 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartItemId, 1)} className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors text-gray-900 dark:text-white"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-auto">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Total</span>
                    <span className="text-3xl font-black text-gray-900 dark:text-white">ETB {cartTotal}</span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 py-4 rounded-xl font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                      Continue Shopping
                    </button>
                    <button 
                      onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                      className="flex-1 py-4 rounded-xl font-bold text-white bg-[var(--color-clic-green)] hover:bg-opacity-90 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      Checkout <CheckCircle size={20} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCheckoutOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {orderPlaced ? (
                <div className="p-12 text-center overflow-y-auto">
                  <button 
                    onClick={closeCheckoutModal}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Placed!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">Thank you for your support. We will contact you shortly to confirm delivery.</p>
                  <button 
                    onClick={closeCheckoutModal}
                    className="px-8 py-3 bg-[var(--color-clic-blue)] text-white font-bold rounded-xl hover:bg-opacity-90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Checkout</h3>
                    <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-400">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleCheckout} className="p-8 space-y-4 overflow-y-auto">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <div className="relative">
                        <input 
                          required
                          type="text" 
                          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            touched.name 
                              ? formData.name.trim().length > 0 
                                ? 'border-green-500 focus:ring-green-500' 
                                : 'border-red-500 focus:ring-red-500'
                              : 'border-gray-200 dark:border-gray-700 focus:ring-[var(--color-clic-blue)]'
                          } outline-none transition-all`}
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          onBlur={() => setTouched({...touched, name: true})}
                          placeholder="Abebe Kebede"
                        />
                        {touched.name && formData.name.trim().length > 0 && (
                          <CheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
                        )}
                      </div>
                      {touched.name && formData.name.trim().length === 0 && (
                        <p className="text-red-500 text-xs mt-1">Name is required</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <div className="relative">
                        <input 
                          required
                          type="email" 
                          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            touched.email 
                              ? validateEmail(formData.email)
                                ? 'border-green-500 focus:ring-green-500' 
                                : 'border-red-500 focus:ring-red-500'
                              : 'border-gray-200 dark:border-gray-700 focus:ring-[var(--color-clic-blue)]'
                          } outline-none transition-all`}
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          onBlur={() => setTouched({...touched, email: true})}
                          placeholder="abebe@example.com"
                        />
                        {touched.email && validateEmail(formData.email) && (
                          <CheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
                        )}
                      </div>
                      {touched.email && !validateEmail(formData.email) && formData.email.length > 0 && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                      )}
                      {touched.email && formData.email.length === 0 && (
                        <p className="text-red-500 text-xs mt-1">Email is required</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                      <div className="relative">
                        <input 
                          required
                          type="tel" 
                          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            touched.phone 
                              ? validatePhone(formData.phone)
                                ? 'border-green-500 focus:ring-green-500' 
                                : 'border-red-500 focus:ring-red-500'
                              : 'border-gray-200 dark:border-gray-700 focus:ring-[var(--color-clic-blue)]'
                          } outline-none transition-all`}
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          onBlur={() => setTouched({...touched, phone: true})}
                          placeholder="0911..."
                        />
                        {touched.phone && validatePhone(formData.phone) && (
                          <CheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
                        )}
                      </div>
                      {touched.phone && !validatePhone(formData.phone) && formData.phone.length > 0 && (
                        <p className="text-red-500 text-xs mt-1">Please enter a valid Ethiopian phone number</p>
                      )}
                      {touched.phone && formData.phone.length === 0 && (
                        <p className="text-red-500 text-xs mt-1">Phone number is required</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
                      <div className="relative">
                        <textarea 
                          required
                          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            touched.address 
                              ? formData.address.trim().length > 0 
                                ? 'border-green-500 focus:ring-green-500' 
                                : 'border-red-500 focus:ring-red-500'
                              : 'border-gray-200 dark:border-gray-700 focus:ring-[var(--color-clic-blue)]'
                          } outline-none h-24 resize-none transition-all`}
                          value={formData.address}
                          onChange={e => setFormData({...formData, address: e.target.value})}
                          onBlur={() => setTouched({...touched, address: true})}
                          placeholder="City, Sub-city, Woreda, House No."
                        />
                        {touched.address && formData.address.trim().length > 0 && (
                          <CheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
                        )}
                      </div>
                      {touched.address && formData.address.trim().length === 0 && (
                        <p className="text-red-500 text-xs mt-1">Delivery address is required</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, paymentMethod: 'telebirr'})}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                            formData.paymentMethod === 'telebirr'
                              ? 'border-[var(--color-clic-blue)] bg-blue-50 dark:bg-blue-900/20 text-[var(--color-clic-blue)]'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <span className="font-bold">Telebirr</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, paymentMethod: 'chapa'})}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                            formData.paymentMethod === 'chapa'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <span className="font-bold">Chapa</span>
                        </button>
                      </div>
                      {formData.paymentMethod === 'telebirr' && (
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                          <p>Please send <strong>ETB {cartTotal}</strong> to Telebirr account: <strong>+251 911 69 2277</strong></p>
                          <p className="mt-1 text-xs opacity-80">We will verify your payment before processing the order.</p>
                        </div>
                      )}
                      {formData.paymentMethod === 'chapa' && (
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-green-800 dark:text-green-200">
                          <p>You will be redirected to the Chapa payment gateway to complete your payment securely.</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={!isFormValid() || isSubmitting}
                        className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-blue)] hover:bg-opacity-90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Processing...' : `Place Order (ETB ${cartTotal})`}
                      </button>
                      {checkoutError && <p className="text-red-500 text-sm mt-2 text-center">{checkoutError}</p>}
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MerchSection;
