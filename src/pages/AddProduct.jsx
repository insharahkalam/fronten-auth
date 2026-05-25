import { useState, useRef } from "react";
import { PlusSquare, Upload, X, ImageOff, CheckCircle, Package, Tag, DollarSign, Layers, Star, BarChart2, Eye, ChevronRight, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Electronics", "Mobile & Accessories", "Fashion (Men)", "Fashion (Women)", "Footwear", "Home & Living", "Beauty & Personal Care", "Health & Wellness", "Sports & Fitness", "Books & Stationery", "Kids & Toys", "Grocery", "Automotive", "Furniture", "Kitchen & Dining", "Other"];

const INITIAL = { title: "", description: "", price: "", category: "", brand: "", stock: "", discount: "", featured: false, };

function Label({ children, required }) {
  return (
    <label className="flex items-center gap-1 text-[10.5px] font-semibold tracking-[0.1em] uppercase text-white/40 mb-2">
      {children}
      {required && <span className="text-red-500 text-xs">*</span>}
    </label>
  );
}

const inputBase = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 " +
  "text-[13.5px] text-white placeholder:text-white/20 font-medium outline-none " +
  "transition-all duration-200 focus:border-red-600/50 focus:bg-white/[0.07] " +
  "focus:ring-2 focus:ring-red-600/10 appearance-none box-border";

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden
      backdrop-blur-md transition-all duration-300 hover:border-white/[0.12]
      hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)] ${className}`}>
      {children}
    </div>
  );
}

function CardHead({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
      <span className="w-[26px] h-[26px] rounded-lg bg-red-950/60 border border-red-900/50
        flex items-center justify-center text-red-500 shrink-0">
        <Icon size={13} />
      </span>
      <span className="text-[11px] font-semibold tracking-[0.09em] uppercase text-white/60">{title}</span>
      {sub && <span className="ml-auto text-[10px] text-white/25 font-medium">{sub}</span>}
    </div>
  );
}

export default function AddProduct() {
  const [form, setForm] = useState(INITIAL);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const loadImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select a valid image file"); return; }
    setImage(file);
    const r = new FileReader();
    r.onloadend = () => setPreview(r.result);
    r.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null); setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category) {
      toast.error("Please fill in all required fields"); return;
    }
    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("brand", form.brand);
    fd.append("stock", form.stock);
    fd.append("discount", form.discount);
    fd.append("featured", form.featured);

    if (image) {
      fd.append("image", image);
    }

    try {
      setLoading(true);
      const res = await api.post("/products/create", fd, { headers: { "Content-Type": "multipart/form-data" } });
      console.log("create product res", res);

      toast.success("Product added successfully!");
      setSuccess(true); setForm(INITIAL); removeImage();
      setTimeout(() => setSuccess(false), 3000);
      navigate("/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add product");
    } finally { setLoading(false); }
  };

  const discountedPrice =
    form.price && form.discount > 0
      ? (parseFloat(form.price) * (1 - form.discount / 100)).toFixed(2)
      : null;

  const Spinner = () => (
    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:.35} 50%{opacity:.7} }
        .page-enter { animation:fadeUp .5s cubic-bezier(.22,.68,0,1.2) both; }
        .shimmer    { animation:shimmer 2.2s ease-in-out infinite; }
        select option { background:#130606; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
        input[type=number] { -moz-appearance:textfield; }
        * { font-family:'DM Sans',sans-serif; }
      `}</style>

      <div className="min-h-screen bg-transparent text-white page-enter">

        {/* ── Header ── */}
        <div className="mb-8 pb-6 border-b border-white/[0.06] flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-1.5 text-[10.5px] tracking-[0.1em] uppercase mb-2.5 text-white/30">
              <span>Catalog</span>
              <ChevronRight size={10} className="text-white/20" />
              <span className="text-red-500 font-semibold">New Product</span>
            </div>
            <h1 className="flex items-center gap-3 text-[26px] font-bold tracking-tight text-white mb-1">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-900/70 to-red-950/40
                border border-red-800/40 flex items-center justify-center text-red-500
                shadow-[0_0_18px_rgba(220,38,38,0.18)] shrink-0">
                <PlusSquare size={17} />
              </span>
              Create Product
            </h1>
            <p className="text-[13px] text-white/35 font-normal mt-0.5">
              Add a new item to your store catalog
            </p>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40
            border border-red-900/30 text-[10.5px] font-semibold tracking-[0.1em] uppercase text-red-400 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse" />
            Draft
          </div>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4">

              {/* Product Details */}
              <Card>
                <CardHead icon={Package} title="Product Details" sub="Required" />
                <div className="p-5">
                  <div className="mb-4">
                    <Label required>Product Title</Label>
                    <input className={inputBase} type="text" name="title"
                      value={form.title} onChange={handle}
                      placeholder="e.g. Premium Wireless Headphones" required />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <textarea className={`${inputBase} resize-y min-h-[90px] leading-relaxed`}
                      name="description" value={form.description} onChange={handle}
                      placeholder="Describe your product — features, specs, use cases…" rows={3} />
                  </div>
                </div>
              </Card>

              {/* Classification */}
              <Card>
                <CardHead icon={Tag} title="Classification" />
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <Label>Brand</Label>
                      <input className={inputBase} type="text" name="brand"
                        value={form.brand} onChange={handle}
                        placeholder="e.g. Sony, Nike, Apple" />
                    </div>
                    <div>
                      <Label required>Category</Label>
                      <select className={`${inputBase} cursor-pointer`} name="category"
                        value={form.category} onChange={handle} required>
                        <option value="">Select category</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHead icon={DollarSign} title="Pricing & Inventory" />
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3.5 mb-4">
                    <div>
                      <Label required>Price (USD)</Label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-white/30 pointer-events-none select-none">$</span>
                        <input className={`${inputBase} pl-6`} type="number" name="price"
                          value={form.price} onChange={handle}
                          placeholder="0.00" min="0" step="0.01" required />
                      </div>
                    </div>
                    <div>
                      <Label>Discount</Label>
                      <div className="relative">
                        <input className={`${inputBase} pr-7`} type="number" name="discount"
                          value={form.discount} onChange={handle}
                          placeholder="0" min="0" max="100" />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-white/25 pointer-events-none select-none">%</span>
                      </div>
                    </div>
                    <div>
                      <Label>
                        <Layers size={10} className="opacity-50" />
                        Stock Qty
                      </Label>
                      <input className={inputBase} type="number" name="stock"
                        value={form.stock} onChange={handle}
                        placeholder="0" min="0" />
                    </div>
                  </div>

                  {/* Featured toggle */}
                  <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer
                    transition-all duration-200 select-none
                    ${form.featured
                      ? "border-red-600/30 bg-red-950/30"
                      : "border-white/[0.07] bg-white/[0.025] hover:border-red-900/40 hover:bg-red-950/20"
                    }`}>
                    <input type="checkbox" name="featured" checked={form.featured}
                      onChange={handle} className="hidden" />
                    <span className={`w-5 h-5 rounded-[6px] border flex items-center justify-center
                      transition-all duration-200 shrink-0
                      ${form.featured
                        ? "bg-red-600/25 border-red-500/60 shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                        : "bg-white/[0.04] border-red-900/50"
                      }`}>
                      {form.featured && <Star size={10} fill="#ef4444" color="#ef4444" />}
                    </span>
                    <div>
                      <p className={`text-[13px] font-semibold transition-colors duration-200
                        ${form.featured ? "text-red-400" : "text-white/50"}`}>
                        Featured Product
                      </p>
                      <p className="text-[11px] text-white/25 mt-px">Appears in homepage spotlight</p>
                    </div>
                  </label>

                  {/* Price preview */}
                  {form.price && (
                    <div className="mt-4 flex items-center gap-5 px-4 py-3.5 rounded-xl
                      bg-gradient-to-r from-red-950/40 to-transparent border border-red-900/20">
                      <div>
                        <p className="text-[9.5px] tracking-[0.14em] uppercase text-white/30 mb-1">Original</p>
                        <p className={`font-bold tabular-nums text-white
                          ${discountedPrice ? "text-sm line-through opacity-40" : "text-xl"}`}>
                          ${parseFloat(form.price || 0).toFixed(2)}
                        </p>
                      </div>
                      {discountedPrice && (
                        <>
                          <div className="w-px h-8 bg-white/[0.07]" />
                          <div>
                            <p className="text-[9.5px] tracking-[0.14em] uppercase text-white/30 mb-1">After Discount</p>
                            <p className="text-xl font-bold text-red-400 tabular-nums">${discountedPrice}</p>
                          </div>
                          <div className="ml-auto px-2.5 py-1 rounded-lg bg-red-950/60
                            border border-red-900/40 text-[10.5px] font-bold text-red-400 tracking-wide">
                            -{form.discount}% OFF
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {/* Publish */}
              <Card>
                <CardHead icon={BarChart2} title="Publish" />
                <div className="p-5">
                  <p className="text-[12.5px] text-white/30 leading-[1.7] mb-4 px-3.5 py-3
                    bg-white/[0.02] rounded-xl border border-white/[0.05]">
                    Review all details before publishing. The product will be immediately
                    visible to customers once submitted.
                  </p>
                  {success && (
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                      bg-emerald-500/[0.07] border border-emerald-500/20 text-emerald-400
                      text-[13px] font-semibold mb-4">
                      <CheckCircle size={15} />
                      Product published successfully!
                    </div>
                  )}
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5
                      bg-gradient-to-br from-red-600 to-red-700
                      hover:from-red-500 hover:to-red-600 rounded-xl text-white
                      text-[13.5px] font-semibold tracking-wide
                      shadow-[0_4px_24px_rgba(220,38,38,0.35)]
                      hover:shadow-[0_6px_32px_rgba(220,38,38,0.5)]
                      hover:-translate-y-0.5 active:translate-y-0
                      disabled:opacity-60 disabled:pointer-events-none transition-all duration-200">
                    {loading ? <><Spinner /> Publishing…</> : <><PlusSquare size={15} /> Publish Product</>}
                  </button>
                  <button type="button"
                    onClick={() => { setForm(INITIAL); removeImage(); }}
                    className="w-full flex items-center justify-center gap-1.5 mt-2.5 py-2.5 px-5
                      bg-transparent border border-white/[0.08] rounded-xl text-white/40
                      text-[12.5px] font-medium hover:text-white/60 hover:border-white/[0.15]
                      hover:bg-white/[0.03] transition-all duration-200">
                    <X size={12} /> Reset Form
                  </button>
                </div>
              </Card>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4 sticky top-20">

              {/* Image Upload */}
              <Card>
                <CardHead icon={Upload} title="Product Image" />
                <div className="p-5">
                  <input ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={e => loadImage(e.target.files[0])} />
                  {preview ? (
                    <div className="relative rounded-xl overflow-hidden group">
                      <img src={preview} alt="Preview"
                        className="w-full h-[190px] object-cover block border border-red-900/30 rounded-xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                      <button type="button" onClick={removeImage}
                        className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/70
                          backdrop-blur border border-white/10 flex items-center justify-center
                          text-white hover:bg-red-600/70 hover:border-red-500/40 transition-all
                          duration-150 opacity-0 group-hover:opacity-100">
                        <X size={12} />
                      </button>
                      {image && (
                        <p className="absolute bottom-2.5 left-3 right-10 text-[10.5px] text-white/50 truncate">
                          {image.name}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div
                        onDrop={e => { e.preventDefault(); setDragOver(false); loadImage(e.dataTransfer.files[0]); }}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onClick={() => fileRef.current?.click()}
                        className={`border border-dashed rounded-xl py-9 px-4 text-center cursor-pointer transition-all duration-300
                          ${dragOver
                            ? "border-red-500/50 bg-red-950/20"
                            : "border-white/[0.1] bg-white/[0.02] hover:border-red-700/40 hover:bg-red-950/10"
                          }`}>
                        <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-900/40
                          flex items-center justify-center mx-auto mb-3 text-red-500/70">
                          <ImageOff size={22} />
                        </div>
                        <p className="text-[13px] font-medium text-white/50 mb-1">
                          <span className="text-red-400 font-semibold">Click to upload</span> or drag & drop
                        </p>
                        <p className="text-[11px] text-white/25">PNG, JPG, WEBP — max 10MB</p>
                      </div>
                      <button type="button" onClick={() => fileRef.current?.click()}
                        className="flex items-center justify-center gap-1.5 mx-auto mt-3
                          px-4 py-2 rounded-xl bg-red-950/40 border border-red-900/30
                          text-red-400 text-[12px] font-medium hover:bg-red-950/60 transition-all duration-150">
                        <Upload size={12} /> Browse Files
                      </button>
                    </>
                  )}
                </div>
              </Card>

              {/* Live Preview */}
              <Card>
                <CardHead icon={Eye} title="Live Preview" sub="Customer View" />
                <div className="p-3">
                  <div className="bg-white/[0.025] rounded-xl border border-white/[0.06] overflow-hidden">
                    <div className="w-full h-36 bg-gradient-to-br from-red-950/30 to-black/60
                      flex items-center justify-center relative overflow-hidden">
                      {preview ? (
                        <img src={preview} alt="" className="w-full h-full object-cover block" />
                      ) : (
                        <div className="shimmer flex flex-col items-center gap-2">
                          <Package size={28} className="text-red-900/60" />
                          <span className="text-[10px] text-white/15">No image</span>
                        </div>
                      )}
                      {form.featured && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600/90 rounded-md
                          text-[9.5px] font-bold text-white tracking-wide shadow-[0_2px_10px_rgba(220,38,38,0.5)]">
                          ★ Featured
                        </div>
                      )}
                      {form.discount > 0 && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80
                          border border-red-900/40 rounded-md text-[9.5px] font-bold text-red-400">
                          -{form.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-3.5">
                      <p className="text-[14px] font-semibold text-white truncate mb-1.5">
                        {form.title || <span className="text-white/20 font-normal italic">Product title…</span>}
                      </p>
                      <div className="flex items-center justify-between mb-2.5">
                        {form.category && (
                          <span className="text-[10px] px-2 py-0.5 bg-red-950/50
                            border border-red-900/30 rounded text-red-400 tracking-wide">
                            {form.category}
                          </span>
                        )}
                        {form.brand && <span className="text-[10px] text-white/30">{form.brand}</span>}
                      </div>
                      <div className="flex items-baseline gap-2">
                        {form.price ? (
                          <>
                            <span className="text-xl font-bold text-white">
                              ${discountedPrice ?? parseFloat(form.price).toFixed(2)}
                            </span>
                            {discountedPrice && (
                              <span className="text-[12px] text-white/30 line-through">
                                ${parseFloat(form.price).toFixed(2)}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[13px] text-white/20 italic">Price TBD</span>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {form.stock > 0 && (
                          <span className="text-[9.5px] px-2 py-0.5 rounded-md font-semibold tracking-wide uppercase
                            bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            In Stock · {form.stock}
                          </span>
                        )}
                        {form.stock == 0 && form.stock !== "" && (
                          <span className="text-[9.5px] px-2 py-0.5 rounded-md font-semibold tracking-wide uppercase
                            bg-red-500/10 text-red-400 border border-red-500/20">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Tips */}
              <div className="px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2 mb-2.5">
                  <Sparkles size={12} className="text-amber-400/70" />
                  <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/30">Quick Tips</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "High-quality images increase sales by 40%",
                    "Add a discount to attract more buyers",
                    "Mark as featured to boost visibility",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11.5px] text-white/25 leading-snug">
                      <span className="text-red-600/60 mt-0.5 shrink-0">·</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}