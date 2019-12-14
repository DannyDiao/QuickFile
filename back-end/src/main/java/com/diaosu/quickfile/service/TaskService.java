package com.diaosu.quickfile.service;

import com.diaosu.quickfile.entity.File;
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

    public List<Task> getAllReleaseTaskByUserID(String UserID) {
        return taskMapper.getAllReleaseTaskByUserID(UserID);
    }

    public int getReleaseTaskCount(String UserID) {
        return taskMapper.getReleaseTaskCount(UserID);
    }

    public int getJoinTaskCount(String UserID) {
        return taskMapper.getJoinTaskCount(UserID);
    }

    public Task getTask(String TaskID) {
        return taskMapper.getTask(TaskID);
    }

    public int createTask(Task task) {
        return taskMapper.createTask(task);
    }

    public List<File> getRelatedFiles(String TaskID) {
        return taskMapper.getRelatedFiles(TaskID);
    }

    public String TaskID2TaskName(String TaskID) {
        return taskMapper.TaskID2TaskName(TaskID);
    }
}
