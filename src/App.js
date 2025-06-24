import React, { useState } from 'react';
import { ChevronDown, Facebook, Instagram, Twitter, Mail, Menu, X } from 'lucide-react';


const colors = {
  primaryDark: '#000000',     // Deep Charcoal / Near Black - main background for most sections and header
  accentCyan: '#40E0D0',      // Dimmer Electric Cyan - vibrant accent, highlights (e.g., titles)
  accentStrongBlue: '#007BFF', // Strong Blue - Replaces magenta for a male tone accent
  mediumGrey: '#4A4A4A',      // Dark Grey - secondary text, borders, card backgrounds on dark sections
  lightText: '#F0F0F0',       // Light Grey / Off-White - primary text on dark backgrounds
};


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
 
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);

  // Navigation Bar Component
  const NavBar = ({ setCurrentPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
      { name: 'Home', id: 'home' },
      { name: 'Products', id: 'products' },
      { name: 'Category', id: 'category' },
      { name: 'FAQ', id: 'faq' },
      { name: 'About Us', id: 'about' },
      { name: 'Contact Us', id: 'contact' },
    ];

    const handleNavItemClick = (id) => {
      setCurrentPage(id);
      setIsMobileMenuOpen(false);
      // Ensure payment instructions are hidden when navigating to other main pages
      setShowPaymentInstructions(false);
    };

    return (
      <nav className="p-4 shadow-lg absolute w-full top-0 left-0 z-20" style={{ backgroundColor: colors.primaryDark }}>
        <div className="container mx-auto flex justify-between items-center relative">
          {/* Brand Logo/Name */}
          <div className="text-2xl font-bold rounded-lg px-3 py-1" style={{ color: colors.lightText, backgroundColor: colors.accentCyan }}>
            Tsedal Clothing
          </div>

          {/* Hamburger Icon for Mobile View */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset"
              style={{ color: colors.lightText, borderColor: colors.accentStrongBlue, ringColor: colors.accentStrongBlue }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavItemClick(item.id)}
                  className="text-lg font-semibold px-4 py-2 rounded-full transition-all duration-300 ease-in-out
                             hover:scale-105 hover:shadow-md"
                  style={{ color: colors.lightText, hoverBackgroundColor: colors.accentStrongBlue }}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation Menu (solid background for readability) */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 w-full z-10 py-2 shadow-lg rounded-b-lg" style={{ backgroundColor: colors.primaryDark }}>
              <ul className="flex flex-col items-center space-y-4">
                {navItems.map((item) => (
                  <li key={item.id} className="w-full text-center">
                    <button
                      onClick={() => handleNavItemClick(item.id)}
                      className="block w-full text-lg font-semibold px-4 py-2 rounded-md transition-all duration-300 ease-in-out
                                 hover:scale-100 hover:shadow-sm"
                      style={{ color: colors.lightText, hoverBackgroundColor: colors.accentStrongBlue }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  };

  // Home Page Component
  const Home = () => (
    <section
      className="min-h-screen flex items-center justify-center p-8 text-center"
      style={{
        backgroundColor: colors.primaryDark,
        backgroundImage: 'none',
      }}
    >
      <div className="max-w-4xl mx-auto z-10 p-8 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}>
        <h1 className="text-6xl font-extrabold mb-6 animate-pulse" style={{ color: colors.accentCyan }}>
          Unleash Your Vibe. Print Your Power.
        </h1>
        <p className="text-2xl mb-8 leading-relaxed" style={{ color: colors.lightText }}>
          From street art to iconic beats, wear your passion. We're the canvas for your 21st-century style.
        </p>
        <button
          onClick={() => setCurrentPage('products')}
          className="px-8 py-4 text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 ease-in-out
                     hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-opacity-75"
          style={{ backgroundColor: colors.accentStrongBlue, color: colors.lightText, borderColor: colors.lightText, ringColor: colors.accentCyan }}
        >
          Shop The Drops
        </button>
      </div>
    </section>
  );

  // Product Card Component (Reusable for Products & Category pages)
  const ProductCard = ({ product, onBuyClick }) => { // Added onBuyClick prop
    return (
      <div
        className="group relative p-6 rounded-xl shadow-lg overflow-hidden
                   transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl
                   flex flex-col items-center justify-center text-center"
        style={{ borderColor: colors.mediumGrey, borderWidth: '2px', backgroundColor: colors.primaryDark }}
      >
        <img
          src={`https://placehold.co/300x200/${colors.accentCyan.substring(1)}/${colors.lightText.substring(1)}?text=${product.name.replace(/\s/g, '+')}`}
          alt={product.name}
          className="rounded-lg mb-4 transform group-hover:rotate-1 group-hover:scale-105 transition-transform duration-300"
        />
        <h3 className="text-2xl font-bold mb-2" style={{ color: colors.lightText }}>{product.name}</h3>
        <p className="text-lg mb-4" style={{ color: colors.accentStrongBlue }}>${product.price.toFixed(2)}</p>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={() => onBuyClick(product)} // Call onBuyClick when button is tapped
          className="px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0
                     transition-all duration-300 ease-in-out"
          style={{ backgroundColor: colors.accentStrongBlue, color: colors.lightText }}
        >
          Buy
        </button>
      </div>
    );
  };

  // Products Page Component
  const Products = ({ setShowPaymentInstructions }) => { 
    const products = [
      { id: 1, name: 'Streetwise Hoodie', price: 69.99 , image:  },
      { id: 2, name: 'Vibe Ankle Socks (3-Pack)', price: 14.99 },
      { id: 3, name: 'Iconic Graphic Tee', price: 34.99 },
      { id: 4, name: 'Urban Sling Bag', price: 89.99 },
      { id: 5, name: 'Statement Sweatshirt', price: 54.99 },
      { id: 6, name: 'Crew Socks (Art Series)', price: 19.99 },
      { id: 7, name: 'Signature Longsleeve Tee', price: 39.99 },
      { id: 8, name: 'Artist Tote Bag', price: 44.99 },
    ];

    const handleProductBuy = (product) => {
      
      console.log(`User wants to buy: ${product.name}`);
      setShowPaymentInstructions(true); // Show payment instructions
    };

    return (
      <section className="min-h-screen p-8 pt-20" style={{ backgroundColor: colors.primaryDark }}>
        <div className="container mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-12 animate-fade-in" style={{ color: colors.accentCyan }}>The Latest Drops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onBuyClick={handleProductBuy} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Category Page Component (with Accordion-like behavior)
  const Category = ({ setShowPaymentInstructions }) => { // Added setShowPaymentInstructions prop
    const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

    const categories = [
      {
        name: 'Hoodies',
        products: [
          { id: 101, name: 'Graphic Zip Hoodie', price: 75.00 },
          { id: 102, name: 'Oversized Pullover', price: 65.00 },
          { id: 103, name: 'Artist Collab Hoodie', price: 80.00 },
        ],
      },
      {
        name: 'Socks',
        products: [
          { id: 201, name: 'Statement Crew Socks', price: 12.00 },
          { id: 202, name: 'Patterned Ankle Socks', price: 10.00 },
          { id: 203, name: 'Logo Tube Socks', price: 15.00 },
        ],
      },
      {
        name: 'Tees',
        products: [
          { id: 301, name: 'Vintage Hip-Hop Tee', price: 32.00 },
          { id: 302, name: 'Digital Art Tee', price: 30.00 },
          { id: 303, name: 'Longline Tee', price: 38.00 },
        ],
      },
      {
        name: 'Bags',
        products: [
          { id: 401, name: 'Streetwear Backpack', price: 95.00 },
          { id: 402, name: 'Messenger Bag', price: 75.00 },
          { id: 403, name: 'Limited Edition Duffle', price: 110.00 },
        ],
      },
    ];

    const toggleCategory = (index) => {
      setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    };

    const handleProductBuy = (product) => {
      // In a real app, you might pass product details to the payment page or a cart
      console.log(`User wants to buy: ${product.name}`);
      setShowPaymentInstructions(true); // Show payment instructions
    };

    return (
      <section className="min-h-screen p-8 pt-20" style={{ backgroundColor: colors.primaryDark }}>
        <div className="container mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-12" style={{ color: colors.accentCyan }}>Explore Collections</h2>
          <div className="space-y-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-[1.01]"
                style={{ backgroundColor: colors.mediumGrey, borderColor: colors.accentStrongBlue, borderWidth: '2px' }}
              >
                {/* Category Header (Clickable Card-like appearance) */}
                <div
                  className="flex justify-between items-center p-6 cursor-pointer"
                  onClick={() => toggleCategory(index)}
                  role="button"
                  aria-expanded={openCategoryIndex === index}
                >
                  <h3 className="text-3xl font-bold" style={{ color: colors.lightText }}>{category.name}</h3>
                  <ChevronDown className={`transform transition-transform duration-300 ${openCategoryIndex === index ? 'rotate-180' : ''}`} size={32} style={{ color: colors.lightText }} />
                </div>

                {/* Products Grid (Toggled visibility based on openCategoryIndex) */}
                {openCategoryIndex === index && (
                  <div className="p-6 pt-4" style={{ borderTopColor: colors.accentCyan, borderTopWidth: '1px' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.products.map((product) => (
                        <ProductCard key={product.id} product={product} onBuyClick={handleProductBuy} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // FAQ Page Component (Accordion-like structure)
  const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
      {
        question: 'How do you handle online payments?',
        answer: `For online payments, after you complete your transaction through our secure payment gateway,
                 you will receive a transaction ID. Please use our dedicated Google Form (link will be provided here) to submit your transaction ID.
                 Our manual team will then cross-reference this ID with our records to confirm your payment, ensuring accuracy and security for every order.`,
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and other local payment options as available.',
      },
    ];

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
      <section className="min-h-screen p-8 pt-20" style={{ backgroundColor: colors.primaryDark }}>
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-5xl font-extrabold text-center mb-12" style={{ color: colors.accentCyan }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
                style={{ backgroundColor: colors.mediumGrey, borderColor: colors.accentStrongBlue, borderWidth: '2px' }}
                onClick={() => toggleFAQ(index)}
                role="button"
                aria-expanded={openIndex === index}
              >
                <div className="flex justify-between items-center p-6">
                  <h3 className="text-2xl font-semibold" style={{ color: colors.lightText }}>{faq.question}</h3>
                  <ChevronDown className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} size={28} style={{ color: colors.lightText }} />
                </div>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-lg" style={{ color: colors.lightText, borderTopColor: colors.accentCyan, borderTopWidth: '1px' }}>
                    <p className="mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // About Us Page Component
  const AboutUs = () => (
    <section className="min-h-screen p-8 pt-20 flex items-center justify-center text-center" style={{ backgroundColor: colors.primaryDark }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h2 className="text-5xl font-extrabold mb-8" style={{ color: colors.accentCyan }}>About Us</h2>
        <p className="text-xl mb-6 leading-relaxed" style={{ color: colors.lightText}}>
          We are a passionate team dedicated to bringing you the best products and an unparalleled shopping experience.
          Founded on the principles of quality, innovation, and customer satisfaction, we strive to make a difference in your everyday life.
        </p>
        <p className="text-xl leading-relaxed" style={{ color: colors.lightText}}>
          Our mission is to continually source and deliver products that meet the highest standards, while fostering a community
          where our customers feel valued and heard. Join us on our journey to redefine retail.
        </p>
      </div>
    </section>
  );

  // Contact Us Page Component
  const ContactUs = () => (
    <section className="min-h-screen p-8 pt-20 flex items-center justify-center text-center" style={{ backgroundColor: colors.primaryDark }}>
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
        <h2 className="text-5xl font-extrabold mb-8" style={{ color: colors.accentCyan }}>Contact Us</h2>
        <p className="text-xl mb-8 leading-relaxed" style={{ color: colors.lightText }}>
          We'd love to hear from you! Connect with us through our social media channels or send us an email.
        </p>
        <div className="flex justify-center space-x-8 mb-12">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
             className="text-white hover:scale-110 transform transition-transform duration-300" aria-label="Facebook">
            <Facebook size={64} style={{ color: colors.accentStrongBlue }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="text-white hover:scale-110 transform transition-transform duration-300" aria-label="Instagram">
            <Instagram size={64} style={{ color: colors.accentStrongBlue }} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
             className="text-white hover:scale-110 transform transition-transform duration-300" aria-label="Twitter">
            <Twitter size={64} style={{ color: colors.accentStrongBlue }} />
          </a>
        </div>
        <p className="text-xl font-bold" style={{ color: colors.accentCyan }}>
          <Mail size={24} className="inline-block mr-2" style={{ color: colors.accentStrongBlue }} />
          Email us at: <a href="mailto:info@yourbrand.com" className="hover:underline" style={{ color: colors.accentCyan }}>info@yourbrand.com</a>
        </p>
      </div>
    </section>
  );

  // New Payment Instructions Component
  const PaymentInstructions = ({ onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full text-center" style={{ backgroundColor: colors.primaryDark, borderColor: colors.accentCyan, borderWidth: '2px' }}>
          <h2 className="text-4xl font-extrabold mb-6" style={{ color: colors.accentCyan }}>How To Pay</h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: colors.lightText }}>
            Thank you for your purchase! To complete your order, please follow these instructions carefully:
          </p>
          <ul className="text-left text-lg space-y-4 mb-8 mx-auto max-w-md" style={{ color: colors.lightText }}>
            <li><span className="font-bold" style={{ color: colors.accentStrongBlue }}>Step 1:</span> Make your payment to the following accounts:</li>
            <li className="ml-8">Bank Account: <span className="font-bold" style={{ color: colors.accentCyan }}>1000223816898</span></li>
            <li className="ml-8">Telebirr: <span className="font-bold" style={{ color: colors.accentCyan }}>0949936370</span></li>
            <li><span className="font-bold" style={{ color: colors.accentStrongBlue }}>Step 2:</span> Capture a screenshot or note down your Transaction ID.</li>
            <li><span className="font-bold" style={{ color: colors.accentStrongBlue }}>Step 3:</span> Click the button below to fill out our Google Form with your payment details.</li>
            <li><span className="font-bold" style={{ color: colors.accentStrongBlue }}>Step 4:</span> Our team will confirm your payment and process your order shortly!</li>
          </ul>

          <a
            href="https://forms.gle/YOUR_GOOGLE_FORM_LINK_HERE" // REPLACE THIS WITH YOUR ACTUAL GOOGLE FORM LINK!
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 ease-in-out
                       hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-opacity-75 mb-6"
            style={{ backgroundColor: colors.accentStrongBlue, color: colors.lightText, borderColor: colors.lightText, ringColor: colors.accentCyan }}
          >
            Submit Payment Details
          </a>

          <button
            onClick={onClose}
            className="block w-full px-8 py-3 text-lg font-semibold rounded-full border-2 transition-all duration-300 ease-in-out
                       hover:scale-105 hover:shadow-md"
            style={{ borderColor: colors.mediumGrey, color: colors.mediumGrey, backgroundColor: 'transparent' }}
          >
            Close
          </button>
        </div>
      </div>
    );
  };


  // Conditional rendering function to display the correct page based on 'currentPage' state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'products':
        // Pass setShowPaymentInstructions down to Products and Category components
        return <Products setShowPaymentInstructions={setShowPaymentInstructions} />;
      case 'category':
        return <Category setShowPaymentInstructions={setShowPaymentInstructions} />;
      case 'faq':
        return <FAQ />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen font-inter" style={{ backgroundColor: colors.primaryDark }}>
      <NavBar setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <footer className="p-6 text-center" style={{ backgroundColor: colors.primaryDark, color: colors.lightText }}>
        <p>&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
      </footer>

      {/* Conditionally render the PaymentInstructions overlay */}
      {showPaymentInstructions && <PaymentInstructions onClose={() => setShowPaymentInstructions(false)} />}
    </div>
  );
}
