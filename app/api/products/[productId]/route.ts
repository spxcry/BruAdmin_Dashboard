import Product from "@/lib/models/Product"; // นำเข้าโมเดล Product จากไดเรกทอรี models
import { connectToDB } from "@/lib/mongoDB"; // นำเข้า connectToDB สำหรับเชื่อมต่อฐานข้อมูล
import { auth } from "@clerk/nextjs"; // นำเข้า auth สำหรับตรวจสอบสิทธิ์
import { NextRequest, NextResponse } from "next/server"; // นำเข้า NextRequest และ NextResponse สำหรับจัดการคำขอและการตอบสนอง

// ฟังก์ชัน GET สำหรับดึงข้อมูลสินค้าตาม productId
export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    // เชื่อมต่อฐานข้อมูล
    await connectToDB();

    // ค้นหาสินค้าโดยใช้ productId
    const product = await Product.findById(params.productId);

    // ถ้าไม่พบสินค้า ให้ตอบกลับด้วยสถานะ 404
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบสินค้า" }), { status: 404 });
    }

    // ถ้าพบสินค้า ให้ตอบกลับด้วยข้อมูลสินค้าและสถานะ 200
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[productId_GET]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// ฟังก์ชัน POST สำหรับอัปเดตข้อมูลสินค้า
export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    // ตรวจสอบการยืนยันตัวตนของผู้ใช้
    const { userId } = auth();

    // ถ้าผู้ใช้ไม่ได้รับอนุญาต ให้ส่งสถานะ 401 (ไม่ได้รับอนุญาต)
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อฐานข้อมูล
    await connectToDB();

    // ค้นหาสินค้าโดยใช้ productId
    const product = await Product.findById(params.productId);

    // ถ้าไม่พบสินค้า ให้ตอบกลับด้วยสถานะ 404
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบสินค้า" }), { status: 404 });
    }

    // แก้ไขการตรวจสอบ sum เพื่อให้รองรับ sum ที่เป็น 0
    const { title, description, media, sum, tags, price } = await req.json();

    // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบถ้วนหรือไม่
    if (!title || !description || !media || sum === undefined || !price) {
      return new NextResponse("ข้อมูลไม่เพียงพอที่จะอัปเดตสินค้า", { status: 400 });
    }

    // อัปเดตข้อมูลสินค้า
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { title, description, media, sum, tags, price },
      { new: true }
    );

    // บันทึกข้อมูลที่อัปเดตแล้ว
    await updatedProduct.save();

    // ส่งข้อมูลสินค้าที่อัปเดตแล้วกลับไปพร้อมสถานะ 200
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[productId_POST]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// ฟังก์ชัน DELETE สำหรับลบสินค้าตาม productId
export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    // ตรวจสอบการยืนยันตัวตนของผู้ใช้
    const { userId } = auth();

    // ถ้าผู้ใช้ไม่ได้รับอนุญาต ให้ส่งสถานะ 401 (ไม่ได้รับอนุญาต)
    if (!userId) {
      return new NextResponse("ไม่ได้รับอนุญาต", { status: 401 });
    }

    // เชื่อมต่อฐานข้อมูล
    await connectToDB();

    // ค้นหาสินค้าโดยใช้ productId
    const product = await Product.findById(params.productId);

    // ถ้าไม่พบสินค้า ให้ตอบกลับด้วยสถานะ 404
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "ไม่พบสินค้า" }), { status: 404 });
    }

    // ลบสินค้าตาม productId
    await Product.findByIdAndDelete(product._id);

    // ส่งข้อความกลับไปว่าได้ลบสินค้าแล้วพร้อมสถานะ 200
    return new NextResponse(JSON.stringify({ message: "ลบสินค้า" }), { status: 200 });
  } catch (err) {
    // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
    console.log("[productId_DELETE]", err);
    return new NextResponse("ข้อผิดพลาดในระบบ", { status: 500 });
  }
};

// กำหนด dynamic เป็น "force-dynamic" เพื่อให้สามารถอัปเดตข้อมูลได้แบบไดนามิก
export const dynamic = "force-dynamic";
