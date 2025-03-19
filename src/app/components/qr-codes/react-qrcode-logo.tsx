import React, { MutableRefObject, useRef } from "react";
import { QRCode } from "react-qrcode-logo";

interface Props {
  value: string;
}

const qrData = {
  "qr_json": {
    "style": {
      "background": "#6f1b1b",
      "borderRadius": "0px",
    },
    "backgroundOptions": {
      "color": "transparent",
    },
    "margin": 0,
    "cornersDotOptions": {
      "color": "#8a0f0f",
      "type": "dot",
    },
    "cornersSquareOptions": {
      "color": "#ffffff",
      "type": "dot",
    },
    "dotsOptions": {
      "color": "#ffffff",
      "type": "dots",
    },
    "image": "https://api.izoukhai.com/assets/2651dc71-f532-4ed8-8c5e-61823759185a",
    "imageOptions": {
      "imageSize": 0.24,
      "margin": "3",
      "hideBackgroundDots": true,
    },
    "data": "https://youtu.be/b5aI7qJ2pgs?si=FO3pnClT8zLSJcqN",
  }
};

const qrJson = qrData.qr_json;

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
        value={qrJson.data}
        size={256}
        style={{
          border: qrJson.style.borderRadius === '0px' ? "none" : "5px solid #ffffff",
          height: "auto",
          maxWidth: "100%",
          borderRadius: qrJson.style.borderRadius,
        }}
        quietZone={qrJson.margin || 14}
        bgColor={qrJson.style.background}
        fgColor={qrJson.dotsOptions.color}
        ecLevel="M"
        enableCORS={true}
        logoImage={qrJson.image}
        logoWidth={256 * (qrJson.imageOptions.imageSize || 0.2)}
        logoHeight={256 * (qrJson.imageOptions.imageSize || 0.2)}
        logoPadding={Number(qrJson.imageOptions.margin) || 2}
        removeQrCodeBehindLogo={qrJson.imageOptions.hideBackgroundDots}
        logoPaddingStyle="square"
        eyeRadius={10}
        eyeColor={qrJson.cornersSquareOptions.color || "#000000"}
        qrStyle={qrJson.dotsOptions.type as QRStyle}
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
