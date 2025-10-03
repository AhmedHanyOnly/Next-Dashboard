'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login } from '@/services/auth';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { useState } from 'react';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await login(data);
      if (res?.token) {
        toast.success(res.message);
        router.push('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'حدث خطأ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col gap-6 border border-gray-700"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-6">Admin Login</h2>

        <div className="relative">
          <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input 
            {...register('email')} 
            type="email" 
            placeholder="البريد الإلكتروني" 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            disabled={loading}
          />
        </div>

        <div className="relative">
          <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input 
            {...register('password')} 
            type="password" 
            placeholder="كلمة المرور" 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold shadow-lg transition transform
            ${loading 
              ? 'bg-indigo-400 text-gray-200 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95'
            }`}
        >
          {loading && (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>

        <p className="text-sm text-gray-400 text-center">
          ليس لديك حساب؟ <a href="/register" className="text-indigo-400 font-semibold hover:underline">سجل الآن</a>
        </p>
      </form>
    </div>
  );
}
