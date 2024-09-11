import { SignIn } from "@clerk/nextjs";


// ฟังก์ชัน SignInPage ที่ใช้แสดงหน้า Sign In
export default function SignInPage() {
  return (
    // กำหนดความสูงของหน้าเป็น h-screen และจัด layout ให้ component SignIn อยู่กลางจอ
    <div className="h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}