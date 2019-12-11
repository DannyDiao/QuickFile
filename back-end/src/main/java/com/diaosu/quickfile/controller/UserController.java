package com.diaosu.quickfile.controller;

import com.diaosu.quickfile.entity.User;
import com.diaosu.quickfile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created By Diao Su
 * Date 2019/12/10
 */

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    //通过OpenID获取用户信息
    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable String id) {
        return userService.getUser(id);
    }

    //通过code获取用户信息
    @GetMapping("/getOpenid/{code}")
    public ResponseEntity<User> getOpenID(@PathVariable String code) {
        User responseUser = userService.getOpenID(code);
        if (responseUser != null) {
            return ResponseEntity.ok(responseUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); //若无此用户则return 404
        }
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(User user) {
        //先交换成OpenID
        String OpenID = userService.exchangeOpenID(user.getOpenID());
        user.setOpenID(OpenID);

        userService.createUser(user);
        System.out.println(user.getUserID());
        return ResponseEntity.ok(user.getUserID());
    }

}
