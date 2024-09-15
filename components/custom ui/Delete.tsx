"use client";
// บอกให้ตัวคอมโพเนนต์นี้ถูกใช้งานเป็น client-side component สำหรับการเรนเดอร์ฝั่งผู้ใช้

import { useState } from "react";
// นำเข้า useState hook จาก React เพื่อจัดการกับสถานะของคอมโพเนนต์
import { Trash } from "lucide-react";
// นำเข้าไอคอน Trash จากไลบรารี lucide-react เพื่อใช้ในปุ่ม

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// นำเข้าองค์ประกอบของ AlertDialog จาก components/ui/alert-dialog เพื่อสร้างไดอะล็อกสำหรับการลบ

import { Button } from "../ui/button";
// นำเข้าองค์ประกอบ Button จากโฟลเดอร์ ui เพื่อใช้สำหรับสร้างปุ่ม

import toast from "react-hot-toast";
// นำเข้า toast จาก react-hot-toast เพื่อแสดงการแจ้งเตือน (toast notifications)

interface DeleteProps {
  item: string;
  id: string;
}
// สร้าง interface DeleteProps เพื่อกำหนดโครงสร้างของ props ที่คอมโพเนนต์ Delete จะรับ (item และ id)

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const [loading, setLoading] = useState(false);
  // สร้างสถานะ loading เพื่อจัดการการแสดงผลขณะกำลังทำการลบ

  const onDelete = async () => {
    try {
      setLoading(true); // ตั้งค่า loading เป็น true เพื่อบอกว่ากำลังลบข้อมูล
      const itemType = item === "product" ? "products" : "collections";
      // ตรวจสอบว่า item เป็น "product" หรือไม่ หากใช่ให้ตั้งค่า itemType เป็น "products" มิฉะนั้นจะเป็น "collections"

      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });
      // ส่งคำขอแบบ DELETE ไปยัง API ตาม itemType และ id ที่กำหนด

      if (res.ok) {
        setLoading(false); // หากการลบสำเร็จ ให้ตั้งค่า loading กลับเป็น false
        window.location.href = `/${itemType}`;
        // เปลี่ยนหน้าไปยังหน้าของ itemType ที่ถูกลบ (products หรือ collections)
        toast.success(`${item} deleted`);
        // แสดงการแจ้งเตือนเมื่อการลบสำเร็จ
      }
    } catch (err) {
      console.log(err); // แสดงข้อผิดพลาดในคอนโซลหากเกิดข้อผิดพลาด
      toast.error("Something went wrong! Please try again.");
      // แสดงการแจ้งเตือนเมื่อเกิดข้อผิดพลาด
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-1 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
