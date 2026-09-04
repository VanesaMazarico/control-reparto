import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Clock, Users, CalendarDays, DollarSign, Download, CheckCircle2,
  Loader2, Trash2, Plus, X, ArrowRightLeft, QrCode, LogIn, LogOut,
} from "lucide-react";
import { storage } from "./lib/storage";

const COLORS = {
  ink: "#1C2B2A", paper: "#F6F4EF", panel: "#FFFFFF", teal: "#12433F",
  tealSoft: "#E4EDEA", amber: "#D98A2B", amberSoft: "#FBEBD6", line: "#DDD8CC", danger: "#B3452F",
};

const EMP_KEY = "rrhh:empleados";
const FICH_KEY = "rrhh:fichajes";
const LIC_KEY = "rrhh:licencias";
const DEVICE_KEY = "fichaje_empleado_id";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function nowHM() {
  return new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}
function fmtDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
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

/* ============================================================
   PANTALLA PÚBLICA — la que abre el QR (sin login)
   ============================================================ */
export function FicharKiosk() {
  const [loading, setLoading] = useState(true);
  const [empleados, setEmpleados] = useState([]);
  const [fichajes, setFichajes] = useState([]);
  const [empleadoId, setEmpleadoId] = useState(() => localStorage.getItem(DEVICE_KEY) || "");
  const [marcando, setMarcando] = useState(false);
  const [confirmacion, setConfirmacion] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [re, rf] = await Promise.all([storage.get(EMP_KEY), storage.get(FICH_KEY)]);
      setEmpleados(re?.value ? JSON.parse(re.value) : []);
      setFichajes(rf?.value ? JSON.parse(rf.value) : []);
    } catch (e) {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const empleado = empleados.find((e) => e.id === empleadoId);

  const ultimoTipo = useMemo(() => {
    if (!empleadoId) return null;
    const propios = fichajes.filter((f) => f.empleadoId === empleadoId).sort((a, b) => b.timestamp - a.timestamp);
    return propios[0]?.tipo || null;
  }, [fichajes, empleadoId]);

  const proximoTipo = ultimoTipo === "entrada" ? "salida" : "entrada";

  const elegirEmpleado = (id) => {
    localStorage.setItem(DEVICE_KEY, id);
    setEmpleadoId(id);
  };
  const cambiarPersona = () => {
    localStorage.removeItem(DEVICE_KEY);
    setEmpleadoId("");
    setConfirmacion(null);
  };

  const marcar = async () => {
    setMarcando(true);
    try {
      const registro = { id: uid(), empleadoId, tipo: proximoTipo, fecha: todayISO(), hora: nowHM(), timestamp: Date.now() };
      const next = [...fichajes, registro];
      setFichajes(next);
      await persistWithRetry(FICH_KEY, JSON.stringify(next));
      setConfirmacion(registro);
    } catch (e) {
      setConfirmacion({ error: e.message });
    } finally {
      setMarcando(false);
    }
  };

  if (loading) {
    return (
      <Wrap>
        <Loader2 size={30} color={COLORS.teal} style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }`}</style>
      </Wrap>
    );
  }

  if (!empleadoId || !empleado) {
    const activos = empleados.filter((e) => e.activo !== false);
    return (
      <Wrap>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <Clock size={30} color={COLORS.teal} />
          <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8 }}>Registro de entrada y salida</div>
          <div style={{ fontSize: 13, color: "#7C7461", marginTop: 4 }}>¿Quién sos? Elegí tu nombre para vincular este celular.</div>
        </div>
        {activos.length === 0 ? (
          <div style={{ fontSize: 13, color: "#9A937F", textAlign: "center" }}>Todavía no hay empleados cargados. Pedile al administrador que los agregue.</div>
        ) : (
          <div style={{ display: "grid", gap: 8, width: "100%", maxWidth: 340 }}>
            {activos.map((e) => (
              <button key={e.id} onClick={() => elegirEmpleado(e.id)} style={{ padding: "14px", borderRadius: 12, border: `1.5px solid ${COLORS.line}`, background: "#fff", fontSize: 15, fontWeight: 700, color: COLORS.ink }}>
                {e.nombre}
              </button>
            ))}
          </div>
        )}
      </Wrap>
    );
  }

  return (
    <Wrap>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 13, color: "#7C7461" }}>Hola,</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink }}>{empleado.nombre}</div>
      </div>

      {confirmacion && !confirmacion.error && (
        <div style={{ background: COLORS.tealSoft, borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10, maxWidth: 340 }}>
          <CheckCircle2 size={22} color={COLORS.teal} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.teal }}>{confirmacion.tipo === "entrada" ? "Entrada registrada" : "Salida registrada"}</div>
            <div style={{ fontSize: 12, color: "#4E6663" }}>Hoy {fmtDate(confirmacion.fecha)} a las {confirmacion.hora}</div>
          </div>
        </div>
      )}
      {confirmacion?.error && (
        <div style={{ background: "#FBE4E0", borderRadius: 12, padding: "12px 16px", marginBottom: 20, color: COLORS.danger, fontSize: 13, maxWidth: 340 }}>
          No se pudo guardar: {confirmacion.error}
        </div>
      )}

      <button
        onClick={marcar}
        disabled={marcando}
        style={{
          width: 220, height: 220, borderRadius: "50%", border: "none",
          background: proximoTipo === "entrada" ? COLORS.teal : COLORS.amber,
          color: proximoTipo === "entrada" ? "#fff" : "#1C2B2A",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)", opacity: marcando ? 0.7 : 1,
        }}
      >
        {proximoTipo === "entrada" ? <LogIn size={40} /> : <LogOut size={40} />}
        <span style={{ fontSize: 18, fontWeight: 800 }}>{marcando ? "Marcando…" : proximoTipo === "entrada" ? "Marcar entrada" : "Marcar salida"}</span>
      </button>

      <button onClick={cambiarPersona} style={{ marginTop: 26, background: "none", border: "none", color: "#9A937F", fontSize: 12.5, textDecoration: "underline" }}>
        No soy {empleado.nombre} · cambiar
      </button>
    </Wrap>
  );
}

function Wrap({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.paper, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Segoe UI', ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`* { box-sizing: border-box; } button { font-family: inherit; cursor: pointer; }`}</style>
      {children}
    </div>
  );
}
