const AuthLayout = ({
  children
} : {
  children: React.ReactNode}
) => {
  return ( 
    <div className="items-center justify-center h-full">
      {children}
    </div>
   );
}
 
export default AuthLayout;