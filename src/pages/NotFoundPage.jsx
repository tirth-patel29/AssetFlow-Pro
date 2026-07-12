import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center text-center px-4">
      <p className="text-label-sm uppercase tracking-[0.22em] text-on-surface-variant mb-4">Page not found</p>
      <h1 className="text-4xl font-bold text-on-surface mb-4">404</h1>
      <p className="max-w-md text-body-md text-on-surface-variant mb-6">
        The page you are looking for doesn’t exist. Return to the dashboard to continue.
      </p>
      <Link to="/" className="inline-flex rounded-xl bg-primary px-5 py-3 text-white font-semibold hover:bg-primary-container transition">
        Back to dashboard
      </Link>
    </div>
  )
}
