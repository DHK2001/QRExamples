"use client";
import { useEffect, useState } from "react";
import QRCodeReact from "./components/qr-codes/qrcode-react";
import ReactQRCode from "./components/qr-codes/react-qr-code";
import ReactQRCodeLogo from "./components/qr-codes/react-qrcode-logo";
import ReactQRCodePretty from "./components/qr-codes/react-qrcode-pretty";

export default function Home() {
  const [qrValue, setQrValue] = useState<string>("");

  useEffect(() => {
    setQrValue("https://youtu.be/b5aI7qJ2pgs?si=FO3pnClT8zLSJcqN");
  }, []);

  return (
    <div>
      <h2>qrcode.react</h2>
      <QRCodeReact value={qrValue} />
      {/* <h2 className="pt-5">react-qr-code</h2>
      {<ReactQRCode value={qrValue} />} */}
      <h2 className="pt-5">react-qrcode-logo</h2>
      <ReactQRCodeLogo value={qrValue} />
      <h2 className="pt-5">react-qrcode-pretty</h2>
      <ReactQRCodePretty value={qrValue} />
    </div>
  );
}
