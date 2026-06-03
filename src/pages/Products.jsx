import { useState, useEffect, useCallback } from "react";
import { Package, Search, Trash2, Pencil, X, Save, Star, ImageOff, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/service";
import { Link } from "react-router-dom";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Electronics", "Mobile & Accessories", "Fashion (Men)", "Fashion (Women)",
  "Footwear", "Home & Living", "Beauty & Personal Care", "Health & Wellness",
  "Sports & Fitness", "Books & Stationery", "Kids & Toys", "Grocery",
  "Automotive", "Furniture", "Kitchen & Dining", "Other",
];

const EDIT_FIELDS = ["title", "price", "stock", "discount", "category"];

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = {
  card: `relative overflow-hidden bg-white/[0.03] border border-white/[0.07]
    rounded-2xl backdrop-blur transition-all duration-300 hover:border-white/[0.11]`,
  shimmer: `absolute top-0 left-0 right-0 h-px
    bg-gradient-to-r from-transparent via-red-600/35 to-transparent pointer-events-none`,
  input: `bg-black border border-white/[0.1] rounded-lg px-2.5 py-1.5
    text-[12.5px] text-white placeholder:text-white/20 outline-none
    focus:border-red-600/50 focus:ring-1 focus:ring-red-600/15
    transition-all duration-150 font-['Rajdhani',sans-serif]`,
  btnPrimary: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px]
    font-semibold bg-gradient-to-br from-red-600 to-red-700
    hover:from-red-500 hover:to-red-600 text-white
    shadow-[0_2px_12px_rgba(220,38,38,0.3)]
    hover:shadow-[0_4px_18px_rgba(220,38,38,0.45)]
    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`,
  btnGhost: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]
    font-medium bg-transparent border border-white/[0.09] text-white/40
    hover:text-white/70 hover:border-white/[0.18] hover:bg-white/[0.03]
    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`,
  btnEdit: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px]
    font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20
    hover:bg-blue-500/20 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]
    hover:-translate-y-px transition-all duration-200`,
  btnDanger: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px]
    font-semibold bg-red-600/10 text-red-400 border border-red-600/20
    hover:bg-red-600 hover:text-white hover:border-red-600
    hover:shadow-[0_0_14px_rgba(220,38,38,0.4)]
    disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200`,
};

const badge = (variant) => {
  const variants = {
    green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    red: "bg-red-600/10    text-red-400    border border-red-600/20",
    yellow: "bg-amber-400/10  text-amber-300  border border-amber-400/20",
    blue: "bg-blue-500/10   text-blue-400   border border-blue-500/20",
  };
  return `inline-flex items-center px-2.5 py-0.5 rounded-full
    text-[10.5px] font-semibold tracking-[0.06em] uppercase ${variants[variant]}`;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StockBadge = ({ stock }) => {
  if (stock === 0) return <span className={badge("red")}>Out of Stock</span>;
  if (stock < 10) return <span className={badge("yellow")}>Low Stock</span>;
  return <span className={badge("green")}>In Stock</span>;
};

const ProductImage = ({ src, alt, size = "sm" }) => {
  const dim = size === "sm" ? "w-11 h-11" : "w-14 h-14 sm:w-16 sm:h-16";
  const radius = size === "sm" ? "rounded-lg" : "rounded-xl";
  return src ? (
    <img src={src} alt={alt}
      className={`${dim} ${radius} object-cover border border-red-900/30 shrink-0`} />
  ) : (
    <div className={`${dim} ${radius} bg-red-950/40 border border-red-900/30
      flex items-center justify-center text-white/25 shrink-0`}>
      <ImageOff size={size === "sm" ? 16 : 18} />
    </div>
  );
};

const EditInput = ({ name, value, onChange, type = "text", min, max, step, className = "" }) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    min={min}
    max={max}
    step={step}
    className={`${S.input} ${className}`}
  />
);

