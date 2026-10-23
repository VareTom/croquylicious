import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react'

/** Short pause before a hover opens the popover, so sweeping the mouse across the shelf doesn't flash them all. */
const HOVER_OPEN_DELAY_MS = 120

/**
 * Opens on mouse hover, toggles on tap or keyboard, and closes on Escape, outside tap or when focus leaves.
 * Spread `rootProps` on the element that contains both the trigger and the popover.
 */
export const usePopover = <T extends HTMLElement>() => {
  const [isOpen, setOpen] = useState(false)
  const rootRef = useRef<T>(null)
  const lastPointer = useRef('')
  const hoverTimer = useRef<number | undefined>(undefined)

  const close = useCallback(() => {
    window.clearTimeout(hoverTimer.current)
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handlePointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  useEffect(() => () => window.clearTimeout(hoverTimer.current), [])

  const rootProps = {
    ref: rootRef,
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      hoverTimer.current = window.setTimeout(() => setOpen(true), HOVER_OPEN_DELAY_MS)
    },
    onPointerLeave: (event: PointerEvent) => {
      if (event.pointerType === 'mouse') close()
    },
    onBlur: (event: FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget)) close()
    },
  }

  const triggerProps = {
    'aria-expanded': isOpen,
    onPointerDown: (event: PointerEvent) => {
      lastPointer.current = event.pointerType
    },
    onClick: () => {
      const isMouse = lastPointer.current === 'mouse'
      lastPointer.current = ''
      if (isMouse) {
        window.clearTimeout(hoverTimer.current)
        setOpen(true)
        return
      }
      setOpen((open) => !open)
    },
  }

  return { isOpen, close, rootProps, triggerProps }
}
