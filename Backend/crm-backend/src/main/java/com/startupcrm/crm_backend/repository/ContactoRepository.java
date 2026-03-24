package com.startupcrm.crm_backend.repository;


import com.startupcrm.crm_backend.model.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactoRepository extends JpaRepository<Contacto, Long> {
    Contacto findByEmail(String email);
}