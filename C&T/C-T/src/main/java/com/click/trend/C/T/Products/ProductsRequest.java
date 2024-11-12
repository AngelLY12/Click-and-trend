package com.click.trend.C.T.Products;


import com.click.trend.C.T.Images.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductsRequest {
    Long id;
    ProductsCategory category;
    String title;
    double cost;
    String desc;
    Image image;
    int quantity;
    Date dateCreated;
    Date lastUpdated;
    ProductGenderCategory gender;
    ProductsSubCategory subCategory;
}
