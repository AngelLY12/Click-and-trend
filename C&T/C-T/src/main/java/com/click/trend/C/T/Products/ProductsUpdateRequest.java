package com.click.trend.C.T.Products;

import com.click.trend.C.T.Images.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductsUpdateRequest {
    private ProductGenderCategory gender;
    private ProductsCategory category;
    private ProductsSubCategory subCategory;
    private String title;
    private Double cost;
    private String desc;
    private Image imageUrl;
    private Integer quantity;
}
