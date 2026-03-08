import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle, ShoppingBag } from 'lucide-react';

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
  image: string;
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
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "CLIC 'Future Innovator' Tee",
    price: 450,
    category: "Apparel",
    image: "https://loremflickr.com/600/600/tshirt,tech,fashion",
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
    image: "https://loremflickr.com/600/600/hoodie,streetwear",
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
    image: "https://loremflickr.com/600/600/bag,tote",
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
    image: "https://loremflickr.com/600/600/notebook,stationery",
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
    image: "https://loremflickr.com/600/600/cap,hat",
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
    image: "https://loremflickr.com/600/600/bottle,water",
    description: "Stainless steel water bottle to keep you hydrated during long workshops. Eco-friendly and durable.",
    options: [
      { name: "Color", values: ["Silver", "Matte Black", "Blue"] }
    ]
  }
];

const MerchSection = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentOptions, setCurrentOptions] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

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
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setOrderPlaced(true);
      setCart([]);
      setFormData({ name: '', email: '', phone: '', address: '' });
      setTimeout(() => {
        setOrderPlaced(false);
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="merch" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Campus Store</h2>
            <p className="text-xl text-gray-600">
              Wear the vision. Support the mission. All proceeds go towards funding student scholarships and lab equipment.
            </p>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg group"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-200">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-800">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <span className="text-lg font-bold text-[var(--color-clic-blue)]">
                    ETB {product.price}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.description}</p>
                
                <button 
                  onClick={() => openProductModal(product)}
                  className="w-full py-3 rounded-xl font-bold text-white bg-gray-900 hover:bg-[var(--color-clic-blue)] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
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
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold">Select Options</h3>
                <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex gap-6 mb-8">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{selectedProduct.name}</h4>
                    <div className="text-[var(--color-clic-blue)] font-bold text-lg">ETB {selectedProduct.price}</div>
                  </div>
                </div>

                {selectedProduct.options && selectedProduct.options.map((option) => (
                  <div key={option.name} className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-3">{option.name}</label>
                    <div className="flex flex-wrap gap-3">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          onClick={() => setCurrentOptions(prev => ({ ...prev, [option.name]: value }))}
                          className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                            currentOptions[option.name] === value
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
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
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-2xl font-bold font-serif flex items-center gap-2">
                  <ShoppingBag className="text-[var(--color-clic-orange)]" /> Your Cart
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                    <ShoppingCart size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm">Start adding some awesome merch!</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div className="text-xs text-gray-500 mb-1">
                            {Object.entries(item.selectedOptions).map(([key, value]) => (
                              <span key={key} className="mr-2 bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <span className="text-gray-500">ETB {item.price} x {item.quantity}</span>
                          <span className="text-[var(--color-clic-blue)] font-bold">= ETB {item.price * item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.cartItemId, -1)} className="p-1 hover:bg-white rounded-md transition-colors"><Minus size={14} /></button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartItemId, 1)} className="p-1 hover:bg-white rounded-md transition-colors"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-red-500 transition-colors ml-auto">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 font-medium">Total</span>
                    <span className="text-3xl font-black text-gray-900">ETB {cartTotal}</span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 py-4 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
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
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              {orderPlaced ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h3>
                  <p className="text-gray-600">Thank you for your support. We will contact you shortly to confirm delivery.</p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold">Checkout</h3>
                    <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleCheckout} className="p-8 space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Abebe Kebede"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="abebe@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="0911..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Delivery Address</label>
                      <textarea 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none h-24 resize-none"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        placeholder="City, Sub-city, Woreda, House No."
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-blue)] hover:bg-opacity-90 transition-colors shadow-lg"
                      >
                        Place Order (ETB {cartTotal})
                      </button>
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
