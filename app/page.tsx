'use client';
import { useRef, useEffect, useState } from "react";
import { LayoutBand } from "blisskit-ui";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = 'white';

    function startDrawing(event: MouseEvent) {
      context?.beginPath();
      context?.moveTo(event.offsetX, event.offsetY);
      setIsDrawing(true);
    };

    function draw(event: MouseEvent) {
      if (!isDrawing) return;
      context?.lineTo(event.offsetX, event.offsetY);
      context?.stroke();
    };

    function stopDrawing() {
      setIsDrawing(false);
      context?.closePath();
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };

  }, [isDrawing]);

  return (
    <LayoutBand>
      <canvas className="border border-solid border-white" ref={canvasRef} width={200} height={200} />
    </LayoutBand>
  );
}
