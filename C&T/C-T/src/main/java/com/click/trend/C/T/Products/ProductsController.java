package com.click.trend.C.T.Products;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    // Endpoint para insertar un producto
    @PostMapping("/insert")
    public ResponseEntity<ProductsResponse> insertProduct(@RequestPart("request") ProductsRequest request, @RequestPart("file") MultipartFile file) throws IOException {
        ProductsResponse response = productsService.insertProducts(request,file);

        if (response.getMessage().equals("El producto ya existe en la base de datos")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Endpoint para obtener un producto por ID o título
    @GetMapping("/get/{id}")
    public ResponseEntity<Products> getProduct(
            @PathVariable Long id) {
        Products response = productsService.selectProduct(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getId")
    public ResponseEntity<Optional<Products>> getProductId(
            @RequestParam(value = "id", required = false) Long id) {

        if (id == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<Products> productId = productsService.getProductById(id);

        if (!productId.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(productId);
    }



    @GetMapping("/all")
    public ResponseEntity<List<Products>> getAllProducts()  {
        List<Products> products = productsService.selectAllProducts();
        return ResponseEntity.ok(products);
    }

    // Endpoint para obtener productos por categoría
    @GetMapping("/category")
    public ResponseEntity<List<Products>> getProductsByCategory(
            @RequestParam("category") String categoryName) {

        List<Products> products = productsService.selectProductsByCategory(categoryName);

        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(products);
        }

        return ResponseEntity.ok(products);
    }

    // Endpoint para obtener productos por género
    @GetMapping("/gender")
    public ResponseEntity<List<Products>> getProductsByGender(@RequestParam("gender") String gender) {
        List<Products> products = productsService.selectProductsByGender(gender);

        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(products);
        }

        return ResponseEntity.ok(products);
    }

    // Endpoint para obtener productos por subcategoría
    @GetMapping("/subcategory")
    public ResponseEntity<List<Products>> getProductsBySubCategory(@RequestParam("subCategory") String subCategoryName) {
        List<Products> products = productsService.selectProductsBySubCategory(subCategoryName);

        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(products);
        }

        return ResponseEntity.ok(products);
    }

    // Endpoint para obtener productos por categoría, género y subcategoría
    @GetMapping("/filter")
    public ResponseEntity<List<Products>> getProductsByCategoryGenderAndSubCategory(
            @RequestParam("category") String categoryName,
            @RequestParam("gender") String gender,
            @RequestParam("subCategory") String subCategoryName) {

        List<Products> products = productsService.selectProductsByCategoryGenderAndSubCategory(categoryName, gender, subCategoryName);

        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(products);
        }

        return ResponseEntity.ok(products);
    }

    // Modificar un producto
    @PutMapping("/update/{id}")
    public ResponseEntity<ProductsResponse> updateProduct(@PathVariable Long id, @RequestBody ProductsRequest request) {
        ProductsResponse response = productsService.updateProduct(id, request);
        if (response.getMessage().equals("Producto no encontrado")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(response);
    }
    @PatchMapping("/updatePatch/{id}")
    public ResponseEntity<Products> updateProduct(
            @PathVariable Long id,
            @RequestPart("updateRequest") ProductsUpdateRequest updateRequest, @RequestPart("file") MultipartFile file) throws IOException {
        Optional<Products> product = productsService.getProductById(id);
        if (product.isPresent()){
           Products request= productsService.updateProduct(id,updateRequest,file);
            return ResponseEntity.ok(request);
        }
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    // Eliminar un producto
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        boolean isDeleted = productsService.deleteProduct(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
