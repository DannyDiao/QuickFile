package com.diaosu.quickfile.controller;

import com.diaosu.quickfile.entity.User;
import com.diaosu.quickfile.service.FileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */

@Api("文件模块")
@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    FileService fileService;

    @ApiOperation("上传文件")
    @PostMapping("/uploadFile")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("filename") String name,
                                             @RequestParam("UserID") String UserID,
                                             @RequestParam("TaskID") String TaskID) {
        System.out.println("name" + name);
        if (!file.isEmpty()) {
            String[] tempSplit = name.split("\\.");
            String storePath = "/root/QuickFile/Files/";
            String tempFileName = UserID + "_" + TaskID + "." + tempSplit[tempSplit.length - 1];
            File filePath = new File(storePath, tempFileName);
            if (!filePath.getParentFile().exists()) {
                filePath.getParentFile().mkdirs();
            }

            try {
                file.transferTo(new File(storePath + tempFileName));
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.CONFLICT).body("failed");
            }
            return ResponseEntity.ok(tempFileName);

        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("failed");
        }
    }

    @ApiOperation("根据任务ID、学号获取文件")
    @GetMapping("/getFile/{UserID}/{TaskID}")
    public com.diaosu.quickfile.entity.File getFile(@PathVariable String UserID, @PathVariable String TaskID) {
        return fileService.getFile(UserID, TaskID);
    }

    @ApiOperation("向数据库插入一条File数据")
    @PostMapping("/createFile")
    public int createFile(com.diaosu.quickfile.entity.File file) {
        return fileService.createFile(file);
    }

    @ApiOperation("更新文件状态")
    @PostMapping("/updateFileStatus")
    public int updateFileStatus(@RequestParam("UserID") String UserID,
                                @RequestParam("TaskID") String TaskID,
                                @RequestParam("FileStatus") int FileStatus) {
        return fileService.updateFileStatus(UserID, TaskID, FileStatus);
    }

    @ApiOperation("打包任务所有文件")
    @GetMapping("/compressFiles/{TaskID}")
    public String compressFiles(@PathVariable String TaskID) {
        return fileService.compressFiles(TaskID);
    }
}
