"use client"; // บอกว่า component นี้รันบน client-side

import { zodResolver } from "@hookform/resolvers/zod"; // นำเข้า zodResolver เพื่อใช้ในการ validate ฟอร์ม
import { useForm } from "react-hook-form"; // นำเข้า useForm จาก react-hook-form เพื่อจัดการฟอร์ม
import { z } from "zod"; // นำเข้า zod เพื่อกำหนด schema สำหรับ validation
import { useRouter } from "next/navigation"; // นำเข้า useRouter จาก next/navigation เพื่อใช้ในการเปลี่ยนหน้า
import { useState } from "react"; // นำเข้า useState จาก React เพื่อจัดการ state
import toast from "react-hot-toast"; // นำเข้า toast สำหรับการแจ้งเตือน
import { Button } from "@/components/ui/button"; // นำเข้า Button component
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // นำเข้า component ที่เกี่ยวข้องกับฟอร์ม
import { Input } from "@/components/ui/input"; // นำเข้า Input component สำหรับฟอร์ม
import { Textarea } from "../ui/textarea"; // นำเข้า Textarea สำหรับฟอร์ม
import ImageUpload from "../custom ui/ImageUpload"; // นำเข้า ImageUpload component สำหรับอัปโหลดรูปภาพ
import { Separator } from "@/components/ui/separator"; // นำเข้า Separator สำหรับการแบ่งส่วนใน UI
import Loader from "@/components/custom ui/Loader"; // นำเข้า Loader เพื่อแสดงขณะโหลดข้อมูล
import { Check, X } from "lucide-react"; // นำเข้า icons Check และ X จาก lucide-react


// Define the form schema using zod
const formSchema = z.object({
  title: z.string().min(2).max(20), // กำหนด title ต้องมีความยาวระหว่าง 2-20 ตัวอักษร
  description: z.string().min(2).max(500).trim(), // กำหนด description ต้องมีความยาวระหว่าง 2-500 ตัวอักษร
  media: z.array(z.string()), // กำหนด media เป็น array ของ string
});

interface CollectionFormProps {
  initialData?: CollectionType | null; // กำหนดประเภทของ props initialData
}

// ฟังก์ชัน CollectionForm สำหรับจัดการฟอร์มคอลเลคชั่น
const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter(); // ใช้ useRouter เพื่อเปลี่ยนหน้า
  const [loading, setLoading] = useState(false); // กำหนดสถานะการโหลดข้อมูล

  // ใช้ useForm จาก react-hook-form ในการจัดการฟอร์มและ validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // ใช้ zodResolver สำหรับการตรวจสอบข้อมูล
    defaultValues: initialData
      ? initialData // ถ้ามีข้อมูล initialData ให้ใช้เป็นค่าเริ่มต้น
      : {
          title: "",
          description: "",
          media: [],
        },
  });

  // ฟังก์ชันสำหรับป้องกันการกด Enter เพื่อส่งฟอร์ม
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // ป้องกันการกด Enter เพื่อส่งฟอร์ม
    }
  };

  // ฟังก์ชันสำหรับจัดการเมื่อส่งฟอร์ม
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true); // ตั้งค่า loading เป็น true ขณะกำลังดำเนินการ
      const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections"; // กำหนด URL สำหรับการส่งข้อมูล
      const res = await fetch(url, {
        method: "POST", // ใช้วิธี POST ในการส่งข้อมูล
        body: JSON.stringify(values), // ส่งข้อมูลในรูปแบบ JSON
      });
      if (res.ok) {
        setLoading(false); // ตั้งค่า loading เป็น false เมื่อทำเสร็จ
        toast.success(`Collection ${initialData ? "updated" : "created"}`); // แสดงข้อความแจ้งเตือน
        router.push("/collections"); // เปลี่ยนหน้าไปยัง /collections
      }
    } catch (err) {
      console.log("[collections_POST]", err); // แสดง error ใน console
      toast.error("Something went wrong! Please try again."); // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
    }
  };

  return loading ? ( // ถ้า loading ให้แสดง Loader component
    <Loader />
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-10 bg-white rounded-lg shadow-md max-w-4xl w-full">
        {initialData ? ( // ถ้ามี initialData ให้แสดงฟอร์มแก้ไข
          <div className="flex items-center justify-between mb-6">
            <p className="text-heading3-bold text-gray-800">ปรับแต่งคอลแลคชั่น</p>
            <Button
              type="button"
              className="bg-red-500 text-white hover:bg-red-600 transition duration-300 rounded-md px-4 py-2"
              onClick={async () => {
                await fetch(`/api/collections/${initialData._id}`, { method: "DELETE" }); // ส่งคำขอลบคอลเลคชั่น
                toast.success("Collection deleted"); // แสดงข้อความแจ้งเตือนว่าลบแล้ว
                router.push("/collections"); // เปลี่ยนหน้าไปยัง /collections
              }}
            >
              ลบคอลแลคชั่น
            </Button>
          </div>
        ) : (
          <p className="text-heading4-bold text-gray-800 mb-6">เพิ่มคอลแลคชั่น</p> // แสดงฟอร์มเพิ่มคอลเลคชั่น
        )}
        <Separator className="bg-gray-200 mb-8" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ชื่อคอลแลคชั่น"
                      {...field}
                      onKeyDown={handleKeyPress} // ป้องกันการส่งฟอร์มเมื่อกด Enter
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" /> {/* แสดงข้อความแจ้งเตือน */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียด</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="รายละเอียดคอลแลคชั่น"
                      {...field}
                      rows={5}
                      onKeyDown={handleKeyPress} // ป้องกันการส่งฟอร์มเมื่อกด Enter
                      className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" /> {/* แสดงข้อความแจ้งเตือน */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>แนบรูปภาพ</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value} // ค่าปัจจุบันของรูปภาพ
                      onChange={(url) => field.onChange([...field.value, url])} // อัปเดตรูปภาพใหม่
                      onRemove={(url) =>
                        field.onChange([...field.value.filter((image) => image !== url)]) // ลบรูปภาพที่เลือกออก
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" /> {/* แสดงข้อความแจ้งเตือน */}
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2 px-6 py-3 rounded-md transition duration-300">
                <Check className="h-5 w-5" /> ยืนยัน
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/collections")}
                className="bg-gray-500 text-white hover:bg-gray-600 flex items-center gap-2 px-6 py-3 rounded-md transition duration-300"
              >
                <X className="h-5 w-5" /> ยกเลิก
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

// export ฟังก์ชัน CollectionForm เป็น default
export default CollectionForm;
