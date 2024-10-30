import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p className="mb-4">Not Found</p>
      <Link href="/profile" className="text-green-500">Return To Profile</Link>
    </div>
  )
}
