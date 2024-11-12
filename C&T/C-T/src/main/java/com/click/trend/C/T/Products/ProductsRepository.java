package com.click.trend.C.T.Products;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductsRepository extends JpaRepository<Products,Long> {
    Optional<Products> findById(Long id);
    @EntityGraph(attributePaths = {"image"})
    List<Products> findAll();
    Optional<Products> findByTitle(String title);

    List<Products> findByCategory(ProductsCategory category);
    List<Products> findByGender(ProductGenderCategory gender);
    List<Products> findBySubCategory(ProductsSubCategory subCategory);
    List<Products> findByCategoryAndGenderAndSubCategory(ProductsCategory category, ProductGenderCategory gender, ProductsCategory subCategory);
}


