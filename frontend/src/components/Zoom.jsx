import React, { useRef, useEffect } from "react";

const imageCount = 10;

const Zoom = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentIndexRef = useRef(0);
  const scaleRef = useRef(3); // Start large and zoom out
  const transitionProgressRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const loadImages = async () => {
      const promises = [];
      for (let i = 1; i <= imageCount; i++) {
        promises.push(
          new Promise((resolve) => {
            const img = new Image();
            img.src = `/assets/img${i}.jpg`; // Ensure these are in public/assets
            img.onload = () => resolve(img);
          })
        );
      }
      imagesRef.current = await Promise.all(promises);
      requestAnimationFrame(animate);
    };

    const animate = (time) => {
      const images = imagesRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) / 2;

      if (images.length === 0) return;

      const lastTime = lastFrameTimeRef.current || time;
      const delta = (time - lastTime) / 1000;
      lastFrameTimeRef.current = time;

      const zoomSpeed = 0.4; // control speed
      scaleRef.current -= zoomSpeed * delta;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      const currentImg = images[currentIndexRef.current];
      const nextIndex = (currentIndexRef.current + 1) % images.length;
      const nextImg = images[nextIndex];

      // blend when close to switch point
      if (scaleRef.current <= 1.0) {
        transitionProgressRef.current += delta * 2;

        const alpha = Math.min(transitionProgressRef.current, 1);
        drawImageScaled(ctx, nextImg, width, height, 3, alpha);
        drawImageScaled(
          ctx,
          currentImg,
          width,
          height,
          scaleRef.current,
          1 - alpha
        );

        if (alpha >= 1) {
          scaleRef.current = 3;
          transitionProgressRef.current = 0;
          currentIndexRef.current = nextIndex;
        }
      } else {
        drawImageScaled(ctx, currentImg, width, height, scaleRef.current, 1);
      }

      ctx.restore();
      requestAnimationFrame(animate);
    };

    const drawImageScaled = (ctx, img, width, height, scale, opacity = 1) => {
      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;

      let drawWidth, drawHeight;
      if (imgAspect > canvasAspect) {
        drawHeight = height;
        drawWidth = height * imgAspect;
      } else {
        drawWidth = width;
        drawHeight = width / imgAspect;
      }

      drawWidth *= scale;
      drawHeight *= scale;

      const dx = (width - drawWidth) / 2;
      const dy = (height - drawHeight) / 2;

      ctx.globalAlpha = opacity;
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      ctx.globalAlpha = 1;
    };

    loadImages();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="rounded-full overflow-hidden shadow-2xl border-4 border-white w-[80vmin] h-[80vmin]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default Zoom;
