import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ClipboardList, BarChart3, History, Search, Plus, Minus, Loader2, Trash2,
  ChevronDown, Check, X, AlertCircle, PackageCheck, Lock, LogOut, Settings,
  UserPlus, Eye, EyeOff, ShieldCheck, Package, Utensils, LayoutGrid, Pencil,
} from "lucide-react";
import { storage } from "./lib/storage";

/* ==================== CATÁLOGO ==================== */
const CATALOG = [
  { id: "b0", category: "Congelados", name: "Medialunas", medida: "16 un" },
  { id: "b1", category: "Congelados", name: "Semitas", medida: "20 un" },
  { id: "b2", category: "Congelados", name: "Tortitas", medida: "20 un" },
  { id: "b3", category: "Congelados", name: "Criollitos", medida: "20 un" },
  { id: "b4", category: "Congelados", name: "Rolls de Canela", medida: "6 un" },
  { id: "b5", category: "Congelados", name: "Croissant", medida: "3 un" },
  { id: "b6", category: "Congelados", name: "Frutos Rojos" },
  { id: "b7", category: "Congelados", name: "Frutillas Congeladas" },
  { id: "b8", category: "Bebidas", name: "Limonada" },
  { id: "b9", category: "Bebidas", name: "Bonano" },
  { id: "b10", category: "Bebidas", name: "Coca 1.25l" },
  { id: "b11", category: "Bebidas", name: "Coca Zero 1.25l" },
  { id: "b12", category: "Bebidas", name: "Sprite 1.25l" },
  { id: "b13", category: "Bebidas", name: "Fanta 1.25l" },
  { id: "b14", category: "Bebidas", name: "Coca 500ml" },
  { id: "b15", category: "Bebidas", name: "Coca zero 500ml" },
  { id: "b16", category: "Bebidas", name: "Sprite 500ml" },
  { id: "b17", category: "Bebidas", name: "Fanta 500ml" },
  { id: "b18", category: "Bebidas", name: "Agua Mineral 500ml" },
  { id: "b19", category: "Bebidas", name: "Soda 500ml" },
  { id: "b20", category: "Bebidas", name: "Quilmes clásica 1l" },
  { id: "b21", category: "Bebidas", name: "Quilmes Negra 1l" },
  { id: "b22", category: "Bebidas", name: "Quilmes Ipa 1l" },
  { id: "b23", category: "Bebidas", name: "Stella 1l" },
  { id: "b24", category: "Bebidas", name: "Quilmes clásica 473" },
  { id: "b25", category: "Bebidas", name: "Quilmes Negra 473" },
  { id: "b26", category: "Bebidas", name: "Quilmes Ipa 473" },
  { id: "b27", category: "Bebidas", name: "Stella 473" },
  { id: "b28", category: "Verduras", name: "Cebolla" },
  { id: "b29", category: "Verduras", name: "Cebolla Morada" },
  { id: "b30", category: "Verduras", name: "Pimiento Rojo" },
  { id: "b31", category: "Verduras", name: "Pimiento Verde" },
  { id: "b32", category: "Verduras", name: "Bolsa de papa" },
  { id: "b33", category: "Verduras", name: "Rúcula" },
  { id: "b34", category: "Verduras", name: "Espinaca" },
  { id: "b35", category: "Verduras", name: "Tomate perita" },
  { id: "b36", category: "Verduras", name: "Tomate cherry" },
  { id: "b37", category: "Verduras", name: "Zanahoria" },
  { id: "b38", category: "Verduras", name: "Ajo" },
  { id: "b39", category: "Frutas", name: "Banana" },
  { id: "b40", category: "Frutas", name: "Manzana Roja" },
  { id: "b41", category: "Frutas", name: "Manzana Verde" },
  { id: "b42", category: "Frutas", name: "Palta" },
  { id: "b43", category: "Frutas", name: "Cajón de naranja" },
  { id: "b44", category: "Frutas", name: "Kiwi" },
  { id: "b45", category: "Frutas", name: "Limón" },
  { id: "b46", category: "Lácteos y Fiambres", name: "Leche Entera" },
  { id: "b47", category: "Lácteos y Fiambres", name: "Leche descremada" },
  { id: "b48", category: "Lácteos y Fiambres", name: "Leche Deslactosada" },
  { id: "b49", category: "Lácteos y Fiambres", name: "Leche Condensada" },
  { id: "b50", category: "Lácteos y Fiambres", name: "Queso Crema" },
  { id: "b51", category: "Lácteos y Fiambres", name: "Queso Sardo" },
  { id: "b52", category: "Lácteos y Fiambres", name: "Queso Barra" },
  { id: "b53", category: "Lácteos y Fiambres", name: "Queso Muzzarella" },
  { id: "b54", category: "Lácteos y Fiambres", name: "Jamón Cocido" },
  { id: "b55", category: "Lácteos y Fiambres", name: "Jamón Crudo" },
  { id: "b56", category: "Lácteos y Fiambres", name: "Salame español" },
  { id: "b57", category: "Almacén", name: "Harina 000" },
  { id: "b58", category: "Almacén", name: "Harina 0000" },
  { id: "b59", category: "Almacén", name: "Azúcar xkg" },
  { id: "b60", category: "Almacén", name: "Levadura seca" },
  { id: "b61", category: "Almacén", name: "Salsa de tomate" },
  { id: "b62", category: "Almacén", name: "Puré de tomate" },
  { id: "c0", category: "Artículos de limpieza", name: "Desodorante de piso" },
  { id: "c1", category: "Artículos de limpieza", name: "Detergente" },
  { id: "c2", category: "Artículos de limpieza", name: "Cif" },
  { id: "c3", category: "Artículos de limpieza", name: "Desengrasante" },
  { id: "c4", category: "Artículos de limpieza", name: "Blem" },
  { id: "c5", category: "Artículos de limpieza", name: "Lisoform" },
  { id: "c6", category: "Artículos de limpieza", name: "Esponjas" },
  { id: "c7", category: "Artículos de limpieza", name: "Virulanas" },
  { id: "c8", category: "Artículos de limpieza", name: "Mopa" },
  { id: "c9", category: "Artículos de limpieza", name: "Escoba" },
  { id: "c10", category: "Artículos de limpieza", name: "Pala" },
  { id: "c11", category: "Artículos de limpieza", name: "Trapos de microfibra" },
  { id: "d0", category: "Helados", name: "Bandeja de chocolate" },
  { id: "d1", category: "Helados", name: "Bandeja de americana" },
  { id: "d2", category: "Helados", name: "Bandeja de frutilla" },
  { id: "d3", category: "Helados", name: "Bandeja de dulce de leche" },
  { id: "d4", category: "Helados", name: "Bandeja de Granizado" },
  { id: "d5", category: "Helados", name: "Bocha de chocolate" },
  { id: "d6", category: "Helados", name: "Bocha de americana" },
  { id: "d7", category: "Helados", name: "Bocha de frutilla" },
  { id: "d8", category: "Helados", name: "Bocha de dulce de leche" },
  { id: "d9", category: "Helados", name: "Bocha de Granizado" },
  { id: "e0", category: "Té", name: "Té de tilo", medida: "25 un" },
  { id: "e1", category: "Té", name: "Té mezcla de hierbas naturales", medida: "25 un" },
  { id: "e2", category: "Té", name: "Té negro Classic (Green Hills)", medida: "25 un" },
  { id: "e3", category: "Té", name: "Té de manzanilla", medida: "25 un" },
  { id: "e4", category: "Té", name: "Té de canela", medida: "20 un" },
  { id: "e5", category: "Té", name: "Té de maracuyá", medida: "20 un" },
  { id: "e6", category: "Té", name: "Mate cocido Litoral", medida: "20 un" },
  { id: "e7", category: "Té", name: "Té de frutilla", medida: "20 un" },
  { id: "e8", category: "Té", name: "Té de boldo", medida: "20 un" },
  { id: "e9", category: "Té", name: "Té de limón", medida: "20 un" },
  { id: "e10", category: "Té", name: "Té verde", medida: "20 un" },
  { id: "f0", category: "Bebidas", name: "Gancia" },
  { id: "f1", category: "Bebidas", name: "Gin" },
  { id: "f2", category: "Lácteos y Fiambres", name: "Leche en polvo" },
  { id: "f3", category: "Almacén", name: "Aceto balsámico" },
  { id: "f4", category: "Almacén", name: "Salsa de soja", medida: "1 botella" },
  { id: "f5", category: "Almacén", name: "Alcaparras", medida: "1 frasco" },
  { id: "f6", category: "Almacén", name: "Vinagre de alcohol" },
  { id: "f7", category: "Almacén", name: "Ají molido", medida: "100 g" },
  { id: "f8", category: "Almacén", name: "Pimentón", medida: "100 g" },
  { id: "f9", category: "Almacén", name: "Tomates disecados" },
  { id: "f10", category: "Almacén", name: "Pimienta molida", medida: "100 g" },
  { id: "f11", category: "Almacén", name: "Orégano", medida: "100 g" },
  { id: "f12", category: "Almacén", name: "Provenzal", medida: "100 g" },
  { id: "f13", category: "Almacén", name: "Mix de semillas", medida: "100 g" },
  { id: "f14", category: "Almacén", name: "Caldo de gallina" },
  { id: "f15", category: "Almacén", name: "Caldo de verduras" },
  { id: "f16", category: "Almacén", name: "Caldo de finas hierbas" },
  { id: "f17", category: "Almacén", name: "Sal gruesa", medida: "100 g" },
  { id: "f18", category: "Almacén", name: "Tomillo", medida: "100 g" },
  { id: "f19", category: "Almacén", name: "Levadura fresca" },
  { id: "f20", category: "Almacén", name: "Nuez moscada en polvo", medida: "100 g" },
  { id: "f21", category: "Almacén", name: "Nuez moscada en grano", medida: "100 g" },
  { id: "f22", category: "Almacén", name: "Colorante amarillo", medida: "100 g" },
  { id: "f23", category: "Almacén", name: "Clavo de olor", medida: "100 g" },
  { id: "f24", category: "Almacén", name: "Romero", medida: "100 g" },
  { id: "f25", category: "Almacén", name: "Comino", medida: "100 g" },
  { id: "f26", category: "Almacén", name: "Canela", medida: "100 g" },
  { id: "f27", category: "Almacén", name: "Almidón de maíz" },
  { id: "f28", category: "Almacén", name: "Azúcar en sobre" },
  { id: "f29", category: "Almacén", name: "Edulcorante en sobre" },
  { id: "f30", category: "Almacén", name: "Café en grano" },
  { id: "f31", category: "Almacén", name: "Azúcar impalpable" },
  { id: "f32", category: "Almacén", name: "Lata de durazno" },
  { id: "f33", category: "Almacén", name: "Lata de ananá" },
  { id: "f34", category: "Almacén", name: "Arroz" },
  { id: "f35", category: "Toppings y Postres", name: "Chips de chocolate blanco" },
  { id: "f36", category: "Toppings y Postres", name: "Chips de chocolate negro" },
  { id: "f37", category: "Toppings y Postres", name: "Botones de chocolate" },
  { id: "f38", category: "Toppings y Postres", name: "Bocaditos de frutilla" },
  { id: "f39", category: "Toppings y Postres", name: "Bocaditos Maroc" },
  { id: "f40", category: "Toppings y Postres", name: "Salsa de chocolate" },
  { id: "f41", category: "Toppings y Postres", name: "Salsa de dulce de leche" },
  { id: "f42", category: "Toppings y Postres", name: "Salsa de frutilla" },
  { id: "f43", category: "Toppings y Postres", name: "Salsa de caramelo" },
  { id: "f44", category: "Toppings y Postres", name: "Almíbar", medida: "1 botella" },
  { id: "f45", category: "Toppings y Postres", name: "Sirope de vainilla", medida: "1 botella" },
  { id: "f46", category: "Toppings y Postres", name: "Sirope de caramelo", medida: "1 botella" },
  { id: "f47", category: "Toppings y Postres", name: "Sirope de avellana", medida: "1 botella" },
  { id: "f48", category: "Toppings y Postres", name: "Coco rallado" },
  { id: "f49", category: "Toppings y Postres", name: "Crocante de maní" },
  { id: "f50", category: "Toppings y Postres", name: "Cacao" },
  { id: "f51", category: "Toppings y Postres", name: "Maní salado" },
  { id: "f52", category: "Toppings y Postres", name: "Oreo" },
];

