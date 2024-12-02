package api.java.Fullstack_backend.service;

import api.java.Fullstack_backend.utils.ConfigUtils;
import api.java.Fullstack_backend.model.Endereco;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;


import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class ViaCepService {

    public Endereco buscarEnderecoPorCep(String cep) throws Exception {

        String url = String.format(ConfigUtils.URL_VIA_CEP, cep);

        try{
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            String json = response.body();

            JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();
            if (jsonObject.has(ConfigUtils.ERRO) && jsonObject.get(ConfigUtils.ERRO).getAsBoolean()) {
                throw new Exception(ConfigUtils.CEP_NAO_LOCALIZADO);
            }

            Endereco endereco = new Gson().fromJson(json, Endereco.class);

            return endereco;
        }
        catch (Exception e ){
            throw new Exception(e.getMessage());
        }
    }
}
