package com.diaosu.quickfile.controller;

import com.diaosu.quickfile.entity.User;
import com.diaosu.quickfile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;

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
    @GetMapping(value = "/getOpenid")
    public ResponseEntity<User> getOpenID(String code) {
        System.out.println("code" + code);
        User responseUser = userService.getOpenID(code);
        if (responseUser != null) {
            return ResponseEntity.ok(responseUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); //若无此用户则return 404
        }
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(User user) {
        System.out.println("userid" + user.getUserID());
        System.out.println("password" + user.getPassWord());
        System.out.println("name" + user.getUserName());
        System.out.println("ava" + user.getAvatarUrl());
        System.out.println("openid" + user.getOpenID());
        //先交换成OpenID
        String OpenID = userService.exchangeOpenID(user.getOpenID());
        user.setOpenID(OpenID);
        System.out.println(OpenID);
        try {
            userService.createUser(user);
        } catch (SQLIntegrityConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        System.out.println(user.getUserID());
        return ResponseEntity.ok(user.getUserID());
    }

}
