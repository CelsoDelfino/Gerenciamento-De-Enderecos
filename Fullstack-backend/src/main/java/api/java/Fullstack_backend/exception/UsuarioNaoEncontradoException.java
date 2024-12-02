package api.java.Fullstack_backend.exception;

public class UsuarioNaoEncontradoException extends RuntimeException{

    public UsuarioNaoEncontradoException(Long id){
        super("O usuário com o id = "+ id + " não foi encontrado");
    }
}
