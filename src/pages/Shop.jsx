import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PageBanner from '../components/ui/Cards/PageBanner';

import ProductCard from '../components/ui/Cards/ProductCard';
import ProductData from '../assets/Data/ProductData.json';
import { Search, ChevronDown, Filter, RotateCcw, Tag } from 'lucide-react';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const [products, setProducts] = useState(ProductData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const [priceRange, setPriceRange] = useState(300);
  const [selectedTag, setSelectedTag] = useState("All");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 9;

  const tags = ["ALI", "Discount", "Item", "Simple", "Smart", "Stock"];

  // Extract unique categories 
  const allCategories = ["All", ...new Set(ProductData.flatMap(p => p.categories ? p.categories.split(',') : []))];

  // Filtering & Sorting Logic
  useEffect(() => {
    let filtered = ProductData.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || (product.categories && product.categories.includes(selectedCategory));
      const matchesPrice = product.price <= priceRange;
      const matchesTag = selectedTag === "All" || (product.categories && product.categories.includes(selectedTag));

      return matchesSearch && matchesCategory && matchesPrice && matchesTag;
    });

    if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "popularity") {
      filtered.sort((a, b) => b.id - a.id);
    }

    setProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption, priceRange, selectedTag]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOption("latest");
    setPriceRange(300);
    setSelectedTag("All");
  };

  const sidebarRef = useRef(null);
  const mainRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    if (!sidebarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".sidebar-box", {
        opacity: 0,
        x: -25,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 85%",
        }
      });
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".product-item", {
        opacity: 0,
        y: 30,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, [currentProducts]);

  return (
    <>
      <PageBanner title="Shop" currentPage="Shop" />

      <div className="bg-[#FAF7F2] min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Sidebar */}
            <aside ref={sidebarRef} className='w-full lg:w-1/4 space-y-6 order-2 lg:order-1 sticky top-6'>
              
              {/* Header Sidebar & Reset */}
              <div className="flex items-center justify-between px-1">
                <h2 className="text-lg font-bold text-[#4A3525] flex items-center gap-2 tracking-wide uppercase">
                  <Filter size={18} className="text-[#6F4E37]" /> Filters
                </h2>
                <button 
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-stone-500 hover:text-[#6F4E37] flex items-center gap-1 transition-colors cursor-pointer uppercase tracking-wider"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>

              {/* Search Box */}
              <div className='bg-white p-5 shadow-sm border border-stone-200/80 sidebar-box'>
                <h3 className='text-xs font-bold text-[#4A3525] mb-3 uppercase tracking-widest'>Search</h3>
                <div className='relative'>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full bg-[#FAF7F2] border border-stone-200 p-2.5 pl-10 text-sm outline-none focus:border-[#6F4E37] focus:bg-white transition-all text-[#4A3525]'
                  />
                  <Search className='absolute left-3 top-3 text-stone-400' size={16} />
                </div>
              </div>

              {/* Categories */}
              <div className='bg-white p-5 shadow-sm border border-stone-200/80 sidebar-box'>
                <h3 className='text-xs font-bold text-[#4A3525] mb-3 uppercase tracking-widest'>Categories</h3>
                <ul className='space-y-1'>
                  {allCategories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat 
                            ? "bg-[#6F4E37] text-white font-semibold" 
                            : "text-stone-600 hover:bg-[#F5F2EB] hover:text-[#4A3525]"
                        }`}
                      >
                        {cat}
                        {selectedCategory === cat && (
                          <span className="w-1.5 h-1.5 bg-white"></span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filter By Price */}
              <div className='bg-white p-5 shadow-sm border border-stone-200/80 sidebar-box'>
                <div className="flex justify-between items-center mb-3">
                  <h3 className='text-xs font-bold text-[#4A3525] uppercase tracking-widest'>Max Price</h3>
                  <span className="text-xs font-bold text-white bg-[#6F4E37] px-2.5 py-0.5">
                    ${priceRange}
                  </span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className='w-full accent-[#6F4E37] cursor-pointer h-1.5 bg-stone-200 appearance-none'
                />
                <div className="flex justify-between text-xs text-stone-400 mt-2 font-medium">
                  <span>$0</span>
                  <span>$300</span>
                </div>
              </div>

              {/* Tag Filter */}
              <div className="bg-white p-5 shadow-sm border border-stone-200/80 sidebar-box">
                <h3 className='text-xs font-bold text-[#4A3525] mb-3 uppercase tracking-widest flex items-center gap-1.5'>
                  <Tag size={13} /> Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? "All" : tag)}
                      className={`text-xs px-3 py-1.5 border transition-all cursor-pointer font-medium ${
                        selectedTag === tag 
                          ? "bg-[#6F4E37] text-white border-[#6F4E37]" 
                          : "border-stone-200 text-stone-600 bg-white hover:border-[#6F4E37] hover:text-[#6F4E37]"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

            </aside>

            {/* Main Content */}
            <main ref={mainRef} className="w-full lg:w-3/4 order-1 lg:order-2">
              
              {/* Top Bar */}
              <div className="bg-white p-4 shadow-sm border border-stone-200/80 flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <p className="text-sm text-stone-500 font-medium">
                  Showing <span className="text-[#4A3525] font-bold">{products.length > 0 ? indexOfFirstProduct + 1 : 0}–{Math.min(indexOfLastProduct, products.length)}</span> of <span className="text-[#4A3525] font-bold">{products.length}</span> results
                </p>

                <div className="relative">
                  <select 
                    value={sortOption}
                    className='appearance-none bg-[#FAF7F2] border border-stone-200 px-4 py-2 pr-9 text-sm font-medium text-[#4A3525] outline-none cursor-pointer focus:border-[#6F4E37] transition-all'
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="latest">Sort by latest</option>
                    <option value="popularity">Sort by Popularity</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                  </select>
                  <ChevronDown className='absolute right-3 top-3 text-stone-400 pointer-events-none' size={16} />
                </div>
              </div>

              {/* Product Grid */}
              {currentProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentProducts.map((item) => (
                      <div key={item.id} className="product-item">
                        <ProductCard product={item} />
                      </div>
                    ))}
                  </div>

                  {/* Pagination Coffee Style */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-10 gap-2">
                      <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2.5 border border-stone-200 bg-white text-[#4A3525] hover:bg-[#6F4E37] hover:text-white hover:border-[#6F4E37] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#4A3525] disabled:hover:border-stone-200 transition-all cursor-pointer shadow-sm"
                      >
                        <Icon icon="mdi:chevron-left" width="20" />
                      </button>

                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`w-10 h-10 font-semibold text-sm transition-all cursor-pointer shadow-sm border ${
                            currentPage === index + 1
                              ? "bg-[#6F4E37] text-white border-[#6F4E37]"
                              : "bg-white border-stone-200 text-stone-700 hover:bg-[#F5F2EB] hover:border-[#6F4E37] hover:text-[#6F4E37]"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2.5 border border-stone-200 bg-white text-[#4A3525] hover:bg-[#6F4E37] hover:text-white hover:border-[#6F4E37] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#4A3525] disabled:hover:border-stone-200 transition-all cursor-pointer shadow-sm"
                      >
                        <Icon icon="mdi:chevron-right" width="20" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-white border border-stone-200/80 shadow-sm">
                  <div className="w-16 h-16 bg-[#F5F2EB] text-[#6F4E37] flex items-center justify-center mx-auto mb-4">
                    <Filter size={28} />
                  </div>
                  <h3 className='text-lg font-bold text-[#4A3525] mb-1 uppercase tracking-wide'>No products found</h3>
                  <p className="text-sm text-stone-500 mb-5">Try adjusting your filters or search criteria.</p>
                  <button 
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-[#6F4E37] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#4A3525] transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </main>

          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;