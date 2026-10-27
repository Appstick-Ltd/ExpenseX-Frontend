'use client';
import React, { useEffect, useState, useCallback } from "react";
import {
  sendPushNotification,
  getPushNotificationHistory,
  deletePushNotificationRecord,
  getUsers,
  fetchSettings,
  getPushNotificationCountries,
  extractListFromResponse,
} from "../../../../helpers/backend";
import {
  Send,
  Users,
  Globe,
  User,
  Search,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  BellRing,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { ShimmerTableRows } from "../../../../components/common/Shimmer";
import { showSuccessAlert, showErrorToast, showConfirmDialog } from "../../../../helpers/notification";

const WORLD_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica",
  "Croatia", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
  "Estonia", "Ethiopia", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala",
  "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon",
  "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Malta", "Mexico", "Monaco", "Morocco",
  "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Panama",
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia",
  "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Thailand", "Tunisia", "Turkey",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function PushNotificationPage() {
  // Campaign History State
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Composer Form State
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetType, setTargetType] = useState<"all" | "single" | "country">("all");
  const [country, setCountry] = useState("");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Auto-loaded Branding & Data
  const [siteLogo, setSiteLogo] = useState("");
  const [registeredCountries, setRegisteredCountries] = useState<string[]>([]);

  // User Search State for Single User Target
  const [userQuery, setUserQuery] = useState("");
  const [userSearchResults, setUserSearchResults] = useState<any[]>([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Preview Mode
  const [previewPlatform, setPreviewPlatform] = useState<"ios" | "android">("ios");

  // Fetch History
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPushNotificationHistory({
        page,
        limit,
        search: search.trim() || undefined,
        targetType: typeFilter || undefined,
      });

      const parsed = extractListFromResponse(res);
      setCampaigns(parsed.items);
      setTotal(parsed.total);
    } catch (err: any) {
      console.error("Failed to fetch push notification history:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, typeFilter]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Load siteLogo and registered user countries
  useEffect(() => {
    fetchSettings()
      .then((res: any) => {
        const d = res?.data || res;
        if (d?.siteLogo) setSiteLogo(d.siteLogo);
      })
      .catch((err: any) => console.error("Failed to load settings logo", err));

    getPushNotificationCountries()
      .then((res: any) => {
        const list = res?.data || res || [];
        if (Array.isArray(list)) setRegisteredCountries(list);
      })
      .catch((err: any) => console.error("Failed to load registered countries", err));
  }, []);

  // Search users for single target
  useEffect(() => {
    if (targetType !== "single" || !userQuery.trim()) {
      setUserSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await getUsers({ search: userQuery.trim(), limit: 5 });
        const list = extractListFromResponse(res);
        setUserSearchResults(list.items);
        setShowUserDropdown(true);
      } catch (err) {
        console.error("Error searching users:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [userQuery, targetType]);

  // Handle Send Campaign
  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showErrorToast("Please provide a notification title.");
      return;
    }
    if (!message.trim()) {
      showErrorToast("Please provide a message body.");
      return;
    }
    if (targetType === "single" && !selectedUser?._id) {
      showErrorToast("Please select a target user.");
      return;
    }
    if (targetType === "country" && !country.trim()) {
      showErrorToast("Please select a country.");
      return;
    }

    setIsSending(true);
    try {
      const payload: any = {
        title: title.trim(),
        message: message.trim(),
        targetType,
      };

      if (targetType === "single" && selectedUser?._id) payload.userId = selectedUser._id;
      if (targetType === "country" && country.trim()) payload.country = country.trim();

      await sendPushNotification(payload);

      showSuccessAlert(
        "Push notification queued! Delivery is proceeding immediately in the background.",
        "Notification Dispatched"
      );

      // Reset form
      setTitle("");
      setMessage("");
      setSelectedUser(null);
      setUserQuery("");
      setCountry("");

      // Refresh history list
      setTimeout(() => {
        fetchHistory();
      }, 1000);
    } catch (err: any) {
      showErrorToast(err?.message || "Failed to dispatch push notification.");
    } finally {
      setIsSending(false);
    }
  };

  // Handle Delete Campaign
  const handleDeleteCampaign = async (c: any) => {
    const confirmed = await showConfirmDialog({
      title: "Delete Campaign Record?",
      text: `Are you sure you want to delete the record for "${c.title}"?`,
      confirmButtonText: "Yes, delete",
    });

    if (!confirmed) return;

    try {
      await deletePushNotificationRecord(c._id);
      showSuccessAlert("Record deleted successfully.");
      fetchHistory();
    } catch (err: any) {
      showErrorToast(err?.message || "Failed to delete record.");
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 60 }}>
      {/* PAGE HEADER */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, rgba(109,61,245,0.15) 0%, rgba(255,90,54,0.15) 100%)",
                color: "var(--mc-brand-purple)",
              }}
            >
              <BellRing size={18} />
            </span>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--mc-text-main)" }}>
              Marketing & Push Notifications
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "var(--mc-text-muted)" }}>
            Broadcast real-time push notifications to all users, specific countries, or single accounts without holding requests.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => fetchHistory()}
            disabled={loading}
            className="mc-btn mc-btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, padding: "8px 14px" }}
          >
            <RefreshCw size={14} className={loading ? "spin-animate" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* COMPOSER + LIVE PREVIEW GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24, alignItems: "start" }}>
        {/* COMPOSER CARD */}
        <div className="mc-card" style={{ padding: 24, borderRadius: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, borderBottom: "1px solid var(--mc-border)", paddingBottom: 14 }}>
            <Sparkles size={18} color="var(--mc-brand-purple)" />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--mc-text-main)" }}>
              Create Push Notification
            </h3>
          </div>

          <form onSubmit={handleSendCampaign} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* TARGET AUDIENCE SELECTOR */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--mc-text-main)", marginBottom: 8 }}>
                Target Audience <span style={{ color: "var(--mc-danger)" }}>*</span>
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    setTargetType("all");
                    setSelectedUser(null);
                  }}
                  style={{
                    padding: "10px 8px",
                    borderRadius: 8,
                    border: targetType === "all" ? "2px solid var(--mc-brand-purple)" : "1px solid var(--mc-border)",
                    background: targetType === "all" ? "rgba(109,61,245,0.06)" : "#FFFFFF",
                    color: targetType === "all" ? "var(--mc-brand-purple)" : "var(--mc-text-main)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <Users size={16} />
                  <span>All Users</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTargetType("country");
                    setSelectedUser(null);
                  }}
                  style={{
                    padding: "10px 8px",
                    borderRadius: 8,
                    border: targetType === "country" ? "2px solid var(--mc-brand-purple)" : "1px solid var(--mc-border)",
                    background: targetType === "country" ? "rgba(109,61,245,0.06)" : "#FFFFFF",
                    color: targetType === "country" ? "var(--mc-brand-purple)" : "var(--mc-text-main)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <Globe size={16} />
                  <span>By Country</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetType("single")}
                  style={{
                    padding: "10px 8px",
                    borderRadius: 8,
                    border: targetType === "single" ? "2px solid var(--mc-brand-purple)" : "1px solid var(--mc-border)",
                    background: targetType === "single" ? "rgba(109,61,245,0.06)" : "#FFFFFF",
                    color: targetType === "single" ? "var(--mc-brand-purple)" : "var(--mc-text-main)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <User size={16} />
                  <span>Single User</span>
                </button>
              </div>
            </div>

            {/* CONDITIONAL: COUNTRY SELECTOR */}
            {targetType === "country" && (
              <div style={{ background: "#F8FAFC", padding: 14, borderRadius: 10, border: "1px solid var(--mc-border)" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--mc-text-main)", marginBottom: 6 }}>
                  Select Target Country <span style={{ color: "var(--mc-danger)" }}>*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mc-input"
                  style={{
                    width: "100%",
                    fontSize: 13,
                    height: 42,
                    background: "#FFFFFF",
                    cursor: "pointer",
                    borderColor: country ? "var(--mc-brand-purple)" : "var(--mc-border)",
                  }}
                  required
                >
                  <option value="">-- Choose Country --</option>
                  {registeredCountries.length > 0 && (
                    <optgroup label="📍 Countries with Active Users">
                      {registeredCountries.map((c: any) => {
                        const name = typeof c === "string" ? c : (c?.country || String(c));
                        return (
                          <option key={`reg-${name}`} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </optgroup>
                  )}
                  <optgroup label="🌐 All World Countries">
                    {WORLD_COUNTRIES.map((c) => (
                      <option key={`all-${c}`} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            {/* CONDITIONAL: SINGLE USER SELECTOR */}
            {targetType === "single" && (
              <div style={{ position: "relative", background: "#F8FAFC", padding: 12, borderRadius: 8, border: "1px solid var(--mc-border)" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--mc-text-main)", marginBottom: 6 }}>
                  Select Target User
                </label>

                {selectedUser ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: "#FFFFFF",
                      borderRadius: 6,
                      border: "1px solid var(--mc-brand-purple)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--mc-text-main)" }}>
                        {selectedUser.name || "User"}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--mc-text-muted)" }}>
                        {selectedUser.email || selectedUser.phone || selectedUser._id}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUser(null);
                        setUserQuery("");
                      }}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--mc-text-subtle)", padding: 4 }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        placeholder="Search user by name, email or phone..."
                        className="mc-input"
                        style={{ width: "100%", fontSize: 13, paddingLeft: 32 }}
                      />
                      <Search
                        size={14}
                        style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--mc-text-subtle)" }}
                      />
                    </div>

                    {showUserDropdown && userSearchResults.length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 12,
                          right: 12,
                          top: "100%",
                          background: "#FFFFFF",
                          boxShadow: "var(--mc-shadow-lg)",
                          borderRadius: 8,
                          border: "1px solid var(--mc-border)",
                          zIndex: 20,
                          maxHeight: 180,
                          overflowY: "auto",
                          marginTop: 4,
                        }}
                      >
                        {userSearchResults.map((u) => (
                          <div
                            key={u._id}
                            onClick={() => {
                              setSelectedUser(u);
                              setShowUserDropdown(false);
                            }}
                            style={{
                              padding: "8px 12px",
                              borderBottom: "1px solid var(--mc-border-light)",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--mc-text-main)" }}>
                                {u.name || "User"}
                              </div>
                              <div style={{ fontSize: 11, color: "var(--mc-text-muted)" }}>
                                {u.email || u.phone || u._id}
                              </div>
                            </div>
                            {u.country && (
                              <span style={{ fontSize: 10, color: "var(--mc-text-subtle)", padding: "2px 6px", background: "#F1F5F9", borderRadius: 4 }}>
                                {u.country}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* NOTIFICATION TITLE */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--mc-text-main)" }}>
                  Notification Title <span style={{ color: "var(--mc-danger)" }}>*</span>
                </label>
                <span style={{ fontSize: 11, color: title.length > 60 ? "var(--mc-danger)" : "var(--mc-text-subtle)" }}>
                  {title.length}/65
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={70}
                placeholder="e.g. Special Discount for Pro Members 🚀"
                className="mc-input"
                style={{ width: "100%", fontSize: 13 }}
                required
              />
            </div>

            {/* NOTIFICATION MESSAGE */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--mc-text-main)" }}>
                  Notification Body <span style={{ color: "var(--mc-danger)" }}>*</span>
                </label>
                <span style={{ fontSize: 11, color: message.length > 200 ? "var(--mc-danger)" : "var(--mc-text-subtle)" }}>
                  {message.length}/240
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={250}
                rows={3}
                placeholder="Type your notification message body..."
                className="mc-input"
                style={{ width: "100%", fontSize: 13, resize: "vertical" }}
                required
              />
            </div>

            {/* DISPATCH BUTTON */}
            <button
              type="submit"
              disabled={isSending || !title.trim() || !message.trim()}
              className="mc-btn mc-btn-primary"
              style={{
                marginTop: 6,
                padding: "12px 18px",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                borderRadius: 8,
              }}
            >
              <Send size={16} />
              <span>{isSending ? "Sending..." : "Send"}</span>
            </button>
          </form>
        </div>

        {/* SMARTPHONE PUSH NOTIFICATION PREVIEW */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            className="mc-card"
            style={{
              padding: 20,
              borderRadius: 14,
              background: "#FFFFFF",
              border: "1px solid var(--mc-border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Smartphone size={16} color="var(--mc-brand-purple)" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--mc-text-main)" }}>Live Device Preview</span>
              </div>

              {/* iOS / Android Toggle */}
              <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 6, padding: 2 }}>
                <button
                  type="button"
                  onClick={() => setPreviewPlatform("ios")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 5,
                    border: "none",
                    background: previewPlatform === "ios" ? "#FFFFFF" : "transparent",
                    color: previewPlatform === "ios" ? "var(--mc-text-main)" : "var(--mc-text-muted)",
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: "pointer",
                    boxShadow: previewPlatform === "ios" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  iOS
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewPlatform("android")}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 5,
                    border: "none",
                    background: previewPlatform === "android" ? "#FFFFFF" : "transparent",
                    color: previewPlatform === "android" ? "var(--mc-text-main)" : "var(--mc-text-muted)",
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: "pointer",
                    boxShadow: previewPlatform === "android" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  Android
                </button>
              </div>
            </div>

            {/* MOCKUP DISPLAY */}
            <div
              style={{
                background: "linear-gradient(180deg, #1E1B4B 0%, #0F172A 100%)",
                borderRadius: 20,
                padding: "24px 16px 36px 16px",
                boxShadow: "0 20px 40px -10px rgba(15,23,42,0.3)",
                color: "#FFFFFF",
                position: "relative",
                minHeight: 250,
              }}
            >
              {/* STATUS BAR */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, color: "#94A3B8", marginBottom: 20, padding: "0 6px" }}>
                <span>9:41</span>
                <div style={{ width: 60, height: 12, background: "#000000", borderRadius: 10, margin: "0 auto" }} />
                <span>5G · 100%</span>
              </div>

              {/* NOTIFICATION CARD */}
              <div
                style={{
                  background: previewPlatform === "ios" ? "rgba(255, 255, 255, 0.88)" : "#FFFFFF",
                  backdropFilter: previewPlatform === "ios" ? "blur(20px)" : "none",
                  borderRadius: previewPlatform === "ios" ? 16 : 8,
                  padding: 12,
                  color: "#0F172A",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {siteLogo ? (
                      <img
                        src={siteLogo}
                        alt="Logo"
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          objectFit: "contain",
                          background: "#FFFFFF",
                          padding: 1,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          background: "var(--mc-brand-purple)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                          fontWeight: 800,
                          fontSize: 9,
                        }}
                      >
                        X
                      </div>
                    )}
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#1E293B" }}>
                      ExpenseX AI
                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: "#64748B" }}>now</span>
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 2, lineHeight: 1.3 }}>
                  {title.trim() || "Notification Title Preview"}
                </div>

                <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.4, wordBreak: "break-word" }}>
                  {message.trim() || "Type in the composer to view live delivery banner on smartphone."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAMPAIGN HISTORY LOGS TABLE */}
      <div className="mc-card mc-card-table" style={{ borderRadius: 14 }}>
        <div className="mc-table-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--mc-text-main)" }}>
              Push Notification Logs
            </h3>
            <p style={{ margin: "2px 0 0 0", fontSize: 12, color: "var(--mc-text-muted)" }}>
              Stored in <code>push_notification</code> collection · {total} recorded
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search logs..."
                className="mc-input"
                style={{ fontSize: 12, paddingLeft: 28, height: 32 }}
              />
              <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "var(--mc-text-subtle)" }} />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="mc-input"
              style={{ fontSize: 12, height: 32 }}
            >
              <option value="">All Audiences</option>
              <option value="all">Broadcast (All)</option>
              <option value="country">Country</option>
              <option value="single">Single User</option>
            </select>
          </div>
        </div>

        <div className="mc-table-wrap">
          {loading ? (
            <div style={{ padding: 16 }}>
              <ShimmerTableRows rows={5} />
            </div>
          ) : campaigns.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center", color: "var(--mc-text-subtle)" }}>
              <BellRing size={36} style={{ margin: "0 auto 12px auto", opacity: 0.4 }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--mc-text-muted)" }}>
                No push notification records found
              </div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                Send your first marketing push campaign above.
              </div>
            </div>
          ) : (
            <table className="mc-table">
              <thead>
                <tr>
                  <th>Notification</th>
                  <th>Audience</th>
                  <th>Status</th>
                  <th>Sent At</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => {
                  const targetLabel =
                    c.targetType === "all"
                      ? "All Users"
                      : c.targetType === "country"
                      ? `Country: ${c.country || "All"}`
                      : c.targetUser?.name || c.targetUser?.email || "Single User";

                  const badgeClass =
                    c.status === "completed"
                      ? "mc-badge-active"
                      : c.status === "processing"
                      ? "mc-badge-purple"
                      : "mc-badge-tier";

                  return (
                    <tr key={c._id}>
                      <td style={{ maxWidth: 280 }}>
                        <div style={{ fontWeight: 600, color: "var(--mc-text-main)", fontSize: 13, marginBottom: 2 }}>
                          {c.title}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--mc-text-muted)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {c.message}
                        </div>
                      </td>

                      <td>
                        <span
                          className="mc-badge"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 11,
                            padding: "3px 8px",
                            background: c.targetType === "all" ? "#EFF6FF" : c.targetType === "country" ? "#FEF3C7" : "#F3E8FF",
                            color: c.targetType === "all" ? "#1D4ED8" : c.targetType === "country" ? "#B45309" : "#6D28D9",
                          }}
                        >
                          {c.targetType === "all" ? <Users size={12} /> : c.targetType === "country" ? <Globe size={12} /> : <User size={12} />}
                          <span>{targetLabel}</span>
                        </span>
                      </td>

                      <td>
                        <span className={`mc-badge ${badgeClass}`} style={{ fontSize: 11, textTransform: "capitalize" }}>
                          {c.status}
                        </span>
                      </td>

                      <td>
                        <div style={{ fontSize: 11, color: "var(--mc-text-muted)", whiteSpace: "nowrap" }}>
                          {c.createdAt ? new Date(c.createdAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" }) : "-"}
                        </div>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
                          <button
                            onClick={() => handleDeleteCampaign(c)}
                            title="Delete log"
                            style={{
                              background: "none",
                              border: "1px solid var(--mc-border)",
                              borderRadius: 6,
                              padding: "4px 6px",
                              cursor: "pointer",
                              color: "var(--mc-danger)",
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION */}
        {!loading && total > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 18px",
              borderTop: "1px solid var(--mc-border)",
              fontSize: 12,
              color: "var(--mc-text-muted)",
            }}
          >
            <div>
              Showing {campaigns.length} of {total} records
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="mc-btn mc-btn-secondary"
                style={{ padding: "4px 10px", fontSize: 12 }}
              >
                <ChevronLeft size={14} />
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="mc-btn mc-btn-secondary"
                style={{ padding: "4px 10px", fontSize: 12 }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
