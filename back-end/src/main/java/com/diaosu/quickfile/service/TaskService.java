package com.diaosu.quickfile.service;

import com.diaosu.quickfile.entity.Task;
import com.diaosu.quickfile.mapper.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */
@Service
public class TaskService {
    @Autowired
    TaskMapper taskMapper;

    public List<Task> getAllTaskByUserID(String UserID) {
        return taskMapper.getAllTaskByUserID(UserID);
    }

}
