// สร้างคอมโพเนนต์ Loader สำหรับแสดงตัวโหลด (spinner)
const Loader = () => {
    return (
        // กำหนดการจัดวางให้อยู่กลางหน้าจอทั้งแนวตั้งและแนวนอนด้วย flexbox
        <div className="flex items-center justify-center h-screen">
            {/* แสดงวงกลมที่หมุนโดยใช้ animate-spin และมีเส้นขอบสีฟ้า */}
            <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
        </div>
    );
}

// ส่งออกคอมโพเนนต์ Loader สำหรับใช้งานในที่อื่น
export default Loader;
