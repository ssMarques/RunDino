package br.fag.dinorun;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DinoController {
    @GetMapping ("/index")
    public String Pontofinal(){
        return "index";
    }

}
