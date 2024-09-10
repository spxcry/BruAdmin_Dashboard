"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import MultiText from "@/components/custom ui/MultiText";
import { Check, X } from "lucide-react"; // Import icons

// Define the form schema using zod
// Define the form schema using zod
const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  sum: z.coerce.number().min(0), // รับ sum ที่เป็น number และต้องไม่ติดลบ (อนุญาตให้เป็น 0)
  tags: z.array(z.string()),
  price: z.coerce.number().min(0.1),
});


interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      media: [],
      sum: 0,
      tags: [],
      price: 0.1,
    },
  });

  // Prevent Enter key from submitting form
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        router.push("/products");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-heading3-bold text-gray-800">
          {initialData ? "รายละเอียดสินค้า" : "เพิ่มสินค้า"}
        </p>
        {initialData && (
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={async () => {
              await fetch(`/api/products/${initialData._id}`, {
                method: "DELETE",
              });
              toast.success("Product deleted");
              router.push("/products");
            }}
          >
            ลบสินค้า
          </Button>
        )}
      </div>

      <Separator className="bg-gray-300 my-6" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Product Name */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">
                  ชื่อสินค้า
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="ชื่อสินค้า"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Product Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">
                  คีย์เวิด
                </FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="คีย์เวิดสินค้า"
                    value={field.value}
                    onChange={(tag) => field.onChange([...field.value, tag])}
                    onRemove={(tagToRemove) =>
                      field.onChange(
                        field.value.filter((tag) => tag !== tagToRemove)
                      )
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Product Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">
                  รายละเอียดสินค้า
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="รายละเอียดสินค้า"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Product Media */}
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">
                  แนบรูปภาพ
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange(
                        field.value.filter((image) => image !== url)
                      )
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    ราคา (฿)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                      placeholder="ราคาสินค้า"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Product Quantity */}
            <FormField
              control={form.control}
              name="sum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">
                    จำนวน
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                      placeholder="จำนวน"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              <Check className="h-5 w-5" /> ยืนยัน
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/products")}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 flex items-center gap-2"
            >
              <X className="h-5 w-5" /> ยกเลิก
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
