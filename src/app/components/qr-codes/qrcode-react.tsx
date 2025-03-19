import { handleDownload } from "@/app/utils/helpers/helpers";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

interface Props {
  value: string;
}
const qrData = {
  qr_json: {
    style: {
      background: "#101010",
      borderRadius: "16px",
      height: "auto",
      width: "100%",
      border: "8px solid #4caf50",
      boxShadow: "0 6px 20px rgba(255, 0, 0, 0.5)",
    },
    backgroundQr: {
      color: "#1e1e2f",
    },
    level: "Q",
    margin: 2,
    dotsOptions: {
      color: "#03a9f4",
    },
    imageOptions: {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
      imageSize: 0.2,
      hideBackgroundDots: false,
      opacity: 1,
    },
    data: "https://openai.com/",
    name: "QR Code Example",
  },
};
const respoonse = {
  id: 1,
  qrData: qrData,
};
const qrJson = respoonse.qrData.qr_json;

export default function QRCodeReact({ value }: Props) {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={qrCodeRef}>
      <QRCodeSVG
        value={qrJson.data}
        size={256}
        fgColor={qrJson.dotsOptions.color}
        bgColor={qrJson.backgroundQr.color}
        level={qrJson.level as "L" | "M" | "Q" | "H"}
        marginSize={qrJson.margin}
        style={qrJson.style}
        imageSettings={{
          src: qrJson.imageOptions.image,
          height: qrJson.imageOptions.imageSize * 256,
          width: qrJson.imageOptions.imageSize * 256,
          excavate: qrJson.imageOptions.hideBackgroundDots,
          opacity: qrJson.imageOptions.opacity,
          crossOrigin: "anonymous",
        }}
        title={qrJson.name}
        boostLevel={true}
      />
      <button
        type="button"
        onClick={() => handleDownload(qrCodeRef, qrJson.name)}
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

//https://www.npmjs.com/package/qrcode.react
//4.2.0 • Public • Published 3 months ago
