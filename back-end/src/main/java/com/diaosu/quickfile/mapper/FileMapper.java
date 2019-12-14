package com.diaosu.quickfile.mapper;

import com.diaosu.quickfile.entity.File;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created By Diao Su
 * Date 2019/12/11
 * diaosu@diaosudev.cn
 */
@Repository
public interface FileMapper {
    File getFile(String UserID, String TaskID);

    int createFileInDataBase(File file);

    int updateFileStatus(String UserID, String TaskID, int FileStatus);

    List<String> getAllFiles(String TaskID);

}
