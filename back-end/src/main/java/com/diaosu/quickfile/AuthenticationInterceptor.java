package com.diaosu.quickfile;
/* Created By DiaoSu
   Date  2020/4/6
   Mail  diaosu@diaosudev.cn */

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.diaosu.quickfile.annotations.PassToken;
import com.diaosu.quickfile.annotations.RequiredToken;
import com.diaosu.quickfile.entity.User;
import com.diaosu.quickfile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

//自定义拦截器，做访问接口的检查，检查是否需要token
public class AuthenticationInterceptor implements HandlerInterceptor {
    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");  //读出token
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();

        //如果带有PassToken注解，则跳过验证
        if (method.isAnnotationPresent(PassToken.class)) {
            PassToken passToken = method.getAnnotation(PassToken.class);
            if (passToken.required()) {
                return true;
            }
        }

        //检查注解
        if (method.isAnnotationPresent(RequiredToken.class)) {
            RequiredToken requiredToken = method.getAnnotation(RequiredToken.class);
            if (requiredToken.required()) {
                if (token == null) {
                    throw new RuntimeException("无token，请获取token再请求");
                }

                String userId;
                try {
                    userId = JWT.decode(token).getAudience().get(0);
                } catch (JWTDecodeException e) {
                    throw new RuntimeException("401");
                }
                User user = userService.getUser(userId);
                if (user == null) {
                    throw new RuntimeException("用户不存在");
                }

                JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassWord())).build();
                try {
                    jwtVerifier.verify(token);
                } catch (JWTVerificationException e) {
                    throw new RuntimeException("401");
                }
                return true;
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
