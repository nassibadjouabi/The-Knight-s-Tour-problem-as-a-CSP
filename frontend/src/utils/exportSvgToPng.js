// exportSvgToPng.js
export async function exportElementToPng(element, filename = 'knight_tour.png', scale = 2) {
  const rect = element.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);

  // Serialize the element's outerHTML into SVG via foreignObject
  const serializer = new XMLSerializer();
  const html = serializer.serializeToString(element);
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">${html}</foreignObject>
    </svg>
  `;
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((b) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(b);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  img.onerror = (e) => {
    console.error(e);
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

