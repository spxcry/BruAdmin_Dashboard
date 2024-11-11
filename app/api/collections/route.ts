import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import { auth } from "@clerk/nextjs";

// POST API สำหรับการสร้างคอลเลคชั่นใหม่
export const POST = async (req: NextRequest) => {
  try {
    // ตรวจสอบการยืนยันตัวตนของผู้ใช้
    const { userId } = auth();

    // ถ้าผู้ใช้ไม่ได้ล็อกอิน ให้ส่งสถานะ 401 (ไม่ได้รับอนุญาต)
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ดึงข้อมูลจาก body ของคำขอ
    const { title, description, media } = await req.json();

    // ตรวจสอบว่ามีข้อมูล title, description, และ media ครบถ้วนหรือไม่
    if (!title || !description || !media) {
      return new NextResponse("ไม่มีข้อมูลที่จะสร้างคอลเลกชัน", { status: 400 });
    }

    // สร้างคอลเลคชั่นใหม่ในฐานข้อมูล
    const newCollection = await Collection.create({
      title,
      description,
      media,
    });

    // ส่งข้อมูลคอลเลคชั่นที่สร้างใหม่กลับไปพร้อมสถานะ 200
    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    // แสดง error ในกรณีที่เกิดข้อผิดพลาด
    console.log("[collections_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};



// GET API สำหรับการดึงข้อมูลคอลเลคชั่น (เพิ่มการแบ่งหน้า)
export const GET = async (req: NextRequest) => {
  try {
    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ดึงค่า searchParams จาก URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1"); // กำหนดหน้าที่จะแสดง
    const limit = parseInt(searchParams.get("limit") || "10"); // กำหนดจำนวนรายการต่อหน้า
    const skip = (page - 1) * limit; // คำนวณจำนวนรายการที่จะข้าม

    // ค้นหาคอลเลคชั่นในฐานข้อมูลพร้อมการจัดเรียงตามวันที่สร้าง และทำการแบ่งหน้า
    const collections = await Collection.find()
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);

    // คำนวณจำนวนคอลเลคชั่นทั้งหมด
    const totalCollections = await Collection.countDocuments();
    const totalPages = Math.ceil(totalCollections / limit); // คำนวณจำนวนหน้าทั้งหมด

    // ส่งค่ากลับไปให้ client รวมถึงข้อมูลคอลเลคชั่น จำนวนทั้งหมด และจำนวนหน้าทั้งหมด
    return NextResponse.json({ collections, totalCollections, totalPages }, { status: 200 });
  } catch (err) {
    // แสดง error ในกรณีที่เกิดข้อผิดพลาด
    console.log("[collections_GET]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};

// กำหนด dynamic เป็น "force-dynamic" เพื่อให้รองรับการเปลี่ยนแปลงของข้อมูล
export const dynamic = "force-dynamic";
