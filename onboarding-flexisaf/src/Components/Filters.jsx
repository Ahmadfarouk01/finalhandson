import React from 'react'
import BatchActions from './BatchActions'

function Filters({ search, setSearch }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
      <button className="px-4 py-2 bg-slate-100 rounded-md text-sm w-full md:w-auto">
        All
      </button>

      <input
        type="text"
        placeholder="Search by name or program..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-4 py-2 border border-slate-300 rounded-md text-sm w-full"
      />

      <BatchActions />
    </div>
  );
}

export default Filters