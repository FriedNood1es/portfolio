"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/content";

const statusText: Record<Project["status"], { text: string; tone: string }> = {
  shipped: { text: "[shipped]", tone: "text-ok" },
  "in-progress": { text: "[in progress]", tone: "text-warn" },
  planned: { text: "[planned]", tone: "text-ink-faint" },
};

/**
 * The 16:10 visual slot for a project. Renders the real screenshot when
 * `project.image` is set (drop the file in /public/projects and set the path
 * in lib/content.ts); until then, a "no signal" terminal pane holds the slot.
 */
export default function ProjectVisual({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isBastaFda = project.slug === "bastafda";

  const images = useMemo(() => {
    if (!project.image) {
      return [];
    }

    if (isBastaFda) {
      return [
        "/projects/bastafda_1.jpg",
        "/projects/bastafda_2.jpg",
        "/projects/bastafda_3.jpg",
        "/projects/bastafda_4.jpg",
      ];
    }

    return [project.image];
  }, [isBastaFda, project.image]);

  const currentImage = images[currentImageIndex];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (images.length < 2) {
      return;
    }

    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) <= threshold) {
      return;
    }

    if (diff > 0) {
      goToNextImage();
    } else {
      goToPreviousImage();
    }
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  if (project.image) {
    const modal =
      isModalOpen && currentImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/95 p-3 sm:p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} screenshots`}
        >
          <div
            className="relative flex max-h-[calc(100dvh-1.5rem)] max-w-[calc(100vw-1.5rem)] items-center justify-center sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`relative overflow-hidden rounded-sm bg-black ${
                isBastaFda
                  ? "aspect-[9/20] max-h-[calc(100dvh-4.5rem)] max-w-[calc(100vw-1.5rem)] sm:max-h-[calc(100dvh-5rem)] sm:max-w-[420px]"
                  : "aspect-[16/10] max-h-[calc(100dvh-4.5rem)] max-w-[calc(100vw-1.5rem)] sm:max-h-[calc(100dvh-5rem)] sm:max-w-[960px]"
              }`}
              style={{
                width: isBastaFda
                  ? "min(420px, calc(100vw - 1.5rem), calc((100dvh - 4.5rem) * 0.45))"
                  : "min(960px, calc(100vw - 1.5rem), calc((100dvh - 4.5rem) * 1.6))",
              }}
            >
              <Image
                src={currentImage}
                alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                width={isBastaFda ? 1080 : 1600}
                height={isBastaFda ? 2400 : 1000}
                sizes={isBastaFda ? "420px" : "960px"}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-sm bg-black/70 text-lg leading-none text-white transition-colors hover:bg-black"
              aria-label="Close screenshots"
            >
              x
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPreviousImage}
                  className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm bg-black/70 text-2xl leading-none text-white transition-colors hover:bg-black"
                  aria-label="Previous image"
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm bg-black/70 text-2xl leading-none text-white transition-colors hover:bg-black"
                  aria-label="Next image"
                >
                  {">"}
                </button>

                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2.5 w-2.5 rounded-full transition-all hover:scale-125 ${
                        idx === currentImageIndex ? "bg-white" : "bg-gray-500"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : null;

    return (
      <>
        <div
          className="group relative flex aspect-[16/10] w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-line bg-black transition-opacity hover:opacity-90"
          onClick={() => setIsModalOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={0}
          aria-label={`Open ${project.name} screenshots`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsModalOpen(true);
            }
          }}
        >
          <Image
            src={currentImage}
            alt={`${project.name} screenshot ${currentImageIndex + 1}`}
            width={isBastaFda ? 1080 : 1600}
            height={isBastaFda ? 2400 : 1000}
            sizes="(min-width: 640px) 320px, calc(100vw - 40px)"
            className={`h-full w-full object-contain ${isBastaFda ? "p-3" : ""}`}
            priority={isBastaFda}
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
            <div className="flex flex-col items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="text-sm font-medium text-white">
                Click to expand
              </span>
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm bg-black/65 text-lg leading-none text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                aria-label="Previous preview image"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm bg-black/65 text-lg leading-none text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                aria-label="Next preview image"
              >
                {">"}
              </button>

              <div className="absolute right-3 top-3 rounded-sm bg-black/70 px-2 py-1 font-mono text-xs text-white">
                {currentImageIndex + 1} / {images.length}
              </div>

              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`h-2 w-2 rounded-full transition-all hover:scale-125 ${
                      idx === currentImageIndex ? "bg-white" : "bg-gray-500"
                    }`}
                    aria-label={`Show preview image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {isMounted && modal ? createPortal(modal, document.body) : null}
      </>
    );
  }

  const status = statusText[project.status];

  return (
    <div
      role="img"
      aria-label={`${project.name} - screenshot pending`}
      className="flex aspect-[16/10] flex-col overflow-hidden rounded-sm border border-line bg-bg-inset"
    >
      <div className="flex items-center justify-between border-b border-line bg-bg-raised px-3 py-1.5 text-[0.65rem] text-ink-faint">
        <span>{project.slug}.png</span>
        <span className={status.tone}>{status.text}</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
        <div className="display text-lg font-bold text-ink sm:text-xl">
          {project.name}
        </div>
        <div className="text-[0.7rem] text-ink-faint">
          {project.status === "shipped"
            ? "[[ screenshot pending ]]"
            : "[[ no signal yet ]]"}
        </div>
        <div className="text-[0.65rem] text-ink-faint">
          {project.stack.slice(0, 3).join(" / ")}
        </div>
      </div>
    </div>
  );
}