import { useCallback, useState } from 'react'
import promoVideoBg from '../../../assets/promo-video.png'
import promoVideo2Bg from '../../../assets/restoran.png'
import { VideoModal } from '../VideoModal'
import { PlayButton } from './PlayButton'

const DEFAULT_PROMO_VIDEO_SRC = '/video/Restaurant_Architectura.mp4'

export type VideoSectionVariant = 'default' | 'promo2'

export type VideoSectionProps = {
  variant?: VideoSectionVariant
  onPlayClick?: () => void
  posterSrc?: string
  videoSrc?: string
}

function VideoSpacer({ heightVar }: { heightVar: string }) {
  return (
    <div
      className="w-full shrink-0 bg-surface-black"
      style={{ height: `var(${heightVar})` }}
      aria-hidden
    />
  )
}

function DefaultPromoVideo({
  posterSrc,
  onPlayClick,
}: Pick<VideoSectionProps, 'posterSrc' | 'onPlayClick'>) {
  return (
    <>
      <VideoSpacer heightVar="--spacing-video-spacer-h" />

      <div
        className="flex w-full flex-col bg-surface-black"
        style={{
          paddingLeft: 'var(--spacing-video-inset-x)',
          paddingRight: 'var(--spacing-video-inset-x)',
          paddingTop: 'var(--spacing-video-inset-y)',
          paddingBottom: 'var(--spacing-video-inset-y)',
        }}
      >
        <div
          className="group ue-promo-video relative w-full overflow-hidden bg-surface-black"
          style={{
            height: 'var(--size-video-media-h)',
            borderRadius: 'var(--radius-video-media)',
          }}
        >
          <div
            className="ue-promo-video__poster pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${posterSrc ?? promoVideoBg})` }}
            aria-hidden
          />

          <div
            className="ue-promo-video__overlay pointer-events-none absolute inset-0"
            style={{
              backdropFilter: 'blur(var(--video-preview-blur))',
              WebkitBackdropFilter: 'blur(var(--video-preview-blur))',
              backgroundColor: 'var(--color-video-preview-dim)',
            }}
            aria-hidden
          />

          <div className="absolute inset-0 z-[1] flex items-center justify-center">
            <PlayButton
              onClick={onPlayClick}
              className="ue-promo-video__play"
            />
          </div>
        </div>
      </div>
    </>
  )
}

/** Promo video 2 — full-bleed, без inset и скругления (Figma 2060:11061). */
function Promo2Video({
  posterSrc,
  onPlayClick,
}: Pick<VideoSectionProps, 'posterSrc' | 'onPlayClick'>) {
  return (
    <>
      <VideoSpacer heightVar="--spacing-video2-spacer-h" />

      <div
        className="group ue-promo-video relative flex w-full items-center justify-center overflow-hidden bg-surface-black"
        style={{
          height: 'var(--size-video2-media-h)',
          borderRadius: 'var(--radius-video2-media)',
        }}
      >
        <div
          className="ue-promo-video__poster pointer-events-none absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${posterSrc ?? promoVideo2Bg})`,
            backgroundPosition: 'var(--ue-video2-bg-position)',
          }}
          aria-hidden
        />

        <div
          className="ue-promo-video__overlay ue-promo-video__overlay--promo2 pointer-events-none absolute inset-0"
          aria-hidden
        />

        <div className="relative z-[1] flex items-center justify-center">
          <PlayButton
            onClick={onPlayClick}
            className="ue-promo-video__play"
          />
        </div>
      </div>
    </>
  )
}

export function VideoSection({
  variant = 'default',
  onPlayClick,
  posterSrc,
  videoSrc = DEFAULT_PROMO_VIDEO_SRC,
}: VideoSectionProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handlePlayClick = useCallback(() => {
    onPlayClick?.()
    setIsVideoModalOpen(true)
  }, [onPlayClick])

  const handleCloseVideoModal = useCallback(() => {
    setIsVideoModalOpen(false)
  }, [])

  return (
    <>
      <section className="flex w-full flex-col bg-surface-black">
        {variant === 'promo2' ? (
          <Promo2Video posterSrc={posterSrc} onPlayClick={handlePlayClick} />
        ) : (
          <DefaultPromoVideo posterSrc={posterSrc} onPlayClick={handlePlayClick} />
        )}
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        src={videoSrc}
      />
    </>
  )
}