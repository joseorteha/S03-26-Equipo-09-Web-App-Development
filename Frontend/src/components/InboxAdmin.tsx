import React, { useState, useEffect } from 'react';
import { conversacionService, usuarioService } from '../common/apiClient';

interface Conversacion {
  id: number;
  canal: 'Email' | 'WhatsApp';
  contenido: string;
  fechaHora: string;
  contactoId: number;
  vendedorAsignadoId?: number;
  vendedorAsignadoNombre?: string;
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

export const InboxAdmin: React.FC = () => {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([]);
  const [vendedores, setVendedores] = useState<Usuario[]>([]);
  const [filtroVendedor, setFiltroVendedor] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedConversacion, setSelectedConversacion] = useState<Conversacion | null>(null);
  const [reasignarModal, setReasignarModal] = useState(false);
  const [nuevoVendedorId, setNuevoVendedorId] = useState<number | null>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [conversacionesRes, vendedoresRes] = await Promise.all([
        conversacionService.getAll(),
        usuarioService.getVendedores()
      ]);
      setConversaciones(conversacionesRes);
      setVendedores(vendedoresRes);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const conversacionesFiltradas = filtroVendedor
    ? conversaciones.filter(c => c.vendedorAsignadoId === filtroVendedor)
    : conversaciones;

  const handleReasignar = async () => {
    if (!selectedConversacion || !nuevoVendedorId) return;

    try {
      await conversacionService.reasignarVendedor(
        selectedConversacion.id,
        nuevoVendedorId
      );
      setReasignarModal(false);
      setSelectedConversacion(null);
      setNuevoVendedorId(null);
      await cargarDatos();
    } catch (error) {
      console.error('Error reasignando vendedor:', error);
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-ES');
  };

  const getBadgeCanal = (canal: string) => {
    if (canal === 'WhatsApp') {
      return <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">📱 WhatsApp</span>;
    }
    return <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">✉️ Email</span>;
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">📬 Inbox Administrativo Unificado</h2>

      {/* Filtrol por Vendedor */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm font-medium">Filtrar por vendedor:</label>
        <select
          value={filtroVendedor || ''}
          onChange={(e) => setFiltroVendedor(e.target.value ? Number(e.target.value) : null)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Todos los vendedores</option>
          {vendedores.map(v => (
            <option key={v.id} value={v.id}>{v.nombre}</option>
          ))}
        </select>
      </div>

      {/* Total de conversaciones */}
      <div className="mb-4 text-sm text-gray-600">
        Total de conversaciones: {conversacionesFiltradas.length}
      </div>

      {/* Tabla de Conversaciones */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Canal</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Mensaje</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Vendedor Asignado</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Fecha</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {conversacionesFiltradas.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No hay conversaciones disponibles
                </td>
              </tr>
            ) : (
              conversacionesFiltradas.map((conv) => (
                <tr key={conv.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{conv.id}</td>
                  <td className="px-4 py-3 text-sm">{getBadgeCanal(conv.canal)}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{conv.contenido}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {conv.vendedorAsignadoNombre ? (
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                        {conv.vendedorAsignadoNombre}
                      </span>
                    ) : (
                      <span className="text-gray-400">Sin asignar</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatearFecha(conv.fechaHora)}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => {
                        setSelectedConversacion(conv);
                        setReasignarModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                    >
                      Reasignar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Reasignación */}
      {reasignarModal && selectedConversacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Reasignar Conversación #{selectedConversacion.id}</h3>
            <p className="text-sm text-gray-600 mb-4">Vendedor actual: {selectedConversacion.vendedorAsignadoNombre || 'Sin asignar'}</p>
            
            <label className="block text-sm font-medium mb-2">Nuevo Vendedor:</label>
            <select
              value={nuevoVendedorId || ''}
              onChange={(e) => setNuevoVendedorId(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-6"
            >
              <option value="">Seleccionar vendedor</option>
              {vendedores.map(v => (
                <option key={v.id} value={v.id}>{v.nombre}</option>
              ))}
            </select>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setReasignarModal(false);
                  setSelectedConversacion(null);
                  setNuevoVendedorId(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleReasignar}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Reasignar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
