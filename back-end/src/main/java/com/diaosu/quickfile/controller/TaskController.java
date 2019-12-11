package com.diaosu.quickfile.controller;

import com.diaosu.quickfile.entity.Task;
import com.diaosu.quickfile.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    TaskService taskService;

    //通过UserID获取该用户参加的所有任务
    @GetMapping("/getAllTaskByUserID/{UserID}")
    public List<Task> getAllTaskByUserID(@PathVariable String UserID) {
        return taskService.getAllTaskByUserID(UserID);
    }

    //通过UserID获取该用户发布的所有任务
    @GetMapping("getAllReleaseTaskByUserID/{UserID}")
    public List<Task> getAllReleaseTaskByUserID(@PathVariable String UserID) {
        return taskService.getAllReleaseTaskByUserID(UserID);
    }

    //通过UserID获取发布的任务数量
    @GetMapping("getReleaseTaskCount/{UserID}")
    public int getReleaseTaskCount(@PathVariable String UserID) {
        return taskService.getReleaseTaskCount(UserID);
    }

    //通过UserID获取参加的任务数量
    @GetMapping("getJoinTaskCount/{UserID}")
    public int getJoinTaskCount(@PathVariable String UserID) {
        return taskService.getJoinTaskCount(UserID);
    }

}
