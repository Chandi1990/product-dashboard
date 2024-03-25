import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import Chart from './components/Chart';
import { fetchCategories, fetchProducts } from './services/ApiService';
import { Category, Product } from './types';

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isReportRunning, setIsReportRunning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    fetchData();
  }, []);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedProducts([]); // Reset products on category change
    setIsReportRunning(false); // Disable report button
  };

  const handleProductChange = (selectedProducts: Product[]) => {
    setSelectedProducts(selectedProducts);
    setIsReportRunning(true); // Enable report button if products are selected
  };

  const handleRunReport = async () => {
    setIsReportRunning(true);
    if (selectedCategory) {
      const products = await fetchProducts(selectedCategory);
      setSelectedProducts(products);
    }
  };

  return (
    <div className="App">
      <Filters
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onProductChange={handleProductChange}
        selectedCategory={selectedCategory}
      />
      <Chart
        isCategorySelected={!!selectedCategory} // Check if category is selected
        selectedCategory={selectedCategory}
        selectedProducts={selectedProducts}
        isReportRunning={isReportRunning}
      />
      <button disabled={!isReportRunning} onClick={handleRunReport}>
        Run Report
      </button>
    </div>
  );
};

export default App;
