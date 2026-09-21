import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2, Trash2, ChevronDown, X, UtensilsCrossed } from "lucide-react";
import { storage } from "./lib/storage";

const COLORS = {
  ink: "#1C2B2A", paper: "#F6F4EF", panel: "#FFFFFF", teal: "#12433F",
  tealSoft: "#E4EDEA", amber: "#D98A2B", amberSoft: "#FBEBD6", line: "#DDD8CC", danger: "#B3452F",
};

const MENUS_KEY = "menus:semanales";
const DIAS = [
  { id: "lunes", label: "Lunes" },
  { id: "martes", label: "Martes" },
  { id: "miercoles", label: "Miércoles" },
  { id: "jueves", label: "Jueves" },
  { id: "viernes", label: "Viernes" },
];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function fmtDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}`;
}
function getMonday(dateStr) {
  const d = dateStr ? new Date(dateStr + "T00:00:00") : new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}
function addDays(iso, n) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function weekLabel(mondayIso) {
  const friday = addDays(mondayIso, 4);
  return `Semana del ${fmtDate(mondayIso)} al ${fmtDate(friday)}`;
}

async function persistWithRetry(key, value) {
  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await storage.set(key, value);
      return true;
    } catch (e) {
      lastErr = e;
    }
    await new Promise((r) => setTimeout(r, 700));
  }
  throw new Error(`No se pudo sincronizar: ${lastErr?.message || "error de conexión"}.`);
}

export default function MenuSemanal({ onToast }) {
  const [loading, setLoading] = useState(true);
  const [semanas, setSemanas] = useState([]); // array de { id, semanaInicio, platos: { lunes, martes, ... } }
  const [weekStart, setWeekStart] = useState(() => getMonday());
  const [drafts, setDrafts] = useState({ lunes: "", martes: "", miercoles: "", jueves: "", viernes: "" });
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await storage.get(MENUS_KEY);
      if (r?.value) {
        const list = JSON.parse(r.value);
        if (Array.isArray(list)) setSemanas(list);
      }
    } catch (e) {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const semanaActual = useMemo(() => semanas.find((s) => s.semanaInicio === weekStart), [semanas, weekStart]);

  useEffect(() => {
    if (semanaActual) {
      setDrafts({ ...{ lunes: "", martes: "", miercoles: "", jueves: "", viernes: "" }, ...semanaActual.platos });
    } else {
      setDrafts({ lunes: "", martes: "", miercoles: "", jueves: "", viernes: "" });
    }
  }, [weekStart, semanaActual]);

  const persistSemanas = useCallback(
    (next) => {
      setSemanas(next);
      persistWithRetry(MENUS_KEY, JSON.stringify(next)).catch((err) =>
        onToast?.(`El menú quedó guardado en la app, pero no se pudo sincronizar: ${err.message}`, "error")
      );
      return { persisted: true };
    },
    [onToast]
  );

  const guardar = async () => {
    const algunoCompleto = Object.values(drafts).some((v) => v.trim());
    if (!algunoCompleto) {
      onToast?.("Cargá al menos un plato antes de guardar.", "error");
      return;
    }
    setSaving(true);
    try {
      const limpio = Object.fromEntries(Object.entries(drafts).map(([k, v]) => [k, v.trim()]));
      let next;
      if (semanaActual) {
        next = semanas.map((s) => (s.id === semanaActual.id ? { ...s, platos: limpio } : s));
      } else {
        next = [{ id: uid(), semanaInicio: weekStart, platos: limpio }, ...semanas];
      }
      next.sort((a, b) => (a.semanaInicio < b.semanaInicio ? 1 : -1));
      const result = persistSemanas(next);
      onToast?.(result?.persisted ? "Menú de la semana guardado." : "Guardado solo por ahora, revisá la sincronización.", result?.persisted ? "ok" : "error");
    } finally {
      setSaving(false);
    }
  };

  const eliminarSemana = async (id) => {
    const next = semanas.filter((s) => s.id !== id);
    persistSemanas(next);
    setConfirmDelete(null);
    onToast?.("Menú de esa semana eliminado.", "ok");
  };

  const cambiarSemana = (dias) => setWeekStart((prev) => addDays(prev, dias));
  const irAHoy = () => setWeekStart(getMonday());

  const historial = useMemo(() => semanas.filter((s) => s.semanaInicio !== weekStart), [semanas, weekStart]);

  return (
    <div>
      <Section title="Menú de la semana">
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <button onClick={() => cambiarSemana(-7)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${COLORS.line}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={16} />
            </button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{weekLabel(weekStart)}</div>
              {weekStart !== getMonday() && (
                <button onClick={irAHoy} style={{ fontSize: 11, color: COLORS.teal, background: "none", border: "none", fontWeight: 700, marginTop: 2 }}>Ir a esta semana</button>
              )}
            </div>
            <button onClick={() => cambiarSemana(7)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${COLORS.line}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {loading ? (
            <EmptyState icon={Loader2} text="Cargando…" spin />
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {DIAS.map((d) => (
                <label key={d.id} style={{ display: "block" }}>
                  <div style={{ fontSize: 12, color: "#7C7461", fontWeight: 700, marginBottom: 4 }}>{d.label}</div>
                  <input
                    value={drafts[d.id] || ""}
                    onChange={(e) => setDrafts((prev) => ({ ...prev, [d.id]: e.target.value }))}
                    placeholder="Plato principal…"
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14 }}
                  />
                </label>
              ))}
              <button
                onClick={guardar}
                disabled={saving}
                style={{ marginTop: 6, padding: "12px", borderRadius: 10, border: "none", background: COLORS.teal, color: "#fff", fontWeight: 700, fontSize: 14, opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Guardando…" : semanaActual ? "Actualizar menú de la semana" : "Guardar menú de la semana"}
              </button>
            </div>
          )}
        </div>
      </Section>

      <Section title={`Semanas anteriores${historial.length ? ` · ${historial.length}` : ""}`}>
        {historial.length === 0 ? (
          <EmptyState icon={UtensilsCrossed} text="Todavía no guardaste otras semanas." />
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {historial.map((s) => {
              const isOpen = expandedId === s.id;
              return (
                <div key={s.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => setExpandedId(isOpen ? null : s.id)} style={{ width: "100%", padding: "12px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, textAlign: "left" }}>{weekLabel(s.semanaInicio)}</div>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
                      {DIAS.map((d, idx) => (
                        <div key={d.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", fontSize: 13, borderTop: idx === 0 ? "none" : `1px solid ${COLORS.line}` }}>
                          <span style={{ color: "#7C7461", fontWeight: 600 }}>{d.label}</span>
                          <span style={{ fontWeight: 600, textAlign: "right" }}>{s.platos?.[d.id] || "—"}</span>
                        </div>
                      ))}
                      <div style={{ padding: "10px 14px" }}>
                        <button onClick={() => setWeekStart(s.semanaInicio)} style={{ fontSize: 12, color: COLORS.teal, background: "none", border: "none", fontWeight: 700, marginRight: 16 }}>Editar esta semana</button>
                        {confirmDelete === s.id ? (
                          <span style={{ display: "inline-flex", gap: 8 }}>
                            <button onClick={() => eliminarSemana(s.id)} style={{ padding: "6px 10px", borderRadius: 7, border: "none", background: COLORS.danger, color: "#fff", fontWeight: 700, fontSize: 11 }}>Confirmar</button>
                            <button onClick={() => setConfirmDelete(null)} style={{ padding: "6px 10px", borderRadius: 7, border: `1px solid ${COLORS.line}`, background: "#fff", fontSize: 11 }}><X size={12} /></button>
                          </span>
                        ) : (
                          <button onClick={() => setConfirmDelete(s.id)} style={{ fontSize: 12, color: COLORS.danger, background: "none", border: "none", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}><Trash2 size={13} /> Eliminar</button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, color: "#7C7461", marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function EmptyState({ icon: Icon, text, spin }) {
  return (
    <div style={{ padding: "24px 10px", textAlign: "center", color: "#9A937F" }}>
      <Icon size={24} style={{ marginBottom: 8, animation: spin ? "spin 1s linear infinite" : "none" }} />
      <div style={{ fontSize: 13 }}>{text}</div>
      <style>{`@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }`}</style>
    </div>
  );
}
