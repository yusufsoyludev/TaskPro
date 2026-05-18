const backgroundAssetModules = import.meta.glob([
  '../assets/block.webp',
  '../assets/Vector*.webp',
  '../assets/mobil-*.webp',
  '../assets/tablet-*.webp',
  '../assets/pc-*.webp',
]);

const backgroundAssetCache = new Map();

export const BACKGROUNDS = [
  {
    id: 'bg-0',
    previewFile: 'block.webp',
    mobileFile: null,
    tabletFile: null,
    desktopFile: null,
  },
  {
    id: 'bg-1',
    previewFile: 'Vector.webp',
    mobileFile: 'mobil-1.webp',
    tabletFile: 'tablet-1.webp',
    desktopFile: 'pc-1.webp',
  },
  {
    id: 'bg-2',
    previewFile: 'Vector-1.webp',
    mobileFile: 'mobil-2.webp',
    tabletFile: 'tablet-2.webp',
    desktopFile: 'pc-2.webp',
  },
  {
    id: 'bg-3',
    previewFile: 'Vector-2.webp',
    mobileFile: 'mobil-3.webp',
    tabletFile: 'tablet-3.webp',
    desktopFile: 'pc-3.webp',
  },
  {
    id: 'bg-4',
    previewFile: 'Vector-3.webp',
    mobileFile: 'mobil-4.webp',
    tabletFile: 'tablet-4.webp',
    desktopFile: 'pc-4.webp',
  },
  {
    id: 'bg-5',
    previewFile: 'Vector-4.webp',
    mobileFile: 'mobil-5.webp',
    tabletFile: 'tablet-5.webp',
    desktopFile: 'pc-5.webp',
  },
  {
    id: 'bg-6',
    previewFile: 'Vector-5.webp',
    mobileFile: 'mobil-6.webp',
    tabletFile: 'tablet-6.webp',
    desktopFile: 'pc-6.webp',
  },
  {
    id: 'bg-7',
    previewFile: 'Vector-6.webp',
    mobileFile: 'mobil-7.webp',
    tabletFile: 'tablet-7.webp',
    desktopFile: 'pc-7.webp',
  },
  {
    id: 'bg-8',
    previewFile: 'Vector-7.webp',
    mobileFile: 'mobil-8.webp',
    tabletFile: 'tablet-8.webp',
    desktopFile: 'pc-8.webp',
  },
  {
    id: 'bg-9',
    previewFile: 'Vector-8.webp',
    mobileFile: 'mobil-9.webp',
    tabletFile: 'tablet-9.webp',
    desktopFile: 'pc-9.webp',
  },
  {
    id: 'bg-10',
    previewFile: 'Vector-9.webp',
    mobileFile: 'mobil-10.webp',
    tabletFile: 'tablet-10.webp',
    desktopFile: 'pc-10.webp',
  },
  {
    id: 'bg-11',
    previewFile: 'Vector-10.webp',
    mobileFile: 'mobil-11.webp',
    tabletFile: 'tablet-11.webp',
    desktopFile: 'pc-11.webp',
  },
  {
    id: 'bg-12',
    previewFile: 'Vector-11.webp',
    mobileFile: 'mobil-12.webp',
    tabletFile: 'tablet-12.webp',
    desktopFile: 'pc-12.webp',
  },
  {
    id: 'bg-13',
    previewFile: 'Vector-12.webp',
    mobileFile: 'mobil-13.webp',
    tabletFile: 'tablet-13.webp',
    desktopFile: 'pc-13.webp',
  },
  {
    id: 'bg-14',
    previewFile: 'Vector-13.webp',
    mobileFile: 'mobil-14.webp',
    tabletFile: 'tablet-14.webp',
    desktopFile: 'pc-14.webp',
  },
];

const loadBackgroundAssetUrl = async fileName => {
  if (!fileName) return null;

  if (backgroundAssetCache.has(fileName)) {
    return backgroundAssetCache.get(fileName);
  }

  const assetLoader = backgroundAssetModules[`../assets/${fileName}`];

  if (!assetLoader) {
    return null;
  }

  const assetModule = await assetLoader();
  const assetUrl = assetModule.default;

  backgroundAssetCache.set(fileName, assetUrl);

  return assetUrl;
};

const getBackgroundAssetFile = (background, variant) => {
  if (variant === 'desktop') {
    return (
      background.desktopFile ?? background.tabletFile ?? background.mobileFile
    );
  }

  if (variant === 'tablet') {
    return (
      background.tabletFile ?? background.mobileFile ?? background.desktopFile
    );
  }

  return background.mobileFile ?? background.tabletFile ?? background.desktopFile;
};

export const findBgById = id =>
  BACKGROUNDS.find(background => background.id === id) ?? BACKGROUNDS[0];

export const loadBackgroundVariantById = async (id, variant) => {
  const background = findBgById(id);
  const fileName = getBackgroundAssetFile(background, variant);

  return loadBackgroundAssetUrl(fileName);
};

export const loadBackgroundPreviews = async () =>
  Promise.all(
    BACKGROUNDS.map(async background => ({
      ...background,
      preview: await loadBackgroundAssetUrl(background.previewFile),
    })),
  );
