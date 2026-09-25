"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/content";
import { statusText } from "@/lib/content";
import Icon from "@/components/Icons";

/**
 * The 16:10 visual slot for a project. Renders the real screenshot when
 * `project.image` is set (drop the file in /public/projects and set the path
 * in lib/content.ts); until then, a "no signal" terminal pane holds the slot.
 */
export default function ProjectVisual({ project }: { project: Project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isMobileAspect = !!project.mobileAspect;

  const images = useMemo(() => {
    if (project.images && project.images.length > 0) {
      return project.images;
    }
    if (project.image) {
      return [project.image];
    }
    return [];
  }, [project.images, project.image]);

  const currentImage = images[currentImageIndex];

  useEffect(() => {
    setFailed(false);
  }, [currentImage]);

  const goToPreviousImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const opener = openButtonRef.current;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        return;
      }
      if (event.key === "ArrowLeft") {
        goToPreviousImage();
        return;
      }
      if (event.key === "ArrowRight") {
        goToNextImage();
        return;
      }
      // Trap Tab inside the dialog.
      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) {
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      opener?.focus();
    };
  }, [isModalOpen, goToNextImage, goToPreviousImage]);

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

  if (images.length > 0 && !failed) {
    const modal =
      isModalOpen && currentImage ? (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-bg-inset/95 p-3 sm:p-4"
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
              className={`relative overflow-hidden rounded-sm bg-bg-inset ${
                isMobileAspect
                  ? "aspect-[9/20] max-h-[calc(100dvh-4.5rem)] max-w-[calc(100vw-1.5rem)] sm:max-h-[calc(100dvh-5rem)] sm:max-w-[420px]"
                  : "aspect-[16/10] max-h-[calc(100dvh-4.5rem)] max-w-[calc(100vw-1.5rem)] sm:max-h-[calc(100dvh-5rem)] sm:max-w-[960px]"
              }`}
              style={{
                width: isMobileAspect
                  ? "min(420px, calc(100vw - 1.5rem), calc((100dvh - 4.5rem) * 0.45))"
                  : "min(960px, calc(100vw - 1.5rem), calc((100dvh - 4.5rem) * 1.6))",
              }}
            >
              <Image
                src={currentImage}
                alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                width={isMobileAspect ? 1080 : 1600}
                height={isMobileAspect ? 2400 : 1000}
                sizes={isMobileAspect ? "420px" : "960px"}
                className="h-full w-full object-contain"
                onError={() => setFailed(true)}
              />
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-sm bg-bg-raised/80 text-ink transition-colors hover:bg-bg-raised"
              aria-label="Close screenshots"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPreviousImage}
                  className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-bg-raised/80 text-ink transition-colors hover:bg-bg-raised"
                  aria-label="Previous image"
                >
                  <Icon name="chev-left" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-bg-raised/80 text-ink transition-colors hover:bg-bg-raised"
                  aria-label="Next image"
                >
                  <Icon name="chev-right" className="h-5 w-5" />
                </button>

                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-0.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className="flex h-11 w-11 items-center justify-center"
                      aria-label={`Go to image ${idx + 1}`}
                      aria-current={idx === currentImageIndex}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "bg-ink"
                            : "bg-ink-faint"
                        }`}
                      />
                    </button>
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
          className={`group relative w-full overflow-hidden rounded-sm border border-line bg-bg-inset ${
            isMobileAspect ? "aspect-[9/16]" : "aspect-[16/10]"
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label={`Open ${project.name} screenshots`}
            className="block h-full w-full cursor-pointer"
          >
            <Image
              src={currentImage}
              alt={`${project.name} screenshot ${currentImageIndex + 1}`}
              width={isMobileAspect ? 1080 : 1600}
              height={isMobileAspect ? 2400 : 1000}
              sizes="(min-width: 640px) 320px, calc(100vw - 40px)"
              className={
                isMobileAspect
                  ? "h-full w-full object-contain p-3"
                  : "h-full w-full object-cover object-top"
              }
              onError={() => setFailed(true)}
            />
          </button>

          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label={`Open ${project.name} screenshots`}
            className="absolute bottom-3 left-3 z-10 flex min-h-[44px] items-center gap-1.5 rounded-sm bg-bg-raised/80 px-2.5 text-xs text-ink-faint transition-colors hover:bg-bg-raised hover:text-ink"
          >
            <Icon name="expand" className="h-4 w-4" />
            expand
          </button>

          {images.length > 1 && (
            <>
              <span className="sr-only">Swipe preview for more images</span>
              <button
                type="button"
                onClick={() => goToPreviousImage()}
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-bg-raised/80 text-ink transition-colors hover:bg-bg-raised"
                aria-label="Previous preview image"
              >
                <Icon name="chev-left" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goToNextImage()}
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-bg-raised/80 text-ink transition-colors hover:bg-bg-raised"
                aria-label="Next preview image"
              >
                <Icon name="chev-right" className="h-5 w-5" />
              </button>

              <div className="absolute right-3 top-3 rounded-sm bg-bg-raised/80 px-2 py-1 font-mono text-xs text-ink">
                {currentImageIndex + 1} / {images.length}
                <span className="sm:hidden"> · swipe</span>
              </div>

              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className="flex h-11 w-11 items-center justify-center"
                    aria-label={`Show preview image ${idx + 1}`}
                    aria-current={idx === currentImageIndex}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? "w-6 bg-ink"
                          : "w-2 bg-ink-faint"
                      }`}
                    />
                  </button>
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

  if (project.selfPreview) {
    return (
      <a
        href="#top"
        aria-label="This site is the live preview — jump back to the top"
        className="group flex aspect-[16/10] flex-col overflow-hidden rounded-sm border border-line bg-bg-inset transition-colors hover:border-accent focus-visible:border-accent"
      >
        <div className="flex items-center justify-between border-b border-line bg-bg-raised px-3 py-1.5 text-[0.65rem] text-ink-faint">
          <span>{project.slug}.png</span>
          <span className={status.tone}>{status.text}</span>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2.5 px-5 text-[0.85rem]">
          <p className="prompt-line text-ink-dim">file {project.slug}/preview.png</p>
          <p className="out-line text-ink">
            not a screenshot — you&rsquo;re already inside it
          </p>
          <p className="comment text-ink-faint">
            this page is the live build, not a mockup
          </p>
          <p className="mt-1">
            <span className="text-accent font-bold">$ </span>
            <span className="cursor" aria-hidden />
          </p>
        </div>

        <div className="border-t border-line px-3 py-1.5 text-center text-[0.65rem] text-ink-faint opacity-0 transition-opacity group-hover:opacity-100">
          ↑ click to scroll to top
        </div>
      </a>
    );
  }

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