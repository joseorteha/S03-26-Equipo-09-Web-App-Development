package com.startupcrm.crm_backend.repository;



import com.startupcrm.crm_backend.model.Conversacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversacionRepository extends JpaRepository<Conversacion, Long> {
}