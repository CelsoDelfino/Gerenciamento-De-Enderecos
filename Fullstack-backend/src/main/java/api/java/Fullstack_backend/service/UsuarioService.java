package api.java.Fullstack_backend.service;

import api.java.Fullstack_backend.exception.UsuarioNaoEncontradoException;
import api.java.Fullstack_backend.model.Endereco;
import api.java.Fullstack_backend.model.Usuario;
import api.java.Fullstack_backend.repository.UsuarioRepository;
import api.java.Fullstack_backend.utils.ConfigUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private UsuarioRepository usuarioRepository;
    private ViaCepService viaCepService;
    private ModelMapper modelMapper;

    public UsuarioService(UsuarioRepository usuarioRepository, ViaCepService viaCepService, ModelMapper modelMapper){
        this.usuarioRepository = usuarioRepository;
        this.viaCepService = viaCepService;
        this.modelMapper = modelMapper;
    }

    public Usuario criarUsuario(Usuario usuario) throws Exception {
        Endereco endereco = viaCepService.buscarEnderecoPorCep(usuario.getCep());
        if((endereco != null ) && (usuario != null)){
            Usuario usuarioSalvo = new Usuario();
            usuarioSalvo.setNome(usuario.getNome());
            usuarioSalvo.setCep(usuario.getCep());
            usuarioSalvo.setCPF(usuario.getCPF());
            usuarioSalvo.setBairro(endereco.getBairro());
            usuarioSalvo.setLogradouro(endereco.getLogradouro());
            usuarioSalvo.setEstado(endereco.getEstado());
            usuarioSalvo.setCidade(endereco.getLocalidade());

            return usuarioSalvo;
        }
        throw new UsuarioNaoEncontradoException(usuario.getId());
    }

    public List<Usuario> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios;
    }

    public Usuario pegarUsuarioPorId(Long id) {
        Usuario usuario = usuarioRepository
                .findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(id));

        return usuario;
    }


    public Usuario atualizarUsuario(Long id, Usuario usuarioUp) throws Exception {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(id));

        Endereco endereco = viaCepService.buscarEnderecoPorCep(usuarioUp.getCep());
        if (endereco == null) {
            throw new Exception(ConfigUtils.CEP_INVALIDO);
        }

        usuario.setNome(usuarioUp.getNome());
        usuario.setCPF(usuarioUp.getCPF());
        usuario.setCep(usuarioUp.getCep());
        usuario.setEstado(usuarioUp.getEstado());
        usuario.setCidade(usuarioUp.getCidade());
        usuario.setBairro(usuarioUp.getBairro());
        usuario.setLogradouro(usuarioUp.getLogradouro());

        usuario.setDataAtualizacao(LocalDateTime.now());

        usuarioRepository.save(usuario);

        return usuario;
    }


    public void deletarUsuario(Long id){
        Usuario usuario = usuarioRepository.findById(id).get();
        if(usuario != null){
            usuarioRepository.delete(usuario);
        }
    }

}
