import { handleDownload } from "@/app/utils/helpers/helpers";
import { useRef } from "react";
import QRCode from "react-qr-code";

interface Props {
  value: string;
}

export default function ReactQRCode({ value }: Props) {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={qrCodeRef}>
      <QRCode
        value={value}
        className="border-4 border-white rounded-3xl"
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox={`0 0 256 256`}
        bgColor="#000000"
        fgColor="#ffffff"
        level="H"
        xlinkTitle="Hey"
      />
      <button
        type="button"
        onClick={() => handleDownload(qrCodeRef)}
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

//https://www.npmjs.com/package/react-qr-code
//2.0.15 • Public • Published 9 months ago
