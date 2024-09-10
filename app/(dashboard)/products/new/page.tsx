// นำเข้า component ProductForm จาก products
import ProductForm from "@/components/products/ProductForm";

// ฟังก์ชัน CreateProduct สำหรับสร้างสินค้าใหม่
const CreateProduct = () => {
  return (
    // แสดง ProductForm component
    <ProductForm />
  );
};

// export ฟังก์ชัน CreateProduct เป็น default
export default CreateProduct;
