// Colors helper for the project.
// Export a class with static readonly properties so you can import colors in TS/TSX.
export class Colors {
	static readonly primary = '#0ea5e9';
	static readonly primaryDark = '#0369a1';
	static readonly background = 'var(--background)';
	static readonly foreground = 'var(--foreground)';
	static readonly success = '#16a34a';
	static readonly danger = '#dc2626';
	static readonly warning = '#f59e0b';
	static readonly azulBase = '#6D94C5';
	static readonly azulEscuro = '#507CB4';
	static readonly verdeBase = '#4DA1A9';
	static readonly verdeClarinho = '#D2E9DF';
	static readonly gray600 = '#4b5563';

	static hex(
	name: keyof Pick<
		typeof Colors,
		'primary' | 'primaryDark' | 'background' | 'foreground' | 'success' | 'danger' | 'warning'
	>
	): string {
		return Colors[name] as string;
	}
}

export default Colors;