import { useCallback, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

export type VideoModalProps = {
  isOpen: boolean
  onClose: () => void
  src: string
  title?: string
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function resetVideo(video: HTMLVideoElement | null) {
  if (!video) return
  video.pause()
  video.currentTime = 0
}

export function VideoModal({
  isOpen,
  onClose,
  src,
  title = 'Промо-видео',
}: VideoModalProps) {
  const titleId = useId()
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleClose = useCallback(() => {
    resetVideo(videoRef.current)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      resetVideo(videoRef.current)
    }
  }, [handleClose, isOpen])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div
      className="ue-video-modal fixed inset-0 z-[var(--z-index-video-modal)] flex items-center justify-center p-[var(--spacing-video-modal-inset)]"
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      role="presentation"
      onClick={handleClose}
    >
      <div
        className="ue-video-modal__backdrop pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="ue-video-modal__dialog relative flex w-full max-w-[var(--size-video-modal-max-w)] flex-col overflow-hidden bg-surface-black shadow-[var(--shadow-video-modal)]"
        style={{ borderRadius: 'var(--radius-video-modal)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">
          {title}
        </h2>

        <button
          ref={closeButtonRef}
          type="button"
          className="ue-video-modal__close absolute z-[1] flex cursor-pointer items-center justify-center rounded-full border border-solid border-[rgb(255_255_255/0.35)] bg-[rgb(0_0_0/0.45)] text-text-primary transition-[opacity,transform,background-color] duration-[var(--ue-motion-duration-hover)] ease-[var(--ue-motion-ease-out)] hover:bg-[rgb(0_0_0/0.65)]"
          style={{
            top: 'var(--spacing-video-modal-close-inset)',
            right: 'var(--spacing-video-modal-close-inset)',
            width: 'var(--size-video-modal-close)',
            height: 'var(--size-video-modal-close)',
          }}
          onClick={handleClose}
          aria-label="Закрыть видео"
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: 'var(--size-video-modal-close-icon)',
              height: 'var(--size-video-modal-close-icon)',
            }}
          >
            <CloseIcon />
          </span>
        </button>

        <video
          ref={videoRef}
          className="block h-auto w-full bg-surface-black"
          style={{
            maxHeight: 'var(--size-video-modal-max-h)',
            borderRadius: 'var(--radius-video-modal)',
          }}
          src={src}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>,
    document.body,
  )
}