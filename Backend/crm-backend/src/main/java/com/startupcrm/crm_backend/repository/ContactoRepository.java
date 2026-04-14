package com.startupcrm.crm_backend.repository;


import com.startupcrm.crm_backend.model.Contacto;
import com.startupcrm.crm_backend.model.EstadoLead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContactoRepository extends JpaRepository<Contacto, Long> {
    Optional<Contacto> findByEmail(String email);
    
    Optional<Contacto> findByTelefono(String telefono);
    
    /**
     * Buscar contactos por estado del funnel
     */
    List<Contacto> findByEstado(EstadoLead estado);
}