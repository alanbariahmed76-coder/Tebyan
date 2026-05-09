import { jsPDF } from "jspdf";

export interface CertificateData {
  studentName: string;
  courseTitle: string;
  instructor: string;
  date?: string;
  certId?: string;
}

function drawCertificate(ctx: CanvasRenderingContext2D, w: number, h: number, d: CertificateData) {
  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#0b1d3a");
  grad.addColorStop(1, "#13325f");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Decorative corner accents
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, w - 80, h - 80);
  ctx.lineWidth = 2;
  ctx.strokeRect(58, 58, w - 116, h - 116);

  // Gold ribbon top
  ctx.fillStyle = "#d4af37";
  ctx.beginPath();
  ctx.moveTo(w / 2 - 140, 40);
  ctx.lineTo(w / 2 + 140, 40);
  ctx.lineTo(w / 2 + 110, 120);
  ctx.lineTo(w / 2 - 110, 120);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#0b1d3a";
  ctx.font = "bold 28px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.direction = "rtl";
  ctx.fillText("تبيان", w / 2, 90);

  // Title
  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 56px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.fillText("شهادة إتمام", w / 2, 210);

  ctx.fillStyle = "#ffffff";
  ctx.font = "22px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.fillText("تشهد منصة تبيان للتعليم بأن", w / 2, 280);

  // Student name
  ctx.fillStyle = "#ffd966";
  ctx.font = "bold 64px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.fillText(d.studentName, w / 2, 370);

  // Underline
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 220, 390);
  ctx.lineTo(w / 2 + 220, 390);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "22px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.fillText("قد أتمّ بنجاح جميع متطلبات دورة", w / 2, 440);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.fillText(d.courseTitle, w / 2, 500);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "20px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.fillText(`بإشراف ${d.instructor}`, w / 2, 545);

  // Footer info
  ctx.fillStyle = "#ffffff";
  ctx.font = "16px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`التاريخ: ${d.date || new Date().toLocaleDateString("ar-EG")}`, w - 100, h - 90);
  ctx.textAlign = "left";
  ctx.fillText(`رقم الشهادة: ${d.certId || "TBY-" + Math.random().toString(36).slice(2, 10).toUpperCase()}`, 100, h - 90);

  // Signature line
  ctx.textAlign = "center";
  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 18px 'Tajawal', 'Cairo', Arial, sans-serif";
  ctx.fillText("منصة تبيان", w / 2, h - 90);
  ctx.strokeStyle = "#d4af37";
  ctx.beginPath();
  ctx.moveTo(w / 2 - 120, h - 110);
  ctx.lineTo(w / 2 + 120, h - 110);
  ctx.stroke();
}

export function renderCertificateCanvas(d: CertificateData): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const w = 1400;
  const h = 990;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  drawCertificate(ctx, w, h, d);
  return canvas;
}

export function previewCertificate(d: CertificateData) {
  const canvas = renderCertificateCanvas(d);
  const url = canvas.toDataURL("image/png");
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`<title>شهادة - ${d.courseTitle}</title><body style="margin:0;background:#111;display:flex;align-items:center;justify-content:center;min-height:100vh"><img src="${url}" style="max-width:100%;height:auto"/></body>`);
}

export function downloadCertificatePDF(d: CertificateData) {
  const canvas = renderCertificateCanvas(d);
  const img = canvas.toDataURL("image/jpeg", 0.95);
  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  pdf.addImage(img, "JPEG", 0, 0, pw, ph);
  pdf.save(`Tebyan-Certificate-${d.courseTitle.replace(/\s+/g, "_")}.pdf`);
}
