'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '@/services/auth';

export const Navbar = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('تم تسجيل الخروج');
    router.push('/login');
  };

  return (
    <header className="h-16 flex items-center justify-end px-6 bg-white shadow-md border-b relative">
      <div className="relative">
        <button
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{user?.name}</span>
          <img
            src={'/images.png'}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <div className="p-4 flex flex-col gap-2">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <Button variant="outline" onClick={handleLogout} className="mt-2 w-full">
                تسجيل الخروج
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
