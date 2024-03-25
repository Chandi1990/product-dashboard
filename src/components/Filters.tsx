import React from 'react';
import { Category, Product } from './types';
import { Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material';

interface FiltersProps {
  categories: Category[];
  onCategoryChange: (categoryId: string | null) => void;
  onProductChange: (selectedProducts: Product[]) => void;
  selectedCategory: string | null;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  onCategoryChange,
  onProductChange,
  selectedCategory,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value);
    setSelectedProducts([]); // Reset products on category change
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedProducts = selectedProducts.includes(event.target.value as Product)
      ? selectedProducts.filter((product) => product.id !== event.target.value)
      : [...selectedProducts, event.target.value as Product];
    setSelectedProducts(newSelectedProducts);
    onProductChange(newSelectedProducts);
  };

  return (
    <div>
      <Select value={selectedCategory} onChange={handleCategoryChange}>
        <MenuItem value={null}>All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      {selectedCategory && (
        <div>
          <h4>Products</h4>
          {categories.find((cat) => cat.id === selectedCategory)?.products?.map((product) => (
            <FormControlLabel
              key={product.id}
              control={<Checkbox checked={selectedProducts.includes(product)} onChange={handleProductChange} value={product} />}
              label={product.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
