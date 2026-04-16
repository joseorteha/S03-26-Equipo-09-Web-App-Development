package com.startupcrm.crm_backend.service;

import com.startupcrm.crm_backend.exception.ResourceNotFoundException;
import com.startupcrm.crm_backend.model.Conversacion;
import com.startupcrm.crm_backend.model.EstadoConversacion;
import com.startupcrm.crm_backend.model.Usuario;
import com.startupcrm.crm_backend.repository.ConversacionRepository;
import com.startupcrm.crm_backend.repository.UsuarioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversacionService {

    private final ConversacionRepository conversacionRepository;
    private final UsuarioRepository usuarioRepository;

    public ConversacionService(ConversacionRepository conversacionRepository, UsuarioRepository usuarioRepository) {
        this.conversacionRepository = conversacionRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // ========== Métodos sin paginación (compatibilidad hacia atrás) ==========

    public List<Conversacion> getAll() {
        return conversacionRepository.findAll();
    }

    public Conversacion getById(Long id) {
        return conversacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversación no encontrada"));
    }

    public List<Conversacion> getByContactoId(Long contactoId) {
        return conversacionRepository.findByContactoId(contactoId);
    }

    public List<Conversacion> getByVendedorId(Long vendedorId) {
        return conversacionRepository.findByVendedorAsignadoId(vendedorId);
    }

    // ========== Métodos con paginación (NUEVOS) ==========

    public Page<Conversacion> getAllPaged(Pageable pageable) {
        return conversacionRepository.findAll(pageable);
    }

    public Page<Conversacion> getByVendedorIdPaged(Long vendedorId, Pageable pageable) {
        return conversacionRepository.findByVendedorAsignadoId(vendedorId, pageable);
    }

    public Page<Conversacion> getByContactoIdPaged(Long contactoId, Pageable pageable) {
        return conversacionRepository.findByContactoId(contactoId, pageable);
    }

    public Page<Conversacion> getByCanal(String canal, Pageable pageable) {
        return conversacionRepository.findByCanal(canal, pageable);
    }

    public Page<Conversacion> getByEstado(EstadoConversacion estado, Pageable pageable) {
        return conversacionRepository.findByEstado(estado, pageable);
    }

    public Page<Conversacion> getByVendedorIdAndCanal(Long vendedorId, String canal, Pageable pageable) {
        return conversacionRepository.findByVendedorAsignadoIdAndCanal(vendedorId, canal, pageable);
    }

    public Page<Conversacion> search(String busqueda, Pageable pageable) {
        return conversacionRepository.searchConversaciones(busqueda, pageable);
    }

    public Page<Conversacion> searchByVendedor(Long vendedorId, String busqueda, Pageable pageable) {
        return conversacionRepository.searchConversacionesPorVendedor(vendedorId, busqueda, pageable);
    }

    // ========== Gestión de estado ==========

    public long countNoLeidosPorVendedor(Long vendedorId) {
        return conversacionRepository.countByVendedorAsignadoIdAndEstado(vendedorId, EstadoConversacion.NO_LEIDO);
    }

    public Conversacion marcarComoLeido(Long conversacionId) {
        Conversacion conversacion = getById(conversacionId);
        conversacion.setEstado(EstadoConversacion.LEIDO);
        return conversacionRepository.save(conversacion);
    }

    public Conversacion marcarComoNoLeido(Long conversacionId) {
        Conversacion conversacion = getById(conversacionId);
        conversacion.setEstado(EstadoConversacion.NO_LEIDO);
        return conversacionRepository.save(conversacion);
    }

    public Conversacion cambiarEstado(Long conversacionId, String nuevoEstado) {
        Conversacion conversacion = getById(conversacionId);
        try {
            conversacion.setEstado(EstadoConversacion.valueOf(nuevoEstado));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Estado de conversación inválido: " + nuevoEstado);
        }
        return conversacionRepository.save(conversacion);
    }

    // ========== CRUD Básico ==========

    public Conversacion save(Conversacion conversacion) {
        if (conversacion.getEstado() == null) {
            conversacion.setEstado(EstadoConversacion.NO_LEIDO);
        }
        return conversacionRepository.save(conversacion);
    }

    public Conversacion update(Long id, Conversacion conversacionDetails) {
        Conversacion existente = conversacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversación no encontrada"));

        if (conversacionDetails.getCanal() != null) {
            existente.setCanal(conversacionDetails.getCanal());
        }
        if (conversacionDetails.getContenido() != null) {
            existente.setContenido(conversacionDetails.getContenido());
        }
        if (conversacionDetails.getFechaHora() != null) {
            existente.setFechaHora(conversacionDetails.getFechaHora());
        }
        if (conversacionDetails.getContacto() != null) {
            existente.setContacto(conversacionDetails.getContacto());
        }
        if (conversacionDetails.getVendedorAsignado() != null) {
            existente.setVendedorAsignado(conversacionDetails.getVendedorAsignado());
        }
        if (conversacionDetails.getEstado() != null) {
            existente.setEstado(conversacionDetails.getEstado());
        }

        return conversacionRepository.save(existente);
    }

    public void delete(Long id) {
        if (!conversacionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Conversación no encontrada");
        }
        conversacionRepository.deleteById(id);
    }

    public Conversacion reasignarVendedor(Long conversacionId, Long nuevoVendedorId) {
        Conversacion conversacion = conversacionRepository.findById(conversacionId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversación no encontrada"));

        Usuario nuevoVendedor = usuarioRepository.findById(nuevoVendedorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendedor no encontrado"));

        conversacion.setVendedorAsignado(nuevoVendedor);
        return conversacionRepository.save(conversacion);
    }
}
