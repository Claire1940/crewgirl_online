"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

/**
 * 视频组件：IntersectionObserver 监测视频区域进入视口时自动播放
 * （autoplay=1&mute=1&loop=1，静音自动播放符合浏览器策略），
 * 同时保留点击封面播放按钮作为后备。
 * 封面使用本地 hero.webp（与新游戏主题一致的官方海报）。
 */
export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const [activated, setActivated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`,
    [videoId],
  );

  useEffect(() => {
    // 已激活（自动或手动）后不再监听
    if (activated) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivated(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [activated]);

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="relative w-full overflow-hidden rounded-lg aspect-video bg-black">
        {activated ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            className="group absolute inset-0 w-full h-full cursor-pointer"
            aria-label="Play video"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero.webp"
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 md:h-10 md:w-10 text-white fill-white ml-1" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
