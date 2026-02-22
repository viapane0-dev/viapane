import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { CategoriesGrid } from '@/app/components/CategoriesGrid';
import { ProductCategoriesSection } from '@/app/components/ProductCategoriesSection';
import { BlogSection } from '@/app/components/BlogSection';
import { OfficesSection } from '@/app/components/OfficesSection';
import { NewsletterSection } from '@/app/components/NewsletterSection';
import { Footer } from '@/app/components/Footer';
import { ProductsPage } from '@/app/components/ProductsPage';
import { ContactPage } from '@/app/components/ContactPage';
import { AboutPage } from '@/app/components/AboutPage';
import { PodcastSection } from '@/app/components/PodcastSection';
import { BlogPage } from '@/app/components/BlogPage';
import { ProductDetailPage } from '@/app/components/ProductDetailPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'contact' | 'about' | 'blog' | 'product-detail'>('home');

  // Navigate to products page
  const navigateToProducts = () => {
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to contact page
  const navigateToContact = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to about page
  const navigateToAbout = () => {
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to home page
  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to blog page
  const navigateToBlog = () => {
    setCurrentPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to product detail page
  const navigateToProductDetail = () => {
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search from header
  const handleSearch = (searchTerm: string) => {
    // For now, we'll navigate to blog when searching
    // In the future, this could search across all pages
    navigateToBlog();
    // You could pass the search term to the blog page here
  };

  if (currentPage === 'products') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigateToHome} 
          onNavigateProducts={navigateToProducts} 
          onNavigateContact={navigateToContact} 
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
          onSearch={handleSearch}
        />
        <ProductsPage onNavigateToProductDetail={navigateToProductDetail} />
        <Footer 
          onNavigateContact={navigateToContact}
          onNavigateHome={navigateToHome}
          onNavigateProducts={navigateToProducts}
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
        />
      </div>
    );
  }

  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigateToHome} 
          onNavigateProducts={navigateToProducts} 
          onNavigateContact={navigateToContact} 
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
          onSearch={handleSearch}
        />
        <ContactPage />
        <Footer 
          onNavigateContact={navigateToContact}
          onNavigateHome={navigateToHome}
          onNavigateProducts={navigateToProducts}
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
        />
      </div>
    );
  }

  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigateToHome} 
          onNavigateProducts={navigateToProducts} 
          onNavigateContact={navigateToContact} 
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
          onSearch={handleSearch}
        />
        <AboutPage onNavigateProducts={navigateToProducts} onNavigateContact={navigateToContact} />
        <Footer 
          onNavigateContact={navigateToContact}
          onNavigateHome={navigateToHome}
          onNavigateProducts={navigateToProducts}
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
        />
      </div>
    );
  }

  if (currentPage === 'blog') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigateToHome} 
          onNavigateProducts={navigateToProducts} 
          onNavigateContact={navigateToContact} 
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
          onSearch={handleSearch}
        />
        <BlogPage />
        <Footer 
          onNavigateContact={navigateToContact}
          onNavigateHome={navigateToHome}
          onNavigateProducts={navigateToProducts}
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
        />
      </div>
    );
  }

  if (currentPage === 'product-detail') {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onNavigateHome={navigateToHome} 
          onNavigateProducts={navigateToProducts} 
          onNavigateContact={navigateToContact} 
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
          onSearch={handleSearch}
        />
        <ProductDetailPage 
          onNavigateBack={navigateToProducts} 
          onNavigateProducts={navigateToProducts}
          onNavigateContact={navigateToContact}
        />
        <Footer 
          onNavigateContact={navigateToContact}
          onNavigateHome={navigateToHome}
          onNavigateProducts={navigateToProducts}
          onNavigateAbout={navigateToAbout}
          onNavigateBlog={navigateToBlog}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigateProducts={navigateToProducts} 
        onNavigateContact={navigateToContact} 
        onNavigateAbout={navigateToAbout}
        onNavigateBlog={navigateToBlog}
        onSearch={handleSearch}
      />
      <HeroSection onNavigateAbout={navigateToAbout} />
      <CategoriesGrid onNavigateProducts={navigateToProducts} />
      <ProductCategoriesSection onNavigateProducts={navigateToProducts} />
      <PodcastSection />
      <BlogSection />
      <OfficesSection />
      <NewsletterSection />
      <Footer 
        onNavigateContact={navigateToContact}
        onNavigateHome={navigateToHome}
        onNavigateProducts={navigateToProducts}
        onNavigateAbout={navigateToAbout}
        onNavigateBlog={navigateToBlog}
      />
    </div>
  );
}