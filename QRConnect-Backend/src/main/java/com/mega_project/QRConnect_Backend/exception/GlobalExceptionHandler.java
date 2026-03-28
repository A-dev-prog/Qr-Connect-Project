package com.mega_project.QRConnect_Backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {
        return buildResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler(UnauthorizedActionException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedActionException ex) {
        return buildResponse(ex.getMessage(), HttpStatus.FORBIDDEN);
    }



    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        return buildResponse("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }



    private ResponseEntity<ErrorResponse> buildResponse(String message, HttpStatus status) {
        ErrorResponse response = new ErrorResponse(
                message,
                status.value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, status);
    }
}
