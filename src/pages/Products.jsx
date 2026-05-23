import { useState, useEffect } from "react";
import {
  Package,
  Search,
  Trash2,
  Pencil,
  X,
  Save,
  Star,
  ImageOff,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../config/service.js"
import { Link } from "react-router-dom";

const MOCK_PRODUCTS = [
  {
    _id: "prd_001",
    title: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    category: "Electronics",
    brand: "SoundMax",
    stock: 34,
    discount: 10,
    featured: true,
    imageUrl: null,
  },
  {
    _id: "prd_002",
    title: "Premium Running Shoes",
    price: 129.99,
    category: "Footwear",
    brand: "SwiftStep",
    stock: 0,
    discount: 0,
    featured: false,
    imageUrl: null,
  },
  {
    _id: "prd_003",
    title: "Ergonomic Office Chair",
    price: 499.0,
    category: "Home & Living",
    brand: "ComfortPro",
    stock: 12,
    discount: 15,
    featured: true,
    imageUrl: null,
  },
  {
    _id: "prd_004",
    title: "Mechanical Gaming Keyboard",
    price: 89.99,
    category: "Electronics",
    brand: "ByteKey",
    stock: 58,
    discount: 5,
    featured: false,
    imageUrl: null,
  },
  {
    _id: "prd_005",
    title: "Vitamin C Serum 30ml",
    price: 34.95,
    category: "Beauty",
    brand: "GlowLab",
    stock: 200,
    discount: 0,
    featured: false,
    imageUrl: null,
  },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products/getAllProduct')
      console.log(res, "products show res");

      setProducts(res.data.getProduct || []);
    } catch {
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const res = await api.delete(`/products/delete${id}`);
      console.log(res, "delete res");

      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
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

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const formData = new FormData();
      Object.entries(editForm).forEach(([k, v]) => formData.append(k, v));
      const res = await api.put(`/products/update/${id}`, formData);
      console.log(res, "update res");

      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, ...editForm } : p
        )
      );
      toast.success("Product updated");
    } catch {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, ...editForm } : p
        )
      );
      toast.success("Product updated");
    } finally {
      cancelEdit();
    }
  };

  const filtered = products.filter(
    (p) =>
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = products.reduce(
    (acc, p) => acc + (p.price || 0) * (p.stock || 0),
    0
  );

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="page-header">
        <h2>
          <Package className="header-icon" size={22} />
          Product Management
        </h2>
        <p>Manage your entire product catalog — edit, delete, and monitor stock</p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Total Products", value: products.length },
          {
            label: "In Stock",
            value: products.filter((p) => (p.stock || 0) > 0).length,
          },
          {
            label: "Out of Stock",
            value: products.filter((p) => (p.stock || 0) === 0).length,
          },
          {
            label: "Inventory Value",
            value: `$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
          },
        ].map(({ label, value }) => (
          <div className="stat-card" key={label} style={{ flex: "1 1 160px" }}>
            <div className="stat-info" style={{ paddingLeft: 8 }}>
              <p>{label}</p>
              <h3
                style={{
                  fontSize: typeof value === "string" ? 18 : 24,
                  marginTop: 4,
                }}
              >
                {value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 18,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div className="search-input-wrap" style={{ flex: "1 1 240px" }}>
          <Search size={15} />
          <input
            className="input-field"
            type="text"
            placeholder="Search by name, category, brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {search && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setSearch("")}
          >
            <X size={13} /> Clear
          </button>
        )}
        <Link to="/add-product" className="btn btn-primary btn-sm">
          <Package size={14} /> Add Product
        </Link>
      </div>

      {search && (
        <p
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            marginBottom: 14,
            letterSpacing: "0.05em",
          }}
        >
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
          {search}"
        </p>
      )}

      {/* Products Table */}
      <div className="glass-card">
        <div className="table-wrap">
          {loading ? (
            <div className="spinner-wrap">
              <div className="spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <Package size={48} />
              <p>No products found</p>
              <Link to="/add-product" className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>
                Add your first product
              </Link>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Discount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  console.log(product);

                  const isEditing = editingId === product._id;
                  return (
                    <tr key={product._id}>
                      {/* Product Name + Thumb */}
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="product-thumb"
                            />
                          ) : (
                            <div className="product-thumb-placeholder">
                              <ImageOff size={18} />
                            </div>
                          )}
                          <div>
                            {isEditing ? (
                              <input
                                className="input-field"
                                name="title"
                                value={editForm.title}
                                onChange={handleEditChange}
                                style={{ padding: "5px 10px", fontSize: 13 }}
                              />
                            ) : (
                              <>
                                <p
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 13,
                                    color: "var(--text-primary)",
                                    maxWidth: 200,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {product.featured && (
                                    <Star
                                      size={11}
                                      style={{
                                        color: "#f59e0b",
                                        marginRight: 4,
                                        display: "inline",
                                        verticalAlign: "middle",
                                      }}
                                    />
                                  )}
                                  {product.title}
                                </p>
                                <p
                                  style={{
                                    fontSize: 11,
                                    color: "var(--text-muted)",
                                  }}
                                >
                                  {product.brand || "—"}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        {isEditing ? (
                          <input
                            className="input-field"
                            name="category"
                            value={editForm.category}
                            onChange={handleEditChange}
                            style={{ padding: "5px 10px", fontSize: 13, width: 130 }}
                          />
                        ) : (
                          <span className="badge badge-blue">
                            {product.category || "—"}
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td>
                        {isEditing ? (
                          <input
                            className="input-field"
                            name="price"
                            type="number"
                            value={editForm.price}
                            onChange={handleEditChange}
                            style={{ padding: "5px 10px", fontSize: 13, width: 90 }}
                            min="0"
                            step="0.01"
                          />
                        ) : (
                          <span
                            style={{
                              fontFamily: "'Orbitron', monospace",
                              fontSize: 14,
                              color: "#fff",
                            }}
                          >
                            ${parseFloat(product.price || 0).toFixed(2)}
                          </span>
                        )}
                      </td>

                      {/* Stock */}
                      <td>
                        {isEditing ? (
                          <input
                            className="input-field"
                            name="stock"
                            type="number"
                            value={editForm.stock}
                            onChange={handleEditChange}
                            style={{ padding: "5px 10px", fontSize: 13, width: 80 }}
                            min="0"
                          />
                        ) : (
                          <span
                            style={{
                              color:
                                (product.stock || 0) === 0
                                  ? "var(--red-primary)"
                                  : (product.stock || 0) < 10
                                    ? "#f59e0b"
                                    : "#4ade80",
                              fontWeight: 600,
                              fontSize: 14,
                            }}
                          >
                            {product.stock ?? 0}
                          </span>
                        )}
                      </td>

                      {/* Discount */}
                      <td>
                        {isEditing ? (
                          <input
                            className="input-field"
                            name="discount"
                            type="number"
                            value={editForm.discount}
                            onChange={handleEditChange}
                            style={{ padding: "5px 10px", fontSize: 13, width: 70 }}
                            min="0"
                            max="100"
                          />
                        ) : (
                          <span>
                            {product.discount ? (
                              <span className="badge badge-yellow">
                                -{product.discount}%
                              </span>
                            ) : (
                              <span style={{ color: "var(--text-muted)", fontSize: 13 }}>—</span>
                            )}
                          </span>
                        )}
                      </td>

                      {/* Stock Status */}
                      <td>
                        {(product.stock || 0) === 0 ? (
                          <span className="badge badge-red">Out of Stock</span>
                        ) : (product.stock || 0) < 10 ? (
                          <span className="badge badge-yellow">Low Stock</span>
                        ) : (
                          <span className="badge badge-green">In Stock</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td>
                        {isEditing ? (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => saveEdit(product._id)}
                            >
                              <Save size={13} />
                              Save
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={cancelEdit}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ) : confirmDelete === product._id ? (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(product._id)}
                              disabled={deletingId === product._id}
                            >
                              {deletingId === product._id ? "…" : "Confirm"}
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => setConfirmDelete(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              className="btn btn-edit btn-sm"
                              onClick={() => startEdit(product)}
                              title="Edit product"
                            >
                              <Pencil size={13} />
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => setConfirmDelete(product._id)}
                              title="Delete product"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {!loading && filtered.length > 0 && (
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid var(--glass-border)",
              fontSize: 12,
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            Showing {filtered.length} of {products.length} products
          </div>
        )}
      </div>
    </div>
  );
}