package com.click.trend.C.T.Products;


import com.click.trend.C.T.Images.Image;
import com.click.trend.C.T.Images.ImageRepository;
import com.click.trend.C.T.Images.ImageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageRepository imageRepository;

    public ProductsResponse insertProducts(ProductsRequest request, MultipartFile file) throws IOException {

        if(file !=null && !file.isEmpty()){
            Image image = imageService.uploadImage(file);
            request.setImage(image);
        }
        Optional<Products> existingProduct = productsRepository.findByTitle(request.getTitle());

        if (existingProduct.isPresent()) {
            return new ProductsResponse("El producto ya existe en la base de datos");
        }
        Products product = Products.builder()
                .category(ProductsCategory.valueOf(request.getCategory().name()))
                .subCategory(ProductsSubCategory.valueOf(request.getSubCategory().name()))
                .gender(ProductGenderCategory.valueOf(request.getGender().name()))
                .title(request.getTitle())
                .cost(request.getCost())
                .desc(request.getDesc())
                .image(request.getImage())
                .quantity(request.getQuantity())
                .dateCreated(new Date())
                .lastUpdated(new Date())
                .build();
        productsRepository.save(product);

        return new ProductsResponse("El producto se ha agregado exitosamente");
    }

    public List<Products> selectAllProducts() {
        List<Products> allProducts = productsRepository.findAll(Sort.by(Sort.Order.asc("id")));

        if (allProducts.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron productos");
        }

        return allProducts;
    }



    public Products selectProduct(Long id) {

        return productsRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Product not found with id:" +id));

    }

    public List<Products> selectProductsByCategory(String categoryName) {
        ProductsCategory category = ProductsCategory.valueOf(categoryName.toUpperCase());
        List<Products> categories = productsRepository.findByCategory(category);
        if (categories.isEmpty()) {
            throw new EntityNotFoundException("Categoría no encontrada");
        }

        return productsRepository.findByCategory(category);
    }
    public List<Products> selectProductsByGender(String gender) {
        ProductGenderCategory genderCategory = ProductGenderCategory.valueOf(gender.toUpperCase());
        return productsRepository.findByGender(genderCategory);
    }
    public List<Products> selectProductsBySubCategory(String subCategoryName) {
        ProductsSubCategory subCategory = ProductsSubCategory.valueOf(subCategoryName.toUpperCase());
        List<Products> subCategories = productsRepository.findBySubCategory(subCategory);
        if (subCategories.isEmpty()) {
            throw new EntityNotFoundException("Subcategoría no encontrada");
        }
        return productsRepository.findBySubCategory(subCategory);
    }
    public List<Products> selectProductsByCategoryGenderAndSubCategory(String categoryName, String gender, String subCategoryName) {
        ProductsCategory productsCategory = ProductsCategory.valueOf(categoryName.toUpperCase());
        ProductsSubCategory productsSubCategory = ProductsSubCategory.valueOf(subCategoryName.toUpperCase());
        List<Products> category = productsRepository.findByCategory(productsCategory);
        List<Products> subCategory = productsRepository.findBySubCategory(productsSubCategory);
        ProductGenderCategory genderCategory = ProductGenderCategory.valueOf(gender.toUpperCase());

        if (category.isEmpty()) {
            throw new EntityNotFoundException("Categoría no encontrada");
        }
        if (subCategory.isEmpty()) {
            throw new EntityNotFoundException("Subcategoría no encontrada");
        }

        return productsRepository.findByCategoryAndGenderAndSubCategory(productsCategory, genderCategory, productsCategory);
    }

    public ProductsResponse updateProduct(Long id, ProductsRequest request) {
        Optional<Products> productOpt = productsRepository.findById(id);
        if (productOpt.isPresent()) {
            Products product = productOpt.get();
            // Actualizar los campos del producto con los valores de request
            productsRepository.save(product);
            return new ProductsResponse("Producto actualizado correctamente");
        } else {
            return new ProductsResponse("Producto no encontrado");
        }
    }

    public Products updateProduct(Long id, ProductsUpdateRequest updateRequest, MultipartFile file) throws IOException {
        Products product = productsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));


        if (updateRequest.getGender() != null) {
            product.setGender(updateRequest.getGender());
        }
        if (updateRequest.getCategory() != null) {
            product.setCategory(updateRequest.getCategory());
        }
        if (updateRequest.getSubCategory() != null) {
            product.setSubCategory(updateRequest.getSubCategory());
        }
        if (updateRequest.getTitle() != null) {
            product.setTitle(updateRequest.getTitle());
        }
        if (updateRequest.getCost() != null) {
            product.setCost(updateRequest.getCost());
        }
        if (updateRequest.getDesc() != null) {
            product.setDesc(updateRequest.getDesc());
        }
        if (updateRequest.getImageUrl() != null) {
            imageService.deleteImage(updateRequest.getImageUrl());
            Image newIMage= imageService.uploadImage(file);
            updateRequest.setImageUrl(newIMage);
        }
        if (updateRequest.getQuantity() != null) {
            product.setQuantity(updateRequest.getQuantity());
        }

        return productsRepository.save(product);
    }
    public boolean deleteProduct(Long id) {
        if (productsRepository.existsById(id)) {
            productsRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
    public Optional<Products> getProductById(Long id){
        return productsRepository.findById(id);
    }
    public Long getProductIdById(Long id) {
        Products product = productsRepository.findById(id).orElse(null);
        return (product != null) ? product.getId() : null;
    }

}
