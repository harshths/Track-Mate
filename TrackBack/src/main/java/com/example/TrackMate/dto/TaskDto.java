package com.example.TrackMate.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TaskDto {
    
    private String title;
    private String description;
    private LocalDate targetDate;
    private String status;
    private Long userId;
}
