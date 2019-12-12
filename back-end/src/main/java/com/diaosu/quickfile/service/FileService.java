package com.diaosu.quickfile.service;

import com.diaosu.quickfile.entity.File;
import com.diaosu.quickfile.entity.User;
import com.diaosu.quickfile.mapper.FileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */
@Service
public class FileService {
    @Autowired
    FileMapper fileMapper;

    public File getFile(String UserID, String TaskID){
        return fileMapper.getFile(UserID, TaskID);
    }

    public int createFile(File file) {
        //默认文件状态为1
        file.setFileStatus(1);
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        file.setSubmitDate(timestamp);
        return fileMapper.createFileInDataBase(file);
    }
}
