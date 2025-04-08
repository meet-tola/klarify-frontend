import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CareerInfoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Why Take the Assessment?</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <p className="text-gray-600">Discover careers that match your interests and strengths</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <p className="text-gray-600">Get personalized learning recommendations</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <p className="text-gray-600">Save time by focusing on relevant skills</p>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Popular Career Paths</h3>
        <div className="space-y-3">
          <Link
            href="/roadmap?skill=ui-ux"
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
          >
            <span>UI/UX Design</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/roadmap?skill=web-dev"
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
          >
            <span>Web Development</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/roadmap?skill=data-science"
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
          >
            <span>Data Science</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/roadmap?skill=digital-marketing"
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
          >
            <span>Digital Marketing</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
