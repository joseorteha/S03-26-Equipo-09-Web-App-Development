package com.startupcrm.crm_backend.controller;


import com.startupcrm.crm_backend.model.Contacto;
import com.startupcrm.crm_backend.repository.ContactoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contactos")
public class ContactoController {

    private final ContactoRepository contactoRepository;

    public ContactoController(ContactoRepository contactoRepository) {
        this.contactoRepository = contactoRepository;
    }

    @GetMapping
    public List<Contacto> getAll() {
        return contactoRepository.findAll();
    }

    @PostMapping
    public Contacto create(@RequestBody Contacto contacto) {
        return contactoRepository.save(contacto);
    }

    /*@PutMapping("/{id}")
    public Contacto update(@PathVariable Long id, @RequestBody Contacto contacto) {
        contacto.setId(id);
        return contactoRepository.save(contacto);
    }*/

    @PutMapping("/{id}")
    public Contacto update(@PathVariable Long id, @RequestBody Contacto contacto) {

        Contacto existente = contactoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contacto no encontrado"));

        existente.setNombre(contacto.getNombre());
        existente.setEmail(contacto.getEmail());
        existente.setTelefono(contacto.getTelefono());
        existente.setEstado(contacto.getEstado());

        return contactoRepository.save(existente);
    }



  /* @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        contactoRepository.deleteById(id);
    }*/

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        if (!contactoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        contactoRepository.deleteById(id);

        return ResponseEntity.noContent().build(); // 204
    }


    //
    @GetMapping("/{id}")
    public Contacto getById(@PathVariable Long id) {
        return contactoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contacto no encontrado"));
    }

}