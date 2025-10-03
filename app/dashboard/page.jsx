"use client";

import { Loader } from "@/components/ui/Loader";
import { logout } from "@/services/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  if (!user) return <Loader />;
  console.log(user)
  // مثال بيانات الشارت
  const salesData = [
    { date: "Mon", sales: 1200 },
    { date: "Tue", sales: 2100 },
    { date: "Wed", sales: 800 },
    { date: "Thu", sales: 1600 },
    { date: "Fri", sales: 900 },
    { date: "Sat", sales: 1700 },
    { date: "Sun", sales: 2000 },
  ];

  // مثال إحصائيات
  const stats = [
    { title: "إجمالي المبيعات اليوم", value: 7500 },
    { title: "عدد الفواتير", value: 45 },
    { title: "عدد العملاء", value: 32 },
    { title: "المستحقات", value: 1200 },
  ];

  return (
    <div className="p-6 bg-gray-50 ">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم - الكاشير</h1>
      <p className="mb-6 text-gray-600">مرحباً {user.name}</p>

      {/* إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white shadow">
            <CardHeader>
              <CardTitle className="text-gray-500 text-sm">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* شارت المبيعات */}
      <Card className="bg-white shadow">
        <CardHeader>
          <CardTitle>مبيعات الأسبوع</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#4f46e5"
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>


    </div>
  );
}
