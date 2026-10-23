import type { ReactNode } from 'react'
import { scatterInCircle, toPoints, type Point } from './geometry'
import { ILLU, INK } from './palette'
import { Cylinder, LayeredFace, Sketch, TopView, type Band, type IllustrationProps } from './parts'

const CAKE = { cx: 140, cy: 96, rx: 112, ry: 36, height: 72 }
const SCALE_ROW = 13
const SCALE_STEP = 16

const SLICE_FRONT: [Point, Point, Point, Point] = [
  [180, 162],
  [284, 174],
  [284, 228],
  [180, 216],
]
const SLICE_TIP: Point = [214, 136]

/** Rows of little piped arcs, like the textured spray on the entremets. */
const Scales = ({ color }: { color: string }) => {
  const rows = Array.from({ length: Math.ceil((CAKE.rx * 2) / SCALE_ROW) + 1 }, (_, row) => -CAKE.rx + row * SCALE_ROW)
  const columns = Array.from({ length: Math.ceil((CAKE.rx * 2) / SCALE_STEP) + 2 }, (_, col) => -CAKE.rx + col * SCALE_STEP)
  return (
    <g fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
      {rows.map((y, row) =>
        columns.map((x) => {
          const shift = row % 2 === 0 ? 0 : SCALE_STEP / 2
          return <path key={`${x}-${y}`} d={`M${x + shift - 7},${y} q7,11 14,0`} />
        }),
      )}
    </g>
  )
}

type EntremetProps = IllustrationProps & {
  side: string
  top: string
  sliceBands: Band[]
  decoration: ReactNode
  topping?: ReactNode
}

/** A whole entremet with one slice set in front of it to show the inside. */
const Entremet = ({ label, side, top, sliceBands, decoration, topping }: EntremetProps) => (
  <Sketch label={label}>
    <Cylinder {...CAKE} side={side} top={top} />
    <TopView cx={CAKE.cx} cy={CAKE.cy} rx={CAKE.rx} ry={CAKE.ry} clip={CAKE.rx - 2}>
      {decoration}
    </TopView>
    {topping}
    <polygon points={toPoints([SLICE_FRONT[0], SLICE_FRONT[1], SLICE_TIP])} fill={top} {...INK} />
    <LayeredFace corners={SLICE_FRONT} bands={sliceBands} />
  </Sketch>
)

const Hazelnut = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y} r={8} fill={ILLU.hazelnut} {...INK} strokeWidth={2.4} />
    <circle cx={x - 2.5} cy={y - 3} r={2.4} fill={ILLU.almondFlake} />
  </g>
)

export const EntremetToutChocolat = ({ label }: IllustrationProps) => (
  <Entremet
    label={label}
    side={ILLU.cocoaSide}
    top={ILLU.cocoa}
    decoration={<Scales color={ILLU.cocoaLine} />}
    sliceBands={[
      { to: 0.42, fill: ILLU.milkChocolate },
      { to: 0.64, fill: ILLU.chocolate },
      { to: 0.8, fill: ILLU.praline },
      { to: 1, fill: ILLU.chocolateDeep },
    ]}
  />
)

export const EntremetVanilleNoisette = ({ label }: IllustrationProps) => (
  <Entremet
    label={label}
    side={ILLU.vanillaSide}
    top={ILLU.vanilla}
    decoration={
      <>
        <Scales color={ILLU.vanillaLine} />
        <g stroke={ILLU.chocolateDeep} strokeWidth={7} strokeLinecap="round">
          <line x1={-34} y1={-30} x2={30} y2={34} />
          <line x1={-30} y1={34} x2={34} y2={-30} />
        </g>
        <Hazelnut x={-66} y={-18} />
        <Hazelnut x={58} y={-52} />
        <Hazelnut x={18} y={64} />
      </>
    }
    sliceBands={[
      { to: 0.38, fill: ILLU.vanillaCream },
      { to: 0.48, fill: ILLU.praline },
      { to: 0.66, fill: ILLU.chocolate },
      { to: 0.86, fill: ILLU.milkChocolate },
      { to: 1, fill: ILLU.chocolateDeep },
    ]}
  />
)

const GOLD_FLECKS = scatterInCircle(9, 95, 7)

export const EntremetManguePassion = ({ label }: IllustrationProps) => (
  <Entremet
    label={label}
    side={ILLU.glazeSide}
    top={ILLU.glaze}
    decoration={
      <>
        <path d="M-84,-30 Q-40,-86 40,-78" fill="none" stroke={ILLU.white} strokeWidth={7} opacity={0.5} />
        {GOLD_FLECKS.map((fleck) => (
          <rect
            key={`${fleck.x}-${fleck.y}`}
            x={fleck.x}
            y={fleck.y}
            width={7}
            height={5}
            fill={ILLU.gold}
            transform={`rotate(${fleck.turn} ${fleck.x} ${fleck.y})`}
          />
        ))}
      </>
    }
    sliceBands={[
      { to: 0.08, fill: ILLU.glaze },
      { to: 0.36, fill: ILLU.milkChocolate },
      { to: 0.56, fill: ILLU.mango },
      { to: 0.72, fill: ILLU.milkChocolate },
      { to: 0.88, fill: ILLU.chocolate },
      { to: 1, fill: ILLU.chocolateDeep },
    ]}
    topping={
      <>
        <path d="M128,86 Q166,30 214,58 Q178,62 128,86 Z" fill={ILLU.mango} {...INK} />
        <path d="M140,80 Q170,46 204,60" fill="none" stroke={ILLU.mangoDeep} strokeWidth={3} strokeLinecap="round" />
      </>
    }
  />
)
