import React, { useState, useEffect } from 'react';
import { Wine, CartItem, Order, WineReview } from './types';
import { INITIAL_WINES } from './data/wines';
import { INITIAL_REVIEWS } from './data/reviews';
import { Header } from './components/Header';
import { EventBanner } from './components/EventBanner';
import { HeroSlider } from './components/HeroSlider';
import { FlashSales } from './components/FlashSales';
import { WineCatalog } from './components/WineCatalog';
import { WineDetailModal } from './components/WineDetailModal';
import { EventModal } from './components/EventModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StockManagementModal } from './components/StockManagementModal';
import { Footer } from './components/Footer';
import { Check, ShoppingCart, AlertCircle } from 'lucide-react';

export default function App() {
  // 1. Live Wines & Stock State with LocalStorage Persistence
  const [wines, setWines] = useState<Wine[]>(() => {
    try {
      const saved = localStorage.getItem('mariekore_wines_stock');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved stock', e);
    }
    return INITIAL_WINES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('mariekore_wines_stock', JSON.stringify(wines));
    } catch (e) {
      console.error('Error saving stock', e);
    }
  }, [wines]);

  // 2. Cart State with LocalStorage Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mariekore_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved cart', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('mariekore_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // 3. Orders State with LocalStorage Persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mariekore_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved orders', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('mariekore_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  }, [orders]);

  // 4. Wine Reviews & Ratings State with LocalStorage Persistence
  const [reviews, setReviews] = useState<Record<string, WineReview[]>>(() => {
    try {
      const saved = localStorage.getItem('mariekore_wine_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved reviews', e);
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('mariekore_wine_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error('Error saving reviews', e);
    }
  }, [reviews]);

  // 5. Currency State
  const [currency, setCurrency] = useState<'XOF' | 'EUR'>('XOF');

  // 5. Promo code & discounts
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);

  // 6. Navigation, Filters & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 7. Modals
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isStockAdminOpen, setIsStockAdminOpen] = useState<boolean>(false);
  const [selectedWineForModal, setSelectedWineForModal] = useState<Wine | null>(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  // 8. Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart Handlers
  const handleAddToCart = (wine: Wine, qty: number = 1) => {
    const currentWineInCatalog = wines.find(w => w.id === wine.id);
    if (!currentWineInCatalog || currentWineInCatalog.stock <= 0) {
      showToast(`Désolé, ${wine.name} est en rupture de stock.`);
      return;
    }

    setCart(prevCart => {
      const existing = prevCart.find(item => item.wine.id === wine.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + qty, currentWineInCatalog.stock);
        return prevCart.map(item =>
          item.wine.id === wine.id ? { ...item, quantity: newQty } : item
        );
      } else {
        const newQty = Math.min(qty, currentWineInCatalog.stock);
        return [...prevCart, { wine: currentWineInCatalog, quantity: newQty }];
      }
    });

    showToast(`✓ ${qty}x "${wine.name}" ajouté(s) au chariot !`);
  };

  const handleUpdateCartQuantity = (wineId: string, delta: number) => {
    const currentWine = wines.find(w => w.id === wineId);
    if (!currentWine) return;

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.wine.id === wineId) {
          const targetQty = item.quantity + delta;
          if (targetQty <= 0) return null;
          const cappedQty = Math.min(targetQty, currentWine.stock);
          return { ...item, quantity: cappedQty };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (wineId: string) => {
    setCart(prev => prev.filter(item => item.wine.id !== wineId));
    showToast('Article retiré du chariot.');
  };

  // Direct checkout from detail modal
  const handleDirectBuy = (wine: Wine, qty: number) => {
    handleAddToCart(wine, qty);
    setIsCheckoutOpen(true);
  };

  // Order Placement & Real-time stock deduction
  const handleOrderComplete = (newOrder: Order) => {
    // 1. Deduct stock in real-time
    setWines(prevWines => {
      return prevWines.map(w => {
        const orderedItem = newOrder.items.find(i => i.wine.id === w.id);
        if (orderedItem) {
          const updatedStock = Math.max(0, w.stock - orderedItem.quantity);
          return { ...w, stock: updatedStock };
        }
        return w;
      });
    });

    // 2. Save order
    setOrders(prev => [newOrder, ...prev]);

    // 3. Clear cart
    setCart([]);

    // 4. Close checkout & show success receipt
    setIsCheckoutOpen(false);
    setLastCompletedOrder(newOrder);
    showToast(`Commande ${newOrder.id} validée et stock décompté en direct !`);
  };

  // Reviews and Ratings Handlers
  const handleAddReview = (wineId: string, newReview: WineReview) => {
    setReviews(prev => {
      const existing = prev[wineId] || [];
      return { ...prev, [wineId]: [newReview, ...existing] };
    });

    // Update wine's rating and reviews count in real-time
    setWines(prevWines => {
      return prevWines.map(w => {
        if (w.id === wineId) {
          const currentList = reviews[wineId] || [];
          const allRatings = [newReview.rating, ...currentList.map(r => r.rating)];
          const avg = Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
          return {
            ...w,
            rating: avg,
            reviewsCount: allRatings.length,
          };
        }
        return w;
      });
    });

    setSelectedWineForModal(prev => {
      if (prev && prev.id === wineId) {
        const currentList = reviews[wineId] || [];
        const allRatings = [newReview.rating, ...currentList.map(r => r.rating)];
        const avg = Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
        return {
          ...prev,
          rating: avg,
          reviewsCount: allRatings.length,
        };
      }
      return prev;
    });

    showToast('Votre avis et note par étoiles ont été publiés avec succès !');
  };

  const handleLikeReview = (wineId: string, reviewId: string) => {
    setReviews(prev => {
      const list = prev[wineId] || [];
      const updated = list.map(r => r.id === reviewId ? { ...r, likes: r.likes + 1 } : r);
      return { ...prev, [wineId]: updated };
    });
  };

  // Stock Admin Handlers
  const handleUpdateStock = (wineId: string, newStock: number) => {
    setWines(prev => prev.map(w => w.id === wineId ? { ...w, stock: Math.max(0, newStock) } : w));
    showToast('Stock mis à jour en temps réel.');
  };

  const handleResetStock = () => {
    setWines(INITIAL_WINES);
    localStorage.removeItem('mariekore_wines_stock');
    showToast('Stocks réinitialisés aux valeurs du catalogue.');
  };

  // Calculated properties
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.wine.price * i.quantity, 0);

  const scrollToFlashSales = () => {
    const el = document.getElementById('flash-sales-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans selection:bg-[#F68B1E] selection:text-white">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#420d12] text-white px-4 py-3 rounded-lg shadow-xl border-2 border-[#F68B1E] text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-3 fade-in duration-200">
          <Check className="w-4 h-4 text-[#F68B1E] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header (Jumia Style) */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        currency={currency}
        setCurrency={setCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenEvent={() => setIsEventModalOpen(true)}
        onOpenStockAdmin={() => setIsStockAdminOpen(true)}
        onOpenOrders={() => setIsStockAdminOpen(true)}
      />

      {/* Event Top Announcement Banner */}
      <EventBanner
        onOpenEvent={() => setIsEventModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        
        {/* Jumia 3-Column Hero Section */}
        <HeroSlider
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('wine-catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenEvent={() => setIsEventModalOpen(true)}
          onOpenFlashSales={scrollToFlashSales}
        />

        {/* Jumia Flash Sales Section */}
        <FlashSales
          wines={wines}
          currency={currency}
          onAddToCart={(wine) => handleAddToCart(wine, 1)}
          onSelectWine={(wine) => setSelectedWineForModal(wine)}
        />

        {/* Full Wine Catalog with Rapid Filters & Search */}
        <WineCatalog
          wines={wines}
          currency={currency}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddToCart={(wine) => handleAddToCart(wine, 1)}
          onSelectWine={(wine) => setSelectedWineForModal(wine)}
        />

      </main>

      {/* Footer (Jumia Style) */}
      <Footer
        onOpenEvent={() => setIsEventModalOpen(true)}
        onOpenStockAdmin={() => setIsStockAdminOpen(true)}
      />

      {/* Modals & Drawers */}

      {/* 1. Wine Detail Modal */}
      <WineDetailModal
        wine={selectedWineForModal}
        currency={currency}
        reviews={selectedWineForModal ? (reviews[selectedWineForModal.id] || []) : []}
        onClose={() => setSelectedWineForModal(null)}
        onAddToCart={handleAddToCart}
        onOpenCheckoutDirect={handleDirectBuy}
        onAddReview={handleAddReview}
        onLikeReview={handleLikeReview}
      />

      {/* 2. Wine Event & Ticketing Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onShopEventWines={() => {
          setSelectedCategory('all');
          scrollToFlashSales();
        }}
        currency={currency}
      />

      {/* 3. Integrated Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        currency={currency}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        discountRate={discountRate}
        setDiscountRate={setDiscountRate}
      />

      {/* 4. Secure Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discountRate={discountRate}
        promoCode={promoCode}
        currency={currency}
        onOrderComplete={handleOrderComplete}
      />

      {/* 5. Order Confirmation & Official Receipt Modal */}
      <OrderSuccessModal
        order={lastCompletedOrder}
        currency={currency}
        onClose={() => setLastCompletedOrder(null)}
        onContinueShopping={() => setLastCompletedOrder(null)}
      />

      {/* 6. Real-Time Stock Management Modal (Admin Panel) */}
      <StockManagementModal
        isOpen={isStockAdminOpen}
        onClose={() => setIsStockAdminOpen(false)}
        wines={wines}
        onUpdateStock={handleUpdateStock}
        onResetStock={handleResetStock}
        orders={orders}
        currency={currency}
      />

    </div>
  );
}
