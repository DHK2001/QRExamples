import { handleDownload } from "@/app/utils/helpers/helpers";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

interface Props {
  value: string;
}
const qrData = {
  qr_json: {
    style: {
      background: "#1e1e2f", // Un fondo oscuro elegante
      borderRadius: "16px",
      height: "auto",
      width: "100%",
      border: "8px solid #4caf50", // Un borde verde llamativo
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)", // Una sombra sutil
    },
    backgroundOptions: {
      color: "#101010", // Fondo sólido en el código QR
    },
    level: "Q", // Nivel de corrección de errores más alto
    margin: 4, // Márgenes ligeramente más amplios
    cornersDotOptions: {
      color: "#ff5722", // Ojos de color naranja brillante
      type: "square", // Forma cuadrada para variar
    },
    cornersSquareOptions: {
      color: "#ffffff", // Blanco para los marcos de los ojos
      type: "extra-rounded", // Redondeados extra para un look moderno
    },
    dotsOptions: {
      color: "#03a9f4", // Azul vibrante para los puntos
      type: "rounded", // Redondeados para un diseño fluido
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg", // Un logotipo de JavaScript
    imageOptions: {
      imageSize: 0.4, // Tamaño moderado para que el logo no abrume
      margin: 2, // Pequeño margen alrededor de la imagen
      hideBackgroundDots: false, // Mostrar puntos detrás de la imagen
    },
    data: "https://openai.com/", // Enlace al sitio de OpenAI
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
        bgColor={qrJson.style.background}
        level={qrJson.level as "L" | "M" | "Q" | "H"}
        marginSize={qrJson.margin}
        style={{
          backgroundColor: qrJson.backgroundOptions.color,
          height: qrJson.style.height,
          width: qrJson.style.width,
          border: qrJson.style.border,
          boxShadow: qrJson.style.boxShadow,
          borderRadius: qrJson.style.borderRadius,
        }}
        imageSettings={
          qrJson.image
            ? {
                src: qrJson.image,
                height: qrJson.imageOptions.imageSize * 100,
                width: qrJson.imageOptions.imageSize * 100,
                excavate: qrJson.imageOptions.hideBackgroundDots,
              }
            : undefined
        }
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
