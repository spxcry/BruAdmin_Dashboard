import { clsx, type ClassValue } from "clsx"; // นำเข้า clsx สำหรับการรวม class และ ClassValue สำหรับการกำหนดประเภทของ class
import { twMerge } from "tailwind-merge"; // นำเข้า twMerge สำหรับการรวมและจัดการกับ class ของ Tailwind CSS

// ฟังก์ชัน cn สำหรับการรวม class โดยใช้ clsx และ twMerge เพื่อให้จัดการกับ class ซ้ำซ้อนของ Tailwind CSS ได้ง่ายขึ้น
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // รวม class โดยใช้ clsx และ twMerge
}
