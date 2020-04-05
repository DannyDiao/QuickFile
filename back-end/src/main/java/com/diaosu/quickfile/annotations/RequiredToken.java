package com.diaosu.quickfile.annotations;
/* Created By DiaoSu
   Date  2020/4/6
   Mail  diaosu@diaosudev.cn */

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiredToken {
    boolean required() default true;
}
