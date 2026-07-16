import React, { useEffect, useRef } from "react";

interface MagicalBackgroundProps {
  magicMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface TrailSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  color: string;
}

export function MagicalBackground({ magicMode }: MagicalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse coordinates & speed for trailing sparkles
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn mouse sparkles when magic mode is on and mouse is moving
      if (magicMode && mouse.speed > 1) {
        const spawnCount = Math.min(Math.floor(mouse.speed / 4) + 1, 4);
        for (let i = 0; i < spawnCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.5 + 0.5;
          const colors = [
            "#F5B301", // Gold
            "#14B8A6", // Teal
            "#2563EB", // Blue
            "#A855F7", // Purple
            "#EC4899", // Pink
          ];
          trailSparkles.push({
            x: mouse.x + (Math.random() - 0.5) * 10,
            y: mouse.y + (Math.random() - 0.5) * 10,
            vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.5,
            vy: Math.sin(angle) * speed + Math.random() * 0.5 + 0.2, // slight downwards gravity
            size: Math.random() * 3 + 2,
            maxLife: Math.random() * 40 + 20,
            life: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Background floating stars (only active in magicMode)
    const backgroundParticles: Particle[] = [];
    const trailSparkles: TrailSparkle[] = [];

    const colorsList = ["#F5B301", "#14B8A6", "#3B82F6", "#8B5CF6", "#EC4899"];

    // Initialize floating stars
    const initBackgroundParticles = () => {
      backgroundParticles.length = 0;
      const count = Math.floor((width * height) / 12000); // dynamic density
      for (let i = 0; i < Math.min(count, 120); i++) {
        backgroundParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.6 + 0.2,
          color: colorsList[Math.floor(Math.random() * colorsList.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    initBackgroundParticles();

    // Game loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!magicMode) {
        // Just empty loop when not active
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Draw and connect background particles
      const len = backgroundParticles.length;
      for (let i = 0; i < len; i++) {
        const p = backgroundParticles[i];

        // Move background particles
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Bounce/Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw glittering star diamond
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(Date.now() / 300 + i) * 0.4); // twinkling
        ctx.fillStyle = p.color;
        
        ctx.beginPath();
        // Draw 4-point star
        ctx.moveTo(0, -p.size * 2);
        ctx.lineTo(p.size * 0.5, -p.size * 0.5);
        ctx.lineTo(p.size * 2, 0);
        ctx.lineTo(p.size * 0.5, p.size * 0.5);
        ctx.lineTo(0, p.size * 2);
        ctx.lineTo(-p.size * 0.5, p.size * 0.5);
        ctx.lineTo(-p.size * 2, 0);
        ctx.lineTo(-p.size * 0.5, -p.size * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Connect nearby background particles with delicate glowing threads
        for (let j = i + 1; j < len; j++) {
          const p2 = backgroundParticles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`; // elegant purple threads
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw connections to mouse cursor if close
        const distToMouse = Math.hypot(p.x - mouseRef.current.x, p.y - mouseRef.current.y);
        if (distToMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          const mouseAlpha = (1 - distToMouse / 180) * 0.25;
          ctx.strokeStyle = `rgba(245, 179, 1, ${mouseAlpha})`; // gold strands to cursor
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Draw trailing mouse sparkles
      for (let i = trailSparkles.length - 1; i >= 0; i--) {
        const s = trailSparkles[i];
        s.life++;

        // Update sparkle motion
        s.x += s.vx;
        s.y += s.vy;
        s.size *= 0.96; // shrink

        if (s.life >= s.maxLife || s.size < 0.2) {
          trailSparkles.splice(i, 1);
          continue;
        }

        const opacity = 1 - s.life / s.maxLife;
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // draw sparkling halo glow
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
        gradient.addColorStop(0, s.color);
        gradient.addColorStop(0.3, s.color);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // draw center solid star
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [magicMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${
        magicMode ? "opacity-100 z-[1]" : "opacity-0 -z-50"
      }`}
    />
  );
}
