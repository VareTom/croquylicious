# Croquylicious — site vitrine (v1)

## Intention

Croquylicious est une pâtisserie artisanale faite maison (Mons, commandes le week-end). Aujourd'hui la carte vit sous forme de visuels Instagram. Le site doit donner une vitrine moderne et mémorable à la marque : on arrive devant une petite boutique illustrée, on scrolle pour « entrer » et passer de vitrine en vitrine, on survole une pâtisserie pour la découvrir, puis on va commander sur Instagram.

## Objectifs

- Une page d'accueil immersive : boutique isométrique 2D illustrée, style **« Sticker DA »** (choix utilisateur, option B) : aplats pêche / orange / bleu nuit, gros contours bleu nuit arrondis comme le logo du chat.
- Un parcours au scroll : la « caméra » zoome et se déplace dans l'illustration, vitrine par vitrine, une vitrine par catégorie.
- Un effet au survol (tap sur mobile) sur chaque pâtisserie : étiquette sticker avec nom, description, prix, format et badges.
- Tous les appels à l'action mènent à Instagram : https://www.instagram.com/croquy_licious/
- Une vidéo de lancement produite avec le plugin **brag** une fois le site terminé.

## Hors périmètre (v1)

- Commande ou paiement en ligne, formulaire de contact, back-office.
- Scène 3D réelle (prévue pour plus tard, pas maintenant).
- Multilingue (français uniquement).

## Anti-objectifs

- Un site qui ressemble à un template générique de boulangerie.
- Une illustration lourde au point de rendre le scroll saccadé ou le mobile inutilisable.
- Des infos (prix, minimums) fausses par rapport aux visuels sources.

## Contenu (source : les 7 visuels Instagram)

Catégories → vitrines :

1. **Entremets** (8 à 10 parts) : Tout chocolat 30 €, Vanille chocolat noisette 35 €, Chocolat mangue passion 30 €.
2. **Tartes et tartelettes** : Tarte Bourdaloue 20 €, Citron meringuée 18 € (badge « Ma signature »), Tartelettes citron meringuées 18 €/8, Tartelettes fraise menthe 32 €/6 (variante fraise/basilic).
3. **Choux** (badge « Best seller ») : pistache, noisette, cacahuète, pécan, citron, caramel beurre salé ; 1,25 € l'unité, minimum 30 unités, minimum 10 par parfum.
4. **Autres desserts** : Cheesecake 30 €, Javanais 20 €, Cake marbré rocher 25 €, Cake citron 8 €, Chouquette 0,30 € l'unité (20 minimum).
5. **Bûches de Noël** (saisonnière) : Tout chocolat 20 €, Mandarine pécan 18 €, Rocher chocolat au lait pécan 18 €.

Les descriptions exactes sont reprises des visuels (les fautes évidentes sont corrigées, par exemple « tatelettes » → « tartelettes », « parliné » → « praliné », « Talle » → « Taille »).

Infos pratiques : produits de saison ; commande au minimum 10 jours à l'avance ; réalisation uniquement le week-end ; retrait à Mons près de l'hôpital Ambroise Paré (adresse exacte communiquée à la commande) ; « Pas sur la carte ? » (réalisation en test au prix des matières premières).

Accroche : « Des gourmandises faites maison, avec passion ».

## Assets

- Tout est extrait des visuels fournis (décision utilisateur) : logo du chat et photos des pâtisseries, détourées en PNG à fond transparent. Le fond pêche uni des visuels rend le détourage automatique faisable ; on retouchera plus tard si besoin.
- Le cake marbré et le cake citron n'ont pas de photo (« Photo à venir ») : on réutilise leur illustration avec une mention « Photo à venir ».
- La boutique est dessinée en SVG à la main (pas d'image générée).

## Structure de la page

1. **Arrivée** : boutique isométrique complète (murs, comptoir, vitrines, enseigne avec le chat chef et « Croquylicious »), logo, accroche, bouton « Commander sur Instagram ».
2. **Parcours des vitrines** (section épinglée au scroll) : zoom ou déplacement vers chaque vitrine dans l'ordre ci-dessus, avec le titre de la catégorie affiché dans le style des titres des visuels (police ronde grasse orange, contour bleu nuit). Pâtisseries interactives au survol ou au tap.
3. **Infos pratiques** : cartes sticker.
4. **Appel final** vers Instagram et pied de page.

## Décisions techniques (mes choix, non discutés en détail)

- React + Vite + TypeScript, Bun comme gestionnaire de paquets.
- GSAP + ScrollTrigger pour le parcours au scroll.
- CSS simple (variables CSS pour la palette), pas de framework UI.
- Données des produits dans un seul fichier `src/data/menu.ts`, faciles à modifier.
- Polices : Lilita One (titres ronds, contour bleu nuit) + Poppins (texte, comme les visuels), via Google Fonts.
- Mobile : même parcours, zooms plus courts, étiquettes au tap. `prefers-reduced-motion` désactive le zoom et affiche les vitrines empilées.
- Palette : pêche `#f6d8c2`, pêche clair `#fbe6d6`, orange `#f08a36`, bleu nuit `#14263a`.

## Laissé au réalisateur

Le détail de l'illustration, le chemin exact de la caméra, les micro-animations et la mise en page des étiquettes, tant que le tout reste dans le style « Sticker DA » et que la page reste fluide.
