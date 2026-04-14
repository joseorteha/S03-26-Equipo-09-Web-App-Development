package com.startupcrm.crm_backend.service;

import com.startupcrm.crm_backend.dto.ContactoDTO;
import com.startupcrm.crm_backend.exception.ResourceNotFoundException;
import com.startupcrm.crm_backend.model.Contacto;
import com.startupcrm.crm_backend.model.EstadoLead;
import com.startupcrm.crm_backend.model.Usuario;
import com.startupcrm.crm_backend.repository.ContactoRepository;
import com.startupcrm.crm_backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactoService {

    private final ContactoRepository contactoRepository;
    private final UsuarioRepository usuarioRepository;

    public ContactoService(ContactoRepository contactoRepository, UsuarioRepository usuarioRepository) {
        this.contactoRepository = contactoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Contacto> getAll() {
        return contactoRepository.findAll();
    }

    public Contacto getById(Long id) {
        return contactoRepository.findById(id)
                //.orElseThrow(() -> new RuntimeException("Contacto no encontrado"));
                .orElseThrow(() -> new ResourceNotFoundException("Contacto no encontrado"));
    }

    public Contacto save(Contacto contacto) {
        return contactoRepository.save(contacto);
    }

    public Contacto update(Long id, ContactoDTO dto) {

        Contacto existente = contactoRepository.findById(id)
                //.orElseThrow(() -> new RuntimeException("Contacto no encontrado"));
                .orElseThrow(() -> new ResourceNotFoundException("Contacto no encontrado"));

        existente.setNombre(dto.getNombre());
        existente.setEmail(dto.getEmail());
        existente.setTelefono(dto.getTelefono());
        existente.setEstado(dto.getEstado());

        // Resolver vendedor asignado si viene en el DTO
        if (dto.getVendedorAsignadoId() != null) {
            Usuario vendedor = usuarioRepository.findById(dto.getVendedorAsignadoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vendedor no encontrado"));
            existente.setVendedorAsignado(vendedor);
        } else {
            existente.setVendedorAsignado(null);
        }

        return contactoRepository.save(existente);
    }

    public void delete(Long id) {
        if (!contactoRepository.existsById(id)) {
            //throw new RuntimeException("Contacto no encontrado");
            throw new ResourceNotFoundException("Contacto no encontrado");
        }
        contactoRepository.deleteById(id);
    }

    /**
     * Segmentación: Buscar contactos por estado del funnel
     */
    public List<Contacto> getContactosPorEstado(EstadoLead estado) {
        return contactoRepository.findByEstado(estado);
    }

    /**
     * Segmentación: Obtener leads activos
     */
    public List<Contacto> getLeadsActivos() {
        return contactoRepository.findByEstado(EstadoLead.LEAD_ACTIVO);
    }

    /**
     * Segmentación: Obtener contactos en seguimiento
     */
    public List<Contacto> getContactosEnSeguimiento() {
        return contactoRepository.findByEstado(EstadoLead.EN_SEGUIMIENTO);
    }

    /**
     * Segmentación: Obtener clientes
     */
    public List<Contacto> getClientes() {
        return contactoRepository.findByEstado(EstadoLead.CLIENTE);
    }

    /**
     * Segmentación: Obtener leads calificados
     */
    public List<Contacto> getLeadsCalificados() {
        return contactoRepository.findByEstado(EstadoLead.CALIFICADO);
    }
}

