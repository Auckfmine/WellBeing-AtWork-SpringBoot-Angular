package com.wellbeignatwork.backend.exceptions;

public class ApiConflictException extends RuntimeException {
    public ApiConflictException(String message) {
        super(message);
    }
}
