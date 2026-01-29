'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  customerEmail: string;
  status: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  itemCount: number;
}

const statusOptions = ['PendingPayment', 'Paid', 'Shipped', 'Cancelled'];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5044';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/orders`);
      if (response.ok) {
        setOrders(await response.json());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setOrders(
          orders.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

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

  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      PendingPayment: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Paid: 'bg-green-100 text-green-800 border-green-200',
      Shipped: 'bg-blue-100 text-blue-800 border-blue-200',
      Cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PendingPayment: 'Ausstehend',
      Paid: 'Bezahlt',
      Shipped: 'Versendet',
      Cancelled: 'Storniert',
    };
    return labels[status] || status;
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter);

  const orderStats = {
    all: orders.length,
    PendingPayment: orders.filter((o) => o.status === 'PendingPayment').length,
    Paid: orders.filter((o) => o.status === 'Paid').length,
    Shipped: orders.filter((o) => o.status === 'Shipped').length,
    Cancelled: orders.filter((o) => o.status === 'Cancelled').length,
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
      <h1 className="text-3xl font-bold mb-8">Bestellungen</h1>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
            filter === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Alle ({orderStats.all})
        </button>
        <button
          onClick={() => setFilter('PendingPayment')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
            filter === 'PendingPayment'
              ? 'bg-yellow-500 text-white'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Ausstehend ({orderStats.PendingPayment})
        </button>
        <button
          onClick={() => setFilter('Paid')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
            filter === 'Paid'
              ? 'bg-green-500 text-white'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Bezahlt ({orderStats.Paid})
        </button>
        <button
          onClick={() => setFilter('Shipped')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
            filter === 'Shipped'
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Versendet ({orderStats.Shipped})
        </button>
        <button
          onClick={() => setFilter('Cancelled')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
            filter === 'Cancelled'
              ? 'bg-red-500 text-white'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Storniert ({orderStats.Cancelled})
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4">Bestellung</th>
              <th className="px-6 py-4">Kunde</th>
              <th className="px-6 py-4">Artikel</th>
              <th className="px-6 py-4">Betrag</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Datum</th>
              <th className="px-6 py-4">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-mono text-sm text-purple-600 hover:underline"
                  >
                    #{order.id.slice(0, 8)}...
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{order.customerEmail}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-500">{order.itemCount} Artikel</span>
                </td>
                <td className="px-6 py-4 font-bold">{formatCurrency(order.totalAmount)}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium border cursor-pointer ${getStatusStyle(order.status)}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block"
                    title="Details"
                  >
                    👁️
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {filter === 'all' ? 'Noch keine Bestellungen' : 'Keine Bestellungen mit diesem Status'}
          </div>
        )}
      </div>
    </div>
  );
}
