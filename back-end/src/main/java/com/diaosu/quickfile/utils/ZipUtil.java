package com.diaosu.quickfile.utils;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Created By Diao Su
 * Date 2019/12/14
 * diaosu@diaosudev.cn
 */
public class ZipUtil {
    /**
     * 文件打压缩包
     * @param files
     * @param Name
     * @return
     * @throws Exception
     */
    public static String zipFile(List<File> files, String Name)
            throws Exception {
        ZipOutputStream zipOut=null;
        FileOutputStream fous=null;
        /**创建一个临时压缩文件,我们会把文件流全部注入到这个文件中, 这里的文件你可以自定义是.rar还是.zip*/
        File temp = new File(Name + ".zip");
        if (!temp.exists()) {
            temp.createNewFile();
        } else {
            temp.delete();
            temp.createNewFile();
        }
        try {
            //创建文件输出流
            fous = new FileOutputStream(temp);
            zipOut = new ZipOutputStream(fous);
            //压缩打包
            zipFileToOutputStream(files, zipOut);
            return temp.getPath();
        }catch (Exception e) {
            e.printStackTrace();
        }finally{
            if(zipOut!=null){
                zipOut.close();
            }
            if(fous !=null){
                fous.close();
            }
        }
        return null;
    }

    /**
     * 把接受的全部文件打成压缩包
     * @param files<File>;
     * @param outputStream
     */
    public static void zipFileToOutputStream(List<File> files, ZipOutputStream outputStream) {
        int size = files.size();
        for(int i = 0; i < size; i++) {
            File file = (File) files.get(i);
            inputFile(file, outputStream);
        }
    }


    /**
     * 根据输入的文件与输出流对文件进行打包
     * @param inputFile
     * @param ouputStream
     */
    public static void inputFile(File inputFile,ZipOutputStream ouputStream) {
        try {
            if(inputFile.exists()) {
                /**如果是目录的话这里是不采取操作的*/
                if (inputFile.isFile()) {
                    FileInputStream IN = new FileInputStream(inputFile);
                    BufferedInputStream bins = new BufferedInputStream(IN, 512);
                    //org.apache.tools.zip.ZipEntry
                    ZipEntry entry = new ZipEntry(inputFile.getName());
                    ouputStream.putNextEntry(entry);
                    // 向压缩文件中输出数据
                    int nNumber;
                    byte[] buffer = new byte[512];
                    while ((nNumber = bins.read(buffer)) != -1) {
                        ouputStream.write(buffer, 0, nNumber);
                    }
                    // 关闭创建的流对象
                    bins.close();
                    IN.close();
                } else {
                    try {
                        File[] files = inputFile.listFiles();
                        for (int i = 0; i < files.length; i++) {
                            inputFile(files[i], ouputStream);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
