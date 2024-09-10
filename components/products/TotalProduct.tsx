import React, { useEffect, useState } from 'react';

const TotalProduct = () => {
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // เรียก API สำหรับดึงข้อมูลสินค้า
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setTotalProducts(data.products.length); // แสดงจำนวนสินค้าทั้งหมด
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">สินค้าทั้งหมด</h3>
      <div className="text-3xl font-bold mt-2">
        {totalProducts !== null ? totalProducts : 'Loading...'}
      </div>
    </div>
  );
};

export default TotalProduct;
