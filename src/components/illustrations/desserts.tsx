import { useId, type ReactNode } from 'react'
import { scatterInCircle, toPoints, wavyEllipse, type Point } from './geometry'
import { ILLU, INK } from './palette'
import { LayeredBlock, LayeredFace, Sketch, type Band, type IllustrationProps } from './parts'

const WEDGE_TIP: Point = [36, 142]
const WEDGE_FRONT: Point = [290, 124]
const WEDGE_BACK: Point = [262, 92]
const WEDGE_HEIGHT = 70

export const Cheesecake = ({ label }: IllustrationProps) => {
  const [tx, ty] = WEDGE_TIP
  const [fx, fy] = WEDGE_FRONT
  const [bx, by] = WEDGE_BACK
  const bands: Band[] = [
    { to: 0.08, fill: ILLU.cheeseTop },
    { to: 0.8, fill: ILLU.cheese },
    { to: 1, fill: ILLU.biscuit },
  ]
  return (
    <Sketch label={label}>
      <path
        d={`M${fx},${fy} Q${fx + 8},${(fy + by) / 2} ${bx},${by} V${by + WEDGE_HEIGHT} Q${fx + 8},${(fy + by) / 2 + WEDGE_HEIGHT} ${fx},${fy + WEDGE_HEIGHT} Z`}
        fill={ILLU.cheeseEdge}
        {...INK}
      />
      <LayeredFace
        corners={[
          [tx, ty],
          [fx, fy],
          [fx, fy + WEDGE_HEIGHT],
          [tx, ty + WEDGE_HEIGHT],
        ]}
        bands={bands}
      />
      <path d={`M${tx},${ty} L${fx},${fy} Q${fx + 8},${(fy + by) / 2} ${bx},${by} Z`} fill={ILLU.cheeseTop} {...INK} />
      <path d={`M${tx + 60},${ty - 8} L${bx - 30},${by + 10}`} stroke={ILLU.white} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
    </Sketch>
  )
}

const JAVANAIS_BANDS: Band[] = [
  { to: 0.12, fill: ILLU.chocolateDeep },
  { to: 0.3, fill: ILLU.coffeeCream },
  { to: 0.46, fill: ILLU.joconde },
  { to: 0.62, fill: ILLU.coffeeCream },
  { to: 0.78, fill: ILLU.joconde },
  { to: 0.9, fill: ILLU.coffeeCream },
  { to: 1, fill: ILLU.joconde },
]
const SLICE = { width: 70, height: 88, depthX: 34, depthY: 20 }
const JAVANAIS_SLICES = [
  { x: 172, y: 76 },
  { x: 110, y: 98 },
  { x: 48, y: 120 },
]

const Rosette = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x - 9} cy={y} r={7} fill={ILLU.coffeeCream} {...INK} strokeWidth={2.2} />
    <circle cx={x + 9} cy={y} r={7} fill={ILLU.coffeeCream} {...INK} strokeWidth={2.2} />
    <circle cx={x} cy={y - 6} r={8} fill={ILLU.coffeeCream} {...INK} strokeWidth={2.2} />
    <ellipse cx={x} cy={y - 14} rx={6} ry={4} fill={ILLU.chocolateDeep} {...INK} strokeWidth={2} />
  </g>
)

export const Javanais = ({ label }: IllustrationProps) => (
  <Sketch label={label}>
    <polygon
      points={toPoints([
        [28, 214],
        [236, 214],
        [298, 170],
        [92, 170],
      ])}
      fill={ILLU.gold}
      {...INK}
    />
    {JAVANAIS_SLICES.map(({ x, y }) => (
      <g key={x}>
        <LayeredBlock x={x} y={y} {...SLICE} top={ILLU.chocolate} bands={JAVANAIS_BANDS} />
        <Rosette x={x + SLICE.width / 2 + SLICE.depthX / 2} y={y - SLICE.depthY / 2} />
      </g>
    ))}
  </Sketch>
)

const LOAF_SIDE = 'M40,192 L40,122 L180,86 Q235,36 290,86 L290,156 L150,192 Z'
const LOAF_TOP = 'M40,122 Q95,72 150,122 L290,86 Q235,36 180,86 Z'
const LOAF_CUT = 'M40,192 L40,122 Q95,72 150,122 L150,192 Z'
const LOAF_CRUMB = 'M49,185 L49,127 Q95,86 141,127 L141,185 Z'

type LoafProps = IllustrationProps & {
  side: string
  top: string
  crust: string
  crumb: string
  inside?: ReactNode
  coating?: ReactNode
}

