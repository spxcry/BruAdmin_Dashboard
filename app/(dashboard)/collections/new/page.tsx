// นำเข้า component CollectionForm จาก collections
import CollectionForm from "@/components/collections/CollectionForm";

// ฟังก์ชัน CreateCollection สำหรับสร้าง collection ใหม่
const CreateCollection = () => {
  return (
    // แสดง CollectionForm component
    <CollectionForm />
  );
};

// export ฟังก์ชัน CreateCollection เป็น default
export default CreateCollection;