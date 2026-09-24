import { redirect } from 'next/navigation';

// ============================================================
// NOOR Web — Dashboard Route
// Redirects to home with User Profile & Settings open
// All Super Admin tools (Traffic, Appearance, CMS) reside exclusively in /super-admin
// ============================================================

export default function DashboardPage() {
  redirect('/?profile=true');
}
