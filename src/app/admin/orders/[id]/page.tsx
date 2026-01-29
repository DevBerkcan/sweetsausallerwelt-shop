'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface OrderDetail {
  id: string;
  customerEmail: string;
  shippingAddress?: string;
  status: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  items: OrderItem[];
}

const statusOptions = ['PendingPayment', 'Paid', 'Shipped', 'Cancelled'];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5044';
  const orderId = params.id as string;

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/orders/${orderId}`);
      if (response.ok) {
        setOrder(await response.json());
      } else if (response.status === 404) {
        router.push('/admin/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok && order) {
        setOrder({ ...order, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
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
      PendingPayment: 'bg-yellow-100 text-yellow-800',
      Paid: 'bg-green-100 text-green-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Bestellung nicht gefunden</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/orders"
            className="text-sm text-gray-500 hover:text-purple-600 mb-2 inline-block"
          >
            ← Zurück zu Bestellungen
          </Link>
          <h1 className="text-3xl font-bold">Bestellung #{order.id.slice(0, 8)}</h1>
        </div>
        <div className={`px-4 py-2 rounded-xl font-bold ${getStatusStyle(order.status)}`}>
          {getStatusLabel(order.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Bestellte Artikel</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b dark:border-gray-700">
                  <th className="pb-3">Produkt</th>
                  <th className="pb-3">Menge</th>
                  <th className="pb-3">Einzelpreis</th>
                  <th className="pb-3 text-right">Gesamt</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
                          🍬
                        </div>
                        <span className="font-medium">{item.productName}</span>
                      </div>
                    </td>
                    <td className="py-4">{item.quantity}x</td>
                    <td className="py-4">{formatCurrency(item.unitPrice)}</td>
                    <td className="py-4 text-right font-bold">{formatCurrency(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 dark:border-gray-600">
                  <td colSpan={3} className="pt-4 text-right font-bold">Gesamtsumme:</td>
                  <td className="pt-4 text-right text-xl font-bold text-purple-600">
                    {formatCurrency(order.totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Bestellverlauf</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  ✓
                </div>
                <div>
                  <div className="font-medium">Bestellung erstellt</div>
                  <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                </div>
              </div>
              {order.status !== 'PendingPayment' && order.status !== 'Cancelled' && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    ✓
                  </div>
                  <div>
                    <div className="font-medium">Zahlung erhalten</div>
                    <div className="text-sm text-gray-500">Bezahlt</div>
                  </div>
                </div>
              )}
              {order.status === 'Shipped' && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    📦
                  </div>
                  <div>
                    <div className="font-medium">Versendet</div>
                    <div className="text-sm text-gray-500">Paket ist unterwegs</div>
                  </div>
                </div>
              )}
              {order.status === 'Cancelled' && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    ✕
                  </div>
                  <div>
                    <div className="font-medium">Storniert</div>
                    <div className="text-sm text-gray-500">Bestellung wurde storniert</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Kunde</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">E-Mail</div>
                <div className="font-medium">{order.customerEmail}</div>
              </div>
              {order.shippingAddress && (
                <div>
                  <div className="text-sm text-gray-500">Lieferadresse</div>
                  <div className="font-medium whitespace-pre-line">{order.shippingAddress}</div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Aktionen</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Status ändern</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              {order.status === 'Paid' && (
                <button
                  onClick={() => updateStatus('Shipped')}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Als versendet markieren
                </button>
              )}

              {order.status === 'PendingPayment' && (
                <button
                  onClick={() => updateStatus('Paid')}
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                >
                  Zahlung bestätigen
                </button>
              )}
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Bestell-ID</span>
                <span className="font-mono">{order.id.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Erstellt am</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Artikel</span>
                <span>{order.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Währung</span>
                <span>{order.currency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
