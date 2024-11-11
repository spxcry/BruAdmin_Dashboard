// นำเข้า model Collection จาก "@/lib/models/Collection"
import Collection from "@/lib/models/Collection";
// นำเข้าฟังก์ชัน connectToDB จาก "@/lib/mongoDB" เพื่อเชื่อมต่อกับฐานข้อมูล
import { connectToDB } from "@/lib/mongoDB";
// นำเข้า auth จาก "@clerk/nextjs" สำหรับตรวจสอบการยืนยันตัวตน
import { auth } from "@clerk/nextjs";
// นำเข้า NextRequest และ NextResponse จาก "next/server" สำหรับจัดการคำขอและการตอบสนอง
import { NextRequest, NextResponse } from "next/server";


// ฟังก์ชัน GET สำหรับดึงข้อมูลคอลเลคชั่นโดยใช้ collectionId
export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ค้นหาคอลเลคชั่นโดยใช้ collectionId
    const collection = await Collection.findById(params.collectionId);

    // ถ้าไม่พบคอลเลคชั่น ให้ตอบกลับด้วยสถานะ 404
    if (!collection) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบคอลเล็กชัน" }), { status: 404 });
    }

    // ถ้าพบคอลเลคชั่น ให้ตอบกลับด้วยข้อมูลคอลเลคชั่นและสถานะ 200
    return new NextResponse(JSON.stringify(collection), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    // ถ้ามีข้อผิดพลาด ให้แสดงใน console และตอบกลับด้วยสถานะ 500
    console.log("[collectionId_GET]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};


// ฟังก์ชัน POST สำหรับอัปเดตข้อมูลคอลเลคชั่น
export const POST = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
    // ตรวจสอบว่าผู้ใช้ได้ล็อกอินหรือไม่
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ค้นหาคอลเลคชั่นโดยใช้ collectionId
    const collection = await Collection.findById(params.collectionId);

    // ถ้าไม่พบคอลเลคชั่น ให้ตอบกลับด้วยสถานะ 404
    if (!collection) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบคอลเล็กชัน" }), { status: 404 });
    }

    // ดึงข้อมูล title, description, media จาก body ของคำขอ
    const { title, description, media } = await req.json();

    // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบถ้วนหรือไม่
    if (!title || !description || !media) {
      return new NextResponse("ข้อมูลไม่เพียงพอที่จะอัปเดตคอลเลกชัน", { status: 400 });
    }

    // อัปเดตข้อมูลคอลเลคชั่น
    const updatedCollection = await Collection.findByIdAndUpdate(
      collection._id,
      { title, description, media },
      { new: true }
    );

    // บันทึกข้อมูลที่อัปเดตแล้ว
    await updatedCollection.save();

    // ตอบกลับด้วยข้อมูลคอลเลคชั่นที่อัปเดตแล้วและสถานะ 200
    return NextResponse.json(updatedCollection, { status: 200 });
  } catch (err) {
    // ถ้ามีข้อผิดพลาด ให้แสดงใน console และตอบกลับด้วยสถานะ 500
    console.log("[collectionId_POST]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};



// ฟังก์ชัน DELETE สำหรับลบคอลเลคชั่น
export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
    // ตรวจสอบว่าผู้ใช้ได้ล็อกอินหรือไม่
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อกับฐานข้อมูล
    await connectToDB();

    // ค้นหาคอลเลคชั่นโดยใช้ collectionId
    const collection = await Collection.findById(params.collectionId);

    // ถ้าไม่พบคอลเลคชั่น ให้ตอบกลับด้วยสถานะ 404
    if (!collection) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบคอลแลคชัน" }), { status: 404 });
    }

    // ลบคอลเลคชั่น
    await Collection.findByIdAndDelete(collection._id);

    // ตอบกลับด้วยข้อความว่าคอลเลคชั่นถูกลบแล้วและสถานะ 200
    return new NextResponse(JSON.stringify({ message: "ลบคอลเล็กชันแล้ว" }), { status: 200 });
  } catch (err) {
    // ถ้ามีข้อผิดพลาด ให้แสดงใน console และตอบกลับด้วยสถานะ 500
    console.log("[collectionId_DELETE]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};

// กำหนด dynamic เป็น "force-dynamic" เพื่อให้รองรับการเปลี่ยนแปลงของข้อมูล
export const dynamic = "force-dynamic";
