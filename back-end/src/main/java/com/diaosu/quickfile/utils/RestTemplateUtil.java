package com.diaosu.quickfile.utils;

import org.springframework.web.client.RestTemplate;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */
public class RestTemplateUtil {
    public static RestTemplate getInstance() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(new WxMappingJackson2HttpMessageConverter());
        return restTemplate;
    }
}
