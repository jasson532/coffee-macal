import { useEffect, useRef } from 'react';
import './CoffeeParticles.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'bean' | 'steam' | 'sparkle' | 'leaf';
  life: number;
  maxLife: number;
}

interface CoffeeParticlesProps {
  variant?: 'hero' | 'ambient' | 'steam';
  density?: number;
}

export default function CoffeeParticles({ variant = 'hero', density = 1 }: CoffeeParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const getParticleCount = () => {
      const base = variant === 'hero' ? 35 : variant === 'steam' ? 20 : 15;
      return Math.round(base * density);
    };

    const createParticle = (): Particle => {
      const types: Particle['type'][] =
        variant === 'steam'
          ? ['steam', 'steam', 'steam', 'sparkle']
          : variant === 'hero'
            ? ['bean', 'sparkle', 'leaf', 'steam']
            : ['bean', 'sparkle', 'sparkle', 'leaf'];

      const type = types[Math.floor(Math.random() * types.length)];
      const maxLife = 300 + Math.random() * 400;

      return {
        x: Math.random() * canvas.width,
        y: type === 'steam' ? canvas.height + 10 : Math.random() * canvas.height,
        size: type === 'bean' ? 6 + Math.random() * 10 : type === 'sparkle' ? 2 + Math.random() * 4 : type === 'leaf' ? 8 + Math.random() * 6 : 3 + Math.random() * 5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: type === 'steam' ? -(0.3 + Math.random() * 0.8) : (Math.random() - 0.5) * 0.3,
        opacity: 0,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type,
        life: 0,
        maxLife,
      };
    };

    particlesRef.current = Array.from({ length: getParticleCount() }, () => {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      return p;
    });

    const drawBean = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity * 0.6;

      // Coffee bean — colores del empaque (marrón oscuro)
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#3D2B1F';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.quadraticCurveTo(p.size * 0.2, 0, 0, p.size * 0.7);
      ctx.strokeStyle = '#1A1209';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const drawSteam = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity * 0.25;

      const waveOffset = Math.sin(p.life * 0.02) * p.size;
      ctx.beginPath();
      ctx.arc(waveOffset, 0, p.size, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(waveOffset, 0, 0, waveOffset, 0, p.size);
      gradient.addColorStop(0, 'rgba(242, 230, 201, 0.8)');
      gradient.addColorStop(1, 'rgba(242, 230, 201, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    };

    const drawSparkle = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity * 0.8;

      // Sparkle dorado — sello del empaque
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      glow.addColorStop(0, 'rgba(200, 164, 21, 0.9)');
      glow.addColorStop(0.5, 'rgba(218, 187, 63, 0.4)');
      glow.addColorStop(1, 'rgba(139, 105, 20, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(200, 164, 21, 0.6)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(-p.size * 0.8, 0);
      ctx.lineTo(p.size * 0.8, 0);
      ctx.moveTo(0, -p.size * 0.8);
      ctx.lineTo(0, p.size * 0.8);
      ctx.stroke();

      ctx.restore();
    };

    const drawLeaf = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity * 0.45;

      // Hoja verde — montaña de las fotos
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size * 0.6, -p.size * 0.3, 0, p.size);
      ctx.quadraticCurveTo(-p.size * 0.6, -p.size * 0.3, 0, -p.size);
      ctx.fillStyle = '#2E5A1C';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.8);
      ctx.lineTo(0, p.size * 0.8);
      ctx.strokeStyle = '#3D7A28';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) {
          p.opacity = lifeRatio * 10;
        } else if (lifeRatio > 0.8) {
          p.opacity = (1 - lifeRatio) * 5;
        } else {
          p.opacity = 1;
        }

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 0.8;
          p.y += (dy / dist) * force * 0.8;
        }

        p.x += p.speedX + Math.sin(p.life * 0.01) * 0.2;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        switch (p.type) {
          case 'bean': drawBean(ctx, p); break;
          case 'steam': drawSteam(ctx, p); break;
          case 'sparkle': drawSparkle(ctx, p); break;
          case 'leaf': drawLeaf(ctx, p); break;
        }

        if (p.life >= p.maxLife || p.y < -20 || p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particlesRef.current[i] = createParticle();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [variant, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`coffee-particles coffee-particles--${variant}`}
      aria-hidden="true"
    />
  );
}
