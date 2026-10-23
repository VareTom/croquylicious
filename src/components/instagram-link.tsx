import { clsx } from 'clsx'
import { INSTAGRAM_URL } from '../data/site'

type InstagramLinkProps = {
  label?: string
  variant?: 'primary' | 'ghost' | 'compact'
  className?: string
}

export const InstagramLink = ({ label = 'Commander sur Instagram', variant = 'primary', className }: InstagramLinkProps) => (
  <a
    className={clsx('btn', `btn--${variant}`, className)}
    href={INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" className="btn__icon-dot" />
    </svg>
    <span>{label}</span>
  </a>
)
