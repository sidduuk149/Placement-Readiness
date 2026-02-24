import { UserCircle, Mail, Building2, GraduationCap } from 'lucide-react'

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Profile</h2>
        <p className="text-[#64748b]">Manage your personal information and preferences</p>
      </div>

      <div className="max-w-2xl bg-white rounded-xl border border-[#e2e8f0] p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-[hsl(245,58%,51%)]/10 rounded-full flex items-center justify-center">
            <UserCircle className="w-12 h-12 text-[hsl(245,58%,51%)]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#1e293b]">John Doe</h3>
            <p className="text-[#64748b]">Computer Science Student</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-[#f8fafc] rounded-lg">
            <Mail className="w-5 h-5 text-[#64748b]" />
            <div>
              <p className="text-sm text-[#64748b]">Email</p>
              <p className="font-medium text-[#1e293b]">john.doe@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#f8fafc] rounded-lg">
            <Building2 className="w-5 h-5 text-[#64748b]" />
            <div>
              <p className="text-sm text-[#64748b]">College</p>
              <p className="font-medium text-[#1e293b]">KodNest University</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#f8fafc] rounded-lg">
            <GraduationCap className="w-5 h-5 text-[#64748b]" />
            <div>
              <p className="text-sm text-[#64748b]">Course</p>
              <p className="font-medium text-[#1e293b]">B.Tech Computer Science</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
          <button className="px-6 py-2 bg-[hsl(245,58%,51%)] text-white font-medium rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}
