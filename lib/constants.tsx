import {
  LayoutDashboard, // นำเข้าไอคอน LayoutDashboard จาก lucide-react
  Shapes, // นำเข้าไอคอน Shapes จาก lucide-react
  ShoppingBag, // นำเข้าไอคอน ShoppingBag จาก lucide-react
  Tag, // นำเข้าไอคอน Tag จาก lucide-react
  UsersRound, // นำเข้าไอคอน UsersRound จาก lucide-react
} from "lucide-react";

// กำหนดลิงก์การนำทาง (navLinks) สำหรับการนำทางในแอปพลิเคชัน
export const navLinks = [
  {
    url: "/", // เส้นทาง URL สำหรับหน้า Dashboard
    icon: <LayoutDashboard />, // แสดงไอคอน LayoutDashboard
    label: "Dashboard", // ป้ายข้อความ "Dashboard"
  },
  {
    url: "/collections", // เส้นทาง URL สำหรับหน้า Collections
    icon: <Shapes />, // แสดงไอคอน Shapes
    label: "Collections", // ป้ายข้อความ "Collections"
  },
  {
    url: "/products", // เส้นทาง URL สำหรับหน้า Products
    icon: <Tag />, // แสดงไอคอน Tag
    label: "Products", // ป้ายข้อความ "Products"
  },
  {
    url: "/customers", // เส้นทาง URL สำหรับหน้า Customers
    icon: <UsersRound />, // แสดงไอคอน UsersRound
    label: "Customers", // ป้ายข้อความ "Customers"
  },
];
