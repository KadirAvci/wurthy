# Avatar Component

## Description

Le composant **Avatar** est un composant UI réutilisable qui affiche une image de profil utilisateur avec un système de fallback automatique. Il est construit sur la base de [Radix UI Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) et utilise des classes Tailwind CSS avec le préfixe `tw:`.

## Composants

Le module exporte trois composants principaux :

### `Avatar`

Le composant racine qui sert de conteneur pour l'avatar.

**Props :** Hérite de toutes les props de `AvatarPrimitive.Root`

**Styles par défaut :**
- Taille : `8` (32px)
- Forme : Circulaire (`rounded-full`)
- Overflow : Caché
- Flexbox avec réduction automatique

### `AvatarImage`

Affiche l'image de l'avatar.

**Props :** Hérite de toutes les props de `AvatarPrimitive.Image`

**Propriétés importantes :**
- `src` : URL de l'image
- `alt` : Texte alternatif pour l'accessibilité

**Styles par défaut :**
- Ratio d'aspect : Carré
- Taille : 100% du conteneur parent

### `AvatarFallback`

Affiche un contenu de secours lorsque l'image ne peut pas être chargée.

**Props :** Hérite de toutes les props de `AvatarPrimitive.Fallback`

**Styles par défaut :**
- Fond : `muted` (couleur de fond atténuée)
- Centrage du contenu (horizontal et vertical)
- Forme : Circulaire

## Utilisation

### Exemple de base

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

function UserProfile() {
  return (
    <Avatar>
      <AvatarImage src="https://example.com/avatar.jpg" alt="John Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}
```

### Exemple avec taille personnalisée

```tsx
<Avatar className="tw:size-16">
  <AvatarImage src="/user-avatar.png" alt="Jane Smith" />
  <AvatarFallback>JS</AvatarFallback>
</Avatar>
```

### Exemple avec initiales

```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Alice Wonder" />
  <AvatarFallback className="tw:bg-blue-500 tw:text-white">
    AW
  </AvatarFallback>
</Avatar>
```

### Exemple sans image (fallback uniquement)

```tsx
<Avatar>
  <AvatarFallback className="tw:bg-gradient-to-br tw:from-purple-500 tw:to-pink-500 tw:text-white">
    AB
  </AvatarFallback>
</Avatar>
```

## Comportement

1. **Chargement de l'image** : Le composant tente d'abord de charger l'image spécifiée dans `AvatarImage`
2. **Fallback automatique** : Si l'image ne peut pas être chargée (erreur 404, timeout, etc.), le composant affiche automatiquement le contenu de `AvatarFallback`
3. **Accessibilité** : Le composant utilise les attributs `data-slot` pour faciliter le ciblage CSS et les tests

## Personnalisation

### Modifier la taille

```tsx
// Petit avatar
<Avatar className="tw:size-6">
  {/* ... */}
</Avatar>

// Moyen avatar (défaut)
<Avatar className="tw:size-8">
  {/* ... */}
</Avatar>

// Grand avatar
<Avatar className="tw:size-12">
  {/* ... */}
</Avatar>

// Très grand avatar
<Avatar className="tw:size-20">
  {/* ... */}
</Avatar>
```

### Modifier la forme

```tsx
// Avatar carré
<Avatar className="tw:rounded-lg">
  {/* ... */}
</Avatar>

// Avatar rectangulaire
<Avatar className="tw:rounded-md tw:w-16 tw:h-12">
  {/* ... */}
</Avatar>
```

### Personnaliser le fallback

```tsx
<AvatarFallback className="tw:bg-gradient-to-r tw:from-cyan-500 tw:to-blue-500 tw:text-white tw:font-bold">
  <UserIcon className="tw:size-4" />
</AvatarFallback>
```

## Accessibilité

- Toujours fournir un attribut `alt` descriptif pour `AvatarImage`
- Le fallback doit contenir du texte lisible ou une icône avec un label approprié
- Le composant utilise les primitives Radix UI qui respectent les standards ARIA

## Dépendances

- `react` : Framework React
- `@radix-ui/react-avatar` : Primitives Avatar de Radix UI
- `@/lib/utils` : Fonction utilitaire `cn` pour la fusion de classes CSS

## Data Attributes

Les composants utilisent des attributs `data-slot` pour faciliter le ciblage :

- `data-slot="avatar"` : Sur le composant racine
- `data-slot="avatar-image"` : Sur le composant image
- `data-slot="avatar-fallback"` : Sur le composant fallback

Ces attributs peuvent être utilisés pour le styling CSS ou les sélecteurs de tests :

```css
[data-slot="avatar"] {
  /* Styles personnalisés */
}
```

## Notes techniques

- Le composant utilise le préfixe `tw:` pour les classes Tailwind CSS
- La fonction `cn` permet de fusionner les classes par défaut avec les classes personnalisées
- Le composant est entièrement typé avec TypeScript
- Tous les props sont propagés aux composants Radix UI sous-jacents via le spread operator `{...props}`
