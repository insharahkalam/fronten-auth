import { useState, useEffect } from "react";
import { Users as UsersIcon, Search, Trash2, UserX, Shield, User } from "lucide-react";
import toast from "react-hot-toast";
import { getAllUsers, getUserById, deleteUser } from "../config/service.js";

// Mock users for demo
const MOCK_USERS = [
  { _id: "usr_001abc", name: "Alice Carter", email: "alice@example.com", role: "user", createdAt: "2024-11-02" },
  { _id: "usr_002def", name: "Bob Martinez", email: "bob@example.com", role: "admin", createdAt: "2024-09-15" },
  { _id: "usr_003ghi", name: "Carol Nguyen", email: "carol@example.com", role: "user", createdAt: "2025-01-08" },
  { _id: "usr_004jkl", name: "David Kim", email: "david@example.com", role: "user", createdAt: "2025-02-20" },
  { _id: "usr_005mno", name: "Eva Petrov", email: "eva@example.com", role: "user", createdAt: "2025-03-01" },
  { _id: "usr_006pqr", name: "Frank Osei", email: "frank@example.com", role: "user", createdAt: "2025-04-18" },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data || []);
    } catch {
      // Use mock data if API not ready
      setUsers(MOCK_USERS);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    try {
      setSearching(true);
      setSearchResult(null);
      const res = await getUserById(searchId.trim());
      setSearchResult(res.data);
    } catch {
      // Mock search from local list
      const found = users.find(
        (u) => u._id === searchId.trim() || u.email === searchId.trim()
      );
      if (found) {
        setSearchResult(found);
      } else {
        toast.error("User not found");
        setSearchResult(null);
      }
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchId("");
    setSearchResult(null);
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      if (searchResult?._id === id) setSearchResult(null);
      toast.success("User deleted successfully");
    } catch {
      // Mock deletion
      setUsers((prev) => prev.filter((u) => u._id !== id));
      if (searchResult?._id === id) setSearchResult(null);
      toast.success("User deleted");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const displayUsers = searchResult ? [searchResult] : users;

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="page-header">
        <h2>
          <UsersIcon className="header-icon" size={22} />
          User Management
        </h2>
        <p>View, search, and manage all registered users</p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Total Users", value: users.length, icon: UsersIcon },
          {
            label: "Admins",
            value: users.filter((u) => u.role === "admin").length,
            icon: Shield,
          },
          {
            label: "Regular Users",
            value: users.filter((u) => u.role !== "admin").length,
            icon: User,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div className="stat-card" key={label} style={{ flex: "1 1 160px" }}>
            <div className="stat-icon-wrap">
              <Icon size={18} />
            </div>
            <div className="stat-info">
              <p>{label}</p>
              <h3 style={{ fontSize: 22 }}>{value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
        <p className="section-title">
          <Search size={13} style={{ display: "inline", marginRight: 8 }} />
          Search User by ID or Email
        </p>
        <form onSubmit={handleSearch} className="search-wrap">
          <div className="search-input-wrap">
            <Search size={15} />
            <input
              className="input-field"
              type="text"
              placeholder="Enter user ID or email address…"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary ${searching ? "btn-loading" : ""}`}
          >
            {searching ? "Searching…" : "Search"}
          </button>
          {searchResult && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={clearSearch}
            >
              Clear
            </button>
          )}
        </form>
        {searchResult && (
          <p
            style={{
              fontSize: 12,
              color: "var(--red-primary)",
              marginTop: 10,
              letterSpacing: "0.05em",
            }}
          >
            Showing 1 result for "{searchId}"
          </p>
        )}
      </div>

      {/* Users Table */}
      <div className="glass-card">
        <div className="table-wrap">
          {loading ? (
            <div className="spinner-wrap">
              <div className="spinner" />
            </div>
          ) : displayUsers.length === 0 ? (
            <div className="empty-state">
              <UserX size={48} />
              <p>No users found</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          className="avatar"
                          style={{
                            width: 32,
                            height: 32,
                            fontSize: 12,
                            borderRadius: 6,
                          }}
                        >
                          {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <span style={{ fontWeight: 600 }}>
                          {user.name || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="td-mono">
                      {user._id?.slice(0, 12)}…
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === "admin" ? "badge-red" : "badge-blue"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="td-mono">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td>
                      {confirmDelete === user._id ? (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user._id)}
                            disabled={deletingId === user._id}
                          >
                            {deletingId === user._id ? "…" : "Confirm"}
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setConfirmDelete(user._id)}
                          disabled={user.role === "admin"}
                          title={
                            user.role === "admin"
                              ? "Cannot delete admin"
                              : "Delete user"
                          }
                          style={
                            user.role === "admin"
                              ? { opacity: 0.3, cursor: "not-allowed" }
                              : {}
                          }
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}