import { useState, useRef } from "react";
import { PlusSquare, Upload, X, ImageOff, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { addProduct } from "../config/service.js";

const CATEGORIES = [
    "Electronics",
    "Clothing",
    "Footwear",
    "Home & Living",
    "Beauty",
    "Sports",
    "Books",
    "Toys",
    "Automotive",
    "Other",
];

const INITIAL_FORM = {
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    discount: "",
    featured: false,
};

export default function AddProduct() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileRef = useRef();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImage = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleImage(file);
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.price || !form.category) {
            toast.error("Please fill in all required fields");
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            formData.append(key, val);
        });
        if (image) formData.append("image", image);

        try {
            setLoading(true);
            await addProduct(formData);
            toast.success("Product added successfully!");
            setSuccess(true);
            setForm(INITIAL_FORM);
            removeImage();
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to add product";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="page-header">
                <h2>
                    <PlusSquare className="header-icon" size={22} />
                    Add New Product
                </h2>
                <p>Fill in the details below to list a new product in your store</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 340px",
                        gap: 20,
                        alignItems: "start",
                    }}
                >
                    {/* Left: Form Fields */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* Basic Info */}
                        <div className="glass-card" style={{ padding: 26 }}>
                            <p className="section-title">Basic Information</p>

                            <div className="input-group">
                                <label>
                                    Product Title <span style={{ color: "var(--red-primary)" }}>*</span>
                                </label>
                                <input
                                    className="input-field"
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Premium Wireless Headphones"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Description</label>
                                <textarea
                                    className="input-field"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe your product — features, specifications, use cases…"
                                    rows={4}
                                />
                            </div>

                            <div className="form-grid">
                                <div className="input-group">
                                    <label>
                                        Brand
                                    </label>
                                    <input
                                        className="input-field"
                                        type="text"
                                        name="brand"
                                        value={form.brand}
                                        onChange={handleChange}
                                        placeholder="e.g. Sony, Nike, Apple"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>
                                        Category <span style={{ color: "var(--red-primary)" }}>*</span>
                                    </label>
                                    <select
                                        className="input-field"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select category</option>
                                        {CATEGORIES.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="glass-card" style={{ padding: 26 }}>
                            <p className="section-title">Pricing & Inventory</p>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>
                                        Price (USD) <span style={{ color: "var(--red-primary)" }}>*</span>
                                    </label>
                                    <input
                                        className="input-field"
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Discount (%)</label>
                                    <input
                                        className="input-field"
                                        type="number"
                                        name="discount"
                                        value={form.discount}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Stock Quantity</label>
                                    <input
                                        className="input-field"
                                        type="number"
                                        name="stock"
                                        value={form.stock}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="checkbox-group"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={form.featured}
                                            onChange={handleChange}
                                        />
                                        <span
                                            style={{
                                                fontSize: 14,
                                                color: form.featured
                                                    ? "var(--red-primary)"
                                                    : "var(--text-secondary)",
                                                fontWeight: 600,
                                                letterSpacing: "0.03em",
                                                fontFamily: "'Rajdhani', sans-serif",
                                                transition: "color 0.2s",
                                            }}
                                        >
                                            ⭐ Mark as Featured
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Price preview */}
                            {form.price && (
                                <div
                                    style={{
                                        marginTop: 12,
                                        padding: "12px 16px",
                                        background: "rgba(220,38,38,0.06)",
                                        borderRadius: 10,
                                        border: "1px solid rgba(220,38,38,0.15)",
                                        display: "flex",
                                        gap: 20,
                                    }}
                                >
                                    <div>
                                        <p
                                            style={{
                                                fontSize: 11,
                                                color: "var(--text-muted)",
                                                letterSpacing: "0.1em",
                                            }}
                                        >
                                            ORIGINAL
                                        </p>
                                        <p
                                            style={{
                                                fontFamily: "'Orbitron', monospace",
                                                color: "#fff",
                                                fontSize: 16,
                                            }}
                                        >
                                            ${parseFloat(form.price || 0).toFixed(2)}
                                        </p>
                                    </div>
                                    {form.discount > 0 && (
                                        <div>
                                            <p
                                                style={{
                                                    fontSize: 11,
                                                    color: "var(--text-muted)",
                                                    letterSpacing: "0.1em",
                                                }}
                                            >
                                                AFTER DISCOUNT
                                            </p>
                                            <p
                                                style={{
                                                    fontFamily: "'Orbitron', monospace",
                                                    color: "var(--red-primary)",
                                                    fontSize: 16,
                                                    textShadow: "0 0 10px var(--red-glow)",
                                                }}
                                            >
                                                $
                                                {(
                                                    parseFloat(form.price) *
                                                    (1 - form.discount / 100)
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Image Upload + Submit */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {/* Image Upload */}
                        <div className="glass-card" style={{ padding: 24 }}>
                            <p className="section-title">
                                <Upload
                                    size={13}
                                    style={{ display: "inline", marginRight: 8 }}
                                />
                                Product Image
                            </p>

                            {imagePreview ? (
                                <div style={{ position: "relative" }}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="preview-img"
                                        style={{ marginBottom: 12 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        style={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            background: "rgba(0,0,0,0.7)",
                                            border: "1px solid var(--red-border)",
                                            borderRadius: 6,
                                            color: "#fff",
                                            cursor: "pointer",
                                            padding: 4,
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            color: "var(--text-muted)",
                                            textAlign: "center",
                                        }}
                                    >
                                        {image?.name}
                                    </p>
                                </div>
                            ) : (
                                <div
                                    className={`upload-zone ${dragOver ? "drag-over" : ""}`}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragOver(true);
                                    }}
                                    onDragLeave={() => setDragOver(false)}
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <div className="upload-icon">
                                        <ImageOff size={36} />
                                    </div>
                                    <p>
                                        <span>Click to upload</span> or drag & drop
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            marginTop: 6,
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        PNG, JPG, WEBP up to 10MB
                                    </p>
                                </div>
                            )}
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => handleImage(e.target.files[0])}
                            />
                            {!imagePreview && (
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    style={{ width: "100%", marginTop: 12 }}
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <Upload size={14} />
                                    Browse Files
                                </button>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="glass-card" style={{ padding: 24 }}>
                            <p className="section-title">Publish</p>
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--text-muted)",
                                    marginBottom: 16,
                                    lineHeight: 1.6,
                                }}
                            >
                                Review all details before publishing. The product will be
                                visible to all customers.
                            </p>

                            {success && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "10px 14px",
                                        background: "rgba(34,197,94,0.1)",
                                        border: "1px solid rgba(34,197,94,0.2)",
                                        borderRadius: 10,
                                        marginBottom: 14,
                                        color: "#4ade80",
                                        fontSize: 13,
                                        fontWeight: 600,
                                    }}
                                >
                                    <CheckCircle size={16} />
                                    Product published successfully!
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`btn btn-primary ${loading ? "btn-loading" : ""}`}
                                style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div
                                            className="spinner"
                                            style={{ width: 16, height: 16, borderWidth: 2 }}
                                        />
                                        Publishing…
                                    </>
                                ) : (
                                    <>
                                        <PlusSquare size={15} />
                                        Add Product
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="btn btn-ghost"
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    marginTop: 10,
                                }}
                                onClick={() => {
                                    setForm(INITIAL_FORM);
                                    removeImage();
                                }}
                            >
                                Reset Form
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}