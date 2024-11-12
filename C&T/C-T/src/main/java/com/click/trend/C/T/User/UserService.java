package com.click.trend.C.T.User;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
                .id(userRequest.id)
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.lastname)
                .age(userRequest.getAge())
                .role(Role.USER)
                .build();

        userRepository.updateUser(user.id, user.firstname, user.lastname, user.age);

        return new UserResponse("El usuario se registró satisfactoriamente");
    }

    public UserDTO getUser(Integer id) {
        User user= userRepository.findById(id).orElse(null);

        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
                    .id(user.id)
                    .username(user.username)
                    .firstname(user.firstname)
                    .lastname(user.lastname)
                    .age(user.age)
                    .build();
            return userDTO;
        }
        return null;
    }
    public UserDTO getUserByUsername(String username) {
        User user= userRepository.findByUsername(username).orElse(null);

        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
                    .id(user.id)
                    .username(user.username)
                    .password(user.password)
                    .firstname(user.firstname)
                    .lastname(user.lastname)
                    .age(user.age)
                    .build();
            return userDTO;
        }
        return null;
    }
    public User updateUser(String username, UserRequest userUpdate){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + username));


        if (userUpdate.getFirstname() != null) {
            user.setFirstname(userUpdate.getFirstname());
        }
        if (userUpdate.getLastname() != null) {
            user.setLastname(userUpdate.getLastname());
        }
        if (userUpdate.getAge() != null) {
            user.setAge(userUpdate.getAge());
        }
        if (userUpdate.getPassword() != null) {
            user.setPassword(userUpdate.getFirstname());
        }


        return userRepository.save(user);
    }


    public List<User> getAllUsers(){
        List<User> allUsers= userRepository.findAll();
        if(allUsers.isEmpty()){
            throw new EntityNotFoundException("No se encontraron Usuarios");

        }
        return allUsers;
    }
    public boolean deleteUser(String username){
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(userOptional.isPresent()){
            userRepository.deleteByUsername(username);
            return true;
        }
        return false;
    }
    public boolean existsByEmail(String username) {
        return userRepository.existsByUsername(username);  // Suponiendo que tienes un repositorio que consulta el email
    }

}