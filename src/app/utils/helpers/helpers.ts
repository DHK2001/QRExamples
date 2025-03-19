export const handleDownload = (ref: React.RefObject<HTMLDivElement | null>, name: string) => {
  if (!ref.current) return;

  const svgElement = ref.current.querySelector("svg");
  if (svgElement) {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }
};

export function imageToBase64(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      } else {
        reject("Canvas context is null");
      }
    };

    img.onerror = (err) => reject(err);
    img.src = imageUrl;
  });
}
