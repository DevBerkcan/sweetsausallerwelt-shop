'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  stock: number;
  isActive: boolean;
  imageUrl?: string;
}

interface ProductFormData {
  name: string;
  slug: string;
  price: string;
  stock: string;
  isActive: boolean;
  imageUrl: string;
}

const emptyForm: ProductFormData = {
  name: '',
  slug: '',
  price: '',
  stock: '',
  isActive: true,
  imageUrl: '',
};

function ProductsAdminContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5044';

  useEffect(() => {
    fetchProducts();

    if (searchParams.get('action') === 'new') {
      setShowModal(true);
    }
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/products`);
      if (response.ok) {
        setProducts(await response.json());
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      stock: product.stock.toString(),
      isActive: product.isActive,
      imageUrl: product.imageUrl || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Produkt "${product.name}" wirklich löschen?`)) return;

    try {
      const response = await fetch(`${apiUrl}/api/admin/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== product.id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        isActive: formData.isActive,
        imageUrl: formData.imageUrl || undefined,
      };

      let response;

      if (editingProduct) {
        response = await fetch(`${apiUrl}/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${apiUrl}/api/admin/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setShowModal(false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !product.isActive }),
      });

      if (response.ok) {
        setProducts(
          products.map((p) =>
            p.id === product.id ? { ...p, isActive: !p.isActive } : p
          )
        );
      }
    } catch (error) {
      console.error('Error toggling product:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2).replace('.', ',')} €`;
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Produkte</h1>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <span>➕</span>
          <span>Neues Produkt</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4">Produkt</th>
              <th className="px-6 py-4">Preis</th>
              <th className="px-6 py-4">Lagerbestand</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center text-2xl">
                      🍬
                    </div>
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`${
                      product.stock <= 10
                        ? 'text-red-600'
                        : product.stock <= 30
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}
                  >
                    {product.stock} Stk.
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleActive(product)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      product.isActive
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {product.isActive ? 'Aktiv' : 'Inaktiv'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Bearbeiten"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Löschen"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Noch keine Produkte vorhanden
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold">
                  {editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="z.B. Premium Baklava Mix"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="wird automatisch generiert"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preis (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="29.99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Lagerbestand *</label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bild URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium">
                    Produkt ist aktiv (sichtbar im Shop)
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Speichern...' : editingProduct ? 'Aktualisieren' : 'Erstellen'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ProductsAdmin() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      }
    >
      <ProductsAdminContent />
    </Suspense>
  );
}