const LOCALES = ["Mi Sándwich", "Bendito", "Cocina"];
const LOCAL_ABBR = { "Mi Sándwich": "MS", "Bendito": "BD", "Cocina": "CO" };
const TURNOS = ["Mañana", "Tarde", "Noche"];
const USERS_KEY = "auth:users";
const CATALOG_KEY = "catalog:custom";
const MEDIDAS_KEY = "catalog:medidas";
const COUNT_KEY = "conteo:sandwiches";
const COUNT_HISTORY_KEY = "conteo:historial";
const VAJILLA_COUNT_KEY = "conteo:vajilla";
const VAJILLA_HISTORY_KEY = "conteo:vajilla:historial";
const UNITS_PER_PLANCHA = 4;
const DEFAULT_ADMIN = { username: "admin", password: "admin1234", role: "admin" };

const SANDWICH_MENU = [
  { id: "s0", category: "Clásicos", name: "Jamón y queso (pan blanco)" },
  { id: "s1", category: "Clásicos", name: "Jamón y queso (pan integral)" },
  { id: "s2", category: "Clásicos", name: "Jamón, tomate y huevo (pan blanco)" },
  { id: "s3", category: "Clásicos", name: "Jamón, tomate y huevo (pan integral)" },
  { id: "s4", category: "Clásicos", name: "Jamón, morrón y huevo" },
  { id: "s5", category: "Clásicos", name: "Jamón y roquefort (pan integral)" },
  { id: "s6", category: "Clásicos", name: "Jamón, tomate y lechuga" },
  { id: "s7", category: "Clásicos", name: "Jamón y ananá" },
  { id: "s8", category: "Clásicos", name: "Queso y atún" },
  { id: "s9", category: "Clásicos", name: "Queso y salame" },
  { id: "s10", category: "Vegetarianos", name: "Queso, choclo y huevo" },
  { id: "s11", category: "Vegetarianos", name: "Queso y aceitunas (pan integral)" },
  { id: "s12", category: "Vegetarianos", name: "Queso, tomate y lechuga" },
  { id: "s13", category: "Vegetarianos", name: "Queso, zanahoria, ricota y huevo (pan integral)" },
  { id: "s14", category: "Especiales", name: "Pollo y queso" },
  { id: "s15", category: "Especiales", name: "Jamón crudo y queso" },
  { id: "s16", category: "Especiales", name: "Jamón, palmitos y salsa golf" },
  { id: "s17", category: "Especiales", name: "Queso, palta, tomate y huevo" },
  { id: "s18", category: "Especiales", name: "Queso, lomo, roquefort y tomate" },
  { id: "s19", category: "Especiales", name: "Queso, peceto, tomate y mayo de ajo" },
  { id: "s20", category: "Especiales", name: "Vitel toné" },
  { id: "s21", category: "Especiales", name: "Milanesa, jamón, queso, tomate, lechuga" },
];
const SANDWICH_CATEGORIES = [...new Set(SANDWICH_MENU.map((s) => s.category))];

const VAJILLA_MENU = [
  { id: "v0", category: "Platos y tuppers", name: "Tuppers" },
  { id: "v1", category: "Platos y tuppers", name: "Platos chicos" },
  { id: "v2", category: "Platos y tuppers", name: "Platos rectangulares grandes" },
  { id: "v3", category: "Platos y tuppers", name: "Platos negros" },
  { id: "v4", category: "Platos y tuppers", name: "Platos cuadrados chicos" },
  { id: "v5", category: "Platos y tuppers", name: "Platos cuadrados grandes" },
  { id: "v6", category: "Platos y tuppers", name: "Plato redondo cerámica/porcelana" },
  { id: "v7", category: "Platos y tuppers", name: "Platos de comida" },
  { id: "v8", category: "Platos y tuppers", name: "Platos de papa" },
  { id: "v9", category: "Cubiertos", name: "Cuchillos" },
  { id: "v10", category: "Cubiertos", name: "Tenedores" },
  { id: "v11", category: "Cubiertos", name: "Tenedor dorado" },
  { id: "v12", category: "Cubiertos", name: "Cuchillo dorado" },
  { id: "v13", category: "Cubiertos", name: "Cucharas soperas" },
  { id: "v14", category: "Cubiertos", name: "Cucharas largas" },
  { id: "v15", category: "Cubiertos", name: "Cucharitas chicas" },
  { id: "v16", category: "Cubiertos", name: "Trinches" },
  { id: "v17", category: "Cubiertos", name: "Cucharas negras chicas" },
  { id: "v18", category: "Cubiertos", name: "Cuchara sopera dorada" },
  { id: "v19", category: "Cubiertos", name: "Cuchara dorada" },
  { id: "v20", category: "Cubiertos", name: "Cuchara medidora" },
  { id: "v21", category: "Cubiertos", name: "Cucharas medidoras" },
  { id: "v22", category: "Cubiertos", name: "Cuchara para tragos" },
  { id: "v23", category: "Utensilios de cocina", name: "Flaneras" },
  { id: "v24", category: "Utensilios de cocina", name: "Espátulas" },
  { id: "v25", category: "Utensilios de cocina", name: "Espátula azul" },
  { id: "v26", category: "Utensilios de cocina", name: "Espátula para pizza" },
  { id: "v27", category: "Utensilios de cocina", name: "Untadores" },
  { id: "v28", category: "Utensilios de cocina", name: "Pinceles" },
  { id: "v29", category: "Utensilios de cocina", name: "Ralladores" },
  { id: "v30", category: "Utensilios de cocina", name: "Coladores" },
  { id: "v31", category: "Utensilios de cocina", name: "Martillo" },
  { id: "v32", category: "Utensilios de cocina", name: "Medidor de tragos" },
  { id: "v33", category: "Utensilios de cocina", name: "Cajas de acero" },
  { id: "v34", category: "Utensilios de cocina", name: "Tablas de picar" },
  { id: "v35", category: "Utensilios de cocina", name: "Tabla de cortar" },
  { id: "v36", category: "Utensilios de cocina", name: "Prensa francesa" },
  { id: "v37", category: "Utensilios de cocina", name: "Cocteleras" },
  { id: "v38", category: "Utensilios de cocina", name: "Conservadora" },
  { id: "v39", category: "Ollas y sartenes", name: "Ollas" },
  { id: "v40", category: "Ollas y sartenes", name: "Paelleras" },
  { id: "v41", category: "Ollas y sartenes", name: "Sartenes" },
  { id: "v42", category: "Ollas y sartenes", name: "Asaderas" },
  { id: "v43", category: "Jarras, vasos y copas", name: "Jarras de vidrio" },
  { id: "v44", category: "Jarras, vasos y copas", name: "Jarras de plástico" },
  { id: "v45", category: "Jarras, vasos y copas", name: "Copas de vino" },
  { id: "v46", category: "Jarras, vasos y copas", name: "Copas de licuado" },
  { id: "v47", category: "Jarras, vasos y copas", name: "Copas de submarino" },
  { id: "v48", category: "Jarras, vasos y copas", name: "Copas de ensalada" },
  { id: "v49", category: "Jarras, vasos y copas", name: "Copa de trago" },
  { id: "v50", category: "Jarras, vasos y copas", name: "Vasos de jugo" },
  { id: "v51", category: "Jarras, vasos y copas", name: "Vasos de plástico" },
  { id: "v52", category: "Jarras, vasos y copas", name: "Vasos Ice Latte" },
  { id: "v53", category: "Jarras, vasos y copas", name: "Vasos bomba" },
  { id: "v54", category: "Jarras, vasos y copas", name: "Chop cervecero" },
  { id: "v55", category: "Jarras, vasos y copas", name: "Sodines" },
  { id: "v56", category: "Jarras, vasos y copas", name: "Dips" },
  { id: "v57", category: "Jarras, vasos y copas", name: "Fraperas" },
  { id: "v58", category: "Jarras, vasos y copas", name: "Pintas" },
  { id: "v59", category: "Jarras, vasos y copas", name: "Frascos chicos" },
  { id: "v60", category: "Tazas", name: "Tazas vaca chicas" },
  { id: "v61", category: "Tazas", name: "Tazas chicas" },
  { id: "v62", category: "Tazas", name: "Tazas medianas" },
  { id: "v63", category: "Tazas", name: "Tazas grandes" },
  { id: "v64", category: "Tazas", name: "Tazas extra grandes" },
  { id: "v65", category: "Tazas", name: "Tazas negras" },
  { id: "v66", category: "Otros", name: "Posatorta" },
  { id: "v67", category: "Otros", name: "Azucarera" },
  { id: "v68", category: "Otros", name: "Cremera" },
  { id: "v69", category: "Otros", name: "Exhibidoras de brunch" },
  { id: "v70", category: "Otros", name: "Alcuzas" },
  { id: "v71", category: "Otros", name: "Saleros" },
];
const VAJILLA_CATEGORIES = [...new Set(VAJILLA_MENU.map((v) => v.category))];

function computeConteoTotals(data) {
  const totalsById = {};
  let grandTotal = 0;
  for (const s of SANDWICH_MENU) {
    const findings = (data && data[s.id]) || [];
    const totalUnidades = findings.reduce((sum, f) => sum + (Number(f.planchas) || 0) * UNITS_PER_PLANCHA + (Number(f.unidades) || 0), 0);
    const planchas = Math.floor(totalUnidades / UNITS_PER_PLANCHA);
    const unidades = totalUnidades % UNITS_PER_PLANCHA;
    totalsById[s.id] = { totalUnidades, planchas, unidades, findings };
    grandTotal += totalUnidades;
  }
  return { totalsById, grandTotal };
}

function computeVajillaTotals(data) {
  const totalsById = {};
  let grandTotal = 0;
  for (const v of VAJILLA_MENU) {
    const findings = (data && data[v.id]) || [];
    const total = findings.reduce((sum, f) => sum + (Number(f.cantidad) || 0), 0);
    totalsById[v.id] = { total, findings };
    grandTotal += total;
  }
  return { totalsById, grandTotal };
}

