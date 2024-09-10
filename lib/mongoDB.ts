import mongoose from "mongoose"; // นำเข้า mongoose สำหรับการเชื่อมต่อและจัดการกับ MongoDB

let isConnected: boolean = false; // ตัวแปรเพื่อเก็บสถานะการเชื่อมต่อกับฐานข้อมูล MongoDB

// ฟังก์ชัน connectToDB สำหรับเชื่อมต่อกับฐานข้อมูล MongoDB
export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true); // ตั้งค่า strictQuery ให้เป็น true เพื่อบังคับใช้การ query ที่เข้มงวด

  // ถ้าเชื่อมต่อกับฐานข้อมูลแล้ว ให้แสดงข้อความและไม่ต้องเชื่อมต่อใหม่
  if (isConnected) {
    console.log("MongoDB is already connected");
    return; // ออกจากฟังก์ชันทันทีถ้าเชื่อมต่ออยู่แล้ว
  }

  try {
    // เชื่อมต่อกับฐานข้อมูล MongoDB โดยใช้ URL จากตัวแปรสภาพแวดล้อม (environment variable)
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "bru-admin" // กำหนดชื่อฐานข้อมูลเป็น "bru-admin"
    });

    isConnected = true; // ตั้งค่าสถานะการเชื่อมต่อเป็น true เมื่อเชื่อมต่อสำเร็จ
    console.log("MongoDB is connected"); // แสดงข้อความว่าเชื่อมต่อสำเร็จ
  } catch (err) {
    console.log(err); // แสดงข้อผิดพลาดถ้ามีปัญหาในการเชื่อมต่อ
  }
}