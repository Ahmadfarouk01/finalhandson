import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          University Admissions Portal
        </h1>
        <p className="text-slate-500 text-lg">
          Apply, check your status, or manage applicants
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Apply for Admission */}
        <Link to="/apply">
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              {/* Plus icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Apply for Admission</h2>
            <p className="text-sm text-slate-500 text-center">
              Start your application process and submit your details.
            </p>
          </div>
        </Link>

        {/* Check Admission Status */}
        <Link to="/status">
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              {/* Check icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Check Admission Status</h2>
            <p className="text-sm text-slate-500 text-center">
              Enter your email to see your application result.
            </p>
          </div>
        </Link>

        {/* Admin Login */}
        <Link to="/admin">
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              {/* User icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 19v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Admin Login</h2>
            <p className="text-sm text-slate-500 text-center">
              Access the dashboard to manage applicants and review submissions.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;