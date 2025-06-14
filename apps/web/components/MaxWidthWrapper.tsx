interface WrapperProps {
  children: React.ReactNode
  className?:string
}
export const MaxWidthWrapper: React.FC<WrapperProps> = ({ children , className}) => {
  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {children}
    </div>
  );
};