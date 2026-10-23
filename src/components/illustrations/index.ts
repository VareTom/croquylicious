import type { ComponentType } from 'react'
import { BucheMandarinePecan, BucheRocher, BucheToutChocolat } from './buches'
import { CakeCitron, CakeMarbre, Cheesecake, Chouquettes, Javanais } from './desserts'
import { EntremetManguePassion, EntremetToutChocolat, EntremetVanilleNoisette } from './entremets'
import type { IllustrationProps } from './parts'
import { TarteBourdaloue, TarteCitronMeringuee, TarteletteCitron, TarteletteFraiseMenthe } from './tartes'

/** Drawn version of each pastry, keyed by product id. Products without one keep their photo. */
export const ILLUSTRATIONS: Partial<Record<string, ComponentType<IllustrationProps>>> = {
  'entremet-tout-chocolat': EntremetToutChocolat,
  'entremet-vanille-noisette': EntremetVanilleNoisette,
  'entremet-mangue-passion': EntremetManguePassion,
  'tarte-bourdaloue': TarteBourdaloue,
  'tarte-citron-meringuee': TarteCitronMeringuee,
  'tartelette-citron': TarteletteCitron,
  'tartelette-fraise-menthe': TarteletteFraiseMenthe,
  cheesecake: Cheesecake,
  javanais: Javanais,
  'cake-marbre': CakeMarbre,
  'cake-citron': CakeCitron,
  chouquette: Chouquettes,
  'buche-tout-chocolat': BucheToutChocolat,
  'buche-mandarine-pecan': BucheMandarinePecan,
  'buche-rocher': BucheRocher,
}
