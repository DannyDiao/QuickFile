package com.diaosu.quickfile.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.diaosu.quickfile.entity.User;
import com.diaosu.quickfile.entity.WechatOpenIDCallBack;
import com.diaosu.quickfile.mapper.UserMapper;
import com.diaosu.quickfile.utils.RestTemplateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.sql.SQLIntegrityConstraintViolationException;

/**
 * Created By Diao Su
 * Date 2019/12/10
 * diaosu@diaosudev.cn
 */
@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    @Value("${external.wechat.openid.appid}")
    private String AppID;
    @Value("${external.wechat.openid.appsecret}")
    private String AppSecret;
    @Value("${external.wechat.openid.url}")
    private String url;

    @Resource
    private RestTemplateBuilder restTemplateBuilder;

    public User getUser(String UserID) {
        return userMapper.getUser(UserID);
    }

    public User getOpenID(String code) {
        System.out.println("code" + code);
        //拼接GET微信服务器的URL
        String urlTemp = url + "?appid=" + AppID + "&secret=" + AppSecret + "&js_code=" + code + "&grant_type=authorization_code";
        System.out.println(urlTemp);
        RestTemplate restTemplate = RestTemplateUtil.getInstance();
        WechatOpenIDCallBack callBack = restTemplate.getForObject(urlTemp, WechatOpenIDCallBack.class);
        if (callBack.getErrcode() == 0) {
            return getUserByOpenID(callBack.getOpenid());
        } else {
            return null;
        }
    }

    public User getUserByOpenID(String OpenID){
        return userMapper.getUserByOpenID(OpenID);
    }

    public void createUser(User user) throws SQLIntegrityConstraintViolationException {
        userMapper.createUser(user);
    }

    public User login(String UserID, String PassWord) {
        return userMapper.login(UserID, PassWord);
    }

    public String exchangeOpenID(String code) {
        //拼接GET微信服务器的URL
        String urlTemp = url + "?appid=" + AppID + "&secret=" + AppSecret + "&js_code=" + code + "&grant_type=authorization_code";
        System.out.println(urlTemp);
        RestTemplate restTemplate = RestTemplateUtil.getInstance();
        WechatOpenIDCallBack callBack = restTemplate.getForObject(urlTemp, WechatOpenIDCallBack.class);
        if (callBack.getErrcode() == 0) {
            return callBack.getOpenid();
        } else {
            return null;
        }
    }

    public String generateToken(User user) {
        String token = "";
        token = JWT.create().withAudience(user.getUserID())
                .sign(Algorithm.HMAC256(user.getPassWord()));
        return token;
    }
}
