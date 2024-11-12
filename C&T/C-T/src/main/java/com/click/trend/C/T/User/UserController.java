package com.click.trend.C.T.User;
import com.click.trend.C.T.Products.Products;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {


    private final UserService userService;

    @GetMapping(value = "{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Integer id)
    {
        UserDTO userDTO = userService.getUser(id);
        if (userDTO==null)
        {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/get/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username)
    {
        UserDTO userDTO = userService.getUserByUsername(username);
        if (userDTO==null)
        {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping()
    public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest userRequest)
    {
        return ResponseEntity.ok(userService.updateUser(userRequest));
    }

    @GetMapping("all")
        public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);

    }
    @PatchMapping("/update/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody UserRequest userUpdate){
        try {
            User updatedUser = userService.updateUser(username, userUpdate);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/check-email/{username}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String username) {
        boolean exists = userService.existsByEmail(username);
        return ResponseEntity.ok(exists);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<UserResponse> deleteUserbyUsername(@PathVariable String username){
        boolean isDeleted = userService.deleteUser(username);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}


