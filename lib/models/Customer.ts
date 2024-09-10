import mongoose from 'mongoose'; // นำเข้า mongoose สำหรับการเชื่อมต่อและจัดการกับ MongoDB

// กำหนด schema สำหรับ customer ที่จะเก็บข้อมูล
const CustomerSchema = new mongoose.Schema({
  title: { type: String, required: true }, // กำหนดฟิลด์ title ที่เป็น string และบังคับให้กรอก
  description: { type: String, required: true }, // กำหนดฟิลด์ description ที่เป็น string และบังคับให้กรอก
  media: { type: [String], required: true }, // กำหนดฟิลด์ media ที่เป็น array ของ string และบังคับให้กรอก
  createdAt: { type: Date, default: Date.now }, // กำหนดฟิลด์ createdAt เป็นวันที่ และตั้งค่าเริ่มต้นเป็นเวลาปัจจุบัน
  updatedAt: { type: Date, default: Date.now }, // กำหนดฟิลด์ updatedAt เป็นวันที่ และตั้งค่าเริ่มต้นเป็นเวลาปัจจุบัน
}, { toJSON: { getters: true } }); // ตั้งค่า schema ให้ใช้ getters เมื่อแปลงเป็น JSON

// ตรวจสอบว่าโมเดล Customer มีอยู่แล้วหรือไม่ ถ้าไม่มีให้สร้างใหม่
const Customer = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

// ส่งออกโมเดล Customer เพื่อใช้งานในส่วนอื่น ๆ
export default Customer;