const EditSelect = ({ name, value, onChange, className = "" }) => (
  <select name={name} value={value} onChange={onChange}
    className={`${S.input} cursor-pointer ${className}`}>
    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
  </select>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ── API functions ──────────────────────────────────────────────────────────

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products/getAllProduct");
      setProducts(data.getProduct ?? []);
    } catch (err) {
      console.error("fetchProducts:", err);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = async (id) => {
    try {
      setSavingId(id);
      const fd = new FormData();
      EDIT_FIELDS.forEach(key => fd.append(key, editForm[key] ?? ""));

      const res = await api.put(`/products/update/${id}`, fd);
      console.log(res, 'product res updated');

      await fetchProducts();
      toast.success("Product updated.");
      cancelEdit();
    } catch (err) {
      console.error("updateProduct:", err);
      toast.error(err?.response?.data?.message ?? "Update failed. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setDeletingId(id);
      await api.delete(`/products/delete/${id}`);

      // Re-fetch so UI always mirrors the database
      await fetchProducts();
      toast.success("Product deleted.");
    } catch (err) {
      console.error("deleteProduct:", err);
      toast.error(err?.response?.data?.message ?? "Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  // ── Edit helpers ───────────────────────────────────────────────────────────

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm(Object.fromEntries(EDIT_FIELDS.map(k => [k, product[k] ?? ""])));
    setConfirmDelete(null); // close any open confirm
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── Derived state ──────────────────────────────────────────────────────────

  const filtered = products.filter(p => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q)
    );
  });

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "In Stock", value: products.filter(p => (p.stock ?? 0) > 0).length },
    { label: "Out of Stock", value: products.filter(p => (p.stock ?? 0) === 0).length },
  ];

  // ── Render helpers ─────────────────────────────────────────────────────────

  const stockColor = (stock) =>
    stock === 0 ? "text-red-500" : stock < 10 ? "text-amber-400" : "text-emerald-400";

  // ── Action cells ──────────────────────────────────────────────────────────

  const ActionButtons = ({ product, direction = "row" }) => {
    const isEditing = editingId === product._id;
    const isDeleting = deletingId === product._id;
    const isSaving = savingId === product._id;
    const isConfirm = confirmDelete === product._id;
    const flex = direction === "row" ? "flex items-center gap-1.5" : "flex flex-col gap-1.5";

    if (isEditing) return (
      <div className={flex}>
        <button onClick={() => updateProduct(product._id)} disabled={isSaving} className={S.btnPrimary}>
          <Save size={12} /> {isSaving ? "Saving…" : "Save"}
        </button>
        <button onClick={cancelEdit} disabled={isSaving} className={S.btnGhost}>
          <X size={12} /> {direction === "col" && "Cancel"}
        </button>
      </div>
    );

    if (isConfirm) return (
      <div className={flex}>
        <button onClick={() => deleteProduct(product._id)} disabled={isDeleting} className={S.btnDanger}>
          {isDeleting ? "Deleting…" : "Confirm"}
        </button>
        <button onClick={() => setConfirmDelete(null)} disabled={isDeleting} className={S.btnGhost}>
          Cancel
        </button>
      </div>
    );

    return (
      <div className={flex}>
        <button onClick={() => startEdit(product)} className={S.btnEdit}>
          <Pencil size={12} /> Edit
        </button>
        <button onClick={() => setConfirmDelete(product._id)} className={S.btnDanger}>
          <Trash2 size={12} />
        </button>
      </div>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="animate-[fadeIn_.4s_ease_both]">
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
      `}</style>

      {/* Page Header */}
      <div className="mb-7">
        <h2 className="font-['Orbitron',monospace] text-[20px] font-bold text-white
          flex items-center gap-3 mb-1.5">
          <Package size={20} className="text-red-500 drop-shadow-[0_0_6px_rgba(220,38,38,0.7)]" />
          Product Management
        </h2>
        <p className="text-[13px] text-white/40">
          Manage your entire product catalog — edit, delete, and monitor stock
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 mb-6">
        {stats.map(({ label, value }) => (
          <div key={label}
            className={`${S.card} flex items-center gap-4 px-5 py-5
              hover:shadow-[0_0_28px_rgba(220,38,38,0.09)] hover:-translate-y-0.5`}>
            <span className={S.shimmer} />
            <div>
              <p className="text-[12px] tracking-[0.08em] uppercase text-white/40 mb-1
                font-['Rajdhani',sans-serif]">{label}</p>
              <h3 className="font-['Orbitron',monospace] text-[28px] font-bold text-white leading-none">
                {value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className={`${S.card} p-4 sm:p-5 mb-5`}>
        <span className={S.shimmer} />
        <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={13}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, category, brand…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl
                pl-9 pr-3.5 py-2.5 text-[13px] text-white placeholder:text-white/20
                outline-none focus:border-red-600/50 focus:ring-2 focus:ring-red-600/10
                font-['Rajdhani',sans-serif] transition-all duration-200"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2.5 sm:shrink-0">
            {search && (
              <button onClick={() => setSearch("")}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5
                  bg-transparent border border-white/[0.09] rounded-xl text-white/45 text-[13px]
                  hover:text-white/70 hover:border-white/[0.16] hover:bg-white/[0.03]
                  transition-all duration-200 font-['Rajdhani',sans-serif]">
                <X size={12} /> Clear
              </button>
            )}
            <button onClick={fetchProducts} disabled={loading}
              className={`${S.btnGhost} px-3`} title="Refresh">
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            </button>
            <Link to="/add-product"
              className={`${S.btnPrimary} no-underline flex-1 sm:flex-none justify-center`}>
              <Package size={13} /> Add Product
            </Link>
          </div>
        </div>

        {search && (
          <p className="text-[11.5px] text-white/30 tracking-[0.05em] mt-3">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
            <span className="text-white/50">{search}</span>"
          </p>
        )}
      </div>

      {/* Product Table / Cards */}
      <div className={S.card}>
        <span className={S.shimmer} />

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-9 h-9 border-[3px] border-white/[0.07] border-t-red-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/25">
            <Package size={44} className="opacity-30" />
            <p className="text-[14px]">{search ? "No products match your search" : "No products found"}</p>
            {!search && (
              <Link to="/add-product" className={`${S.btnPrimary} no-underline mt-1`}>
                Add Product
              </Link>
            )}
          </div>
        )}

        {/* Desktop Table */}
        {!loading && filtered.length > 0 && (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-red-900/25">
                    {["Product", "Category", "Price", "Stock", "Discount", "Status", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3.5 text-left text-[10.5px] tracking-[0.14em]
                        uppercase text-red-500 font-semibold whitespace-nowrap font-['Inter',sans-serif]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(product => {
                    const isEditing = editingId === product._id;
                    const stock = product.stock ?? 0;
                    return (
                      <tr key={product._id}
                        className="border-b border-white/[0.03] hover:bg-red-950/[0.1] transition-colors">

                        {/* Product */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <ProductImage src={product.image} alt={product.title} size="sm" />
                            <div className="min-w-0">
                              {isEditing ? (
                                <EditInput name="title" value={editForm.title}
                                  onChange={handleEditChange} className="w-[160px]" />
                              ) : (
                                <>
                                  <p className="text-[13px] font-semibold text-white max-w-[180px] truncate">
                                    {product.featured && (
                                      <Star size={10} className="text-amber-400 inline mr-1 mb-0.5" />
                                    )}
                                    {product.title}
                                  </p>
                                  <p className="text-[11px] text-white/30 mt-0.5">{product.brand || "—"}</p>
                                </>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <EditSelect name="category" value={editForm.category}
                              onChange={handleEditChange} className="w-[130px]" />
                          ) : (
                            <span className={badge("blue")}>{product.category || "—"}</span>
                          )}
                        </td>

                        {/* Price */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <EditInput name="price" type="number" value={editForm.price}
                              onChange={handleEditChange} min="0" step="0.01" className="w-[90px]" />
                          ) : (
                            <span className="text-[14px] font-semibold text-white tabular-nums">
                              ${parseFloat(product.price ?? 0).toFixed(2)}
                            </span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <EditInput name="stock" type="number" value={editForm.stock}
                              onChange={handleEditChange} min="0" className="w-[75px]" />
                          ) : (
                            <span className={`text-[14px] font-bold tabular-nums ${stockColor(stock)}`}>
                              {stock}
                            </span>
                          )}
                        </td>

                        {/* Discount */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <EditInput name="discount" type="number" value={editForm.discount}
                              onChange={handleEditChange} min="0" max="100" className="w-[70px]" />
                          ) : product.discount ? (
                            <span className={badge("yellow")}>-{product.discount}%</span>
                          ) : (
                            <span className="text-[13px] text-white/25">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3"><StockBadge stock={stock} /></td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <ActionButtons product={product} direction="row" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-white/[0.04]">
              {filtered.map(product => {
                const isEditing = editingId === product._id;
                const stock = product.stock ?? 0;
                return (
                  <div key={product._id}
                    className="p-4 sm:p-5 hover:bg-red-950/[0.08] transition-colors">

                    {/* Top: image + info + actions */}
                    <div className="flex items-start gap-3">
                      <ProductImage src={product.image} alt={product.title} size="lg" />

                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <EditInput name="title" value={editForm.title}
                            onChange={handleEditChange} className="w-full mb-1.5" />
                        ) : (
                          <p className="text-[13.5px] font-semibold text-white truncate leading-snug">
                            {product.featured && (
                              <Star size={10} className="text-amber-400 inline mr-1 mb-0.5" />
                            )}
                            {product.title}
                          </p>
                        )}
                        <p className="text-[11px] text-white/30 mt-0.5 truncate">{product.brand || "—"}</p>
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {isEditing ? (
                            <EditSelect name="category" value={editForm.category}
                              onChange={handleEditChange} />
                          ) : (
                            <span className={badge("blue")}>{product.category || "—"}</span>
                          )}
                          <StockBadge stock={stock} />
                        </div>
                      </div>

                      <div className="shrink-0">
                        <ActionButtons product={product} direction="col" />
                      </div>
                    </div>

                    {/* Bottom: price / stock / discount */}
                    <div className="mt-3.5 pt-3 border-t border-white/[0.05] grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "Price",
                          view: <span className="text-[13px] font-semibold text-white tabular-nums">
                            ${parseFloat(product.price ?? 0).toFixed(2)}
                          </span>,
                          edit: <EditInput name="price" type="number" value={editForm.price}
                            onChange={handleEditChange} min="0" step="0.01" className="w-full" />,
                        },
                        {
                          label: "Stock",
                          view: <span className={`text-[13px] font-bold tabular-nums ${stockColor(stock)}`}>
                            {stock}
                          </span>,
                          edit: <EditInput name="stock" type="number" value={editForm.stock}
                            onChange={handleEditChange} min="0" className="w-full" />,
                        },
                        {
                          label: "Discount",
                          view: product.discount
                            ? <span className={badge("yellow")}>-{product.discount}%</span>
                            : <span className="text-[13px] text-white/25">—</span>,
                          edit: <EditInput name="discount" type="number" value={editForm.discount}
                            onChange={handleEditChange} min="0" max="100" className="w-full" />,
                        },
                      ].map(({ label, view, edit }) => (
                        <div key={label}>
                          <p className="text-[9.5px] uppercase tracking-[0.1em] text-white/25 mb-1
                            font-['Rajdhani',sans-serif]">{label}</p>
                          {isEditing ? edit : view}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer */}
        {!loading && filtered.length > 0 && (
          <div className="px-4 sm:px-5 py-3.5 border-t border-white/[0.05]
            text-[11.5px] text-white/25 tracking-[0.05em] font-['Inter',sans-serif]">
            Showing <span className="text-white/40">{filtered.length}</span> of{" "}
            <span className="text-white/40">{products.length}</span> products
          </div>
        )}
      </div>
    </div>
  );
}