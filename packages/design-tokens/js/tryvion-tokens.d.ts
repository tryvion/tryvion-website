export type Theme = 'light' | 'dark';
export type Density = 'comfortable' | 'compact' | 'dense';
export type TokenTree = { [key: string]: string | number | TokenTree };

export declare const css: TokenTree;
export declare const light: TokenTree;
export declare const dark: TokenTree;
export declare const density: Record<Density, TokenTree>;
export declare const chart: Record<Theme, string[]>;
export declare const SAFE_SERIES: 4;

export declare function chartPalette(n?: number, theme?: Theme): string[];
export declare function token(path: string, source?: TokenTree): string | number | undefined;
export declare function applyTheme(theme?: Theme, densityMode?: Density, el?: HTMLElement): void;

declare const _default: {
  css: TokenTree; light: TokenTree; dark: TokenTree;
  density: Record<Density, TokenTree>; chart: Record<Theme, string[]>;
  chartPalette: typeof chartPalette; token: typeof token;
  applyTheme: typeof applyTheme; SAFE_SERIES: 4;
};
export default _default;
