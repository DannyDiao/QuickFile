package com.diaosu.quickfile.controller;

import com.diaosu.quickfile.entity.File;
import com.diaosu.quickfile.entity.Task;
import com.diaosu.quickfile.service.TaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */

@Api("任务模块")
@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    TaskService taskService;

    @ApiOperation("通过UserID获取该用户参加的所有任务")
    @GetMapping("/getAllTask/{UserID}")
    public List<Task> getAllTaskByUserID(@PathVariable String UserID) {
        return taskService.getAllTaskByUserID(UserID);
    }

    @ApiOperation("通过UserID获取该用户发布的所有任务")
    @GetMapping("getAllReleaseTask/{UserID}")
    public List<Task> getAllReleaseTaskByUserID(@PathVariable String UserID) {
        return taskService.getAllReleaseTaskByUserID(UserID);
    }

    @ApiOperation("通过UserID获取发布的任务数量")
    @GetMapping("getReleaseTaskCount/{UserID}")
    public int getReleaseTaskCount(@PathVariable String UserID) {
        return taskService.getReleaseTaskCount(UserID);
    }

    @ApiOperation("通过UserID获取参加的任务数量")
    @GetMapping("getJoinTaskCount/{UserID}")
    public int getJoinTaskCount(@PathVariable String UserID) {
        return taskService.getJoinTaskCount(UserID);
    }

    @ApiOperation("通过TaskID获取Task详情")
    @GetMapping("getTask/{TaskID}")
    public Task getTask(@PathVariable String TaskID) {
        return taskService.getTask(TaskID);
    }

    @ApiOperation("发布任务")
    @PostMapping("createTask")
    public int createTask(Task task) {
        return taskService.createTask(task);
    }

    @ApiOperation("获取所有相关文件")
    @GetMapping("getRelatedFiles/{TaskID}")
    public List<File> getRelatedFiles(@PathVariable String TaskID) {
        return taskService.getRelatedFiles(TaskID);
    }
}
