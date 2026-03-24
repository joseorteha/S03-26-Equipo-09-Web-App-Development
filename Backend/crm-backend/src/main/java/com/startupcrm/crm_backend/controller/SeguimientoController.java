package com.startupcrm.crm_backend.controller;

import com.startupcrm.crm_backend.model.Seguimiento;
import com.startupcrm.crm_backend.repository.SeguimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seguimientos")
public class SeguimientoController {

    @Autowired
    private SeguimientoRepository seguimientoRepository;

    @GetMapping
    public List<Seguimiento> getAllSeguimientos() {
        return seguimientoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seguimiento> getSeguimientoById(@PathVariable Long id) {
        return seguimientoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Seguimiento createSeguimiento(@RequestBody Seguimiento seguimiento) {
        return seguimientoRepository.save(seguimiento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seguimiento> updateSeguimiento(@PathVariable Long id, @RequestBody Seguimiento seguimientoDetails) {
        return seguimientoRepository.findById(id).map(seguimiento -> {
            seguimiento.setTarea(seguimientoDetails.getTarea());
            seguimiento.setFecha(seguimientoDetails.getFecha());
            seguimiento.setCompletado(seguimientoDetails.getCompletado());
            seguimiento.setContacto(seguimientoDetails.getContacto());
            return ResponseEntity.ok(seguimientoRepository.save(seguimiento));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeguimiento(@PathVariable Long id) {
        Optional<Seguimiento> seguimientoOpt = seguimientoRepository.findById(id);
        if (seguimientoOpt.isPresent()) {
            seguimientoRepository.delete(seguimientoOpt.get());
            return ResponseEntity.noContent().build(); // correcto tipo Void
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}