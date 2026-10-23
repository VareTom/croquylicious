import { useId, type ReactNode } from 'react'
import { lerp, toPoints, wavyEllipse, type Point } from './geometry'
import { ILLU, INK } from './palette'

export type IllustrationProps = {
  label: string
}

type SketchProps = IllustrationProps & {
  children: ReactNode
}

/** Shared canvas: every pastry is drawn on the same 320×240 board so they line up on the shelf. */
export const Sketch = ({ label, children }: SketchProps) => (
  <svg className="illu" viewBox="0 0 320 240" role="img" aria-label={label}>
    {children}
  </svg>
)

type CylinderProps = {
  cx: number
  cy: number
  rx: number
  ry: number
  height: number
  side: string
  top: string
}

/** A round cake seen from three quarters: the side band, then the top ellipse. */
export const Cylinder = ({ cx, cy, rx, ry, height, side, top }: CylinderProps) => (
  <g {...INK}>
    <path d={`M${cx - rx},${cy} V${cy + height} A${rx},${ry} 0 0 0 ${cx + rx},${cy + height} V${cy} Z`} fill={side} />
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={top} />
  </g>
)

type TopViewProps = {
  cx: number
  cy: number
  rx: number
  ry: number
  /** Clips the decoration to this radius, in the unsquashed top-down space. */
  clip?: number
  children: ReactNode
}

/**
 * Draws its children top-down in a circle of radius `rx` centred on the origin, then squashes them onto the
 * cake's top ellipse. Strokes keep their width thanks to `vector-effect` set in CSS.
 */
export const TopView = ({ cx, cy, rx, ry, clip, children }: TopViewProps) => {
  const clipId = useId()
  return (
    <g transform={`translate(${cx} ${cy}) scale(1 ${ry / rx})`}>
      {clip ? (
        <>
          <clipPath id={clipId}>
            <circle r={clip} />
          </clipPath>
          <g clipPath={`url(#${clipId})`}>{children}</g>
        </>
      ) : (
        children
      )}
    </g>
  )
}

export type Band = {
  to: number
  fill: string
}

type LayeredFaceProps = {
  corners: readonly [Point, Point, Point, Point]
  bands: Band[]
  shade?: number
}

/** A cut face (top-left, top-right, bottom-right, bottom-left) split into horizontal layers. */
export const LayeredFace = ({ corners, bands, shade = 0 }: LayeredFaceProps) => {
  const [tl, tr, br, bl] = corners
  return (
    <g>
      {bands.map((band, i) => {
        const from = i === 0 ? 0 : bands[i - 1].to
        const strip = [lerp(tl, bl, from), lerp(tr, br, from), lerp(tr, br, band.to), lerp(tl, bl, band.to)]
        return <polygon key={band.to} points={toPoints(strip)} fill={band.fill} />
      })}
      {shade > 0 && <polygon points={toPoints(corners)} fill={ILLU.ink} opacity={shade} />}
      <polygon points={toPoints(corners)} fill="none" {...INK} />
    </g>
  )
}

type BlockProps = {
  x: number
  y: number
  width: number
  height: number
  depthX: number
  depthY: number
  top: string
  bands: Band[]
}

/** A rectangular slice: layered front and side faces with a flat top. */
export const LayeredBlock = ({ x, y, width, height, depthX, depthY, top, bands }: BlockProps) => {
  const topFace: Point[] = [
    [x, y],
    [x + width, y],
    [x + width + depthX, y - depthY],
    [x + depthX, y - depthY],
  ]
  return (
    <g>
      <LayeredFace
        corners={[
          [x + width, y],
          [x + width + depthX, y - depthY],
          [x + width + depthX, y - depthY + height],
          [x + width, y + height],
        ]}
        bands={bands}
        shade={0.18}
      />
      <LayeredFace
        corners={[
          [x, y],
          [x + width, y],
          [x + width, y + height],
          [x, y + height],
        ]}
        bands={bands}
      />
      <polygon points={toPoints(topFace)} fill={top} {...INK} />
    </g>
  )
}

type TartShellProps = {
  cx: number
  cy: number
  rx: number
  ry: number
  height: number
  filling: string
  rim?: number
  flutes?: number
}

const DEFAULT_RIM = 13
const DEFAULT_FLUTES = 22
const RIM_WAVES = 36
const RIM_DEPTH = 0.025

/** A fluted pastry shell with its filling showing inside the rim. */
export const TartShell = ({
  cx,
  cy,
  rx,
  ry,
  height,
  filling,
  rim = DEFAULT_RIM,
  flutes = DEFAULT_FLUTES,
}: TartShellProps) => {
  const fluteLines = Array.from({ length: flutes - 1 }, (_, i) => {
    const t = (Math.PI * (i + 1)) / flutes
    const x = cx - rx * Math.cos(t)
    const y = cy + ry * Math.sin(t)
    return { x, y }
  })
  return (
    <g>
      <path
        d={`M${cx - rx},${cy} V${cy + height} A${rx},${ry} 0 0 0 ${cx + rx},${cy + height} V${cy} Z`}
        fill={ILLU.crust}
        {...INK}
      />
      {fluteLines.map(({ x, y }) => (
        <line key={x} x1={x} y1={y + 4} x2={x} y2={y + height - 2} stroke={ILLU.crustDeep} strokeWidth={2.5} />
      ))}
      <path d={wavyEllipse({ cx, cy, rx, ry, waves: RIM_WAVES, depth: RIM_DEPTH })} fill={ILLU.crust} {...INK} />
      <ellipse cx={cx} cy={cy + 2} rx={rx - rim} ry={ry - (rim * ry) / rx} fill={filling} {...INK} />
    </g>
  )
}
