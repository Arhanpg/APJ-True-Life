package com.apjtruelife.auth.dto;

import java.time.Instant;

public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    private Instant timestamp = Instant.now();

    public static <T> ApiResponse<T> ok(T data) {
        ApiResponse<T> r = new ApiResponse<>();
        r.success = true; r.data = data; r.message = "OK";
        return r;
    }
    public static <T> ApiResponse<T> error(String message) {
        ApiResponse<T> r = new ApiResponse<>();
        r.success = false; r.message = message;
        return r;
    }
    public boolean isSuccess() { return success; }
    public T getData() { return data; }
    public String getMessage() { return message; }
    public Instant getTimestamp() { return timestamp; }
}
