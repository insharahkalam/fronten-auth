import { useState, useEffect } from "react";
import { Users as UsersIcon, Search, Trash2, UserX, Shield, User } from "lucide-react";
import toast from "react-hot-toast";
import api from "../config/service";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/allUsers");
      setUsers(res.data.allUser || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    try {
      setSearching(true);
      const found = users.find(
        (u) => u._id === searchId.trim() || u.email === searchId.trim()
      );
      if (found) { setSearchResult(found); }
      else { toast.error("User not found"); setSearchResult(null); }
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => { setSearchId(""); setSearchResult(null); };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await api.delete(`/auth/deleteUser/${id}`);
    } catch {
      // proceed with local removal even on error
    } finally {
      setUsers(prev => prev.filter(u => u._id !== id));
      if (searchResult?._id === id) setSearchResult(null);
      toast.success("User deleted");
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const displayUsers = searchResult ? [searchResult] : users;

  /* ── shared classes ── */
  const card = `relative overflow-hidden bg-white/[0.03] border border-white/[0.07] rounded-2xl
    backdrop-blur transition-all duration-300 hover:border-white/[0.11]`;
  const shimmerLine = `absolute top-0 left-0 right-0 h-px
    bg-gradient-to-r from-transparent via-red-600/35 to-transparent`;
  const inputCls = `w-full bg-white/[0.04] border border-white/[0.08] rounded-xl
    px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-white/20 font-medium
    outline-none transition-all duration-200 focus:border-red-600/50 focus:bg-white/[0.07]
    focus:ring-2 focus:ring-red-600/10 font-['Rajdhani',sans-serif]`;

  return (
    <div className="animate-[fadeIn_.4s_ease_both]">
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* ── Page Header ── */}
      <div className="mb-7">
        <h2 className="font-['Orbitron',monospace] text-[20px] font-bold text-white
          flex items-center gap-3 mb-1.5">
          <UsersIcon size={20} className="text-red-500 drop-shadow-[0_0_6px_rgba(220,38,38,0.7)]" />
          User Management
        </h2>
        <p className="text-[13px] text-white/40">View, search, and manage all registered users</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="flex gap-3.5 mb-6 flex-wrap">
        {[
          { label: "Total Users", value: users.length, icon: UsersIcon },
          { label: "Admins", value: users.filter(u => u.role === "admin").length, icon: Shield },
          { label: "Regular Users", value: users.filter(u => u.role !== "admin").length, icon: User },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className={`${card} flex items-center gap-4 px-5 py-5 flex-[1_1_160px]
            hover:shadow-[0_0_28px_rgba(220,38,38,0.09)] hover:-translate-y-0.5 group`}>
            <span className={shimmerLine} />
            <div className="w-[46px] h-[46px] rounded-xl shrink-0 flex items-center justify-center
              text-red-500 bg-gradient-to-br from-red-600/20 to-red-600/[0.05]
              border border-red-900/40 shadow-[0_0_12px_rgba(220,38,38,0.1)]
              group-hover:shadow-[0_0_18px_rgba(220,38,38,0.2)] transition-all duration-300">
              <Icon size={18} />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.09em] uppercase text-white/40 mb-1">{label}</p>
              <h3 className="font-['Orbitron',monospace] text-[22px] font-bold text-white leading-none">{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search ── */}
      <div className={`${card} p-5 mb-5`}>
        <span className={shimmerLine} />
        <div className="flex items-center gap-2 mb-4">
          <Search size={13} className="text-red-500" />
          <p className="font-['Orbitron',monospace] text-[11px] tracking-[0.12em] uppercase text-white/35">
            Search User by ID or Email
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2.5 items-center flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
              className={`${inputCls} pl-9`}
              type="text"
              placeholder="Enter user ID or email address…"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
            />
          </div>

          <button type="submit" disabled={searching}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-red-600 to-red-700
              hover:from-red-500 hover:to-red-600 rounded-xl text-white text-[13px] font-semibold
              tracking-wide shadow-[0_4px_18px_rgba(220,38,38,0.3)]
              hover:shadow-[0_6px_24px_rgba(220,38,38,0.45)] hover:-translate-y-0.5
              disabled:opacity-60 disabled:pointer-events-none transition-all duration-200
              font-['Rajdhani',sans-serif]">
            {searching ? "Searching…" : "Search"}
          </button>

          {searchResult && (
            <button type="button" onClick={clearSearch}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-transparent
                border border-white/[0.09] rounded-xl text-white/45 text-[13px] font-medium
                hover:text-white/70 hover:border-white/[0.16] hover:bg-white/[0.03]
                transition-all duration-200 font-['Rajdhani',sans-serif]">
              <UserX size={13} /> Clear
            </button>
          )}
        </form>

        {searchResult && (
          <p className="text-[11.5px] text-red-500/80 tracking-[0.05em] mt-3">
            Showing 1 result for "<span className="text-red-400">{searchId}</span>"
          </p>
        )}
      </div>

      {/* ── Users Table ── */}
      <div className={`${card}`}>
        <span className={shimmerLine} />

        {loading ? (
          /* Spinner */
          <div className="flex items-center justify-center py-16">
            <div className="w-9 h-9 border-[3px] border-white/[0.07] border-t-red-600
              rounded-full animate-spin" />
          </div>

        ) : displayUsers.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/25">
            <UserX size={44} className="opacity-30" />
            <p className="text-[14px]">No users found</p>
          </div>

        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-red-900/25">
                  {["S.No", "ID", "Username", "Email", "Role", "Actions"].map(h => (
                    <th key={h}
                      className="px-4 py-3.5 text-left text-[10.5px] tracking-[0.15em]
                        uppercase text-red-500 font-semibold whitespace-nowrap
                        font-['Inter',sans-serif]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayUsers.map((user, idx) => (
                  <tr key={user._id}
                    className="border-b border-white/[0.03] hover:bg-red-950/[0.12] transition-colors duration-150">

                    {/* S.No */}
                    <td className="px-4 py-3 text-[13px] text-white/50">{idx + 1}</td>

                    {/* ID */}
                    <td className="px-4 py-3 font-['Inter',monospace] text-[11px] text-white/30 tracking-wide max-w-[120px] truncate">
                      {user._id}
                    </td>

                    {/* Username */}
                    <td className="px-4 py-3 text-[13.5px] text-white font-medium">{user.username}</td>

                    {/* Email */}
                    <td className="px-4 py-3 text-[13px] text-white/55">{user.email}</td>

                    {/* Role */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full
                        text-[10.5px] font-semibold tracking-[0.06em] uppercase border
                        ${user.role === "admin"
                          ? "bg-red-600/10 text-red-400 border-red-600/25"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}>
                        {user.role === "admin"
                          ? <Shield size={9} className="mr-1" />
                          : <User size={9} className="mr-1" />
                        }
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      {confirmDelete === user._id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={deletingId === user._id}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]
                              font-semibold bg-red-600/10 text-red-400 border border-red-600/25
                              hover:bg-red-600 hover:text-white hover:border-red-600
                              hover:shadow-[0_0_14px_rgba(220,38,38,0.4)]
                              disabled:opacity-50 transition-all duration-200">
                            {deletingId === user._id ? "…" : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px]
                              font-semibold bg-transparent border border-white/[0.08] text-white/40
                              hover:text-white/70 hover:border-white/[0.16] transition-all duration-200">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(user._id)}
                          disabled={user.role === "admin"}
                          title={user.role === "admin" ? "Cannot delete admin" : "Delete user"}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]
                            font-semibold bg-red-600/10 text-red-400 border border-red-600/20
                            hover:bg-red-600 hover:text-white hover:border-red-600
                            hover:shadow-[0_0_14px_rgba(220,38,38,0.35)] hover:-translate-y-px
                            disabled:opacity-25 disabled:cursor-not-allowed
                            transition-all duration-200">
                          <Trash2 size={12} /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}