package api.java.Fullstack_backend.service;

import api.java.Fullstack_backend.dto.UsuarioDTO;
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

    public UsuarioDTO criarUsuario(Usuario usuario) throws Exception {
        Endereco endereco = viaCepService.buscarEnderecoPorCep(usuario.getCep());
        if((endereco != null ) && (usuario != null)){
            Usuario usuarioSalvo = usuarioRepository.save(usuario);

            UsuarioDTO usuarioDTO = modelMapper.map(usuarioSalvo, UsuarioDTO.class);
            return usuarioDTO;
        }
        throw new UsuarioNaoEncontradoException(usuario.getId());
    }

    public List<UsuarioDTO> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();

        return usuarios.stream()
                .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class))
                .collect(Collectors.toList());
    }

    public UsuarioDTO pegarUsuarioPorId(Long id) {
        Usuario usuario = usuarioRepository
                .findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(id));

        return modelMapper.map(usuario, UsuarioDTO.class);
    }


    public UsuarioDTO atualizarUsuario(Long id, UsuarioDTO usuarioUp) throws Exception {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(id));

        Endereco endereco = viaCepService.buscarEnderecoPorCep(usuarioUp.getCep());
        if (endereco == null) {
            throw new Exception(ConfigUtils.CEP_NAO_LOCALIZADO);
        }

        usuario.setNome(usuarioUp.getNome());
        usuario.setCPF(usuarioUp.getCpf());
        usuario.setCep(usuarioUp.getCep());
        usuario.setEstado(usuarioUp.getEstado());
        usuario.setCidade(usuarioUp.getCidade());
        usuario.setBairro(usuarioUp.getBairro());
        usuario.setLogradouro(usuarioUp.getLogradouro());

        usuario.setDataAtualizacao(LocalDateTime.now());

        usuarioRepository.save(usuario);

        return modelMapper.map(usuario, UsuarioDTO.class);
    }


    public void deletarUsuario(Long id){
        Usuario usuario = usuarioRepository.findById(id).get();
        if(usuario != null){
            usuarioRepository.delete(usuario);
        }
    }

}
