"use client";
import { useState } from "react";

export default function ProductList({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts);
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        priceSmall: "",
        priceMedium: "",
        priceLarge: "",
        categoryId: ""
    });

    const [categories, setCategories] = useState([]);

    // Fetch categories when opening modal
    const handleAddClick = async () => {
        setIsAdding(!isAdding);
        if (!isAdding && categories.length === 0) {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
            if (data.length > 0) setFormData(prev => ({ ...prev, categoryId: data[0].id }));
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
        // Call API to delete (Not implemented yet, but UI is here)
        alert("سيتم تفعيل الحذف قريباً");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const prices = {
                small: Number(formData.priceSmall),
                medium: Number(formData.priceMedium),
                large: Number(formData.priceLarge)
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    image: formData.image,
                    categoryId: formData.categoryId,
                    prices: prices,
                    price: prices.medium // fallback for simple listing
                })
            });

            if (res.ok) {
                alert("تم إضافة المنتج بنجاح!");
                setIsAdding(false);
                // Refresh list or append optimistically (reload for now)
                window.location.reload();
            } else {
                alert("حدث خطأ أثناء الإضافة");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <button onClick={handleAddClick} style={{ padding: "10px 20px", background: "#27ae60", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontFamily: "inherit" }}>
                    {isAdding ? "إلغاء" : "+ إضافة منتج جديد"}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} style={{ background: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                    <input type="text" placeholder="اسم المنتج" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required style={{ padding: "8px", fontFamily: "inherit" }} />
                    <textarea placeholder="الوصف" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ padding: "8px", fontFamily: "inherit" }} />
                    {/* Image Upload */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label style={{ fontSize: "0.9rem" }}>صورة المنتج</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                const data = new FormData();
                                data.set("file", file);

                                const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: data
                                });

                                if (res.ok) {
                                    const json = await res.json();
                                    setFormData({ ...formData, image: json.filePath });
                                } else {
                                    alert("فشل رفع الصورة");
                                }
                            }}
                            style={{ padding: "8px", fontFamily: "inherit" }}
                        />
                        {formData.image && <p style={{ fontSize: "0.8rem", color: "green" }}>تم رفع الصورة بنجاح</p>}
                        {formData.image && <img src={formData.image} alt="Preview" width="100" style={{ borderRadius: "4px" }} />}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <input type="number" placeholder="سعر صغير" value={formData.priceSmall} onChange={e => setFormData({ ...formData, priceSmall: e.target.value })} required style={{ padding: "8px", fontFamily: "inherit" }} />
                        <input type="number" placeholder="سعر وسط" value={formData.priceMedium} onChange={e => setFormData({ ...formData, priceMedium: e.target.value })} required style={{ padding: "8px", fontFamily: "inherit" }} />
                        <input type="number" placeholder="سعر كبير" value={formData.priceLarge} onChange={e => setFormData({ ...formData, priceLarge: e.target.value })} required style={{ padding: "8px", fontFamily: "inherit" }} />
                    </div>

                    <select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} style={{ padding: "8px", fontFamily: "inherit" }}>
                        <option value="" disabled>اختر القسم</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <button type="submit" style={{ padding: "10px", background: "#2980b9", color: "white", border: "none", cursor: "pointer", fontFamily: "inherit" }}>حفظ المنتج</button>
                </form>
            )}

            <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "8px", overflow: "hidden" }}>
                <thead>
                    <tr style={{ background: "#eee", textAlign: "right" }}>
                        <th style={{ padding: "12px" }}>الصورة</th>
                        <th style={{ padding: "12px" }}>الاسم</th>
                        <th style={{ padding: "12px" }}>الوصف</th>
                        <th style={{ padding: "12px" }}>إجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "12px" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.image} alt={p.title} width="50" style={{ borderRadius: "4px" }} />
                            </td>
                            <td style={{ padding: "12px" }}>{p.title}</td>
                            <td style={{ padding: "12px", maxWidth: "300px" }}>{p.description}</td>
                            <td style={{ padding: "12px" }}>
                                <button onClick={() => handleDelete(p.id)} style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>حذف</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
