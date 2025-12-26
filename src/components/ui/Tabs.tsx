import * as React from "react"
import { motion, LayoutGroup } from "motion/react"

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

interface TabsProps {
  defaultValue: string
  className?: string
  children: React.ReactNode
  variant?: 'pills' | 'underline'
}

const TabsContext = React.createContext<{
  activeTab: string
  setActiveTab: (id: string) => void
  variant: 'pills' | 'underline'
} | null>(null)

export function Tabs({ defaultValue, className, children, variant = 'pills' }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={cn("w-full", className)}>
        <LayoutGroup id={`tabs-${React.useId()}`}>
           {children}
        </LayoutGroup>
      </div>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
    const { variant } = React.useContext(TabsContext)!
    
    if (variant === 'underline') {
        return (
            <div
              className={cn(
                "flex items-center border-b border-gray-200 dark:border-white/10 w-full mb-6",
                className
              )}
            >
              {children}
            </div>
        )
    }

  return (
    <div
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl bg-gray-100/50 dark:bg-white/5 p-1 text-gray-500 dark:text-gray-400 select-none backdrop-blur-sm border border-gray-200/50 dark:border-white/5 border-4 border-red-500",
        className
      )}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function TabsTrigger({ value, children, className, icon }: TabsTriggerProps) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within Tabs")

  const isActive = context.activeTab === value
  const { variant } = context

  if (variant === 'underline') {
      return (
        <button
            onClick={() => context.setActiveTab(value)}
            className={cn(
            "relative px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2",
            isActive
                ? "text-[#5599fe]"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
            className
            )}
        >
            {icon}
            {children}
            {isActive && (
            <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#5599fe]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            )}
        </button>
      )
  }

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 relative z-0",
        isActive
          ? "text-gray-950 dark:text-white font-bold"
          : "hover:text-gray-900 dark:hover:text-gray-200",
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-tab-pill"
          className="absolute inset-0 bg-white dark:bg-black/40 shadow-sm shadow-black/5 rounded-lg z-[-1] border border-black/5 dark:border-white/5"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within Tabs")

  if (context.activeTab !== value) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 w-full",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
