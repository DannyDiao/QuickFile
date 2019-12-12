package com.diaosu.quickfile.entity;

import java.sql.Timestamp;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */
public class File {
    private int FileID;
    private String UserID;
    private int TaskID;
    private String FileName;
    private String FilePath;
    private int FileType;
    private int FileStatus;
    private Timestamp SubmitDate;

    public int getFileID() {
        return FileID;
    }

    public void setFileID(int fileID) {
        FileID = fileID;
    }

    public String getUserID() {
        return UserID;
    }

    public void setUserID(String userID) {
        UserID = userID;
    }

    public int getTaskID() {
        return TaskID;
    }

    public void setTaskID(int taskID) {
        TaskID = taskID;
    }

    public String getFileName() {
        return FileName;
    }

    public void setFileName(String fileName) {
        FileName = fileName;
    }

    public String getFilePath() {
        return FilePath;
    }

    public void setFilePath(String filePath) {
        FilePath = filePath;
    }

    public int getFileType() {
        return FileType;
    }

    public void setFileType(int fileType) {
        FileType = fileType;
    }

    public int getFileStatus() {
        return FileStatus;
    }

    public void setFileStatus(int fileStatus) {
        FileStatus = fileStatus;
    }

    public Timestamp getSubmitDate() {
        return SubmitDate;
    }

    public void setSubmitDate(Timestamp submitDate) {
        SubmitDate = submitDate;
    }

    public String getFileDetails() {
        return FileDetails;
    }

    public void setFileDetails(String fileDetails) {
        FileDetails = fileDetails;
    }

    private String FileDetails;
}
