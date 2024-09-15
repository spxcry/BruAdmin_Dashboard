// นำเข้า CldUploadWidget จาก next-cloudinary สำหรับจัดการการอัปโหลดรูปภาพผ่าน Cloudinary
import { CldUploadWidget } from "next-cloudinary";
// นำเข้าไอคอน Plus และ Trash จาก lucide-react สำหรับใช้ในปุ่มเพิ่มและลบรูปภาพ
import { Plus, Trash } from "lucide-react";

// นำเข้าคอมโพเนนต์ Button จากไฟล์ ui/button เพื่อใช้สำหรับสร้างปุ่มในส่วนต่างๆ
import { Button } from "../ui/button";
// นำเข้าคอมโพเนนต์ Image จาก next/image สำหรับแสดงผลรูปภาพที่อัปโหลด
import Image from "next/image";

// กำหนด interface สำหรับ props ที่จะรับในคอมโพเนนต์ ImageUpload
interface ImageUploadProps {
  // รับค่ารูปภาพเป็น array ของ string
  value: string[];
  // ฟังก์ชันสำหรับเปลี่ยนค่า (เพิ่มรูปภาพ)
  onChange: (value: string) => void;
  // ฟังก์ชันสำหรับลบรูปภาพ
  onRemove: (value: string) => void;
}

// สร้างคอมโพเนนต์ ImageUpload ที่รับ props ตาม interface ที่กำหนดไว้
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  // ฟังก์ชันสำหรับจัดการการอัปโหลดรูปภาพ โดยรับผลลัพธ์และดึง URL ที่อัปโหลดมาใช้งาน
  const onUpload = (result: any) => {
    onChange(result.info.secure_url); // ส่ง URL ที่ได้ไปยังฟังก์ชัน onChange
  };

  return (
    <div>
      {/* ส่วนสำหรับแสดงรูปภาพที่อัปโหลดแล้ว */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* วนลูปแสดงผลรูปภาพตาม URL ที่มี */}
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            {/* ปุ่มลบรูปภาพที่มุมขวาบนของรูป */}
            <div className="absolute top-0 right-0 z-10">
              <Button type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-1 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {/* แสดงรูปภาพ */}
            <Image
              src={url}
              alt="collection" // ข้อความ alt สำหรับรูปภาพ
              className="object-cover rounded-lg" // การจัดวางรูปภาพ
              fill // ทำให้รูปภาพเต็มพื้นที่ที่กำหนด
            />
          </div>
        ))}
      </div>

      {/* ส่วนสำหรับการอัปโหลดรูปภาพใหม่ */}
      <CldUploadWidget uploadPreset="k7d7mtyj" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" onClick={() => open()} className="bg-grey-1 text-white">
              <Plus className="h-4 w-4 mr-2" />
              อัปโหลดรูปภาพ
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

// ส่งออกคอมโพเนนต์ ImageUpload
export default ImageUpload;
