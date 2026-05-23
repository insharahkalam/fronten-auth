import { useState, useRef } from "react";
import { PlusSquare, Upload, X, ImageOff, CheckCircle, Package, Tag, DollarSign, Layers, Star, BarChart2, Percent, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { addProduct } from "../config/service.js";
import { useNavigate } from "react-router-dom";

/* ─── INLINE STYLES (scoped via className prefix ap-) ─── */
const S = {

    page: {
        minHeight: "100vh",
        background: "transparent",
        padding: "0",
        fontFamily: "'DM Sans', 'Rajdhani', sans-serif",
    },

    /* ── Header ── */
    header: {
        marginBottom: "36px",
        paddingBottom: "24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
    },
    headerLeft: {},
    breadcrumb: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        color: "rgba(255,255,255,0.3)",
        letterSpacing: "0.06em",
        marginBottom: "10px",
        textTransform: "uppercase",
    },
    breadcrumbSep: { color: "rgba(255,255,255,0.15)" },
    breadcrumbActive: { color: "#dc2626" },
    headerTitle: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#fff",
        margin: 0,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    headerTitleIcon: {
        width: "38px",
        height: "38px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(220,38,38,0.1))",
        border: "1px solid rgba(220,38,38,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#dc2626",
        boxShadow: "0 0 20px rgba(220,38,38,0.15)",
        flexShrink: 0,
    },
    headerSub: {
        fontSize: "14px",
        color: "rgba(255,255,255,0.38)",
        marginTop: "6px",
        fontWeight: "400",
    },
    headerBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 14px",
        background: "rgba(220,38,38,0.08)",
        border: "1px solid rgba(220,38,38,0.2)",
        borderRadius: "8px",
        fontSize: "12px",
        color: "#dc2626",
        letterSpacing: "0.08em",
        fontWeight: "600",
        textTransform: "uppercase",
        alignSelf: "flex-start",
    },

    /* ── Grid Layout ── */
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        gap: "20px",
        alignItems: "start",
    },
    leftCol: { display: "flex", flexDirection: "column", gap: "16px" },
    rightCol: { display: "flex", flexDirection: "column", gap: "16px", position: "sticky", top: "80px" },

    /* ── Section Card ── */
    card: {
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "18px 22px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.015)",
    },
    cardHeaderIcon: {
        width: "28px",
        height: "28px",
        borderRadius: "7px",
        background: "rgba(220,38,38,0.12)",
        border: "1px solid rgba(220,38,38,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#dc2626",
        flexShrink: 0,
    },
    cardHeaderTitle: {
        fontSize: "13px",
        fontWeight: "600",
        color: "rgba(255,255,255,0.8)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        margin: 0,
    },
    cardHeaderSub: {
        fontSize: "12px",
        color: "rgba(255,255,255,0.25)",
        marginLeft: "auto",
    },
    cardBody: { padding: "22px" },

    /* ── Form ── */
    fieldGroup: { marginBottom: "18px" },
    fieldGroupLast: { marginBottom: 0 },
    label: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        fontWeight: "600",
        color: "rgba(255,255,255,0.5)",
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        marginBottom: "8px",
    },
    required: { color: "#dc2626", fontSize: "14px" },
    input: {
        width: "100%",
        padding: "11px 14px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        color: "#fff",
        fontSize: "14px",
        fontFamily: "inherit",
        fontWeight: "500",
        outline: "none",
        transition: "all 0.2s ease",
        boxSizing: "border-box",
        WebkitAppearance: "none",
    },
    textarea: {
        width: "100%",
        padding: "12px 14px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        color: "#fff",
        fontSize: "14px",
        fontFamily: "inherit",
        fontWeight: "500",
        outline: "none",
        transition: "all 0.2s ease",
        resize: "vertical",
        minHeight: "100px",
        boxSizing: "border-box",
        lineHeight: "1.6",
    },
    twoCol: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "14px",
    },
    threeCol: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "14px",
    },

    /* ── Checkbox ── */
    checkboxWrap: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 14px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        userSelect: "none",
    },
    checkboxIcon: {
        width: "20px",
        height: "20px",
        borderRadius: "5px",
        border: "1.5px solid rgba(220,38,38,0.4)",
        background: "rgba(220,38,38,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        flexShrink: 0,
    },
    checkboxIconChecked: {
        background: "rgba(220,38,38,0.25)",
        border: "1.5px solid rgba(220,38,38,0.7)",
        boxShadow: "0 0 8px rgba(220,38,38,0.25)",
    },
    checkboxLabel: { fontSize: "13px", fontWeight: "600", color: "rgba(255,255,255,0.6)", transition: "color 0.2s" },
    checkboxLabelChecked: { color: "#dc2626" },

    /* ── Price Preview ── */
    pricePreview: {
        marginTop: "14px",
        padding: "14px 16px",
        background: "linear-gradient(135deg, rgba(220,38,38,0.07), rgba(220,38,38,0.03))",
        borderRadius: "10px",
        border: "1px solid rgba(220,38,38,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "24px",
    },
    priceLabel: { fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" },
    priceValue: { fontSize: "20px", fontWeight: "700", color: "#fff", fontVariantNumeric: "tabular-nums" },
    priceValueDiscount: { fontSize: "20px", fontWeight: "700", color: "#dc2626", fontVariantNumeric: "tabular-nums", textShadow: "0 0 16px rgba(220,38,38,0.4)" },
    priceDivider: { width: "1px", height: "36px", background: "rgba(255,255,255,0.07)" },
    savingsBadge: {
        marginLeft: "auto",
        padding: "4px 10px",
        background: "rgba(220,38,38,0.12)",
        border: "1px solid rgba(220,38,38,0.2)",
        borderRadius: "6px",
        fontSize: "11px",
        fontWeight: "700",
        color: "#dc2626",
        letterSpacing: "0.06em",
    },

    /* ── Image Upload ── */
    uploadZone: {
        border: "1.5px dashed rgba(255,255,255,0.1)",
        borderRadius: "12px",
        padding: "32px 20px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.25s ease",
        background: "rgba(255,255,255,0.015)",
        position: "relative",
        overflow: "hidden",
    },
    uploadZoneActive: {
        border: "1.5px dashed rgba(220,38,38,0.5)",
        background: "rgba(220,38,38,0.05)",
        boxShadow: "inset 0 0 30px rgba(220,38,38,0.04)",
    },
    uploadIconWrap: {
        width: "56px",
        height: "56px",
        borderRadius: "14px",
        background: "rgba(220,38,38,0.08)",
        border: "1px solid rgba(220,38,38,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 14px",
        color: "rgba(220,38,38,0.7)",
    },
    uploadTitle: { fontSize: "14px", fontWeight: "600", color: "rgba(255,255,255,0.7)", marginBottom: "4px" },
    uploadSub: { fontSize: "12px", color: "rgba(255,255,255,0.25)" },
    uploadAccent: { color: "#dc2626", fontWeight: "700" },

    /* ── Image Preview ── */
    previewWrap: { position: "relative", borderRadius: "12px", overflow: "hidden" },
    previewImg: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        display: "block",
        borderRadius: "12px",
        border: "1px solid rgba(220,38,38,0.2)",
    },
    previewOverlay: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
        borderRadius: "12px",
    },
    previewRemove: {
        position: "absolute",
        top: "8px",
        right: "8px",
        width: "28px",
        height: "28px",
        borderRadius: "7px",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
    },
    previewFileName: {
        position: "absolute",
        bottom: "10px",
        left: "12px",
        right: "12px",
        fontSize: "11px",
        color: "rgba(255,255,255,0.6)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    /* ── Live Preview Card ── */
    livePreview: {
        background: "rgba(255,255,255,0.02)",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        transition: "all 0.3s ease",
    },
    previewCardImg: {
        width: "100%",
        height: "160px",
        background: "linear-gradient(135deg, rgba(220,38,38,0.06), rgba(0,0,0,0.4))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
    },
    previewCardBody: { padding: "16px" },
    previewCardTitle: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#fff",
        marginBottom: "5px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    previewCardMeta: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
    },
    previewCat: {
        fontSize: "11px",
        padding: "2px 8px",
        background: "rgba(220,38,38,0.1)",
        border: "1px solid rgba(220,38,38,0.2)",
        borderRadius: "4px",
        color: "#dc2626",
        letterSpacing: "0.05em",
    },
    previewBrand: { fontSize: "11px", color: "rgba(255,255,255,0.3)" },
    previewPriceRow: { display: "flex", alignItems: "baseline", gap: "8px" },
    previewPrice: { fontSize: "22px", fontWeight: "700", color: "#fff" },
    previewOriginalPrice: {
        fontSize: "13px",
        color: "rgba(255,255,255,0.3)",
        textDecoration: "line-through",
    },
    previewBadgesRow: { display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" },
    badge: {
        fontSize: "10px",
        padding: "2px 8px",
        borderRadius: "4px",
        fontWeight: "600",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
    },

    /* ── Buttons ── */
    btnPrimary: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "13px 20px",
        background: "linear-gradient(135deg, #dc2626, #b91c1c)",
        border: "none",
        borderRadius: "11px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "700",
        letterSpacing: "0.04em",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 20px rgba(220,38,38,0.3), 0 1px 0 rgba(255,255,255,0.08) inset",
        position: "relative",
        overflow: "hidden",
    },
    btnGhost: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        padding: "11px 20px",
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "11px",
        color: "rgba(255,255,255,0.5)",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s ease",
        marginTop: "10px",
    },
    btnBrowse: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        padding: "9px 16px",
        background: "rgba(220,38,38,0.1)",
        border: "1px solid rgba(220,38,38,0.2)",
        borderRadius: "9px",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s ease",
        margin: "12px auto 0",
    },

    /* ── Spinner ── */
    spinner: {
        width: "16px",
        height: "16px",
        border: "2px solid rgba(255,255,255,0.25)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "apSpin 0.7s linear infinite",
        flexShrink: 0,
    },

    /* ── Success ── */
    successBanner: {
        display: "flex",
        alignItems: "center",
        gap: "9px",
        padding: "11px 14px",
        background: "rgba(34,197,94,0.07)",
        border: "1px solid rgba(34,197,94,0.2)",
        borderRadius: "10px",
        marginBottom: "14px",
        color: "#4ade80",
        fontSize: "13px",
        fontWeight: "600",
    },

    /* ── Publish note ── */
    publishNote: {
        fontSize: "12px",
        color: "rgba(255,255,255,0.28)",
        lineHeight: 1.65,
        marginBottom: "16px",
        padding: "12px 14px",
        background: "rgba(255,255,255,0.02)",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.05)",
    },

    /* ── Divider ── */
    divider: { height: "1px", background: "rgba(255,255,255,0.05)", margin: "18px 0" },
};

