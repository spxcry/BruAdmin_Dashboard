import React, { useEffect, useState } from 'react';

const TotalCustomers = () => {
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        
        // ถ้า API ส่ง totalCustomers มาโดยตรง
        setTotalCustomers(data.totalCustomers);
        
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchCustomers();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">ลูกค้าติดแบล็คลิสต์ทั้งหมด</h3>
      <div className="text-3xl font-bold mt-2">
        {totalCustomers !== null ? totalCustomers : 'Loading...'}
      </div>
    </div>
  );
};

export default TotalCustomers;