package com.diaosu.quickfile.service;

import com.diaosu.quickfile.entity.File;
import com.diaosu.quickfile.entity.User;
import com.diaosu.quickfile.mapper.FileMapper;
import com.diaosu.quickfile.mapper.TaskMapper;
import com.diaosu.quickfile.utils.ZipUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */
@Service
public class FileService {
    @Autowired
    FileMapper fileMapper;

    @Autowired
    TaskMapper taskMapper;

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

    public int updateFileStatus(String UserID, String TaskID, int FileStatus) {
        return fileMapper.updateFileStatus(UserID, TaskID, FileStatus);
    }

    public String compressFiles(String TaskID) {
        List<String> filesPath = getAllFiles(TaskID);
        List<java.io.File> filesToZip = new ArrayList<>();
        //循环添加所有文件
        for (int i = 0; i < filesPath.size(); i++) {
            String[] tempSplit = filesPath.get(i).split("/");
            System.out.println("split[1]=" + tempSplit[1]);
            filesToZip.add(new java.io.File("/root/QuickFile/Files/" + tempSplit[tempSplit.length - 1]));
        }

        String TaskName = taskMapper.TaskID2TaskName(TaskID);
        System.out.println("TaskName:" + TaskName);
        String outputZipPath = null;
        try {
            outputZipPath = ZipUtil.zipFile(filesToZip, "/root/QuickFile/Files/Compress/" + TaskID + "_" + TaskName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "/Compress/" + TaskID + "_" + TaskName + ".zip";
    }

    public List<String> getAllFiles(String TaskID) {
        return fileMapper.getAllFiles(TaskID);
    }


}
