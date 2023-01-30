package com.github.rwszelaki.k6skillupdemo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Slf4j
@RestController
public class Controller {

    @GetMapping("/get")
    String get() throws InterruptedException {
        log.info("Received GET request");
        return "Request completed successfully";
    }


    @PostMapping("/post")
    void post(@RequestBody Data data) throws InterruptedException {
        log.info("Received POST request: id: " + data.getId() + " text:"  + data.getText());
        if (new Random().nextInt(100) < 10) {
            throw new RuntimeException();
        }
    }

    @DeleteMapping("/delete/{id}")
    void delete(@PathVariable Integer id) {
        log.info("Received DELETE request: id: " + id);
    }
}
