import mongoose from "mongoose"; // นำเข้า mongoose สำหรับการเชื่อมต่อและจัดการกับ MongoDB

// กำหนด schema สำหรับ product ที่จะเก็บข้อมูล
const ProductSchema = new mongoose.Schema({
  title: String, // ฟิลด์ title เป็น string
  description: String, // ฟิลด์ description เป็น string
  media: [String], // ฟิลด์ media เป็น array ของ string
  sum: { 
    type: Number, // กำหนดเป็น Number เพื่อให้ใช้เป็นตัวเลข
    min: 0, // ป้องกันค่าติดลบและอนุญาตให้ sum เป็น 0 ได้
    required: true // ฟิลด์นี้ต้องมีค่า (แม้จะเป็น 0 ก็ตาม)
  },
  tags: [String], // ฟิลด์ tags เป็น array ของ string
  price: { 
    type: mongoose.Schema.Types.Decimal128, // ใช้ Decimal128 สำหรับค่าที่เป็นตัวเลขทศนิยม
    get: (v: mongoose.Schema.Types.Decimal128) => parseFloat(v.toString()) // แปลงค่า Decimal128 เป็น float เพื่อให้แสดงได้ถูกต้อง
  },
  createdAt: { type: Date, default: Date.now }, // ฟิลด์ createdAt เป็นวันที่ และตั้งค่าเริ่มต้นเป็นเวลาปัจจุบัน
  updatedAt: { type: Date, default: Date.now }, // ฟิลด์ updatedAt เป็นวันที่ และตั้งค่าเริ่มต้นเป็นเวลาปัจจุบัน
}, { toJSON: { getters: true } }); // ตั้งค่า schema ให้ใช้ getters เมื่อแปลงเป็น JSON

// ตรวจสอบว่าโมเดล Product มีอยู่แล้วหรือไม่ ถ้าไม่มีให้สร้างใหม่
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// ส่งออกโมเดล Product เพื่อใช้งานในส่วนอื่น ๆ
export default Product;
