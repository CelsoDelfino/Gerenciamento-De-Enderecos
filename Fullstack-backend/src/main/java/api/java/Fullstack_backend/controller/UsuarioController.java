package api.java.Fullstack_backend.controller;

import api.java.Fullstack_backend.model.Endereco;
import api.java.Fullstack_backend.model.Usuario;
import api.java.Fullstack_backend.service.UsuarioService;
import api.java.Fullstack_backend.service.ViaCepService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final ViaCepService viaCepService;

    public UsuarioController(UsuarioService usuarioService, ViaCepService viaCepService) {
        this.usuarioService = usuarioService;
        this.viaCepService = viaCepService;
    }

    @GetMapping("/buscarCep/{cep}")
    public ResponseEntity<Endereco> buscarCep(@PathVariable String cep) {
        try {
            Endereco endereco = viaCepService.buscarEnderecoPorCep(cep);
            return ResponseEntity.ok(endereco);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping
    public ResponseEntity<Usuario> inserirUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario usuarioCriado = usuarioService.criarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCriado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario pegarUsuarioPorId(@PathVariable Long id) {
        return usuarioService.pegarUsuarioPorId(id);
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioUp) throws Exception {
        return usuarioService.atualizarUsuario(id, usuarioUp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        try {
            usuarioService.deletarUsuario(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
