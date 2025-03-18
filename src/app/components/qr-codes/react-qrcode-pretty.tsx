import { imageToBase64 } from "@/app/utils/helpers/helpers";
import { useRef, useState, useEffect } from "react";
import { QrCode } from "react-qrcode-pretty";

interface Props {
  value: string;
}

export default function ReactQRCodePretty({ value }: Props) {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    imageToBase64("https://avatars.githubusercontent.com/u/1000000?v=4")
      .then(setBase64Image)
      .catch((error) => console.error("Error converting image to Base64:", error));
  }, []);


  const handleDownloadSVG = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
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
      } else {
        console.error("Canvas element not found.");
      }
    }
  };

  return (
    <div>
      <div ref={qrCodeRef}>
        <QrCode
          value={value}
          size={256}
          level="H"
          image={base64Image || ""}
          imageBig={true}
          variant={{
            eyes: "gravity",
            body: "fluid",
          }}
          color={{
            eyes: "#054c94",
            body: "#16007a",
          }}
          padding={12}
          margin={0}
          bgColor="#ffffff"
          bgRounded={true}
        />
      </div>
      <button
        type="button"
        onClick={handleDownloadSVG}
        style={{
          margin: "20px",
          padding: "10px 20px",
          backgroundColor: "#3700ff",
          color: "#ffffff",
          borderRadius: "8px",
        }}
      >
        Download QR Code (SVG)
      </button>
    </div>
  );
}
//https://www.npmjs.com/package/react-qrcode-pretty
//1.3.3 • Public • Published 5 months ago
//doesnt work on react 19.
