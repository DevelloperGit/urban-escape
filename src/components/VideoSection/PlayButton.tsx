type PlayButtonProps = {
  onClick?: () => void
  className?: string
}

/** Иконка Play (Figma play.svg + внешнее кольцо Promo-Video, 240×240). */
function PlayIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="120"
        cy="120"
        r="119.337"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.325"
      />
      <circle
        cx="120"
        cy="120"
        r="65.587"
        stroke="currentColor"
        strokeWidth="1.325"
      />
      <path
        d="M87.152 90.061v57.969l66.249-28.985L87.152 90.061z"
        fill="currentColor"
      />
    </svg>
  )
}

export function PlayButton({ onClick, className = '' }: PlayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-text-primary ${className}`.trim()}
      style={{
        width: 'var(--size-video-play)',
        height: 'var(--size-video-play)',
      }}
      aria-label="Play video"
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 'calc(var(--size-video-play) * 0.92)',
          height: 'calc(var(--size-video-play) * 0.92)',
        }}
      >
        <PlayIcon />
      </span>
    </button>
  )
}