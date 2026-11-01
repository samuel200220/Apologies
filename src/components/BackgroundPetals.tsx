"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  colorTone: string;
}

export default function BackgroundPetals({
  intense = false,
  reverse = false,
}: {
  intense?: boolean;
  reverse?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = [
      { base: "#801426", highlight: "#B52E46", shadow: "#4D0914" },
      { base: "#6B1020", highlight: "#9E233B", shadow: "#3A060E" },
      { base: "#A6243D", highlight: "#D94865", shadow: "#610D1B" },
      { base: "#4D0914", highlight: "#801426", shadow: "#2B0309" },
    ];

    const count = intense ? 40 : 22;
    const petals: Petal[] = [];

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 10,
        speedY: (Math.random() * 0.9 + 0.6) * (reverse ? -1.8 : 1),
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.8,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.015,
        opacity: Math.random() * 0.55 + 0.35,
        colorTone: String(Math.floor(Math.random() * colors.length)),
      });
    }

    // Function to draw an organic rose petal path
    const drawPetal = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      flip: number,
      colorSet: (typeof colors)[0],
      opacity: number
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate((rotation * Math.PI) / 180);
      pCtx.scale(1, Math.sin(flip));
      pCtx.globalAlpha = opacity;

      // Petal gradient
      const grad = pCtx.createLinearGradient(-size / 2, -size / 2, size / 2, size / 2);
      grad.addColorStop(0, colorSet.highlight);
      grad.addColorStop(0.5, colorSet.base);
      grad.addColorStop(1, colorSet.shadow);

      pCtx.fillStyle = grad;
      pCtx.beginPath();
      // Curved organic petal shape
      pCtx.moveTo(0, -size);
      pCtx.bezierCurveTo(size * 0.9, -size * 0.8, size * 0.8, size * 0.6, 0, size * 0.9);
      pCtx.bezierCurveTo(-size * 0.8, size * 0.6, -size * 0.9, -size * 0.8, 0, -size);
      pCtx.closePath();
      pCtx.fill();

      // Delicate petal central vein
      pCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      pCtx.lineWidth = 0.8;
      pCtx.beginPath();
      pCtx.moveTo(0, -size * 0.7);
      pCtx.quadraticCurveTo(size * 0.1, 0, 0, size * 0.7);
      pCtx.stroke();

      pCtx.restore();
    };

    let swayAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      swayAngle += 0.02;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(swayAngle + p.rotation) * 0.6;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (reverse) {
          if (p.y < -50) {
            p.y = height + 50;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y > height + 50) {
            p.y = -50;
            p.x = Math.random() * width;
          }
        }

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;

        const colorSet = colors[parseInt(p.colorTone, 10)] || colors[0];
        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.flip, colorSet, p.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intense, reverse]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-1000"
    />
  );
}
