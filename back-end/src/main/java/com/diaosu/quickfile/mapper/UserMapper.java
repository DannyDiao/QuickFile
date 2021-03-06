package com.diaosu.quickfile.mapper;

import com.diaosu.quickfile.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;

/**
 * Created By Diao Su
 * Date 2019/12/10
 */
@Repository
public interface UserMapper {
    User getUser(String UserID);

    User getUserByOpenID(String OpenID);

    void createUser(User user) throws SQLIntegrityConstraintViolationException;

    User login(String UserID, String PassWord);
}
