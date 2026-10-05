import React, {useEffect, useRef} from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]<>/+=:;';

export default function CharacterBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const hero = canvas.parentElement;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const pointer = {x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, active: false};
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = true;
    let cells = [];
    let dark = document.documentElement.dataset.theme === 'dark';

    function draw(time = 0) {
      context.clearRect(0, 0, width, height);
      context.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      const radius = Math.min(170, width * .3);

      for (const cell of cells) {
        const dx = cell.x - pointer.x;
        const dy = cell.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / radius) * pointer.strength;
        const wave = Math.sin(distance / 22 - time / 230) * influence;
        const edge = Math.min(1, cell.x / 65, (width - cell.x) / 65, cell.y / 45, (height - cell.y) / 65);
        // Leave the central title and calls to action visually quiet.
        const center = Math.exp(-(((cell.x - width / 2) / (width * .27)) ** 2 + ((cell.y - height * .5) / (height * .6)) ** 2));
        const quiet = 1 - center * .82;
        context.globalAlpha = Math.max(0, edge) * quiet * ((dark ? .22 : .16) + influence * .55);
        context.fillStyle = cell.seed % 2 ? (dark ? '#abb5ef' : '#626bb8') : (dark ? '#8aaff4' : '#4c73c7');
        const index = influence > .25 ? (cell.seed + Math.floor(time / 160)) % characters.length : cell.seed % characters.length;
        const push = influence * 10 + wave * 5;
        context.fillText(characters[index], cell.x + dx / (distance || 1) * push, cell.y + dy / (distance || 1) * push);
      }
      context.globalAlpha = 1;
    }

    function animate(time) {
      frame = 0;
      if (!visible || document.hidden || motion.matches || !finePointer.matches) return;
      if (time - lastTime >= 1000 / 30) {
        lastTime = time;
        pointer.x += (pointer.targetX - pointer.x) * .2;
        pointer.y += (pointer.targetY - pointer.y) * .2;
        pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * .12;
        draw(time);
      }
      if (pointer.active || pointer.strength > .005) {
        frame = requestAnimationFrame(animate);
      } else {
        pointer.strength = 0;
        draw();
      }
    }

    function start() {
      if (!frame && visible && !document.hidden && !motion.matches && finePointer.matches) {
        frame = requestAnimationFrame(animate);
      }
    }

    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      pointer.active = false;
      pointer.strength = 0;
      draw();
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      cells = [];
      const spacing = width < 600 ? 24 : 21;
      for (let y = 12, row = 0; y < height; y += spacing, row++) {
        for (let x = 12, column = 0; x < width; x += spacing, column++) {
          cells.push({x, y, seed: (column * 127 + row * 311 + column * row * 17) % 997});
        }
      }
      draw();
    }

    function move(event) {
      if (event.pointerType === 'touch' || motion.matches || !finePointer.matches) return;
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      if (!pointer.active && pointer.strength === 0) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
      pointer.active = true;
      start();
    }

    function leave() {
      pointer.active = false;
      start();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) reset();
    });
    intersectionObserver.observe(hero);
    const themeObserver = new MutationObserver(() => {
      dark = document.documentElement.dataset.theme === 'dark';
      draw(lastTime);
    });
    themeObserver.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    hero.addEventListener('pointermove', move, {passive: true});
    hero.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', reset);
    motion.addEventListener('change', reset);
    finePointer.addEventListener('change', reset);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', reset);
      motion.removeEventListener('change', reset);
      finePointer.removeEventListener('change', reset);
    };
  }, []);

  return <canvas ref={canvasRef} className="home-character-background" aria-hidden="true" />;
}
