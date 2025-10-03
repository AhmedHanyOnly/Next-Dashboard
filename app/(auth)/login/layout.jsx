import ProtectedAuth from "@/middleware/ProtectedAuth";

export const metadata = {
  title: "تسجيل الدخول",
};

export default function RootLayout({ children }) {
  return <ProtectedAuth>{children}</ProtectedAuth>;
}
