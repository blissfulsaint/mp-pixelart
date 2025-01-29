'use client';
import { useRef, useEffect } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'green';
    context.fillRect(100, 10, 100, 100);
  }, []);

  return (
    <canvas className="border border-solid border-white" ref={canvasRef} width={200} height={200} />
  );
}
