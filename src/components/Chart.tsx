import React, { useEffect, useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Category, Product } from '../types';

interface ChartProps {
  isCategorySelected: boolean;
  selectedCategory: string | null;
  selectedProducts: Product[];
  isReportRunning: boolean;
}

const Chart: React.FC<ChartProps> = ({ isCategorySelected, selectedCategory, selectedProducts, isReportRunning }) => {
  const chartRef = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      const chartConfig = {
        // ... Define chart configuration options here
      };
      chartRef.current = Highcharts.chart('chart-container', chartConfig);
    }

    const updateChartData = async () => {
      if (isCategorySelected && !isReportRunning) {
        // Fetch product data for the selected category if report is not running
        const products = await fetchProducts(selectedCategory);
        // Update chart data with price distribution of all products in the category
      } else if (selectedProducts.length > 0) {
        // Update chart data with price distribution of selected products
      } else {
        // Display a message indicating no data selected
      }
    };

    updateChartData();

    // Cleanup function to avoid memory leaks
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [isCategorySelected, selectedCategory, selectedProducts, isReportRunning]);

  return <div id="chart-container"></div>;
};

export default Chart;
