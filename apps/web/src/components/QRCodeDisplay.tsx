'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 120 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ width: size, height: size }}
        className="bg-slate-100 rounded-lg flex items-center justify-center text-[10px] text-slate-400 font-mono"
      >
        QR
      </div>
    );
  }

  return <QRCodeSVG value={value} size={size} level="M" />;
};
