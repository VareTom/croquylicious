export type Point = readonly [number, number]

export const lerp = (a: Point, b: Point, t: number): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

export const toPoints = (points: readonly Point[]) => points.map(([x, y]) => `${x},${y}`).join(' ')

const SEED_MULTIPLIER = 0x6d2b79f5
const UINT32 = 4294967296

/** Deterministic pseudo-random numbers in [0, 1), so decorations look scattered but never move between renders. */
export const seeded = (seed: number) => {
  let state = seed
  return () => {
    state = (state + SEED_MULTIPLIER) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / UINT32
  }
}

/** `count` points spread inside a circle of radius `radius` centred on the origin. */
export const scatterInCircle = (count: number, radius: number, seed: number) => {
  const random = seeded(seed)
  return Array.from({ length: count }, () => {
    const angle = random() * Math.PI * 2
    const distance = Math.sqrt(random()) * radius
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, turn: random() * 180 }
  })
}

/** A closed path around an ellipse whose edge ripples `waves` times, like a fluted tart rim or a craquelin. */
export const wavyEllipse = ({ cx, cy, rx, ry, waves, depth }: { cx: number; cy: number; rx: number; ry: number; waves: number; depth: number }) => {
  const steps = waves * 8
  const points = Array.from({ length: steps }, (_, i) => {
    const t = (i / steps) * Math.PI * 2
    const ripple = 1 - depth * Math.abs(Math.sin((t * waves) / 2))
    return [cx + Math.cos(t) * rx * ripple, cy + Math.sin(t) * ry * ripple] as const
  })
  return `M${toPoints(points)}Z`
}
