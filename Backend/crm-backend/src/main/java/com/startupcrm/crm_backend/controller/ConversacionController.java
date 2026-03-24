package com.startupcrm.crm_backend.controller;

import com.startupcrm.crm_backend.model.Conversacion;
import com.startupcrm.crm_backend.repository.ConversacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversaciones")
public class ConversacionController {

    @Autowired
    private ConversacionRepository conversacionRepository;

    @GetMapping
    public List<Conversacion> getAllConversaciones() {
        return conversacionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conversacion> getConversacionById(@PathVariable Long id) {
        return conversacionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Conversacion createConversacion(@RequestBody Conversacion conversacion) {
        return conversacionRepository.save(conversacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Conversacion> updateConversacion(@PathVariable Long id, @RequestBody Conversacion conversacionDetails) {
        return conversacionRepository.findById(id).map(conversacion -> {
            conversacion.setCanal(conversacionDetails.getCanal());
            conversacion.setContenido(conversacionDetails.getContenido());
            conversacion.setFechaHora(conversacionDetails.getFechaHora());
            conversacion.setContacto(conversacionDetails.getContacto());
            return ResponseEntity.ok(conversacionRepository.save(conversacion));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeguimiento(@PathVariable Long id) {
        return conversacionRepository.findById(id)
                .map(seguimiento -> {
                    conversacionRepository.delete(seguimiento);
                    return ResponseEntity.noContent().<Void>build(); // forzado a Void
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}