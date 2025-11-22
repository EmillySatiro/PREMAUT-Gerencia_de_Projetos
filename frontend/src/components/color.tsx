// Cores principais do projeto, definidas como um objeto Record para melhor tipagem.
export const Colors: Record<string, string> = {
  primary: '#0ea5e9',
  primaryDark: '#0369a1',
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  success: '#16a34a',
  danger: '#dc2626',
  warning: '#f59e0b',
  azulBase: '#6D94C5',
  azulEscuro: '#507CB4',
  verdeBase: '#4DA1A9',
  verdeClarinho: '#D2E9DF',
  gray600: '#4b5563',
};

// Função auxiliar para retornar o valor hexadecimal de uma cor específica.
// A tipagem do parâmetro 'name' garante que apenas chaves válidas sejam usadas.
export function getColorHex(name: keyof typeof Colors): string {
  return Colors[name];
}

export default Colors;