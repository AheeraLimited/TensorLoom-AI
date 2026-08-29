export default function LoomMark({ size = 32, animate = false }) {
  const h = size
  const w = size
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animate ? 'loom-mark loom-mark-animate' : 'loom-mark'}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0A0A0C" />
      <path
        d="M14 24 L28 14 L28 24 L18 32 L28 40 L28 50 L14 40 Z"
        fill="#F3F2EE"
      />
      <path
        d="M50 24 L36 14 L36 24 L46 32 L36 40 L36 50 L50 40 Z"
        fill="#C99A44"
      />
    </svg>
  )
}
