'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  pendingOrders: number;
  paidOrders: number;
  totalRevenue: number;
}

interface RecentOrder {
  id: string;
  customerEmail: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5044';

      try {
        const [statsRes, ordersRes] = await Promise.all([
          fetch(`${apiUrl}/api/admin/stats`),
          fetch(`${apiUrl}/api/admin/orders`),
        ]);

        if (statsRes.ok) {
          setStats(await statsRes.json());
        }

        if (ordersRes.ok) {
          const orders = await ordersRes.json();
          setRecentOrders(orders.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2).replace('.', ',')} €`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PendingPayment: 'bg-yellow-100 text-yellow-800',
      Paid: 'bg-green-100 text-green-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Cancelled: 'bg-red-100 text-red-800',
    };

    const labels: Record<string, string> = {
      PendingPayment: 'Ausstehend',
      Paid: 'Bezahlt',
      Shipped: 'Versendet',
      Cancelled: 'Storniert',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📦</span>
            <span className="text-sm text-gray-500">Produkte</span>
          </div>
          <div className="text-3xl font-bold">{stats?.totalProducts || 0}</div>
          <div className="text-sm text-gray-500 mt-1">
            {stats?.activeProducts || 0} aktiv
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">🛒</span>
            <span className="text-sm text-gray-500">Bestellungen</span>
          </div>
          <div className="text-3xl font-bold">{stats?.totalOrders || 0}</div>
          <div className="text-sm text-gray-500 mt-1">
            {stats?.pendingOrders || 0} ausstehend
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">✅</span>
            <span className="text-sm text-gray-500">Bezahlt</span>
          </div>
          <div className="text-3xl font-bold">{stats?.paidOrders || 0}</div>
          <div className="text-sm text-gray-500 mt-1">Bestellungen</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💰</span>
            <span className="text-sm text-gray-500">Umsatz</span>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {formatCurrency(stats?.totalRevenue || 0)}
          </div>
          <div className="text-sm text-gray-500 mt-1">Gesamt</div>
        </div>
      </div>

      {/* Quick Actions & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Schnellaktionen</h2>
          <div className="space-y-3">
            <Link
              href="/admin/products?action=new"
              className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <span className="text-xl">➕</span>
              <span className="font-medium">Neues Produkt</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <span className="text-xl">📋</span>
              <span className="font-medium">Alle Bestellungen</span>
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <span className="text-xl">📦</span>
              <span className="font-medium">Produkte verwalten</span>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Letzte Bestellungen</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-purple-600 hover:underline"
            >
              Alle anzeigen →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Noch keine Bestellungen</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b dark:border-gray-700">
                    <th className="pb-3">Kunde</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Betrag</th>
                    <th className="pb-3">Datum</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="hover:text-purple-600"
                        >
                          {order.customerEmail}
                        </Link>
                      </td>
                      <td className="py-3">{getStatusBadge(order.status)}</td>
                      <td className="py-3 font-medium">{formatCurrency(order.totalAmount)}</td>
                      <td className="py-3 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