/** A loaf cake, cut at the front so the crumb shows. */
const Loaf = ({ label, side, top, crust, crumb, inside, coating }: LoafProps) => {
  const crumbClip = useId()
  const loafClip = useId()
  return (
    <Sketch label={label}>
      <path d={LOAF_SIDE} fill={side} {...INK} />
      <path d={LOAF_TOP} fill={top} {...INK} />
      <clipPath id={loafClip}>
        <path d={LOAF_SIDE} />
      </clipPath>
      <g clipPath={`url(#${loafClip})`}>{coating}</g>
      <path d={LOAF_SIDE} fill="none" {...INK} />
      <path d={LOAF_TOP} fill="none" {...INK} />
      <path d={LOAF_CUT} fill={crust} {...INK} />
      <clipPath id={crumbClip}>
        <path d={LOAF_CRUMB} />
      </clipPath>
      <path d={LOAF_CRUMB} fill={crumb} />
      <g clipPath={`url(#${crumbClip})`}>{inside}</g>
      <path d={LOAF_CRUMB} fill="none" stroke={ILLU.ink} strokeWidth={1.6} opacity={0.5} />
    </Sketch>
  )
}

const NUTS = scatterInCircle(40, 120, 5).map((nut) => ({ ...nut, x: nut.x * 1.1 + 200, y: nut.y * 0.5 + 110 }))

export const CakeMarbre = ({ label }: IllustrationProps) => (
  <Loaf
    label={label}
    side={ILLU.rocher}
    top={ILLU.rocher}
    crust={ILLU.rocher}
    crumb={ILLU.crumb}
    coating={
      <g fill={ILLU.nut}>
        {NUTS.map((nut) => (
          <circle key={`${nut.x}-${nut.y}`} cx={nut.x} cy={nut.y} r={2.6} />
        ))}
      </g>
    }
    inside={
      <path
        d="M44,176 C64,118 108,186 118,132 C124,104 96,98 86,120 C78,140 58,128 68,106"
        fill="none"
        stroke={ILLU.cocoaSide}
        strokeWidth={13}
        strokeLinecap="round"
      />
    }
  />
)

const DRIP_POSITIONS = [0.12, 0.3, 0.46, 0.64, 0.8, 0.94]
const DRIP_LENGTHS = [20, 30, 16, 26, 18, 28]
/** Drips hang from the long top edge of the loaf, from the cut end (150,122) to the far end (290,86). */
const ICING_DRIPS = DRIP_POSITIONS.map((t, i) => {
  const x = 150 + 140 * t
  const y = 122 - 36 * t
  return `M${x - 6},${y - 2} q6,${DRIP_LENGTHS[i] * 2} 12,0 Z`
})
const ZEST = scatterInCircle(14, 60, 9).map((speck) => ({ ...speck, x: speck.x * 1.6 + 170, y: speck.y * 0.35 + 82 }))

export const CakeCitron = ({ label }: IllustrationProps) => (
  <Loaf
    label={label}
    side={ILLU.crust}
    top={ILLU.white}
    crust={ILLU.crust}
    crumb={ILLU.lemonCrumb}
    coating={
      <g>
        {ICING_DRIPS.map((d) => (
          <path key={d} d={d} fill={ILLU.white} {...INK} strokeWidth={2.2} />
        ))}
        {ZEST.map((speck) => (
          <circle key={`${speck.x}-${speck.y}`} cx={speck.x} cy={speck.y} r={2.4} fill={ILLU.zest} />
        ))}
      </g>
    }
  />
)

const CHOUX_BALLS = [
  { cx: 172, cy: 104, r: 52, seed: 21 },
  { cx: 112, cy: 152, r: 56, seed: 22 },
  { cx: 218, cy: 158, r: 52, seed: 23 },
]
const SUGAR_PER_BALL = 9
const CRAQUELIN_WAVES = 14
const CRAQUELIN_DEPTH = 0.05

export const Chouquettes = ({ label }: IllustrationProps) => (
  <Sketch label={label}>
    {CHOUX_BALLS.map(({ cx, cy, r, seed }) => (
      <g key={seed}>
        <path
          d={wavyEllipse({ cx, cy, rx: r, ry: r * 0.9, waves: CRAQUELIN_WAVES, depth: CRAQUELIN_DEPTH })}
          fill={ILLU.choux}
          {...INK}
        />
        <path d={`M${cx - r * 0.62},${cy - r * 0.1} Q${cx - r * 0.5},${cy - r * 0.7} ${cx + r * 0.1},${cy - r * 0.72}`} fill="none" stroke={ILLU.chouxLight} strokeWidth={9} strokeLinecap="round" />
        <path d={`M${cx - r * 0.5},${cy + r * 0.55} Q${cx},${cy + r * 0.8} ${cx + r * 0.6},${cy + r * 0.45}`} fill="none" stroke={ILLU.chouxDeep} strokeWidth={6} strokeLinecap="round" />
        {scatterInCircle(SUGAR_PER_BALL, r * 0.62, seed).map((grain) => (
          <rect
            key={`${grain.x}-${grain.y}`}
            x={cx + grain.x - 4}
            y={cy + grain.y * 0.8 - 6}
            width={8}
            height={6}
            rx={2}
            fill={ILLU.white}
            stroke={ILLU.ink}
            strokeWidth={1.4}
            transform={`rotate(${grain.turn} ${cx + grain.x} ${cy + grain.y * 0.8 - 3})`}
          />
        ))}
      </g>
    ))}
  </Sketch>
)
