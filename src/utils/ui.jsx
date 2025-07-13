const LoadingSpinner = ({ size = "md" }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    }
  
    return (
      <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-[50px] w-[50px] border-b-4 border-emerald-800 mx-auto mb-4"></div>
      </div>
    </div>

    )
  }
  
  export default LoadingSpinner
  