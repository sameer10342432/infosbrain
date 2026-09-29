import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Colors matching InfosBrain brand palette
    const colors = [
      '#0078FF', // Electric blue
      '#06B6D4', // Cyan
      '#00C9A7', // Teal
      '#6C4DFF', // Purple
      '#38BDF8', // Light sky
    ];

    // Mouse coordinates and smooth interpolation
    let mouse = {
      targetX: -1000,
      targetY: -1000,
      currX: -1000,
      currY: -1000,
      active: false,
      alpha: 0,
      targetAlpha: 0,
    };

    // Calculate particle count according to screen size
    const getParticleCount = (w: number) => {
      if (w < 640) return 12; // Mobile
      if (w < 1024) return 24; // Tablet
      return 42; // Desktop (clean, uncrowded)
    };

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = getParticleCount(width);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.4 + 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.35 + 0.25,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
        });
      }
    };

    const resize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track mouse events globally on window so tracking is seamless across all sections
    const handlePointerMove = (e: PointerEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      mouse.targetAlpha = 1;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetAlpha = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('blur', handlePointerLeave);

    // Pause when tab is hidden
    let isPaused = false;
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Render loop
    const render = () => {
      if (isPaused) return;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position interpolation (lerp)
      if (mouse.active || mouse.alpha > 0.01) {
        mouse.currX += (mouse.targetX - mouse.currX) * 0.08;
        mouse.currY += (mouse.targetY - mouse.currY) * 0.08;
        mouse.alpha += (mouse.targetAlpha - mouse.alpha) * 0.05;

        // Render subtle interactive radial glow around cursor
        if (mouse.alpha > 0.01 && !prefersReducedMotion) {
          const glowRadius = Math.min(width * 0.35, 320);
          const glow = ctx.createRadialGradient(
            mouse.currX,
            mouse.currY,
            0,
            mouse.currX,
            mouse.currY,
            glowRadius
          );
          glow.addColorStop(0, `rgba(0, 120, 255, ${0.11 * mouse.alpha})`);
          glow.addColorStop(0.35, `rgba(6, 182, 212, ${0.06 * mouse.alpha})`);
          glow.addColorStop(0.65, `rgba(108, 77, 255, ${0.03 * mouse.alpha})`);
          glow.addColorStop(1, 'rgba(7, 26, 53, 0)');

          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(mouse.currX, mouse.currY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // If reduced motion is requested, render static ambient state and stop
      if (prefersReducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.baseAlpha * 0.6;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        return;
      }

      const connectionDistance = width < 640 ? 85 : 125;
      const mouseInfluenceRadius = 150;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges smoothly
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // Subtle pulsing alpha
        p.pulsePhase += p.pulseSpeed;
        const pulse = (Math.sin(p.pulsePhase) + 1) * 0.15; // 0 to 0.3
        let currentAlpha = p.baseAlpha + pulse;

        // Mouse reaction: gentle magnetic repulsion / highlight
        if (mouse.active && mouse.alpha > 0.1) {
          const dx = mouse.currX - p.x;
          const dy = mouse.currY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceRadius && dist > 1) {
            const force = (1 - dist / mouseInfluenceRadius) * 0.75 * mouse.alpha;
            // Push gently away from cursor
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
            // Brighten node when near cursor
            currentAlpha = Math.min(currentAlpha + force * 0.45, 0.95);
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const baseLineAlpha = (1 - dist / connectionDistance) * 0.14;

            // Highlight connections near mouse
            let extraAlpha = 0;
            if (mouse.active && mouse.alpha > 0.1) {
              const midX = (p.x + p2.x) * 0.5;
              const midY = (p.y + p2.y) * 0.5;
              const distToMouse = Math.sqrt(
                (mouse.currX - midX) ** 2 + (mouse.currY - midY) ** 2
              );
              if (distToMouse < mouseInfluenceRadius) {
                extraAlpha = (1 - distToMouse / mouseInfluenceRadius) * 0.22 * mouse.alpha;
              }
            }

            const lineAlpha = Math.min(baseLineAlpha + extraAlpha, 0.4);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      id="interactive-bg-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      style={{ opacity: 0.9 }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
