package com.diaosu.quickfile.service;

import com.diaosu.quickfile.entity.User;
import com.diaosu.quickfile.entity.WechatOpenIDCallBack;
import com.diaosu.quickfile.mapper.UserMapper;
import com.diaosu.quickfile.utils.RestTemplateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

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

    public String getOpenID(String code) {
        //拼接GET微信服务器的URL
        url = url + "?appid=" + AppID + "&secret=" + AppSecret + "&js_code=" + code + "&grant_type=authorization_code";
        System.out.println(url);
        RestTemplate restTemplate = RestTemplateUtil.getInstance();
        WechatOpenIDCallBack callBack = restTemplate.getForObject(url, WechatOpenIDCallBack.class);
        if (callBack.getErrcode() == 0) {
            return callBack.getOpenid();
        } else {
            return "Error Requesting OpenID: " + callBack.getErrmsg();
        }


    }
}
