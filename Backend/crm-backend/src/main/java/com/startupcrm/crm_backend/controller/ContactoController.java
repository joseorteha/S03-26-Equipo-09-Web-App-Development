package com.startupcrm.crm_backend.controller;


import com.startupcrm.crm_backend.model.Contacto;
import com.startupcrm.crm_backend.repository.ContactoRepository;
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

    @PutMapping("/{id}")
    public Contacto update(@PathVariable Long id, @RequestBody Contacto contacto) {
        contacto.setId(id);
        return contactoRepository.save(contacto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        contactoRepository.deleteById(id);
    }
}