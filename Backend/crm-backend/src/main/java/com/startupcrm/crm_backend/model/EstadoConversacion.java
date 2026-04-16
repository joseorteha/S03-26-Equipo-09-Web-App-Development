package com.startupcrm.crm_backend.model;

/**
 * Estados posibles de una conversación en el sistema.
 * 
 * - NO_LEIDO: Mensaje entrante sin ver por el vendedor/admin
 * - LEIDO: El vendedor/admin ha visto la conversación
 * - RESPONDIDO: Ya existe respuesta del sistema
 * - CERRADO: Conversación marcada como completada
 * - FALLIDO: Error al procesar/enviar el mensaje
 * 
 * @author Backend Team
 * @version 1.0
 */
public enum EstadoConversacion {
    NO_LEIDO("No Leído"),
    LEIDO("Leído"),
    RESPONDIDO("Respondido"),
    CERRADO("Cerrado"),
    FALLIDO("Fallido");

    private final String descripcion;

    EstadoConversacion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
