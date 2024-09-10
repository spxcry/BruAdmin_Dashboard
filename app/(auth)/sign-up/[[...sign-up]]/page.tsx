// นำเข้า component SignUp จาก @clerk/nextjs
import { SignUp } from "@clerk/nextjs";


// ฟังก์ชัน SignUpPage ที่ใช้แสดงหน้า Sign Up
export default function SignUpPage() {
  return (
    // กำหนดความสูงของหน้าเป็น h-screen และจัด layout ให้ component SignUp อยู่กลางจอ
    <div className="h-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
}
