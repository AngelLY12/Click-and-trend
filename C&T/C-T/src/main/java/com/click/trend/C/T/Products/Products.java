package com.click.trend.C.T.Products;


import com.click.trend.C.T.Images.Image;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="products_category")
@Getter
@Setter
public class Products {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private ProductGenderCategory gender;  // Enum de género (MEN, WOMEN, CHILDREN)

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ProductsCategory category;  // Enum de género (MEN, WOMEN, CHILDREN)

    @Enumerated(EnumType.STRING)
    @Column(name = "subcategory", nullable = false)
    private ProductsSubCategory subCategory;

    @Column(name = "title")
    private String title;
    @Column(name = "cost")
    private double cost;
    @Column(name = "description")
    private String desc;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id",referencedColumnName = "id")
    private Image image;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;






}
