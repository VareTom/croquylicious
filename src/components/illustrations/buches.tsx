import { useId, type ReactNode } from 'react'
import { scatterInCircle, toPoints } from './geometry'
import { ILLU, INK } from './palette'
import { Sketch, type IllustrationProps } from './parts'

const END = { cx: 74, cy: 138, rx: 30, ry: 46 }
const LENGTH = { dx: 196, dy: -40 }
const BODY = `M${END.cx},${END.cy - END.ry} L${END.cx + LENGTH.dx},${END.cy - END.ry + LENGTH.dy} A${END.rx},${END.ry} 0 0 1 ${END.cx + LENGTH.dx},${END.cy + END.ry + LENGTH.dy} L${END.cx},${END.cy + END.ry} Z`
const RIDGE_COUNT = 9

/** Points evenly spaced along the log, from just behind the cut end to the far end. */
const alongLog = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const t = (i + 1) / (count + 1)
    return { x: END.cx + LENGTH.dx * t, y: END.cy + LENGTH.dy * t }
  })

const Board = () => (
  <polygon
    points={toPoints([
      [30, 196],
      [262, 150],
      [304, 168],
      [70, 218],
    ])}
    fill={ILLU.gold}
    {...INK}
  />
)

type LogProps = IllustrationProps & {
  body: string
  texture: ReactNode
  endFace: ReactNode
  topping?: ReactNode
}

/** A Christmas log on its gold board: the body, its texture clipped inside, then the cut end. */
const Log = ({ label, body, texture, endFace, topping }: LogProps) => {
  const clipId = useId()
  return (
    <Sketch label={label}>
      <Board />
      <path d={BODY} fill={body} {...INK} />
      <clipPath id={clipId}>
        <path d={BODY} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>{texture}</g>
      <path d={BODY} fill="none" {...INK} />
      {topping}
      <ellipse {...END} fill={body} {...INK} />
      {endFace}
    </Sketch>
  )
}

const Ring = ({ scale, fill }: { scale: number; fill: string }) => (
  <ellipse cx={END.cx} cy={END.cy} rx={END.rx * scale} ry={END.ry * scale} fill={fill} />
)

export const BucheToutChocolat = ({ label }: IllustrationProps) => (
  <Log
    label={label}
    body={ILLU.glazeSide}
    texture={
      <g fill="none" strokeLinecap="round">
        {alongLog(RIDGE_COUNT).map(({ x, y }) => (
          <path
            key={x}
            d={`M${x},${y - END.ry - 4} Q${x + 22},${y} ${x},${y + END.ry + 4}`}
            stroke={ILLU.chocolateDeep}
            strokeWidth={5}
          />
        ))}
        <path
          d={`M${END.cx + 20},${END.cy - END.ry + 12} L${END.cx + LENGTH.dx - 10},${END.cy - END.ry + LENGTH.dy + 14}`}
          stroke={ILLU.white}
          strokeWidth={5}
          opacity={0.45}
        />
      </g>
    }
    endFace={
      <g>
        <Ring scale={0.82} fill={ILLU.milkChocolate} />
        <Ring scale={0.42} fill={ILLU.chocolate} />
        <path d={`M${END.cx - 24},${END.cy + 30} Q${END.cx},${END.cy + 44} ${END.cx + 24},${END.cy + 30}`} fill="none" stroke={ILLU.chocolateDeep} strokeWidth={6} />
      </g>
    }
  />
)

const SPIRAL = `M${END.cx},${END.cy} m-3,0 a5,7 0 1 1 8,4 a10,14 0 1 1 -16,-6 a15,21 0 1 1 22,10 a20,28 0 1 1 -28,-12`

export const BucheMandarinePecan = ({ label }: IllustrationProps) => (
  <Log
    label={label}
    body={ILLU.vanillaCream}
    texture={
      <g fill="none" stroke={ILLU.vanillaLine} strokeWidth={4} strokeLinecap="round">
        {alongLog(RIDGE_COUNT + 2).map(({ x, y }) => (
          <path key={x} d={`M${x - 6},${y - END.ry} q18,${END.ry * 0.5} 0,${END.ry} q-18,${END.ry * 0.5} 0,${END.ry}`} />
        ))}
      </g>
    }
    endFace={
      <g>
        <path
          d={SPIRAL}
          fill="none"
          stroke={ILLU.vanillaLine}
          strokeWidth={4}
          strokeLinecap="round"
          transform={`translate(${END.cx} ${END.cy}) scale(0.62) translate(${-END.cx} ${-END.cy})`}
        />
        <circle cx={END.cx} cy={END.cy} r={5} fill={ILLU.mango} />
      </g>
    }
    topping={
      <g>
        <path d="M188,78 q14,-20 28,-6 q-12,4 -28,6 Z" fill={ILLU.mango} {...INK} strokeWidth={2.4} />
        <path d="M206,72 q14,-20 28,-6 q-12,4 -28,6 Z" fill={ILLU.mangoDeep} {...INK} strokeWidth={2.4} />
        <ellipse cx={160} cy={84} rx={11} ry={6} fill={ILLU.hazelnut} {...INK} strokeWidth={2.4} transform="rotate(-14 160 84)" />
        <path d="M151,85 q9,-4 18,-2" fill="none" stroke={ILLU.chocolateDeep} strokeWidth={1.6} />
      </g>
    }
  />
)

const ROCHER_BITS = scatterInCircle(70, 1, 31).map((bit) => {
  const t = (bit.x + 1) / 2
  return {
    x: END.cx + LENGTH.dx * t + bit.turn / 12,
    y: END.cy + LENGTH.dy * t + bit.y * END.ry,
    size: 2 + (bit.turn % 3),
  }
})

export const BucheRocher = ({ label }: IllustrationProps) => (
  <Log
    label={label}
    body={ILLU.rocher}
    texture={
      <g fill={ILLU.nut}>
        {ROCHER_BITS.map((bit) => (
          <circle key={`${bit.x}-${bit.y}`} cx={bit.x} cy={bit.y} r={bit.size} />
        ))}
      </g>
    }
    endFace={
      <g>
        <Ring scale={0.84} fill={ILLU.milkChocolate} />
        <Ring scale={0.36} fill={ILLU.praline} />
        <path
          d={`M${END.cx - END.rx * 0.8},${END.cy + END.ry * 0.5} Q${END.cx},${END.cy + END.ry * 0.95} ${END.cx + END.rx * 0.8},${END.cy + END.ry * 0.5} L${END.cx + END.rx * 0.6},${END.cy + END.ry * 0.7} Q${END.cx},${END.cy + END.ry * 1.02} ${END.cx - END.rx * 0.6},${END.cy + END.ry * 0.7} Z`}
          fill={ILLU.joconde}
        />
      </g>
    }
  />
)
