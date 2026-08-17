import { LeftContainer } from './LeftContainer'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col mlg:flex-row w-full max-w-screen mlg:min-h-145 h-screen mlg:h-auto overflow-hidden">
      <div className="w-full h-full flex flex-col lg:flex-row z-10">
        <LeftContainer />

        <div className="flex flex-col items-center justify-center py-6 px-4 sm:px-6 overflow-y-auto lg:w-1/2">
          {children}
        </div>
      </div>
    </div>
  )
}
