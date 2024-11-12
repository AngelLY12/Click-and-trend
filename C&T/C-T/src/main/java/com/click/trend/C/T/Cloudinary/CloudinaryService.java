package com.click.trend.C.T.Cloudinary;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface CloudinaryService {
    Map upload(MultipartFile multipartFile) throws IOException;
    Map delete(String id) throws IOException;
}