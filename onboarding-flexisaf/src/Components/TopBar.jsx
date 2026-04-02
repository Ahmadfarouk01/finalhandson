import React from 'react'

function TopBar() {
  return (
 <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <h1 className="text-xl font-semibold text-slate-800">
        Admissions Screening & Shortlisting System
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">Admin</span>
        <div className="w-8 h-8 bg-slate-300 rounded-full" />
      </div>
    </header>
  )
}

export default TopBar
