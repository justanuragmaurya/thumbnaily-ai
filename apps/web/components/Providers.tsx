import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers: React.FC<ProvidersProps> = ({ children, ...props }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};
  