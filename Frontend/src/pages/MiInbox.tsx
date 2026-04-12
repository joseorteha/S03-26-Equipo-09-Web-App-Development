import { useState, useEffect } from 'react';
import { InboxVendedor } from '../components/InboxVendedor';
import { usuarioService } from '../common/apiClient';

interface Usuario {
  id: number;
  nombre: string;
  role: string;
}

export default function MiInbox() {
  const [vendedores, setVendedores] = useState<Usuario[]>([]);
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarVendedores();
  }, []);

  const cargarVendedores = async () => {
    try {
      const data = await usuarioService.getVendedores();
      setVendedores(data);
      if (data && data.length > 0) {
        setVendedorSeleccionado(data[0] || null);
      }
    } catch (error) {
      console.error('Error cargando vendedores:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Selector de Vendedor */}
        {vendedores.length > 1 && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Vendedor (Para Demo):
            </label>
            <div className="flex gap-2 flex-wrap">
              {vendedores.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVendedorSeleccionado(v)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    vendedorSeleccionado?.id === v.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  👤 {v.nombre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Inbox del Vendedor */}
        {vendedorSeleccionado && (
          <InboxVendedor
            vendedorId={vendedorSeleccionado.id}
            vendedorNombre={vendedorSeleccionado.nombre}
          />
        )}
      </div>
    </div>
  );
}
