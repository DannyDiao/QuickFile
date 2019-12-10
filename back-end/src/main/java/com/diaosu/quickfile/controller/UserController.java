package com.diaosu.quickfile.controller;

import com.diaosu.quickfile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created By Diao Su
 * Date 2019/12/10
 */

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getuser/{id}")
    public String getUser(@PathVariable String id) {
        return userService.getUser(id).generateString();
    }

    @GetMapping("/getopenid/{code}")
    public String getOpenID(@PathVariable String code) {
        return userService.getOpenID(code);
    }

}
