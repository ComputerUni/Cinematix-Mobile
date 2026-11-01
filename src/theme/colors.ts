export const Colors = {
  // Arka Plan Renkleri
  background: "#1A1A24",       // Tüm ekranların ana koyu zemini
  card: "#222831",             // Film kartları, modallar, bottom sheet zeminleri
  cardElevated: "#2D3440",     // Hover/aktif kartlar, açılır pencereler, arama çubuğu içi

  // Vurgu (Accent) Renkleri (Sinematik Altın Sarısı)
  accent: "#FFD369",           // Ana CTA butonları ('İzle', 'Bilet Al'), yıldız puanları, aktif sekmeler
  accentHover: "#E5BC57",      // Sarı butona tıklandığındaki/basılı tutulduğundaki ton
  accentMuted: "rgba(255, 211, 105, 0.15)", // Sarı etiket (badge) arka planları, şeffaf vurgular

  // Tipografi (Metin) Renkleri
  textPrimary: "#EEEEEE",      // Film başlıkları, modal başlıkları, öne çıkan metinler
  textSecondary: "#8D99AE",    // Çıkış yılı, film türleri, yönetmen, süre bilgileri
  textMuted: "#5C6479",        // Pasif placeholder'lar, küçük dipnotlar, telif yazıları
  textInverse: "#1A1A24",      // Sarı butonların üzerindeki koyu renkli metinler

  // Durum & Geri Bildirim Renkleri
  rating: "#FFD369",           // IMDb / TMDB yıldız ve puanlama rengi
  success: "#4EBA6F",          // "İzlendi olarak işaretlendi" / Başarılı bildirimleri
  error: "#E50914",            // Hata mesajları, listeden çıkarma / silme butonları
  warning: "#FFAA00",          // Uyarı durumları

  // Kenarlık & Çizgiler (Borders / Dividers)
  border: "rgba(255, 255, 255, 0.08)", // Kart kenarlıkları, listeler arası ince ayrım çizgileri
  borderLight: "rgba(255, 255, 255, 0.15)", // Odaklanılmış input kutusu kenarlıkları

  // Katmanlar & Gradyanlar (Görsellerin üzerine metin bindirmek için)
  overlay: "rgba(0, 0, 0, 0.6)",       // Modal arka plan karartması
  posterGradient: [
    "transparent",
    "rgba(26, 26, 36, 0.8)",
    "#1A1A24",
  ],                                   // Afiş üstünden metne geçerken kullanılan karartma tonları
} as const;

export type ColorType = typeof Colors;