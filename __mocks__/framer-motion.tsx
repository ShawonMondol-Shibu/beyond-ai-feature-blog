const actual = jest.requireActual("framer-motion");

module.exports = {
  ...actual,
  motion: new Proxy(
    {},
    {
      get: (_: unknown, prop: string) => {
        const Component = ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
          const Tag = prop as keyof JSX.IntrinsicElements;
          return <Tag {...props}>{children}</Tag>;
        };
        Component.displayName = `motion.${prop}`;
        return Component;
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({ start: jest.fn(), set: jest.fn() }),
};
