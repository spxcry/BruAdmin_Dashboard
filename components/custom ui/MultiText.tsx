"use client"; // กำหนดให้โค้ดนี้ทำงานในฝั่ง client

// นำเข้า useState สำหรับจัดการสถานะในคอมโพเนนต์
import { useState } from "react";

// นำเข้าคอมโพเนนต์ Input, Badge, Button และไอคอน X สำหรับใช้งานใน MultiText
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

// กำหนด interface MultiTextProps สำหรับรับค่า props ในคอมโพเนนต์
interface MultiTextProps {
  placeholder: string; // ข้อความ placeholder ใน input
  value: string[]; // ค่าที่ถูกเลือก (array ของ string)
  onChange: (value: string) => void; // ฟังก์ชันที่เรียกเมื่อเพิ่มค่าใหม่
  onRemove: (value: string) => void; // ฟังก์ชันที่เรียกเมื่อมีการลบค่า
}

// สร้างคอมโพเนนต์ MultiText
const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  // สร้าง state สำหรับเก็บค่าของ input ที่ผู้ใช้กำลังพิมพ์
  const [inputValue, setInputValue] = useState("");

  // ฟังก์ชันสำหรับเพิ่มค่าลงในรายการเมื่อกด Enter
  const addValue = (item: string) => {
    onChange(item); // เรียกฟังก์ชัน onChange เพื่อส่งค่าไปยัง props
    setInputValue(""); // ล้างค่า input หลังจากเพิ่มค่าเสร็จ
  };

  return (
    <>
      {/* ช่อง Input สำหรับรับค่าที่ผู้ใช้พิมพ์ */}
      <Input
        placeholder={placeholder} // ข้อความในช่อง Input
        value={inputValue} // ค่าที่ผู้ใช้พิมพ์
        onChange={(e) => setInputValue(e.target.value)} // เปลี่ยนค่า input ตามที่ผู้ใช้พิมพ์
        onKeyDown={(e) => {
          if (e.key === "Enter") { // เมื่อผู้ใช้กดปุ่ม Enter
            e.preventDefault(); // ป้องกันการรีเฟรชหน้า
            addValue(inputValue); // เรียกฟังก์ชัน addValue เพื่อเพิ่มค่า
          }
        }}
      />

      {/* แสดงผลรายการที่ถูกเลือกแล้ว */}
      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1 text-white">
            {item} {/* แสดงค่าที่ถูกเลือก */}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-1"
              onClick={() => onRemove(item)} // ลบค่าที่ถูกเลือกเมื่อคลิก
              type="button"
            >
              <X className="h-3 w-3" /> {/* ไอคอน X สำหรับลบ */}
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

// ส่งออกคอมโพเนนต์ MultiText เพื่อใช้งานในที่อื่น
export default MultiText;
