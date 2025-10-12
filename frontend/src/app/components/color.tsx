// Colors helper for the project.
// Export a class with static readonly properties so you can import colors in TS/TSX.
export class Colors {
	// Brand / primary
	static readonly primary = '#0ea5e9'; // sky-500
	static readonly primaryDark = '#0369a1';

	// Neutral
	static readonly background = 'var(--background)';
	static readonly foreground = 'var(--foreground)';

	// Semantic
	static readonly success = '#16a34a';
	static readonly danger = '#dc2626';
	static readonly warning = '#f59e0b';

    static readonly azulBase = '#6D94C5'; // Custom blue color
	static readonly verdeBase = '#4DA1A9'; // Custom green color

	// Utility to get raw hex if needed
		static hex(name: 'primary' | 'primaryDark' | 'background' | 'foreground' | 'success' | 'danger' | 'warning') {
			return (Colors as any)[name] as string;
		}
}

export default Colors;