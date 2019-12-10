package com.diaosu.quickfile.mapper;

import com.diaosu.quickfile.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * Created By Diao Su
 * Date 2019/12/10
 */
@Repository
public interface UserMapper {
    User getUser(String UserID);
}