const COLORS = {
  ink: "#1C2B2A", paper: "#F6F4EF", panel: "#FFFFFF", teal: "#12433F",
  tealSoft: "#E4EDEA", amber: "#D98A2B", amberSoft: "#FBEBD6", line: "#DDD8CC", danger: "#B3452F",
};

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function todayISO() {
  return new Date().toISOString().slice(0, 10);
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

/* ==================== APP ==================== */
export default function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [authUsers, setAuthUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [seededNotice, setSeededNotice] = useState(false);

  const [tab, setTab] = useState("cargar");
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);
  const [customArticles, setCustomArticles] = useState([]);
  const [medidasOverrides, setMedidasOverrides] = useState({});
  const [conteo, setConteo] = useState({});
  const [conteoHistorial, setConteoHistorial] = useState([]);
  const [vajillaConteo, setVajillaConteo] = useState({});
  const [vajillaHistorial, setVajillaHistorial] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, kind = "ok") => {
    const key = uid();
    setToast({ msg, kind, key });
    if (kind !== "error") {
      setTimeout(() => setToast((c) => (c?.key === key ? null : c)), 3200);
    }
  }, []);

  const loadAuthUsers = useCallback(async () => {
    setAuthLoading(true);
    try {
      let list = null;
      try {
        const r = await storage.get(USERS_KEY);
        if (r?.value) list = JSON.parse(r.value);
      } catch (e) { list = null; }
      if (!list || !Array.isArray(list) || list.length === 0) {
        list = [DEFAULT_ADMIN];
        await storage.set(USERS_KEY, JSON.stringify(list));
        setSeededNotice(true);
      }
      setAuthUsers(list);

      const savedUsername = localStorage.getItem("session_username");
      if (savedUsername) {
        const match = list.find((u) => u.username === savedUsername);
        if (match) setCurrentUser({ username: match.username, role: match.role });
      }
    } catch (e) {
      setAuthUsers([DEFAULT_ADMIN]);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const loadCustomArticles = useCallback(async () => {
    try {
      const r = await storage.get(CATALOG_KEY);
      if (r?.value) {
        const list = JSON.parse(r.value);
        if (Array.isArray(list)) setCustomArticles(list);
      }
    } catch (e) {}
  }, []);

  const loadMedidas = useCallback(async () => {
    try {
      const r = await storage.get(MEDIDAS_KEY);
      if (r?.value) {
        const obj = JSON.parse(r.value);
        if (obj && typeof obj === "object") setMedidasOverrides(obj);
      }
    } catch (e) {}
  }, []);

  const loadConteo = useCallback(async () => {
    try {
      const r = await storage.get(COUNT_KEY);
      if (r?.value) setConteo(JSON.parse(r.value));
    } catch (e) {}
  }, []);
  const loadConteoHistorial = useCallback(async () => {
    try {
      const r = await storage.get(COUNT_HISTORY_KEY);
      if (r?.value) setConteoHistorial(JSON.parse(r.value));
    } catch (e) {}
  }, []);
  const loadVajillaConteo = useCallback(async () => {
    try {
      const r = await storage.get(VAJILLA_COUNT_KEY);
      if (r?.value) setVajillaConteo(JSON.parse(r.value));
    } catch (e) {}
  }, []);
  const loadVajillaHistorial = useCallback(async () => {
    try {
      const r = await storage.get(VAJILLA_HISTORY_KEY);
      if (r?.value) setVajillaHistorial(JSON.parse(r.value));
    } catch (e) {}
  }, []);

  useEffect(() => {
    loadAuthUsers();
    loadCustomArticles();
    loadMedidas();
    loadConteo();
    loadConteoHistorial();
    loadVajillaConteo();
    loadVajillaHistorial();
  }, []);

  const handleLogin = (username, password, remember) => {
    setAuthError(null);
    const uname = username.trim();
    const pwd = password.trim();
    const u = authUsers.find((x) => x.username.toLowerCase() === uname.toLowerCase() && x.password === pwd);
    if (!u) { setAuthError("Usuario o contraseña incorrectos."); return; }
    setCurrentUser({ username: u.username, role: u.role });
    setTab("cargar");
    if (remember) localStorage.setItem("session_username", u.username);
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setTab("cargar");
    localStorage.removeItem("session_username");
  };

  const persistUsers = useCallback((list) => {
    setAuthUsers(list);
    persistWithRetry(USERS_KEY, JSON.stringify(list)).catch((err) =>
      showToast(`Los usuarios quedaron guardados, pero no se pudo sincronizar: ${err.message}`, "error")
    );
  }, [showToast]);

  const addUser = useCallback(async (username, password, role) => {
    const uname = username.trim();
    if (!uname || !password) throw new Error("Faltan datos");
    if (authUsers.some((u) => u.username.toLowerCase() === uname.toLowerCase())) throw new Error("Ese usuario ya existe");
    persistUsers([...authUsers, { username: uname, password, role }]);
    return { persisted: true };
  }, [authUsers, persistUsers]);

  const deleteUser = useCallback(async (username) => {
    const next = authUsers.filter((u) => u.username !== username);
    if (next.length === 0) throw new Error("Tiene que quedar al menos un usuario");
    persistUsers(next);
  }, [authUsers, persistUsers]);

  const persistCustomArticles = useCallback((list) => {
    setCustomArticles(list);
    persistWithRetry(CATALOG_KEY, JSON.stringify(list)).catch((err) =>
      showToast(`El catálogo quedó actualizado, pero no se pudo sincronizar: ${err.message}`, "error")
    );
    return { persisted: true };
  }, [showToast]);

  const addProduct = useCallback(async (name, category, medida) => {
    const cleanName = name.trim();
    const cleanCategory = category.trim();
    if (!cleanName || !cleanCategory) throw new Error("Faltan datos");
    if ([...CATALOG, ...customArticles].some((a) => a.name.toLowerCase() === cleanName.toLowerCase() && a.category.toLowerCase() === cleanCategory.toLowerCase())) {
      throw new Error("Ese producto ya existe en esa categoría");
    }
    const newItem = { id: `c_${uid()}`, category: cleanCategory, name: cleanName };
    if (medida && medida.trim()) newItem.medida = medida.trim();
    return persistCustomArticles([...customArticles, newItem]);
  }, [customArticles, persistCustomArticles]);

  const deleteProduct = useCallback(async (id) => {
    return persistCustomArticles(customArticles.filter((a) => a.id !== id));
  }, [customArticles, persistCustomArticles]);

  const persistMedidas = useCallback((next) => {
    setMedidasOverrides(next);
    persistWithRetry(MEDIDAS_KEY, JSON.stringify(next)).catch((err) =>
      showToast(`La medida quedó guardada, pero no se pudo sincronizar: ${err.message}`, "error")
    );
    return { persisted: true };
  }, [showToast]);

  const setMedida = useCallback(async (id, medida) => {
    const next = { ...medidasOverrides };
    const clean = (medida || "").trim();
    if (clean) next[id] = clean; else delete next[id];
    return persistMedidas(next);
  }, [medidasOverrides, persistMedidas]);

  const fullCatalog = useMemo(() => {
    return [...CATALOG, ...customArticles].map((a) =>
      medidasOverrides[a.id] !== undefined ? { ...a, medida: medidasOverrides[a.id] } : a
    );
  }, [customArticles, medidasOverrides]);
  const fullCategories = useMemo(() => [...new Set(fullCatalog.map((a) => a.category))], [fullCatalog]);

  const loadPedidos = useCallback(async () => {
    setLoadingPedidos(true);
    try {
      const listRes = await storage.list("pedido:");
      const keys = listRes?.keys || [];
      const results = [];
      for (const k of keys) {
        try {
          const r = await storage.get(k);
          if (r?.value) results.push(JSON.parse(r.value));
        } catch (e) {}
      }
      results.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setPedidos(results);
    } catch (e) {
      showToast("No se pudieron cargar los pedidos guardados.", "error");
    } finally {
      setLoadingPedidos(false);
    }
  }, [showToast]);

  useEffect(() => { if (currentUser) loadPedidos(); }, [currentUser, loadPedidos]);

  const savePedido = useCallback((record) => {
    setPedidos((prev) => [record, ...prev]);
    persistWithRetry(`pedido:${record.id}`, JSON.stringify(record)).catch((err) =>
      showToast(`El pedido de "${record.local}" quedó guardado, pero no se pudo sincronizar: ${err.message}`, "error")
    );
  }, [showToast]);

  const updatePedido = useCallback((id, items) => {
    const record = pedidos.find((p) => p.id === id);
    if (!record) throw new Error("Pedido no encontrado");
    const updated = { ...record, items };
    setPedidos((prev) => prev.map((p) => (p.id === id ? updated : p)));
    persistWithRetry(`pedido:${id}`, JSON.stringify(updated)).catch((err) =>
      showToast(`Los cambios quedaron guardados, pero no se pudieron sincronizar: ${err.message}`, "error")
    );
  }, [pedidos, showToast]);

  const deletePedido = useCallback((id) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
    storage.delete(`pedido:${id}`).catch(() => showToast("No se pudo sincronizar el borrado.", "error"));
  }, [showToast]);

  const totals = useMemo(() => {
    const byArticle = {};
    for (const a of fullCatalog) {
      byArticle[a.name + "|" + a.category] = { category: a.category, name: a.name, "Mi Sándwich": 0, "Bendito": 0, "Cocina": 0 };
    }
    for (const p of pedidos) {
      for (const it of p.items || []) {
        const key = it.name + "|" + it.category;
        if (!byArticle[key]) byArticle[key] = { category: it.category, name: it.name, "Mi Sándwich": 0, "Bendito": 0, "Cocina": 0 };
        if (LOCALES.includes(p.local)) {
          const cantidad = it.entregado ?? it.qty;
          byArticle[key][p.local] += Number(cantidad) || 0;
        }
      }
    }
    return Object.values(byArticle);
  }, [pedidos, fullCatalog]);

  const persistConteo = useCallback((next) => {
    setConteo(next);
    persistWithRetry(COUNT_KEY, JSON.stringify(next)).catch((err) =>
      showToast(`El conteo quedó guardado, pero no se pudo sincronizar: ${err.message}`, "error")
    );
    return { persisted: true };
  }, [showToast]);
  const addFinding = useCallback(async (id, planchas, unidades) => {
    const next = { ...conteo };
    const list = next[id] ? [...next[id]] : [];
    list.push({ id: uid(), planchas: Math.max(0, Math.floor(planchas) || 0), unidades: Math.max(0, Math.floor(unidades) || 0) });
    next[id] = list;
    return persistConteo(next);
  }, [conteo, persistConteo]);
  const deleteFinding = useCallback(async (id, findingId) => {
    const next = { ...conteo };
    next[id] = (next[id] || []).filter((f) => f.id !== findingId);
    return persistConteo(next);
  }, [conteo, persistConteo]);
  const resetConteo = useCallback(async () => {
    const { totalsById, grandTotal } = computeConteoTotals(conteo);
    const snapshot = {
      id: uid(), fecha: todayISO(), timestamp: Date.now(), grandTotal,
      totals: Object.fromEntries(Object.entries(totalsById).filter(([, t]) => t.totalUnidades > 0).map(([sid, t]) => [sid, { planchas: t.planchas, unidades: t.unidades, totalUnidades: t.totalUnidades }])),
    };
    const nextHistorial = [snapshot, ...conteoHistorial];
    setConteoHistorial(nextHistorial);
    persistWithRetry(COUNT_HISTORY_KEY, JSON.stringify(nextHistorial)).catch((err) =>
      showToast(`El historial quedó guardado, pero no se pudo sincronizar: ${err.message}`, "error")
    );
    return persistConteo({});
  }, [conteo, conteoHistorial, persistConteo, showToast]);

  const persistVajillaConteo = useCallback((next) => {
    setVajillaConteo(next);
    persistWithRetry(VAJILLA_COUNT_KEY, JSON.stringify(next)).catch((err) =>
      showToast(`El conteo de vajilla quedó guardado, pero no se pudo sincronizar: ${err.message}`, "error")
    );
    return { persisted: true };
  }, [showToast]);
  const addVajillaFinding = useCallback(async (id, cantidad) => {
    const next = { ...vajillaConteo };
    const list = next[id] ? [...next[id]] : [];
    list.push({ id: uid(), cantidad: Math.max(0, Math.floor(cantidad) || 0) });
    next[id] = list;
    return persistVajillaConteo(next);
  }, [vajillaConteo, persistVajillaConteo]);
  const deleteVajillaFinding = useCallback(async (id, findingId) => {
    const next = { ...vajillaConteo };
    next[id] = (next[id] || []).filter((f) => f.id !== findingId);
    return persistVajillaConteo(next);
  }, [vajillaConteo, persistVajillaConteo]);
  const resetVajillaConteo = useCallback(async () => {
    const { totalsById, grandTotal } = computeVajillaTotals(vajillaConteo);
    const snapshot = {
      id: uid(), fecha: todayISO(), timestamp: Date.now(), grandTotal,
      totals: Object.fromEntries(Object.entries(totalsById).filter(([, t]) => t.total > 0).map(([iid, t]) => [iid, { total: t.total }])),
    };
    const nextHistorial = [snapshot, ...vajillaHistorial];
    setVajillaHistorial(nextHistorial);
    persistWithRetry(VAJILLA_HISTORY_KEY, JSON.stringify(nextHistorial)).catch((err) =>
      showToast(`El historial quedó guardado, pero no se pudo sincronizar: ${err.message}`, "error")
    );
    return persistVajillaConteo({});
  }, [vajillaConteo, vajillaHistorial, persistVajillaConteo, showToast]);

  const isAdmin = currentUser?.role === "admin";
  const isOperador = currentUser?.role === "operador";
  const canViewAll = currentUser?.role === "admin" || currentUser?.role === "encargado";

  const misPedidos = useMemo(
    () => (currentUser ? pedidos.filter((p) => p.creadoPor === currentUser.username) : []),
    [pedidos, currentUser]
  );

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.paper, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', ui-sans-serif, system-ui, sans-serif" }}>
        <Loader2 size={28} color={COLORS.teal} style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }`}</style>
      </div>
    );
  }
  if (!currentUser) return <LoginScreen onLogin={handleLogin} error={authError} seededNotice={seededNotice} />;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.paper, fontFamily: "'Segoe UI', ui-sans-serif, system-ui, sans-serif", color: COLORS.ink }}>
      <style>{`
        * { box-sizing: border-box; }
        button { font-family: inherit; cursor: pointer; }
        input, select { font-family: inherit; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>
      <Header username={currentUser.username} role={currentUser.role} onLogout={handleLogout} />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 14px 90px" }}>
        {tab === "cargar" && <CargarPedido onSave={savePedido} onToast={showToast} catalog={fullCatalog} categories={fullCategories} username={currentUser.username} />}
        {tab === "mispedidos" && isOperador && <MisPedidos pedidos={misPedidos} loading={loadingPedidos} />}
        {tab === "conteo" && (
          <ConteoSandwiches conteo={conteo} historial={conteoHistorial} onAddFinding={addFinding} onDeleteFinding={deleteFinding} onReset={resetConteo} onToast={showToast} />
        )}
        {tab === "totales" && canViewAll && <Totales totals={totals} loading={loadingPedidos} pedidos={pedidos} />}
        {tab === "historial" && canViewAll && <Historial pedidos={pedidos} loading={loadingPedidos} onDelete={deletePedido} onUpdate={updatePedido} onToast={showToast} />}
        {tab === "productos" && canViewAll && (
          <ProductosManager catalog={fullCatalog} categories={fullCategories} customArticles={customArticles} onAdd={addProduct} onDelete={deleteProduct} onSetMedida={setMedida} onToast={showToast} />
        )}
        {tab === "vajilla" && canViewAll && (
          <ConteoVajilla conteo={vajillaConteo} historial={vajillaHistorial} onAddFinding={addVajillaFinding} onDeleteFinding={deleteVajillaFinding} onReset={resetVajillaConteo} onToast={showToast} />
        )}
        {tab === "ajustes" && isAdmin && (
          <AjustesUsuarios users={authUsers} currentUsername={currentUser.username} onAdd={addUser} onDelete={deleteUser} onToast={showToast} />
        )}
      </div>
      <TabBar tab={tab} setTab={setTab} isAdmin={isAdmin} isOperador={isOperador} canViewAll={canViewAll} />
      {toast && (
        <div key={toast.key} style={{ position: "fixed", left: "50%", bottom: 78, transform: "translateX(-50%)", background: toast.kind === "error" ? COLORS.danger : COLORS.teal, color: "#fff", padding: "10px 14px 10px 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, boxShadow: "0 6px 18px rgba(0,0,0,0.18)", zIndex: 50, display: "flex", alignItems: "flex-start", gap: 8, maxWidth: "92%" }}>
          {toast.kind === "error" ? <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} /> : <Check size={16} style={{ flexShrink: 0, marginTop: 2 }} />}
          <span style={{ flex: 1 }}>{toast.msg}</span>
          {toast.kind === "error" && (
            <button onClick={() => setToast(null)} style={{ background: "none", border: "none", color: "#fff", flexShrink: 0, padding: 0, marginTop: 1 }}><X size={16} /></button>
          )}
        </div>
      )}
    </div>
  );
}

/* ==================== LOGIN ==================== */
function LoginScreen({ onLogin, error, seededNotice }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const submit = () => onLogin(username, password, remember);
  const handleKeyDown = (e) => { if (e.key === "Enter") submit(); };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.teal, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Segoe UI', ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`* { box-sizing: border-box; } button { font-family: inherit; cursor: pointer; } input { font-family: inherit; }`}</style>
      <div style={{ width: "100%", maxWidth: 360, background: COLORS.panel, borderRadius: 16, padding: 26, boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: COLORS.amber, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <Lock size={26} color="#1C2B2A" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.ink }}>Control de reparto</div>
          <div style={{ fontSize: 12, color: "#7C7461", marginTop: 2 }}>Ingresá con tu usuario y contraseña</div>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          <label style={{ fontSize: 12, color: "#7C7461", fontWeight: 600 }}>
            Usuario
            <input autoFocus value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} placeholder="usuario" autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck="false" style={{ display: "block", width: "100%", marginTop: 4, padding: "10px 12px", borderRadius: 9, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
          </label>
          <label style={{ fontSize: 12, color: "#7C7461", fontWeight: 600 }}>
            Contraseña
            <div style={{ position: "relative", marginTop: 4 }}>
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} placeholder="••••••••" autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck="false" style={{ display: "block", width: "100%", padding: "10px 40px 10px 12px", borderRadius: 9, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
              <button type="button" onClick={() => setShowPw((v) => !v)} style={{ position: "absolute", right: 8, top: 8, background: "none", border: "none", color: "#9A937F" }}>{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </label>
          {error && <div style={{ color: COLORS.danger, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><AlertCircle size={15} /> {error}</div>}
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#7C7461", fontWeight: 600, cursor: "pointer" }}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ width: 16, height: 16 }} />
            Recordarme en este dispositivo
          </label>
          <button onClick={submit} style={{ marginTop: 4, padding: "12px", borderRadius: 10, border: "none", background: COLORS.teal, color: "#fff", fontWeight: 700, fontSize: 14 }}>Ingresar</button>
        </div>
        {seededNotice && (
          <div style={{ marginTop: 16, padding: "10px 12px", borderRadius: 9, background: COLORS.amberSoft, fontSize: 12, color: "#7C4A12", display: "flex", gap: 8 }}>
            <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Se creó un usuario administrador por defecto: <b>admin</b> / <b>admin1234</b>. Cambialo desde Ajustes.</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==================== HEADER / TABBAR / SECTION ==================== */
function Header({ username, role, onLogout }) {
  return (
    <div style={{ background: COLORS.teal, color: "#fff", padding: "22px 16px 26px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: COLORS.amber, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <PackageCheck size={20} color="#1C2B2A" />
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.75, fontWeight: 600 }}>Control de reparto</div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.2 }}>Stock por local</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{username}</div>
            <div style={{ fontSize: 10, opacity: 0.75, textTransform: "uppercase" }}>{role === "admin" ? "Admin" : role === "encargado" ? "Encargado" : "Operador"}</div>
          </div>
          <button onClick={onLogout} title="Cerrar sesión" style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TabBar({ tab, setTab, isAdmin, isOperador, canViewAll }) {
  const items = [{ id: "cargar", label: "Cargar", icon: ClipboardList }];
  if (isOperador) items.push({ id: "mispedidos", label: "Mis pedidos", icon: History });
  items.push({ id: "conteo", label: "Conteo", icon: Utensils });
  if (canViewAll) {
    items.push({ id: "totales", label: "Totales", icon: BarChart3 });
    items.push({ id: "historial", label: "Historial", icon: History });
    items.push({ id: "productos", label: "Productos", icon: Package });
    items.push({ id: "vajilla", label: "Vajilla", icon: LayoutGrid });
  }
  if (isAdmin) items.push({ id: "ajustes", label: "Ajustes", icon: Settings });
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: COLORS.panel, borderTop: `1px solid ${COLORS.line}`, display: "flex", justifyContent: "space-around", padding: "8px 4px calc(8px + env(safe-area-inset-bottom))", zIndex: 40, overflowX: "auto" }}>
      {items.map(({ id, label, icon: Icon }) => {
        const active = tab === id;
        return (
          <button key={id} onClick={() => setTab(id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "transparent", border: "none", padding: "6px 10px", color: active ? COLORS.teal : "#8A8578", fontWeight: active ? 700 : 500, fontSize: 11, flexShrink: 0 }}>
            <Icon size={19} strokeWidth={active ? 2.4 : 2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function Section({ title, children, right }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, color: "#7C7461" }}>{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

/* ==================== CARGAR PEDIDO ==================== */
function CargarPedido({ onSave, onToast, catalog, categories, username }) {
  const [local, setLocal] = useState(LOCALES[0]);
  const [fecha, setFecha] = useState(todayISO());
  const [turno, setTurno] = useState(TURNOS[0]);
  const [qtys, setQtys] = useState({});
  const [search, setSearch] = useState("");
  const [openCats, setOpenCats] = useState(() => new Set([categories[0]]));
  const [saving, setSaving] = useState(false);

  const setQty = (id, val) => {
    const n = Math.max(0, Math.floor(Number(val) || 0));
    setQtys((prev) => { const next = { ...prev }; if (n === 0) delete next[id]; else next[id] = n; return next; });
  };
  const toggleCat = (cat) => {
    setOpenCats((prev) => { const next = new Set(prev); if (next.has(cat)) next.delete(cat); else next.add(cat); return next; });
  };
  const filteredCatalog = useMemo(() => {
    if (!search.trim()) return catalog;
    const q = search.trim().toLowerCase();
    return catalog.filter((a) => a.name.toLowerCase().includes(q));
  }, [search, catalog]);
  const itemCount = Object.keys(qtys).length;

  const handleSave = async () => {
    if (itemCount === 0) { onToast("Agregá al menos un artículo con cantidad antes de guardar.", "error"); return; }
    setSaving(true);
    try {
      const items = Object.entries(qtys).map(([id, qty]) => {
        const a = catalog.find((c) => c.id === id);
        return { category: a.category, name: a.name, qty, entregado: qty, motivo: "" };
      });
      const record = { id: uid(), local, fecha, turno, timestamp: Date.now(), items, creadoPor: username };
      await onSave(record);
      setQtys({});
      onToast(`Pedido guardado para ${local} (${items.length} artículos).`, "ok");
    } catch (e) {
      onToast(e?.message || "No se pudo guardar el pedido.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Section title="Datos de la entrega">
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 14, display: "grid", gap: 10 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {LOCALES.map((l) => (
              <button key={l} onClick={() => setLocal(l)} style={{ flex: 1, padding: "10px 6px", borderRadius: 9, border: `1.5px solid ${local === l ? COLORS.teal : COLORS.line}`, background: local === l ? COLORS.teal : "#fff", color: local === l ? "#fff" : COLORS.ink, fontWeight: 700, fontSize: 13 }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <label style={{ flex: 1, fontSize: 12, color: "#7C7461", fontWeight: 600 }}>
              Fecha
              <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ display: "block", width: "100%", marginTop: 4, padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
            </label>
            <label style={{ flex: 1, fontSize: 12, color: "#7C7461", fontWeight: 600 }}>
              Turno
              <select value={turno} onChange={(e) => setTurno(e.target.value)} style={{ display: "block", width: "100%", marginTop: 4, padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14, background: "#fff" }}>
                {TURNOS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
          </div>
        </div>
      </Section>

      <Section title={`Artículos${itemCount ? ` · ${itemCount} seleccionados` : ""}`} right={itemCount > 0 && (
        <button onClick={() => setQtys({})} style={{ fontSize: 12, color: COLORS.danger, background: "none", border: "none", fontWeight: 700 }}>Vaciar</button>
      )}>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <Search size={16} style={{ position: "absolute", left: 10, top: 11, color: "#9A937F" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar artículo…" style={{ width: "100%", padding: "9px 10px 9px 32px", borderRadius: 9, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
        </div>
        {categories.map((cat) => {
          const list = filteredCatalog.filter((a) => a.category === cat);
          if (list.length === 0) return null;
          const isOpen = openCats.has(cat) || !!search.trim();
          const catCount = list.filter((a) => qtys[a.id]).length;
          return (
            <div key={cat} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, marginBottom: 8, overflow: "hidden" }}>
              <button onClick={() => toggleCat(cat)} style={{ width: "100%", padding: "11px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "transparent", border: "none", fontWeight: 700, fontSize: 13 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {cat}
                  {catCount > 0 && <span style={{ background: COLORS.amberSoft, color: COLORS.amber, fontSize: 11, padding: "2px 7px", borderRadius: 20, fontWeight: 700 }}>{catCount}</span>}
                </span>
                <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
              </button>
              {isOpen && (
                <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
                  {list.map((a) => <ArticleRow key={a.id} article={a} qty={qtys[a.id] || 0} setQty={(v) => setQty(a.id, v)} />)}
                </div>
              )}
            </div>
          );
        })}
      </Section>
      <button onClick={handleSave} disabled={saving} style={{ position: "sticky", bottom: 74, width: "100%", marginTop: 16, padding: "14px", borderRadius: 12, border: "none", background: COLORS.teal, color: "#fff", fontWeight: 700, fontSize: 15, boxShadow: "0 6px 16px rgba(18,67,63,0.28)", opacity: saving ? 0.7 : 1 }}>
        {saving ? "Guardando…" : `Guardar pedido (${itemCount})`}
      </button>
    </div>
  );
}

function ArticleRow({ article, qty, setQty }) {
  const active = qty > 0;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderBottom: `1px solid ${COLORS.line}`, background: active ? COLORS.amberSoft : "transparent" }}>
      <span style={{ fontSize: 13.5, color: COLORS.ink, flex: 1, marginRight: 8 }}>
        {article.name}
        {article.medida && <span style={{ display: "block", fontSize: 10.5, color: "#9A937F", fontWeight: 400 }}>x {article.medida} por unidad</span>}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button onClick={() => setQty(Math.max(0, qty - 1))} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${COLORS.line}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={14} /></button>
        <input type="number" min="0" value={qty || ""} placeholder="0" onChange={(e) => setQty(e.target.value)} style={{ width: 40, textAlign: "center", padding: "5px 2px", borderRadius: 7, border: `1px solid ${COLORS.line}`, fontSize: 14, fontWeight: 700 }} />
        <button onClick={() => setQty(qty + 1)} style={{ width: 28, height: 28, borderRadius: 7, border: "none", background: COLORS.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={14} /></button>
      </div>
    </div>
  );
}

/* ==================== MIS PEDIDOS (operador, solo lectura) ==================== */
function MisPedidos({ pedidos, loading }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div>
      <Section title={`Mis pedidos${pedidos.length ? ` · ${pedidos.length}` : ""}`}>
        {loading ? <EmptyState icon={Loader2} text="Cargando…" spin /> : pedidos.length === 0 ? (
          <EmptyState icon={History} text="Todavía no cargaste ningún pedido." />
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {pedidos.map((p) => {
              const isOpen = expanded === p.id;
              const totalEntregado = (p.items || []).reduce((s, it) => s + (Number(it.entregado ?? it.qty) || 0), 0);
              const totalPedido = (p.items || []).reduce((s, it) => s + (Number(it.qty) || 0), 0);
              const hayDiferencia = totalEntregado !== totalPedido;
              return (
                <div key={p.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => setExpanded(isOpen ? null : p.id)} style={{ width: "100%", padding: "12px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none" }}>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.local}</div>
                      <div style={{ fontSize: 12, color: "#7C7461" }}>{fmtDate(p.fecha)} · {p.turno} · {(p.items || []).length} artículos{hayDiferencia && <span style={{ color: COLORS.amber, fontWeight: 700 }}> · con ajustes del depósito</span>}</div>
                    </div>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${COLORS.line}`, padding: "6px 0" }}>
                      {(p.items || []).map((it, idx) => {
                        const entregado = it.entregado ?? it.qty;
                        const changed = Number(entregado) !== Number(it.qty);
                        return (
                          <div key={idx} style={{ padding: "7px 14px", borderBottom: idx === (p.items || []).length - 1 ? "none" : `1px solid ${COLORS.line}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                              <span>{it.name} <span style={{ color: "#9A937F", fontSize: 11 }}>· {it.category}</span></span>
                              <span style={{ fontWeight: 700 }}>Pedido: {it.qty}</span>
                            </div>
                            {changed && <div style={{ fontSize: 11.5, color: COLORS.amber, marginTop: 3, display: "flex", gap: 6, alignItems: "flex-start" }}><AlertCircle size={13} style={{ flexShrink: 0, marginTop: 1 }} /><span>Entregado: <b>{entregado}</b> · Motivo: {it.motivo || "sin especificar"}</span></div>}
                          </div>
                        );
                      })}
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

/* ==================== TOTALES ==================== */
function Totales({ totals, loading, pedidos }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search.trim()) return totals;
    const q = search.trim().toLowerCase();
    return totals.filter((t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }, [totals, search]);
  const grandTotals = useMemo(() => {
    const g = { "Mi Sándwich": 0, "Bendito": 0, "Cocina": 0 };
    for (const t of totals) { g["Mi Sándwich"] += t["Mi Sándwich"]; g["Bendito"] += t["Bendito"]; g["Cocina"] += t["Cocina"]; }
    return g;
  }, [totals]);
  const onlyWithMovement = filtered.filter((t) => t["Mi Sándwich"] || t["Bendito"] || t["Cocina"]);

  return (
    <div>
      <Section title="Total entregado por local">
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {LOCALES.map((l) => (
            <div key={l} style={{ flex: 1, background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#7C7461", fontWeight: 700, textTransform: "uppercase" }}>{l}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.teal }}>{grandTotals[l]}</div>
              <div style={{ fontSize: 10, color: "#9A937F" }}>unidades</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Detalle por artículo">
        <div style={{ position: "relative", marginBottom: 10 }}>
          <Search size={16} style={{ position: "absolute", left: 10, top: 11, color: "#9A937F" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar artículo o categoría…" style={{ width: "100%", padding: "9px 10px 9px 32px", borderRadius: 9, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
        </div>
        {loading ? <EmptyState icon={Loader2} text="Cargando totales…" spin /> : onlyWithMovement.length === 0 ? (
          <EmptyState icon={BarChart3} text={pedidos.length === 0 ? "Todavía no hay pedidos cargados." : "No hay artículos que coincidan con la búsqueda."} />
        ) : (
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 46px 46px 46px", padding: "8px 12px", background: COLORS.tealSoft, fontSize: 11, fontWeight: 700, color: COLORS.teal, textTransform: "uppercase" }}>
              <span>Artículo</span><span style={{ textAlign: "center" }}>{LOCAL_ABBR[LOCALES[0]]}</span><span style={{ textAlign: "center" }}>{LOCAL_ABBR[LOCALES[1]]}</span><span style={{ textAlign: "center" }}>{LOCAL_ABBR[LOCALES[2]]}</span>
            </div>
            {onlyWithMovement.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name)).map((t, i) => (
              <div key={t.category + t.name + i} style={{ display: "grid", gridTemplateColumns: "1fr 46px 46px 46px", padding: "8px 12px", borderTop: `1px solid ${COLORS.line}`, fontSize: 13, alignItems: "center" }}>
                <span>{t.name}<div style={{ fontSize: 10, color: "#9A937F" }}>{t.category}</div></span>
                <span style={{ textAlign: "center", fontWeight: t["Mi Sándwich"] ? 700 : 400, color: t["Mi Sándwich"] ? COLORS.ink : "#C7C1B2" }}>{t["Mi Sándwich"] || "–"}</span>
                <span style={{ textAlign: "center", fontWeight: t["Bendito"] ? 700 : 400, color: t["Bendito"] ? COLORS.ink : "#C7C1B2" }}>{t["Bendito"] || "–"}</span>
                <span style={{ textAlign: "center", fontWeight: t["Cocina"] ? 700 : 400, color: t["Cocina"] ? COLORS.ink : "#C7C1B2" }}>{t["Cocina"] || "–"}</span>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

/* ==================== HISTORIAL (con filtros) ==================== */
function Historial({ pedidos, loading, onDelete, onUpdate, onToast }) {
  const [expanded, setExpanded] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editItems, setEditItems] = useState([]);
  const [saving, setSaving] = useState(false);

  const [filterLocal, setFilterLocal] = useState("Todos");
  const [filterProducto, setFilterProducto] = useState("");
  const [dateMode, setDateMode] = useState("todos");
  const [filterDia, setFilterDia] = useState("");
  const [filterMes, setFilterMes] = useState("");
  const [filterDesde, setFilterDesde] = useState("");
  const [filterHasta, setFilterHasta] = useState("");

  const filteredPedidos = useMemo(() => {
    return pedidos.filter((p) => {
      if (filterLocal !== "Todos" && p.local !== filterLocal) return false;
      if (filterProducto.trim()) {
        const q = filterProducto.trim().toLowerCase();
        const hasProduct = (p.items || []).some((it) => it.name.toLowerCase().includes(q));
        if (!hasProduct) return false;
      }
      if (dateMode === "dia" && filterDia) {
        if (p.fecha !== filterDia) return false;
      } else if (dateMode === "mes" && filterMes) {
        if (!p.fecha || !p.fecha.startsWith(filterMes)) return false;
      } else if (dateMode === "rango") {
        if (filterDesde && p.fecha < filterDesde) return false;
        if (filterHasta && p.fecha > filterHasta) return false;
      }
      return true;
    });
  }, [pedidos, filterLocal, filterProducto, dateMode, filterDia, filterMes, filterDesde, filterHasta]);

  const filtersActive = filterLocal !== "Todos" || filterProducto.trim() || dateMode !== "todos";
  const clearFilters = () => {
    setFilterLocal("Todos"); setFilterProducto(""); setDateMode("todos");
    setFilterDia(""); setFilterMes(""); setFilterDesde(""); setFilterHasta("");
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditItems((p.items || []).map((it) => ({ category: it.category, name: it.name, qty: it.qty, entregado: it.entregado ?? it.qty, motivo: it.motivo || "" })));
  };
  const cancelEdit = () => { setEditingId(null); setEditItems([]); };
  const updateEditItem = (idx, field, value) => setEditItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));

  const saveEdit = async (pedidoId) => {
    const missingMotivo = editItems.some((it) => Number(it.entregado) !== Number(it.qty) && !it.motivo.trim());
    if (missingMotivo) { onToast("Agregá el motivo en los artículos donde cambiaste la cantidad entregada.", "error"); return; }
    setSaving(true);
    try {
      const cleaned = editItems.map((it) => ({ category: it.category, name: it.name, qty: it.qty, entregado: Math.max(0, Math.floor(Number(it.entregado) || 0)), motivo: Number(it.entregado) !== Number(it.qty) ? it.motivo.trim() : "" }));
      await onUpdate(pedidoId, cleaned);
      onToast("Entrega actualizada.", "ok");
      setEditingId(null); setEditItems([]);
    } catch (err) {
      onToast(err.message || "No se pudo guardar los cambios.", "error");
    } finally { setSaving(false); }
  };

  return (
    <div>
      <Section title="Filtros" right={filtersActive && (
        <button onClick={clearFilters} style={{ fontSize: 12, color: COLORS.danger, background: "none", border: "none", fontWeight: 700 }}>Limpiar filtros</button>
      )}>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 14, display: "grid", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#7C7461", fontWeight: 600, marginBottom: 6 }}>Local</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Todos", ...LOCALES].map((l) => (
                <button key={l} onClick={() => setFilterLocal(l)} style={{ padding: "6px 12px", borderRadius: 20, border: `1.5px solid ${filterLocal === l ? COLORS.teal : COLORS.line}`, background: filterLocal === l ? COLORS.teal : "#fff", color: filterLocal === l ? "#fff" : COLORS.ink, fontSize: 12, fontWeight: 700 }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#7C7461", fontWeight: 600, marginBottom: 6 }}>Producto</div>
            <div style={{ position: "relative" }}>
              <Search size={15} style={{ position: "absolute", left: 9, top: 10, color: "#9A937F" }} />
              <input value={filterProducto} onChange={(e) => setFilterProducto(e.target.value)} placeholder="Buscar por producto…" style={{ width: "100%", padding: "8px 9px 8px 30px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13 }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#7C7461", fontWeight: 600, marginBottom: 6 }}>Fecha</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              {[["todos", "Todas"], ["dia", "Día"], ["mes", "Mes"], ["rango", "Rango"]].map(([id, label]) => (
                <button key={id} onClick={() => setDateMode(id)} style={{ padding: "6px 12px", borderRadius: 20, border: `1.5px solid ${dateMode === id ? COLORS.teal : COLORS.line}`, background: dateMode === id ? COLORS.teal : "#fff", color: dateMode === id ? "#fff" : COLORS.ink, fontSize: 12, fontWeight: 700 }}>{label}</button>
              ))}
            </div>
            {dateMode === "dia" && <input type="date" value={filterDia} onChange={(e) => setFilterDia(e.target.value)} style={{ padding: "8px 9px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13 }} />}
            {dateMode === "mes" && <input type="month" value={filterMes} onChange={(e) => setFilterMes(e.target.value)} style={{ padding: "8px 9px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13 }} />}
            {dateMode === "rango" && (
              <div style={{ display: "flex", gap: 8 }}>
                <input type="date" value={filterDesde} onChange={(e) => setFilterDesde(e.target.value)} style={{ flex: 1, padding: "8px 9px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13 }} />
                <input type="date" value={filterHasta} onChange={(e) => setFilterHasta(e.target.value)} style={{ flex: 1, padding: "8px 9px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 13 }} />
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section title={`Pedidos${filtersActive ? " filtrados" : " cargados"}${filteredPedidos.length ? ` · ${filteredPedidos.length}` : ""}`}>
        {loading ? <EmptyState icon={Loader2} text="Cargando historial…" spin /> : filteredPedidos.length === 0 ? (
          <EmptyState icon={History} text={pedidos.length === 0 ? "Todavía no se cargó ningún pedido." : "No hay pedidos que coincidan con los filtros."} />
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {filteredPedidos.map((p) => {
              const isOpen = expanded === p.id;
              const isEditing = editingId === p.id;
              const totalPedido = (p.items || []).reduce((s, it) => s + (Number(it.qty) || 0), 0);
              const totalEntregado = (p.items || []).reduce((s, it) => s + (Number(it.entregado ?? it.qty) || 0), 0);
              const hayDiferencia = totalEntregado !== totalPedido;
              return (
                <div key={p.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => setExpanded(isOpen ? null : p.id)} style={{ width: "100%", padding: "12px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none" }}>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.local}</div>
                      <div style={{ fontSize: 12, color: "#7C7461" }}>{fmtDate(p.fecha)} · {p.turno} · {(p.items || []).length} artículos · {totalEntregado} un.{hayDiferencia && <span style={{ color: COLORS.amber, fontWeight: 700 }}> · con ajustes</span>}{p.creadoPor && <span style={{ color: "#9A937F" }}> · por {p.creadoPor}</span>}</div>
                    </div>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
                      {!isEditing ? (
                        <div style={{ padding: "6px 0" }}>
                          {(p.items || []).map((it, idx) => {
                            const entregado = it.entregado ?? it.qty;
                            const changed = Number(entregado) !== Number(it.qty);
                            return (
                              <div key={idx} style={{ padding: "7px 14px", borderBottom: idx === (p.items || []).length - 1 ? "none" : `1px solid ${COLORS.line}` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                  <span>{it.name} <span style={{ color: "#9A937F", fontSize: 11 }}>· {it.category}</span></span>
                                  <span style={{ fontWeight: 700 }}>Pedido: {it.qty}</span>
                                </div>
                                {changed && <div style={{ fontSize: 11.5, color: COLORS.amber, marginTop: 3, display: "flex", gap: 6, alignItems: "flex-start" }}><AlertCircle size={13} style={{ flexShrink: 0, marginTop: 1 }} /><span>Entregado: <b>{entregado}</b> · Motivo: {it.motivo || "sin especificar"}</span></div>}
                              </div>
                            );
                          })}
                          <div style={{ padding: "10px 14px 4px", display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                            <button onClick={() => startEdit(p)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: COLORS.teal, fontSize: 12, fontWeight: 700, padding: "4px 0" }}><ClipboardList size={14} /> Editar entrega</button>
                            {confirmDelete === p.id ? (
                              <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={async () => { await onDelete(p.id); setConfirmDelete(null); onToast("Pedido eliminado.", "ok"); }} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: COLORS.danger, color: "#fff", fontWeight: 700, fontSize: 12 }}>Confirmar eliminación</button>
                                <button onClick={() => setConfirmDelete(null)} style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, background: "#fff", fontSize: 12, fontWeight: 700 }}><X size={14} /></button>
                              </div>
                            ) : (
                              <button onClick={() => setConfirmDelete(p.id)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: COLORS.danger, fontSize: 12, fontWeight: 700, padding: "4px 0" }}><Trash2 size={14} /> Eliminar pedido</button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ padding: "10px 14px 0", fontSize: 12, color: "#7C7461" }}>Ajustá la cantidad realmente entregada. Si difiere de lo pedido, contá el motivo.</div>
                          {editItems.map((it, idx) => {
                            const changed = Number(it.entregado) !== Number(it.qty);
                            return (
                              <div key={idx} style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.line}` }}>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{it.name} <span style={{ color: "#9A937F", fontSize: 11, fontWeight: 400 }}>· {it.category}</span></div>
                                <div style={{ fontSize: 11.5, color: "#7C7461", margin: "3px 0 6px" }}>Pedido: {it.qty}</div>
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                  <input type="number" min="0" value={it.entregado} onChange={(e) => updateEditItem(idx, "entregado", e.target.value)} style={{ width: 64, padding: "7px 8px", borderRadius: 7, border: `1px solid ${changed ? COLORS.amber : COLORS.line}`, fontSize: 13, fontWeight: 700, textAlign: "center" }} />
                                  <input type="text" value={it.motivo} onChange={(e) => updateEditItem(idx, "motivo", e.target.value)} placeholder={changed ? "Motivo del cambio (obligatorio)" : "Motivo (si cambia la cantidad)"} style={{ flex: 1, padding: "7px 9px", borderRadius: 7, border: `1px solid ${changed && !it.motivo.trim() ? COLORS.danger : COLORS.line}`, fontSize: 13 }} />
                                </div>
                              </div>
                            );
                          })}
                          <div style={{ display: "flex", gap: 8, padding: "12px 14px" }}>
                            <button onClick={() => saveEdit(p.id)} disabled={saving} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: COLORS.teal, color: "#fff", fontWeight: 700, fontSize: 13, opacity: saving ? 0.7 : 1 }}>{saving ? "Guardando…" : "Guardar cambios"}</button>
                            <button onClick={cancelEdit} disabled={saving} style={{ padding: "10px 16px", borderRadius: 8, border: `1px solid ${COLORS.line}`, background: "#fff", fontSize: 13, fontWeight: 700 }}>Cancelar</button>
                          </div>
                        </div>
                      )}
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

/* ==================== PRODUCTOS (agregar + medidas) ==================== */
function ProductosManager({ catalog, categories, customArticles, onAdd, onDelete, onSetMedida, onToast }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0] || "");
  const [newCategory, setNewCategory] = useState("");
  const [usingNewCategory, setUsingNewCategory] = useState(false);
  const [medida, setMedidaInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [medidaSearch, setMedidaSearch] = useState("");
  const [editingMedidaId, setEditingMedidaId] = useState(null);
  const [medidaEditValue, setMedidaEditValue] = useState("");
  const [savingMedida, setSavingMedida] = useState(false);

  const submit = async () => {
    const finalCategory = usingNewCategory ? newCategory : category;
    if (!name.trim() || !finalCategory.trim()) { onToast("Completá el nombre y la categoría del producto.", "error"); return; }
    setSaving(true);
    try {
      const result = await onAdd(name, finalCategory, medida);
      setName(""); setMedidaInput("");
      if (usingNewCategory) { setCategory(finalCategory.trim()); setUsingNewCategory(false); setNewCategory(""); }
      onToast(result?.persisted ? `Producto "${name.trim()}" agregado a "${finalCategory.trim()}".` : "Producto agregado solo por ahora, revisá la sincronización.", result?.persisted ? "ok" : "error");
    } catch (err) {
      onToast(err.message || "No se pudo agregar el producto.", "error");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id, label) => {
    try {
      const result = await onDelete(id);
      setConfirmDelete(null);
      onToast(result?.persisted ? `"${label}" eliminado.` : "No se pudo confirmar el borrado permanente.", result?.persisted ? "ok" : "error");
    } catch (err) { onToast(err.message || "No se pudo eliminar.", "error"); }
  };

  const groupedCustom = useMemo(() => {
    const g = {};
    for (const a of customArticles) { if (!g[a.category]) g[a.category] = []; g[a.category].push(a); }
    return g;
  }, [customArticles]);

  const filteredForMedida = useMemo(() => {
    const q = medidaSearch.trim().toLowerCase();
    return [...catalog].filter((a) => !q || a.name.toLowerCase().includes(q)).sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, [catalog, medidaSearch]);

  const startEditMedida = (item) => { setEditingMedidaId(item.id); setMedidaEditValue(item.medida || ""); };
  const saveEditMedida = async (id) => {
    setSavingMedida(true);
    try {
      const result = await onSetMedida(id, medidaEditValue);
      setEditingMedidaId(null);
      onToast(result?.persisted ? "Medida actualizada." : "Se guardó solo para esta sesión, revisá la sincronización.", result?.persisted ? "ok" : "error");
    } catch (err) {
      onToast(err.message || "No se pudo guardar la medida.", "error");
    } finally { setSavingMedida(false); }
  };

  return (
    <div>
      <Section title="Agregar producto nuevo">
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Package size={16} /> Nuevo artículo del catálogo</div>
          <div style={{ display: "grid", gap: 10 }}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del producto" style={{ padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
            {!usingNewCategory ? (
              <div style={{ display: "grid", gap: 6 }}>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14, background: "#fff" }}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={() => setUsingNewCategory(true)} style={{ textAlign: "left", background: "none", border: "none", color: COLORS.teal, fontSize: 12, fontWeight: 700, padding: "2px 0" }}>+ Crear una categoría nueva</button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 6 }}>
                <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Nombre de la categoría nueva" style={{ padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
                <button onClick={() => { setUsingNewCategory(false); setNewCategory(""); }} style={{ textAlign: "left", background: "none", border: "none", color: "#7C7461", fontSize: 12, fontWeight: 700, padding: "2px 0" }}>Usar una categoría existente</button>
              </div>
            )}
            <input value={medida} onChange={(e) => setMedidaInput(e.target.value)} placeholder="Unidad de medida (opcional, ej: 16 un, 1 botella, 100 g)" style={{ padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
            <button onClick={submit} disabled={saving} style={{ padding: "10px", borderRadius: 9, border: "none", background: COLORS.amber, color: "#1C2B2A", fontWeight: 700, fontSize: 13, opacity: saving ? 0.7 : 1 }}>{saving ? "Guardando…" : "Agregar producto"}</button>
          </div>
        </div>
      </Section>

      <Section title="Unidad de medida de los productos">
        <div style={{ fontSize: 12, color: "#9A937F", marginBottom: 8 }}>
          Buscá cualquier producto (del catálogo base o agregado por vos) y ponele o cambiale la medida — se va a ver debajo del nombre al cargar pedidos.
        </div>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <Search size={16} style={{ position: "absolute", left: 10, top: 11, color: "#9A937F" }} />
          <input value={medidaSearch} onChange={(e) => setMedidaSearch(e.target.value)} placeholder="Buscar producto…" style={{ width: "100%", padding: "9px 10px 9px 32px", borderRadius: 9, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
        </div>
        {medidaSearch.trim() === "" ? (
          <div style={{ fontSize: 12.5, color: "#9A937F", padding: "10px 2px" }}>Escribí para buscar entre los {catalog.length} productos del catálogo.</div>
        ) : filteredForMedida.length === 0 ? (
          <EmptyState icon={Search} text="No hay productos que coincidan." />
        ) : (
          <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
            {filteredForMedida.slice(0, 40).map((item, i) => {
              const isEditing = editingMedidaId === item.id;
              return (
                <div key={item.id} style={{ padding: "9px 12px", borderTop: i === 0 ? "none" : `1px solid ${COLORS.line}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5 }}>{item.name}</div>
                      <div style={{ fontSize: 10.5, color: "#9A937F" }}>{item.category}{item.medida && !isEditing ? ` · ${item.medida}` : ""}</div>
                    </div>
                    {!isEditing && (
                      <button onClick={() => startEditMedida(item)} style={{ background: "none", border: "none", color: COLORS.teal, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700 }}>
                        <Pencil size={14} /> {item.medida ? "Editar" : "Agregar"}
                      </button>
                    )}
                  </div>
                  {isEditing && (
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <input
                        autoFocus
                        value={medidaEditValue}
                        onChange={(e) => setMedidaEditValue(e.target.value)}
                        placeholder="Ej: 16 un, 1 botella, 100 g"
                        style={{ flex: 1, padding: "8px 9px", borderRadius: 7, border: `1px solid ${COLORS.line}`, fontSize: 13 }}
                      />
                      <button onClick={() => saveEditMedida(item.id)} disabled={savingMedida} style={{ padding: "8px 12px", borderRadius: 7, border: "none", background: COLORS.teal, color: "#fff", fontWeight: 700, fontSize: 12, opacity: savingMedida ? 0.7 : 1 }}>Guardar</button>
                      <button onClick={() => setEditingMedidaId(null)} style={{ padding: "8px 10px", borderRadius: 7, border: `1px solid ${COLORS.line}`, background: "#fff", fontSize: 12 }}><X size={14} /></button>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredForMedida.length > 40 && (
              <div style={{ padding: "8px 12px", fontSize: 11.5, color: "#9A937F", borderTop: `1px solid ${COLORS.line}` }}>Mostrando los primeros 40 resultados. Afiná la búsqueda para ver otros.</div>
            )}
          </div>
        )}
      </Section>

      <Section title={`Productos agregados manualmente · ${customArticles.length}`}>
        {customArticles.length === 0 ? <EmptyState icon={Package} text="Todavía no agregaste productos nuevos." /> : (
          Object.entries(groupedCustom).map(([cat, items]) => (
            <div key={cat} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ padding: "9px 12px", background: COLORS.tealSoft, fontSize: 12, fontWeight: 700, color: COLORS.teal }}>{cat}</div>
              {items.map((a, i) => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderTop: i === 0 ? "none" : `1px solid ${COLORS.line}` }}>
                  <span style={{ fontSize: 13.5 }}>{a.name}{a.medida ? ` · ${a.medida}` : ""}</span>
                  {confirmDelete === a.id ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => handleDelete(a.id, a.name)} style={{ padding: "6px 10px", borderRadius: 7, border: "none", background: COLORS.danger, color: "#fff", fontWeight: 700, fontSize: 11 }}>Confirmar</button>
                      <button onClick={() => setConfirmDelete(null)} style={{ padding: "6px 10px", borderRadius: 7, border: `1px solid ${COLORS.line}`, background: "#fff", fontSize: 11 }}><X size={13} /></button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(a.id)} style={{ background: "none", border: "none", color: COLORS.danger, display: "flex", alignItems: "center" }}><Trash2 size={15} /></button>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </Section>
    </div>
  );
}

/* ==================== CONTEO SÁNDWICHES ==================== */
function ConteoSandwiches({ conteo, historial, onAddFinding, onDeleteFinding, onReset, onToast }) {
  const [openId, setOpenId] = useState(null);
  const [planchasInput, setPlanchasInput] = useState("");
  const [unidadesInput, setUnidadesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [expandedSnapshot, setExpandedSnapshot] = useState(null);

  const { totalsById, grandTotal } = useMemo(() => computeConteoTotals(conteo), [conteo]);
  const nameById = useMemo(() => { const m = {}; for (const s of SANDWICH_MENU) m[s.id] = s.name; return m; }, []);

  const handleAdd = async (id) => {
    const p = Number(planchasInput) || 0, u = Number(unidadesInput) || 0;
    if (p === 0 && u === 0) { onToast("Ingresá al menos planchas o unidades.", "error"); return; }
    setSaving(true);
    try { await onAddFinding(id, p, u); setPlanchasInput(""); setUnidadesInput(""); } finally { setSaving(false); }
  };
  const handleReset = async () => {
    if (grandTotal === 0) { onToast("No hay nada cargado en el conteo actual.", "error"); setConfirmReset(false); return; }
    const result = await onReset();
    setConfirmReset(false);
    onToast(result?.persisted ? "Conteo guardado en el historial y reiniciado." : "Se guardó y reinició solo para esta sesión.", result?.persisted ? "ok" : "error");
  };

  return (
    <div>
      <Section title="Conteo de sándwiches" right={confirmReset ? (
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={handleReset} style={{ padding: "6px 10px", borderRadius: 7, border: "none", background: COLORS.danger, color: "#fff", fontWeight: 700, fontSize: 11 }}>Confirmar</button>
          <button onClick={() => setConfirmReset(false)} style={{ padding: "6px 10px", borderRadius: 7, border: `1px solid ${COLORS.line}`, background: "#fff", fontSize: 11 }}><X size={13} /></button>
        </div>
      ) : (
        <button onClick={() => setConfirmReset(true)} style={{ fontSize: 12, color: COLORS.danger, background: "none", border: "none", fontWeight: 700 }}>Finalizar y guardar conteo</button>
      )}>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#7C7461", fontWeight: 600 }}>Total general (conteo actual)</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.teal }}>{grandTotal} sándwiches</span>
        </div>
        <div style={{ fontSize: 12, color: "#9A937F" }}>Cada plancha equivale a {UNITS_PER_PLANCHA} sándwiches.</div>
      </Section>
      {SANDWICH_CATEGORIES.map((cat) => (
        <Section key={cat} title={cat}>
          {SANDWICH_MENU.filter((s) => s.category === cat).map((s) => {
            const t = totalsById[s.id]; const isOpen = openId === s.id;
            return (
              <div key={s.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, marginBottom: 8, overflow: "hidden" }}>
                <button onClick={() => { setOpenId(isOpen ? null : s.id); setPlanchasInput(""); setUnidadesInput(""); }} style={{ width: "100%", padding: "11px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none" }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, textAlign: "left" }}>{s.name}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: t.totalUnidades > 0 ? COLORS.teal : "#C7C1B2" }}>{t.planchas} pl · {t.unidades} un</span>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </span>
                </button>
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${COLORS.line}`, padding: "10px 12px" }}>
                    {t.findings.length > 0 && (
                      <div style={{ marginBottom: 10, display: "grid", gap: 6 }}>
                        {t.findings.map((f) => (
                          <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, background: COLORS.paper, borderRadius: 7, padding: "6px 10px" }}>
                            <span>{f.planchas} planchas · {f.unidades} unidades sueltas</span>
                            <button onClick={() => onDeleteFinding(s.id, f.id)} style={{ background: "none", border: "none", color: COLORS.danger }}><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ fontSize: 12, color: "#7C7461", marginBottom: 6, fontWeight: 600 }}>Agregar hallazgo</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input type="number" min="0" value={planchasInput} onChange={(e) => setPlanchasInput(e.target.value)} placeholder="Planchas" style={{ flex: 1, padding: "8px 9px", borderRadius: 7, border: `1px solid ${COLORS.line}`, fontSize: 13, textAlign: "center" }} />
                      <input type="number" min="0" value={unidadesInput} onChange={(e) => setUnidadesInput(e.target.value)} placeholder="Unidades" style={{ flex: 1, padding: "8px 9px", borderRadius: 7, border: `1px solid ${COLORS.line}`, fontSize: 13, textAlign: "center" }} />
                      <button onClick={() => handleAdd(s.id)} disabled={saving} style={{ padding: "9px 14px", borderRadius: 7, border: "none", background: COLORS.teal, color: "#fff", fontWeight: 700, fontSize: 13, opacity: saving ? 0.7 : 1 }}><Plus size={15} /></button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Section>
      ))}
      <Section title={`Historial de conteos${historial.length ? ` · ${historial.length}` : ""}`}>
        {historial.length === 0 ? <EmptyState icon={Utensils} text="Todavía no guardaste ningún conteo." /> : (
          <div style={{ display: "grid", gap: 8 }}>
            {historial.map((snap) => {
              const isOpen = expandedSnapshot === snap.id;
              const entries = Object.entries(snap.totals || {});
              return (
                <div key={snap.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => setExpandedSnapshot(isOpen ? null : snap.id)} style={{ width: "100%", padding: "12px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none" }}>
                    <div style={{ textAlign: "left" }}><div style={{ fontWeight: 700, fontSize: 14 }}>{fmtDate(snap.fecha)}</div><div style={{ fontSize: 12, color: "#7C7461" }}>{snap.grandTotal} sándwiches · {entries.length} variedades</div></div>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
                      {entries.map(([sid, t], idx) => (
                        <div key={sid} style={{ display: "flex", justifyContent: "space-between", padding: "7px 14px", fontSize: 13, borderTop: idx === 0 ? "none" : `1px solid ${COLORS.line}` }}>
                          <span>{nameById[sid] || sid}</span><span style={{ fontWeight: 700 }}>{t.planchas} pl · {t.unidades} un</span>
                        </div>
                      ))}
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

/* ==================== CONTEO VAJILLA ==================== */
function ConteoVajilla({ conteo, historial, onAddFinding, onDeleteFinding, onReset, onToast }) {
  const [openId, setOpenId] = useState(null);
  const [cantidadInput, setCantidadInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [expandedSnapshot, setExpandedSnapshot] = useState(null);
  const [search, setSearch] = useState("");

  const { totalsById, grandTotal } = useMemo(() => computeVajillaTotals(conteo), [conteo]);
  const nameById = useMemo(() => { const m = {}; for (const v of VAJILLA_MENU) m[v.id] = v.name; return m; }, []);
  const sortedFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...VAJILLA_MENU].filter((v) => !q || v.name.toLowerCase().includes(q)).sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, [search]);

  const handleAdd = async (id) => {
    const c = Number(cantidadInput) || 0;
    if (c === 0) { onToast("Ingresá una cantidad.", "error"); return; }
    setSaving(true);
    try { await onAddFinding(id, c); setCantidadInput(""); } finally { setSaving(false); }
  };
  const handleReset = async () => {
    if (grandTotal === 0) { onToast("No hay nada cargado en el conteo actual.", "error"); setConfirmReset(false); return; }
    const result = await onReset();
    setConfirmReset(false);
    onToast(result?.persisted ? "Conteo de vajilla guardado y reiniciado." : "Se guardó solo para esta sesión.", result?.persisted ? "ok" : "error");
  };

  return (
    <div>
      <Section title="Conteo de vajilla" right={confirmReset ? (
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={handleReset} style={{ padding: "6px 10px", borderRadius: 7, border: "none", background: COLORS.danger, color: "#fff", fontWeight: 700, fontSize: 11 }}>Confirmar</button>
          <button onClick={() => setConfirmReset(false)} style={{ padding: "6px 10px", borderRadius: 7, border: `1px solid ${COLORS.line}`, background: "#fff", fontSize: 11 }}><X size={13} /></button>
        </div>
      ) : (
        <button onClick={() => setConfirmReset(true)} style={{ fontSize: 12, color: COLORS.danger, background: "none", border: "none", fontWeight: 700 }}>Finalizar y guardar conteo</button>
      )}>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#7C7461", fontWeight: 600 }}>Total general (conteo actual)</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.teal }}>{grandTotal} unidades</span>
        </div>
      </Section>
      <Section title="Artículos">
        <div style={{ position: "relative", marginBottom: 10 }}>
          <Search size={16} style={{ position: "absolute", left: 10, top: 11, color: "#9A937F" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar artículo…" style={{ width: "100%", padding: "9px 10px 9px 32px", borderRadius: 9, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
        </div>
        {sortedFiltered.map((v) => {
          const t = totalsById[v.id]; const isOpen = openId === v.id;
          return (
            <div key={v.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, marginBottom: 8, overflow: "hidden" }}>
              <button onClick={() => { setOpenId(isOpen ? null : v.id); setCantidadInput(""); }} style={{ width: "100%", padding: "11px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none" }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, textAlign: "left" }}>{v.name}<span style={{ display: "block", fontSize: 10.5, color: "#9A937F", fontWeight: 400 }}>{v.category}</span></span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.total > 0 ? COLORS.teal : "#C7C1B2" }}>{t.total} un</span>
                  <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                </span>
              </button>
              {isOpen && (
                <div style={{ borderTop: `1px solid ${COLORS.line}`, padding: "10px 12px" }}>
                  {t.findings.length > 0 && (
                    <div style={{ marginBottom: 10, display: "grid", gap: 6 }}>
                      {t.findings.map((f) => (
                        <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, background: COLORS.paper, borderRadius: 7, padding: "6px 10px" }}>
                          <span>{f.cantidad} unidades</span>
                          <button onClick={() => onDeleteFinding(v.id, f.id)} style={{ background: "none", border: "none", color: COLORS.danger }}><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="number" min="0" value={cantidadInput} onChange={(e) => setCantidadInput(e.target.value)} placeholder="Cantidad" style={{ flex: 1, padding: "8px 9px", borderRadius: 7, border: `1px solid ${COLORS.line}`, fontSize: 13, textAlign: "center" }} />
                    <button onClick={() => handleAdd(v.id)} disabled={saving} style={{ padding: "9px 14px", borderRadius: 7, border: "none", background: COLORS.teal, color: "#fff", fontWeight: 700, fontSize: 13, opacity: saving ? 0.7 : 1 }}><Plus size={15} /></button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Section>
      <Section title={`Historial de conteos${historial.length ? ` · ${historial.length}` : ""}`}>
        {historial.length === 0 ? <EmptyState icon={LayoutGrid} text="Todavía no guardaste ningún conteo de vajilla." /> : (
          <div style={{ display: "grid", gap: 8 }}>
            {historial.map((snap) => {
              const isOpen = expandedSnapshot === snap.id;
              const entries = Object.entries(snap.totals || {});
              return (
                <div key={snap.id} style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => setExpandedSnapshot(isOpen ? null : snap.id)} style={{ width: "100%", padding: "12px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none" }}>
                    <div style={{ textAlign: "left" }}><div style={{ fontWeight: 700, fontSize: 14 }}>{fmtDate(snap.fecha)}</div><div style={{ fontSize: 12, color: "#7C7461" }}>{snap.grandTotal} unidades · {entries.length} artículos</div></div>
                    <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
                      {entries.map(([iid, t], idx) => (
                        <div key={iid} style={{ display: "flex", justifyContent: "space-between", padding: "7px 14px", fontSize: 13, borderTop: idx === 0 ? "none" : `1px solid ${COLORS.line}` }}>
                          <span>{nameById[iid] || iid}</span><span style={{ fontWeight: 700 }}>{t.total} un</span>
                        </div>
                      ))}
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

/* ==================== AJUSTES ==================== */
function AjustesUsuarios({ users, currentUsername, onAdd, onDelete, onToast }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operador");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const submit = async () => {
    setSaving(true);
    try {
      await onAdd(username, password, role);
      setUsername(""); setPassword(""); setRole("operador");
      onToast(`Usuario "${username.trim()}" creado.`, "ok");
    } catch (err) {
      onToast(err.message || "No se pudo crear el usuario.", "error");
    } finally { setSaving(false); }
  };
  const handleDelete = async (u) => {
    try { await onDelete(u); setConfirmDelete(null); onToast(`Usuario "${u}" eliminado.`, "ok"); }
    catch (err) { onToast(err.message || "No se pudo eliminar.", "error"); }
  };

  return (
    <div>
      <Section title="Personal autorizado">
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><UserPlus size={16} /> Agregar nuevo usuario</div>
          <div style={{ display: "grid", gap: 10 }}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" style={{ padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
            <div style={{ position: "relative" }}>
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" style={{ width: "100%", padding: "9px 40px 9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14 }} />
              <button type="button" onClick={() => setShowPw((v) => !v)} style={{ position: "absolute", right: 8, top: 7, background: "none", border: "none", color: "#9A937F" }}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: "9px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, fontSize: 14, background: "#fff" }}>
              <option value="operador">Operador (carga pedidos)</option>
              <option value="encargado">Encargado de depósito (ve todo)</option>
              <option value="admin">Administrador (ve todo + gestiona usuarios)</option>
            </select>
            <button onClick={submit} disabled={saving} style={{ padding: "10px", borderRadius: 9, border: "none", background: COLORS.amber, color: "#1C2B2A", fontWeight: 700, fontSize: 13, opacity: saving ? 0.7 : 1 }}>{saving ? "Guardando…" : "Crear usuario"}</button>
          </div>
        </div>
      </Section>
      <Section title={`Usuarios existentes · ${users.length}`}>
        <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden" }}>
          {users.map((u, i) => (
            <div key={u.username} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderTop: i === 0 ? "none" : `1px solid ${COLORS.line}` }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{u.username} {u.username === currentUsername && <span style={{ fontSize: 11, color: "#9A937F" }}>(vos)</span>}</div>
                <div style={{ fontSize: 12, color: "#7C7461" }}>{u.role === "admin" ? "Administrador" : u.role === "encargado" ? "Encargado de depósito" : "Operador"}</div>
              </div>
              {confirmDelete === u.username ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => handleDelete(u.username)} style={{ padding: "6px 10px", borderRadius: 7, border: "none", background: COLORS.danger, color: "#fff", fontWeight: 700, fontSize: 11 }}>Confirmar</button>
                  <button onClick={() => setConfirmDelete(null)} style={{ padding: "6px 10px", borderRadius: 7, border: `1px solid ${COLORS.line}`, background: "#fff", fontSize: 11 }}><X size={13} /></button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(u.username)} style={{ background: "none", border: "none", color: COLORS.danger, display: "flex", alignItems: "center" }}><Trash2 size={16} /></button>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ==================== HELPERS ==================== */
function EmptyState({ icon: Icon, text, spin }) {
  return (
    <div style={{ padding: "34px 10px", textAlign: "center", color: "#9A937F" }}>
      <Icon size={26} style={{ marginBottom: 8, animation: spin ? "spin 1s linear infinite" : "none" }} />
      <div style={{ fontSize: 13 }}>{text}</div>
      <style>{`@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }`}</style>
    </div>
  );
}
