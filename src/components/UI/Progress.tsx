export default function Progress({
  progress,
  className,
}: {
  progress: number
  className?: string
}) {
  return (
    <div className={`progress ${className}`}>
      <div className="subfix" />
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        <div className="main-bar">
          <div className="sub-main-bar" />
        </div>
        {progress !== 100 && <div className="h-full w-0.5 bg-white" />}
      </div>
    </div>
  )
}

export const StepProgressBar = ({
  totalSteps = 5,
  currentStep = 3,
  onStepClick,
}: {
  totalSteps?: number
  currentStep?: number
  onStepClick?: (step: number) => void
}) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          {/* Circle - clickable */}
          <div
            onClick={() => onStepClick && onStepClick(index + 1)}
            className={`w-3 h-3 rounded-full border border-black transition-all duration-300 cursor-pointer hover:scale-110 ${
              index < currentStep ? 'bg-pink-weight' : 'bg-[#C3C3C3]'
            }`}
            style={{
              boxShadow: '0.05rem 0.01rem 0 0 #000',
            }}
          />

          {/* Line connector */}
          {index < totalSteps - 1 && (
            <div
              className={`w-8 h-1.5 transition-colors duration-300 border border-black ${
                index < currentStep - 1 ? 'bg-pink-weight' : 'bg-[#C3C3C3]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
