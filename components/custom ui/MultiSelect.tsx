"use client"; // ใช้ directive "use client" เพื่อบอกว่าโค้ดนี้จะรันบนฝั่ง client

// นำเข้าองค์ประกอบต่างๆ จาก component Command สำหรับสร้าง UI ที่ใช้คำสั่ง
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

// นำเข้า useState hook สำหรับจัดการสถานะภายในคอมโพเนนต์
import { useState } from "react";
// นำเข้า Badge สำหรับแสดงป้ายของข้อมูลที่เลือก
import { Badge } from "../ui/badge";
// นำเข้าไอคอน X จาก lucide-react เพื่อใช้เป็นปุ่มสำหรับลบรายการที่เลือก
import { X } from "lucide-react";

// กำหนด interface MultiSelectProps สำหรับจัดการ props ที่คอมโพเนนต์ MultiSelect รับ
interface MultiSelectProps {
  placeholder: string; // ข้อความ placeholder ที่จะแสดงในช่อง input
  collections: CollectionType[]; // รายการข้อมูลทั้งหมดที่จะให้ผู้ใช้เลือก
  value: string[]; // ค่าที่ผู้ใช้เลือกไว้
  onChange: (value: string) => void; // ฟังก์ชันที่เรียกเมื่อมีการเพิ่มรายการใหม่
  onRemove: (value: string) => void; // ฟังก์ชันที่เรียกเมื่อมีการลบรายการ
}

// สร้างคอมโพเนนต์ MultiSelect โดยรับ props ที่กำหนดใน interface
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  // ใช้ useState เพื่อจัดการค่าของ input และสถานะการเปิดปิด dropdown
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // ตรวจสอบรายการที่ถูกเลือกจาก value
  let selected: CollectionType[];

  if (value.length === 0) {
    selected = []; // หากไม่มีการเลือกค่า ค่า selected จะเป็น array ว่าง
  } else {
    // หากมีการเลือกค่า จะทำการแมปหาว่าแต่ละ id ตรงกับ collection ใดในรายการ
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  // กรองข้อมูลเพื่อแสดงเฉพาะรายการที่ยังไม่ได้เลือก
  const selectables = collections.filter((collection) => !selected.includes(collection)); 

  return (
    // ใช้คอมโพเนนต์ Command สำหรับการจัดการคำสั่งและรายการที่เลือกได้
    <Command className="overflow-visible bg-white">
      {/* แสดงผลรายการที่ถูกเลือกแล้ว */}
      <div className="flex gap-1 flex-wrap border rounded-md">
        {/* วนลูปแสดงรายการที่ถูกเลือก พร้อมปุ่มสำหรับลบ */}
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button type="button" className="ml-1 hover:text-red-1" onClick={() => onRemove(collection._id)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {/* ช่อง input สำหรับค้นหาหรือเลือกข้อมูลเพิ่มเติม */}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)} // ปิด dropdown เมื่อ input ไม่โฟกัส
          onFocus={() => setOpen(true)} // เปิด dropdown เมื่อ input ถูกโฟกัส
        />
      </div>

      {/* ส่วนแสดงผลรายการที่สามารถเลือกได้ */}
      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
            {/* วนลูปแสดงรายการที่ยังไม่ได้ถูกเลือก */}
            {selectables.map((collection) => (
              <CommandItem
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()} // ป้องกันการเปลี่ยนโฟกัสออกจาก input
                onSelect={() => {
                  onChange(collection._id); // เรียก onChange เมื่อมีการเลือก
                  setInputValue(""); // ล้างค่า input หลังจากเลือกเสร็จ
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

// ส่งออกคอมโพเนนต์ MultiSelect
export default MultiSelect;
