// กำหนด type สำหรับ CollectionType
type CollectionType = {
  _id: string; // รหัสของคอลเลคชั่น
  title: string; // ชื่อของคอลเลคชั่น
  description: string; // คำอธิบายของคอลเลคชั่น
  media: [string]; // รูปภาพหรือสื่อที่เกี่ยวข้องกับคอลเลคชั่น
  createAt: Date; // วันที่สร้างคอลเลคชั่น
  updateAt: Date; // วันที่แก้ไขคอลเลคชั่นล่าสุด
};

// กำหนด type สำหรับ ProductType
type ProductType = {
  _id: string; // รหัสของสินค้า
  title: string; // ชื่อของสินค้า
  description: string; // คำอธิบายของสินค้า
  media: [string]; // รูปภาพหรือสื่อที่เกี่ยวข้องกับสินค้า
  sum: number; // จำนวนสินค้าที่มีอยู่
  tags: [string]; // ป้ายหรือหมวดหมู่ที่เกี่ยวข้องกับสินค้า
  price: number; // ราคาของสินค้า
  createAt: Date; // วันที่สร้างสินค้า
  updateAt: Date; // วันที่แก้ไขสินค้าล่าสุด
};

// กำหนด type สำหรับ CustomerType
type CustomerType = {
  _id: string; // รหัสของลูกค้า
  title: string; // ชื่อของลูกค้า
  description: string; // คำอธิบายของลูกค้า
  media: [string]; // รูปภาพหรือสื่อที่เกี่ยวข้องกับลูกค้า
  createAt: Date; // วันที่สร้างข้อมูลลูกค้า
  updateAt: Date; // วันที่แก้ไขข้อมูลลูกค้าล่าสุด
};
