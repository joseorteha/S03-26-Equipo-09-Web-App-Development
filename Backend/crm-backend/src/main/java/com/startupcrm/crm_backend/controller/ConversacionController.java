package com.startupcrm.crm_backend.controller;

import com.startupcrm.crm_backend.dto.ApiResponse;
import com.startupcrm.crm_backend.dto.ConversacionDTO;
import com.startupcrm.crm_backend.dto.ReasignarVendedorDTO;
import com.startupcrm.crm_backend.mapper.ConversacionMapper;
import com.startupcrm.crm_backend.model.Conversacion;
import com.startupcrm.crm_backend.service.ConversacionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversaciones")
public class ConversacionController {

    private final ConversacionService conversacionService;

    public ConversacionController(ConversacionService conversacionService) {
        this.conversacionService = conversacionService;
    }

    // ========== ENDPOINTS CON PAGINACIÓN (NUEVOS) ==========

    /**
     * GET /api/conversaciones?page=0&size=20&sort=fechaHora,desc
     */
    @GetMapping
    public ApiResponse<Page<ConversacionDTO>> getAllConversacionesPaged(
            @PageableDefault(size = 20, sort = "fechaHora", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ConversacionDTO> data = conversacionService.getAllPaged(pageable)
                .map(ConversacionMapper::toDTO);
        return new ApiResponse<>(true, data, null);
    }

    /**
     * GET /api/conversaciones/search?busqueda=texto&page=0&size=20
     */
    @GetMapping("/search")
    public ApiResponse<Page<ConversacionDTO>> searchConversaciones(
            @RequestParam String busqueda,
            @PageableDefault(size = 20, sort = "fechaHora", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ConversacionDTO> data = conversacionService.search(busqueda, pageable)
                .map(ConversacionMapper::toDTO);
        return new ApiResponse<>(true, data, null);
    }

    /**
     * GET /api/conversaciones/canal/{canal}?page=0&size=20
     */
    @GetMapping("/canal/{canal}")
    public ApiResponse<Page<ConversacionDTO>> getConversacionesPorCanal(
            @PathVariable String canal,
            @PageableDefault(size = 20, sort = "fechaHora", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ConversacionDTO> data = conversacionService.getByCanal(canal, pageable)
                .map(ConversacionMapper::toDTO);
        return new ApiResponse<>(true, data, null);
    }

    /**
     * GET /api/conversaciones/por-vendedor/{vendedorId}?page=0&size=20&canal=WhatsApp
     */
    @GetMapping("/por-vendedor/{vendedorId}")
    public ApiResponse<Page<ConversacionDTO>> getConversacionesPorVendedor(
            @PathVariable Long vendedorId,
            @RequestParam(required = false) String canal,
            @PageableDefault(size = 20, sort = "fechaHora", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ConversacionDTO> data;
        if (canal != null && !canal.isEmpty()) {
            data = conversacionService.getByVendedorIdAndCanal(vendedorId, canal, pageable)
                    .map(ConversacionMapper::toDTO);
        } else {
            data = conversacionService.getByVendedorIdPaged(vendedorId, pageable)
                    .map(ConversacionMapper::toDTO);
        }
        return new ApiResponse<>(true, data, null);
    }

    /**
     * GET /api/conversaciones/por-vendedor/{vendedorId}/search?busqueda=texto
     */
    @GetMapping("/por-vendedor/{vendedorId}/search")
    public ApiResponse<Page<ConversacionDTO>> searchConversacionesPorVendedor(
            @PathVariable Long vendedorId,
            @RequestParam String busqueda,
            @PageableDefault(size = 20, sort = "fechaHora", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ConversacionDTO> data = conversacionService.searchByVendedor(vendedorId, busqueda, pageable)
                .map(ConversacionMapper::toDTO);
        return new ApiResponse<>(true, data, null);
    }

    /**
     * GET /api/conversaciones/por-vendedor/{vendedorId}/no-leidos
     * Contar conversaciones no leídas
     */
    @GetMapping("/por-vendedor/{vendedorId}/no-leidos")
    public ApiResponse<Long> countNoLeidosPorVendedor(@PathVariable Long vendedorId) {
        long count = conversacionService.countNoLeidosPorVendedor(vendedorId);
        return new ApiResponse<>(true, count, null);
    }

    // ========== ENDPOINTS SIN PAGINACIÓN (COMPATIBILIDAD HACIA ATRÁS) ==========

    @GetMapping("/{id}")
    public ApiResponse<ConversacionDTO> getConversacionById(@PathVariable Long id) {
        ConversacionDTO dto = ConversacionMapper.toDTO(conversacionService.getById(id));
        return new ApiResponse<>(true, dto, null);
    }

    @GetMapping("/por-contacto/{contactoId}")
    public ApiResponse<List<ConversacionDTO>> getConversacionesPorContacto(@PathVariable Long contactoId) {
        List<ConversacionDTO> data = conversacionService.getByContactoId(contactoId).stream()
                .map(ConversacionMapper::toDTO)
                .toList();
        return new ApiResponse<>(true, data, null);
    }

    // ========== CRUD BÁSICO ==========

    @PostMapping
    public ResponseEntity<ApiResponse<ConversacionDTO>> createConversacion(@Valid @RequestBody ConversacionDTO dto) {
        Conversacion conversacion = ConversacionMapper.toEntity(dto);
        Conversacion saved = conversacionService.save(conversacion);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, ConversacionMapper.toDTO(saved), null));
    }

    @PutMapping("/{id}")
    public ApiResponse<ConversacionDTO> updateConversacion(@PathVariable Long id, @Valid @RequestBody ConversacionDTO dto) {
        Conversacion conversacionDetails = ConversacionMapper.toEntity(dto);
        Conversacion updated = conversacionService.update(id, conversacionDetails);
        return new ApiResponse<>(true, ConversacionMapper.toDTO(updated), null);
    }

    /**
     * PUT /api/conversaciones/{id}/marcar-leido
     */
    @PutMapping("/{id}/marcar-leido")
    public ApiResponse<ConversacionDTO> marcarComoLeido(@PathVariable Long id) {
        Conversacion updated = conversacionService.marcarComoLeido(id);
        return new ApiResponse<>(true, ConversacionMapper.toDTO(updated), null);
    }

    /**
     * PUT /api/conversaciones/{id}/marcar-no-leido
     */
    @PutMapping("/{id}/marcar-no-leido")
    public ApiResponse<ConversacionDTO> marcarComoNoLeido(@PathVariable Long id) {
        Conversacion updated = conversacionService.marcarComoNoLeido(id);
        return new ApiResponse<>(true, ConversacionMapper.toDTO(updated), null);
    }

    /**
     * PUT /api/conversaciones/{id}/estado/{nuevoEstado}
     */
    @PutMapping("/{id}/estado/{nuevoEstado}")
    public ApiResponse<ConversacionDTO> cambiarEstado(@PathVariable Long id, @PathVariable String nuevoEstado) {
        Conversacion updated = conversacionService.cambiarEstado(id, nuevoEstado);
        return new ApiResponse<>(true, ConversacionMapper.toDTO(updated), null);
    }

    @PutMapping("/reasignar-vendedor")
    public ApiResponse<ConversacionDTO> reasignarVendedor(@Valid @RequestBody ReasignarVendedorDTO dto) {
        Conversacion updated = conversacionService.reasignarVendedor(dto.getConversacionId(), dto.getNuevoVendedorId());
        return new ApiResponse<>(true, ConversacionMapper.toDTO(updated), null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteConversacion(@PathVariable Long id) {
        conversacionService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(new ApiResponse<>(true, null, null));
    }
}