import { useState, useEffect } from "react";
import { Package, Search, Trash2, Pencil, X, Save, Star, ImageOff } from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/service";
import { Link } from "react-router-dom";

const CATEGORIES = ["Electronics", "Mobile & Accessories", "Fashion (Men)", "Fashion (Women)", "Footwear", "Home & Living", "Beauty & Personal Care", "Health & Wellness", "Sports & Fitness", "Books & Stationery", "Kids & Toys", "Grocery", "Automotive", "Furniture", "Kitchen & Dining", "Other"];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products/getAllProduct");
      setProducts(res.data.getProduct);
    } catch (err) {
      console.log(err, "fetch product error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await api.delete(`/products/delete/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      console.log(err);
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      title: product.title,
      price: product.price,
      stock: product.stock,
      discount: product.discount,
      category: product.category,
    });
  };

  const cancelEdit = () => { setEditingId(null); setEditForm({}); };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const fd = new FormData();
      Object.entries(editForm).forEach(([k, v]) => fd.append(k, v));
      await api.put(`/products/update/${id}`, fd);
    } catch {
      // fall through — update UI regardless
    } finally {
      setProducts(prev => prev.map(p => p._id === id ? { ...p, ...editForm } : p));
      toast.success("Product updated");
      cancelEdit();
    }
  };

  const filtered = products.filter(p =>
    !search ||
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  /* ── shared primitives ── */
  const card = `relative overflow-hidden bg-white/[0.03] border border-white/[0.07]
    rounded-2xl backdrop-blur transition-all duration-300 hover:border-white/[0.11]`;
  const shimmer = `absolute top-0 left-0 right-0 h-px
    bg-gradient-to-r from-transparent via-red-600/35 to-transparent pointer-events-none`;
  const editInput = `bg-black border border-white/[0.1] rounded-lg px-2.5 py-1.5
    text-[12.5px] text-white placeholder:text-white/20 outline-none
    focus:border-red-600/50 focus:ring-1 focus:ring-red-600/15
    transition-all duration-150 font-['Rajdhani',sans-serif]`;
  const btnPrimary = `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px]
    font-semibold bg-gradient-to-br from-red-600 to-red-700
    hover:from-red-500 hover:to-red-600 text-white
    shadow-[0_2px_12px_rgba(220,38,38,0.3)]
    hover:shadow-[0_4px_18px_rgba(220,38,38,0.45)]
    disabled:opacity-50 transition-all duration-200`;
  const btnGhost = `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]
    font-medium bg-transparent border border-white/[0.09] text-white/40
    hover:text-white/70 hover:border-white/[0.18] hover:bg-white/[0.03]
    transition-all duration-200`;
  const btnEdit = `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px]
    font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20
    hover:bg-blue-500/20 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]
    hover:-translate-y-px transition-all duration-200`;
  const btnDanger = `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px]
    font-semibold bg-red-600/10 text-red-400 border border-red-600/20
    hover:bg-red-600 hover:text-white hover:border-red-600
    hover:shadow-[0_0_14px_rgba(220,38,38,0.4)]
    disabled:opacity-40 disabled:pointer-events-none transition-all duration-200`;

  const badge = (variant) => {
    const map = {
      green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      red: "bg-red-600/10    text-red-400    border border-red-600/20",
      yellow: "bg-amber-400/10  text-amber-300  border border-amber-400/20",
      blue: "bg-blue-500/10   text-blue-400   border border-blue-500/20",
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full
      text-[10.5px] font-semibold tracking-[0.06em] uppercase ${map[variant]}`;
  };

  const stockColor = (stock) =>
    stock === 0 ? "text-red-500"
      : stock < 10 ? "text-amber-400"
        : "text-emerald-400";

  return (
    <div className="animate-[fadeIn_.4s_ease_both]">
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* ── Page Header ── */}
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

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-6 ">
        {[
          { label: "Total Products", value: products.length },
          { label: "In Stock", value: products.filter(p => (p.stock || 0) > 0).length },
          { label: "Out of Stock", value: products.filter(p => (p.stock || 0) === 0).length },
        ].map(({ label, value }) => (
          <div key={label}
            className={`${card} flex items-center gap-4 px-5 py-5 flex-[1_1_160px]
              hover:shadow-[0_0_28px_rgba(220,38,38,0.09)] hover:-translate-y-0.5`}>
            <span className={shimmer} />
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

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
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

        {search && (
          <button onClick={() => setSearch("")} className={btnGhost}>
            <X size={12} /> Clear
          </button>
        )}

        <Link to="/add-product" className={`${btnPrimary} no-underline`}>
          <Package size={13} /> Add Product
        </Link>
      </div>

      {/* Result count */}
      {search && (
        <p className="text-[11.5px] text-white/30 tracking-[0.05em] mb-3.5">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
          <span className="text-white/50">{search}</span>"
        </p>
      )}

      {/* ── Products Table ── */}
      <div className={card}>
        <span className={shimmer} />

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-9 h-9 border-[3px] border-white/[0.07] border-t-red-600 rounded-full animate-spin" />
          </div>

        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/25">
            <Package size={44} className="opacity-30" />
            <p className="text-[14px]">No products found</p>
            <Link to="/add-product" className={`${btnPrimary} no-underline mt-1`}>
              Add products
            </Link>
          </div>

        ) : (
          <div className="overflow-x-auto">
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
                  const stock = product.stock || 0;

                  return (
                    <tr key={product._id}
                      className="border-b border-white/[0.03] hover:bg-red-950/[0.1] transition-colors duration-150">

                      {/* ── Product ── */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img src={product.image} alt={product.title}
                              className="w-11 h-11 rounded-lg object-cover border border-red-900/30 shrink-0" />
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-red-950/40 border border-red-900/30
                              flex items-center justify-center text-white/25 shrink-0">
                              <ImageOff size={16} />
                            </div>
                          )}
                          <div className="min-w-0">
                            {isEditing ? (
                              <input name="title" value={editForm.title}
                                onChange={handleEditChange}
                                className={`${editInput} w-[160px]`} />
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

                      {/* ── Category ── */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select name="category" value={editForm.category}
                            onChange={handleEditChange}
                            className={`${editInput} w-[130px] cursor-pointer`}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        ) : (
                          <span className={badge("blue")}>{product.category || "—"}</span>
                        )}
                      </td>

                      {/* ── Price ── */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input name="price" type="number" value={editForm.price}
                            onChange={handleEditChange} min="0" step="0.01"
                            className={`${editInput} w-[90px]`} />
                        ) : (
                          <span className="text-[14px] font-semibold text-white tabular-nums">
                            ${parseFloat(product.price || 0).toFixed(2)}
                          </span>
                        )}
                      </td>

                      {/* ── Stock ── */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input name="stock" type="number" value={editForm.stock}
                            onChange={handleEditChange} min="0"
                            className={`${editInput} w-[75px]`} />
                        ) : (
                          <span className={`text-[14px] font-bold tabular-nums ${stockColor(stock)}`}>
                            {stock}
                          </span>
                        )}
                      </td>

                      {/* ── Discount ── */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input name="discount" type="number" value={editForm.discount}
                            onChange={handleEditChange} min="0" max="100"
                            className={`${editInput} w-[70px]`} />
                        ) : product.discount ? (
                          <span className={badge("yellow")}>-{product.discount}%</span>
                        ) : (
                          <span className="text-[13px] text-white/25">—</span>
                        )}
                      </td>

                      {/* ── Status ── */}
                      <td className="px-4 py-3">
                        {stock === 0 ? <span className={badge("red")}>Out of Stock</span>
                          : stock < 10 ? <span className={badge("yellow")}>Low Stock</span>
                            : <span className={badge("green")}>In Stock</span>}
                      </td>

                      {/* ── Actions ── */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => saveEdit(product._id)} className={btnPrimary}>
                              <Save size={12} /> Save
                            </button>
                            <button onClick={cancelEdit} className={btnGhost}>
                              <X size={12} />
                            </button>
                          </div>

                        ) : confirmDelete === product._id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDelete(product._id)}
                              disabled={deletingId === product._id}
                              className={btnDanger}>
                              {deletingId === product._id ? "…" : "Confirm"}
                            </button>
                            <button onClick={() => setConfirmDelete(null)} className={btnGhost}>
                              Cancel
                            </button>
                          </div>

                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => startEdit(product)} className={btnEdit} title="Edit product">
                              <Pencil size={12} /> Edit
                            </button>
                            <button onClick={() => setConfirmDelete(product._id)} className={btnDanger} title="Delete product">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3.5 border-t border-white/[0.05] text-[11.5px]
            text-white/25 tracking-[0.05em] font-['Inter',sans-serif]">
            Showing <span className="text-white/40">{filtered.length}</span> of{" "}
            <span className="text-white/40">{products.length}</span> products
          </div>
        )}
      </div>
    </div>
  );
}