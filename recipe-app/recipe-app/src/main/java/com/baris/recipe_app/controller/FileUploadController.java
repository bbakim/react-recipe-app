package com.baris.recipe_app.controller;

import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.File;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    private static final String UPLOAD_DIR = "recipeappui/public/recipe-images";

    @PostMapping("/upload/{id}")
    @SneakyThrows
    public File save(@RequestParam("image") MultipartFile file, @PathVariable int id) {
        String fileName = String.valueOf(id);
        var image = ImageIO.read(file.getInputStream());
        final var fileNameWithExtension = fileName + ".png";
        File outputFile = Paths.get(UPLOAD_DIR, fileNameWithExtension).toFile();
        ImageIO.write(image, "png", outputFile);

        return outputFile;
    }
}
