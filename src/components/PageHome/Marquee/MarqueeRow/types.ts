export type MarqueeRowProps = {
  items: string[];
  direction: 'left' | 'right';
  duration?: number;
  gapClassName?: string;
  paddingClassName?: string;
  renderItem: (src: string, idx: number, keyPrefix?: string) => React.ReactNode;
};
