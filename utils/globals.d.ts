export {} // ป้องกันการประกาศตัวแปรหรือฟังก์ชันซ้ำในโมดูลอื่น ๆ

// กำหนดประเภท Roles สำหรับการกำหนดบทบาทของผู้ใช้
export type Roles = 'admin' | 'moderator'

// ขยาย global interface เพื่อเพิ่มประเภท CustomJwtSessionClaims สำหรับการจัดการ session JWT
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: 'admin' | 'moderator' // กำหนด role เป็นตัวเลือกที่สามารถเป็น admin หรือ moderator
    }
  }
}
