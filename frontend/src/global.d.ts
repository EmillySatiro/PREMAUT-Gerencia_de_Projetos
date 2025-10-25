// Type declarations for static asset imports (CSS, SCSS, images) used in the project.
// Prevents TypeScript error: "Cannot find module or type declarations for side-effect import of './styles.css'.ts(2882)"

declare module '*.css';
declare module '*.module.css';
declare module '*.scss';
declare module '*.module.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

export {};
