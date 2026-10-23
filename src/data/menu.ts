export type ProductImage = {
  src: string
  width: number
  height: number
}

export type Product = {
  id: string
  name: string
  price: string
  description: string
  note?: string
  badge?: string
  image: ProductImage
}

export type Category = {
  id: string
  title: string
  shortTitle: string
  intro: string
  badge?: string
  /** `box` lays the products out like a box of choux; `shelf` puts each one on its own plate. */
  display: 'shelf' | 'box'
  tone: 'cream' | 'peach' | 'night'
  products: Product[]
}

const img = (name: string, width: number, height: number): ProductImage => ({
  src: `/images/${name}.png`,
  width,
  height,
})

const CHOU_PRICE = '1,25 €'

export const MENU: Category[] = [
  {
    id: 'entremets',
    display: 'shelf',
    tone: 'cream',
    title: 'Entremets',
    shortTitle: 'Entremets',
    intro: 'À partager, de 8 à 10 parts.',
    products: [
      {
        id: 'entremet-tout-chocolat',
        name: 'Tout chocolat',
        price: '30 €',
        description: 'Biscuit chocolat, gianduja noix noisette, ganache crémeuse chocolat, mousse chocolat.',
        image: img('entremet-tout-chocolat', 381, 301),
      },
      {
        id: 'entremet-vanille-noisette',
        name: 'Vanille chocolat noisette',
        price: '35 €',
        description:
          'Streusel cacao croquant en sa base, financier chocolat noisette, crémeux chocolat noir au centre, une touche de praliné pure noisette et ganache à la vanille.',
        image: img('entremet-vanille-noisette', 412, 305),
      },
      {
        id: 'entremet-mangue-passion',
        name: 'Chocolat mangue passion',
        price: '30 €',
        description:
          'Streusel cacao croquant en sa base, moelleux chocolat, mousse chocolat, insert mangue-passion et glaçage miroir cacao.',
        image: img('entremet-mangue-passion', 345, 309),
      },
    ],
  },
  {
    id: 'tartes',
    display: 'shelf',
    tone: 'peach',
    title: 'Tartes et tartelettes',
    shortTitle: 'Tartes',
    intro: 'Toujours sur une pâte sucrée croustillante.',
    products: [
      {
        id: 'tarte-bourdaloue',
        name: 'Tarte Bourdaloue',
        price: '20 €',
        description: "Pâte sucrée croustillante, crème d'amande, poires pochées.",
        note: 'Taille classique, 8 à 10 parts',
        image: img('tarte-bourdaloue', 267, 191),
      },
      {
        id: 'tarte-citron-meringuee',
        name: 'Citron meringuée',
        price: '18 €',
        description: 'Pâte sucrée croustillante, crémeux citron et meringue italienne.',
        note: 'Taille classique, 8 à 10 parts',
        badge: 'Ma signature',
        image: img('tarte-citron-meringuee', 306, 255),
      },
      {
        id: 'tartelette-citron',
        name: 'Tartelettes citron meringuées',
        price: '18 € les 8',
        description: 'Pâte sucrée croustillante, crémeux citron et meringue italienne.',
        note: 'Individuelles, minimum 8 unités',
        image: img('tartelette-citron', 240, 213),
      },
      {
        id: 'tartelette-fraise-menthe',
        name: 'Tartelettes fraise menthe',
        price: '32 € les 6',
        description:
          "Pâte sucrée croustillante, crème d'amande, compotée de fraises, ganache menthe et fraises fraîches. Existe aussi en fraise basilic.",
        note: 'Individuelles, minimum 6 unités',
        image: img('tartelette-fraise-menthe', 219, 195),
      },
    ],
  },
  {
    id: 'choux',
    display: 'box',
    tone: 'cream',
    title: 'Choux',
    shortTitle: 'Choux',
    intro: "Format bouchée, 1,25 € l'unité. Minimum 30 choux, dont 10 par parfum.",
    badge: 'Best seller',
    products: [
      {
        id: 'chou-pistache',
        name: 'Pistache',
        price: CHOU_PRICE,
        description: 'Garni de ganache pistache, avec un cœur de praliné 100 % pistache.',
        image: img('chou-pistache', 140, 140),
      },
      {
        id: 'chou-noisette',
        name: 'Noisette',
        price: CHOU_PRICE,
        description: 'Garni de ganache noisette, avec un cœur de praliné 100 % noisette.',
        image: img('chou-noisette', 140, 140),
      },
      {
        id: 'chou-cacahuete',
        name: 'Cacahuète',
        price: CHOU_PRICE,
        description: 'Garni de ganache cacahuète, avec un cœur de praliné 100 % cacahuète.',
        image: img('chou-cacahuete', 144, 144),
      },
      {
        id: 'chou-pecan',
        name: 'Pécan',
        price: CHOU_PRICE,
        description: 'Garni de ganache pécan, avec un cœur de praliné 100 % pécan.',
        image: img('chou-pecan', 140, 140),
      },
      {
        id: 'chou-citron',
        name: 'Citron',
        price: CHOU_PRICE,
        description: "Garni de ganache citron, avec une pointe d'acidulé par-dessus.",
        image: img('chou-citron', 148, 148),
      },
      {
        id: 'chou-caramel',
        name: 'Caramel beurre salé',
        price: CHOU_PRICE,
        description: 'Garni de ganache, avec un cœur de caramel au beurre salé.',
        image: img('chou-caramel', 148, 148),
      },
    ],
  },
  {
    id: 'autres',
    display: 'shelf',
    tone: 'peach',
    title: 'Autres desserts',
    shortTitle: 'Desserts',
    intro: 'Cakes, cheesecake et petites douceurs.',
    products: [
      {
        id: 'cheesecake',
        name: 'Cheesecake',
        price: '30 €',
        description: 'Nature, citron ou spéculoos.',
        note: '8 à 10 parts',
        image: img('cheesecake', 324, 171),
      },
      {
        id: 'javanais',
        name: 'Javanais',
        price: '20 €',
        description: "Biscuit joconde moelleux, crème au beurre café recouverte d'une ganache chocolat.",
        note: 'Format individuel, 6 parts',
        image: img('javanais', 321, 249),
      },
      {
        id: 'cake-marbre',
        name: 'Cake marbré rocher',
        price: '25 €',
        description: 'Cake marbré vanille et chocolat, enrobage rocher chocolat au lait et noisette.',
        note: '10 parts',
        image: img('cake-marbre', 249, 162),
      },
      {
        id: 'cake-citron',
        name: 'Cake citron',
        price: '8 €',
        description: 'Cake au citron avec un enrobage citron acidulé.',
        note: '10 parts',
        image: img('cake-citron', 232, 157),
      },
      {
        id: 'chouquette',
        name: 'Chouquettes',
        price: "0,30 € l'unité",
        description: 'Pâte à choux et sucre en grains.',
        note: '20 minimum par commande',
        image: img('chouquette', 246, 180),
      },
    ],
  },
  {
    id: 'buches',
    display: 'shelf',
    tone: 'night',
    title: 'Bûches de Noël',
    shortTitle: 'Bûches',
    intro: 'En vitrine pour les fêtes.',
    badge: 'De saison',
    products: [
      {
        id: 'buche-tout-chocolat',
        name: 'Tout chocolat',
        price: '20 €',
        description: 'Biscuit chocolat, gianduja noix noisette, ganache crémeuse chocolat, mousse chocolat.',
        image: img('buche-tout-chocolat', 350, 150),
      },
      {
        id: 'buche-mandarine-pecan',
        name: 'Mandarine pécan',
        price: '18 €',
        description:
          'Biscuit amande-pécan croquant en sa base, insert mandarine au centre, une touche de praliné pure pécan, mousse à la vanille et effet velours blanc.',
        image: img('buche-mandarine-pecan', 286, 231),
      },
      {
        id: 'buche-rocher',
        name: 'Rocher chocolat au lait pécan',
        price: '18 €',
        description: 'Biscuit madeleine pécan, mousse bavaroise chocolat, praliné pure pécan, glaçage rocher.',
        image: img('buche-rocher', 337, 284),
      },
    ],
  },
]
