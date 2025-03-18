import { handleDownload } from "@/app/utils/helpers/helpers";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

interface Props {
  value: string;
}

export default function QRCodeReact({ value }: Props) {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={qrCodeRef}>
      <QRCodeSVG
        value={value}
        size={256}
        bgColor="#ffffff"
        fgColor="#4c1d95"
        level="H"
        className="rounded-lg"
        marginSize={2}
        imageSettings={{
          src: "https://avatars.githubusercontent.com/u/1000000?v=4",
          height: 64,
          width: 64,
          excavate: true,
        }}
        style={{
          height: "auto",
          maxWidth: "100%",
          width: "100%",
          border: "5px solid #b083f3",
          borderRadius: "24px",
          boxShadow: "0 4px 15px rgba(76, 29, 149, 0.2)",
        }}
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

//https://www.npmjs.com/package/qrcode.react
//4.2.0 • Public • Published 3 months ago
