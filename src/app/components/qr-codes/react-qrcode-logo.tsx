import React, { MutableRefObject, useRef } from "react";
import { QRCode } from "react-qrcode-logo";

interface Props {
  value: string;
}

type QRStyle = "dots" | "squares" | "fluid";

export default function ReactQRCodeLogo({ value }: Props) {
  const qrStyle: QRStyle = "fluid";

  const handleDownload = () => {
    const canvas: any = document.getElementById("qrcode");
    if (canvas) {
      console.log(canvas.width, canvas.height);
      const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
            <image href="${canvas.toDataURL()}" width="${canvas.width}" height="${canvas.height}" />
          </svg>
        `;
        const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.svg";
        link.click();
        URL.revokeObjectURL(link.href);
    }
  };
  return (
    <div>
      <QRCode
        id="qrcode"
        value={value}
        size={256}
        style={{
          border: "5px solid #ffffff",
          height: "auto",
          maxWidth: "100%",
          borderRadius: "20px",
        }}
        quietZone={14}
        bgColor="#ffffff"
        fgColor="#000000"
        ecLevel="M"
        enableCORS={true}
        logoImage="https://avatars.githubusercontent.com/u/32333192?s=200&v=4"
        logoWidth={256 * 0.2}
        logoHeight={256 * 0.2}
        logoPadding={2}
        removeQrCodeBehindLogo={true}
        logoPaddingStyle="square"
        qrStyle={qrStyle}
        eyeRadius={10}
        eyeColor="#000000"
      />
      <button
        type="button"
        //png, jpeg, webp
        onClick={() => handleDownload()}
        style={{
          margin: "20px",
          padding: "10px 20px",
          backgroundColor: "#3700ff",
          color: "#ffffff",
          borderRadius: "8px",
        }}
      >
        Download QR Code
      </button>
    </div>
  );
}

//https://www.npmjs.com/package/react-qrcode-logo
//3.0.0 • Public • Published 10 months ago