const CATEGORIES = [
    "Electronics", "Clothing", "Footwear", "Home & Living",
    "Beauty", "Sports", "Books", "Toys", "Automotive", "Other",
];

const INITIAL_FORM = {
    title: "", description: "", price: "", category: "",
    brand: "", stock: "", discount: "", featured: false,
};

/* Inject keyframe once */
if (typeof document !== "undefined" && !document.getElementById("ap-styles")) {
    const style = document.createElement("style");
    style.id = "ap-styles";
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
    @keyframes apSpin { to { transform: rotate(360deg); } }
    @keyframes apFadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes apShimmer { 0%,100% { opacity:.4; } 50% { opacity:.8; } }
    .ap-card:hover { border-color: rgba(255,255,255,0.11) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.25) !important; }
    .ap-input:focus { border-color: rgba(220,38,38,0.45) !important; background: rgba(255,255,255,0.06) !important; box-shadow: 0 0 0 3px rgba(220,38,38,0.08) !important; }
    .ap-input::placeholder { color: rgba(255,255,255,0.18); }
    .ap-input option { background: #180808; }
    .ap-upload-zone:hover { border-color: rgba(220,38,38,0.35) !important; background: rgba(220,38,38,0.03) !important; }
    .ap-btn-primary:hover:not(:disabled) { background: linear-gradient(135deg,#ef4444,#dc2626) !important; box-shadow: 0 6px 28px rgba(220,38,38,0.45) !important; transform: translateY(-1px); }
    .ap-btn-primary:active { transform: translateY(0) !important; }
    .ap-btn-ghost:hover { color: rgba(255,255,255,0.75) !important; border-color: rgba(255,255,255,0.15) !important; background: rgba(255,255,255,0.04) !important; }
    .ap-btn-browse:hover { background: rgba(220,38,38,0.18) !important; border-color: rgba(220,38,38,0.35) !important; }
    .ap-checkbox:hover { border-color: rgba(220,38,38,0.3) !important; background: rgba(220,38,38,0.04) !important; }
    .ap-preview-remove:hover { background: rgba(220,38,38,0.4) !important; border-color: rgba(220,38,38,0.4) !important; }
    .ap-fade-up { animation: apFadeUp 0.45s cubic-bezier(.22,.68,0,1.2) both; }
    .ap-shimmer { animation: apShimmer 2s ease-in-out infinite; }
    @media (max-width: 900px) {
      .ap-grid { grid-template-columns: 1fr !important; }
      .ap-right-col { position: static !important; }
    }
    @media (max-width: 600px) {
      .ap-two-col, .ap-three-col { grid-template-columns: 1fr !important; }
      .ap-header { flex-direction: column !important; }
    }
  `;
    document.head.appendChild(style);
}

export default function AddProduct() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileRef = useRef();

    const navigate = useNavigate()
    /* ── All original handlers untouched ── */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleImage = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) { toast.error("Please select a valid image file"); return; }
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleImage(e.dataTransfer.files[0]);
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.price || !form.category) { toast.error("Please fill in all required fields"); return; }
        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => formData.append(key, val));
        if (image) formData.append("image", image);
        try {
            setLoading(true);
            await addProduct(formData);
            toast.success("Product added successfully!");
            setSuccess(true);
            setForm(INITIAL_FORM);
            removeImage();
            setTimeout(() => setSuccess(false), 3000);
            navigate('/products')
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    /* ── Computed values for preview ── */
    const discountedPrice =
        form.price && form.discount > 0
            ? (parseFloat(form.price) * (1 - form.discount / 100)).toFixed(2)
            : null;

    return (
        <div style={S.page} className="ap-fade-up">
            {/* ── Page Header ── */}
            <div style={S.header} className="ap-header">
                <div style={S.headerLeft}>
                    <div style={S.breadcrumb}>
                        <span style={S.breadcrumbActive}>New Product</span>
                    </div>
                    <h1 style={S.headerTitle}>
                        <div style={S.headerTitleIcon}><PlusSquare size={18} /></div>
                        Create Product
                    </h1>
                    <p style={S.headerSub}>Add a new item to your store catalog</p>
                </div>
                <div style={S.headerBadge}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#dc2626", boxShadow: "0 0 6px rgba(220,38,38,0.7)", display: "inline-block" }} />
                    Draft
                </div>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit}>
                <div style={S.grid} className="ap-grid">

                    {/* ════ LEFT COLUMN ════ */}
                    <div style={S.leftCol}>

                        {/* Card 1: Basic Info */}
                        <div style={S.card} className="ap-card">
                            <div style={S.cardHeader}>
                                <div style={S.cardHeaderIcon}><Package size={14} /></div>
                                <p style={S.cardHeaderTitle}>Product Details</p>
                                <span style={S.cardHeaderSub}>Required</span>
                            </div>
                            <div style={S.cardBody}>
                                <div style={S.fieldGroup}>
                                    <label style={S.label}>
                                        Product Title <span style={S.required}>*</span>
                                    </label>
                                    <input
                                        className="ap-input"
                                        style={S.input}
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Premium Wireless Headphones"
                                        required
                                    />
                                </div>

                                <div style={S.fieldGroupLast}>
                                    <label style={S.label}>Description</label>
                                    <textarea
                                        className="ap-input"
                                        style={S.textarea}
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Describe your product — features, specs, use cases…"
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Category & Brand */}
                        <div style={S.card} className="ap-card">
                            <div style={S.cardHeader}>
                                <div style={S.cardHeaderIcon}><Tag size={14} /></div>
                                <p style={S.cardHeaderTitle}>Classification</p>
                            </div>
                            <div style={S.cardBody}>
                                <div style={{ ...S.twoCol }} className="ap-two-col">
                                    <div style={S.fieldGroupLast}>
                                        <label style={S.label}>Brand</label>
                                        <input
                                            className="ap-input"
                                            style={S.input}
                                            type="text"
                                            name="brand"
                                            value={form.brand}
                                            onChange={handleChange}
                                            placeholder="e.g. Sony, Nike, Apple"
                                        />
                                    </div>
                                    <div style={S.fieldGroupLast}>
                                        <label style={S.label}>
                                            Category <span style={S.required}>*</span>
                                        </label>
                                        <select
                                            className="ap-input"
                                            style={{ ...S.input, cursor: "pointer" }}
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select category</option>
                                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Pricing */}
                        <div style={S.card} className="ap-card">
                            <div style={S.cardHeader}>
                                <div style={S.cardHeaderIcon}><DollarSign size={14} /></div>
                                <p style={S.cardHeaderTitle}>Pricing & Inventory</p>
                            </div>
                            <div style={S.cardBody}>
                                <div style={S.threeCol} className="ap-three-col">
                                    <div style={S.fieldGroup}>
                                        <label style={S.label}>
                                            Price (USD) <span style={S.required}>*</span>
                                        </label>
                                        <div style={{ position: "relative" }}>
                                            <span style={{
                                                position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)",
                                                fontSize: "14px", color: "rgba(255,255,255,0.3)", pointerEvents: "none",
                                            }}>$</span>
                                            <input
                                                className="ap-input"
                                                style={{ ...S.input, paddingLeft: "26px" }}
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
                                    </div>
                                    <div style={S.fieldGroup}>
                                        <label style={S.label}>Discount (%)</label>
                                        <div style={{ position: "relative" }}>
                                            <input
                                                className="ap-input"
                                                style={{ ...S.input, paddingRight: "28px" }}
                                                type="number"
                                                name="discount"
                                                value={form.discount}
                                                onChange={handleChange}
                                                placeholder="0"
                                                min="0"
                                                max="100"
                                            />
                                            <span style={{
                                                position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)",
                                                fontSize: "13px", color: "rgba(255,255,255,0.25)", pointerEvents: "none",
                                            }}>%</span>
                                        </div>
                                    </div>
                                    <div style={S.fieldGroup}>
                                        <label style={S.label}>
                                            <Layers size={11} style={{ opacity: 0.6 }} />
                                            Stock Qty
                                        </label>
                                        <input
                                            className="ap-input"
                                            style={S.input}
                                            type="number"
                                            name="stock"
                                            value={form.stock}
                                            onChange={handleChange}
                                            placeholder="0"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                {/* Featured toggle */}
                                <label
                                    className="ap-checkbox"
                                    style={{
                                        ...S.checkboxWrap,
                                        ...(form.featured ? { borderColor: "rgba(220,38,38,0.25)", background: "rgba(220,38,38,0.04)" } : {}),
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={form.featured}
                                        onChange={handleChange}
                                        style={{ display: "none" }}
                                    />
                                    <div style={{ ...S.checkboxIcon, ...(form.featured ? S.checkboxIconChecked : {}) }}>
                                        {form.featured && <Star size={11} fill="#dc2626" color="#dc2626" />}
                                    </div>
                                    <div>
                                        <p style={{ ...S.checkboxLabel, ...(form.featured ? S.checkboxLabelChecked : {}) }}>
                                            Featured Product
                                        </p>
                                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "1px" }}>
                                            Appears in homepage spotlight
                                        </p>
                                    </div>
                                </label>

                                {/* Price preview */}
                                {form.price && (
                                    <div style={S.pricePreview}>
                                        <div>
                                            <p style={S.priceLabel}>Original</p>
                                            <p style={{ ...S.priceValue, ...(discountedPrice ? { textDecoration: "line-through", opacity: 0.4, fontSize: "16px" } : {}) }}>
                                                ${parseFloat(form.price || 0).toFixed(2)}
                                            </p>
                                        </div>
                                        {discountedPrice && (
                                            <>
                                                <div style={S.priceDivider} />
                                                <div>
                                                    <p style={S.priceLabel}>After Discount</p>
                                                    <p style={S.priceValueDiscount}>${discountedPrice}</p>
                                                </div>
                                                <div style={S.savingsBadge}>–{form.discount}% OFF</div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Publish */}
                        <div style={S.card} className="ap-card">
                            <div style={S.cardHeader}>
                                <div style={S.cardHeaderIcon}><BarChart2 size={14} /></div>
                                <p style={S.cardHeaderTitle}>Publish</p>
                            </div>
                            <div style={S.cardBody}>
                                <p style={S.publishNote}>
                                    Review all details before publishing. The product will be immediately visible to customers once submitted.
                                </p>

                                {success && (
                                    <div style={S.successBanner}>
                                        <CheckCircle size={16} />
                                        Product published successfully!
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="ap-btn-primary"
                                    style={{ ...S.btnPrimary, ...(loading ? { opacity: 0.75, pointerEvents: "none" } : {}) }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div style={S.spinner} />
                                            Publishing…
                                        </>
                                    ) : (
                                        <>
                                            <PlusSquare size={15} />
                                            Publish Product
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    className="ap-btn-ghost"
                                    style={S.btnGhost}
                                    onClick={() => { setForm(INITIAL_FORM); removeImage(); }}
                                >
                                    <X size={13} />
                                    Reset Form
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ════ RIGHT COLUMN ════ */}
                    <div style={S.rightCol} className="ap-right-col">

                        {/* Image Upload */}
                        <div style={S.card} className="ap-card">
                            <div style={S.cardHeader}>
                                <div style={S.cardHeaderIcon}><Upload size={14} /></div>
                                <p style={S.cardHeaderTitle}>Product Image</p>
                            </div>
                            <div style={S.cardBody}>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImage(e.target.files[0])}
                                />

                                {imagePreview ? (
                                    <div style={S.previewWrap}>
                                        <img src={imagePreview} alt="Preview" style={S.previewImg} />
                                        <div style={S.previewOverlay} />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            style={S.previewRemove}
                                            className="ap-preview-remove"
                                        >
                                            <X size={13} />
                                        </button>
                                        <p style={S.previewFileName}>{image?.name}</p>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className="ap-upload-zone"
                                            style={{ ...S.uploadZone, ...(dragOver ? S.uploadZoneActive : {}) }}
                                            onDrop={handleDrop}
                                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                            onDragLeave={() => setDragOver(false)}
                                            onClick={() => fileRef.current?.click()}
                                        >
                                            <div style={S.uploadIconWrap}>
                                                <ImageOff size={24} />
                                            </div>
                                            <p style={S.uploadTitle}>
                                                <span style={S.uploadAccent}>Click to upload</span> or drag & drop
                                            </p>
                                            <p style={S.uploadSub}>PNG, JPG, WEBP — max 10MB</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="ap-btn-browse"
                                            style={S.btnBrowse}
                                            onClick={() => fileRef.current?.click()}
                                        >
                                            <Upload size={13} />
                                            Browse Files
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Live Preview Card */}
                        <div style={S.card} className="ap-card">
                            <div style={S.cardHeader}>
                                <div style={S.cardHeaderIcon}><Eye size={14} /></div>
                                <p style={S.cardHeaderTitle}>Live Preview</p>
                                <span style={{ ...S.cardHeaderSub, fontSize: "10px" }}>Customer View</span>
                            </div>
                            <div style={{ padding: "12px" }}>
                                <div style={S.livePreview}>
                                    {/* Image area */}
                                    <div style={S.previewCardImg}>
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="preview"
                                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                            />
                                        ) : (
                                            <div className="ap-shimmer" style={{ textAlign: "center" }}>
                                                <Package size={32} color="rgba(220,38,38,0.25)" />
                                                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)", marginTop: "8px" }}>No image</p>
                                            </div>
                                        )}
                                        {form.featured && (
                                            <div style={{
                                                position: "absolute", top: "8px", left: "8px",
                                                padding: "3px 8px", background: "rgba(220,38,38,0.9)",
                                                borderRadius: "5px", fontSize: "10px", fontWeight: "700",
                                                color: "#fff", letterSpacing: "0.06em",
                                                boxShadow: "0 2px 8px rgba(220,38,38,0.4)",
                                            }}>
                                                ★ FEATURED
                                            </div>
                                        )}
                                        {form.discount > 0 && (
                                            <div style={{
                                                position: "absolute", top: "8px", right: "8px",
                                                padding: "3px 8px", background: "rgba(0,0,0,0.8)",
                                                borderRadius: "5px", fontSize: "10px", fontWeight: "700",
                                                color: "#dc2626", letterSpacing: "0.04em", border: "1px solid rgba(220,38,38,0.3)",
                                            }}>
                                                -{form.discount}%
                                            </div>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div style={S.previewCardBody}>
                                        <p style={S.previewCardTitle}>{form.title || <span style={{ color: "rgba(255,255,255,0.18)", fontStyle: "italic" }}>Product title…</span>}</p>
                                        <div style={S.previewCardMeta}>
                                            {form.category && <span style={S.previewCat}>{form.category}</span>}
                                            {form.brand && <span style={S.previewBrand}>{form.brand}</span>}
                                        </div>

                                        <div style={S.previewPriceRow}>
                                            {form.price ? (
                                                <>
                                                    <span style={S.previewPrice}>
                                                        ${discountedPrice ?? parseFloat(form.price).toFixed(2)}
                                                    </span>
                                                    {discountedPrice && (
                                                        <span style={S.previewOriginalPrice}>
                                                            ${parseFloat(form.price).toFixed(2)}
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>Price TBD</span>
                                            )}
                                        </div>

                                        <div style={S.previewBadgesRow}>
                                            {form.stock > 0 && (
                                                <span style={{ ...S.badge, background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}>
                                                    In Stock · {form.stock}
                                                </span>
                                            )}
                                            {form.stock == 0 && form.stock !== "" && (
                                                <span style={{ ...S.badge, background: "rgba(220,38,38,0.1)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" }}>
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </form>
        </div>
    );
}

