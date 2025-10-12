export type Feature = {
  id: string;
  title: string;
  description: string;
  icon?: string; // optional icon name or path
};

export type HomeProps = {
  title?: string;
  subtitle?: string;
  features?: Feature[];
};
