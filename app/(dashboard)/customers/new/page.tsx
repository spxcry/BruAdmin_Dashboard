// นำเข้า component CustomerForm จาก customers
import CustomerForm from "@/components/customers/CustomerForm";

// ฟังก์ชัน CreateCustomer สำหรับสร้างลูกค้าใหม่
const CreateCustomer = () => {
  return (
    // แสดง CustomerForm component ภายใน div
    <div>
      <CustomerForm />
    </div>
  );
};

// export ฟังก์ชัน CreateCustomer เป็น default
export default CreateCustomer;