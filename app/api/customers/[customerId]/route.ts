import Customer from "@/lib/models/Customer"; // นำเข้าโมเดล Customer จากไดเรกทอรี models
import { connectToDB } from "@/lib/mongoDB"; // นำเข้า connectToDB สำหรับเชื่อมต่อฐานข้อมูล
import { auth } from "@clerk/nextjs"; // นำเข้า auth สำหรับตรวจสอบสิทธิ์
import { NextRequest, NextResponse } from "next/server"; // นำเข้า NextRequest และ NextResponse สำหรับจัดการคำขอและการตอบสนอง


// ฟังก์ชัน GET สำหรับดึงข้อมูลลูกค้าโดยใช้ customerId
export const GET = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
  try {
    // เชื่อมต่อฐานข้อมูล
    await connectToDB();

    // ค้นหาลูกค้าโดยใช้ customerId
    const customer = await Customer.findById(params.customerId);

    // ถ้าไม่พบลูกค้า ให้ตอบกลับด้วยสถานะ 404
    if (!customer) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบลูกค้า" }), { status: 404 });
    }

    // ถ้าพบลูกค้า ให้ตอบกลับด้วยข้อมูลลูกค้าและสถานะ 200
    return new NextResponse(JSON.stringify(customer), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[customerId_GET]", err);
    return new NextResponse("ข้อผิดพลาดภายในระบบ", { status: 500 });
  }
};


// ฟังก์ชัน POST สำหรับอัปเดตข้อมูลลูกค้า
export const POST = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
  try {
    // ตรวจสอบการยืนยันตัวตนของผู้ใช้
    const { userId } = auth();

    // ถ้าผู้ใช้ไม่ได้รับอนุญาต ให้ตอบกลับด้วยสถานะ 401
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อฐานข้อมูล
    await connectToDB();

    // ค้นหาลูกค้าโดยใช้ customerId
    const customer = await Customer.findById(params.customerId);

    // ถ้าไม่พบลูกค้า ให้ตอบกลับด้วยสถานะ 404
    if (!customer) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบลูกค้า" }), { status: 404 });
    }

    // ดึงข้อมูล title, description, media จากคำขอ
    const { title, description, media } = await req.json();

    // ตรวจสอบว่าข้อมูลเพียงพอสำหรับอัปเดตหรือไม่
    if (!title || !description || !media) {
      return new NextResponse("ข้อมูลไม่เพียงพอที่จะอัปเดตลูกค้า", { status: 400 });
    }

    // อัปเดตข้อมูลลูกค้า
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customer._id,
      { title, description, media },
      { new: true }
    );

    // บันทึกข้อมูลที่อัปเดตแล้ว
    await updatedCustomer.save();

    // ส่งข้อมูลลูกค้าที่อัปเดตแล้วกลับไปพร้อมสถานะ 200
    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[customerId_POST]", err);
    return new NextResponse(" ข้อผิดพลาดภายในระบบ ", { status: 500 });
  }
};

// ฟังก์ชัน DELETE สำหรับลบลูกค้าโดยใช้ customerId
export const DELETE = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
  try {
    // ตรวจสอบการยืนยันตัวตนของผู้ใช้
    const { userId } = auth();

    // ถ้าผู้ใช้ไม่ได้รับอนุญาต ให้ตอบกลับด้วยสถานะ 401
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อฐานข้อมูล
    await connectToDB();

    // ค้นหาลูกค้าโดยใช้ customerId
    const customer = await Customer.findById(params.customerId);

    // ถ้าไม่พบลูกค้า ให้ตอบกลับด้วยสถานะ 404
    if (!customer) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบลูกค้า" }), { status: 404 });
    }

    // ลบลูกค้าตาม customerId
    await Customer.findByIdAndDelete(customer._id);

    // ส่งข้อความกลับไปว่าได้ลบลูกค้าแล้วพร้อมสถานะ 200
    return new NextResponse(JSON.stringify({ message: "ลบลูกค้า" }), { status: 200 });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[customerId_DELETE]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// กำหนด dynamic เป็น "force-dynamic" เพื่อให้สามารถอัปเดตข้อมูลได้แบบไดนามิก
export const dynamic = "force-dynamic";