import { NextRequest, NextResponse } from "next/server"; // นำเข้า NextRequest และ NextResponse สำหรับจัดการคำขอและการตอบสนอง
import { connectToDB } from "@/lib/mongoDB"; // นำเข้า connectToDB สำหรับเชื่อมต่อฐานข้อมูล
import Customer from "@/lib/models/Customer"; // นำเข้าโมเดล Customer จากไดเรกทอรี models
import { auth } from "@clerk/nextjs"; // นำเข้า auth สำหรับตรวจสอบสิทธิ์

// ฟังก์ชัน POST สำหรับการสร้างลูกค้าใหม่
export const POST = async (req: NextRequest) => {
  try {
    // ตรวจสอบการยืนยันตัวตนของผู้ใช้
    const { userId } = auth();

    // ถ้าผู้ใช้ไม่ได้รับอนุญาต ให้ส่งสถานะ 401 (Unauthorized)
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ดึงข้อมูล title, description, media จาก body ของคำขอ
    const { title, description, media } = await req.json();

    // ตรวจสอบว่ามีข้อมูล title, description, และ media ครบถ้วนหรือไม่
    if (!title || !description || !media) {
      return new NextResponse("ข้อมูลไม่เพียงพอในการสร้างลูกค้า", {
        status: 400,
      });
    }

    // สร้างลูกค้าใหม่ในฐานข้อมูล
    const newCustomer = await Customer.create({
      title,
      description,
      media,
    });

    // ส่งข้อมูลลูกค้าที่สร้างใหม่กลับไปพร้อมสถานะ 200
    return NextResponse.json(newCustomer, { status: 200 });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[customer_POST]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// ฟังก์ชัน GET สำหรับการดึงข้อมูลลูกค้า (เพิ่มการแบ่งหน้า)
export const GET = async (req: NextRequest) => {
  try {
    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ดึงค่า searchParams จาก URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1"); // กำหนดหน้าที่จะแสดง
    const limit = parseInt(searchParams.get("limit") || "10"); // กำหนดจำนวนรายการต่อหน้า
    const skip = (page - 1) * limit; // คำนวณจำนวนรายการที่จะข้าม

    // ค้นหาลูกค้าในฐานข้อมูลพร้อมการจัดเรียงตามวันที่สร้าง และทำการแบ่งหน้า
    const customers = await Customer.find()
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);

    // คำนวณจำนวนลูกค้าทั้งหมด
    const totalCustomers = await Customer.countDocuments();
    const totalPages = Math.ceil(totalCustomers / limit); // คำนวณจำนวนหน้าทั้งหมด

    // ส่งค่ากลับไปให้ client รวมถึงข้อมูลลูกค้า จำนวนทั้งหมด และจำนวนหน้าทั้งหมด
    return NextResponse.json(
      { customers, totalCustomers, totalPages },
      { status: 200 }
    );
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[customer_GET]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// กำหนด dynamic เป็น "force-dynamic" เพื่อให้รองรับการเปลี่ยนแปลงของข้อมูล
export const dynamic = "force-dynamic";
