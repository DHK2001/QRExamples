import { imageToBase64 } from "@/app/utils/helpers/helpers";
import { useRef, useState, useEffect } from "react";
import { QrCode } from "react-qrcode-pretty";

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
      "imageSize": 0.5,
      "margin": "3",  // Esto podría ser un string
      "hideBackgroundDots": true,
    },
    "data": "https://youtu.be/b5aI7qJ2pgs?si=FO3pnClT8zLSJcqN"
  }
};

const qrJson = qrData.qr_json;

export default function ReactQRCodePretty({ value }: Props) {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  useEffect(() => {
    imageToBase64(qrJson.image) // Usamos la URL de la imagen desde qrJson
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
          value={value || qrJson.data}
          size={256}
          level="H"
          image={base64Image || ""}
          imageBig={true}
          variant={{
            eyes: "gravity",
            body: "fluid",
          }}
          color={{
            eyes: qrJson.cornersDotOptions.color || "#054c94",
            body: qrJson.cornersSquareOptions.color || "#16007a",
          }}
          padding={qrJson.margin || 12}  // Usamos el valor de margin de qrJson
          margin={0}
          bgColor={qrJson.style.background}
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
