package com.diaosu.quickfile.mapper;

import com.diaosu.quickfile.entity.File;
import com.diaosu.quickfile.entity.Task;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */
@Repository
public interface TaskMapper {
    List<Task> getAllTaskByUserID(String UserID);

    List<Task> getAllReleaseTaskByUserID(String UserID);

    int getReleaseTaskCount(String UserID);

    int getJoinTaskCount(String UserID);

    Task getTask(String TaskID);

    int createTask(Task task);

    List<File> getRelatedFiles(String TaskID);

    String TaskID2TaskName(String TaskID);


}
