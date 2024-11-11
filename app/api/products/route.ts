import { NextRequest, NextResponse } from "next/server"; // นำเข้า NextRequest และ NextResponse สำหรับจัดการคำขอและการตอบสนอง
import { connectToDB } from "@/lib/mongoDB"; // นำเข้า connectToDB สำหรับเชื่อมต่อฐานข้อมูล
import Product from "@/lib/models/Product"; // นำเข้าโมเดล Product จากไดเรกทอรี models
import { auth } from "@clerk/nextjs"; // นำเข้า auth สำหรับตรวจสอบสิทธิ์

// ฟังก์ชัน POST สำหรับการสร้างสินค้าใหม่
export const POST = async (req: NextRequest) => {
  try {
    // ตรวจสอบการยืนยันตัวตนของผู้ใช้
    const { userId } = auth();

    // ถ้าผู้ใช้ไม่ได้รับอนุญาต ให้ส่งสถานะ 401 (ไม่ได้รับอนุญาต)
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ดึงข้อมูล title, description, media, sum, tags, price จาก body ของคำขอ
    const { title, description, media, sum, tags, price } = await req.json();

    // ใช้ sum === undefined แทนการเช็ค !sum เพื่อป้องกันการปฏิเสธค่า 0
    if (!title || !description || !media || sum === undefined || !price) {
      return new NextResponse("ข้อมูลไม่เพียงพอในการสร้างสินค้า", { status: 400 });
    }

    // สร้างสินค้าขึ้นในฐานข้อมูล
    const newProduct = await Product.create({
      title,
      description,
      media,
      sum,
      tags,
      price,
    });

    // ส่งข้อมูลสินค้าที่สร้างใหม่กลับไปพร้อมสถานะ 200
    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[products_POST]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// GET API สำหรับการดึงข้อมูลสินค้า (เพิ่มการแบ่งหน้า)
export const GET = async (req: NextRequest) => {
  try {
    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ดึงค่า searchParams จาก URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1"); // กำหนดหน้าที่จะแสดง
    const limit = parseInt(searchParams.get("limit") || "10"); // กำหนดจำนวนรายการต่อหน้า
    const skip = (page - 1) * limit; // คำนวณจำนวนรายการที่จะข้าม

    // ค้นหาสินค้าในฐานข้อมูลพร้อมการจัดเรียงตามวันที่สร้าง และทำการแบ่งหน้า
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);

    // คำนวณจำนวนสินค้าทั้งหมด
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit); // คำนวณจำนวนหน้าทั้งหมด

    // ส่งค่ากลับไปให้ client รวมถึงข้อมูลสินค้า และจำนวนหน้าทั้งหมด
    return NextResponse.json({ products, totalPages }, { status: 200 });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[products_GET]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// กำหนด dynamic เป็น "force-dynamic" เพื่อให้รองรับการเปลี่ยนแปลงของข้อมูล
export const dynamic = "force-dynamic";