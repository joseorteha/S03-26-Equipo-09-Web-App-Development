import React, { useState, useEffect } from 'react';
import { conversacionService } from '../common/apiClient';

interface Conversacion {
  id: number;
  canal: 'Email' | 'WhatsApp';
  contenido: string;
  fechaHora: string;
  contactoId: number;
  vendedorAsignadoId?: number;
  vendedorAsignadoNombre?: string;
}

interface InboxVendedorProps {
  vendedorId: number;
  vendedorNombre: string;
}

export const InboxVendedor: React.FC<InboxVendedorProps> = ({ vendedorId, vendedorNombre }) => {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    cargarConversaciones();
  }, [vendedorId]);

  const cargarConversaciones = async () => {
    setLoading(true);
    try {
      const data = await conversacionService.getByVendedor(vendedorId);
      setConversaciones(data);
    } catch (error) {
      console.error('Error cargando conversaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-ES');
  };

  const getBadgeCanal = (canal: string) => {
    if (canal === 'WhatsApp') {
      return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">📱 WhatsApp</span>;
    }
    return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">✉️ Email</span>;
  };

  if (loading) return <div className="text-center py-8">Cargando conversaciones...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">💬 Mi Inbox</h2>
        <p className="text-sm text-gray-600 mt-1">Vendedor: {vendedorNombre}</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{conversaciones.length}</div>
          <div className="text-sm text-gray-600">Conversaciones totales</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {conversaciones.filter(c => c.canal === 'WhatsApp').length}
          </div>
          <div className="text-sm text-gray-600">WhatsApp</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {conversaciones.filter(c => c.canal === 'Email').length}
          </div>
          <div className="text-sm text-gray-600">Email</div>
        </div>
      </div>

      {/* Lista de Conversaciones */}
      <div className="space-y-3">
        {conversaciones.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tienes conversaciones asignadas en este momento
          </div>
        ) : (
          conversaciones.map((conv) => (
            <div
              key={conv.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header de la conversación */}
              <div
                onClick={() => setExpandedId(expandedId === conv.id ? null : conv.id)}
                className="p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="font-bold text-blue-600 min-w-10">#{conv.id}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getBadgeCanal(conv.canal)}
                      <span className="text-xs text-gray-500">
                        Contacto ID: {conv.contactoId}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-1">{conv.contenido}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatearFecha(conv.fechaHora)}
                    </p>
                  </div>
                </div>
                <div className="text-gray-400">
                  {expandedId === conv.id ? '▼' : '▶'}
                </div>
              </div>

              {/* Detalles extendidos */}
              {expandedId === conv.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        MENSAJE COMPLETO
                      </label>
                      <p className="text-sm bg-gray-50 p-3 rounded text-gray-800 whitespace-pre-wrap">
                        {conv.contenido}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          CANAL
                        </label>
                        <p className="text-sm text-gray-800">{getBadgeCanal(conv.canal)}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          CONTACTO ID
                        </label>
                        <p className="text-sm text-gray-800">{conv.contactoId}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          FECHA Y HORA
                        </label>
                        <p className="text-sm text-gray-800">
                          {formatearFecha(conv.fechaHora)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        ↩️ Responder
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                        ⭐ Marcar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
