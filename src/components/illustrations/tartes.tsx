import { scatterInCircle } from './geometry'
import { ILLU, INK } from './palette'
import { Sketch, TartShell, TopView, type IllustrationProps } from './parts'

const LARGE_TART = { cx: 160, cy: 112, rx: 138, ry: 50, height: 36 }
const LARGE_FILLING_RADIUS = 122
const TARTLET = { cx: 160, cy: 150, rx: 102, ry: 36, height: 40 }

const PEAR_ANGLES = [45, 135, 225, 315]
const PEAR_DISTANCE = 58
const PEAR_PATH = 'M0,-40 C22,-32 27,18 0,36 C-27,18 -22,-32 0,-40 Z'
const ALMONDS = scatterInCircle(34, 112, 3)

export const TarteBourdaloue = ({ label }: IllustrationProps) => (
  <Sketch label={label}>
    <TartShell {...LARGE_TART} filling={ILLU.almondCream} />
    <TopView {...LARGE_TART} clip={LARGE_FILLING_RADIUS}>
      {PEAR_ANGLES.map((angle) => {
        const radians = (angle * Math.PI) / 180
        const x = Math.cos(radians) * PEAR_DISTANCE
        const y = Math.sin(radians) * PEAR_DISTANCE
        return (
          <g key={angle} transform={`translate(${x} ${y}) rotate(${angle - 90})`}>
            <path d={PEAR_PATH} fill={ILLU.pear} {...INK} />
            <path d="M-10,-20 L-12,22 M0,-30 L0,28 M10,-20 L12,22" stroke={ILLU.pearLine} strokeWidth={2.2} />
          </g>
        )
      })}
      {ALMONDS.map((almond) => (
        <ellipse
          key={`${almond.x}-${almond.y}`}
          cx={almond.x}
          cy={almond.y}
          rx={7}
          ry={3.4}
          fill={ILLU.almondFlake}
          stroke={ILLU.toast}
          strokeWidth={1.4}
          transform={`rotate(${almond.turn} ${almond.x} ${almond.y})`}
        />
      ))}
    </TopView>
  </Sketch>
)

const WAVE_OFFSETS = Array.from({ length: 21 }, (_, i) => (i - 10) * 13)
const ZEST = scatterInCircle(26, 110, 11)

export const TarteCitronMeringuee = ({ label }: IllustrationProps) => (
  <Sketch label={label}>
    <TartShell {...LARGE_TART} filling={ILLU.meringueShadow} />
    <TopView {...LARGE_TART} clip={LARGE_FILLING_RADIUS}>
      {WAVE_OFFSETS.map((x) => (
        <g key={x} fill="none" strokeLinecap="round">
          <path d={`M${x - 20},-130 C${x + 24},-70 ${x - 34},-10 ${x + 6},50 S${x - 14},110 ${x + 16},140`} stroke={ILLU.toast} strokeWidth={11} />
          <path d={`M${x - 22},-130 C${x + 22},-70 ${x - 36},-10 ${x + 4},50 S${x - 16},110 ${x + 14},140`} stroke={ILLU.meringue} strokeWidth={7} />
        </g>
      ))}
      {ZEST.map((speck) => (
        <circle key={`${speck.x}-${speck.y}`} cx={speck.x} cy={speck.y} r={2.2} fill={ILLU.zest} />
      ))}
    </TopView>
  </Sketch>
)

const MERINGUE_PEAKS =
  'M88,150 C74,122 104,112 108,96 C116,116 128,112 134,78 C140,100 150,98 158,46 C168,88 178,92 188,66 C192,96 204,100 216,86 C220,110 242,122 232,150 Q160,172 88,150 Z'
const MERINGUE_TOAST = [
  'M158,50 C154,82 148,104 138,132',
  'M134,82 C130,104 124,118 116,138',
  'M188,70 C186,96 182,112 176,136',
  'M216,90 C214,110 208,124 204,140',
  'M108,100 C104,116 100,128 98,142',
]

export const TarteletteCitron = ({ label }: IllustrationProps) => (
  <Sketch label={label}>
    <TartShell {...TARTLET} filling={ILLU.lemon} rim={10} flutes={18} />
    <path d={MERINGUE_PEAKS} fill={ILLU.meringue} />
    <g fill="none" stroke={ILLU.toast} strokeWidth={6} strokeLinecap="round" opacity={0.85}>
      {MERINGUE_TOAST.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
    <path d={MERINGUE_PEAKS} fill="none" {...INK} />
  </Sketch>
)

const PIPING_COUNT = 22
const PIPING = Array.from({ length: PIPING_COUNT }, (_, i) => {
  const t = (i / PIPING_COUNT) * Math.PI * 2
  return { x: TARTLET.cx + (TARTLET.rx - 12) * Math.cos(t), y: TARTLET.cy + 2 + (TARTLET.ry - 5) * Math.sin(t), front: Math.sin(t) > 0 }
})

const STRAWBERRY = 'M0,-24 C17,-24 22,-4 13,11 C7,21 -7,21 -13,11 C-22,-4 -17,-24 0,-24 Z'
const STRAWBERRIES = [
  { x: 122, y: 128, turn: -20 },
  { x: 196, y: 128, turn: 25 },
  { x: 158, y: 134, turn: 4 },
  { x: 138, y: 106, turn: -12 },
  { x: 180, y: 104, turn: 16 },
  { x: 158, y: 84, turn: -4 },
]

const PipingDot = ({ x, y }: { x: number; y: number }) => (
  <circle cx={x} cy={y} r={9} fill={ILLU.mint} {...INK} strokeWidth={2.2} />
)

export const TarteletteFraiseMenthe = ({ label }: IllustrationProps) => (
  <Sketch label={label}>
    <TartShell {...TARTLET} filling={ILLU.almondCream} rim={10} flutes={18} />
    {PIPING.filter((dot) => !dot.front).map((dot) => (
      <PipingDot key={dot.x} x={dot.x} y={dot.y} />
    ))}
    {STRAWBERRIES.map((berry) => (
      <g key={`${berry.x}-${berry.y}`} transform={`translate(${berry.x} ${berry.y}) rotate(${berry.turn})`}>
        <path d={STRAWBERRY} fill={ILLU.strawberry} {...INK} strokeWidth={2.4} />
        <path d={STRAWBERRY} fill={ILLU.strawberryFlesh} transform="translate(0 -2) scale(0.55)" />
        <g fill={ILLU.seed}>
          <ellipse cx={-9} cy={-6} rx={1.4} ry={2.2} />
          <ellipse cx={9} cy={-4} rx={1.4} ry={2.2} />
          <ellipse cx={0} cy={12} rx={1.4} ry={2.2} />
        </g>
      </g>
    ))}
    <g transform="translate(176 70) rotate(-30)">
      <ellipse rx={15} ry={7} fill={ILLU.leaf} {...INK} strokeWidth={2.2} />
      <line x1={-12} x2={12} stroke={ILLU.ink} strokeWidth={1.4} />
    </g>
    {PIPING.filter((dot) => dot.front).map((dot) => (
      <PipingDot key={dot.x} x={dot.x} y={dot.y} />
    ))}
  </Sketch>
)
