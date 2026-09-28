"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { ExternalLink, Copy, Check, Download, QrCode as QrIcon } from "lucide-react";

interface QrCodeCardProps {
  title: string;
  subtitle: string;
  defaultUrl: string;
  badge: string;
  icon: React.ReactNode;
  brandColor: string;
  accentGradient: string;
  actionText: string;
  type: "facebook" | "instagram" | "phone" | "google";
}

export default function QrCodeCard({
  title,
  subtitle,
  defaultUrl,
  badge,
  icon,
  brandColor,
  accentGradient,
  actionText,
  type,
}: QrCodeCardProps) {
  const [url] = useState(defaultUrl);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 320,
      margin: 1.5,
      color: {
        dark: "#08172c",
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    })
      .then((dataUri) => {
        setQrDataUrl(dataUri);
      })
      .catch((err) => console.error("Error generating QR code:", err));
  }, [url]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `smart-appliance-${type}-qrcode.png`;
    link.click();
  };

  return (
    <div className="relative group rounded-3xl p-6 bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Header with icon & badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
            style={{ background: brandColor }}
          >
            {icon}
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {badge}
          </span>
        </div>

        {/* Title & subtitle */}
        <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {subtitle}
        </p>

        {/* Scannable Barcode / QR Box */}
        <div className="my-5 flex flex-col items-center justify-center">
          <div className="relative p-3 bg-white rounded-2xl shadow-md border border-slate-200 group-hover:border-blue-400 transition-all">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={`${title} QR Code`}
                className="w-40 h-40 object-contain rounded-lg"
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center text-slate-400 text-xs">
                Generating Barcode...
              </div>
            )}

            {/* Center mini logo overlay indicator */}
            <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-md pointer-events-none">
              <QrIcon className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Point camera to scan instantly</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white transition-all shadow-md active:scale-[0.98]"
          style={{ background: brandColor }}
        >
          <span>{actionText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-500" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Download QR code image for stickers or print"
          >
            <Download className="w-3 h-3 text-slate-500" />
            <span>Save Barcode</span>
          </button>
        </div>
      </div>
    </div>
  );
}
