export enum RouterKeys {
  Home = '/',
  TermOfUse = 'term-of-use',
  PrivacyPolicy = 'privacy-policy',
  BrandKit = 'brand-kit',
  Landing = 'closed-beta-registration',
  Blog = 'blog',
}

export type RouterParams = Record<string, string | number | undefined>

function buildQuery(params?: RouterParams) {
  if (!params) return ''
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&')

  return query ? `?${query}` : ''
}

export const CoreRoutes = {
  home: (params?: RouterParams) => `${RouterKeys.Home}${buildQuery(params)}`,
  termOfUse: (params?: RouterParams) =>
    `/${RouterKeys.TermOfUse}${buildQuery(params)}`,
  privacyPolicy: (params?: RouterParams) =>
    `/${RouterKeys.PrivacyPolicy}${buildQuery(params)}`,
  brandKit: (params?: RouterParams) =>
    `/${RouterKeys.BrandKit}${buildQuery(params)}`,
  landing: (params?: RouterParams) =>
    `/${RouterKeys.Landing}${buildQuery(params)}`,
  blog: (params?: RouterParams) => `/${RouterKeys.Blog}${buildQuery(params)}`,
  blogDetails: (pageId: string | number, params?: RouterParams) =>
    `/${RouterKeys.Blog}/${pageId}${buildQuery(params)}`,
}
