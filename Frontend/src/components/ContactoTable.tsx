import { useState, useEffect } from 'react';
import { contactoService, Contacto, estadoLabels } from '../common/apiClient';
import { Card } from './ui/Card/Card';
import { Button } from './ui/Button/Button';
import { Badge } from './ui/Badge/Badge';
import { Modal } from './ui/Modal/Modal';

interface ContactoTableProps {
  filtroEstado?: string;
}

export const ContactoTable = ({ filtroEstado }: ContactoTableProps) => {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedContacto, setSelectedContacto] = useState<Contacto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    cargarContactos();
  }, [filtroEstado]);

  const cargarContactos = async () => {
    setCargando(true);
    setError(null);
    try {
      let datos: Contacto[];

      if (filtroEstado && filtroEstado !== 'todos') {
        // Usar endpoint de segmentación
        if (filtroEstado === 'LEAD_ACTIVO') {
          datos = await contactoService.getLeadsActivos();
        } else if (filtroEstado === 'EN_SEGUIMIENTO') {
          datos = await contactoService.getEnSeguimiento();
        } else if (filtroEstado === 'CALIFICADO') {
          datos = await contactoService.getLeadsCalificados();
        } else if (filtroEstado === 'CLIENTE') {
          datos = await contactoService.getClientes();
        } else {
          datos = await contactoService.getAll();
        }
      } else {
        datos = await contactoService.getAll();
      }

      setContactos(datos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando contactos');
    } finally {
      setCargando(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      try {
        await contactoService.delete(id);
        setContactos(contactos.filter(c => c.id !== id));
        alert('Contacto eliminado exitosamente');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error eliminando contacto');
      }
    }
  };

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case 'LEAD_ACTIVO':
        return 'primary';
      case 'EN_SEGUIMIENTO':
        return 'warning';
      case 'CALIFICADO':
        return 'success';
      case 'CLIENTE':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-primary">Contactos</h3>
          <Button 
            size="sm" 
            onClick={() => {
              setSelectedContacto(null);
              setIsModalOpen(true);
            }}
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Nuevo Contacto
          </Button>
        </div>

        {error && (
          <div className="bg-error/10 text-error p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {cargando ? (
          <div className="text-center py-8 text-on-surface-variant">Cargando...</div>
        ) : contactos.length === 0 ? (
          <div className="text-center py-8 text-on-surface-variant">
            No hay contactos disponibles
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline">
                  <th className="text-left py-3 px-4 font-semibold text-primary">Nombre</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary">Teléfono</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contactos.map((contacto) => (
                  <tr key={contacto.id} className="border-b border-outline/30 hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">{contacto.nombre}</td>
                    <td className="py-3 px-4 text-on-surface-variant">{contacto.email}</td>
                    <td className="py-3 px-4 text-on-surface-variant">{contacto.telefono}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getEstadoBadgeColor(contacto.estado) as any}>
                        {estadoLabels[contacto.estado]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedContacto(contacto);
                            setIsModalOpen(true);
                          }}
                          className="text-secondary hover:underline text-xs font-bold"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => handleDelete(contacto.id)}
                          className="text-error hover:underline text-xs font-bold"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ContactoModal
          contacto={selectedContacto}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            cargarContactos();
            setIsModalOpen(false);
          }}
        />
      )}
    </Card>
  );
};

// Modal para crear/editar contacto
interface ContactoModalProps {
  contacto: Contacto | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ContactoModal = ({ contacto, isOpen, onClose, onSave }: ContactoModalProps) => {
  const [formData, setFormData] = useState<Omit<Contacto, 'id'>>({
    nombre: contacto?.nombre || '',
    email: contacto?.email || '',
    telefono: contacto?.telefono || '',
    estado: contacto?.estado || 'LEAD_ACTIVO'
  });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    try {
      if (contacto?.id) {
        await contactoService.update(contacto.id, formData);
        alert('Contacto actualizado exitosamente');
      } else {
        await contactoService.create(formData);
        alert('Contacto creado exitosamente');
      }
      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error guardando contacto');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={contacto ? 'Editar Contacto' : 'Nuevo Contacto'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Nombre</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full px-3 py-2 border border-outline rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-outline rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Teléfono</label>
          <input
            type="tel"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            className="w-full px-3 py-2 border border-outline rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Estado</label>
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value as Contacto['estado'] })}
            className="w-full px-3 py-2 border border-outline rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="LEAD_ACTIVO">Lead Activo</option>
            <option value="EN_SEGUIMIENTO">En Seguimiento</option>
            <option value="CALIFICADO">Calificado</option>
            <option value="CLIENTE">Cliente</option>
          </select>
        </div>

        {error && (
          <div className="bg-error/10 text-error p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose} disabled={guardando}>
            Cancelar
          </Button>
          <Button type="submit" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
