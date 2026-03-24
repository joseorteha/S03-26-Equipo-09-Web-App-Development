package com.startupcrm.crm_backend.repository;


import com.startupcrm.crm_backend.model.Seguimiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeguimientoRepository extends JpaRepository<Seguimiento, Long> {
}