// ใช้คำสั่ง "use client" เพื่อบอกว่า component นี้รันบน client-side
'use client';

// นำเข้า useRouter จาก next/navigation เพื่อใช้ในการนำทาง
import { useRouter } from "next/navigation";
// นำเข้า useEffect และ useState จาก React เพื่อจัดการ state และ side effects
import { useEffect, useState } from "react";
// นำเข้า component Loader จาก custom UI เพื่อแสดงขณะรอข้อมูล
import Loader from "@/components/custom ui/Loader";
// นำเข้า component Button จาก UI เพื่อใช้เป็นปุ่ม
import { Button } from "@/components/ui/button";
// นำเข้า icon Plus จาก lucide-react เพื่อใช้ในปุ่ม
import { Plus } from "lucide-react";
// นำเข้า component Input จาก UI เพื่อใช้เป็น input สำหรับค้นหา
import { Input } from "@/components/ui/input";


// กำหนด interface สำหรับ CustomerType ที่เป็นข้อมูลลูกค้า
interface CustomerType {
  _id: string;
  title: string;
  quantity?: number;
  media: string[];
  description?: string;
}

// component CustomerCard ที่รับ prop customer
const CustomerCard = ({ customer }: { customer: CustomerType }) => {

  // กำหนดวันที่ปัจจุบันในรูปแบบไทย
  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    // การแสดงผลข้อมูลลูกค้าในรูปแบบ card
    <div className="bg-white shadow-lg rounded-lg p-5 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 relative">
      {/* แสดงรูปภาพลูกค้า */}
      <img
        src={customer.media[0]}
        alt={customer.title}
        className="w-48 h-48 object-cover rounded-lg"
      />
      <div className="p-4 flex-grow">
        {/* ชื่อลูกค้า */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{customer.title}</h2>
        <div className="flex items-center mb-4">
          {/* แสดงคำอธิบาย หรือข้อความว่าไม่มีข้อมูล */}
          <button
            className="px-3 py-1 text-sm rounded-full font-semibold text-white bg-red-500 shadow-sm hover:bg-red-600 transition-all duration-300"
          >
            {customer.description ? customer.description : 'No description available'}
          </button>
        </div>

        {/* แสดงวันที่ปัจจุบัน */}
        <p className="text-gray-500 mb-4">{currentDate}</p>

        {/* ปุ่มดูรายละเอียดลูกค้า */}
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-lg transition-transform duration-300 ease-in-out hover:bg-purple-600 hover:scale-105 absolute bottom-4 right-4"
          onClick={() => window.location.href = `/customers/${customer._id}`}
        >
          ดูรายละเอียดลูกค้า
        </button>
      </div>
    </div>
  );
};

// component Customers สำหรับแสดงรายการลูกค้า
const Customers = () => {
  const router = useRouter(); // ใช้ hook useRouter เพื่อใช้ในการนำทาง
  const [loading, setLoading] = useState(true); // state สำหรับจัดการสถานะการโหลด
  const [customers, setCustomers] = useState<CustomerType[]>([]); // state สำหรับเก็บข้อมูลลูกค้า
  const [searchTerm, setSearchTerm] = useState(""); // state สำหรับเก็บค่าการค้นหา

  // ฟังก์ชันสำหรับดึงข้อมูลลูกค้า
  const getCustomers = async () => {
    try {
      // เรียก API เพื่อดึงข้อมูลลูกค้าจาก server
      const res = await fetch("/api/customers", {
        method: "GET",
      });

      const data = await res.json();
      setCustomers(data.customers); // อัพเดต state customers ด้วยข้อมูลที่ได้จาก API
      setLoading(false); // ปิดการโหลดเมื่อข้อมูลถูกดึงมาแล้ว
    } catch (err) {
      // แสดง error ในกรณีที่การดึงข้อมูลล้มเหลว
      console.log("[getCustomers]", err);
    }
  };

  // ใช้ useEffect เพื่อเรียก getCustomers เมื่อ component ถูก mount
  useEffect(() => {
    getCustomers();
  }, []);

  // กรองลูกค้าตามคำค้นหา
  const filteredCustomers = customers.filter((customer) =>
    customer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ถ้า loading เป็น true ให้แสดง Loader component; ถ้าไม่ ให้แสดงรายการลูกค้า
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-6 bg-gray-100 min-h-screen"> {/* เปลี่ยนพื้นหลังเป็นสีเทา */}
      <div className="flex items-center justify-between mb-6">
        {/* หัวข้อของหน้า */}
        <h1 className="text-heading3-bold text-gray-800">ลูกค้าแบล็คลิสต์</h1>
        {/* ปุ่มเพิ่มลูกค้า */}
        <Button
          className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 transition-transform duration-300 ease-in-out"
          onClick={() => router.push("/customers/new")}
        >
          <Plus className="h-5 w-5 mr-2" />
          เพิ่มลูกค้า
        </Button>
      </div>

      {/* เส้นแบ่ง */}
      <hr className="border-t-2 border-gray-300 my-4" />
      
      {/* ช่องค้นหา */}
      <Input
        placeholder="ค้นหาลูกค้า..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      {/* แสดงรายการลูกค้า */}
      <div className="grid grid-cols-2 gap-8">
        {filteredCustomers.length > 0 ? (
          // ถ้ามีลูกค้าที่ผ่านการกรอง ให้แสดง CustomerCard
          filteredCustomers.map((customer) => (
            <CustomerCard key={customer._id} customer={customer} />
          ))
        ) : (
          // ถ้าไม่มีลูกค้าที่ค้นหา ให้แสดงข้อความ
          <p className="text-gray-500">ไม่พบลูกค้าที่ค้นหา</p>
        )}
      </div>
    </div>
  );
};

// export ฟังก์ชัน Customers เป็น default เพื่อให้สามารถเรียกใช้ที่อื่นได้
export default Customers;